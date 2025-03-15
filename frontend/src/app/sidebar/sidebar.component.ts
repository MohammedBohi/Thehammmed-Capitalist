import { Component, OnInit } from '@angular/core';
import { UnlocksComponent } from '../unlocks/unlocks.component';
import { CommonModule } from '@angular/common';
import { WebserviceService } from '../webservice.service';
import { InvestorsComponent } from '../investors/investors.component';
import { ManagersComponent } from '../managers/managers.component';
import { StatsComponent } from '../stats/stats.component';
import { UpgradeproductsComponent } from '../upgradeproducts/upgradeproducts.component';
import { UpgradeangelsComponent } from '../upgradeangels/upgradeangels.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    UnlocksComponent,
    InvestorsComponent,
    ManagersComponent,
    StatsComponent,
    UpgradeproductsComponent,
    UpgradeangelsComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isPopupOpen = false;
  activePage: string = '';

  constructor(private service: WebserviceService) {}

  ngOnInit() {
    this.service.popupState.subscribe((value) => {
      this.isPopupOpen = value; // Met à jour isPopupOpen avec la valeur du service
    });
  }

  // Cette fonction inverse la valeur de isPopupOpen en appelant le service
  changeValue() {
    this.service.updatePopupState(!this.isPopupOpen); // Inverse la valeur locale et l'envoie au service
  }

  openPopup(page: string) {
    this.activePage = page;
    this.changeValue(); // Appelle changeValue pour inverser isPopupOpen
  }

  closePopup() {
    this.activePage = '';
    this.changeValue(); // Appelle changeValue pour inverser isPopupOpen
  }
}
