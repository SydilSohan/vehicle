'use client'
import React, { useEffect, useMemo, useState} from 'react'
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AllCharges, CarsList, FormValues } from '@/lib/types';
import { Card, CardContent, CardHeader } from './ui/card';
import { TableDemo } from './ChargesTable';
import { useReactToPrint } from 'react-to-print';
import { Button } from './ui/button';
type Props = {
    cars : CarsList
}

const MainForm = ({cars}: Props) => {
    const componentRef = React.useRef(null);
    const [formValues, setFormValues] = useState<FormValues>()
    const [allCharges, setAllCharges] = useState<AllCharges>()
    
const duration = useMemo(() => {
    if (formValues?.pickupDate && formValues.returnDate) {
        if (formValues.pickupDate.getTime() > formValues.returnDate.getTime()) {
            alert("Pickup date cannot be in the future of return date");
            return { weeks: 0, days: 0, hours: 0 };
        }

        const diffTime = Math.abs(formValues.returnDate.getTime() - formValues.pickupDate.getTime());
        const diffHoursTotal = Math.floor(diffTime / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHoursTotal / 24);
        const diffWeeks = Math.floor(diffDays / 7);
        const remainingDays = diffDays % 7;
        const diffHours = diffHoursTotal % 24;

        return { weeks: diffWeeks, days: remainingDays, hours: diffHours };
    }
    return { weeks: 0, days: 0, hours: 0 };
}, [formValues?.pickupDate, formValues?.returnDate]);
const [availableCars, setAvailableCars] = React.useState<CarsList>([])
const handleVehicleTypeChange = (e: any) => {
    console.log(e)
    const selectedCars = cars.filter(car => car.type.toLowerCase() === e.toLowerCase())
    setAvailableCars(selectedCars)
}
const handleFormChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'datetime-local') {
     setFormValues((prev) => ({
        ...prev,
        [e.target.name]: new Date(e.target.value)
    }) as FormValues);
    return;
    }
    if (e.target.type === 'checkbox') {
        if (e.target.checked) {     
        setFormValues((prev) => ({
            ...prev,
            additionalCharges: {
                ...(prev?.additionalCharges ?? {}),
                [e.target.name]: true
            }
        }) as FormValues);
        return
    }  else {
        setFormValues((prev) => ({
            ...prev,
            additionalCharges: {
                ...(prev?.additionalCharges ?? {}),
                [e.target.name]: false
            }
        }) as FormValues);
    return
    }

} 
setFormValues((prev) => ({
    ...prev,
    [e.target.name]: e.target.value
}) as FormValues);

}


useEffect(() => {
    if(!formValues?.vehicleId) return;
    const getSummery = async () => {
        const response = await fetch('/api', {
            method: 'POST',
            body: JSON.stringify({duration, formValues}),
            headers: {  'Content-Type': 'application/json' }
        })
        const data = await response.json()
        setAllCharges(data.allCharges)
    }
    getSummery()
}, 
[formValues?.vehicleId, duration, formValues?.additionalCharges, formValues?.discount])


const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className='mx-auto flex flex-col self-center justify-self-center m-2 '>
          <div className="flex flex-row justify-between items-center w-full">

<h2>Reservation</h2>
<Button onClick={handlePrint}>
  Print/Download
</Button>
</div>
        <form className="w-full  space-y-6 flex flex-wrap lg:flex-nowrap gap-4">

<div className='flex flex-col lg:flex-row gap-4 flex-shrink items-start'>
<div className='flex flex-col gap-4 flex-1  '>
<Card>
    <CardHeader>

<h3 className="border-b-2 border-purple-700">Reservation Details</h3>
    </CardHeader>

    <CardContent>
    <label>
        <p className="text-lg font-semibold mb-2 mt-4" >Reservation ID</p>
        <Input type="text"
            className="resize-none"
            name="id"
            onChange={handleFormChange}
        />
    </label>
    <label>
        <p className="text-lg font-semibold mb-2 mt-4" >Pickup Date  <span className="mx-2 text-red-600">*</span></p>
        <input  type="datetime-local"
            className="resize-none"
            name="pickupDate"
            onChange={handleFormChange}
            required
        />
    </label>
    <label>
        <p className="text-lg font-semibold mb-2 mt-4" >Return Date <span className="mx-2 text-red-600">*</span></p>
        <input type="datetime-local"
            onChange={handleFormChange}
            className="resize-none"
            name="returnDate"
            required
        />
    </label>
    <label className="flex flex-row gap-4 items-center">
        <p className="text-lg font-semibold mb-2 mt-4" >Duration</p>
        <Input className='min-w-56'
            type="text"
            value={`${duration.weeks} weeks, ${duration.days} days, ${duration.hours} hours`}
            disabled
        />
    </label>
    <label className="flex flex-row gap-4 items-center">
        <p className="text-lg font-semibold mb-2 mt-4" >Discount</p>
        <Input className='min-w-56'
            type="number"
            name='discount'
            onChange={handleFormChange}
        />
    </label>

    </CardContent>
