import { Component } from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {PostsComponent} from './Pages/posts/posts.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbModule],
})
export class AppComponent {
  title = 'Forever Post';
  logoSrc = './img.png';
}
