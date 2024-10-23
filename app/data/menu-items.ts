import { MenuItem } from '../models/menu-item.model';

export const menuItems: Record<string, MenuItem[]> = {
    '1': [
        {
            id: '1-1',
            name: 'Classic Burger',
            description: 'Juicy beef patty with fresh lettuce, tomato, and special sauce',
            price: 12.99,
            image: 'https://picsum.photos/300/200',
            category: 'Burgers'
        },
        {
            id: '1-2',
            name: 'Cheese Fries',
            description: 'Crispy fries topped with melted cheddar',
            price: 5.99,
            image: 'https://picsum.photos/300/200',
            category: 'Sides'
        }
    ]
}