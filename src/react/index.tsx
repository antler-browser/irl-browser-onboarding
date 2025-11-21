/**
 * IRL Browser Onboarding - React Bindings
 */

// Export all types
export * from '../types'

// Export React components
export { IrlOnboarding } from './components/IrlOnboarding'
export { DownloadPrompt } from './components/DownloadPrompt'
export { CreateAccountFlow } from './components/CreateAccountFlow'
export { NameStep } from './components/NameStep'
export { SocialsStep } from './components/SocialsStep'
export { AvatarStep } from './components/AvatarStep'

// Export React hooks
export { useIrlOnboarding } from './hooks/useIrlOnboarding'
export { useProfile } from './hooks/useProfile'

// Re-export core utilities for convenience
export {
  createProfile,
  getCurrentProfile,
  updateProfile
} from '../core/profile'

export {
  hasProfile,
  clearProfile
} from '../core/storage'

export {
  isIRLBrowser,
  getPlatform
} from '../utils/deviceDetection'

export {
  getPlatformDisplayName,
  getPlatformPlaceholder,
  normalizeHandle,
  validateHandle,
  getFullURL,
  createSocialLink
} from '../utils/validation'

export {
  injectIRLBrowserAPI,
  removeIRLBrowserAPI,
  hasIRLBrowserAPI
} from '../core/api'
