import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./routes/routes').then((m) => m.routes),
  }
];
