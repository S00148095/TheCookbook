import { StorageService } from '../services/storage.service';
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
  recipes: any[] = []
  selectedRecipes: string[] = [];

  constructor(private service: StorageService) {
    this.GetRecipes();
    this.numWanted = 1;
    this.numGenerated = 0;
  }
  OpenModal() {
    myExtObject.openModal();
  }
  GetRecipes() {
    this.service.sendGetRequest()
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
    this.selectedRecipes.push(this.recipes[0].title);
    this.numGenerated++;
    this.RemoveRecipe();
    if(this.numGenerated>=this.numWanted)
    {
      
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
    this.OpenModal();
  }
}