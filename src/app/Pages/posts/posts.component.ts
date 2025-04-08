import {Component, AfterViewInit, inject, Host, HostListener} from '@angular/core';
import {NgForOf} from '@angular/common';
import {PostCreationComponent} from './Components/post-creation/post-creation.component';
import {PostComponent} from './Components/post/post.component';
import {PostData} from '../../post-data';
import {FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PostService} from '../../postings/post.service';

@Component({
  selector: 'app-posts',
  imports: [PostCreationComponent, PostComponent, NgForOf],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  private http = inject(HttpClient);
  public posts = inject(PostService);


  testData = {
    id: 0,
    creationDate: new Date("October 13, 2014 11:13:00"),
    displayName: "mark",
    message: "Text goes here...",
    nsfw: false,
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 40) {
      // Near bottom of page (10px threshold)
      this.posts.getPosts();
    }
  };


  id = 0

  shownPosts: PostData[] = [];

  onFormInteraction(formData: FormGroup) {
    let postContents: PostData = {
      id: 0,
      creationDate: new Date(),
      displayName: formData.value.displayName,
      message: formData.value.message,
      nsfw: false,
    };
    if (postContents.displayName === "" || postContents.displayName === null) {
      postContents.displayName = "Anonymous";
    }
    this.posts.sendPost(postContents);
  };

  ngAfterViewInit(): void {

  }

  constructor() {
    if (this.posts.posts.length == 0) {
      this.posts.getNewestPosts()
    }
  }

}



