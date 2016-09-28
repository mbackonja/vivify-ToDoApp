import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    constructor(private http: Http, private router: Router) {
    }

    get token(): string {
        return localStorage.getItem('currentUser');
    }
    set token(token: string) {
        localStorage.setItem('currentUser', token);
    }



    getToken(): string {
        return localStorage.getItem('currentUser');
    }

    login(email, password): Observable<boolean> {
        return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    this.token = token;

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        this.token = null;
        this.router.navigate(['/auth']);
    }

    loggedIn(): boolean {
        return tokenNotExpired('currentUser');
    }
}
