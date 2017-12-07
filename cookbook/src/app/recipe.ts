export interface Recipe {
    id: number,
    title: string,
    readyInMinutes: number,
    image:string,
    ingredients:string[],
    steps:string[]        
}