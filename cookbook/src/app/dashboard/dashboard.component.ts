import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { Router } from '@angular/router';
import { Meal } from '../Meal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userInfo: User;
  public uid: string;

  constructor(private service: StorageService, private router: Router) {
   }

  getUserInfo()
  {
    this.service.GetUserInfo().subscribe( res => { 
      this.userInfo = res;
      console.log(this.userInfo);
      });
  }
  MoveToDetails(meal:Meal)
  {
    this.router.navigate(["../details"],{ queryParams: { id: meal.ID } });
  }
  ngOnInit() {
    this.getUserInfo();
    this.service.updateTitle("Dashboard - The Cookbook");
  }
}
