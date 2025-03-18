import { Injectable } from '@angular/core';
import { Client, fetchExchange, gql } from '@urql/core';
import { BehaviorSubject } from 'rxjs';
import { World } from './models/world.model';


@Injectable({
  providedIn: 'root',
})
export class WebserviceService {
  server = 'http://localhost:3000/graphql';
  private client = new Client({ url: this.server, exchanges: [fetchExchange] });

  private worldSubject = new BehaviorSubject<any>(null);
  world$ = this.worldSubject.asObservable(); // Observable pour suivre les changements en temps réel
  private localWorld: World | null = null;

  constructor() {
    this.startAutoUpdate(); // Lancer la mise à jour automatique
  }

  private startAutoUpdate() {
    setInterval(() => {
      const user = localStorage.getItem('user') || 'defaultUser'; 
      this.getWorld(user);
    }, 5000); // Mise à jour toutes les 5 secondes
  }

  async getWorld(user: string): Promise<any> {
    try {
      const GET_WORLD = gql`
      query getWorld($user: String!) {
        getWorld(user: $user) {
          name
          logo
          money
          score
          totalangels
          activeangels
          angelbonus
          lastupdate
          products {
            id
            name
            logo
            cout
            croissance
            revenu
            vitesse
            quantite
            timeleft
            managerUnlocked
            paliers {
              name
              logo
              seuil
              idcible
              ratio
              typeratio
              unlocked
            }
          }
          managers {
            name
            seuil
            idcible
            ratio
            typeratio
            unlocked
          }
          upgrades {
            name
            seuil
            idcible
            ratio
            typeratio
            unlocked
          }
          angelupgrades {
            name
            seuil
            idcible
            ratio
            typeratio
            unlocked
          }
          allunlocks {
            name
            logo
            seuil
            idcible
            ratio
            typeratio
            unlocked
          }
        }
      }
    `;

    const response = await this.client.query(GET_WORLD, { user }).toPromise();
    console.log('🟠 Données reçues du back:', response);
    console.log('🟢 Utilisateur passé à getWorld :', user);


    if (response?.data?.getWorld) {
      const world = World.fromJSON(response.data.getWorld);
      this.localWorld = world; // ➡️ Stockage local
      this.worldSubject.next(world); // on push directement un World typé
      return world;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors du chargement du monde:', error);
    return null;
  }
}
get world(): World | null {
  return this.localWorld;
}

async acheterProduit(user: string, id: number, quantite: number): Promise<any> {
  if (!this.localWorld) {
    console.warn("localWorld non initialisé");
    return;
  }
  const ACHETER_PRODUIT = gql`
    mutation acheterQtProduit($user: String!, $id: Int!, $quantite: Int!) {
      acheterQtProduit(user: $user, id: $id, quantite: $quantite) {
        id
        name
        logo
        cout
        croissance
        revenu
        vitesse
        quantite
        timeleft
        managerUnlocked
        paliers { name logo seuil idcible ratio typeratio unlocked }
      }
    }
  `;

  const response = await this.client.mutation(ACHETER_PRODUIT, { user, id, quantite }).toPromise();
  const res = response?.data?.acheterQtProduit;
  if (res) {
    const product = this.localWorld.products.find(p => p.id === res.id);
    if (product) {
      Object.assign(product, res);
      this.worldSubject.next({ ...this.localWorld });
    } else {
      console.warn("Produit introuvable dans localWorld pour l'id:", res.id);
    }
  } else {
    console.warn("Réponse invalide ou vide reçue du backend");
  }
}
async lancerProduction(user: string, id: number): Promise<any> {
  if (!this.localWorld) {
    console.warn("localWorld non initialisé");
    return;
  }
  const LANCER_PRODUCTION = gql`
    mutation lancerProductionProduit($user: String!, $id: Int!) {
      lancerProductionProduit(user: $user, id: $id) {
        id
        name
        logo
        cout
        croissance
        revenu
        vitesse
        quantite
        timeleft
        managerUnlocked
        paliers { name logo seuil idcible ratio typeratio unlocked }
      }
    }
  `;

  const response = await this.client.mutation(LANCER_PRODUCTION, { user, id }).toPromise();
  const res = response?.data?.lancerProductionProduit;
  if (res) {
    const product = this.localWorld.products.find(p => p.id === res.id);
    if (product) {
      Object.assign(product, res);
      this.worldSubject.next({ ...this.localWorld }); 
    } else {
      console.warn("Produit introuvable dans localWorld pour l'id:", res.id);
    }
  } else {
    console.warn("Réponse invalide ou vide reçue du backend");
  }
}

async engagerManager(user: string, name: string): Promise<any> {
  if (!this.localWorld) return;

  const ENGAGER_MANAGER = gql`
    mutation engagerManager($user: String!, $name: String!) {
      engagerManager(user: $user, name: $name) {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
  `;

  const response = await this.client.mutation(ENGAGER_MANAGER, { user, name }).toPromise();
  const res = response?.data?.engagerManager;
  if (res) {
    const manager = this.localWorld.managers.find(m => m.name === res.name);
    if (manager) manager.unlocked = res.unlocked;

    const product = this.localWorld.products.find(p => p.id === res.idcible);
    if (product) product.managerUnlocked = res.unlocked;

    this.worldSubject.next({ ...this.localWorld });
  }
}
async acheterCashUpgrade(user: string, name: string): Promise<any> {
  if (!this.localWorld) {
    console.warn("localWorld non initialisé");
    return;
  }
  const ACHETER_CASH_UPGRADE = gql`
    mutation acheterCashUpgrade($user: String!, $name: String!) {
      acheterCashUpgrade(user: $user, name: $name) {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
  `;

  const response = await this.client.mutation(ACHETER_CASH_UPGRADE, { user, name }).toPromise();
  const res = response?.data?.acheterCashUpgrade;
  if (res) {
    const upgrade = this.localWorld.upgrades.find(u => u.name === res.name);
    if (upgrade) {
      upgrade.unlocked = res.unlocked;
      const product = this.localWorld.products.find(p => p.id === res.idcible);
      if (product) {
        if (res.typeratio === 'gain') product.revenu *= res.ratio;
        else if (res.typeratio === 'vitesse') product.vitesse /= res.ratio;
      }
    }
    this.worldSubject.next({ ...this.localWorld });
  }
}
async acheterAngelUpgrade(user: string, name: string): Promise<any> {
  if (!this.localWorld) {
    console.warn("localWorld non initialisé");
    return;
  }

  const ACHETER_ANGEL_UPGRADE = gql`
    mutation acheterAngelUpgrade($user: String!, $name: String!) {
      acheterAngelUpgrade(user: $user, name: $name) {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
  `;

  const response = await this.client.mutation(ACHETER_ANGEL_UPGRADE, { user, name }).toPromise();
  const res = response?.data?.acheterAngelUpgrade;
  if (res) {
    const angelUpgrade = this.localWorld.angelupgrades.find(u => u.name === res.name);
    if (angelUpgrade) {
      angelUpgrade.unlocked = res.unlocked;
      if (res.idcible === 0) this.localWorld.angelbonus *= res.ratio;
      else {
        const product = this.localWorld.products.find(p => p.id === res.idcible);
        if (product) {
          if (res.typeratio === 'gain') product.revenu *= res.ratio;
          else if (res.typeratio === 'vitesse') product.vitesse /= res.ratio;
        }
      }
    }
    this.worldSubject.next({ ...this.localWorld });
  }
}

  async resetWorld(user: string): Promise<any> {
    if (!this.localWorld) {
      console.warn("Aucun monde local trouvé !");
      return;
    }
  
    // 1️⃣ ➡️ MAJ LOCALE DIRECTE (réinitialisation locale)
    const nouveauxAnges = Math.max(
      0,
      Math.floor(150 * Math.sqrt(this.localWorld.score / 1e15)) - this.localWorld.totalangels
    );
  
    const totalAngels = this.localWorld.totalangels + nouveauxAnges;
    const activeAngels = totalAngels;
  
    this.localWorld.money = 0;
    this.localWorld.score = 0;
    this.localWorld.totalangels = totalAngels;
    this.localWorld.activeangels = activeAngels;
  
    // Reset des produits, managers, upgrades etc.
    this.localWorld.products.forEach((p) => {
      p.quantite = 0;
      p.cout = p.cout / Math.pow(p.croissance, p.quantite); // revient au prix initial
      p.timeleft = 0;
      p.managerUnlocked = false;
      p.paliers.forEach((palier) => (palier.unlocked = false));
    });
  
    this.localWorld.managers.forEach((m) => (m.unlocked = false));
    this.localWorld.upgrades.forEach((u) => (u.unlocked = false));
    this.localWorld.angelupgrades.forEach((u) => (u.unlocked = false));
    this.localWorld.allunlocks.forEach((a) => (a.unlocked = false));
  
    this.worldSubject.next({ ...this.localWorld });
    try {
      const RESET_WORLD = gql`
        mutation resetWorld($user: String!) {
          resetWorld(user: $user) {
            name
            money
            totalangels
            activeangels
          }
        }
      `;
      const response = await this.client.mutation(RESET_WORLD, { user }).toPromise();
      console.log('✅ Sync back réussie pour resetWorld');
      return response?.data?.resetWorld ?? null;
    } catch (error) {
      console.error('Erreur lors du reset du monde:', error);
      return null;
    }
  }
  updateTimeleft(productId: number, newTimeleft: number): void {
    if (!this.localWorld) {
      console.warn("Pas de monde local pour updateTimeleft");
      return;
    }
  
    const product = this.localWorld.products.find(p => p.id === productId);
    if (product) {
      product.timeleft = newTimeleft;
      this.worldSubject.next({ ...this.localWorld });
    } else {
      console.warn("Produit introuvable pour updateTimeleft");
    }
  }
  
}
