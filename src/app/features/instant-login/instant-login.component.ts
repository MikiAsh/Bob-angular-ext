import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { StorageActions, appName } from '../../models/model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChromeStorageService } from '../../services/storage.service';

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
  private storageService = inject(ChromeStorageService);

  topForm: FormGroup;

  ngOnInit() {
    this.topForm = this.fb.group({
      oktaLoginName: [{value: 'Okta', disabled: true}],
      oktaLoginEmail: [''],
      featureEnabled: [true],
      userLogins: this.fb.array([]),
      newLine: this.fb.group({
        newUserLoginName: ['', Validators.required],
        newUserLoginEmail: ['', Validators.required],
        newUserLoginPassword: ['', Validators.required]
      })
    });

    this.populateUserLoginsFromStorage();
  }

  get userLogins(): FormArray {
    return this.topForm.get('userLogins') as FormArray;
  }

  get newLineGroup(): FormGroup {
    return this.topForm.get('newLine') as FormGroup;
  }

  async populateUserLoginsFromStorage(): Promise<void> {
    try {
      const storageData = await this.storageService.get(StorageActions.InstantLogin);
      const storedLogins = storageData?.['userLogins'] || [];
      this.userLogins.clear();

      const storedFeatureEnabled = storageData?.['featureEnabled'] || '';
      const storedOktaLoginEmail = storageData?.['oktaLoginEmail'] || '';

      this.topForm.patchValue({
        featureEnabled: storedFeatureEnabled,
        oktaLoginEmail: storedOktaLoginEmail,
      });

      storedLogins.forEach((login: any) => {
        const loginFormGroup = this.fb.group({
          sort: [login.sort, Validators.required],
          userLoginName: [login.userLoginName, Validators.required],
          userLoginEmail: [login.userLoginEmail, Validators.required],
          userLoginPassword: [login.userLoginPassword, Validators.required],
        });
        this.userLogins.push(loginFormGroup);
      });
    } catch (error) {
      console.error(appName, 'Failed to load user logins from storage:', error);
    }
  }

  addEntry(): void {
    const loginsForm = this.fb.group({
      sort: this.userLogins.length + 1,
      userLoginName: [this.newLineGroup.get('newUserLoginName').value, Validators.required],
      userLoginEmail: [this.newLineGroup.get('newUserLoginEmail').value, Validators.required],
      userLoginPassword: [this.newLineGroup.get('newUserLoginPassword').value, Validators.required],
    });

    this.userLogins.push(loginsForm);

    this.newLineGroup.reset({
      newUserLoginName: '',
      newUserLoginEmail: '',
      newUserLoginPassword: ''
    });
  }

  deleteEntry(index: number):void {
    this.userLogins.removeAt(index);
  }

  onSubmit(): void {
    const { featureEnabled, oktaLoginEmail, userLogins } = this.topForm.value;
    const saveObj = { [StorageActions.InstantLogin]: { featureEnabled, oktaLoginEmail, userLogins }};
    this.storageService.set(saveObj)
    .then(() => {
      alert('Data saved successfully');
    })
    .catch((error) => {
      alert('Failed to save data');
      console.error(appName, 'Failed to save data:', error);
    });
  }

  trackByFn(index: number, item: any): string {
    return item.value.userLoginEmail;
  }
}
