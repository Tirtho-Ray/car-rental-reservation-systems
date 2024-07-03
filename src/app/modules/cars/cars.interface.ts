import { TCarFeatures } from "./cars.constant";

export type TCars = {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    features: TCarFeatures[];
    pricePerHour: number;
    status: 'available' | 'unavailable';
    isDeleted: boolean;
}
