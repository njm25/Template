'use client'

interface ButtonProps {
  message?: string
  onClick: () => Promise<void>
}   

const Button = ({ message = 'Button', onClick }: ButtonProps) => {
  return (
    <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => onClick()}>{message}</button>
  );
}

export default Button