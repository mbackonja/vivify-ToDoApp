/// <reference path="typings/index.d.ts" />
import { AppComponent } from './app/app.component';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

enableProdMode();
bootstrap(<Function>AppComponent, [
  disableDeprecatedForms(),
  provideForms()
]);