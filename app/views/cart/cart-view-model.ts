import { Observable, Frame } from '@nativescript/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

export class CartViewModel extends Observable {
    private cartService: CartService;

    constructor() {
        super();
        this.cartService = CartService.getInstance();
    }

    get cartItems(): CartItem[] {
        return this.cartService.cartItems;
    }

    get total(): string {
        return this.cartService.total.toFixed(2);
    }

    onRemoveItem(args: any) {
        const cartItem = args.object.bindingContext;
        this.cartService.removeItem(cartItem.menuItem);
        this.notifyPropertyChange('cartItems', this.cartItems);
        this.notifyPropertyChange('total', this.total);
    }

    onCheckout() {
        // TODO: Implement checkout flow
        alert('Checkout functionality coming soon!');
    }
}