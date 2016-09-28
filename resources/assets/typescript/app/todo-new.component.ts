import { Component, Input, OnInit } from '@angular/core';

import { Todo } from './todo';
import { TodoService } from './todo.service';

import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    template: require('./todo-new.component.html')
})

export class TodoNewComponent implements OnInit {
    private todo: Todo;
    private buttonText: string = 'Create';

    model: any = {};

    ngOnInit(): void {
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            if(!isNaN(id)) {
                this.todoService.show(id).subscribe(todo => {
                    this.todo = todo[0];
                    this.model.id = this.todo.id;
                    this.model.text = this.todo.text;
                    this.model.priority = this.todo.priority;
                    this.buttonText = 'Edit';
                });
            }
        });
    }

    constructor(private todoService: TodoService, private router: Router, private activatedRoute: ActivatedRoute) {

    }

    onSubmit(): void {
        if(this.todo) {
            this.todo.text = this.model.text;
            this.todo.priority = this.model.priority;

            this.todoService.update(this.todo).subscribe(response => {
                if(response)
                    this.router.navigate(['/']);
            });


        } else {
            this.todo = new Todo(null, this.model.text, this.model.priority, false);

            this.todoService.store(this.todo).subscribe(response => {
                if(response)
                    this.router.navigate(['/']);
            });
        }
    }

    back(): void {
        this.router.navigate(['/']);
    }
}
