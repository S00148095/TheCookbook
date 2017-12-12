import { StorageService } from '../services/storage.service';
import { TestResult } from 'tslint/lib/test';
import { Component, Inject, ViewContainerRef } from '@angular/core';
import { Recipe } from '../recipe';
import { User } from '../User';
import 'script.js';
import { Meal } from '../Meal';
import { DatePipe } from '@angular/common';

declare var myExtObject: any;

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
  OpenModal() {
    myExtObject.openModal();
  }
  Decrement()
  {
    this.numWanted--;
    if(this.numGenerated>=this.numWanted)
    {    
      this.service.sendPostRequestUpdateScheduleAndShoppingList(this.formatPost());
    }
  }
  Increment()
  {
    this.numWanted++;
  }
  GetRecipes() {
    this.service.sendGetRequestRandomRecipes()
      .subscribe(res => {
        this.recipes = res.recipes;
      });
  }
  RemoveRecipe() {
    this.recipes.splice(0, 1);
    if (this.recipes.length <= 0) {
      this.GetRecipes();
    }
  }
  AddRecipe() {
    this.selectedRecipes.push(this.recipes[0]);
    this.numGenerated++;
    this.RemoveRecipe();
    if(this.numGenerated>=this.numWanted)
    {    
      this.service.sendPostRequestUpdateScheduleAndShoppingList(this.formatPost());
    }
  }
  formatPost() {
    this.selectedRecipes.forEach(element => {
      this.tempMeal={Meal:element.title,Date:this.datePipe.transform(new Date(), 'dd-MM-yyyy'),ID:element.id.toString()}
      this.userInfo.Schedule.push(this.tempMeal);
      element.extendedIngredients.forEach(ingredient => {
        this.userInfo.ShoppingList.push({"Done" : "No",
        "Ingredient" : ingredient.name,
        "Quantity" : ingredient.amount+" "+ingredient.unit});
      });
    });
    return {
      "Schedule": this.userInfo.Schedule,
      "ShoppingList":this.userInfo.ShoppingList
    }
  }
  CheckVisibility() {
    if (this.recipes != undefined && this.recipes != null) {
      if (this.recipes.length > 0) {
        return true;
      }
      else return false;
    }
    else return false;
  }
  ngAfterViewInit() {
    this.service.updateTitle("Generation - The Cookbook");
    this.OpenModal();
  }
}