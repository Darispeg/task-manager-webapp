import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Status } from "./status.type";
import { StatusService } from "./status.service";

@Injectable({
    providedIn: 'root'
})
export class StatusResolver implements Resolve<any>
{
    constructor(private _statusService: StatusService)
    {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Status[]>
    {
        return this._statusService.getStatus();
    }
}