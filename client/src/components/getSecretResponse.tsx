'use client'
import { getSecret } from "@/services/apiHandler/api/templateHandler"
import ResponseBox from "./core/responseBox"

export default function GetSecretResponse() {
  return (
    <ResponseBox text={"Get the server to return a secret"} buttonLabel={"Get Secret"} buttonOnClick={() => getSecret()} />
  )
}