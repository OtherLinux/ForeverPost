import {Component, ElementRef, Output, viewChild, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-post-creation',
  imports: [ReactiveFormsModule],
  template: `
    <form id="PostCreationForm" [formGroup]="postCreation" [class.PostCreationExpand]="isExpanded"
          (ngSubmit)="onFormSend()" (mouseover)="onFormInteraction(1)"
          (mouseout)="onFormInteraction(-1)">
      <div>
        <input (focus)="onFormInteraction(1)" (focusout)="onFormInteraction(-1)" placeholder="Display Name"
               id="DisplayName" type="text" formControlName="displayName">

        <br>
        <textarea (focus)="onFormInteraction(1)" (focusout)="onFormInteraction(-1)" placeholder="Text goes here..."
                  id="MessageContents" style="resize: none" maxlength="256" formControlName="message"></textarea>


      </div>

      <button type="submit">Post</button>

    </form>
  `,
  styleUrl: './post-creation.component.css'
})
export class PostCreationComponent {
  isExpanded = false;
  holders = 0;
  postCreation = new FormGroup({
    displayName: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });


  onFormInteraction(add:number) {
    this.holders+=add
    if (this.holders > 0) {
      this.isExpanded = true;
    }else {
      this.isExpanded = false;
    }
  };
  @Output() FormHandling = new EventEmitter();

  onFormSend() {
    this.FormHandling.emit(this.postCreation);
  }



}
