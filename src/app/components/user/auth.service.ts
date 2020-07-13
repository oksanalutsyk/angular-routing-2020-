import { Injectable } from '@angular/core';

import { IUser } from './user';
// import { MessageService } from '../messages/message.service';

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
      // this.messageService.addMessage('Please enter your userName and password');
      return;
    }
    // if (userName === 'admin') {
    //     this.currentUser = {
    //         id: 1,
    //         userName: userName,
    //         // isAdmin: true
    //     };
    //     console.log('Please enter your userName and password')
    //     // this.messageService.addMessage('Admin login');
    //     return;
    // }
    this.currentUser = {
      id: 2,
      userName: userName,
      // isAdmin: false
    };
    console.log(`User: ${this.currentUser.userName} logged in`);
    // this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
  }

  logout(): void {
    this.currentUser = null;
  }
}
