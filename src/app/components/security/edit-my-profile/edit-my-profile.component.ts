import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormBase } from 'src/app/form.base';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsUtils } from 'src/app/utils/validators.utils';
import { UserService } from 'src/app/services/user.service';
import { AlertUtils } from 'src/app/utils/alerts.utils';
import { HttpEventType } from '@angular/common/http';
import { ConstantsUtils } from 'src/app/utils/constants.utils';
import { ModalService } from 'src/app/services/modal.service';
import { ChangePasswordData } from 'src/app/models/change-password-data.model';

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css']
})
export class EditMyProfileComponent extends FormBase {

  @Input()
  user: User;

  saving: boolean;

  userImage: string;

  chosenImage: File;
  progress = 0;

  imageMessage: string;

  hideInputFile: boolean;
  hideColumns: boolean;
  hideForm: boolean;
  hideMainButtons: boolean;
  hideImageButtons: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService
  ) {
    super();
    this.loadImage();
    this.resetImage();
    this.setNormalMode();
    this.form = fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {validator: ValidatorsUtils.checkPasswords});
  }

  changePassword() {
    if (this.form.invalid) {
      return;
    }
    this.saving = true;
    const changeData = new ChangePasswordData();
    changeData.id = this.user.id;
    changeData.oldPassword = this.form.value.oldPassword;
    changeData.newPassword = this.form.value.password;
    this.userService.changePassword(changeData).subscribe(data => {
      this.reset();
      this.setNormalMode();
      this.saving = false;
      AlertUtils.showSuccessAlert(data);
    }, err => {
      this.saving = false;
      AlertUtils.showErrorAlert(err);
    });
  }

  reset(): void {
    this.form.reset();
    this.resetImage();
  }

  resetImage() {
    this.chosenImage = null;
    this.imageMessage = 'Selecciona una imagen';
  }

  chooseImage(event: any) {
    this.progress = 0;
    this.chosenImage = event.target.files[0];
    if (this.chosenImage) {
      if (this.chosenImage.type.indexOf('image') < 0) {
        this.imageMessage = 'Lo siento, ese archivo no es válido';
        this.chosenImage = null;
      } else {
        this.imageMessage = '¡Excelente elección!';
      }
    } else {
      this.resetImage();
    }
  }

  uploadImage() {
    if (!this.chosenImage) {
      return;
    }
    this.userService.uploadImage(this.chosenImage, this.user.id.toString()).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((event.loaded / event.total) * 100);
      } else if (event.type === HttpEventType.Response) {
        const response: any = event.body;
        this.user = response.object;
        localStorage.setItem(ConstantsUtils.IMAGE_KEY_FOR_LOCAL_STORAGE, this.user.image);
        this.loadImage();
        this.resetImage();
        this.modalService.getUploadNotification.emit(this.user);
      }
    }, err => {
      AlertUtils.showErrorAlert(err);
    });
  }

  loadImage() {
    this.userImage = localStorage.getItem(ConstantsUtils.IMAGE_KEY_FOR_LOCAL_STORAGE);
  }

  prepareChangePassword() {
    this.hideColumns = true;
    this.hideForm = false;
    this.hideInputFile = true;
  }

  setNormalMode() {
    this.hideInputFile = true;
    this.hideColumns = false;
    this.hideForm = true;
    this.hideMainButtons = false;
    this.hideImageButtons = true;
  }

  prepareChangeImage() {
    this.hideInputFile = false;
    this.hideMainButtons = true;
    this.hideImageButtons = false;
  }

}
