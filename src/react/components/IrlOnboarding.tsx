/**
 * IRL Onboarding Component
 * Main wrapper component that handles different modes
 */

import React, { useState } from 'react'
import type { IrlOnboardingProps } from '../../types'
import { DownloadPrompt } from './DownloadPrompt'
import { CreateAccountFlow } from './CreateAccountFlow'
import { DownloadBadges } from './DownloadBadges'
import { usePressState } from '../hooks/usePressState'

export function IrlOnboarding({
  mode = 'choice',
  skipSocialStep = false,
  skipAvatarStep = false,
  customStyles = {},
  onComplete,
  children
}: IrlOnboardingProps) {
  const [selectedMode, setSelectedMode] = useState<'download' | 'create' | null>(
    mode === 'choice' ? null : 'download'
  )

  const { pressedElement, handlePressStart, handlePressEnd } = usePressState()

  const {
    primaryColor = '#403B51',
    backgroundColor = '#ffffff',
    textColor = '#403B51',
    borderRadius = '12px',
    fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mobileButtonPressScale = 0.95,
    mobileTapHighlightColor = 'transparent',
    useSafeAreaInsets = true
  } = customStyles

  // If mode is choice, show selection screen
  if (mode === 'choice' && !selectedMode) {
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        padding: useSafeAreaInsets
          ? 'calc(48px + env(safe-area-inset-top)) calc(20px + env(safe-area-inset-right)) calc(48px + env(safe-area-inset-bottom)) calc(20px + env(safe-area-inset-left))'
          : '48px 20px',
        backgroundColor,
        fontFamily,
        color: textColor,
        minHeight: '100vh'
      },
      content: {
        textAlign: 'center' as const,
        maxWidth: '500px',
        width: '100%'
      },
      iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '32px'
      },
      icon: {
        width: '120px',
        height: 'auto',
        borderRadius: '24px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
      },
      title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: primaryColor,
        marginBottom: '16px',
        lineHeight: 1.2
      },
      subtitle: {
        fontSize: '18px',
        marginBottom: '30px',
        lineHeight: 1.5
      },
      buttonsContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px'
      },
      buttonPrimary: {
        width: '100%',
        padding: '16px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: primaryColor,
        border: 'none',
        borderRadius: borderRadius,
        cursor: 'pointer',
        transition: 'transform 0.1s ease, opacity 0.2s',
        fontFamily,
        WebkitTapHighlightColor: mobileTapHighlightColor
      },
      buttonSecondary: {
        width: '100%',
        padding: '16px',
        fontSize: '16px',
        fontWeight: '600',
        color: textColor,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        border: 'none',
        borderRadius: borderRadius,
        cursor: 'pointer',
        transition: 'transform 0.1s ease, opacity 0.2s',
        fontFamily,
        WebkitTapHighlightColor: mobileTapHighlightColor
      },
      divider: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        margin: '24px 0',
        opacity: 0.3
      },
      dividerLine: {
        flex: 1,
        height: '1px',
        backgroundColor: textColor
      },
      dividerText: {
        fontSize: '14px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px'
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.iconContainer}>
            <img
              src="https://ax0.taddy.org/antler/antler-icon.webp"
              alt="Antler"
              style={styles.icon}
            />
          </div>

          {/* <h1 style={styles.title}>Sign Up to Get Started</h1> */}
          <p style={styles.subtitle}>Sign in instantly using the Antler app</p>

          <div style={styles.buttonsContainer}>
            {/* App Store Download Badges */}
            <DownloadBadges
              pressedElement={pressedElement}
              onPressStart={handlePressStart}
              onPressEnd={handlePressEnd}
              customStyles={{ mobileButtonPressScale, mobileTapHighlightColor }}
            />

            <div style={styles.divider}>
              <div style={styles.dividerLine} />
              <div style={styles.dividerText}>or</div>
              <div style={styles.dividerLine} />
            </div>

            <button
              onClick={() => setSelectedMode('create')}
              style={{
                ...styles.buttonSecondary,
                transform: pressedElement === 'create-button' ? `scale(${mobileButtonPressScale})` : 'scale(1)',
                opacity: pressedElement === 'create-button' ? 0.9 : 1
              }}
              onTouchStart={() => handlePressStart('create-button')}
              onTouchEnd={handlePressEnd}
              onTouchCancel={handlePressEnd}
              onMouseEnter={(e) => {
                if (!pressedElement) {
                  ;(e.currentTarget as HTMLElement).style.opacity = '0.9'
                }
              }}
              onMouseLeave={(e) => {
                if (!pressedElement) {
                  ;(e.currentTarget as HTMLElement).style.opacity = '1'
                  ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                }
              }}
            >
              Create Temporary Account
            </button>
          </div>
        </div>
      </div>
    )
  }

  // If mode is download-prompt, show download prompt directly
  if (mode === 'download-prompt') {
    return <DownloadPrompt customStyles={customStyles} />
  }

  // Render create account mode
  if (selectedMode === 'create') {
    const handleBackToChoice = () => {
      setSelectedMode(null)
    }

    return (
      <CreateAccountFlow
        skipSocialStep={skipSocialStep}
        skipAvatarStep={skipAvatarStep}
        onComplete={onComplete}
        onBack={mode === 'choice' ? handleBackToChoice : undefined}
        customStyles={customStyles}
      />
    )
  }

  // Render children if provided (for custom layouts)
  return <>{children}</>
}
