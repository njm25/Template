'use client'
import { getRandomThing } from "@/services/apiHandler/api/thingHandler"
import ResponseBox from "../core/responseBox"
import { toast } from "react-toastify";

const getRandomThingResponse = async () => {
  const response = await getRandomThing(); 
  toast.success(response.name);
  return response.name;
}

export default function GetThingsResponse() {
  return (
    <ResponseBox text={"Get the server to return a thing from the database"} buttonLabel={"Get Thing"} buttonOnClick={() => getRandomThingResponse()} />
  )
}