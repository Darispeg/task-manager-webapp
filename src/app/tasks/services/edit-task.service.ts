import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class EditTaskService {

  private taskOpened = new Subject<Task>();
  taskToEdit$ = this.taskOpened.asObservable();

  openTaskToEdit(task: Task) {
    this.taskOpened.next(task);
  }
}
