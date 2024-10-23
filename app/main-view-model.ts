import { Observable, Frame } from '@nativescript/core';
import { restaurants } from './data/restaurants';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { Restaurant } from './models/restaurant.model';

export class MainViewModel extends Observable {
    private _allRestaurants: Restaurant[];
    private _filteredRestaurants: Restaurant[];
    private _selectedCategory: string = 'All';
    private _searchQuery: string = '';
    private cartService: CartService;
    private authService: AuthService;

    constructor() {
        super();
        this._allRestaurants = restaurants;
        this._filteredRestaurants = [...restaurants];
        this.cartService = CartService.getInstance();
        this.authService = AuthService.getInstance();
        
        // Listen for cart updates
        this.cartService.on(Observable.propertyChangeEvent, (data: any) => {
            if (data.propertyName === 'itemCount') {
                this.notifyPropertyChange('cartItemCount', this.cartItemCount);
            }
        });
    }

    get restaurants(): Restaurant[] {
        return this._filteredRestaurants;
    }

    get cartItemCount(): number {
        return this.cartService.itemCount;
    }

    get selectedCategory(): string {
        return this._selectedCategory;
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.filterRestaurants();
            this.notifyPropertyChange('searchQuery', value);
        }
    }

    onCategoryTap(args: any) {
        const category = args.object.text;
        this._selectedCategory = category;
        this.notifyPropertyChange('selectedCategory', category);
        this.filterRestaurants();
    }

    private filterRestaurants() {
        let filtered = [...this._allRestaurants];

        // Apply category filter
        if (this._selectedCategory !== 'All') {
            filtered = filtered.filter(restaurant => 
                restaurant.categories.includes(this._selectedCategory)
            );
        }

        // Apply search filter
        if (this._searchQuery) {
            const query = this._searchQuery.toLowerCase();
            filtered = filtered.filter(restaurant => 
                restaurant.name.toLowerCase().includes(query) ||
                restaurant.categories.some(cat => cat.toLowerCase().includes(query))
            );
        }

        this._filteredRestaurants = filtered;
        this.notifyPropertyChange('restaurants', filtered);
    }

    onRestaurantTap(args: any) {
        const restaurant = this._filteredRestaurants[args.index];
        Frame.topmost().navigate({
            moduleName: 'views/restaurant-detail/restaurant-detail-page',
            context: { restaurant },
            animated: true
        });
    }

    onViewCart() {
        Frame.topmost().navigate({
            moduleName: 'views/cart/cart-page',
            animated: true
        });
    }

    onProfile() {
        Frame.topmost().navigate({
            moduleName: 'views/profile/profile-page',
            animated: true
        });
    }
}