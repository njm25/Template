'use client'
import { getSecret } from "@/services/apiHandler/api/aboutHandler"
import ResponseBox from "../core/responseBox"

export default function GetSecretResponse() {
  return (
    <ResponseBox text={"Get the server to return a secret from memory"} buttonLabel={"Get Secret"} buttonOnClick={() => getSecret()} />
  )
}