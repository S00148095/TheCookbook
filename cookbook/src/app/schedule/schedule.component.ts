import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { User } from '../User';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  userInfo:User;
  constructor(private service:StorageService) { }

  ngOnInit() {
    this.service.GetUserInfo().subscribe( res => { 
      this.userInfo = res;
      console.log(JSON.stringify(this.userInfo));
      });
  }

}
