export class Recipe {
    constructor
        (
        public name: string,
        public time: number,
        public difficulty: number,
        public imageUrl:string,
        public ingredients:string[],
        public steps:string[]
        ) {
    }
}