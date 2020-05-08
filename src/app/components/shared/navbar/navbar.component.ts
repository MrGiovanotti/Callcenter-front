import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ConstantsUtils } from 'src/app/utils/constants.utils';

import Swal from 'sweetalert2';
import { AlertUtils } from 'src/app/utils/alerts.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  expandSidebar: boolean;

  @Output()
  expand = new EventEmitter();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    AlertUtils.showQuestionAlert('Cerrar Sesión', '¿Cerrarás sesión en Nashira?').then(result => {
      if (result.value) {
        this.auth.logout();
        this.router.navigate([ConstantsUtils.LOGIN_ROUTE]);
      }
    });
  }


}
