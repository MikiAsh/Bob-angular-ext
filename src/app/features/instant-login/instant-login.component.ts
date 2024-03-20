import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Login } from '../../models/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-instant-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './instant-login.component.html',
  styleUrl: './instant-login.component.scss',
})
export class InstantLoginComponent implements OnInit {

  private fb = inject(FormBuilder);

  loginsForm: FormGroup;
  logins: Login[] = [];
  oktaLogin: Partial<Login> = {
    name: 'Okta',
    email: ''
  };

  ngOnInit() {
    this.loginsForm = this.fb.group({
      oktaLoginName: [{value: 'Okta', disabled: true}],
      oktaLoginEmail: [''],
      userLoginName: [''],
      userLoginEmail: [''],
      userLoginPassword: [''],
      newUserLoginName: ['', Validators.required],
      newUserLoginEmail: ['', Validators.required],
      newUserLoginPassword: ['', Validators.required]
    });
  }

  // Add your form submission method here
  onSubmit() {
    console.log(this.loginsForm.value);
  }

  addEntry():void {
    const newUserLogin: Login = {
      sort: this.logins.length + 1,
      name: this.loginsForm.value.userLoginName,
      email: this.loginsForm.value.userLoginEmail,
      password: this.loginsForm.value.userLoginPassword
    };

    // Push the new entry into the logins array
    this.logins.push(newUserLogin);
  }
}
