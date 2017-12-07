import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  constructor(private service: StorageService, private router: Router, private route: ActivatedRoute) { }

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
