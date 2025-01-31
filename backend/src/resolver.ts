import { Product } from './graphql';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver('World')
export class GraphQlResolver {
  constructor(private service: AppService) {}
  @Query()
  getWorld(@Args('user') user: string) {
    const world = this.service.readUserWorld(user);
    return world;
  }
  @Mutation()
  async acheterQtProduit(
    @Args('user') user: string,
    @Args('id') id: number,
    @Args('quantite') quantite: number,
  ) {
    // Récupération du monde du joueur
    const world = this.service.readUserWorld(user);
    // Récupération du produit
    const product = world.products.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Le produit avec l'id ${id} n'existe pas`);
    }
    //Si product est undefined, null, false, 0, NaN, ou "" (chaîne vide), alors !product sera true.7

    let cost = 0;
    let currentCost = product.cout;
    for (let i = 0; i < quantite; i++) {
      cost += currentCost;
      currentCost *= product.croissance;
    }
  }
}
