import { StorageService } from '../services/storage.service';
import { TestResult } from 'tslint/lib/test';
import { Component, Inject, ViewContainerRef } from '@angular/core';
import { Recipe } from '../recipe';
import { User } from '../User';
import 'script.js';
import { Meal } from '../Meal';
import { DatePipe } from '@angular/common';

declare var myExtObject: any;
//Importing JS files into component: https://plnkr.co/edit/b2kAztHntMuNjTfOv8jD?p=preview

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent {
  numWanted: number;
  numGenerated: number;
  recipes: any[] = []
  selectedRecipes: Recipe[] = [];
  userInfo: User;
  tempMeal:Meal;

  constructor(private service: StorageService, private datePipe: DatePipe) {
    this.GetRecipes();
    this.numWanted = 1;
    this.numGenerated = 0;
    this.service.GetUserInfo().subscribe(res => {//calls a method from the service to get the details of the current user
      this.userInfo = res;
      if (this.userInfo.ShoppingList==undefined)//sets the arrays in case the user had none in the database
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
  OpenModal() {
    myExtObject.openModal();//calls external javascript to open the modal
  }
  Decrement()//decrements the number of meals the user wantss to generate
  {
    this.numWanted--;
    if(this.numGenerated>=this.numWanted)
    {    
      this.service.sendPostRequestUpdateScheduleAndShoppingList(this.formatPost());//if the user has generated enough meals post to database
    }
  }
  Increment()//increments the number of meals the user wants to generate
  {
    this.numWanted++;
  }
  GetRecipes() {//gets recipes by calling the API through the service
    this.service.sendGetRequestRandomRecipes()
      .subscribe(res => {
        this.recipes = res.recipes;//assigns the response to the array to display them
      });
  }
  RemoveRecipe() {//removes a recipe from the array and gets new ones if needed
    this.recipes.splice(0, 1);
    if (this.recipes.length <= 0) {
      this.GetRecipes();
    }
  }
  AddRecipe() {//adds a recipe to the recipes the user has decide to keep
    this.selectedRecipes.push(this.recipes[0]);
    this.numGenerated++;
    this.RemoveRecipe();
    if(this.numGenerated>=this.numWanted)//if enough have been generated post to database
    {    
      this.service.sendPostRequestUpdateScheduleAndShoppingList(this.formatPost());
    }
  }
  formatPost() {//formats the data into JSON format to post to the database
    this.selectedRecipes.forEach(element => {
      this.tempMeal={Meal:element.title,Date:this.datePipe.transform(new Date(), 'dd-MM-yyyy'),ID:element.id.toString()}//creates a temporary meal
      this.userInfo.Schedule.push(this.tempMeal);//adds the meal to the user's schedule
      element.extendedIngredients.forEach(ingredient => {//adds the ingredients from the recipes to the user's shopping list 
        this.userInfo.ShoppingList.push({"Done" : "No",
        "Ingredient" : ingredient.name,
        "Quantity" : ingredient.amount+" "+ingredient.unit});
      });
    });
    return {//returns data in JSON format
      "Schedule": this.userInfo.Schedule,
      "ShoppingList":this.userInfo.ShoppingList
    }
  }
  CheckVisibility() {//checks if there are recipes to show and if not the loading screen is shown
    if (this.recipes != undefined && this.recipes != null) {
      if (this.recipes.length > 0) {
        return true;
      }
      else return false;
    }
    else return false;
  }
  ngAfterViewInit() {
    this.service.updateTitle("Generation - The Cookbook");//updates the title
    this.OpenModal();
  }
}