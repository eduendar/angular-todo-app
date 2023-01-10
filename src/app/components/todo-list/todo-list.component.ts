import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
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
  public isEditActive = false;
  private todoSelected!: Todo;

  public addTodo(): void {
    if (this.todoDescription) {
      this.service.addTodo(this.todoDescription);
      this.todoDescription = '';
    }
  }

  public updateTodo(): void {
    this.service.updateTodoById(this.todoSelected.id, this.todoDescription);
    this.isEditActive = false;
    this.todoDescription = '';
  }

  public deleteTodo(todo: Todo): void {
    this.service.deleteTodoById(todo.id);
  }

  public editTodo(todo: Todo): void {
    this.todoDescription = todo.description;
    this.isEditActive = true;
    this.todoSelected = todo;
  }

  drop(event: CdkDragDrop<Todo[]>) {
    //moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    this.service.reOrderTodoList(event);
  }
}
