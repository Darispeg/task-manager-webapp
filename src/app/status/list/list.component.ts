import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewEncapsulation, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, of, takeUntil } from "rxjs";
import { Status } from "../status.type";
import { StatusService } from "../status.service";
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector       : 'status-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusListComponent implements OnInit, OnDestroy
{
    statusSelected: Status | null = null; 
    status$ : Observable<Status[]> = of();
	private offcanvasService = inject(NgbOffcanvas);
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _statusService: StatusService,
    ) {}

    ngOnInit(): void {
        this.status$ = this._statusService.status$
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    openEnd(content: TemplateRef<any>, key? : string) {
		this.offcanvasService.open(content, { position: 'end' });
        this._statusService.getStatusByKey(key || '')
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((status : Status) => {
            this.statusSelected = status;
        })
    }
}