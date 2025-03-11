import { Component } from '@angular/core';
import {PostCreationComponent} from './Components/post-creation/post-creation.component';

@Component({
  selector: 'app-posts',
  imports: [PostCreationComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {

}
