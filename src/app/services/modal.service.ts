import { Injectable, EventEmitter } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private uploadNotification = new EventEmitter<any>();

  get getUploadNotification(): EventEmitter<any> {
    return this.uploadNotification;
  }

  openChangePasswordModal() {
    $('#changePasswordModal').modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  closeChangePasswordModal() {
    $('#changePasswordModal').modal('toggle');
  }

  openEditMyProfileModal() {
    $('#editMyProfileModal').modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  closeEditMyProfileModal() {
    $('#editMyProfileModal').modal('toggle');
  }
}
