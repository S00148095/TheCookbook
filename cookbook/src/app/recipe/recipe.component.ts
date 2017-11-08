import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  inputs:['Recipe'],
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  Recipe:Recipe;
  constructor() { }

  ngOnInit() {
  }

}
