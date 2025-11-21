/**
 * Mock IRL Browser API implementation
 * Implements the IRLBrowser interface from the IRL Browser Specification
 */

import type { IRLBrowser, BrowserDetails, JWTPayload } from '../types'
import { getProfile, getPrivateKey } from './storage'
import { createJWT } from './crypto'

/**
 * Implementation of the IRL Browser API
 * This gets injected as window.irlBrowser after profile creation
 */
export class MockIRLBrowser implements IRLBrowser {

  /**
   * Get profile details as a signed JWT
   */
  async getProfileDetails(): Promise<string> {
    const profile = getProfile()
    const privateKey = getPrivateKey()

    if (!profile || !privateKey) {
      throw new Error('No profile found. User must create a profile first.')
    }

    // Create JWT payload
    const now = Math.floor(Date.now() / 1000)
    const payload: JWTPayload = {
      iss: profile.did,
      aud: window.location.origin,
      iat: now,
      exp: now + 120, // 2 minutes expiration
      type: 'irl:profile:details',
      data: {
        did: profile.did,
        name: profile.name,
        socials: profile.socials || []
      }
    }

    // Sign and return JWT
    return createJWT(payload, privateKey)
  }

  /**
   * Get avatar as base64-encoded string in a signed JWT
   */
  async getAvatar(): Promise<string | null> {
    const profile = getProfile()
    const privateKey = getPrivateKey()

    if (!profile || !privateKey) {
      throw new Error('No profile found. User must create a profile first.')
    }

    // Return null if no avatar
    if (!profile.avatar) {
      return null
    }

    // Create JWT payload
    const now = Math.floor(Date.now() / 1000)
    const payload: JWTPayload = {
      iss: profile.did,
      aud: window.location.origin,
      iat: now,
      exp: now + 120, // 2 minutes expiration
      type: 'irl:avatar',
      data: {
        did: profile.did,
        avatar: profile.avatar
      }
    }

    // Sign and return JWT
    return createJWT(payload, privateKey)
  }

  /**
   * Get details about the IRL Browser
   */
  getBrowserDetails(): BrowserDetails {
    return {
      name: 'IRL Browser Onboarding',
      version: '1.0.0',
      platform: 'browser',
      supportedPermissions: ['profile']
    }
  }

  /**
   * Request additional permissions (future use)
   * For v1, only 'profile' permission is supported and auto-granted
   */
  async requestPermission(permission: string): Promise<boolean> {
    // Only profile permission is supported in v1
    if (permission === 'profile') {
      return true
    }

    // For future permissions, show browser confirm dialog
    console.warn(`Permission "${permission}" is not yet supported`)
    return false
  }

  /**
   * Close the WebView (no-op for web version)
   * In a real IRL Browser app, this would close the WebView and return to QR scanner
   */
  close(): void {
    console.log('close() called - no-op in web version')
    // In web version, this is a no-op
    // Developers can override this behavior if needed
  }
}

/**
 * Inject the IRL Browser API into window object
 */
export function injectIRLBrowserAPI(): void {
  if (typeof window === 'undefined') {
    console.warn('Cannot inject IRL Browser API: window is undefined (not in browser)')
    return
  }

  if ((window as any).irlBrowser) {
    console.warn('IRL Browser API already exists on window object')
    return
  }

  // Create and inject the API
  const api = new MockIRLBrowser()
  ;(window as any).irlBrowser = api

  console.log('IRL Browser API injected successfully')
}

/**
 * Remove the IRL Browser API from window object
 */
export function removeIRLBrowserAPI(): void {
  if (typeof window === 'undefined') {
    return
  }

  delete (window as any).irlBrowser
  console.log('IRL Browser API removed')
}

/**
 * Check if IRL Browser API is available
 */
export function hasIRLBrowserAPI(): boolean {
  return typeof window !== 'undefined' && !!(window as any).irlBrowser
}
