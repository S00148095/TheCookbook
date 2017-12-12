import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { User } from '../User';
import { DatePipe } from '@angular/common';
import { Meal } from '../Meal';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from '../services/auth.service';
import 'script.js';
import { DragulaService } from 'ng2-dragula';

declare var myExtObject: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements AfterViewInit {
  userInfo: User;
  now: Date;
  DateRangeStart: Date;
  DateRangeEnd: Date;
  DateRangeStartString: string;
  Day2String: string;
  Day3String: string;
  Day4String: string;
  Day5String: string;
  Day6String: string;
  DateRangeEndString: string;
  temp: Meal[] = [];
  scheduleDay1: Meal[] = [];
  scheduleDay2: Meal[] = [];
  scheduleDay3: Meal[] = [];
  scheduleDay4: Meal[] = [];
  scheduleDay5: Meal[] = [];
  scheduleDay6: Meal[] = [];
  scheduleDay7: Meal[] = [];
  testSchedule: Meal[] = [];
  day2: Date = new Date;
  day3: Date = new Date;
  day4: Date = new Date;
  day5: Date = new Date;
  day6: Date = new Date;
  hasDropped: boolean;

  constructor(public authService: AuthService, private dragulaService: DragulaService, private service: StorageService, private datePipe: DatePipe, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.hasDropped = false;
    this.service.GetUserInfo().subscribe(res => {
      this.userInfo = res;
      this.testSchedule = this.userInfo.Schedule;
      this.now = new Date;
      this.DateRangeStart = new Date;
      this.DateRangeEnd = new Date;
      this.SetEndDate();
    });
    dragulaService.drop.subscribe((value: any) => {
      this.hasDropped = true;
    });
  }
  Remove(i) {
    this.testSchedule.splice(i, 1);
  }
  toDate(date) {
    var datearray = date.split("-");
    return datearray[1] + '-' + datearray[0] + '-' + datearray[2];
  }
  CheckVisibility() {
    if (this.userInfo != undefined && this.userInfo != null) return true;
    else return false;
  }
  Commit() {
    if (this.testSchedule!=undefined) {
      for (var i = 0; i < this.testSchedule.length; i++) {
        if (Date.parse(this.toDate(this.testSchedule[i].Date))) {
          if (i == this.testSchedule.length - 1) {
            this.userInfo.Schedule = this.testSchedule;
            this.service.sendPostRequestUpdateSchedule(this.formatPost(this.userInfo.Schedule));
            this.authService.showSuccess("Saved successfully");
            this.splitSchedule();
            myExtObject.Expand();
          }
        }
        else {
          this.testSchedule = [];
          this.service.GetUserInfo().subscribe(res => {
            this.userInfo = res;
            this.testSchedule = this.userInfo.Schedule;
          });
          this.authService.ShowWarning("Invalid date");
          break;
        }
      }
    }
    else{
      myExtObject.Expand();
    }
  }
  formatPost(array) {
    return {
      "Schedule": array
    }
  }
  Revert() {
    this.splitSchedule();
    this.hasDropped = false;
  }
  RevertFull() {
    this.service.GetUserInfo().subscribe(res => {
      this.userInfo = res;
      this.testSchedule = this.userInfo.Schedule;
    });
  }
  CommitDrag(array) {
    this.userInfo.Schedule.forEach(element => {
      if (element.Date > this.DateRangeEndString || element.Date < this.DateRangeStartString) {
        this.temp.push(element);
      }
    });
    this.userInfo.Schedule = [];
    this.userInfo.Schedule = this.temp;
    this.scheduleDay1.forEach(element => {
      element.Date = this.DateRangeStartString;
      this.userInfo.Schedule.push(element);
    });
    this.scheduleDay2.forEach(element => {
      element.Date = this.Day2String;
      this.userInfo.Schedule.push(element);
    });
    this.scheduleDay3.forEach(element => {
      element.Date = this.Day3String;
      this.userInfo.Schedule.push(element);
    });
    this.scheduleDay4.forEach(element => {
      element.Date = this.Day4String;
      this.userInfo.Schedule.push(element);
    });
    this.scheduleDay5.forEach(element => {
      element.Date = this.Day5String;
      this.userInfo.Schedule.push(element);
    });
    this.scheduleDay6.forEach(element => {
      element.Date = this.Day6String;
      this.userInfo.Schedule.push(element);
    });
    this.scheduleDay7.forEach(element => {
      element.Date = this.DateRangeEndString;
      this.userInfo.Schedule.push(element);
    });
    this.service.sendPostRequestUpdateSchedule(this.formatPost(this.userInfo.Schedule));
    this.authService.showSuccess("Saved successfully");
    this.hasDropped = false;
  }
  splitSchedule() {
    this.scheduleDay1 = [];
    this.scheduleDay2 = [];
    this.scheduleDay3 = [];
    this.scheduleDay4 = [];
    this.scheduleDay5 = [];
    this.scheduleDay6 = [];
    this.scheduleDay7 = [];

    this.userInfo.Schedule.forEach(element => {
      if (element.Date == this.DateRangeStartString) {
        this.scheduleDay1.push(element);
      }
      else if (element.Date == this.Day2String) {
        this.scheduleDay2.push(element);
      }
      else if (element.Date == this.Day3String) {
        this.scheduleDay3.push(element);
      }
      else if (element.Date == this.Day4String) {
        this.scheduleDay4.push(element);
      }
      else if (element.Date == this.Day5String) {
        this.scheduleDay5.push(element);
      }
      else if (element.Date == this.Day6String) {
        this.scheduleDay6.push(element);
      }
      else if (element.Date == this.datePipe.transform(this.DateRangeEnd, 'dd-MM-yyyy')) {
        this.scheduleDay7.push(element);
      }
    });
  }
  SetEndDate() {
    this.DateRangeEnd = this.addDays(this.DateRangeStart, 6);
    this.DateRangeStartString = this.datePipe.transform(this.DateRangeStart, 'dd-MM-yyyy');
    this.DateRangeEndString = this.datePipe.transform(this.DateRangeEnd, 'dd-MM-yyyy');
    this.day2 = this.addDays(this.DateRangeStart, 1);
    this.Day2String = this.datePipe.transform(this.day2, 'dd-MM-yyyy');
    this.day3 = this.addDays(this.DateRangeStart, 2);
    this.Day3String = this.datePipe.transform(this.day3, 'dd-MM-yyyy');
    this.day4 = this.addDays(this.DateRangeStart, 3);
    this.Day4String = this.datePipe.transform(this.day4, 'dd-MM-yyyy');
    this.day5 = this.addDays(this.DateRangeStart, 4);
    this.Day5String = this.datePipe.transform(this.day5, 'dd-MM-yyyy');
    this.day6 = this.addDays(this.DateRangeStart, 5);
    this.Day6String = this.datePipe.transform(this.day6, 'dd-MM-yyyy');
    if (this.userInfo.Schedule != undefined) {
      this.splitSchedule();
    }
  }
  Previous() {
    this.DateRangeStart = this.addDays(this.DateRangeStart, -7);
    this.SetEndDate();
  }
  Now() {
    this.DateRangeStart = this.addDays(this.now, 0);
    this.SetEndDate();
  }
  Next() {
    this.DateRangeStart = this.addDays(this.DateRangeStart, 7);
    this.SetEndDate();
  }
  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  ngAfterViewInit(): void {
    this.service.updateTitle("Schedule - The Cookbook");
  }
}
