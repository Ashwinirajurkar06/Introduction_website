import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: "", redirectTo: "login", pathMatch: "full" },
	{ path: "login", loadComponent: () => import('./authentication/login/login').then(c => c.Login), data: { title: "Login Page", animation: 'LoginPage' } },
	{ path: "register", loadComponent: () => import('./authentication/register/register').then(c => c.Register), data: { title: "Register Page", animation: 'RegisterPage' } },
];
