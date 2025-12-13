'use client'
import { createThing, getRecent20Things } from "@/services/apiHandler/api/thingHandler"; 
import Thing from "@/components/core/thing";
import { useEffect, useState } from "react";
import CreateThingModal from "@/app/things/createThingModal";

export default function Things() {
	const [things, setThings] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [showCreateThingModal, setShowCreateThingModal] = useState<boolean>(false);

	useEffect(() => {
		const fetchThings = async () => {
			setLoading(true);
			const response = await getRecent20Things();
			setThings(response);
			setLoading(false);
		}
		fetchThings();
	}, []);

	const handleSubmit = async (name: string, description: string) => {
		const response = await createThing(name, description);
		setThings([response, ...things]);
		setShowCreateThingModal(false);
	}

	return (
		<div className="py-6">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-1">
					<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
						Things
					</h1>
					<p className="text-sm sm:text-base text-gray-300">
						Most recent 20 things.
					</p>
				</div>

				<div className="flex items-center gap-3">
					<button onClick={() => setShowCreateThingModal(true)}>
						Create Thing
					</button>
				</div>
			</div>

			{showCreateThingModal && (
				<CreateThingModal
					onClose={() => setShowCreateThingModal(false)}
					onSubmit={(name: string, description: string) => handleSubmit(name, description)}
				/>
			)}

			<div className="mt-6">
				{loading ? (
					<div className="background-secondary rounded-md p-6 sm:p-8 border border-white/10">
						<div className="flex items-center gap-3">
							<div className="h-2.5 w-2.5 rounded-full bg-white/40 animate-pulse" />
							<p className="text-gray-300">Loading...</p>
						</div>
					</div>
				) : (
					things.length === 0 ? (
						<div className="background-secondary rounded-md p-6 sm:p-8 border border-white/10">
							<p className="text-gray-300">
								No things yet. Create the first one.
							</p>
						</div>
					) : (
						<div className="flex flex-col gap-6">
							{things.map((thing: any) => (
								<Thing key={thing.id} thing={thing} />
							))}
						</div>
					)
				)}
			</div>
		</div>
	)
}
