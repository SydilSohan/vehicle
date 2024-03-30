export type Car = {
    id: string;
    make: string;
    model: string;
    year: number;
    type: string;
    seats: number;
    bags: number;
    features: string[];
    rates: {
        hourly: number;
        daily: number;
        weekly: number;
    };
    imageURL: string;
};
export type CarsList = Car[];
export type FormValues = {
    first: string;
    last: string;
    email: string;
    phone: string;
    additionalCharges: {
        collision?: boolean;
        liability?: boolean;
        rental?: boolean;

    };
    pickupDate: string;
    returnDate: string;
    vehicleType: string;
    vehicleId: string;

    total: number;
    discount: string;
};
export type AllCharges = {
    vehicleId: string;
    duration: {
        weeks: number;
        days: number;
        hours: number;
    };
    total: number;
    totalDaily: number;
    totalHourly: number;
    totalWeekly: number;
    discount: number;
    hourly: number;
    daily: number;
    weekly: number;
    rental?: number;
    liability?: number;
    collision?: number;
    discountPercentage?: number;
};