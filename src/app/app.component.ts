import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {PostsComponent} from './Pages/posts/posts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet,NgOptimizedImage, PostsComponent, RouterLink],
})
export class AppComponent {
  title = 'Forever Post';
  logoSrc = './img.png';
}
