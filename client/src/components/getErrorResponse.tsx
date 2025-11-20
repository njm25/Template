'use client'
import { getError } from "@/services/apiHandler/api/templateHandler"
import ResponseBox from "./core/responseBox"

export default function GetErrorResponse() {
 
  return (
    <ResponseBox text={"Get the server to return an error"} buttonLabel={"Get Error"} buttonOnClick={() => getError()} />
  )
}