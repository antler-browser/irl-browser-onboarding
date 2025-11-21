/**
 * Image processing utilities for avatar upload
 * Browser-based image resize and compression using Canvas API
 */

/**
 * Resize and compress an image file to 512x512 JPEG
 * @param file - Image file from file input
 * @param quality - JPEG quality (0-1), default 0.7
 * @returns Base64-encoded data URL
 */
export async function processImageFile(
  file: File,
  quality: number = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'))
      return
    }

    // Create FileReader to read the image
    const reader = new FileReader()

    reader.onload = (event) => {
      if (!event.target?.result) {
        reject(new Error('Failed to read file'))
        return
      }

      // Create an image element
      const img = new Image()

      img.onload = () => {
        try {
          const processedImage = resizeAndCompressImage(img, 512, 512, quality)
          resolve(processedImage)
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }

      img.src = event.target.result as string
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsDataURL(file)
  })
}

/**
 * Resize and compress an Image element to target dimensions
 * @param img - Image element
 * @param targetWidth - Target width in pixels
 * @param targetHeight - Target height in pixels
 * @param quality - JPEG quality (0-1)
 * @returns Base64-encoded data URL
 */
export function resizeAndCompressImage(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  quality: number = 0.7
): string {
  // Create canvas
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Failed to get canvas context')
  }

  // Set canvas size
  canvas.width = targetWidth
  canvas.height = targetHeight

  // Calculate scaling to cover the canvas (similar to object-fit: cover)
  const imgAspect = img.width / img.height
  const canvasAspect = targetWidth / targetHeight

  let sourceX = 0
  let sourceY = 0
  let sourceWidth = img.width
  let sourceHeight = img.height

  if (imgAspect > canvasAspect) {
    // Image is wider - crop sides
    sourceWidth = img.height * canvasAspect
    sourceX = (img.width - sourceWidth) / 2
  } else {
    // Image is taller - crop top/bottom
    sourceHeight = img.width / canvasAspect
    sourceY = (img.height - sourceHeight) / 2
  }

  // Draw image on canvas (cropped and scaled)
  ctx.drawImage(
    img,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    targetWidth,
    targetHeight
  )

  // Convert to JPEG with specified quality
  return canvas.toDataURL('image/jpeg', quality)
}

/**
 * Validate image file size
 * @param file - Image file
 * @param maxSizeInMB - Maximum allowed size in MB
 * @returns true if valid, false otherwise
 */
export function validateImageSize(file: File, maxSizeInMB: number = 10): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}

/**
 * Validate image file type
 * @param file - Image file
 * @returns true if valid image type, false otherwise
 */
export function validateImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  return validTypes.includes(file.type)
}

/**
 * Get estimated size of base64 string in MB
 * @param base64String - Base64-encoded data URL
 * @returns Size in MB
 */
export function getBase64Size(base64String: string): number {
  // Remove data URL prefix if present
  const base64Data = base64String.split(',')[1] || base64String

  // Calculate size: base64 is roughly 4/3 the size of original
  const sizeInBytes = (base64Data.length * 3) / 4
  return sizeInBytes / (1024 * 1024)
}
