import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleDisplayComponent } from './article-display/article-display.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { CustomMaterialModule } from './custom.material.module';
import { LocalStorageService } from './localStorage';
import { LoginComponent } from './login/login.component';
import { ArticleService } from './services/article.service';
import { SuccessfulArticlesListComponent } from './successful-articles-list-component/successful-articles-list-component.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateArticleComponent,
    ArticlesListComponent,
    ArticleDetailComponent,
    ArticleDisplayComponent,
    SuccessfulArticlesListComponent,
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StorageServiceModule
  ],
  providers: [LocalStorageService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
