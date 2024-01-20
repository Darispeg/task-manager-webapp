import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from 'src/app/shared/models/task.model';
import { BehaviorSubject, Observable, catchError, first, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TaskService {

  private url = 'http://localhost:8080/api/tasks';
  private _tasks = new BehaviorSubject<Task[]>([]);
  
  get tasks$(): Observable<Task[]>
  {
    return this._tasks.asObservable();
  }

  constructor(private httpClient: HttpClient) { 
    this.getAll().subscribe();
  }

  private getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${environment.APIurl}/tasks`)
      .pipe(
        tap((tasks) => {
          this._tasks.next(tasks);
        }), 
        catchError((error) => {
          console.error(error);
          return of([])
        })
      );
  }

  getOne(taskUuid: string): Observable<Task> {
    return this.httpClient.get<Task>(`${environment.APIurl}/${taskUuid}`);
  }

  save(task: Task) {
    return this.httpClient.post<Task>(this.url, task)
      .pipe(
        tap((taskSaved) => this._tasks.next([...this._tasks.value, taskSaved])),
        catchError((error) => {
          return throwError(() => ({responseError: error, hasError: true, source: 'taskSave'}))
        })
      );
  }

  edit(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${environment.APIurl}/tasks`, task)
      .pipe(
        tap((taskSaved) => {
          const tasks = this._tasks.value;
          const index = tasks.findIndex(task => task.uuid === taskSaved.uuid);
          if (index >= 0) {
            tasks[index] = taskSaved;
          }
          this._tasks.next(tasks);
        }),
        catchError((error) => {
          return throwError(() => ({responseError: error, hasError: true, source: 'taskSave'}))
        })
      );
  }

  delete(taskUuid: string) {
    return this.httpClient.delete<Task>(`${environment.APIurl}/tasks/${taskUuid}`);
  }
}
