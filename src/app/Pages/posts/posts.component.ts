import {Component, createComponent} from '@angular/core';
import {NgForOf} from '@angular/common';
import {PostCreationComponent} from './Components/post-creation/post-creation.component';
import {PostComponent} from './Components/post/post.component';
import {PostData} from '../../post-data';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-posts',
  imports: [PostCreationComponent, PostComponent, NgForOf],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {

  testData = {
    id: 0,
    creationDate: new Date("October 13, 2014 11:13:00"),
    displayName: "mark",
    message: "Text goes here...",
    nsfw: false,
  }

  id=0

  shownPosts:PostData[] = [

  ];

  onFormInteraction(formData: FormGroup) {
    let postContents = {
      id: this.id,
      creationDate: new Date(),
      displayName: formData.value.displayName,
      message: formData.value.message,
      nsfw: false,
    };
    if (postContents.displayName === ""|| postContents.displayName === null) {
      postContents.displayName = "Anonymous";
    }
    this.id+=1
    this.shownPosts.unshift(postContents);
  };


}



