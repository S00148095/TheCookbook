import { TestResult } from 'tslint/lib/test';
import { Component, ViewContainerRef } from '@angular/core';
import { Recipe } from '../recipe';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent {
  numWanted: number;
  numGenerated: number;
  Recipes: Recipe[] = [
    new Recipe("Beans on Toast", 5, 0, "https://i.imgur.com/GmNT8tF.jpg", ["Bread", "Beans"], ["Put bread in toaster at appropriate settings", "Put beans in microwave", "Wait for the toast and beans to be done", "Pour beans on top of the toast", "Serve"]),
    new Recipe("Toast", 5, 0, "https://i.imgur.com/sUTxDOn.jpg", ["Bread"], ["Put bread in toaster at appropriate settings", "Wait for the toast to be done", "Serve"])
  ]
  constructor(public modal: Modal) {
    this.numWanted = 4
    this.numGenerated = 0;
    this.OpenModal();
  }

  CloseModal()
  {
    this.modal.overlay.closeAll();
  }

  TestResult(result){
    if(Number(result)) this.numWanted=result
    else this.OpenModal();
  }

  OpenModal()
  {
    const dialogRef = this.modal.prompt()
    .size('lg')
    .isBlocking(true)
    .showClose(false)
    .keyboard(27)
    .title('How many days would you like to plan for?')
    .body('Please enter a number of days as a number')
    .open()
    .then( dialogRef => {
      dialogRef.result.then( result => this.TestResult(result))
  });
  }
  

}
