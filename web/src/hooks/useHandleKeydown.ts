import { useEffect } from "react"

export default function useHandleKeydown() {
  const handleKeydown = (e: KeyboardEvent) => {
    e.key === 'Enter' && e.preventDefault()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  })

  return null
}