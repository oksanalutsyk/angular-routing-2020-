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
      console.log('Please enter your userName and password');
      return;
    }
    this.currentUser = {
      id: 2,
      userName: userName,
    };
    console.log(`User: ${this.currentUser.userName} logged in`);
  }

  logout(): void {
    this.currentUser = null;
  }
}
