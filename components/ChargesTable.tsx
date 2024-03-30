import { AllCharges } from "@/lib/types";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";

export function TableDemo({ allCharges }: { allCharges: AllCharges}) {
    return (
        <>
        {allCharges &&
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Charge</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                        {allCharges?.duration?.weeks > 0 && (
                                <TableRow>
                                        <TableCell>Weekly</TableCell>
                                        <TableCell>{allCharges.duration.weeks}</TableCell>
                                        <TableCell>${allCharges.weekly}</TableCell>
                                        <TableCell className="text-right">${allCharges.totalWeekly}</TableCell>
                                </TableRow>
                        )}
                        {allCharges?.duration?.days > 0 && (
                                <TableRow>
                                        <TableCell>Daily</TableCell>
                                        <TableCell>{allCharges.duration.days}</TableCell>
                                        <TableCell>${allCharges.daily}</TableCell>
                                        <TableCell className="text-right">${allCharges.totalDaily}</TableCell>
                                </TableRow>
                        )}
                        {allCharges?.duration?.hours > 0 && (
                                <TableRow>
                                        <TableCell>Hourly</TableCell>
                                        <TableCell>{allCharges.duration.hours}</TableCell>
                                        <TableCell>${allCharges.hourly}</TableCell>
                                        <TableCell className="text-right">${allCharges.totalHourly}</TableCell>
                                </TableRow>
                        )}
                        {allCharges?.rental && allCharges.rental > 0 && (
                                <TableRow>
                                        <TableCell>Rental</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>11.5%</TableCell>
                                        <TableCell className="text-right">${allCharges.rental}</TableCell>
                                </TableRow>
                        )}
                        {allCharges?.liability && allCharges.liability > 0 && (
                                <TableRow>
                                        <TableCell>Liability</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>$15.00</TableCell>
                                        <TableCell className="text-right">${allCharges.liability}</TableCell>
                                </TableRow>
                        )}
                      
                        {allCharges?.discount > 0 && (
                                <TableRow>
                                        <TableCell>Discount</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{allCharges.discount}</TableCell>
                                        <TableCell className="text-right">-${allCharges.discountPercentage}</TableCell>
                                </TableRow>
                        )}
                        {allCharges?.collision && (
                                <TableRow>
                                        <TableCell>Collison</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>$9.00</TableCell>
                                        <TableCell className="text-right">${allCharges.collision}</TableCell>
                                </TableRow>
                        )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">${allCharges.total}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        }
        </>
    )
}
