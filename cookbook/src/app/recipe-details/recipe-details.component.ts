import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  //Recipes:Recipe[]=[
    //new Recipe("Beans on Toast",5,0,"http://i263.photobucket.com/albums/ii151/daydrifter26/Toast-2.jpg",["Bread","Beans"],["Put bread in toaster at appropriate settings","Put beans in microwave","Wait for the toast and beans to be done","Pour beans on top of the toast","Serve"])
  //]

  recipeName: string = "Beans on Toast";
  constructor() { }

  ngOnInit() {
  }

}
