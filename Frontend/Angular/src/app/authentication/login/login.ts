import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Header } from '../../container/header/header';

@Component({
	selector: 'app-login',
	imports: [RouterLink, CommonModule, ReactiveFormsModule, Header],
	templateUrl: './login.html',
	styleUrl: './login.scss',
})
export class Login {
	loginForm!: FormGroup;
	private authService = inject(AuthenticationService);
	public formBuilder = inject(FormBuilder);
	userDetailSubmit = signal(false);
	private router = inject(Router);
	private toastr = inject(ToastrService);

	formSubmitStatus = signal<boolean>(false);
	passwordShow = signal("password");
	subscription!: Subscription;

	ngOnInit(): void {

		this.loginForm = this.formBuilder.group({
			email: ["devUser@gmail.com", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|info|biz|co|us|uk|ca|au|in|de|cn|jp|ai|blog|tech|online|app|io)$/), Validators.minLength(6), Validators.maxLength(100)]],
			password: ["123456", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]]
		});
	}

	ngAfterViewInit(): void {
		// this.checkTokenInSession();
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
		this.formSubmitStatus.set(true);

		this.subscription = this.authService.authenticate(email, password).subscribe({
			next: (response: any) => {
				if (response.status == 200 && response.mandatoryDataFound) {
					if (response.token !== undefined && response.token != '') {
						this.checkTokenInSession();
					}
				} else if (response.status == 200 && !response.mandatoryDataFound) {
					this.toastr.info('Please complete your profile information.', 'Info', { closeButton: true, timeOut: 10000, progressBar: true });
					this.router.navigate(['/user-info']);
				} else {

				}

				this.formSubmitStatus.set(false);

			},
			error: (err: any) => {
				this.formSubmitStatus.set(false);
				if (err.error.status === 422 || err.error.status === 404) {
					this.toastr.error(err.error.message, 'Error');
					return;
				} else {
					this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
				}
			},
			complete: () => {
				// console.log("completed");
			},
		});
	}


	checkTokenInSession() {
		const tokenAccess = sessionStorage.getItem("tokenAccess");
		if (tokenAccess) {
			this.router.navigate(["/home"]);
		} else {
			this.router.navigate(["/login"]);
		}
	}
	ngOnDestroy() {
		if (this.subscription && !this.subscription.closed) {
			this.subscription.unsubscribe();
		}
	}

}
