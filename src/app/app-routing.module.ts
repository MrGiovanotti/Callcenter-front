import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { ContainerComponent } from './components/dashboard/container/container.component';
import { ConstantsUtils } from './utils/constants.utils';
import { AuthGuard } from './guards/auth.guard';
import { ListUsersComponent } from './components/security/list-users/list-users.component';
import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';
import { CreateUserComponent } from './components/security/create-user/create-user.component';
import { UpdateUserComponent } from './components/security/update-user/update-user.component';
import { ShowUserComponent } from './components/security/show-user/show-user.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { SearchUserComponent } from './components/security/search-user/search-user.component';


const routes: Routes = [
  { path: ConstantsUtils.SEARCH_USER_ROUTE, component: SearchUserComponent, canActivate: [AuthGuard] },
  { path: ConstantsUtils.SHOW_USER_ROUTE, component: ShowUserComponent, canActivate: [AuthGuard] },
  { path: ConstantsUtils.UPDATE_USER_ROUTE, component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: ConstantsUtils.CREATE_USER_ROUTE, component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: ConstantsUtils.FORBIDDEN_ROUTE, component: ForbiddenComponent },
  { path: ConstantsUtils.NOT_FOUND_ROUTE, component: NotFoundComponent },
  { path: ConstantsUtils.LIST_USERS_ROUTE, component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: ConstantsUtils.DASHBOARD_ROUTE, component: ContainerComponent, canActivate: [AuthGuard] },
  { path: ConstantsUtils.LOGIN_ROUTE, component: LoginComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
