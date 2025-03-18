import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { World } from './models/world.model';
import { Product } from './models/product.model';
import { Palier } from './models/palier.model';
import { WebserviceService } from './webservice.service';
import { ProductComponent } from './product/product.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-root',
  standalone: true, 

  imports: [CommonModule, RouterOutlet, ProductComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  world: World = new World();
  user: string = 'DinoMaster';
  constructor(private webService: WebserviceService) {}
  //   try {
  //     service.getWorld(this.user).then((world) => {
  //       this.world = world.data.getWorld;
  //     });
  //   } catch (error) {
  //     console.error('Erreur lors du chargement du monde :', error);
  //   }
  ngOnInit() {
    this.webService.world$.subscribe((world: World) => {
      if (world) {
        console.log("🌍 World reçu dans app.component.ts :", world);
  
        // 🟢 Forçage de nouvelle référence
        this.world = {
          ...world,
          products: [...world.products] // 👈 on clone le tableau pour forcer Angular à détecter le changement
        };
      }
    });
  
    this.webService.getWorld(this.user);
  }
  handleWorldChanged() {
    this.world = { ...this.world, products: [...this.world.products] };
  }
  
  
    logTemplate() {
      console.log("🟢 Template détecte le world :", this.world);
      return '';
    }
    

  
  
  }
  

  


