import { Component } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [ MdInput, MdButton ]
})
export class AppComponent {
  public newChecklist: string = '';
  public checklists: string[] = [];

  saveChecklist(): void {
    if (this.newChecklist) {
      this.checklists.push(this.newChecklist);
      this.newChecklist = '';
    }
  }
}