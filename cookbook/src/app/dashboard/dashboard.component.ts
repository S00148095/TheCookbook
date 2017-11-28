import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { User } from '../User';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userInfo: Observable<any[]>;
   
  constructor(private db: AngularFireDatabase) {
    //let userInfo = this.db.list('the-cookbook');
  }

  ngOnInit() {
  }
}
