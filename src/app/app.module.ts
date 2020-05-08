import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/security/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ContainerComponent } from './components/dashboard/container/container.component';
import { LeftSidebarComponent } from './components/shared/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './components/shared/right-sidebar/right-sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PaginatorComponent } from './components/shared/paginator/paginator.component';
import { ListUsersComponent } from './components/security/list-users/list-users.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';
import { NoImagePipe } from './pipes/no-image.pipe';
import { ChangeBooleanPipe } from './pipes/change-boolean.pipe';
import { UIMessageComponent } from './components/shared/uimessage/uimessage.component';
import { CreateUserComponent } from './components/security/create-user/create-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { UpdateUserComponent } from './components/security/update-user/update-user.component';
import { ChangePasswordComponent } from './components/security/change-password/change-password.component';
import { ShowUserComponent } from './components/security/show-user/show-user.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { EditMyProfileComponent } from './components/security/edit-my-profile/edit-my-profile.component';
import { SearchUserComponent } from './components/security/search-user/search-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    ContainerComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    NavbarComponent,
    PaginatorComponent,
    ListUsersComponent,
    ForbiddenComponent,
    NoImagePipe,
    ChangeBooleanPipe,
    UIMessageComponent,
    CreateUserComponent,
    SpinnerComponent,
    UpdateUserComponent,
    ChangePasswordComponent,
    ShowUserComponent,
    NotFoundComponent,
    EditMyProfileComponent,
    SearchUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
