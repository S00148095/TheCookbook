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

  constructor(private service: StorageService) { }

  ngOnInit() {
    this.service.GetUserInfo().subscribe( res => { 
      this.userInfo = res;
      console.log(JSON.stringify(this.userInfo));
      });
  }
}
