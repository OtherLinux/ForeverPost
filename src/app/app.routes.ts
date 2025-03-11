import { Routes } from '@angular/router';

import {PostsComponent} from './Pages/posts/posts.component';
import {AboutComponent} from './Pages/about/about.component';

export const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'About', component: AboutComponent},

];
