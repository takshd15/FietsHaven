import { getWhatsAppPhone } from "../config/env.ts";

const ACCESSORY_SLUGS = new Set(["smart-key-remote", "ride-essentials"]);

export function isAccessoryProduct(slug: string): boolean {
  return ACCESSORY_SLUGS.has(slug);
}

export function buildProductOrderMessage(
  title: string,
  price: string,
  quantity: number,
  slug: string,
): string {
  const qty = Math.max(1, quantity);
  const line = qty > 1 ? `${title} (${price}) × ${qty}` : `${title} (${price})`;

  if (isAccessoryProduct(slug)) {
    return qty > 1
      ? `Hoi, ik wil graag bestellen: ${line}. Kun je bevestigen of het beschikbaar is?`
      : `Hoi, ik wil graag de ${title} (${price}) bestellen.`;
  }

  return `Hoi, ik heb interesse in ${line}. Is het beschikbaar? Ik wil graag bestellen.`;
}

export function buildWhatsAppUrl(encodedMessage: string): string {
  return `https://wa.me/${getWhatsAppPhone()}?text=${encodedMessage}`;
}

export function openWhatsAppOrder(message: string): void {
  const url = buildWhatsAppUrl(encodeURIComponent(message));
  window.open(url, "_blank", "noopener,noreferrer");
}

export type CartLineBrief = {
  title: string;
  price: string;
  quantity: number;
};

export function buildCartOrderMessage(lines: CartLineBrief[]): string {
  if (lines.length === 0) {
    return "Hoi, ik wil graag een bestelling plaatsen bij FietsHaven.";
  }
  const body = lines
    .map((l) => {
      const q = l.quantity > 1 ? ` × ${l.quantity}` : "";
      return `• ${l.title} (${l.price})${q}`;
    })
    .join("\n");
  return `Hoi, ik wil het volgende bestellen bij FietsHaven:\n\n${body}\n\nKun je beschikbaarheid en de vervolgstappen bevestigen?`;
}
