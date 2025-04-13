import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostData, PostDataDTO} from '../post-data';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private bottompostid: number = 0; //is used to load older content
  private newestid: number = 0; //is used to load new content
  private fetching = false; //is used to prevent double loading
  private updating = false; //is used to prevent double loading
  private debug= false
  private backendUrl = this.debug ? 'http://127.0.0.1:8000/api/': 'https://api.cuprum.uk/api/';
  public posts: PostData[] = []
  public found_post: PostData = {
    id: 0,
    creationDate: new Date(),
    nsfw: false,
    message: "Search by using the post ID",
    displayName: "Tip"
  }

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


  async getPosts(): Promise<void> {//gets posts within a predefined range
    if ((this.bottompostid < 1 || this.fetching)) {
      return;
    }
    this.fetching = true;
    const data = this.http.get<PostDataDTO[]>(this.backendUrl + 'from/' + this.bottompostid + '/to/' + (this.bottompostid - 10), {}
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

  async updatePosts(): Promise<void> { //is used to get new posts
    if ((this.newestid < 1 || this.updating)) {
      return;
    }
    console.log(`Updating...`);
    this.updating = true;
    const data = this.http.get<PostDataDTO[]>(this.backendUrl + 'from/' + (this.newestid + 10) + '/to/' + (this.newestid + 1), {}
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
  // inconvenience
  async getNewestPosts(): Promise<void> { //is used to get the first ten posts
    const data = this.http.get<PostDataDTO[]>(this.backendUrl + 'getnewestposts', {})
      .subscribe(res => {
        this.bottompostid = res[0].highest_id - 11;
        this.newestid = res[0].highest_id;
        for (const post of res.reverse()) {
          this.posts.push(this.convertDatabaseType(post));
        }
      });
    setInterval(() => {
      this.updatePosts()
    }, 3000)
  }

  async findPost(postId: number): Promise<void> { //is used to search for posts
    const data = this.http.get<PostDataDTO>(this.backendUrl + 'search/' + postId, {})
      .subscribe(res => {
        if (res !== null) {
          this.found_post = this.convertDatabaseType(res)
        }
      });
  }

  async sendPost(post: PostData) { //is used to send a post to the backend
    this.http.post(this.backendUrl + 'post', post).subscribe();
  };

  constructor() {
  }
}
