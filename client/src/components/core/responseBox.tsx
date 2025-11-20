'use client'
import Button from "./button"
interface ResponseBoxProps {
  text: string
  buttonLabel: string
  buttonOnClick: () => void
}

export default function ResponseBox({ text, buttonLabel, buttonOnClick }: ResponseBoxProps  ) {
  return (  
    <div className="flex flex-col items-center justify-center">
      <p className="text-center">{text}</p>
      <Button message={buttonLabel} onClick={async () => await buttonOnClick()} />
    </div>
  )
}