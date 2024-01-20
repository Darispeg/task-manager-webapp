import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { MockProvider } from 'ng-mocks';
import { TaskService } from '../services/task.service';
import { TaskTableComponent } from '../task-table/task-table.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent, TaskTableComponent, TaskFormComponent, TaskFilterComponent],
      providers: [
        MockProvider(TaskService)
      ]
    });
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
