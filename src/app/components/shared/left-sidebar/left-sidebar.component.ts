import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConstantsUtils } from 'src/app/utils/constants.utils';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  @Input()
  expandSidebar: boolean;

  @Output()
  expandRight = new EventEmitter();

  user: User;
  image: string;

  DASHBOARD_ROUTE: string;
  LIST_USERS_ROUTE: string;

  constructor(
    private auth: AuthService,
    private modalService: ModalService,
  ) {
    this.loadImage();
    this.DASHBOARD_ROUTE = ConstantsUtils.DASHBOARD_ROUTE;
    this.LIST_USERS_ROUTE = ConstantsUtils.LIST_USERS_ROUTE.replace(':page', '0');
    this.user = this.auth.getUser;
  }

  ngOnInit(): void {
    this.modalService.getUploadNotification.subscribe((data: User) => {
      this.loadImage();
    });
  }

  openEditMyProfileModal() {
    this.modalService.openEditMyProfileModal();
  }

  loadImage(): void {
    this.image = localStorage.getItem(ConstantsUtils.IMAGE_KEY_FOR_LOCAL_STORAGE);
  }

  // Especific role functions

  isAdmin() {
    return this.auth.isAdmin();
  }

  isAgent() {
    return this.auth.hasRole('ROLE_AGENT');
  }

  isSupervisor() {
    return this.auth.hasRole('ROLE_SUPERVISOR');
  }

  idGuest() {
    return this.auth.hasRole('ROLE_GUEST');
  }

}
