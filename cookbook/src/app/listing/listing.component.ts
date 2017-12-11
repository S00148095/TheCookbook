import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from '../User';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  public userInfo: User;
  public shoppingListCount: string;
  public shoppingList: Object;
  public boolArray: boolean[] = [];
  public index: number;
  public previousIndex: number;
  public itemName: string;
  public quantity: string;
  constructor(private service: StorageService,private authservice:AuthService, public toastr: ToastsManager, vcr: ViewContainerRef)
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.service.updateTitle("Shopping List- The Cookbook");
    this.RefreshData();
  }

  private RefreshData() {
    this.service.GetUserInfo().subscribe(res => {
      this.userInfo = res;
      console.log(JSON.stringify(this.userInfo));
      for (var i = 0; i < this.userInfo.ShoppingList.length; i++) {
        this.boolArray[i] = true;
        (console.log(this.boolArray[i]));
      }
    });
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
      this.RefreshData();
      this.authservice.showSuccess("Item added");
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
        this.RefreshData();
      });
    }
  }

  EditItem(index: number, itemName: string, quantity: string) {
    if (this.previousIndex !== null) {
      this.boolArray[this.previousIndex] = true;
      this.boolArray[index] = false;
      this.index = index;
      this.itemName = itemName;
      this.quantity = quantity;
      console.log(index, this.boolArray[index]);
      this.previousIndex = index;
    }
  }

  RemoveItem(index: number) {
    if (index !== -1) {
      this.userInfo.ShoppingList.splice(index, 1);
      console.log(JSON.stringify(this.userInfo.ShoppingList));
      this.service.RemoveShoppingListItem(JSON.stringify(this.userInfo.ShoppingList)).subscribe(res => {
        this.shoppingList = res;
        this.authservice.showSuccess("Successfully removed");
      });;
    }
  }

  Cancel() {
    for (var i = 0; i < this.userInfo.ShoppingList.length; i++) {
      this.boolArray[i] = true;
      console.log(this.boolArray[i]);
    }
  }

  UpdateItem(itemName: string, quantity: string) {
    this.shoppingList = {
      [this.index]: {
        Ingredient: itemName,
        Quantity: quantity,
        Done: "No"
      }
    };

    this.service.EditShoppingListItem(this.shoppingList).subscribe(res => {
      this.shoppingList = res;
      this.RefreshData();
      this.authservice.showSuccess("Item edited succesfully");
    });
  }

  CheckedMarked(done: string) {
    if (done === "Yes") {
    return "line-through";
    }
    else {
      return "";
    }
  }
}
