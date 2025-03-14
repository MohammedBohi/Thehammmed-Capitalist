import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { World } from './models/world.model';
import { Product } from './models/product.model';
import { Palier } from './models/palier.model';
import { WebserviceService } from './webservice.service';
import { ProductComponent } from './product/product.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  world: World = new World();
  user: string = 'DinoMaster';
  constructor(private service: WebserviceService) {}
    //   try {
    //     service.getWorld(this.user).then((world) => {
    //       this.world = world.data.getWorld;
    //     });
    //   } catch (error) {
    //     console.error('Erreur lors du chargement du monde :', error);
    //   }
    ngOnInit() {
      this.loadWorld();
    }
  
    loadWorld() {
      this.service.getWorld(this.user).then(response => {
        if (response?.data?.getWorld) {
          this.world = World.fromJSON(response.data.getWorld);
          console.log(' Monde chargé:', this.world);
        }
      }).catch(error => {
        console.error('Erreur lors du chargement du monde:', error);
      });
    }
  }
