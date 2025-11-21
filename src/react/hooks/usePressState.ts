/**
 * Hook for managing touch/press state for interactive elements
 * Provides consistent press feedback across components
 */

import { useState } from 'react'

export interface UsePressStateReturn {
  pressedElement: string | null
  handlePressStart: (elementId: string) => void
  handlePressEnd: () => void
}

/**
 * Manages press state for touch and mouse interactions
 * @returns Object containing press state and handlers
 */
export function usePressState(): UsePressStateReturn {
  const [pressedElement, setPressedElement] = useState<string | null>(null)

  const handlePressStart = (elementId: string) => {
    setPressedElement(elementId)
  }

  const handlePressEnd = () => {
    setPressedElement(null)
  }

  return {
    pressedElement,
    handlePressStart,
    handlePressEnd
  }
}
