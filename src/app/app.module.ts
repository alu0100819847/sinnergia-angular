import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import {AppRoutingModule} from './app-routing.module';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './user/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';
import {SessionService} from './services/session.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    UserComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [
    HttpService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
