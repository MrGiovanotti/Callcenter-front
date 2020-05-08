import { Component } from '@angular/core';
import { FormBase } from 'src/app/form.base';
import { User } from 'src/app/models/user.model';
import { Authority } from 'src/app/models/authority.model';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ValidatorsUtils } from 'src/app/utils/validators.utils';
import { AuthorityService } from 'src/app/services/authority.service';
import { AlertUtils } from 'src/app/utils/alerts.utils';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent extends FormBase {

  user: User;
  availableAuthorities: Array<Authority>;

  saving: boolean;

  constructor(
    private userService: UserService,
    private authorityService: AuthorityService,
    private formBuilder: FormBuilder
    ) {
      super();
      this.authorityService.getAuthorities().subscribe(data => {
        this.availableAuthorities = data.object;
      }, err => {
        AlertUtils.showErrorAlert(err);
      });
      this.form = this.buildCreateUserForm();
  }

  private buildCreateUserForm(): FormGroup {
    this.availableAuthorities = [];
    return this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required, this.usernameExistValidator.bind(this)],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      enabled: 'true',
      authority: ['', Validators.required]
    }, {validator: ValidatorsUtils.checkPasswords});
  }

  // ============= CRUD =====================
  create() {
    if (this.form.invalid) {
      return;
    }
    this.saving = true;
    const submitData = Object.assign({}, this.form.value);
    submitData.authority = {id: this.form.value.authority} as Authority;
    this.userService.createUser(submitData as User).subscribe(data => {
      this.saving = false;
      AlertUtils.showSuccessAlert(data);
      this.form.reset();
    }, err => {
      AlertUtils.showErrorAlert(err);
    });
  }

  // ================== VALIDATORS ==================

  usernameExistValidator(control: FormControl): Promise<any> | Observable<any> {
    const responsePromise = new Promise(
      (resolve) => {
        this.userService.usernameExist(control.value).subscribe(data => {
          if (data.object) {
            resolve({usernameexists: true});
          } else {
            resolve(null);
          }
        }, err => {
          AlertUtils.showErrorAlert(err);
        });
      }
    );
    return responsePromise;
  }

}


