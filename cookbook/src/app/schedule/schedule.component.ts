import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { User } from '../User';
import { DatePipe } from '@angular/common';
import { Meal } from '../Meal';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from '../services/auth.service';
import 'script.js';
//Importing JS files into component: https://plnkr.co/edit/b2kAztHntMuNjTfOv8jD?p=preview
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
    this.toastr.setRootViewContainerRef(vcr);//sets the view container for the toasts
    this.hasDropped = false;
    this.service.GetUserInfo().subscribe(res => {//gets the current user
      this.userInfo = res;
      this.testSchedule = this.userInfo.Schedule;
      this.now = new Date;
      this.DateRangeStart = new Date;
      this.DateRangeEnd = new Date;
      this.SetEndDate();
    });
    dragulaService.drop.subscribe((value: any) => {//if a meal has been dragged show the buttons
      this.hasDropped = true;
      //dragula service: https://github.com/valor-software/ng2-dragula
    });
  }
  Remove(i) {//remove a meal
    this.testSchedule.splice(i, 1);
  }
  toDate(date) {//convert from dd-mm-yyyy to mm-dd-yyyy for testing with Date.parse
    console.log(date);
    var datearray = date.split("-");//splits the date by -
    console.log(datearray[1] + '-' + datearray[0] + '-' + datearray[2]);
    return datearray[1] + '-' + datearray[0] + '-' + datearray[2];
    //Converting dates: https://stackoverflow.com/questions/5433313/convert-dd-mm-yyyy-to-mm-dd-yyyy-in-javascript
  }
  CheckVisibility() {//checks if there is a user to show
    if (this.userInfo != undefined && this.userInfo != null) return true;
    else return false;
  }
  Commit() {//commits data to the database(full schedule edit)
    if (this.testSchedule!=undefined) {
      for (var i = 0; i < this.testSchedule.length; i++) {
        if (Date.parse(this.toDate(this.testSchedule[i].Date))) {//checks if the dates are valid
          if (i == this.testSchedule.length - 1) {//if this is the last meal, push to database
            this.userInfo.Schedule = this.testSchedule;
            this.service.sendPostRequestUpdateSchedule(this.formatPost(this.userInfo.Schedule));
            this.authService.showSuccess("Saved successfully");
            this.splitSchedule();//refreshes interface
            myExtObject.Expand();//closes accordian
          }
        }
        else {//resets and shows an error if there is an invalid date
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
  formatPost(array) {//puts the data into JSON format 
    return {
      "Schedule": array
    }
  }
  Revert() {//reverts back to original data on hitting cancel
    this.splitSchedule();
    this.hasDropped = false;
  }
  RevertFull() {//gets the users data from the databse to reset the data in the full schedule accordian
    this.service.GetUserInfo().subscribe(res => {
      this.userInfo = res;
      this.testSchedule = this.userInfo.Schedule;
    });
  }
  CommitDrag(array) {//commits data to the database(full schedule edit)
    this.userInfo.Schedule.forEach(element => {//puts all meals outside of the current date range into the array to go back to the database 
      if (element.Date > this.DateRangeEndString || element.Date < this.DateRangeStartString) {
        this.temp.push(element);
      }
    });
    this.userInfo.Schedule = [];//resets the user's schedule to remove the meals in the current date range
    this.userInfo.Schedule = this.temp;
    this.scheduleDay1.forEach(element => {//for each day add the meals in that day to the schedule
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
    this.service.sendPostRequestUpdateSchedule(this.formatPost(this.userInfo.Schedule));//sends newly sorted data to database
    this.authService.showSuccess("Saved successfully");
    this.hasDropped = false;
  }
  splitSchedule() {//splits the master user schedule into arrays for each day in the date range to show on ui
    this.scheduleDay1 = [];
    this.scheduleDay2 = [];
    this.scheduleDay3 = [];
    this.scheduleDay4 = [];
    this.scheduleDay5 = [];
    this.scheduleDay6 = [];
    this.scheduleDay7 = [];

    this.userInfo.Schedule.forEach(element => {//splits meals by date
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
  SetEndDate() {//sets the dates and date strings for the days after the start day
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
  Previous() {//sets the start day to seven days before the current start day
    this.DateRangeStart = this.addDays(this.DateRangeStart, -7);
    this.SetEndDate();
  }
  Now() {//sets the start day to today
    this.DateRangeStart = this.addDays(this.now, 0);
    this.SetEndDate();
  }
  Next() {//sets the start day to seven days after the current start day
    this.DateRangeStart = this.addDays(this.DateRangeStart, 7);
    this.SetEndDate();
  }
  addDays(date, days) {//adds a number days to a date and returns the date
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
    //Adding days to date: https://stackoverflow.com/questions/563406/add-days-to-javascript-date
  }
  ngAfterViewInit(): void {
    this.service.updateTitle("Schedule - The Cookbook");//updates the title
  }
}
