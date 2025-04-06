import { Routes } from '@angular/router';

import {PostsComponent} from './Pages/posts/posts.component';
import {AboutComponent} from './Pages/about/about.component';
import {RulesComponent} from './Pages/rules/rules.component';
import {Page404Component} from './page404/page404.component';
import {SearchComponent} from './Pages/search/search.component';

export const routes: Routes = [
  {path: '', redirectTo: 'post', pathMatch: 'full'},
  {path: 'post', component: PostsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'search', component: SearchComponent},
  {path: '**', component:Page404Component}

];
