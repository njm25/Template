import GetErrorResponse from "@/components/responseBoxes/getErrorResponse";
import GetSecretResponse from "@/components/responseBoxes/getSecretResponse";
import GetThingsResponse from "@/components/responseBoxes/getThingResponse";
export default function About() {
  return (
    <div >
        <p>This website is a template for a full-stack application</p>
        <GetErrorResponse />
        <GetSecretResponse />
        <GetThingsResponse />
    </div>
  )
}