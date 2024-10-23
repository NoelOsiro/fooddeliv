import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { AddressService } from '../../services/address.service';
import { User, DeliveryAddress } from '../../models/user.model';

export class ProfileViewModel extends Observable {
    private authService: AuthService;
    private addressService: AddressService;
    private _user: User | null;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this.addressService = AddressService.getInstance();
        this._user = this.authService.getCurrentUser();

        // Listen for user updates
        this.authService.on(Observable.propertyChangeEvent, (data: any) => {
            if (data.propertyName === 'currentUser') {
                this._user = data.value;
                this.notifyPropertyChange('user', this._user);
            }
        });
    }

    get user(): User | null {
        return this._user;
    }

    onLogout() {
        this.authService.logout();
        Frame.topmost().navigate({
            moduleName: 'views/auth/login-page',
            clearHistory: true
        });
    }

    onAddAddress() {
        Frame.topmost().navigate({
            moduleName: 'views/address/add-address-page',
            animated: true
        });
    }

    onEditAddress(args: any) {
        const address = args.object.bindingContext as DeliveryAddress;
        Frame.topmost().navigate({
            moduleName: 'views/address/add-address-page',
            context: { address },
            animated: true
        });
    }

    onDeleteAddress(args: any) {
        const address = args.object.bindingContext as DeliveryAddress;
        const success = this.addressService.deleteAddress(address.id);
        if (!success) {
            alert('Failed to delete address. Please try again.');
        }
    }

    onSetDefaultAddress(args: any) {
        const address = args.object.bindingContext as DeliveryAddress;
        const success = this.addressService.updateAddress(address.id, { isDefault: true });
        if (!success) {
            alert('Failed to set default address. Please try again.');
        }
    }
}