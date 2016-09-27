import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { TodoComponent } from './todo.component';
import { TodoNewComponent } from './todo-new.component';
import { AuthGuard } from './auth.guards';

const appRoutes: Routes = [
    { path: 'auth', component: LoginComponent },
    { path: '', component: TodoComponent, canActivate: [AuthGuard] },
    { path: 'create', component: TodoNewComponent, canActivate: [AuthGuard] },
    { path: ':id/edit', component: TodoNewComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
