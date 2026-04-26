export function generateWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

// Alias for consistency with different naming conventions
export const createWhatsAppLink = generateWhatsAppLink;

export function openWhatsApp(phoneNumber: string, message: string): void {
  const link = generateWhatsAppLink(phoneNumber, message);
  window.open(link, "_blank", "noopener,noreferrer");
}
