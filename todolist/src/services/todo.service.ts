import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

    private todos: Todo[] = [];
    private todosSubject = new BehaviorSubject<Todo[]>([]);
    private nextId = 1;
  constructor() 
  {
    this.loadTodos();
   }
   getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(title: string, description?: string): void {
    const newTodo: Todo = {
      id: this.nextId++,
      title,
      description,
      completed: false,
      createdAt: new Date()
    };
    
    this.todos.push(newTodo);
    this.updateTodos();
  }
  updateTodo(id: number, updates: Partial<Todo>): void {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...updates };
      this.updateTodos();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.updateTodos();
  }

  toggleComplete(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.updateTodos();
    }
  }

  getCompletedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  getPendingCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  private updateTodos(): void {
    this.saveTodos();
    this.todosSubject.next([...this.todos]);
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('nextId', this.nextId.toString());
  }

  private loadTodos(): void {
    const savedTodos = localStorage.getItem('todos');
    const savedNextId = localStorage.getItem('nextId');
    
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
    
    if (savedNextId) {
      this.nextId = parseInt(savedNextId, 10);
    }
    
    this.todosSubject.next([...this.todos]);
  }
}
