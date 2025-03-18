    import { Component, EventEmitter, Input, Output } from '@angular/core';
    import { Product } from '../models/product.model';
    import { ProgressbarComponent } from '../progressbar/progressbar.component';
    import { Orientation } from '../progressbar/progressbar.component';
    import { TimerComponent } from '../timer/timer.component';
    import { CommonModule } from '@angular/common';  
    import { WebserviceService } from '../webservice.service';
    import { ChangeDetectorRef } from '@angular/core';
    import { World } from '../models/world.model';



    @Component({
      selector: 'app-product',
      standalone: true,
      imports: [CommonModule,ProgressbarComponent, TimerComponent],
      templateUrl: './product.component.html',
      styleUrls: ['./product.component.css'],
    })
    export class ProductComponent {
      @Input() prod!: Product;
      Orientation = Orientation;
      @Input() username!: string;
      @Output() onBuy = new EventEmitter<number>();
      productImage: string = "/blanc.png";
      constructor(private service: WebserviceService, private cdRef: ChangeDetectorRef) {}

      @Output() productionDone = new EventEmitter<number>();
      run: boolean = false;
      intervalId: any; 
      @Input() multiplicateur!: number;
      @Input() world!: World; 


      // Définition des images d'évolution pour chaque dinosaure
      evolutionImages: { [key: string]: string[] } = {
        "Velociraptor Training": ["/raptor1.png", "/raptor2.png", "/raptor3.png"],
        "Triceratops Farm": ["/Triceratops1.png", "/Triceratops2.png", "/Triceratops3.png"],
        "Spinosaurus Aviary": ["/spino1.png", "/spino2.png", "/spino3.png"], 
        "Tyrannosaurus Rex Pen": ["/trex1.png", "/trex2.png", "/trex3.png"],
        "Mosasaurus Lagoon": ["/mausasaurus1.png", "/mausasaurus2.png", "/mausasaurus3.png"],
        "Diplodocus Sanctuary": ["/diplo1.png", "/diplo2.png", "/diplo3.png"], 
      };

      
  
      ngOnInit() {
        this.intervalId = setInterval(() => {
          if (this.prod && this.prod.timeleft > 0) {
            this.prod.timeleft -= 100;
            if (this.prod.timeleft <= 0) {
              this.prod.timeleft = 0;
              this.run = false;
              this.terminerProduction();
            }
          }
        }, 100);
        if (this.prod.managerUnlocked && this.prod.timeleft <= 0) {
          this.autoStartProduction();
        }

      }
      
      ngOnDestroy() {
        if (this.intervalId) clearInterval(this.intervalId);
      }
      ngOnChanges() {
        if (this.prod) {
          this.updateProductImage();
        }
        if (this.prod.managerUnlocked && this.prod.timeleft <= 0) {
          this.autoStartProduction();
        }
      }
      autoStartProduction() {
        if (this.prod && this.prod.quantite > 0 && this.prod.timeleft <= 0) {
          this.service.lancerProduction(this.username, this.prod).then(() => {
            this.prod.timeleft = this.prod.vitesse;
            this.run = true;
            this.cdRef.detectChanges();
          });
        }
      }
      
      
    // Fonction qui retourne l'image correcte en fonction du niveau du dinosaure

    updateProductImage() {
      if (this.prod.quantite <= 0) {
        this.productImage = '/oeuf.png'; 
        return;
      }
    
      const images = this.evolutionImages[this.prod.name] || [];
      let level = 0;
      if (this.prod.quantite >= 50) level = 2;
      else if (this.prod.quantite >= 20) level = 1;
      this.productImage = images[level] ? images[level] : "/blanc.png";
    }
    acheterDino() {
      const quantite = this.multiplicateur === -1 ? this.calcMaxCanBuy() : this.multiplicateur;
  const prixTotal = this.calculateTotalCost(quantite);

  if (prixTotal > (this.world.money || 0)) {
    console.warn("⛔ Pas assez d'argent !");
    return;
  }
  

  this.service.acheterQtProduit(this.username, this.prod, quantite).then((res) => {
    const updatedProduct = res.data.acheterQtProduit;
    this.prod.quantite = updatedProduct.quantite;
    this.prod.cout = updatedProduct.cout;
    this.prod.revenu = updatedProduct.revenu;

    this.updateProductImage();
    this.cdRef.detectChanges();
    this.onBuy.emit(prixTotal);
  });
    }
    
      
      
    
    
    entrainerDino() {
      if (!this.prod || this.prod.quantite <= 0 || this.prod.timeleft > 0) return;

  this.service.lancerProduction(this.username, this.prod).then(() => {
    this.prod.timeleft = this.prod.vitesse;
    this.run = true;
  });
}
  
     
    terminerProduction() {
      const totalGain = this.prod.revenu * this.prod.quantite;
      this.productionDone.emit(totalGain);
    
      this.run = false;  
    }
    calcMaxCanBuy(): number {
      const cout = this.prod.cout;
      const croissance = this.prod.croissance;
      const argent = this.world.money || 0;
      const max = Math.floor(Math.log((argent * (croissance - 1)) / cout + 1) / Math.log(croissance));
      return Math.max(0, max);
    }
    
    calculateTotalCost(quantite: number): number {
      const cout = this.prod.cout;
      const croissance = this.prod.croissance;
      return cout * ((1 - Math.pow(croissance, quantite)) / (1 - croissance));
    }
    
      
      
    }