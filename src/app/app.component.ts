import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'routing-app';
  // active = 1;

  constructor(public authService: AuthService, private router: Router) {}

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
 