import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthenticationService } from './authentication.service';
import { Todo } from './todo';

import { Observable }     from 'rxjs/Observable';


@Injectable()
export class TodoService {
    private todoUrl = 'api/todo';

    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    index(): Observable<Todo[]> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
        return this.http.get(this.todoUrl, { headers: headers })
            .map(response => this.returnResponse(response).json() as Todo[])
            .catch(this.handleError);
    }

    show(id: number): Observable<Todo> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
        return this.http.get(this.todoUrl + '/' + id, { headers: headers })
            .map(response => this.returnResponse(response).json() as Todo)
            .catch(this.handleError);
    }

    store(todo: Todo): Observable<boolean> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
        return this.http.post(this.todoUrl, {text: todo.text, priority: todo.priority}, { headers: headers })
            .map(response => this.returnResponse(response).json().success as boolean)
            .catch(this.handleError);
    }

    complete(id: number): Observable<boolean> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
        return this.http.post(this.todoUrl + '/' + id, { type: 'complete', _method: 'PUT'}, { headers: headers })
            .map(response => this.returnResponse(response).json().success as boolean)
            .catch(this.handleError);
    }

    update(todo: Todo): Observable<boolean> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
        console.log("Zapocet update");
        return this.http.post(this.todoUrl + '/' + todo.id, { text: todo.text, priority: todo.priority, type: 'edit', _method: 'PUT'}, { headers: headers })
            .map(response => this.returnResponse(response).json().success as boolean)
            .catch(this.handleError);
    }

    destroy(id: number): Observable<boolean> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
        return this.http.delete(this.todoUrl + '/' + id, { headers: headers })
            .map(response => this.returnResponse(response).json().success as boolean)
            .catch(this.handleError);
    }

    private handleError (error: any) {
        if(error.status == 401) {
            this.authenticationService.logout(); // NE RADI
            return Observable.throw(error);
        }
        console.error(error);
        return Observable.throw(error);
    }

    private returnResponse(response: any): any {
        this.authenticationService.token = response.headers._headersMap.get('newtoken');
        return response
    }
}
