import { TestResult } from 'tslint/lib/test';
import { Component, Inject, ViewContainerRef } from '@angular/core';
import { Recipe } from '../recipe';
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent {
  numWanted: number;
  numGenerated: number;
  recipes: Recipe[] = [
    new Recipe("Beans on Toast", 5, 0, "https://i.imgur.com/GmNT8tF.jpg", ["Bread", "Beans"], ["Put bread in toaster at appropriate settings", "Put beans in microwave", "Wait for the toast and beans to be done", "Pour beans on top of the toast", "Serve"]),
    new Recipe("Toast", 5, 0, "https://i.imgur.com/sUTxDOn.jpg", ["Bread"], ["Put bread in toaster at appropriate settings", "Wait for the toast to be done", "Serve"])
  ]
  selectedRecipes:Recipe[]=[];

  constructor() {
    this.numWanted = 4
    this.numGenerated = 0;
  }
  TestResult(result){
    if(Number(result)) this.numWanted=result
    else this.OpenModal();
  }

  OpenModal()
  {
    myExtObject.openModal();
  }
  
  RemoveRecipe()
  {
    this.recipes.splice(0,1);
    if(this.recipes.length<=0)
    {
      //add code to get new recipes
      this.recipes=[
        new Recipe("Beans on Toast", 5, 0, "https://i.imgur.com/GmNT8tF.jpg", ["Bread", "Beans"], ["Put bread in toaster at appropriate settings", "Put beans in microwave", "Wait for the toast and beans to be done", "Pour beans on top of the toast", "Serve"]),
        new Recipe("Toast", 5, 0, "https://i.imgur.com/sUTxDOn.jpg", ["Bread"], ["Put bread in toaster at appropriate settings", "Wait for the toast to be done", "Serve"])
      ];
    }
  }

  AddRecipe()
  {
    this.selectedRecipes.push(this.recipes[0]);
    this.numGenerated++;
    this.RemoveRecipe();
  }

  ngAfterViewInit()
  {
    this.OpenModal();
  }
}