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
  public service: TodoListService = inject(TodoListService);
  public todoDescription = '';
  public todos: Todo[] = [
    { id: 1, description: 'Mathe Ferien-Hausübung', done: false },
    { id: 2, description: 'Geburtstagsgeschenk Oma', done: false },
    { id: 3, description: 'Zimmer aufräumen', done: false }
  ];

  drop(event: CdkDragDrop<{description: string; done: boolean}[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }


  public addTodo(): void {
    if (this.todoDescription) {
      console.log('dfdfd')
      this.service.addTodo(this.todoDescription);
      this.todoDescription = '';
    }
    console.log(this.service.getTodos())
  }
}
