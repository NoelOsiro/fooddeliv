export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    addresses?: DeliveryAddress[];
}

export interface DeliveryAddress {
    id: string;
    label: string;
    address: string;
    isDefault: boolean;
}