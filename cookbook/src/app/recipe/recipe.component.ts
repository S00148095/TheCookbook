import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  inputs:['recipe'],
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe:Recipe;
  constructor(private service:StorageService, private router: Router) { }

  MoveToDetails()
  {
    this.router.navigate(["../details"],{ queryParams: { id: this.recipe.id } });
  }
  ngOnInit() {
  }

}
