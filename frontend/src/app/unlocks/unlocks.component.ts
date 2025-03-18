import { Component, Input } from '@angular/core';
import { World } from '../models/world.model';
import { Palier } from '../models/palier.model';
import { WebserviceService } from '../webservice.service';
import { CommonModule, NgForOf } from '@angular/common';


@Component({
  selector: 'app-unlocks',
  standalone: true,
  imports: [CommonModule, NgForOf],

  templateUrl: './unlocks.component.html',
  styleUrl: './unlocks.component.css',
})
export class UnlocksComponent {
  @Input() world!: World;
  @Input() server!: string;

  constructor(private service: WebserviceService) {
    this.server = service.server;
  }

  getFilteredUnlocks() {
    return this.world?.allunlocks?.filter(u => !u.unlocked) || [];
  }

  checkCondition(unlock: Palier): boolean {
    const total = this.world.products.reduce((acc, prod) => acc + prod.quantite, 0);
    return total >= unlock.seuil;
  }

  applyUnlock(unlock: Palier) {
    if (!unlock.unlocked && this.checkCondition(unlock)) {
      this.service.applyBonus(this.world, unlock);
      unlock.unlocked = true;
    }
  }
}
