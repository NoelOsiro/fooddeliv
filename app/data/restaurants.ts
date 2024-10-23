import { Restaurant } from '../models/restaurant.model';

export const restaurants: Restaurant[] = [
    {
        id: '1',
        name: 'Burger House',
        image: 'https://picsum.photos/300/200',
        rating: 4.5,
        deliveryTime: '20-30 min',
        categories: ['Fast Food', 'Burgers', 'American'],
        priceLevel: '$$'
    },
    {
        id: '2',
        name: 'Sushi Master',
        image: 'https://picsum.photos/300/200',
        rating: 4.7,
        deliveryTime: '25-35 min',
        categories: ['Asian', 'Japanese', 'Sushi'],
        priceLevel: '$$$'
    },
    {
        id: '3',
        name: 'Pizza Palace',
        image: 'https://picsum.photos/300/200',
        rating: 4.3,
        deliveryTime: '15-25 min',
        categories: ['Pizza', 'Italian'],
        priceLevel: '$$'
    },
    {
        id: '4',
        name: 'Green Bowl',
        image: 'https://picsum.photos/300/200',
        rating: 4.6,
        deliveryTime: '20-30 min',
        categories: ['Healthy', 'Salads', 'Vegan'],
        priceLevel: '$$'
    },
    {
        id: '5',
        name: 'Wok & Roll',
        image: 'https://picsum.photos/300/200',
        rating: 4.4,
        deliveryTime: '25-35 min',
        categories: ['Asian', 'Chinese', 'Thai'],
        priceLevel: '$$'
    }
];