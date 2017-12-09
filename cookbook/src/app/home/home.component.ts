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

  GetRecipes()
  {
    this.showButton=false;
    this.service.sendGetRequestRandomRecipes()
    .subscribe(res => {
      this.showButton=true;
      res.recipes.forEach(element => {        
      this.recipes.push(element);
    });
  });
  }
  CheckVisibility()
  {
    if(this.recipes!=undefined&&this.recipes!=null)
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
    this.service.updateTitle("Home - The Cookbook");
  }
}
