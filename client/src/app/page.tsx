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
    <div>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Welcome to my page about things!!
        </h1>
        <p className="text-sm sm:text-base text-gray-300">
          Here’s a random thing:
        </p>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="background-secondary rounded-md p-6 sm:p-8 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-white/40 animate-pulse" />
              <p className="text-gray-300">Loading...</p>
            </div>
          </div>
        ) : (
          <Thing thing={thing} />
        )}
      </div>
    </div>
  );
}
