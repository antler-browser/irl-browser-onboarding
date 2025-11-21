/**
 * React hook for IRL Browser onboarding
 */

import { useState, useEffect } from 'react'
import { getCurrentProfile } from '../../core/profile'
import { hasProfile } from '../../core/storage'
import { hasIRLBrowserAPI } from '../../core/api'
import { isIRLBrowser } from '../../utils/deviceDetection'
import type { Profile } from '../../types'

export interface UseIrlOnboardingReturn {
  /**
   * Whether to show onboarding (no API available)
   */
  shouldShowOnboarding: boolean

  /**
   * Current profile (if exists)
   */
  profile: Profile | null

  /**
   * Loading state
   */
  isLoading: boolean
}

/**
 * Hook to check onboarding status and current profile
 */
export function useIrlOnboarding(): UseIrlOnboardingReturn {
  const [state, setState] = useState<UseIrlOnboardingReturn>({
    shouldShowOnboarding: true,
    profile: null,
    isLoading: true
  })

  useEffect(() => {
    // Check if running in browser
    if (typeof window === 'undefined') {
      setState({
        shouldShowOnboarding: false,
        profile: null,
        isLoading: false
      })
      return
    }

    let isMounted = true

    // Check IRL Browser status
    const checkStatus = () => {
      if (!isMounted) return

      const isNative = isIRLBrowser()
      const hasWeb = hasProfile() && hasIRLBrowserAPI()
      const profile = getCurrentProfile()

      setState({
        shouldShowOnboarding: !isNative && !hasWeb,
        profile,
        isLoading: false
      })
    }

    // Initial check
    checkStatus()

    // If API doesn't exist yet, set up property detector to trigger when it's injected
    if (!('irlBrowser' in window)) {
      let value: any = undefined

      Object.defineProperty(window, 'irlBrowser', {
        get() {
          return value
        },
        set(newValue) {
          value = newValue
          checkStatus() // Re-check when API is injected
        },
        configurable: true,
        enumerable: true
      })
    }

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
