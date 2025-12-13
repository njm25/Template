import GetErrorResponse from "@/components/responseBoxes/getErrorResponse";
import GetSecretResponse from "@/components/responseBoxes/getSecretResponse";
import GetThingsResponse from "@/components/responseBoxes/getThingResponse";

export default function About() {
	return (
		<div className="py-6">
			<div className="space-y-1">
				<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
					About
				</h1>
				<p className="text-sm sm:text-base text-gray-300">
					This website is a template for a full-stack application.
				</p>
			</div>

			<div className="mt-6 flex flex-col gap-6">
					<GetErrorResponse />
					<GetSecretResponse />
					<GetThingsResponse />
			</div>
		</div>
	);
}
