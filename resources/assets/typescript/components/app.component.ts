import {Component} from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';

@Component({
  selector: 'my-app',
  template: `
    <md-input placeholder="New Checklist"></md-input>
    <button md-raised-button color="primary">Click</button>
  `,
  directives: [ MdButton, MdInput ]
})
export class AppComponent { }