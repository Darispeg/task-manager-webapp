import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CategoryService } from "./category.service";
import { Category } from "./category.type";

@Injectable({
    providedIn: 'root'
})
export class CategoryResolver implements Resolve<any>
{
    constructor(private _categoryService: CategoryService)
    {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]>
    {
        return this._categoryService.getCategories();
    }
}