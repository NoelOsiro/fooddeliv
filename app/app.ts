import { Application } from '@nativescript/core';
import { AuthService } from './services/auth.service';

Application.run({ 
    moduleName: AuthService.getInstance().isAuthenticated() ? 'main-page' : 'views/auth/login-page'
});