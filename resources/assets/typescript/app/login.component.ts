import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
    template: require('./login.component.html')
})

export class LoginComponent implements OnInit {
    model: any = {};
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                }
            });
    }
}
