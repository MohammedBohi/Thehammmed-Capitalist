import { Injectable } from '@angular/core';
import { Client, fetchExchange, gql } from '@urql/core';
import { GET_WORLD } from './Grapqhrequests';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebserviceService {
  server = 'http://localhost:4000/graphql';
  private client = new Client({ url: this.server, exchanges: [fetchExchange] });

  //user = 'toto';
  private ispopupOpen = new BehaviorSubject<boolean>(false); // Variable commune
  popupState = this.ispopupOpen.asObservable(); // Observable pour écouter les changements

  constructor() {}

  public updatePopupState(state: boolean) {
    this.ispopupOpen.next(state); // Met à jour la valeur de l'observable
  }

  getWorld(user: string) {
    const GET_WORLD = gql`
      query getWorld($user: String!) {
        getWorld(user: $user) {
          name
          money
          products {
            id
            name
            cout
            revenu
            vitesse
            quantite
            logo
          }
          managers {
            name
            seuil
            idcible
            unlocked
          }
        }
      }
    `;
    return this.client.query(GET_WORLD, { user }).toPromise();
  }

  acheterProduit(id: number, quantite: number) {
    const ACHETER_PRODUIT = gql`
      mutation acheterQtProduit($id: Int!, $quantite: Int!) {
        acheterQtProduit(id: $id, quantite: $quantite) {
          id
          quantite
          cout
        }
      }
    `;
    return this.client.mutation(ACHETER_PRODUIT, { id, quantite }).toPromise();
  }

  lancerProduction(id: number) {
    const LANCER_PRODUCTION = gql`
      mutation lancerProductionProduit($id: Int!) {
        lancerProductionProduit(id: $id) {
          id
          timeleft
        }
      }
    `;
    return this.client.mutation(LANCER_PRODUCTION, { id }).toPromise();
  }

  engagerManager(name: string) {
    const ENGAGER_MANAGER = gql`
      mutation engagerManager($name: String!) {
        engagerManager(name: $name) {
          name
          unlocked
        }
      }
    `;
    return this.client.mutation(ENGAGER_MANAGER, { name }).toPromise();
  }
}
