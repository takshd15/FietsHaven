export type ProductReview = {
  author: string;
  rating: number;
  text: string;
};

export type Product = {
  slug: string;
  title: string;
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  images: string[];
  imageAlt: string;
  reviews: ProductReview[];
  /** Rich text / specs for “More details” accordion */
  moreDetails?: string;
  bestSeller?: boolean;
  /** If set, shows “Only X left in stock” */
  lowStockCount?: number | null;
};

export const products: Product[] = [
  {
    slug: "v20-pro",
    title: "Electric bike, v20 Pro",
    price: "€760,-",
    rating: 4.9,
    reviewCount: 89,
    description:
      "A powerful electric bike with everything included—ideal for commuting and city riding.",
    features: [
      "Phone bag",
      "Alarm",
      "NFC",
      "Rear seat",
      "Front rack",
      "Bike pump",
      "Kickstand",
      "Keys",
    ],
    images: ["/bike.jpeg"],
    imageAlt: "Electric bike v20 Pro",
    reviews: [
      {
        author: "Lisa V.",
        rating: 5,
        text: "Great bike, fully equipped. I ride it every day.",
      },
      {
        author: "Thomas B.",
        rating: 5,
        text: "Excellent value—everything was included as promised.",
      },
      {
        author: "Noor K.",
        rating: 4,
        text: "Solid build, battery lasts a long time.",
      },
    ],
    bestSeller: true,
    lowStockCount: null,
    moreDetails:
      "Delivery includes the accessories listed above. Suited to city and commuter use. For technical specs and maintenance, refer to the manual supplied with your bike.",
  },
  {
    slug: "dubbele-accu",
    title: "Electric bike, Dual Battery",
    price: "€860,-",
    rating: 4.8,
    reviewCount: 64,
    description:
      "Extra range from a dual-battery setup—comfortable and dependable for longer rides.",
    features: [
      "Phone bag",
      "Alarm",
      "NFC",
      "Rear seat",
      "Front rack",
      "Bike pump",
      "Kickstand",
      "Keys",
    ],
    images: ["/key-chain.jpeg"],
    imageAlt: "Electric bike dual battery",
    reviews: [
      {
        author: "Rick J.",
        rating: 5,
        text: "You feel the dual battery right away—no more range anxiety.",
      },
      {
        author: "Sanne D.",
        rating: 5,
        text: "Clean finish and a full set of accessories.",
      },
      {
        author: "Omar H.",
        rating: 4,
        text: "Heavier than a single-battery bike, but the range is worth it.",
      },
    ],
    lowStockCount: 8,
    moreDetails:
      "Dual battery for extended range; all listed accessories included. Charging as per the supplied manual.",
  },
  {
    slug: "e-bike-mini",
    title: "Electric bike, Mini",
    price: "€760,-",
    rating: 4.7,
    reviewCount: 52,
    description:
      "A compact electric bike with the same rich kit—nimble in the city.",
    features: [
      "Phone bag",
      "Alarm",
      "NFC",
      "Rear seat",
      "Front rack",
      "Bike pump",
      "Kickstand",
      "Keys",
    ],
    images: ["/phone-holder.jpeg"],
    imageAlt: "Electric bike Mini",
    reviews: [
      {
        author: "Emma P.",
        rating: 5,
        text: "Handy compact size—fits through tight spots.",
      },
      {
        author: "Finn L.",
        rating: 4,
        text: "Good price for what you get, everything included.",
      },
      {
        author: "Iris M.",
        rating: 5,
        text: "Perfect for short trips and errands.",
      },
    ],
    lowStockCount: null,
    moreDetails:
      "Compact model with the full accessory set listed above. Ideal for city traffic and shorter journeys.",
  },
  {
    slug: "urban-e-bike",
    title: "Fiets Haven Urban E-Bike",
    price: "€1,899",
    rating: 4.8,
    reviewCount: 124,
    description:
      "High-performance electric bike designed for modern urban commuting. Built for speed, comfort, and everyday reliability.",
    features: [
      "Long battery life",
      "Lightweight frame",
      "Smart locking system",
      "Premium suspension",
    ],
    images: ["/bike.jpeg"],
    imageAlt: "Fiets Haven Urban E-Bike",
    reviews: [
      {
        author: "Alex R.",
        rating: 5,
        text: "Absolutely love this bike. Smooth ride, great battery, and looks amazing.",
      },
      {
        author: "Sarah M.",
        rating: 4,
        text: "Perfect for city commuting. Very comfortable and easy to use.",
      },
      {
        author: "Daniel K.",
        rating: 5,
        text: "Best purchase I’ve made this year. Highly recommend.",
      },
    ],
    bestSeller: true,
    lowStockCount: 5,
    moreDetails:
      "Motor: 250W nominal (EU-compliant). Battery: removable 540 Wh lithium-ion, estimated range up to 90 km depending on assist mode and terrain. Frame: hydroformed aluminum. Weight: approx. 22 kg including battery. Brakes: hydraulic disc. Drivetrain: enclosed belt drive. Smart features: GPS-ready module, mobile app pairing for ride stats and anti-theft alerts. Charger included (100–240 V).",
  },
  {
    slug: "smart-key-remote",
    title: "Smart Key Remote",
    price: "€49",
    rating: 4.7,
    reviewCount: 56,
    description:
      "Secure remote for your Fiets Haven e-bike—lock, unlock, and activate essentials with one compact fob.",
    features: [
      "Encrypted wireless pairing",
      "Up to 12 months battery life",
      "Integrated horn & light controls",
      "Durable, weather-resistant housing",
    ],
    images: ["/key-chain.jpeg"],
    imageAlt: "Smart bike key remote",
    lowStockCount: 14,
    moreDetails:
      "Operating frequency: 2.4 GHz encrypted pairing. Battery: CR2032 (user-replaceable). Range: up to 10 m line-of-sight. Weather rating: IP54. Compatible with Fiets Haven Urban E-Bike (2023 and newer firmware).",
    reviews: [
      {
        author: "Jordan P.",
        rating: 5,
        text: "Feels premium and works every time. No more fishing for keys.",
      },
      {
        author: "Elena V.",
        rating: 4,
        text: "Simple setup and the tactile buttons are satisfying to use.",
      },
      {
        author: "Marcus T.",
        rating: 5,
        text: "Must-have with the Urban E-Bike. Pairs instantly.",
      },
    ],
  },
  {
    slug: "ride-essentials",
    title: "Ride Essentials",
    price: "€29",
    rating: 4.6,
    reviewCount: 38,
    description:
      "Compact and durable essentials kit for everyday rides—organized storage where you need it.",
    features: [
      "Weather-resistant materials",
      "Quick-mount handlebar fit",
      "Reflective accents for visibility",
      "Streamlined cockpit clearance",
    ],
    images: ["/phone-holder.jpeg"],
    imageAlt: "Ride essentials kit for cyclists",
    lowStockCount: null,
    moreDetails:
      "Kit includes modular straps and mounting adaptors for 25.4 mm and 31.8 mm bars. Outer shell: abrasion-resistant nylon composite. Dimensions (folded): approx. 16 × 9 × 4 cm. Max recommended load for handlebar mount: 0.35 kg.",
    reviews: [
      {
        author: "Priya N.",
        rating: 5,
        text: "Keeps my phone visible for maps without feeling bulky.",
      },
      {
        author: "Tom W.",
        rating: 4,
        text: "Solid quality. Zippers and straps feel like they’ll last.",
      },
      {
        author: "Chris L.",
        rating: 5,
        text: "Exactly what I needed for short city hops. Highly recommend.",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
