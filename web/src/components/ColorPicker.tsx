import { useEffect, useRef, useState } from 'react'
import { ColorResult, GithubPicker } from 'react-color'

const colorMap = {
  '#ff0000': 'Vermelho',
  '#ff7f00': 'Laranja',
  '#ffff00': 'Amarelo',
  '#00ff00': 'Verde',
  '#00ffff': 'Azul claro',
  '#0000ff': 'Azul',
  '#8b00ff': 'Roxo',
}

const colors = Object.keys(colorMap)

type Color = keyof typeof colorMap

interface ColorPickerProps {
  name: string
  value: Color | string
  disabled: boolean
  onChange: (value: string) => void
}

function ColorPicker({ name, value, disabled, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false)

  const myRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (!myRef.current?.contains(e.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })


  function handleClick() {
    setOpen(true)
  }

  function handleChange(color: ColorResult) {
    onChange(color.hex)
    setOpen(false)
  }

  return (
    <div ref={myRef} className="relative">
      <input
        name={name}
        value={value || ''}
        readOnly
        hidden
      />
      <button
        type="button"
        disabled={disabled}
        onClick={handleClick}
        onFocus={handleClick}
        className="flex w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {value && (
          <div
            className="w-6 h-6 mr-2 border-2 border-neutral-300 rounded-full"
            style={{ backgroundColor: value }}
          />
        )}
        <span className={value ? '' : 'opacity-40'}>
          {value ? (colorMap[value as Color]) : 'Selecione uma cor'}
        </span>
      </button>
      {open && (
        <div className="absolute top-10 left-1.5">
          <GithubPicker
            width='188px'
            color={value}
            onChangeComplete={handleChange}
            colors={colors}
          />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
