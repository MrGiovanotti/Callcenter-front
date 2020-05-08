import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Authority } from 'src/app/models/authority.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthorityService } from 'src/app/services/authority.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormBase } from 'src/app/form.base';
import { Observable } from 'rxjs';
import { AlertUtils } from 'src/app/utils/alerts.utils';
import { mergeMap } from 'rxjs/operators';
import { ConstantsUtils } from 'src/app/utils/constants.utils';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent extends FormBase {

  user: User;
  availableAuthorities: Array<Authority>;

  saving: boolean;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authorityService: AuthorityService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
    this.loading = true;
    this.availableAuthorities = [];
    this.form = this.buildUpdateUserForm();
    const id = this.route.snapshot.params.id;
    const userObservable = this.userService.getUser(id);
    const authoritiesObservable = this.authorityService.getAuthorities();
    userObservable.pipe(mergeMap(data => {
      this.user = data.object;
      return authoritiesObservable;
    })).subscribe(data => {
      this.availableAuthorities = data.object;
      this.fillUserValues();
      this.loading = false;
    });
  }

  private buildUpdateUserForm(): FormGroup {
    return this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      username: ['', Validators.required, this.usernameExistValidator.bind(this)],
      enabled: '',
      authority: ''
    });
  }

  private fillUserValues(): void {
    this.form.patchValue({
      id: this.user.id,
      name: this.user.name,
      username: this.user.username,
      enabled: this.user.enabled.toString(),
      authority: this.user.authority.id
    });
  }

  update() {
    if (this.form.invalid) {
      return;
    }
    this.saving = true;
    const submitData = Object.assign({}, this.form.value);
    submitData.authority = {id: this.form.value.authority} as Authority;
    this.userService.updateUser(submitData as User).subscribe(data => {
      this.saving = false;
      AlertUtils.showSuccessAlert(data);
      this.router.navigate([ConstantsUtils.LIST_USERS_ROUTE]);
    }, err => {
      AlertUtils.showErrorAlert(err);
    });
  }

  // ================== VALIDATORS ==================

  usernameExistValidator(control: FormControl): Promise<any> | Observable<any> {
    const responsePromise = new Promise(
      (resolve, reject) => {
        this.userService.usernameExist(control.value).subscribe((data: any) => {
          if (data.object) {
            if (data.message === this.user.id.toString()) {
              resolve(null);
            } else {
              resolve({ usertaken: true });
            }
          } else {
            resolve(null);
          }
        });
      }
    );
    return responsePromise;
  }

}
