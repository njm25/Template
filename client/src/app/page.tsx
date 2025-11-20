import LoremIpsum from "@/components/loremIpsum";
import GetErrorResponse from "@/components/getErrorResponse";
import GetSecretResponse from "@/components/getSecretResponse";
export default function Home() {
  return (
    <div>
      <h1>This is a template for a full-stack application</h1>
      <LoremIpsum />
      <GetErrorResponse />
      <GetSecretResponse />
    </div>
  );
}
