import { Observable } from '@nativescript/core';
import { User } from '../models/user.model';

export class AuthService extends Observable {
    private static instance: AuthService;
    private currentUser: User | null = null;

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    isAuthenticated(): boolean {
        return this.currentUser !== null;
    }

    async login(email: string, password: string): Promise<boolean> {
        // Simulate API call
        if (email && password) {
            this.currentUser = {
                id: '1',
                email,
                name: email.split('@')[0],
                addresses: []
            };
            this.notifyPropertyChange('currentUser', this.currentUser);
            return true;
        }
        return false;
    }

    async register(email: string, password: string, name: string): Promise<boolean> {
        // Simulate API call
        if (email && password && name) {
            this.currentUser = {
                id: '1',
                email,
                name,
                addresses: []
            };
            this.notifyPropertyChange('currentUser', this.currentUser);
            return true;
        }
        return false;
    }

    logout() {
        this.currentUser = null;
        this.notifyPropertyChange('currentUser', null);
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}