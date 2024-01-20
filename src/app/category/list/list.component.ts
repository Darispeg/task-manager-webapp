import { Component, OnDestroy, OnInit, TemplateRef, inject } from '@angular/core';
import { Category } from '../category.type';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html'
})
export class CategoryListComponent  implements OnInit, OnDestroy {
  
  categorySelected: Category | null = null; 
  categories$ : Observable<Category[]> = of();

  private offcanvasService = inject(NgbOffcanvas);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
      private _categoryService: CategoryService,
  ) {}

    ngOnInit(): void {
        this.categories$ = this._categoryService.categories$;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    openEnd(content: TemplateRef<any>, key? : string) {
		this.offcanvasService.open(content, { position: 'end' });
        this._categoryService.getCategoryByKey(key || '')
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((category : Category) => {
            this.categorySelected = category;
        })
    }
}
