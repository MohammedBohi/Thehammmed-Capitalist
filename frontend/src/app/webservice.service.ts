import { Injectable } from '@angular/core';
import { Client, fetchExchange, gql } from '@urql/core';
import { BehaviorSubject } from 'rxjs';
import { World } from './models/world.model';
import { Palier } from './models/palier.model';
import { Product } from './models/product.model';
import { GET_WORLD, ACHETER_PRODUIT, LANCER_PRODUCTION, ENGAGER_MANAGER, ACHETER_CASH_UPGRADE, ACHETER_ANGEL_UPGRADE, RESET_WORLD } from './Grapqhrequests';


@Injectable({
  providedIn: 'root',
})
export class WebserviceService {
  server = 'http://localhost:3000/';
  private client = new Client({ url: this.server, exchanges: [fetchExchange] });

  

  constructor() {
  }
  private createClient() {
    return new Client({
      url: this.server + 'graphql',
      exchanges: [fetchExchange]
    });
  }
  async getWorld(user: string): Promise<any> {
    return await this.createClient().query(GET_WORLD, { user }).toPromise();
  }
  async refreshWorld(user: string): Promise<World> {
    const res = await this.getWorld(user);
    return res.data.getWorld;
  }
  
  

applyBonus(world: World, palier: Palier) {
  if (palier.idcible > 0) {
    const product = world.products.find((p) => p.id === palier.idcible);
    if (!product) return;
    this.applyBonusForProduct(world, product, palier);
  }

  if (palier.idcible === 0) {
    world.products.forEach((product) => {
      this.applyBonusForProduct(world, product, palier);
    });
  }

  if (palier.idcible === -1) {
    world.angelbonus += palier.ratio;
  }
}

applyBonusForProduct(world: World, product: Product, palier: Palier) {
  switch (palier.typeratio) {
    case 'gain':
      product.revenu *= palier.ratio;
      break;
    case 'vitesse':
      product.vitesse /= palier.ratio;
      break;
    case 'ange':
      world.angelbonus += palier.ratio;
      break;
  }
}
async acheterQtProduit(user: string, product: Product, quantite: number) {
  return await this.createClient().mutation(ACHETER_PRODUIT, {
    user,
    id: product.id,
    quantite
  }).toPromise();
}
async lancerProduction(user: string, product: Product) {
  return await this.createClient().mutation(LANCER_PRODUCTION, {
    user,
    id: product.id
  }).toPromise();
}
async engagerManager(user: string, manager: Palier) {
  return await this.createClient().mutation(ENGAGER_MANAGER, {
    user,
    name: manager.name
  }).toPromise();
}
async acheterCashUpgrade(user: string, upgrade: Palier) {
  return await this.createClient().mutation(ACHETER_CASH_UPGRADE, {
    user,
    upgrade
  }).toPromise();
}

async acheterAngelUpgrade(user: string, upgrade: Palier) {
  return await this.createClient().mutation(ACHETER_ANGEL_UPGRADE, {
    user,
    upgrade
  }).toPromise();
}

async resetWorld(user: string) {
  return await this.createClient().mutation(RESET_WORLD, {
    user
  }).toPromise();
}

  
}
