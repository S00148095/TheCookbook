import { TestResult } from 'tslint/lib/test';
import { Component, ViewContainerRef } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent {
  numWanted: number;
  numGenerated: number;
  recipes: Recipe[] = [
    new Recipe("Beans on Toast", 5, 0, "https://i.imgur.com/GmNT8tF.jpg", ["Bread", "Beans"], ["Put bread in toaster at appropriate settings", "Put beans in microwave", "Wait for the toast and beans to be done", "Pour beans on top of the toast", "Serve"]),
    new Recipe("Toast", 5, 0, "https://i.imgur.com/sUTxDOn.jpg", ["Bread"], ["Put bread in toaster at appropriate settings", "Wait for the toast to be done", "Serve"])
  ]
  selectedRecipes:Recipe[]=[];

  constructor() {
  }
}
