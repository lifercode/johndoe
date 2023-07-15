interface InputErrorMessageProps {
  text: string
}

export default function InputErrorMessage({ text }: InputErrorMessageProps) {
  return (
    <p className="mt-1 text-sm leading-6 text-red-400">
      {text}
    </p>
  )
}
