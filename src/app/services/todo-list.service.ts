import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todos: Todo[] = [];
  private dataSource: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  public allTodos: Observable<Todo[]> = this.dataSource.asObservable();

  public addTodo(description: string): void {
    let newId = 0;
    if (this.todos.length) {
      newId = Math.max(...this.todos.map(t => t.id)) + 1;
    }
    this.todos.push({ id: newId, description: description, done: false });
    this.dataSource.next(this.todos)
  }

  public deleteTodoById(id: number): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    }
  }

  public updateTodoById(id: number, description: string): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
      this.todos[index].description = description;
    }
  }
}
