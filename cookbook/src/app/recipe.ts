import { Ingredient } from "./Ingredient";

export interface Recipe {
    id: number,
    title: string,
    readyInMinutes: number,
    image: string,
    extendedIngredients: Ingredient[],
    steps: string[],
    vegetarian: boolean,
    vegan: boolean,
    dairyFree: boolean,
    glutenFree: boolean,
    servings: number,
    analyzedInstructions: any[],
}