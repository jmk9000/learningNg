import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from "@angular/core";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error:string = null;

    constructor(private authService: AuthService) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        this.isLoading = true;
        const email = form.value.email;
        const password = form.value.password;

        let authObservable: Observable<AuthResponseData>

        if (this.isLoginMode) {
            authObservable = this.authService.login(email,password)            
        } else {
            authObservable = this.authService.signup(email, password)
        }

        authObservable.subscribe(
            response => {
                console.log(response);
                this.isLoading = false;
            }, 
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            });

        form.reset();
    }

}