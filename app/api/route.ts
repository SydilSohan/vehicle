import { Car, CarsList, FormValues } from "@/lib/types";
import { NextResponse } from "next/server"

// Helper function to calculate charges
function calculateCharges(selectedCar: Car, duration: any, formValues: FormValues) {
    let allCharges = {}
    const totalHourly = duration.hours ? selectedCar.rates.hourly * duration.hours : 0;
    const totalDaily = duration.days ? (totalHourly > 0 ? Math.min(selectedCar.rates.daily * duration.days, totalHourly * 24) : selectedCar.rates.daily * duration.days) : 0;
    const totalWeekly = duration.weeks ? (totalDaily > 0 ? Math.min(selectedCar.rates.weekly * duration.weeks, totalDaily * 7) : selectedCar.rates.weekly * duration.weeks) : 0;
    let total = totalHourly + totalDaily + totalWeekly ;
    if(formValues.discount) total = total - (total * (parseInt(formValues.discount) / 100));
    allCharges = { ...allCharges, totalDaily, totalHourly, totalWeekly, total, duration,  discount: formValues.discount, hourly: selectedCar.rates.hourly, daily: selectedCar.rates.daily, weekly: selectedCar.rates.weekly};

    if (formValues.additionalCharges.collision) {
        allCharges = { ...allCharges, collision: 9.00, total : total + 9.00}
    }
    if (formValues.additionalCharges.liability) {
        allCharges = { ...allCharges, liability: 15.00, total : total + 15.00}
    }
    if (formValues.additionalCharges.rental) {
        const rental = total * 0.115; // 11.5% of the total
        allCharges = { ...allCharges, rental , total : total + rental}
    }

    return allCharges;
}

export async function POST(request: Request) {
    const { duration, formValues } = await request.json();

    try {
        const response = await fetch('https://exam-server-7c41747804bf.herokuapp.com/carsList', {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const { data } = await response.json() as { data: CarsList };
        const selectedCar = data.find(car => car.id === formValues.vehicleId);
        if (!selectedCar) return NextResponse.json({ message: "car not found" });

        const hourly = selectedCar.rates.hourly;
        const daily = selectedCar.rates.daily;
        const weekly = selectedCar.rates.weekly;
        const allCharges = calculateCharges(selectedCar, duration, formValues)
        return NextResponse.json({ allCharges });

    } catch (error) {
        console.error('There has been a problem with your fetch operation: ', error);
        return NextResponse.json({ message: "Error fetching data" });
    }
}
