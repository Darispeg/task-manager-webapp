import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, of, switchMap, take, tap, throwError } from "rxjs";
import { Status } from "./status.type";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class StatusService
{
    private _statusList = new BehaviorSubject<Status[]>([]);
    private _status = new BehaviorSubject<Status | null>(null);


    constructor(private _httpClient: HttpClient){}
    
    get status$(): Observable<Status[]>
    {
        return this._statusList.asObservable();
    }

    getStatus() : Observable<Status[]> 
    {
        return this._httpClient.get<Status[]>(`${environment.APIurl}/status`)
        .pipe(
          tap((status) => {
            this._statusList.next(status);
          }), 
          catchError((error) => {
            console.error(error);
            return of([])
          })
        );
    }

    getStatusByKey(key : string) : Observable<Status> 
    {
        return this._statusList.pipe(
            take(1),
            map((statusList) => {
                const status = statusList.find(u => u['key'] ===  key) || null;
                this._status.next(status);
                return status;
            }),
            switchMap((status) => {
                if ( !status )
                {
                    return throwError(`No se pudo encontrar el estado con la clave ${key}!`);
                }
                return of(status);
            })
        );
    }
}