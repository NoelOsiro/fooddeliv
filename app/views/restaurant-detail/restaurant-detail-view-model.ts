import { Observable, Frame } from '@nativescript/core';
import { Restaurant } from '../../models/restaurant.model';
import { MenuItem } from '../../models/menu-item.model';
import { menuItems } from '../../data/menu-items';
import { CartService } from '../../services/cart.service';

export class RestaurantDetailViewModel extends Observable {
    private _restaurant: Restaurant;
    private _menuItems: MenuItem[];
    private cartService: CartService;

    constructor(restaurant: Restaurant) {
        super();
        this._restaurant = restaurant;
        this._menuItems = menuItems[restaurant.id] || [];
        this.cartService = CartService.getInstance();
        
        // Listen for cart updates
        this.cartService.on(Observable.propertyChangeEvent, (data: any) => {
            if (data.propertyName === 'itemCount') {
                this.notifyPropertyChange('cartItemCount', this.cartItemCount);
            }
        });
    }

    get restaurant(): Restaurant {
        return this._restaurant;
    }

    get menuItems(): MenuItem[] {
        return this._menuItems;
    }

    get cartItemCount(): number {
        return this.cartService.itemCount;
    }

    onAddToCart(args: any) {
        const menuItem = args.object.bindingContext;
        this.cartService.addItem(menuItem);
    }

    onViewCart() {
        Frame.topmost().navigate({
            moduleName: 'views/cart/cart-page',
            animated: true
        });
    }
}