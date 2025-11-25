import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Validation from '../../utility/store/validation';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm!: FormGroup;
  public formBuilder = inject(FormBuilder);
  userDetailSubmit = signal(false);
  passwordShow = "password";
  confirmPasswordShow = "password";
  loginStatus = signal<boolean>(false);


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      dob: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|info|biz|co|us|uk|ca|au|in|de|cn|jp|ai|blog|tech|online|app|io)$/), Validators.minLength(6), Validators.maxLength(100)]],
      mobile: ["", [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]]
    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }


  get f(): { [key: string]: AbstractControl; } {
    // return this.form.controls;
    return this.registerForm.controls;
  }
  submitRegisterDetails() {
    this.userDetailSubmit.set(true);

    if (this.registerForm.invalid) {
      return;
    } else {
      // Registration logic to be implemented
    }
  }
}
