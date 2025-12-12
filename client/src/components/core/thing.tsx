'use client'

export interface ThingProps {
    thing: any;
}

export default function Thing({ thing }: ThingProps) {
  return (
    <div className="flex flex-col items-start justify-start background-secondary rounded-md mt-10 lg:p-20 md:p-15 sm:p-10 p-10">
        <div>
            <p>Name: {thing.name}</p>
            <p>Description: {thing.description}</p>
        </div>
    </div>
  )
}