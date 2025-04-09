import {Component, inject, Input} from '@angular/core';
import {PostService} from '../../postings/post.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PostData} from '../../post-data';
import {PostComponent} from '../posts/Components/post/post.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    PostComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  public posts: PostService = inject(PostService);
  private router: Router = inject(Router);

  searchForm = new FormGroup({
    searchId: new FormControl(0, Validators.required),
  });

  @Input()
  set id(postId: number) { //searches for the id in /search/:id
    if (!isNaN(Number(postId))) {
      this.posts.findPost(<number>postId)
      this.searchForm.setValue({searchId: postId})
    } else {
      this.posts.found_post = {
        id: 0,
        creationDate:
          new Date(),
        nsfw:
          false,
        message:
          "Search by using the post ID",
        displayName:
          "Tip"
      }
    }
  }

  onSubmit() {
    if (!isNaN(Number(this.searchForm.value.searchId))) {
      this.router.navigate(['/search/' + <number>this.searchForm.value.searchId]);
    }

  }
}
