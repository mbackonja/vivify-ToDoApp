import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        this.token = localStorage.getItem('currentUser');
    }

    login(email, password): Observable<boolean> {
        return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', token );

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/auth']);
    }

    loggedIn(): boolean {
        return tokenNotExpired('currentUser');
    }
}
