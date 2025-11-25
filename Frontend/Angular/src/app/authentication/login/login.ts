import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;
  public formBuilder = inject(FormBuilder);
  userDetailSubmit = signal(false);

  loginStatus = signal<boolean>(false);
  passwordShow = signal("password");

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|info|biz|co|us|uk|ca|au|in|de|cn|jp|ai|blog|tech|online|app|io)$/), Validators.minLength(6), Validators.maxLength(100)]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]]
    });
  }
  get f(): { [key: string]: AbstractControl; } {
    // return this.form.controls;
    return this.loginForm.controls;
  }


  submitLoginDetails() {
    this.userDetailSubmit.set(true);

    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginUser(this.f["email"].value, this.f["password"].value);
    }
  }
  passToggle() {
    if (this.passwordShow() == "password") {
      this.passwordShow.update((value) => value = "text");
    } else {
      this.passwordShow.update((value) => value = "password");
    }
  }

  loginUser(email: string, password: string) {
    this.loginStatus.set(true);
  }
}
