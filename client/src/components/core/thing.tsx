'use client'

export interface ThingProps {
    thing: any;
}

export default function Thing({ thing }: ThingProps) {
  return (
<div className="mt-10 w-full background-secondary rounded-md p-10 lg:p-20 md:p-15 sm:p-10">
    <div className="flex flex-col gap-4">
        <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
                Name
            </p>
            <p className="text-lg font-medium text-white break-words">
                {thing.name}
            </p>
        </div>

        <div className="h-px w-full bg-gray-600 opacity-50" />

        <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
                Description
            </p>
            <p className="text-base leading-relaxed text-gray-200 break-words">
                {thing.description}
            </p>
        </div>
    </div>
</div>

  )
}