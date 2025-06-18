import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<Todo[]>;
  filter: 'all' | 'active' | 'completed' = 'all';
  filteredTodos: Todo[] = [];
  constructor(private todoService:TodoService) 
  {
    this.todos$ = this.todoService.getTodos();
  }
  ngOnInit(): void {
    this.todos$.subscribe(todos => {
      this.applyFilter(todos);
    });
  }
  applyFilter(todos: Todo[]): void {
    switch (this.filter) {
      case 'active':
        this.filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        this.filteredTodos = todos.filter(todo => todo.completed);
        break;
      default:
        this.filteredTodos = todos;
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
    this.todos$.subscribe(todos => this.applyFilter(todos));
  }
  onToggleComplete(id: number): void {
    this.todoService.toggleComplete(id);
  }

  onDelete(id: number): void {
    this.todoService.deleteTodo(id);
  }

  onUpdate(event: {id: number, updates: Partial<Todo>}): void {
    this.todoService.updateTodo(event.id, event.updates);
  }


   // TrackBy function for better performance
   trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }

  // Get appropriate empty message based on current filter
  getEmptyMessage(): string {
    switch (this.filter) {
      case 'active':
        return 'No active todos. Great job!';
      case 'completed':
        return 'No completed todos yet.';
      default:
        return 'No todos yet. Add one above to get started!';
    }
  }
  get completedCount(): number {
    return this.todoService.getCompletedCount();
  }

  get pendingCount(): number {
    return this.todoService.getPendingCount();
  }
  

}
