import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from '../../components/user/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
  ],
  declarations: [LoginComponent],
  providers: [AuthService, AuthGuard],
})
export class UserModule {}
