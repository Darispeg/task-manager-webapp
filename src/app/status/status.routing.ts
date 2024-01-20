import { Route } from '@angular/router';
import { StatusComponent } from './status.component';
import { StatusListComponent } from './list/list.component';
import { StatusResolver } from './status.resolver';

export const statusRoutes : Route[] = [
  {
      path     : '',
      component: StatusComponent,
      children : [
          {
              path     : '',
              component : StatusListComponent,
              resolve   : {
                  status : StatusResolver
              }
          }
      ]
  }
]
