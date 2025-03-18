import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { origworld } from './origworld';
import { World } from './graphql';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  readUserWorld(user: string): World {
    try {
      const data = fs.readFileSync(
        path.join(process.cwd(), 'userworlds/', user + '-world.json'),
      );
      return JSON.parse(data.toString());
    } catch (e: unknown) {
      console.log((e as Error).message);
      this.saveWorld(user, origworld);
      return origworld;
    }
  }

  saveWorld(user: string, world: World) {
    fs.writeFile(
      path.join(process.cwd(), 'userworlds/', user + '-world.json'),
      JSON.stringify(world),
      (err) => {
        if (err) {
          console.error(err);
          throw new Error(`Erreur d'écriture du monde coté serveur`);
        }
      },
    );
  }

  mettreAJourGains(user: string): void {
    const world = this.readUserWorld(user);
    const maintenant = Date.now();
    const tempsEcoule = maintenant - world.lastupdate;
    const bonusAnges = 1 + (world.activeangels * world.angelbonus) / 100; // Bonus total des anges actifs

    world.products.forEach((product) => {
      if (product.quantite > 0) {
        // Si le joueur possède au moins un exemplaire du produit
        if (!product.managerUnlocked) {
          // Cas sans manager (production manuelle)
          if (product.timeleft > 0) {
            if (product.timeleft <= tempsEcoule) {
              // La production vient de finir
              world.money += product.revenu * product.quantite; // Mise à jour dE L'argent total
              world.score += product.revenu * product.quantite; // Mise à jour du score total
              product.timeleft = 0;
            } else {
              product.timeleft -= tempsEcoule; // Soustraction du temps écoulé à la production en cours
            }
          }
        } else {
          // Cas avec manager (production automatique)
          if (product.timeleft > 0 && product.timeleft <= tempsEcoule) {
            world.money += product.revenu * product.quantite * bonusAnges;
            world.score += product.revenu * product.quantite * bonusAnges;
            const tempsRestantApresCycle = tempsEcoule - product.timeleft;
            const cyclesComplets = Math.floor(
              tempsRestantApresCycle / product.vitesse,
            );
            world.money +=
              cyclesComplets * product.revenu * product.quantite * bonusAnges;
            world.score +=
              cyclesComplets * product.revenu * product.quantite * bonusAnges;
            product.timeleft =
              tempsRestantApresCycle % product.vitesse === 0
                ? 0 // Aucun temps restant
                : product.vitesse - (tempsRestantApresCycle % product.vitesse);
          } else if (product.timeleft > tempsEcoule) {
            // La production est toujours en cours, on met à jour `timeleft`
            product.timeleft -= tempsEcoule;
          } else {
            // Aucun cycle en cours, on calcule les cycles complets directement
            const cyclesComplets = Math.floor(tempsEcoule / product.vitesse);
            world.money +=
              cyclesComplets * product.revenu * product.quantite * bonusAnges;
            world.score +=
              cyclesComplets * product.revenu * product.quantite * bonusAnges;
            product.timeleft =
              tempsEcoule % product.vitesse === 0
                ? 0
                : product.vitesse - (tempsEcoule % product.vitesse);
          }
        }
      }
    });

    world.lastupdate = maintenant;
    this.saveWorld(user, world);
  }
}
