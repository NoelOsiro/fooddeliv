export interface Restaurant {
    id: string;
    name: string;
    image: string;
    rating: number;
    deliveryTime: string;
    categories: string[];
    priceLevel: string;
    searchTerms?: string; // For search functionality
}