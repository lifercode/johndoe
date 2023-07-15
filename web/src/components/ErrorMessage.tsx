interface ErrorMessageProps {
  text: string
}

export default function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <div className="mt-5 rounded border-s-4 border-red-400 bg-red-50 p-4">
      <strong className="block font-normal text-red-500">
        {text}
      </strong>
    </div>
  )
}
