export class User {
    constructor
        (
        public UserID: string,
        public BannedFood: string[],
        public Schedule: any[],
        public ShoppingList: any[],
        public UserName: string,
        ) {
    }
}