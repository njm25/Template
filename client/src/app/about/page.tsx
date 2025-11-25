import GetErrorResponse from "@/components/getErrorResponse";
import GetSecretResponse from "@/components/getSecretResponse";
export default function About() {
  return (
    <div >
        <p>This website is a template for a full-stack application</p>
        <GetErrorResponse />
        <GetSecretResponse />
    </div>
  )
}