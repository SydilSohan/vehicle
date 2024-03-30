'use client'
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const SubmitButton = ({text} : {text : any}) => {
    const {pending, method} = useFormStatus()
    return <Button disabled={pending}  type="submit"> {pending &&  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> } {text}</Button>;
}
export default SubmitButton;