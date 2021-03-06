import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    // private ingredients: Ingredient[] = [
    //     new Ingredient("Tomatoes", 4),
    //     new Ingredient("Basil Leaves", 6)
    // ];
    private ingredients: Ingredient[] = [];
    public ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    constructor() { }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        //spread operator ("...") turns the array into a list
        //otherwise we will push an array of ingredients
        //rather than the ingredients themselves
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        console.log(index)
        console.log(this.ingredients)
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1)
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}