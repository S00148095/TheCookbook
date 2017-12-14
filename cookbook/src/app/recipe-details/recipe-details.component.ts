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
    this.service.GetUserInfo().subscribe(res => {//gets user information from the database
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

  GetRecipe(value) {//gets the recipe based upon the data passed to it(the queryParams)
    this.service.sendGetRequestRecipeByID(value)
      .subscribe(res => {
        this.recipe = res;
        this.service.updateTitle(this.recipe.title+" - The Cookbook");//updates the title
      });
  }
  CheckVisibility() {//checks if the recipe is able to be displayed and shows a loading screen if not
    if (this.recipe != undefined && this.recipe != null) return true;
    else return false;
  }
  Add()//adds the current recipe to the users schedule
  {
    this.service.sendPostRequestUpdateScheduleAndShoppingList(this.formatPost());
  }
  formatPost() {//formats the data into JSON format to post to the database
      var tempMeal={Meal:this.recipe.title,Date:this.datePipe.transform(new Date(), 'dd-MM-yyyy'),ID:this.recipe.id.toString()}//creates a temporary meal
      this.userInfo.Schedule.push(tempMeal);//adds the meal to the user's schedule
      this.recipe.extendedIngredients.forEach(ingredient => {//adds the ingredients from the recipes to the user's shopping list 
        this.userInfo.ShoppingList.push({"Done" : "No",
        "Ingredient" : ingredient.name,
        "Quantity" : ingredient.amount+" "+ingredient.unit});
      });
    return {//returns data in JSON format
      "Schedule": this.userInfo.Schedule,
      "ShoppingList":this.userInfo.ShoppingList
    }
  }
  ngOnInit() {
    this.route.queryParams//gets the id of the current recipe from the queryParams
      .filter(params => params.id)
      .subscribe(params => {
        if (params['id']) {
          this.GetRecipe(params.id);//gets the recipe based on the id from the queryParam
          //queryParams: https://alligator.io/angular/query-parameters/
        }
      });
  }

}
