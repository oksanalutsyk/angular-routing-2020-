import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'routing-app';
  active = 1;

  constructor(public authService: AuthService, private router: Router) {}

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    console.log('Log out');
  }
}
 