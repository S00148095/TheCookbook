import { Component } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  pageTitle: string;
  userInfo: any =
    {
      BannedFood: ["Mushroom", "Tomato", "Peanut"],
      Schedule: [{
        Date: "2017-12-11",
        Meal: "Toast"
      }, {
        Date: "2017-12-3",
        Meal: "Noodles"
      }, {
        Date: "2017-12-5",
        Meal: "Frozen Pizza"
      }],
      ShoppingList: [{
        Ingredient: "Bread",
        Quantity: "4 Slices"
      }, {
        Ingredient: "Butter",
        Quantity: "10g"
      }],
      UserID: "1",
      UserName: "Joe2"
    }

  constructor() {
  }

  ngOnInit() {
  }
}
