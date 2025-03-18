import { Component, Input, Output, EventEmitter } from '@angular/core';
import { World } from '../models/world.model';
import { Palier } from '../models/palier.model';
import { WebserviceService } from '../webservice.service';
import { UnmanagerComponent } from '../unmanager/unmanager.component';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-upgradeproducts',
  standalone: true,
  imports: [CommonModule, NgForOf, UnmanagerComponent],
  templateUrl: './upgradeproducts.component.html',
  styleUrl: './upgradeproducts.component.css',
})
export class UpgradeproductsComponent {
  @Input() world!: World;
  @Input() server!: string;

  @Output() onBuyUpgrade = new EventEmitter<Palier>(); // remplace le "upgradeDone"

  constructor(private service: WebserviceService) {
    this.server = service.server;
  }

  getFilteredUpgrades() {
    return this.world?.upgrades?.filter(u => !u.unlocked) || [];
  }

  acheterUpgrade(upgrade: Palier) {
    if (!upgrade.unlocked && this.world.money >= upgrade.seuil) {
      this.onBuyUpgrade.emit(upgrade); // on ne fait plus le traitement local ici !
    }
  }
}
