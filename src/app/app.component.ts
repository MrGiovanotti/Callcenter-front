import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  expandSidebar = false;
  expandRightSidebar = false;

  constructor(private auth: AuthService) {
  }

  changeExpand(): void {
    this.expandSidebar = !this.expandSidebar;
  }

  changeExpandRightSidebar() {
    this.expandRightSidebar = !this.expandRightSidebar;
  }

  showComponents(): boolean {
    return this.auth.isAuthenticated();
  }

}
