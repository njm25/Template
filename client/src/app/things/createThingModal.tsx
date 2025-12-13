'use client'
import { useState } from "react";

export default function CreateThingModal({
	onSubmit,
	onClose,
}: {
	onSubmit: (name: string, description: string) => void;
	onClose: () => void;
}) {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const handleSubmit = async () => {
		onSubmit(name, description);
	};

	return (
		<div className="modal-container">
			<div className="modal-content">
				<h1 className="text-lg font-semibold tracking-tight text-white mb-4">
					Create Thing
				</h1>

				<form className="flex flex-col gap-6">
					<div className="flex flex-col gap-3">
						<input
							maxLength={25}
							className="w-full rounded-md bg-[#1f1f1f] border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white/30"
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<input
							maxLength={255}
							className="w-full rounded-md bg-[#1f1f1f] border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white/30"
							type="text"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="bg-transparent border border-white/20 hover:bg-white/5"
						>
							Close
						</button>

						<button
							type="submit"
							onClick={(e) => {
								e.preventDefault();
								handleSubmit();
							}}
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
