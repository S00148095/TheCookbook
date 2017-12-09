import { Component, OnInit } from '@angular/core';
import { Meal } from '../Meal';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  inputs:['meal'],
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  meal:Meal;
  constructor() { }

  ngOnInit() {
  }

}
