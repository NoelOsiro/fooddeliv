import { Observable, Frame, alert } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class RegisterViewModel extends Observable {
    private authService: AuthService;
    name: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    async onRegister() {
        if (!this.name || !this.email || !this.password || !this.confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (this.password !== this.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const success = await this.authService.register(this.email, this.password, this.name);
            if (success) {
                Frame.topmost().navigate({
                    moduleName: 'main-page',
                    clearHistory: true
                });
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            alert('Registration failed. Please try again.');
        }
    }
}