import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthenticationService } from './authentication.service';
import { Todo } from './todo';


@Injectable()
export class TodoService {
    private todoUrl = 'api/todo';

    private headers = new Headers();
    constructor(private http: Http, private authenticationService: AuthenticationService) {
        this.headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    }

    index(): Promise<Todo[]> {
        return this.http.get(this.todoUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as Todo[])
            .catch(this.handleError);
    }

    show(id: number): Promise<Todo> {
        return this.http.get(this.todoUrl + '/' + id, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as Todo)
            .catch(this.handleError);
    }

    store(todo: Todo): Promise<boolean> {
        return this.http.post(this.todoUrl, {text: todo.text, priority: todo.priority}, { headers: this.headers })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    complete(id: number): Promise<boolean> {
        return this.http.post(this.todoUrl + '/' + id, { type: 'complete', _method: 'PUT'}, { headers: this.headers })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    update(todo: Todo): Promise<boolean> {
        return this.http.post(this.todoUrl + '/' + todo.id, { text: todo.text, priority: todo.priority, type: 'edit', _method: 'PUT'}, { headers: this.headers })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    destroy(id: number): Promise<boolean> {
        return this.http.delete(this.todoUrl + '/' + id, { headers: this.headers })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
