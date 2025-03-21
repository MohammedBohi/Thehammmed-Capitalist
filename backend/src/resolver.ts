import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { origworld } from './origworld';

@Resolver('World')
export class GraphQlResolver {
  constructor(private service: AppService) {}
  @Query()
  async getWorld(@Args('user') user: string) {
    this.service.mettreAJourGains(user);
    return this.service.readUserWorld(user);
  }
  @Mutation()
  async acheterQtProduit(
    @Args('user') user: string,
    @Args('id') id: number,
    @Args('quantite') quantite: number,
  ) {
    this.service.mettreAJourGains(user);
    const world = this.service.readUserWorld(user);

    // Récupération du produit
    const product = world.products.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Le produit avec l'id ${id} n'existe pas`);
    }
    const cost = Array.from({ length: quantite }).reduce<number>(
      (acc, _, i) => acc + product.cout * product.croissance ** i,
      0,
    );
    if (world.money < cost) {
      throw new Error(
        `Fonds insuffisants ! Il vous manque ${cost - world.money}€.`,
      );
    }
    product.quantite += quantite;

    // Mise à jour du prix du produit après achat
    product.cout *= product.croissance ** quantite;
    world.money -= cost;
    this.service.saveWorld(user, world);
    return product;
  }
  @Mutation()
  async lancerProductionProduit(
    @Args('user') user: string,
    @Args('id') id: number,
  ) {
    this.service.mettreAJourGains(user);
    const world = this.service.readUserWorld(user);
    // Récupération du produit
    const product = world.products.find((p) => p.id === id);
    // si le produit est introuvable
    if (!product) {
      throw new Error(`Le produit avec l'id ${id} n'existe pas`);
    }
    product.timeleft = product.vitesse;

    this.service.saveWorld(user, world);
    return product;
  }
  @Mutation()
  async engagerManager(@Args('user') user: string, @Args('name') name: string) {
    this.service.mettreAJourGains(user);
    const world = this.service.readUserWorld(user);
    const manager = world.managers.find((m) => m.name === name);
    if (!manager) {
      throw new Error(`Le manager "${name}" n'existe pas.`);
    }
    if (world.money < manager.seuil) {
      throw new Error(
        `Fonds insuffisants ! Vous avez besoin de ${manager.seuil}€.`,
      );
    }
    world.money -= manager.seuil;

    manager.unlocked = true;

    const product = world.products.find((p) => p.id === manager.idcible);
    if (product) {
      product.managerUnlocked = true;
    }

    this.service.saveWorld(user, world);

    return manager;
  }
  @Mutation()
  async acheterCashUpgrade(
    @Args('user') user: string,
    @Args('name') name: string,
  ) {
    this.service.mettreAJourGains(user);
    const world = this.service.readUserWorld(user);

    const upgrade = world.upgrades.find((u) => u.name === name);
    if (!upgrade) {
      throw new Error(`L'upgrade "${name}" n'existe pas.`);
    }

    if (world.money < upgrade.seuil) {
      return null;
    }

    world.money -= upgrade.seuil;

    upgrade.unlocked = true;

    const product = world.products.find((p) => p.id === upgrade.idcible);
    if (product) {
      if (upgrade.typeratio === 'gain') {
        product.revenu *= upgrade.ratio;
      } else if (upgrade.typeratio === 'vitesse') {
        product.vitesse /= upgrade.ratio;
      }
    }

    this.service.saveWorld(user, world);

     return upgrade;
  }
  @Mutation()
  async acheterAngelUpgrade(
    @Args('user') user: string,
    @Args('name') name: string,
  ) {
    this.service.mettreAJourGains(user);
    const world = this.service.readUserWorld(user);

    const angelUpgrade = world.angelupgrades.find((u) => u.name === name);
    if (!angelUpgrade) {
      throw new Error(`L'upgrade d'ange "${name}" n'existe pas.`);
    }

    if (world.activeangels < angelUpgrade.seuil) {
      return null;
    }

    world.activeangels -= angelUpgrade.seuil;

    angelUpgrade.unlocked = true;

    if (angelUpgrade.idcible === 0) {
      world.angelbonus *= angelUpgrade.ratio;
    } else {
      const product = world.products.find((p) => p.id === angelUpgrade.idcible);
      if (product) {
        if (angelUpgrade.typeratio === 'gain') {
          product.revenu *= angelUpgrade.ratio;
        } else if (angelUpgrade.typeratio === 'vitesse') {
          product.vitesse /= angelUpgrade.ratio;
        }
      }
    }

    this.service.saveWorld(user, world);

    return angelUpgrade;
  }
  @Mutation()
  async resetWorld(@Args('user') user: string) {
    this.service.mettreAJourGains(user);
    const world = this.service.readUserWorld(user);
    const nouveauxAnges = Math.max(
      0,
      Math.floor(150 * Math.sqrt(world.score / 1e15)) - world.totalangels,
    );

    const totalAngels = world.totalangels + nouveauxAnges;
    const activeAngels = totalAngels;
    const newWorld = JSON.parse(JSON.stringify(origworld));

    newWorld.totalangels = totalAngels;
    newWorld.activeangels = activeAngels;
    newWorld.angelbonus = world.angelbonus;
    newWorld.score = 0;
    newWorld.money = 0;
    newWorld.lastupdate = Date.now();

    this.service.saveWorld(user, newWorld);

    return newWorld;
  }
}
