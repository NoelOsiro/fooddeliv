import { Observable } from '@nativescript/core';
import { DeliveryAddress } from '../models/user.model';
import { AuthService } from './auth.service';

export class AddressService extends Observable {
    private static instance: AddressService;
    private authService: AuthService;

    static getInstance(): AddressService {
        if (!AddressService.instance) {
            AddressService.instance = new AddressService();
        }
        return AddressService.instance;
    }

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    addAddress(address: Partial<DeliveryAddress>): boolean {
        const user = this.authService.getCurrentUser();
        if (!user) return false;

        if (!user.addresses) {
            user.addresses = [];
        }

        const newAddress: DeliveryAddress = {
            id: Date.now().toString(),
            label: address.label || 'Home',
            address: address.address || '',
            isDefault: address.isDefault || user.addresses.length === 0
        };

        if (newAddress.isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        user.addresses.push(newAddress);
        this.authService.notifyPropertyChange('currentUser', user);
        return true;
    }

    updateAddress(addressId: string, updates: Partial<DeliveryAddress>): boolean {
        const user = this.authService.getCurrentUser();
        if (!user || !user.addresses) return false;

        const address = user.addresses.find(addr => addr.id === addressId);
        if (!address) return false;

        Object.assign(address, updates);

        if (updates.isDefault) {
            user.addresses.forEach(addr => {
                if (addr.id !== addressId) {
                    addr.isDefault = false;
                }
            });
        }

        this.authService.notifyPropertyChange('currentUser', user);
        return true;
    }

    deleteAddress(addressId: string): boolean {
        const user = this.authService.getCurrentUser();
        if (!user || !user.addresses) return false;

        const index = user.addresses.findIndex(addr => addr.id === addressId);
        if (index === -1) return false;

        const wasDefault = user.addresses[index].isDefault;
        user.addresses.splice(index, 1);

        if (wasDefault && user.addresses.length > 0) {
            user.addresses[0].isDefault = true;
        }

        this.authService.notifyPropertyChange('currentUser', user);
        return true;
    }
}