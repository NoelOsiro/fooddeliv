import { Observable, Frame } from '@nativescript/core';
import { AddressService } from '../../services/address.service';

export class AddAddressViewModel extends Observable {
    private addressService: AddressService;
    label: string = '';
    address: string = '';
    isDefault: boolean = false;

    constructor() {
        super();
        this.addressService = AddressService.getInstance();
    }

    onSaveAddress() {
        if (!this.label || !this.address) {
            alert('Please fill in all fields');
            return;
        }

        const success = this.addressService.addAddress({
            label: this.label,
            address: this.address,
            isDefault: this.isDefault
        });

        if (success) {
            Frame.topmost().goBack();
        } else {
            alert('Failed to save address. Please try again.');
        }
    }
}