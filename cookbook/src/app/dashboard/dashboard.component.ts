import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userInfo: Observable<any>;
  public uid: string;
  retryCount:number=0;

  constructor(private service: StorageService) { }

  getUserInfo()
  {
    this.service.GetUserInfo().subscribe( res => { 
      this.userInfo = res;
      console.log(this.userInfo);
      });
  }
  ngOnInit() {
    this.getUserInfo();
  }
}
