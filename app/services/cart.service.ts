import { Observable } from '@nativescript/core';
import { CartItem } from '../models/cart-item.model';
import { MenuItem } from '../models/menu-item.model';

export class CartService extends Observable {
    private static instance: CartService;
    private items: CartItem[] = [];

    static getInstance(): CartService {
        if (!CartService.instance) {
            CartService.instance = new CartService();
        }
        return CartService.instance;
    }

    addItem(menuItem: MenuItem, quantity: number = 1) {
        const existingItem = this.items.find(item => item.menuItem.id === menuItem.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ menuItem, quantity });
        }
        
        this.notifyPropertyChange('total', this.total);
        this.notifyPropertyChange('itemCount', this.itemCount);
    }

    removeItem(menuItem: MenuItem) {
        this.items = this.items.filter(item => item.menuItem.id !== menuItem.id);
        this.notifyPropertyChange('total', this.total);
        this.notifyPropertyChange('itemCount', this.itemCount);
    }

    get cartItems(): CartItem[] {
        return this.items;
    }

    get total(): number {
        return this.items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    }

    get itemCount(): number {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
}