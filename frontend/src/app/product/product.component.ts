import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import {ProgressbarComponent} from '../progressbar/progressbar.component'
import { Orientation } from '../progressbar/progressbar.component';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-product',
  imports: [ProgressbarComponent, TimerComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product!: Product;
  Orientation = Orientation;
  
  //Le setter appelé quand valeur de l'input est modifiée,
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
