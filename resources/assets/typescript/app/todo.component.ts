import { Component, OnInit } from '@angular/core';

import { Todo } from './todo';
import { TodoService } from './todo.service';
import { AuthenticationService } from './authentication.service';

import { Router } from '@angular/router';

@Component({
    template: require('./todo.component.html')
})

export class TodoComponent implements OnInit {
    private todoList: Todo[];

    todoUnComplete: Todo[] = [];
    todoComplete: Todo[] = [];

    ngOnInit(): void {
        this.getAllTodo();
    }


    constructor(private todoService: TodoService, private authenticationService: AuthenticationService, private router: Router) { }

    getAllTodo(): void {
        this.todoService.index().then(response => {

            for(let todo of response) {
                if(todo.complete)
                    this.todoComplete.push(todo);
                else
                    this.todoUnComplete.push(todo);
            }
        });
    }

    onLogout(): void {
        this.authenticationService.logout();
    }

    create(): void {
        this.router.navigate(['/create']);
    }

    complete(id: number): void {
        if(this.todoService.complete(id)) {
            for(let todo of this.todoUnComplete) {
                if(todo.id == id) {
                    this.todoComplete.push(todo);
                    this.todoUnComplete.splice(this.todoUnComplete.indexOf(todo), 1);
                    break;
                }
            }
        }
    }

    delete(id: number): void {
        if(this.todoService.destroy(id)) {
            let found = false;
            for(let todo of this.todoUnComplete) {
                if(todo.id == id) {
                    this.todoUnComplete.splice(this.todoUnComplete.indexOf(todo), 1);
                    found = true;
                    break;
                }
            }

            if(!found) {
                for(let todo of this.todoComplete) {
                    if(todo.id == id) {
                        this.todoComplete.splice(this.todoComplete.indexOf(todo), 1);
                        break;
                    }
                }
            }
        }
    }

    edit(id: number): void {
        this.router.navigate(['/' + id + '/edit']);
    }
}
