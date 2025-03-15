import { Palier } from './palier.model'; // Import de Palier

export class Product {
  id!: number;
  name!: string;
  logo!: string;
  cout!: number;
  croissance!: number;
  revenu!: number;
  vitesse!: number;
  quantite!: number;
  timeleft!: number;
  managerUnlocked!: boolean;

  paliers!: Palier[];

  static fromJSON(json: any): Product {
    let product = new Product();
    product.id = json.id;
    product.name = json.name;
    product.logo = json.logo;
    product.cout = json.cout;
    product.croissance = json.croissance;
    product.revenu = json.revenu;
    product.vitesse = json.vitesse;
    product.quantite = json.quantite;
    product.timeleft = json.timeleft;
    product.managerUnlocked = json.managerUnlocked;

    product.paliers = json.paliers?.map((p: any) => Palier.fromJSON(p)) || [];

    return product;
  }
}
