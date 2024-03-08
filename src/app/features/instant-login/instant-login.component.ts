import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-instant-login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './instant-login.component.html',
  styleUrl: './instant-login.component.scss',
})
export class InstantLoginComponent { }
