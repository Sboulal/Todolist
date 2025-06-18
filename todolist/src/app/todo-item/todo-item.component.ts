import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo.model';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  constructor() { }
  @Input() todo!: Todo;
  @Output() toggleComplete = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{id: number, updates: Partial<Todo>}>();

  isEditing = false;
  editTitle = '';
  editDescription = '';

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.todo.title;
    this.editDescription = this.todo.description || '';
  }

  saveEdit(): void {
    if (this.editTitle.trim()) {
      this.update.emit({
        id: this.todo.id,
        updates: {
          title: this.editTitle.trim(),
          description: this.editDescription.trim()
        }
      });
      this.isEditing = false;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editTitle = '';
    this.editDescription = '';
  }

  onToggleComplete(): void {
    this.toggleComplete.emit(this.todo.id);
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.delete.emit(this.todo.id);
    }
  }
  

}
