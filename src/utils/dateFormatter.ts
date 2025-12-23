/**
 * Format a Unix timestamp to a human-readable relative time string
 * Examples: "Today", "Yesterday", "2 Days Ago", "This Week"
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp * 1000; // Convert to milliseconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return 'Today';
  } else if (days === 1) {
    return 'Yesterday';
  } else if (days === 2) {
    return '2 Days Ago';
  } else if (days < 7) {
    return `${days} Days Ago`;
  } else if (days < 14) {
    return 'This Week';
  } else {
    return `${Math.floor(days / 7)} Weeks Ago`;
  }
}

