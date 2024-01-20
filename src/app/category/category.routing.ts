import { Route } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './list/list.component';
import { CategoryResolver } from './category.resolver';

export const categoryRoutes : Route[] = [
  {
      path     : '',
      component: CategoryComponent,
      children : [
          {
              path     : '',
              component : CategoryListComponent,
              resolve   : {
                  categories : CategoryResolver
              }
          }
      ]
  }
]
