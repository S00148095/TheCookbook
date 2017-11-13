import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList:string[] = [
    "Tomatoes","Garlic","Pasta","Mince","Onion"
  ]
  constructor() { }

  ngOnInit() {
  }

}
