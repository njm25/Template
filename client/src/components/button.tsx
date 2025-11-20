'use client'

interface ButtonProps {
  message?: string
  onClick: () => Promise<void>
}   

const Button = ({ message = 'Button', onClick }: ButtonProps) => {
  return (
    <button onClick={() => onClick()}>{message}</button>
  );
}

export default Button