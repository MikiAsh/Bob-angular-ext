import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Login } from '../../models/model';

@Component({
  selector: 'app-instant-login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './instant-login.component.html',
  styleUrl: './instant-login.component.scss',
})
export class InstantLoginComponent {
  logins: Login[] = [];
  oktaLogin: Partial<Login> = {
    sort: 1,
    name: 'Okta',
    email: ''
  };
}
