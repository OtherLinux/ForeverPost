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
  private newestid: number = 0;
  private fetching = false;
  private updating = false;
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
    const data = this.http.get<PostDataDTO[]>('http://127.0.0.1:8000/api/from/' + this.bottompostid + '/to/' + (this.bottompostid - 10), {}
    )
    data.subscribe(res => {
      this.fetching = false;
      if (res === null) {
        return;
      }
      for (const post in res.reverse()) {
        this.posts.push(this.convertDatabaseType(res[post]));
      }
      this.bottompostid -= 11;

    });
  }

  async updatePosts(): Promise<void> {
    if ((this.newestid < 1 || this.updating)) {
      return;
    }
    console.log(`Updating...`);
    this.updating = true;
    const data = this.http.get<PostDataDTO[]>('http://127.0.0.1:8000/api/from/' + (this.newestid + 10) + '/to/' + (this.newestid+1), {}
    )
    data.subscribe(res => {
      this.updating = false;
      if (res === null) {
        return;
      }
      for (const post of res) {
        this.posts.unshift(this.convertDatabaseType(post));
        this.newestid = post.id;
        console.log(this.newestid);
      }

    });
  }

  async getNewestPosts(): Promise<void> {
    const data = this.http.get<PostDataDTO[]>('http://127.0.0.1:8000/api/getnewestposts', {})
      .subscribe(res => {
        this.bottompostid = res[0].highest_id - 11;
        this.newestid = res[0].highest_id;
        for (const post of res.reverse()) {
          this.posts.push(this.convertDatabaseType(post));
        }
      });
    setInterval(()=>{
      this.updatePosts()
    },3000)
  }


  async sendPost(post: PostData) {
    this.http.post('http://127.0.0.1:8000/api/post', post).subscribe();
  };

  constructor() {
  }
}
