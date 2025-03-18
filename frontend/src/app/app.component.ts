import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { World } from './models/world.model';
import { Product } from './models/product.model';
import { Palier } from './models/palier.model';
import { WebserviceService } from './webservice.service';
import { ProductComponent } from './product/product.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common'; 
import { ManagersComponent } from './managers/managers.component';
import { UpgradeproductsComponent } from './upgradeproducts/upgradeproducts.component';
import { UpgradeangelsComponent } from './upgradeangels/upgradeangels.component';
import { UnlocksComponent } from './unlocks/unlocks.component';
import { InvestorsComponent } from './investors/investors.component';

@Component({
  selector: 'app-root',
  standalone: true, 

  imports: [CommonModule, RouterOutlet, ProductComponent, SidebarComponent, ManagersComponent , UpgradeproductsComponent, 
    UpgradeangelsComponent, InvestorsComponent , UnlocksComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  world: World = new World();
  user: string = 'DinoMaster';
  multiplicateur: number = 1;   
  showManagers = false;
  showCashUpgrades = false;
  showAngelUpgrades = false;
  showUnlocks = false;
  showInvestors = false;

  

constructor(public webService: WebserviceService) {}
  //   try {
  //     service.getWorld(this.user).then((world) => {
  //       this.world = world.data.getWorld;
  //     });
  //   } catch (error) {
  //     console.error('Erreur lors du chargement du monde :', error);
  //   }
  ngOnInit() {
    this.webService.getWorld(this.user).then((response) => {
      if (response?.data?.getWorld) {
        this.world = response.data.getWorld;
      }
    });
}

 
  ajouterArgent(montant: number) {
    this.world.money += montant;
    this.world.score += montant;
    this.world = { ...this.world }; 

  }
  retirerArgent(montant: number) {
    this.world.money -= montant;
    this.world = { ...this.world }; 

  }
  toggleManagers() {
    this.showManagers = !this.showManagers;
  }
  toggleCashUpgrades() { this.showCashUpgrades = !this.showCashUpgrades; }
  toggleAngelUpgrades() { this.showAngelUpgrades = !this.showAngelUpgrades; }
  toggleUnlocks() { 
    this.showUnlocks = !this.showUnlocks; 
  }
  toggleInvestors() { 
    this.showInvestors = !this.showInvestors; 
  }
   
    onMultiplierChange() {
      if (this.multiplicateur === 1) {
        this.multiplicateur = 10;
      } else if (this.multiplicateur === 10) {
        this.multiplicateur = 100;
      } else if (this.multiplicateur === 100) {
        this.multiplicateur = -1; 
      } else {
        this.multiplicateur = 1;
      }
    }
    
    acheterCashUpgrade(upgrade: Palier) {
      this.webService.acheterCashUpgrade(this.world.name, upgrade).then(() => {
        upgrade.unlocked = true;
        this.world.money -= upgrade.seuil;
        this.webService.applyBonus(this.world, upgrade);
        this.world = { ...this.world }; 
      });
    }
    resetWorld() {
      this.webService.resetWorld(this.user).then(response => {
        if (response.data.resetWorld) {
          // Reload complet pour récupérer  les anges et le bonus
          this.webService.getWorld(this.user).then((res) => {
            this.world = res.data.getWorld;
            this.showInvestors = false;
          });
        }
      });
    }
    
    
    acheterAngelUpgrade(upgrade: Palier) {
      this.webService.acheterAngelUpgrade(this.world.name, upgrade).then(() => {
        upgrade.unlocked = true;
        this.world.activeangels -= upgrade.seuil;
        this.webService.applyBonus(this.world, upgrade);
        this.world = { ...this.world }; 
      });
    }
  
  }
  

  


