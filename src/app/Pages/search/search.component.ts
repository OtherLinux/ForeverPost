import { Component } from '@angular/core';
import { PostService} from '../../postings/post.service';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
