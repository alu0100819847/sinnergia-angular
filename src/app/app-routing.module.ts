import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticlesComponent} from './articles/articles.component';
import {AdminComponent} from './admin/admin.component';
import {UserCrudComponent} from './admin/user-crud/user-crud.component';
import {ArticleCrudComponent} from './admin/article-crud/article-crud.component';
import {CategoryCrudComponent} from './admin/category-crud/category-crud.component';


const routes: Routes = [
  {path: '', component: ArticlesComponent},
  {path: 'Admin', component: AdminComponent,
    children: [
      {path: 'User', component: UserCrudComponent},
      {path: 'Article', component: ArticleCrudComponent},
      {path: 'Category', component: CategoryCrudComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
