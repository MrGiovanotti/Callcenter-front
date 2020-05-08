import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertUtils } from 'src/app/utils/alerts.utils';
import { User } from 'src/app/models/user.model';
import { ConstantsUtils } from 'src/app/utils/constants.utils';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: Array<User>;

  chosenUser: User;

  paginator: any;
  PAGINATOR_ROUTE = '/users/page';
  CREATE_USER_ROUTE: string;
  UPDATE_USER_ROUTE: string;

  noUsersMessage = 'No tienes usuarios disponibles';
  loading = false;

  form: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService
  ) {
    this.form = new FormGroup({
      searchingText: new FormControl('')
    });
    this.CREATE_USER_ROUTE = '/'.concat(ConstantsUtils.CREATE_USER_ROUTE);
    this.UPDATE_USER_ROUTE = '/'.concat(ConstantsUtils.UPDATE_USER_ROUTE).replace(':id', '');
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.userService.getUsers(page).subscribe(data => {
        this.paginator = data.object;
        this.users = [];
        data.object.content.map((user: User) => {
          this.users.push(user);
        });
        this.loading = false;
      }, err => {
        AlertUtils.showErrorAlert(err);
      });
    });

    this.modalService.getUploadNotification.subscribe((user: User) => {
      this.users.map(originalUser => {
        if (originalUser.id === user.id) {
          originalUser.image = user.image;
        }
      });
    });
  }

  deleteUser(user: User) {
    AlertUtils.showQuestionAlert('¿Eliminar Usuario', 'Eliminarás al usuario '.concat(user.name, '?')).then(result => {
      if (result.value) {
        this.userService.deleteUser(user.id).subscribe(data => {
          this.users = this.users.filter(u => u.id !== user.id);
          if (this.users.length === 0) {
            this.router.navigate([ConstantsUtils.LIST_USERS_ROUTE]);
          }
          AlertUtils.showSuccessAlert(data);
        }, err => {
          AlertUtils.showErrorAlert(err);
        });
      }
    });
  }

  openChangePasswordModal(user: User) {
    this.chosenUser = user;
    this.modalService.openChangePasswordModal();
  }

  showUser(user: User) {
    const route = ConstantsUtils.SHOW_USER_ROUTE.replace(':id', '');
    this.router.navigate([route, user.id]);
  }

  searchUser() {
    const name = this.form.value.searchingText;
    if (name.trim().length === 0) {
      return;
    }
    this.router.navigate([ConstantsUtils.SEARCH_USER_ROUTE.replace(':name', ''), name]);
  }

}
