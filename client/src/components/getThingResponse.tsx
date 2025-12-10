'use client'
import { getThings } from "@/services/apiHandler/api/thingHandler"
import ResponseBox from "./core/responseBox"

export default function GetThingsResponse() {
  return (
    <ResponseBox text={"Get the server to return a thing from the database"} buttonLabel={"Get Thing"} buttonOnClick={() => getThings()} />
  )
}