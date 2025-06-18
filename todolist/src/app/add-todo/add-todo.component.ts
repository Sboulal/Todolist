import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
 
  title = '';
  description = '';
  constructor(private todoService: TodoService) { }
  onSubmit(): void 
  {
    if (this.title.trim()) {
      this.todoService.addTodo(this.title.trim(), this.description.trim());
      this.title = '';
      this.description = '';
    }
  }
 

}