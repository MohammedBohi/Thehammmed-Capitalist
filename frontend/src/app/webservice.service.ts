import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import { GET_WORLD } from './Grapqhrequests';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebserviceService {
  server = 'http://localhost:4000/';
  //user = 'toto';
  private ispopupOpen = new BehaviorSubject<boolean>(false); // Variable commune
  popupState = this.ispopupOpen.asObservable(); // Observable pour écouter les changements

  constructor() {}

  createClient() {
    // permet de créer un client GraphQL qui se connecte au serveur
    return new Client({
      url: this.server,
      exchanges: [fetchExchange], //permet d'envoyer des requêtes HTTP
    });
  }
  getWorld(user: string) {
    return this.createClient()
      .query(GET_WORLD, { user }) //{ user: user })
      .toPromise();
  }

  updatePopupState(newState: boolean) {
    this.ispopupOpen.next(newState); // Met à jour la valeur et notifie tous les abonnés
  }

  getPopupState(): boolean {
    return this.ispopupOpen.getValue(); // Permet de récupérer la valeur actuelle
  }
}
