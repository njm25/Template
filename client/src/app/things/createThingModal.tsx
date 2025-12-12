'use client'
import { useState } from "react";
export default function CreateThingModal({ onSubmit, onClose }: { onSubmit: (name: string, description: string) => void, onClose: () => void }) {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async () => {
        onSubmit(name, description);
    }

    return (
        <div className="modal-container">
            <div className="modal-content">
            <h1 className="mb-2">Create Thing</h1>
            <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
                <div className="mb-10">
                    <input className="w-full mb-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className="w-full" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}   />
                </div>
                <div className="flex justify-between gap-2 w-full">
                    <button onClick={onClose}>Close</button>
                    <button type="submit">Create</button>
                </div>
            </form>
            </div>
        </div>
    )
}