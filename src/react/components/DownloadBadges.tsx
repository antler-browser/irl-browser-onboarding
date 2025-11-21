/**
 * Download Badges Component
 * Renders App Store and Google Play download badges with interactive feedback
 * Shared component used by IrlOnboarding and DownloadPrompt
 */

import React from 'react'
import type { CustomStyles } from '../../types'

export interface DownloadBadgesProps {
  /** Currently pressed element ID */
  pressedElement: string | null
  /** Handler for press start events */
  onPressStart: (elementId: string) => void
  /** Handler for press end events */
  onPressEnd: () => void
  /** Custom styling configuration */
  customStyles?: Pick<CustomStyles, 'mobileButtonPressScale' | 'mobileTapHighlightColor'>
  /** Gap between badges (default: 16px) */
  gap?: string
  /** Scale transform for Google Play badge (default: 1) */
  googlePlayScale?: number
}

/**
 * Renders download badges for App Store and Google Play with touch interactions
 */
export function DownloadBadges({
  pressedElement,
  onPressStart,
  onPressEnd,
  customStyles = {},
}: DownloadBadgesProps) {
  const {
    mobileButtonPressScale = 0.95,
    mobileTapHighlightColor = 'transparent'
  } = customStyles

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      justifyContent: 'center',
      gap: '32px'
    },
    downloadLink: {
      display: 'inline-block',
      transition: 'transform 0.1s ease',
      cursor: 'pointer',
      WebkitTapHighlightColor: mobileTapHighlightColor
    },
    downloadBadgeAppStore: {
      height: '56px',
      width: 'auto'
    },
    downloadBadgeGooglePlay: {
      height: '56px',
      width: 'auto',
      transform: `scale(1.5)`
    }
  }

  return (
    <div style={styles.container}>
      {/* App Store Badge */}
      <a
        href="https://antlerbrowser.com/ios"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...styles.downloadLink,
          transform: pressedElement === 'appstore' ? `scale(${mobileButtonPressScale})` : 'scale(1)'
        }}
        onTouchStart={() => onPressStart('appstore')}
        onTouchEnd={onPressEnd}
        onTouchCancel={onPressEnd}
        onMouseEnter={(e) => {
          if (!pressedElement) {
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
          }
        }}
        onMouseLeave={(e) => {
          if (!pressedElement) {
            ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
          }
        }}
      >
        <img
          src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us"
          alt="Download on the App Store"
          style={styles.downloadBadgeAppStore}
        />
      </a>

      {/* Google Play Badge */}
      <a
        href="https://antlerbrowser.com/android"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...styles.downloadLink,
          transform: pressedElement === 'googleplay' ? `scale(${mobileButtonPressScale})` : 'scale(1)'
        }}
        onTouchStart={() => onPressStart('googleplay')}
        onTouchEnd={onPressEnd}
        onTouchCancel={onPressEnd}
        onMouseEnter={(e) => {
          if (!pressedElement) {
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
          }
        }}
        onMouseLeave={(e) => {
          if (!pressedElement) {
            ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
          }
        }}
      >
        <img
          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
          alt="Download on Google Play"
          style={styles.downloadBadgeGooglePlay}
        />
      </a>
    </div>
  )
}
