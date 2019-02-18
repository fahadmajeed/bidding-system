import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { LoginComponent } from './login/login.component';
import { SuccessfulArticlesListComponent } from './successful-articles-list-component/successful-articles-list-component.component';

const routes: Routes = [
  {path : '', component : LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'create-article', component: CreateArticleComponent },
  { path: 'articles-list', component: ArticlesListComponent },
  { path: 'articles-won', component: SuccessfulArticlesListComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {}
