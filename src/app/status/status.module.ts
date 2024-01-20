import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { statusRoutes } from './status.routing';
import { RouterModule } from '@angular/router';
import { StatusListComponent } from './list/list.component';



@NgModule({
  declarations: [
    StatusComponent,
    StatusListComponent
  ],
  imports: [
    RouterModule.forChild(statusRoutes),
    CommonModule,
  ]
})
export class StatusModule { }
