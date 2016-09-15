import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: require('./app.component.html')
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