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
  public filteredDates: Meal[];

  constructor(private service: StorageService, private router: Router) {
  }

  GetUserInfo() {
    this.service.GetUserInfo().subscribe(res => {
      this.userInfo = res;
      //Only checks if the schedule exists
      if (this.userInfo.Schedule != null || this.userInfo.Schedule != undefined) {
        //Sorts dates by closest
        this.filteredDates = this.userInfo.Schedule.sort(function (a, b) {
          if (a.Date < b.Date) {
            return -1;
          } else if (a.Date > b.Date) {
            return 1;
          } else {
            return 0;
          }
        })
      };
    });
  }

  MoveToDetails(meal: Meal) {
    this.router.navigate(["../details"], { queryParams: { id: meal.ID } });
  }

  ngOnInit() {
    this.GetUserInfo();
    this.service.updateTitle("Dashboard - The Cookbook");
  }
  //Adds styling to text if it is marked as done
  CheckedMarked(done: string) {
    if (done === "Yes") {
      return "line-through";
    }
    else {
      return "";
    }
  }
}
