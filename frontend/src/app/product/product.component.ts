import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import {ProgressbarComponent} from '../progressbar/progressbar.component'
import { Orientation } from '../progressbar/progressbar.component';
import { TimerComponent } from '../timer/timer.component';
import { WebserviceService } from '../webservice.service';


@Component({
  selector: 'app-product',
  imports: [ProgressbarComponent, TimerComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
<<<<<<< HEAD
  @Input() prod!: Product; 

  //Le setter est appelé chaque fois que la valeur de l'input est modifiée,
=======
  product!: Product;
  Orientation = Orientation;
  
  //Le setter appelé quand valeur de l'input est modifiée,
>>>>>>> 05918923fb75e9f99ca67a7cc62e6587dfea3ef4
  //donc quand le composant parent (AppComponent) passe un nouveau Product au composant ProductComponent
  @Input()
  set prod(value: Product) {
    this.product = value;
    console.log('Produit mis à jour :', this.product);
    }

  incrementCount() {
    this.product.quantite++;
    console.log("Qtt:", this.product.quantite);
  }
}
