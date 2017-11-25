export class Recipe {
    constructor
        (
        public title: string,
        public readyInMinutes: number,
        public image:string,
        public ingredients:string[],
        public steps:string[]
        ) {
    }
}