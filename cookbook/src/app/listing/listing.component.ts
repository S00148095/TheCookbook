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
    this.service.GetUserInfo().subscribe(res => {
      this.userInfo = res;
      console.log(JSON.stringify(this.userInfo));
    });
    this.service.updateTitle("Shopping List- The Cookbook");
  }

  InsertNewShoppingItem(itemName: string, quantity: string) {
    this.shoppingListCount = (this.userInfo.ShoppingList.length).toString();
    this.shoppingList = {
      [this.shoppingListCount]: {
        Ingredient: itemName,
        Quantity: quantity,
        Done: "No"
      }
    };

    this.service.UpdateShoppingList(this.shoppingList).subscribe(res => {
      this.shoppingList = res;
    });
  }

  MarkSuccess(index: number, item: string, quantity: string) {
    if (index !== -1) {
      this.shoppingList = {
          Ingredient: item,
          Quantity: quantity,
          Done: "Yes"
        
      };

      this.service.MarkShoppingListItem(this.shoppingList, index).subscribe(res => {
        this.shoppingList = res;
      });
    }
  }

  EditItem(item: string) {
    console.log(item);
  }

  RemoveItem(index: number) {
    if (index !== -1) {
      this.userInfo.ShoppingList.splice(index, 1);
      console.log(JSON.stringify(this.userInfo.ShoppingList));
      this.service.RemoveShoppingListItem(JSON.stringify(this.userInfo.ShoppingList)).subscribe(res => {
        this.shoppingList = res;
      });;
    }
  }
}
