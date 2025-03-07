import { Product } from './product.model';
import { Palier } from './palier.model';

export class World {
  name!: string;
  logo!: string;
  money!: number;
  score!: number;
  totalangels!: number;
  activeangels!: number;
  angelbonus!: number;
  lastupdate!: number;
  products: Product[] = [];
  allunlocks: Palier[] = [];
  upgrades: Palier[] = [];
  angelupgrades: Palier[] = [];
  managers: Palier[] = [];

  static fromJSON(json: any): World {
    let world = new World();
    world.name = json.name;
    world.logo = json.logo;
    world.money = json.money;
    world.score = json.score;
    world.totalangels = json.totalangels;
    world.activeangels = json.activeangels;
    world.angelbonus = json.angelbonus;
    world.lastupdate = json.lastupdate;
    
    world.products = json.products?.map((p: any) => Product.fromJSON(p)) || [];
    world.allunlocks = json.allunlocks?.map((p: any) => Palier.fromJSON(p)) || [];
    world.upgrades = json.upgrades?.map((p: any) => Palier.fromJSON(p)) || [];
    world.angelupgrades = json.angelupgrades?.map((p: any) => Palier.fromJSON(p)) || [];
    world.managers = json.managers?.map((p: any) => Palier.fromJSON(p)) || [];

    return world;
  }
}