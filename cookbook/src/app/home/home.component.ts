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
  showButton: boolean;
  recipes: any[] = []
  constructor(private service:StorageService) {    
   }

  GetRecipes()//gets recipes to display from the API
  {
    this.showButton=false;//hides the button and shows the loading screen
    this.service.sendGetRequestRandomRecipes()
    .subscribe(res => {
      this.showButton=true;//shows the button
      res.recipes.forEach(element => {//assigns the recipes to the display array       
      this.recipes.push(element);
    });
  });
  }
  CheckVisibility()
  {
    if(this.recipes!=undefined&&this.recipes!=null)//ensures there are recipes to show and shows the loading screen if there aren't
    {
      if(this.recipes.length>0)
      {
        return true;
      }
      else return false;
    }
    else return false;
  }
  ngOnInit() {
    this.GetRecipes();
    this.service.updateTitle("Home - The Cookbook");//updates title
  }
}
