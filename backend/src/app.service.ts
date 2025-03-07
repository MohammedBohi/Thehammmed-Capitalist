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
          throw new Error('Erreur d’écriture du monde côté serveur');
        }
      },
    );
  }
  mettreAJourGains(user: string): void {
    const world = this.readUserWorld(user);
    const maintenant = Date.now();
    const tempsEcoule = maintenant - world.lastupdate;
    const bonusAnges = 1 + (world.activeangels * world.angelbonus) / 100;

    world.products.forEach((product) => {
      if (product.quantite > 0) {
        if (!product.managerUnlocked) {
          if (product.timeleft > 0) {
            if (product.timeleft <= tempsEcoule) {
              world.money += product.revenu * product.quantite;
              world.score += product.revenu * product.quantite;
              product.timeleft = 0;
            } else {
              product.timeleft -= tempsEcoule;
            }
          }
        } else {
          const cycles = Math.floor(tempsEcoule / product.vitesse);
          if (cycles > 0) {
            world.money +=
              cycles * product.revenu * product.quantite * bonusAnges;
            world.score +=
              cycles * product.revenu * product.quantite * bonusAnges;
          }
          product.timeleft = product.vitesse - (tempsEcoule % product.vitesse);
        }
      }
    });

    // ✅ Mise à jour de `lastupdate`
    world.lastupdate = maintenant;
    this.saveWorld(user, world);
  }
}
