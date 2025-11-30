/**
 * Get initials from a name string
 * Handles various edge cases including empty strings, special characters, and multiple names
 * @param name - The name to extract initials from
 * @returns The initials (max 2 characters) or a default fallback
 */
export function getInitials(name: string | null | undefined): string {
  // Handle null, undefined, or empty string
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return 'U'
  }

  // Remove special characters and extra spaces
  const cleanedName = name
    .trim()
    .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphabetic characters except spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space

  // If nothing left after cleaning, return default
  if (cleanedName === '') {
    return 'U'
  }

  // Split by spaces to get individual words
  const words = cleanedName.split(' ').filter((word) => word.length > 0)

  // If no valid words, return default
  if (words.length === 0) {
    return 'U'
  }

  // If single word, return first two characters
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }

  // If multiple words, return first character of first and last word
  const firstInitial = words[0][0]
  const lastInitial = words[words.length - 1][0]

  return (firstInitial + lastInitial).toUpperCase()
}
