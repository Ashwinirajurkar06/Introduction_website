import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Validation from '../../utility/store/validation';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { UserRegister } from '../../utility/interfaces/general';
import { ToastrService } from 'ngx-toastr';

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
	subscription!: Subscription;
	formSubmitStatus = signal<boolean>(false);
	private authService = inject(AuthenticationService);
	private router = inject(Router);
	private toastr = inject(ToastrService);


	ngOnInit(): void {
		this.registerForm = this.formBuilder.group({
			fName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
			lName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
			dob: ["", [Validators.required]],
			email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|info|biz|co|us|uk|ca|au|in|de|cn|jp|ai|blog|tech|online|app|io)$/), Validators.minLength(6), Validators.maxLength(100)]],
			mobile: ["", [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10)]],
			password: ["", [Validators.required, Validators.minLength(6)]],
			terms: [false, [Validators.requiredTrue]],
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
		this.registerForm.markAllAsTouched();

		if (this.registerForm.invalid) {
			return;
		} else {
			// Registration logic to be implemented
			const registerData: UserRegister = {
				fName: this.f['fName'].value,
				lName: this.f['lName'].value,
				dob: this.f['dob'].value,
				email: this.f['email'].value,
				mobile: this.f['mobile'].value,
				password: this.f['password'].value,
			};
			this.registerUser(registerData);


		}
	}


	registerUser(data: UserRegister) {
		this.formSubmitStatus.set(true);

		this.authService.createUser(data).subscribe({
			next: (response: any) => {
				if (response.status == 200) {
					this.toastr.success('User Registered successfully!', 'Success', { closeButton: true, timeOut: 5000, progressBar: true });
					this.router.navigate(['/login']);
				} else {
					this.toastr.error('Failed to register user. Please try again.', 'Error', { closeButton: true, timeOut: 5000, progressBar: true });
				}

				this.formSubmitStatus.set(false);
			},
			error: (err: any) => {
				if (err.error.status === 422 || err.error.status === 500) {
					this.toastr.error(err.error.message, 'Error');
					return;
				} else {
					this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
				}

				this.formSubmitStatus.set(false);
			},
			complete: () => {
				// console.log("completed");
			},
		});
	}

	ngOnDestroy() {
		if (this.subscription && !this.subscription.closed) {
			this.subscription.unsubscribe();
		}
	}
}
