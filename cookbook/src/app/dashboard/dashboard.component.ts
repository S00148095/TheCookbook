import { Component } from '@angular/core';
import { IUser } from './user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  pageTitle: string;
  users: IUser[] = [
    {
      bannedFood: [],
      schedule: [],
      shoppingList: ["Tomatoes","Garlic","Pasta","Mince","Onion"],
      username: 'Joe Bloggs',
      userEmail: 'abc@mail.com',
      password: 'abcdefg'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
 }

}
