import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Observable, of } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]> = of([]);
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$;
  }

  onSaveTask(task: Task) {
    console.log('onSaveTask')

    if (task.uuid) {
      this.taskService.edit(task).subscribe((taskSaved) => {
        console.log('Task updated', taskSaved);
      });
    } else {
      this.taskService.save(task).subscribe((taskSaved) => {
        console.log('Task created', taskSaved);
      });
    }
  }

}
