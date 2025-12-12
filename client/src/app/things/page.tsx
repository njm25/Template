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
        <div >
            <button onClick={() => setShowCreateThingModal(true)}>Create Thing</button>
            {showCreateThingModal && <CreateThingModal onClose={() => setShowCreateThingModal(false)} onSubmit={(name: string, description: string) => handleSubmit(name, description)} />}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {things.map((thing: any) => (
                        <Thing key={thing.id} thing={thing} />
                    ))}
                </div>
            )}
        </div>
    )
}