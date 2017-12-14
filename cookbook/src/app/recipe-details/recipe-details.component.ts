import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../User';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  userInfo: User;
  constructor(private service: StorageService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) {
    this.service.GetUserInfo().subscribe(res => {
      this.userInfo = res;
      if (this.userInfo.ShoppingList==undefined)
      {
        this.userInfo.ShoppingList=[];
      }
      if (this.userInfo.Schedule==undefined)
      {
        this.userInfo.Schedule=[];
      }
      if (this.userInfo.BannedFood==undefined)
      {
        this.userInfo.BannedFood=[];
      }
    });
   }

  GetRecipe(value) {
    this.service.sendGetRequestRecipeByID(value)
      .subscribe(res => {
        this.recipe = res;
        this.service.updateTitle(this.recipe.title+" - The Cookbook");
      });
  }
  CheckVisibility() {
    if (this.recipe != undefined && this.recipe != null) return true;
    else return false;
  }
  Add()
  {
    this.service.sendPostRequestUpdateScheduleAndShoppingList(this.formatPost());
  }
  formatPost() {
      var tempMeal={Meal:this.recipe.title,Date:this.datePipe.transform(new Date(), 'dd-MM-yyyy'),ID:this.recipe.id.toString()}
      this.userInfo.Schedule.push(tempMeal);
      this.recipe.extendedIngredients.forEach(ingredient => {
        this.userInfo.ShoppingList.push({"Done" : "No",
        "Ingredient" : ingredient.name,
        "Quantity" : ingredient.amount+" "+ingredient.unit});
      });
    return {
      "Schedule": this.userInfo.Schedule,
      "ShoppingList":this.userInfo.ShoppingList
    }
  }
  ngOnInit() {
    this.route.queryParams
      .filter(params => params.id)
      .subscribe(params => {
        if (params['id']) {
          this.GetRecipe(params.id);
        }
      });
  }

}
