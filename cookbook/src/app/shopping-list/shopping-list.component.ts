import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public userInfo: Observable<any>;
  
  constructor(private service: StorageService) { }

  ngOnInit() {
    this.service.GetUserInfo().subscribe( res => { 
      this.userInfo = res;
      console.log(JSON.stringify(this.userInfo));
      });
  }

  MarkSuccess(item: string) {
    console.log(item);
  }

  EditItem(item: string) {
    console.log(item);
  }

  RemoveItem(item: string) {
    console.log(item);
  }
}
