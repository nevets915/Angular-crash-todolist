import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
    @Input() todo: Todo;
    @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

    constructor(private todoService: TodoService) { }

    ngOnInit() {
    }

    // Set Dynamic Classes
    setTodoItemClasses() {
        const { completed } = this.todo;
        const classes = {
            todo: true,
            'is-complete': completed,
        }

        return classes;
    }

    onToggle(todo: Todo): void {
        todo.completed = !todo.completed;

        this.todoService.toggleCompleted(todo).subscribe(todoResponse => {
            console.log(todoResponse);
        });
    }

    onDelete(todo: Todo): void {
        this.deleteTodo.emit(todo);
    }
}
