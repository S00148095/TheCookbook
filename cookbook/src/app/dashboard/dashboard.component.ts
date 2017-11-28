import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { User } from '../User';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userInfo: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private service: StorageService) {
    let userInfo = this.service.GetUserInfo();
  }

  ngOnInit() {
  }
}
