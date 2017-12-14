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
  constructor(private service: StorageService, private authservice: AuthService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.service.updateTitle("Shopping List- The Cookbook");
    this.RefreshData();
  }
  //Refreshes the main data on the webpage
  private RefreshData() {
    this.service.GetUserInfo().subscribe(res => {
      this.userInfo = res;
      //Makes sure the shopping list actually exists
      if (this.userInfo.ShoppingList !== undefined) {
        for (var i = 0; i < this.userInfo.ShoppingList.length; i++) {
          this.boolArray[i] = true;
        }
      }
    });
  }
  //Prepares a new item to be added to the shopping list in the database
  InsertNewShoppingItem(itemName: string, quantity: string) {
    if (this.userInfo.ShoppingList != null) {
      //Count the number of items in the array of shopping list
      this.shoppingListCount = (this.userInfo.ShoppingList.length).toString();
    }
    else {
      //It can only be 0 if there is nothing in the shopping list array
      this.shoppingListCount = "0";
    }
    this.shoppingList = {
      [this.shoppingListCount]: {
        Ingredient: itemName,
        Quantity: quantity,
        Done: "No"
      }
    };
    //Push changes to the database
    this.service.UpdateShoppingList(this.shoppingList).subscribe(res => {
      this.shoppingList = res;
      //Force a refresh
      this.RefreshData();
      //Toaster notification
      this.authservice.showSuccess("Item added");
    });
  }
  //When marked yes, there will be a strikethrough on the item
  MarkSuccess(index: number, item: string, quantity: string) {
    //Makes sure it is a valid index
    if (index !== -1) {
      this.shoppingList = {
        Ingredient: item,
        Quantity: quantity,
        Done: "Yes"
      };
      //Pushes changes
      this.service.MarkShoppingListItem(this.shoppingList, index).subscribe(res => {
        this.shoppingList = res;
        this.RefreshData();
      });
    }
  }
  //Changes the <p> elements to allow the user to 
  //edit the item name and the quantity of a product
  EditItem(index: number, itemName: string, quantity: string) {
    if (this.previousIndex !== null) {
      //Used when selecting another item while editing the first,
      //will close the first item and open the second
      this.boolArray[this.previousIndex] = true;
      this.boolArray[index] = false;
      this.index = index;
      //Item name and quantity are updated
      this.itemName = itemName;
      this.quantity = quantity;
      this.previousIndex = index;
    }
  }
  //Remove item from shopping list
  RemoveItem(index: number) {
    //Valid index
    if (index !== -1) {
      //Removes item from array based on index
      this.userInfo.ShoppingList.splice(index, 1);
      //Update database
      this.service.RemoveShoppingListItem(JSON.stringify(this.userInfo.ShoppingList)).subscribe(res => {
        this.shoppingList = res;
        //Toaster notification
        this.authservice.showDanger("Successfully removed");
      });;
    }
  }
  //User decides to cancel an edit
  Cancel() {
    for (var i = 0; i < this.userInfo.ShoppingList.length; i++) {
      //Closes input field area
      this.boolArray[i] = true;
    }
  }
  //When an item is updated, it is marked as not done
  //since it could be a different item entirely
  UpdateItem(itemName: string, quantity: string) {
    this.shoppingList = {
      [this.index]: {
        Ingredient: itemName,
        Quantity: quantity,
        Done: "No"
      }
    };
    //Update databse
    this.service.EditShoppingListItem(this.shoppingList).subscribe(res => {
      this.shoppingList = res;
      this.RefreshData();
      //Toaster notification
      this.authservice.showInfo("Item edited succesfully");
    });
  }
  //Adds styling to text if it is marked as done
  CheckedMarked(done: string) {
    if (done === "Yes") {
      return "line-through";
    }
    else {
      return "";
    }
  }
}
