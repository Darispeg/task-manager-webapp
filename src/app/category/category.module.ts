import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './list/list.component';
import { categoryRoutes } from './category.routing';

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryListComponent
  ],
  imports: [
    RouterModule.forChild(categoryRoutes),
    CommonModule,
  ]
})
export class CategoryModule { }
