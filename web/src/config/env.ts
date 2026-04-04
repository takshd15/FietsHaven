/** WhatsApp business number for wa.me (digits only, no +). Override with VITE_WHATSAPP_PHONE in production. */
const DEFAULT_WHATSAPP_PHONE = "31631381465";

function normalizeDigits(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

export function getWhatsAppPhone(): string {
  const raw = import.meta.env.VITE_WHATSAPP_PHONE as string | undefined;
  if (raw != null && raw !== "") {
    const parsed = normalizeDigits(raw);
    if (parsed) return parsed;
  }
  return DEFAULT_WHATSAPP_PHONE;
}
