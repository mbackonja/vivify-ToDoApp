import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Component({
    selector: 'my-app',
    template: require('./app.component.html')
})
export class AppComponent implements OnInit {
    private loggedIn: boolean;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.loggedIn = this.authenticationService.loggedIn();
    }
}
