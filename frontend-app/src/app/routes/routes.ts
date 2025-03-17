import { Route } from '@angular/router';
import { AuthFormComponent } from '../components/auth-form/auth-form.component';
import { BookListComponent } from '../components/book-list/book-list.component';
import { AuthGuard } from '../guard/auth-guard';

export const routes: Route[] = [
  {
    path: '',
    component: AuthFormComponent,
  },
  {
    path: 'book-list',
    component: BookListComponent,
    canActivate: [AuthGuard],
  },
];
