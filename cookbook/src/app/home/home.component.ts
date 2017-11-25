import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: any[] = []
  constructor(private service:StorageService) { }

  GetRecipes()
  {
    this.service.sendGetRequest()
    .subscribe(res => {
      this.recipes = res.recipes;
  });
  }
  CheckVisibility()
  {
    if(this.recipes.length>0)
    {
      return true;
    }
    else return false;
  }
  ngOnInit() {
    this.GetRecipes();
  }
}
