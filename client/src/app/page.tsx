'use client'
import Thing from "@/components/core/thing";
import { getRandomThing } from "@/services/apiHandler/api/thingHandler";
import { useEffect, useState } from "react";
export default function Home() {
  const [thing, setThing] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchThing = async () => {
      setLoading(true);
      const response = await getRandomThing();
      setThing(response);
      setLoading(false);
    }
    fetchThing();
  }, []);

  return (
    <div className="mt-30">
      <p>
        Welcome to my page about things!!
      </p>
      <p>
        Heres a random thing:
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Thing thing={thing} />
      )}
    </div>
  );
}
