import {Component, inject} from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive, RedirectCommand, Router} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {PostsComponent} from './Pages/posts/posts.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbModule],
})
export class AppComponent {
  title = 'Forever Post';
  logoSrc = './img.png';

  private router = inject(Router)
  private http = inject(HttpClient)

  getRandomPost() {
    const newestid = this.http.get<{ newestMessageId: number }>(`https://api.cuprum.uk/api/newestid`).subscribe(
      res => {
        if (res === null) {
          return;
        }
        this.router.navigate(['/search/' + Math.floor(Math.random() * (Math.floor(res.newestMessageId) - Math.ceil(1)) + Math.ceil(1))]);
      },
    );
  };
}
