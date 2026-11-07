import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { TodoStatus } from '../model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [FormsModule],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  readonly waiting = this.todoService.waiting;
  readonly inProgress = this.todoService.inProgress;
  readonly done = this.todoService.done;

  name = '';
  content = '';

  readonly statusOptions: TodoStatus[] = ['waiting', 'in progress', 'done'];

  addTodo(): void {
    if (!this.name.trim() || !this.content.trim()) return;
    this.todoService.addTodo(this.name, this.content);
    this.name = '';
    this.content = '';
  }

  updateStatus(id: number, event: Event): void {
    const status = (event.target as HTMLSelectElement).value as TodoStatus;
    this.todoService.updateStatus(id, status);
  }
}
