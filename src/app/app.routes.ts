import { Routes } from '@angular/router';

import {PostsComponent} from './Pages/posts/posts.component';
import {AboutComponent} from './Pages/about/about.component';
import {RulesComponent} from './Pages/rules/rules.component';
import {Page404Component} from './page404/page404.component';

export const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Rules', component: RulesComponent},
  {path: '**', component:Page404Component}

];
