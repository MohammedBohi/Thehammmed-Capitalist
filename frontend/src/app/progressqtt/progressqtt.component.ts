import { Component, Input, OnChanges } from '@angular/core';
import { Product } from '../models/product.model';


@Component({
  selector: 'app-progressqtt',
  imports: [],
  templateUrl: './progressqtt.component.html',
  styleUrl: './progressqtt.component.css'
})
export class ProgressqttComponent implements OnChanges {
    @Input() product!: Product;
    @Input() isPopupOpen!: boolean;
  
    progress: number = 0;
  
    ngOnChanges(): void {
      this.updateProgress();
    }
  
    private updateProgress(): void {
      if (!this.product || !this.product.paliers.length) {
        this.progress = 0;
        return;
      }
      
      const paliers = this.product.paliers;
      let currentPalier = paliers.find(p => p.seuil > this.product.quantite);
      if (!currentPalier) {
        currentPalier = paliers[paliers.length - 1]; // Dernier palier atteint
      }
      
      const previousPalier = paliers[paliers.indexOf(currentPalier) - 1] || { seuil: 0 };
      
      this.progress = ((this.product.quantite - previousPalier.seuil) / (currentPalier.seuil - previousPalier.seuil)) * 100;
    }
  }
  