import {Component, inject, Input} from '@angular/core';
import {PostService} from '../../postings/post.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PostData} from '../../post-data';
import {PostComponent} from '../posts/Components/post/post.component';

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
  public posts = inject(PostService);

  searchForm = new FormGroup({
    searchId: new FormControl(1, Validators.required),
  });

  onSubmit() {
    if (!isNaN(Number(this.searchForm.value.searchId))) {
      this.posts.findPost(<number>this.searchForm.value.searchId)
    }
  }

  isExpanded = false;
  holders = 0;

  onFormInteraction(add: number) {
    this.holders += add;
    this.isExpanded = this.holders > 0;
    this.isExpanded = false;
  };
}
