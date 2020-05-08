import { Component, Input } from '@angular/core';
import { FormBase } from 'src/app/form.base';
import { User } from 'src/app/models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ValidatorsUtils } from 'src/app/utils/validators.utils';
import { AlertUtils } from 'src/app/utils/alerts.utils';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends FormBase {

  @Input()
  user: User;

  saving: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService
  ) {
    super();
    this.saving = false;
    this.form = this.fb.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, { validator: ValidatorsUtils.checkPasswords });
  }

  changePassword() {
    if (this.form.invalid) {
      return;
    }
    this.saving = true;
    this.user.password = this.form.value.password;
    this.userService.resetPassword(this.user).subscribe(data => {
      this.saving = false;
      this.reset();
      this.modalService.closeChangePasswordModal();
      AlertUtils.showSuccessAlert(data);
    }, err => {
      AlertUtils.showErrorAlert(err);
    });
  }

  reset() {
    this.form.reset();
  }

}
