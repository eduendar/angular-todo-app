import { Component, inject } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Todo } from 'src/app/models/todo';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  private service: TodoListService = inject(TodoListService);
  public todoList$ = this.service.todoList$;
  public todoDescription = '';

  public addTodo(): void {
    if (this.todoDescription) {
      this.service.addTodo(this.todoDescription);
      this.todoDescription = '';
    }
  }
}
