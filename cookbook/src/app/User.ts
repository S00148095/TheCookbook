//Used with the user info from the database
import { Meal } from "./Meal";

export interface User {
    BannedFood: string[],
    Schedule: Meal[],
    ShoppingList: any[],
    UserID: string,
    UserName: string
}