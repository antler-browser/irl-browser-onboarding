/**
 * Social link validation utilities
 * Platform-specific validation patterns
 */

import type { SocialPlatform, SocialLink } from '../types'

/**
 * Get platform display name
 */
export function getPlatformDisplayName(platform: SocialPlatform): string {
  const names: Record<SocialPlatform, string> = {
    INSTAGRAM: 'Instagram',
    X: 'X (Twitter)',
    BLUESKY: 'Bluesky',
    LINKEDIN: 'LinkedIn',
    YOUTUBE: 'YouTube',
    SPOTIFY: 'Spotify',
    TIKTOK: 'TikTok',
    SNAPCHAT: 'Snapchat',
    GITHUB: 'GitHub',
    FACEBOOK: 'Facebook',
    REDDIT: 'Reddit',
    DISCORD: 'Discord',
    TWITCH: 'Twitch',
    TELEGRAM: 'Telegram',
    PINTEREST: 'Pinterest',
    TUMBLR: 'Tumblr',
    SOUNDCLOUD: 'SoundCloud',
    BANDCAMP: 'Bandcamp',
    PATREON: 'Patreon',
    KO_FI: 'Ko-fi',
    MASTODON: 'Mastodon',
    WEBSITE: 'Website',
    EMAIL: 'Email'
  }
  return names[platform]
}

/**
 * Get placeholder text for platform input
 */
export function getPlatformPlaceholder(platform: SocialPlatform): string {
  const placeholders: Record<SocialPlatform, string> = {
    INSTAGRAM: '@username',
    X: '@username',
    BLUESKY: '@username.bsky.social',
    LINKEDIN: 'username',
    YOUTUBE: '@username or channel URL',
    SPOTIFY: 'artist/user URL or ID',
    TIKTOK: '@username',
    SNAPCHAT: 'username',
    GITHUB: 'username',
    FACEBOOK: 'username',
    REDDIT: 'u/username',
    DISCORD: 'username#0000',
    TWITCH: 'username',
    TELEGRAM: '@username',
    PINTEREST: 'username',
    TUMBLR: 'username',
    SOUNDCLOUD: 'username',
    BANDCAMP: 'username',
    PATREON: 'username',
    KO_FI: 'username',
    MASTODON: '@username@server.com',
    WEBSITE: 'https://example.com',
    EMAIL: 'email@example.com'
  }
  return placeholders[platform]
}

/**
 * Normalize handle - remove @ symbols, URLs, clean up input
 */
export function normalizeHandle(platform: SocialPlatform, input: string): string | null {
  if (!input || !input.trim()) {
    return null
  }

  let normalized = input.trim()

  // Handle URLs - extract username from common URL patterns
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    const urlPatterns: Record<string, RegExp> = {
      INSTAGRAM: /instagram\.com\/([^/?]+)/,
      X: /(?:twitter\.com|x\.com)\/([^/?]+)/,
      BLUESKY: /bsky\.app\/profile\/([^/?]+)/,
      LINKEDIN: /linkedin\.com\/in\/([^/?]+)/,
      GITHUB: /github\.com\/([^/?]+)/,
      FACEBOOK: /facebook\.com\/([^/?]+)/,
      REDDIT: /reddit\.com\/u(?:ser)?\/([^/?]+)/,
      TWITCH: /twitch\.tv\/([^/?]+)/,
      YOUTUBE: /youtube\.com\/@([^/?]+)/,
      TIKTOK: /tiktok\.com\/@([^/?]+)/,
    }

    const pattern = urlPatterns[platform]
    if (pattern) {
      const match = normalized.match(pattern)
      if (match && match[1]) {
        normalized = match[1]
      }
    }
  }

  // Remove @ symbol for platforms that use it
  if (['INSTAGRAM', 'X', 'TIKTOK', 'TELEGRAM'].includes(platform)) {
    normalized = normalized.replace(/^@/, '')
  }

  // Platform-specific normalization
  switch (platform) {
    case 'REDDIT':
      normalized = normalized.replace(/^u\//, '')
      break
    case 'EMAIL':
      normalized = normalized.toLowerCase()
      break
    case 'WEBSITE':
      // Ensure website has protocol
      if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
        normalized = `https://${normalized}`
      }
      break
  }

  return normalized
}

