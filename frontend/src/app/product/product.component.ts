    import { Component, EventEmitter, Input, Output } from '@angular/core';
    import { Product } from '../models/product.model';
    import { ProgressbarComponent } from '../progressbar/progressbar.component';
    import { Orientation } from '../progressbar/progressbar.component';
    import { TimerComponent } from '../timer/timer.component';
    import { CommonModule } from '@angular/common';  
    
    import { WebserviceService } from '../webservice.service';



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
      user: string = 'DinoMaster'; // 🦖 Nom d'utilisateur par défaut
      productImage: string = "/blanc.png";
      constructor(private service: WebserviceService) {}


      // Définition des images d'évolution pour chaque dinosaure
      evolutionImages: { [key: string]: string[] } = {
        "Velociraptor Training": ["/raptor1.png", "/raptor2.png", "/raptor3.png"],
        "Triceratops Farm": ["/Triceratops1.png", "/Triceratops2.png", "/Triceratops3.png"],
        "Spinosaurus Aviary": ["/spino1.png", "/spino2.png", "/spino3.png"], 
        "Tyrannosaurus Rex Pen": ["/trex1.png", "/trex2.png", "/trex3.png"],
        "Mosasaurus Lagoon": ["/mausasaurus1.png", "/mausasaurus2.png", "/mausasaurus3.png"],
        "Diplodocus Sanctuary": ["/diplo1.png", "/diplo2.png", "/diplo3.png"], 
      };

      
      //Le setter appelé quand valeur de l'input est modifiée,
      //donc quand le composant parent (AppComponent) passe un nouveau Product au composant ProductComponent

      ngOnChanges() {
        if (this.prod) {
          this.updateProductImage();
          console.log('Rendering le composant !', this.prod);
        }
      }
      
      
    // Fonction qui retourne l'image correcte en fonction du niveau du dinosaure
    @Output() worldChanged = new EventEmitter<void>();

      updateProductImage() {
        if (!this.prod || !this.prod.name) {
          this.productImage = "/blanc.png"; 
          console.warn("⚠️ Aucun produit ou nom trouvé, image par défaut appliquée.");
          return;
        }
        console.log("🦕 Mapping image pour :", this.prod.name);

        const images = this.evolutionImages[this.prod.name] || [];
        let level = 0;
      
        if (this.prod.quantite >= 50) {
          level = 2;
        } else if (this.prod.quantite >= 20) {
          level = 1;
        }
      
        this.productImage = images[level] ? images[level] : "/blanc.png"; 
        console.log(`🦖 Image sélectionnée pour ${this.prod.name} : ${this.productImage}`)
      }
      acheterDino() {
        this.service.acheterProduit(this.user, this.prod.id, 1);
        this.worldChanged.emit(); // ✅ Indispensable

      }
      
      
    
    
      entrainerDino() {
        if (!this.prod || this.prod.timeleft > 0 || this.prod.quantite <= 0) return;
        this.service.lancerProduction(this.user, this.prod.id);
        this.worldChanged.emit(); // ✅ Indispensable

      }
      
      
      onProductionComplete() {
        this.service.updateTimeleft(this.prod.id, 0); // Tu peux créer une méthode simple dans le service pour ça.
      }
      
      
      
    }