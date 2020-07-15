import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  currentUser: IUser;
  //for guard
  redirectUrl: string;
  
  constructor() {}

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      return;
    }
    this.currentUser = {
      id: 2,
      userName: userName,
    };
  }

  logout(): void {
    this.currentUser = null;
  }
}
