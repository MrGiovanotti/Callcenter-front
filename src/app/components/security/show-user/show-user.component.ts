import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ConstantsUtils } from 'src/app/utils/constants.utils';
import { AlertUtils } from 'src/app/utils/alerts.utils';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    const id = this.route.snapshot.params.id;
    this.userService.getUser(id).subscribe(data => {
      this.user = data.object;
    }, err => {
      AlertUtils.showErrorAlert(err);
    });
  }

  openEdit() {
    const editRoute = ConstantsUtils.UPDATE_USER_ROUTE.replace(':id', '');
    this.router.navigate([editRoute, this.user.id]);
  }

}
