/**
 * Get an icon emoji or character based on the workflow/agent type and name
 */
export function getIconForType(type: 'workflow' | 'agent', name: string): string {
  // Extract emoji from name if present
  const emojiMatch = name.match(/^[\u{1F300}-\u{1F9FF}]/u);
  if (emojiMatch) {
    return emojiMatch[0];
  }

  // Default icons based on type
  if (type === 'agent') {
    return '🧠';
  }
  return '⚙️';
}

