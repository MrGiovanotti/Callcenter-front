import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AlertUtils } from 'src/app/utils/alerts.utils';
import { ConstantsUtils } from 'src/app/utils/constants.utils';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  isLoading: boolean;
  users: Array<User>;

  UPDATE_USER_ROUTE: string;
  chosenUser: User;

  noUsersMessage = 'No hay coincidencias con tu búsqueda';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: ModalService,
    private router: Router
    ) {
      this.isLoading = true;
      this.UPDATE_USER_ROUTE = '/'.concat(ConstantsUtils.UPDATE_USER_ROUTE).replace(':id', '');
      this.users = [];
      const name = this.route.snapshot.params.name;
      this.userService.searchUser(name).subscribe(data => {
        this.isLoading = false;
        this.users = data.object;
      }, err => {
        AlertUtils.showErrorAlert(err);
      });
    }

  ngOnInit(): void {
  }

  deleteUser(user: User) {
    AlertUtils.showQuestionAlert('¿Eliminar Usuario', 'Eliminarás al usuario '.concat(user.name, '?')).then(result => {
      if (result.value) {
        this.userService.deleteUser(user.id).subscribe(data => {
          this.users = this.users.filter(u => u.id !== user.id);
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

}
