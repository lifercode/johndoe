type ButonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const classes = {
  button: 'w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
}

export default function Button({
  children,
  className,
  ...props
}: ButonProps) {
  return (
    <button
      {...props}
      className={`${classes.button} ${className}`}
    >
      {children}
    </button>
  )
}
