/**
 * Download Prompt Component
 * Shows download buttons for iOS and Android
 * Based on meetup-self-hosted/client implementation
 */

import React from 'react'
import type { DownloadPromptProps } from '../../types'
import { DownloadBadges } from './DownloadBadges'
import { usePressState } from '../hooks/usePressState'

export function DownloadPrompt({
  title = 'Scan with Antler!',
  description,
  customStyles = {}
}: DownloadPromptProps) {
  const { pressedElement, handlePressStart, handlePressEnd } = usePressState()

  const {
    primaryColor = '#403B51',
    backgroundColor = '#ffffff',
    textColor = '#403B51',
    fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mobileButtonPressScale = 0.95,
    mobileTapHighlightColor = 'transparent',
    useSafeAreaInsets = true
  } = customStyles

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: useSafeAreaInsets
        ? 'calc(48px + env(safe-area-inset-top)) calc(16px + env(safe-area-inset-right)) calc(48px + env(safe-area-inset-bottom)) calc(16px + env(safe-area-inset-left))'
        : '48px 16px',
      backgroundColor,
      fontFamily,
      color: textColor,
      minHeight: '100vh'
    },
    content: {
      textAlign: 'center' as const,
      maxWidth: '600px',
      width: '100%'
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '32px'
    },
    icon: {
      width: '150px',
      height: 'auto',
      borderRadius: '24px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: primaryColor,
      marginBottom: description ? '16px' : '32px',
      lineHeight: 1.2
    },
    description: {
      fontSize: '16px',
      color: textColor,
      opacity: 0.8,
      marginBottom: '32px',
      lineHeight: 1.5
    },
    buttonsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      justifyContent: 'center',
      gap: '16px',
      marginTop: '32px'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Antler Icon */}
        <div style={styles.iconContainer}>
          <img
            src="https://ax0.taddy.org/antler/antler-icon.webp"
            alt="Antler"
            style={styles.icon}
          />
        </div>

        {/* Title */}
        <h2 style={styles.title}>{title}</h2>

        {/* Description (optional) */}
        {description && <p style={styles.description}>{description}</p>}

        {/* Download Buttons */}
        <div style={styles.buttonsContainer}>
          <DownloadBadges
            pressedElement={pressedElement}
            onPressStart={handlePressStart}
            onPressEnd={handlePressEnd}
            customStyles={{ mobileButtonPressScale, mobileTapHighlightColor }}
          />
        </div>
      </div>
    </div>
  )
}
