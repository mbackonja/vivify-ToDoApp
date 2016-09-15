import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input';
import 'rxjs/add/operator/map';

import { AppComponent }  from './app.component';

enableProdMode();

@NgModule({
  imports:      [ BrowserModule, FormsModule, MdInputModule, MdButtonModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }