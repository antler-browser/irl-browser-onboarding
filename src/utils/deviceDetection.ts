/**
 * Device detection utilities
 */

/**
 * Check if running in an IRL Browser
 */
export function isIRLBrowser(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return !!(window as any).irlBrowser
}

/**
 * Get the device platform
 */
export function getPlatform(): 'ios' | 'android' | 'browser' {
  return 'browser'
}
