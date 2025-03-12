import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PostData} from '../../../../post-data';
@Component({
  selector: 'app-post',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() postData!:PostData;

  isExpanded = false;
  holders = 0;

  onFormInteraction(add:number) {
    this.holders+=add;
    this.isExpanded = this.holders > 0;
    this.isExpanded = false;
  };
}
