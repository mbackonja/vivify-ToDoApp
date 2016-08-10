import {Component} from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [ MdButton, MdInput ]
})
export class AppComponent {
  public newChecklist = '';
  public checklists = [];

  saveChecklist() {
    if(this.newChecklist) {
      this.checklists.push(this.newChecklist);
      this.newChecklist = '';
    }
  }
}