</Card><Card>
        <CardHeader>
        <h3 className="border-b-2 border-purple-700">Vehicle  Details</h3>

        </CardHeader>
        <CardContent>
        <label>
            <p className="text-lg font-semibold mb-2 mt-4" >Vehicle Type  <span className="mx-2 text-red-600">*</span></p>
            <Select  onValueChange={handleVehicleTypeChange} >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="" />
  </SelectTrigger>
  <SelectContent >
      <SelectItem  value={'Sedan'}>
  
     
        Sedan
   
        
      </SelectItem>     
      <SelectItem  value={'Suv'}>
        Suv
      </SelectItem>
  </SelectContent>
</Select>

        </label>
        <label>
            <p className="text-lg font-semibold mb-2 mt-4" >Vehicle <span className="mx-2 text-red-600">*</span></p>
            <Select name='vehicleId' onValueChange={(value) => 
                {
                    setFormValues({...formValues, vehicleId: value} as FormValues)
                    }}  >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="" />
  </SelectTrigger>
  <SelectContent >
     {availableCars.map(car => <SelectItem  key={car.id} value={car.id} >
        {`${car.make} ${car.model}`}
      </SelectItem>)}
  </SelectContent>
</Select>
        </label>
        </CardContent>
      </Card>
</div>
<div className='flex flex-col gap-4 flex-1'>
<Card>
        <CardHeader>
        <h3 className="border-b-2 border-purple-700">Customer Information</h3>

        </CardHeader>
        <CardContent>
        <label className='flex flex-col gap-4'>
            <p className="text-lg font-semibold mb-2 mt-4" >First Name <span className="mx-2 text-red-600">*</span></p>
            <Input onChange={handleFormChange} type='text' name='first' />

        </label>
          
        <label className='flex flex-col gap-4'>
            <p className="text-lg font-semibold mb-2 mt-4" >Last Name <span className="mx-2 text-red-600">*</span></p>
            <Input onChange={handleFormChange} type='text' name='last' />

        </label>  
        <label className='flex flex-col gap-4'>
            <p className="text-lg font-semibold mb-2 mt-4" >Email <span className="mx-2 text-red-600">*</span></p>
            <Input onChange={handleFormChange} type='email' name='email' />

        </label>
          
        <label className='flex flex-col gap-4'>
            <p className="text-lg font-semibold mb-2 mt-4" >Phone <span className="mx-2 text-red-600">*</span></p>
            <Input onChange={handleFormChange} type='tel' name='phone' />

        </label>
      

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
        <h3 className="border-b-2 border-purple-700">Additional Charges</h3>
                          </CardHeader>
         <CardContent>
         <label className="border-none p-0 flex flex-row gap-2 justify-start items-center">

<input onChange={(e) => {
       setFormValues((prev) => ({
        ...prev,
        additionalCharges: {
            ...(prev?.additionalCharges ?? {}),
            [e.target.name]: e.target.checked ? true : false
        }
    }) as FormValues);
}}  className="" type="checkbox"  name="collision"  />
<p className="justify-self-start flex self-start">Collision Damage Waiver</p>
<p>$9.00</p>
</label>
<label className="border-none p-0 flex flex-row gap-2 justify-start items-center">

<input onChange={(e) => {
       setFormValues((prev) => ({
        ...prev,
        additionalCharges: {
            ...(prev?.additionalCharges ?? {}),
            [e.target.name]: e.target.checked ? true : false
        }
    }) as FormValues);
}}  className="" type="checkbox"  name="liability"/>
<p className="justify-self-start flex self-start">Liability Insurance</p>
<p>$15.00</p>
</label>
<label className="border-none p-0 flex flex-row justify-start items-center gap-4">

<input onChange={(e) => {
       setFormValues((prev) => ({
        ...prev,
        additionalCharges: {
            ...(prev?.additionalCharges ?? {}),
            [e.target.name]: e.target.checked ? true : false
        }
    }) as FormValues);
}}   className="" type="checkbox"  name="rental"  />
<p className="justify-self-start flex self-start">Rental Tax</p>
<p>11.5%</p>
</label>
         </CardContent>
                  

      </Card>
</div>
</div>
<div className='flex flex-col flex-1'>
 

<Card ref={componentRef} className='flex flex-col '>
    <CardHeader>
    <h3 className="border-b-2 border-purple-700"> Charges Summery</h3>

    </CardHeader>
    <CardContent>
        <TableDemo  allCharges={allCharges as AllCharges} />
    </CardContent>
</Card>
    
      
    
  
    
      
     
  
</div>

    
</form>


</div>
  )
}

export default MainForm
