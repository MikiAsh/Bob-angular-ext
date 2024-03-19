import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-bob',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './not-bob.component.html',
  styleUrl: './not-bob.component.scss',
})
export class NotBobComponent { }
