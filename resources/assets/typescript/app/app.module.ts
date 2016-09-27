import { NgModule, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular2-material/button';
import { HttpModule }    from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';

import 'rxjs/add/operator/map';

import { AuthGuard }  from './auth.guards';

import { AppComponent }  from './app.component';
import { TodoComponent }  from './todo.component';
import { LoginComponent }  from './login.component';
import { TodoNewComponent }  from './todo-new.component';

import { AuthenticationService }  from './authentication.service';
import { TodoService }  from './todo.service';
import { routing } from './app.routing';

enableProdMode();

@NgModule({
  imports:      [ BrowserModule, FormsModule, MdButtonModule, HttpModule, routing ],
  declarations: [ AppComponent, TodoComponent, LoginComponent, TodoNewComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ TodoService, AuthGuard, AuthenticationService, AuthHttp, AUTH_PROVIDERS ]
})
export class AppModule { }
