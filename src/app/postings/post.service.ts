import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PostData, PostDataDTO} from '../post-data';
import {PostsComponent} from '../Pages/posts/posts.component';
import {config, Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private bottompostid: number = 0;
  private fetching = false;
  public posts: PostData[] = []

  private convertDatabaseType(DTO: PostDataDTO): PostData { //converts the database format into the format used in the apllication
    let nsfw = false
    if (DTO.nsfw === 1) {
      nsfw = true
    }
    return <PostData>{
      displayName: DTO.display_name,
      message: DTO.message,
      nsfw: nsfw,
      id: DTO.id,
      creationDate: new Date(DTO.created_at)
    };


  }

  async getPosts(): Promise<void> {
    if ((this.bottompostid < 1 || this.fetching)) {
      return;
    }
    this.fetching = true;
    console.log('http://127.0.0.1:8000/api/from/' + this.bottompostid + '/to/' + (this.bottompostid - 10));
    const data = this.http.get<PostDataDTO[]>('http://127.0.0.1:8000/api/from/' + this.bottompostid + '/to/' + (this.bottompostid - 10), {}
    )
    data.subscribe(res => {
      this.fetching = false;
      for (const post in res.reverse()) {
        this.posts.push(this.convertDatabaseType(res[post]));
      }
      this.bottompostid -= 11;

    });

  }


  async getNewestPosts(): Promise<void> {
    const data = this.http.get<PostDataDTO[]>('http://127.0.0.1:8000/api/getnewestposts', {})
      .subscribe(res => {
        this.bottompostid = res[0].highest_id - 11;
        for (const post in res.reverse()) {
          this.posts.push(this.convertDatabaseType(res[post]));
        }
      });
  }


  async sendPost(post: PostData) {
    this.http.post('http://127.0.0.1:8000/api/post', post).subscribe();
  };

  constructor() {
  }
}
