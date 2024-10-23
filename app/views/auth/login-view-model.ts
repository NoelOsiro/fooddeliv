import { Observable, Frame, alert } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class LoginViewModel extends Observable {
    private authService: AuthService;
    email: string = '';
    password: string = '';

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    async onLogin() {
        if (!this.email || !this.password) {
            alert('Please enter both email and password');
            return;
        }

        try {
            const success = await this.authService.login(this.email, this.password);
            if (success) {
                Frame.topmost().navigate({
                    moduleName: 'main-page',
                    clearHistory: true
                });
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    }

    onRegister() {
        Frame.topmost().navigate({
            moduleName: 'views/auth/register-page',
            animated: true
        });
    }
}