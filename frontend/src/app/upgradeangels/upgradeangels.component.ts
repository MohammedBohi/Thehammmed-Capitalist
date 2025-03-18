import { Component, Input, Output, EventEmitter } from '@angular/core';
import { World } from '../models/world.model';
import { Palier } from '../models/palier.model';
import { WebserviceService } from '../webservice.service';
import { UnmanagerComponent } from '../unmanager/unmanager.component';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-upgradeangels',
  standalone: true,
  imports: [CommonModule, NgForOf, UnmanagerComponent],
  templateUrl: './upgradeangels.component.html',
  styleUrl: './upgradeangels.component.css',
})
export class UpgradeangelsComponent {
  @Input() world!: World;
  @Input() server!: string;

  @Output() onBuyAngelUpgrade = new EventEmitter<Palier>();

  constructor(private service: WebserviceService) {
    this.server = service.server;
  }

  getFilteredAngelUpgrades() {
    return this.world?.angelupgrades?.filter(u => !u.unlocked) || [];
  }

  acheterAngelUpgrade(upgrade: Palier) {
    if (!upgrade.unlocked && this.world.activeangels >= upgrade.seuil) {
      this.onBuyAngelUpgrade.emit(upgrade);
    }
  }
}
