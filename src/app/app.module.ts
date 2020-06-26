import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import {AppRoutingModule} from './app-routing.module';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './user/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';
import {SessionService} from './services/session.service';
import { AdminComponent } from './admin/admin.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditUserComponent } from './admin/user-crud/edit-user/edit-user.component';
import { ArticleCrudComponent } from './admin/article-crud/article-crud.component';
import { CreateArticleComponent } from './admin/article-crud/create-article/create-article.component';
import { EditArticleComponent } from './admin/article-crud/edit-article/edit-article.component';
import { NotificationService } from './services/notification.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    UserComponent,
    RegisterComponent,
    AdminComponent,
    UserCrudComponent,
    EditUserComponent,
    ArticleCrudComponent,
    CreateArticleComponent,
    EditArticleComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        HttpClientModule,
        MatMenuModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()

    ],
  providers: [
    HttpService,
    SessionService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
