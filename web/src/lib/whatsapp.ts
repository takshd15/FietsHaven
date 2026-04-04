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
      ? `Hi, I'd like to order: ${line}. Please confirm availability.`
      : `Hi, I'd like to order the ${title} (${price}).`;
  }

  return `Hi, I'm interested in buying ${line}. Is it available? I'd like to place an order.`;
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
    return "Hi, I'd like to place an order on Fiets Haven.";
  }
  const body = lines
    .map((l) => {
      const q = l.quantity > 1 ? ` × ${l.quantity}` : "";
      return `• ${l.title} (${l.price})${q}`;
    })
    .join("\n");
  return `Hi, I'd like to order the following from Fiets Haven:\n\n${body}\n\nPlease confirm availability and next steps.`;
}
