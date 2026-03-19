/**
 * Extract YouTube video ID from various URL formats
 * Supports: https://www.youtube.com/watch?v=abc123
 *           https://youtu.be/abc123
 *           https://m.youtube.com/watch?v=abc123
 */
export function extractVideoId(url: string): string | null {
  if (!url) return null

  // Handle youtu.be short links
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return shortMatch[1]

  // Handle youtube.com and m.youtube.com
  const longMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/)
  if (longMatch) return longMatch[1]

  // Handle just the video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url

  return null
}

/**
 * Validate if a string is a valid YouTube video ID
 */
export function isValidVideoId(videoId: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId)
}
