import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Recipes:Recipe[]=[
    new Recipe("Toast",5,0,"",["Bread"],["Put bread in toaster at appropriate settings","Wait for the toast to be done","Serve"]),
  ]
  constructor() { }

  ngOnInit() {
  }

}
