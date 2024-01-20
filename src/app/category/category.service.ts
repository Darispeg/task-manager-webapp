import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, of, switchMap, take, tap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Category } from "./category.type";

@Injectable({
    providedIn: 'root'
})
export class CategoryService
{
    private _categories = new BehaviorSubject<Category[]>([]);
    private _category = new BehaviorSubject<Category | null>(null);


    constructor(private _httpClient: HttpClient){}
    
    get categories$(): Observable<Category[]>
    {
        return this._categories.asObservable();
    }

    getCategories() : Observable<Category[]> 
    {
        return this._httpClient.get<Category[]>(`${environment.APIurl}/categories`)
        .pipe(
          tap((categories) => {
            this._categories.next(categories);
          }), 
          catchError((error) => {
            console.error(error);
            return of([])
          })
        );
    }

    getCategoryByKey(key : string) : Observable<Category> 
    {
        return this._categories.pipe(
            take(1),
            map((categories) => {
                const category = categories.find(u => u['key'] ===  key) || null;
                this._category.next(category);
                return category;
            }),
            switchMap((category) => {
                if ( !category )
                {
                    return throwError(`No se pudo encontrar la categoria con la clave ${key}!`);
                }
                return of(category);
            })
        );
    }
}