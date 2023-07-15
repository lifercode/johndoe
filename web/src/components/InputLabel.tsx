interface InputLabelProps {
  text: string
  required: boolean
}

export default function InputLabel({ text, required }: InputLabelProps) {
  return (
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {text}
      {required && (
        <span className="ml-1 text-neutral-400">*</span>
      )}
    </label>
  )
}