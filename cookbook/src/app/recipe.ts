import { Ingredient } from "./Ingredient";

export interface Recipe {
    id: number,
    title: string,
    readyInMinutes: number,
    image:string,
    extendedIngredients:Ingredient[],
    steps:string[]        
}