import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular2-material/button';
import { HTTP_BINDINGS } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppComponent }  from './app.component';

enableProdMode();

@NgModule({
  imports:      [ BrowserModule, FormsModule, MdButtonModule ],
  providers:    [ HTTP_BINDINGS ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }