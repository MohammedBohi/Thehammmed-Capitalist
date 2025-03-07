export enum RatioType {
    gain = 'gain',
    vitesse = 'vitesse',
    ange = 'ange',
  }
  
  export class Palier {
    name!: string;
    logo!: string;
    seuil!: number;
    idcible!: number;
    ratio!: number;
    typeratio!: RatioType;
    unlocked!: boolean;

    static fromJSON(json: any): Palier {
      let palier = new Palier();
      palier.name = json.name;
      palier.logo = json.logo;
      palier.seuil = json.seuil;
      palier.idcible = json.idcible;
      palier.ratio = json.ratio;
      palier.typeratio = RatioType[json.typeratio as keyof typeof RatioType] || RatioType.gain; 
      palier.unlocked = json.unlocked;
      
      return palier;
    }

  }