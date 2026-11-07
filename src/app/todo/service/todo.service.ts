import { Injectable, signal, computed } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';

let nextId = 1;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSignal = signal<Todo[]>([]);
  readonly todos = this.todosSignal.asReadonly();

  readonly waiting = computed(() =>
    this.todosSignal().filter((t) => t.status === 'waiting')
  );
  readonly inProgress = computed(() =>
    this.todosSignal().filter((t) => t.status === 'in progress')
  );
  readonly done = computed(() =>
    this.todosSignal().filter((t) => t.status === 'done')
  );

  addTodo(name: string, content: string): void {
    const todo: Todo = {
      id: nextId++,
      name: name.trim(),
      content: content.trim(),
      status: 'waiting',
    };
    this.todosSignal.update((todos) => [...todos, todo]);
  }

  updateStatus(id: number, status: TodoStatus): void {
    this.todosSignal.update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }
}
