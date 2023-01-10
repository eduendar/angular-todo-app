import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todos: Todo[] = [];
  private dataSource: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  public todoList$: Observable<Todo[]> = this.dataSource.asObservable();

  constructor() {
    this.getState();
  }

  public addTodo(description: string): void {
    let newId = 0;
    if (this.todos.length) {
      newId = Math.max(...this.todos.map(t => t.id)) + 1;
    }
    this.todos.push({ id: newId, description: description, done: false });
    this.dataSource.next(this.todos)
    this.saveState();
  }

  public deleteTodoById(id: number): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    }
    this.saveState();
  }

  public updateTodoById(id: number, description: string): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
      this.todos[index].description = description;
    }
    this.saveState();
  }

  public reOrderTodoList(event: CdkDragDrop<Todo[]>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.saveState();
  }

  private saveState(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todos));
  }

  private getState(): void {
    const localStorageTodos = localStorage.getItem('todoList');
    if (localStorageTodos) {
      this.todos = JSON.parse(localStorageTodos);
      this.dataSource.next(this.todos);
    }
  }
}
