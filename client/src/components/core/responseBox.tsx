'use client'
import Button from "./button"
interface ResponseBoxProps {
  text: string
  buttonLabel: string
  buttonOnClick: () => void
}

export default function ResponseBox({ text, buttonLabel, buttonOnClick }: ResponseBoxProps  ) {
  return (  
    <div className="gradient-background rounded-md p-6 sm:p-8 border border-white/10">
      <div className="flex flex-col items-start justify-start">
        <p>{text}</p>
        <Button message={buttonLabel} onClick={async () => await buttonOnClick()} />
      </div>
    </div>
  )
}