/**
 * Validate handle for specific platform
 */
export function validateHandle(platform: SocialPlatform, handle: string): boolean {
  if (!handle || !handle.trim()) {
    return false
  }

  const validationPatterns: Record<SocialPlatform, RegExp> = {
    INSTAGRAM: /^[a-zA-Z0-9._]{1,30}$/,
    X: /^[a-zA-Z0-9_]{1,15}$/,
    BLUESKY: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    LINKEDIN: /^[a-zA-Z0-9-]{3,100}$/,
    YOUTUBE: /^.{1,100}$/,
    SPOTIFY: /^.{1,100}$/,
    TIKTOK: /^[a-zA-Z0-9._]{1,24}$/,
    SNAPCHAT: /^[a-zA-Z0-9._-]{3,15}$/,
    GITHUB: /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/,
    FACEBOOK: /^.{5,50}$/,
    REDDIT: /^[a-zA-Z0-9_-]{3,20}$/,
    DISCORD: /^.{2,32}#[0-9]{4}$/,
    TWITCH: /^[a-zA-Z0-9_]{4,25}$/,
    TELEGRAM: /^[a-zA-Z0-9_]{5,32}$/,
    PINTEREST: /^[a-zA-Z0-9_]{3,30}$/,
    TUMBLR: /^[a-zA-Z0-9-]{1,32}$/,
    SOUNDCLOUD: /^[a-zA-Z0-9_-]{3,25}$/,
    BANDCAMP: /^[a-zA-Z0-9-]{1,30}$/,
    PATREON: /^[a-zA-Z0-9_]{1,30}$/,
    KO_FI: /^[a-zA-Z0-9_]{1,30}$/,
    MASTODON: /^@?[a-zA-Z0-9_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    WEBSITE: /^https?:\/\/.+\..+$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }

  const pattern = validationPatterns[platform]
  return pattern ? pattern.test(handle) : true
}

/**
 * Get full URL for a social platform
 */
export function getFullURL(platform: SocialPlatform, handle: string): string {
  const urlTemplates: Record<SocialPlatform, string> = {
    INSTAGRAM: `https://instagram.com/${handle}`,
    X: `https://x.com/${handle}`,
    BLUESKY: `https://bsky.app/profile/${handle}`,
    LINKEDIN: `https://linkedin.com/in/${handle}`,
    YOUTUBE: handle.startsWith('http') ? handle : `https://youtube.com/@${handle}`,
    SPOTIFY: handle.startsWith('http') ? handle : `https://open.spotify.com/artist/${handle}`,
    TIKTOK: `https://tiktok.com/@${handle}`,
    SNAPCHAT: `https://snapchat.com/add/${handle}`,
    GITHUB: `https://github.com/${handle}`,
    FACEBOOK: `https://facebook.com/${handle}`,
    REDDIT: `https://reddit.com/u/${handle}`,
    DISCORD: handle, // Discord is just username#0000
    TWITCH: `https://twitch.tv/${handle}`,
    TELEGRAM: `https://t.me/${handle}`,
    PINTEREST: `https://pinterest.com/${handle}`,
    TUMBLR: `https://${handle}.tumblr.com`,
    SOUNDCLOUD: `https://soundcloud.com/${handle}`,
    BANDCAMP: `https://${handle}.bandcamp.com`,
    PATREON: `https://patreon.com/${handle}`,
    KO_FI: `https://ko-fi.com/${handle}`,
    MASTODON: handle, // Mastodon is already full @user@server format
    WEBSITE: handle, // Website is already full URL
    EMAIL: `mailto:${handle}`
  }

  return urlTemplates[platform]
}

/**
 * Create a social link object
 */
export function createSocialLink(platform: SocialPlatform, input: string): SocialLink | null {
  const normalized = normalizeHandle(platform, input)

  if (!normalized || !validateHandle(platform, normalized)) {
    return null
  }

  return {
    platform,
    handle: normalized
  }
}
