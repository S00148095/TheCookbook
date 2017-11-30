import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userList: AngularFireList<User[]>;
  public uid: string;

  constructor(private service: StorageService) { }

  ngOnInit() {
    this.userList = this.service.GetUserList({ orderByChild: 'UserID', equalTo: this.service.uid })
    console.log(this.userList);
  }
}
