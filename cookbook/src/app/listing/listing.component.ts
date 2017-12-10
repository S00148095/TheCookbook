import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  public userInfo: User;
  public shoppingListCount: string;
  public shoppingList: Object;
  constructor(private service: StorageService) { }

  ngOnInit() {
    this.service.GetUserInfo().subscribe( res => { 
      this.userInfo = res;
      console.log(JSON.stringify(this.userInfo));
      });
      this.service.updateTitle("Shopping List- The Cookbook");
  }

  insertNewShoppingItem(itemName: string, quantity: string) {
    this.shoppingListCount = (this.userInfo.ShoppingList.length).toString();
    this.shoppingList = { [this.shoppingListCount]: {
      Ingredient: itemName,
      Quantity: quantity,
      Done: "No" }};

    this.service.UpdateShoppingList(this.shoppingList).subscribe( res => { 
      this.shoppingList = res;
      });
  }

  MarkSuccess(item: string, quantity: string) {
    console.log(item, quantity);
  }

  EditItem(item: string) {
    console.log(item);
  }

  RemoveItem(item: string) {
  }
}
