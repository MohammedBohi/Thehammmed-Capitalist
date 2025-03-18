import { Component, Input } from '@angular/core';
import { World } from '../models/world.model';
import { Palier } from '../models/palier.model';
import { WebserviceService } from '../webservice.service';
import { Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { UnmanagerComponent } from '../unmanager/unmanager.component';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css'],
  standalone: true,
  imports: [CommonModule, NgForOf, UnmanagerComponent],
})
export class ManagersComponent {
  @Input() world!: World;
@Input() server!: string;

  @Output() productUpdated = new EventEmitter<Product>();


  constructor(private service: WebserviceService) {
    this.server = service.server;
  }
  getFilteredManagers() {
    return this.world?.managers?.filter(m => !m.unlocked) || [];
  }
  
  hireManager(manager: Palier) {
    if (!manager.unlocked && this.world.money >= manager.seuil) {
      this.service.engagerManager(this.world.name, manager).then(() => {
        manager.unlocked = true;
        this.world.money -= manager.seuil;
        const product = this.world.products.find(p => p.id === manager.idcible);
        if (product) {
          product.managerUnlocked = true;
          if (product.timeleft <= 0) {
            this.service.lancerProduction(this.world.name, product).then(() => {
              product.timeleft = product.vitesse;
            });
          }
        }
      });
    }
  }
}
