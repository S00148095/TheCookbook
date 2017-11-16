import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Recipes:Recipe[]=[
    new Recipe("Beans on Toast",5,0,"https://i.imgur.com/GmNT8tF.jpg",["Bread","Beans"],["Put bread in toaster at appropriate settings","Put beans in microwave","Wait for the toast and beans to be done","Pour beans on top of the toast","Serve"]),
    new Recipe("Toast",5,0,"https://i.imgur.com/sUTxDOn.jpg",["Bread"],["Put bread in toaster at appropriate settings","Wait for the toast to be done","Serve"])
  ]
  constructor() { }

  ngOnInit() {
  }
}
