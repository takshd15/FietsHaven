import { publicAsset } from "../lib/publicAsset.ts";

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
  /** Optioneel: per foto een eigen alt-tekst (zelfde lengte als `images`) */
  imageAlts?: readonly string[];
  reviews: ProductReview[];
  /** Korte intro voor de sectie Product specificaties */
  specIntro?: string;
  /** Technische specificaties per product */
  specs?: string[];
  /** Rijke tekst / specs voor het accordeon Meer details */
  moreDetails?: string;
  bestSeller?: boolean;
  /** Indien gezet: toont Nog X op voorraad */
  lowStockCount?: number | null;
};

/** Gedeelde accessoire-foto’s (merk, frame tas, afstandsbediening) bij alle drie fietsmodellen */
const bikeAccessoryImages = [
  publicAsset("bike-accessories/accessoire-1.jpeg"),
  publicAsset("bike-accessories/accessoire-2.jpeg"),
  publicAsset("bike-accessories/accessoire-3.jpeg"),
];

const bikeAccessoryAlts = [
  "Fietshaven — merkbeeld",
  "Frame tas met telefoonhouder",
  "Slimme afstandsbediening",
] as const;

export const products: Product[] = [
  {
    slug: "v20-pro",
    title: "Elektrische fiets, v20 Pro",
    price: "€760,-",
    rating: 4.9,
    reviewCount: 89,
    description:
      "Krachtige elektrische fiets met volledige uitrusting—ideaal voor woon-werk en de stad.",
    features: [
      "Telefoontas",
      "Alarm",
      "NFC",
      "Achterbank",
      "Voorrek",
      "Fietspomp",
      "Standaard",
      "Sleutels",
    ],
    images: [publicAsset("hero/v20-pro.jpeg"), ...bikeAccessoryImages],
    imageAlt: "Elektrische fiets v20 Pro",
    imageAlts: [
      "Elektrische fiets v20 Pro",
      ...bikeAccessoryAlts,
    ],
    reviews: [
      {
        author: "Lisa V.",
        rating: 5,
        text: "Topfiets, alles erop en eraan. Rijd er elke dag mee.",
      },
      {
        author: "Thomas B.",
        rating: 5,
        text: "Uitstekende prijs-kwaliteit—alles zoals beloofd.",
      },
      {
        author: "Noor K.",
        rating: 4,
        text: "Stevige bouw, accu gaat lang mee.",
      },
    ],
    bestSeller: true,
    lowStockCount: null,
    specIntro:
      "Krachtige en comfortabele e-bike, gemaakt voor dagelijks gebruik en avontuurlijke ritten. Met brede banden en een sterke motor rijd je moeiteloos door de stad en over ruwer terrein, met een of twee personen.",
    specs: [
      "250W",
      "25 km/u",
      "48V 15Ah accu (60-80 km)",
      "20x4.0 inch banden",
      "Hydraulische schijfremmen",
      "Shimano 7 versnellingen",
      "LCD / NFC display",
      "Voor- en achtervering",
    ],
  },
  {
    slug: "dubbele-accu",
    title: "Elektrische fiets, dubbele accu",
    price: "€860,-",
    rating: 4.8,
    reviewCount: 64,
    description:
      "Extra bereik dankzij dubbele accu—comfortabel en betrouwbaar op langere ritten.",
    features: [
      "Telefoontas",
      "Alarm",
      "NFC",
      "Achterbank",
      "Voorrek",
      "Fietspomp",
      "Standaard",
      "Sleutels",
    ],
    images: [publicAsset("hero/dubbele-accu.jpeg"), ...bikeAccessoryImages],
    imageAlt: "Elektrische fiets met dubbele accu",
    imageAlts: [
      "Elektrische fiets met dubbele accu",
      ...bikeAccessoryAlts,
    ],
    reviews: [
      {
        author: "Rick J.",
        rating: 5,
        text: "Het dubbele accupakket merk je meteen—geen range-stress meer.",
      },
      {
        author: "Sanne D.",
        rating: 5,
        text: "Strak afgewerkt en een complete set accessoires.",
      },
      {
        author: "Omar H.",
        rating: 4,
        text: "Zwaarder dan een enkele accu, maar het bereik maakt het waard.",
      },
    ],
    lowStockCount: 8,
    specIntro:
      "Lange ritten, zonder grenzen. Met de dubbele accu geniet je van extra bereik en kracht, ideaal voor dagelijks gebruik en langere avonturen.",
    specs: [
      "250W",
      "25 km/u",
      "Dubbele accu (tot 100-120 km)",
      "20x4.0 inch banden",
      "Hydraulische schijfremmen",
      "Shimano 7 versnellingen",
      "LCD / NFC display",
      "Voor- en achtervering",
    ],
  },
  {
    slug: "e-bike-mini",
    title: "Elektrische fiets, Mini",
    price: "€760,-",
    rating: 4.7,
    reviewCount: 52,
    description:
      "Compacte elektrische fiets met dezelfde rijke uitrusting—wendbaar in de stad.",
    features: [
      "Telefoontas",
      "Alarm",
      "NFC",
      "Achterbank",
      "Voorrek",
      "Fietspomp",
      "Standaard",
      "Sleutels",
    ],
    images: [publicAsset("hero/mini.jpeg"), ...bikeAccessoryImages],
    imageAlt: "Elektrische fiets Mini",
    imageAlts: [
      "Elektrische fiets Mini",
      ...bikeAccessoryAlts,
    ],
    reviews: [
      {
        author: "Emma P.",
        rating: 5,
        text: "Handig compact formaat—past door smalle plekken.",
      },
      {
        author: "Finn L.",
        rating: 4,
        text: "Goede prijs voor wat je krijgt, alles inbegrepen.",
      },
      {
        author: "Iris M.",
        rating: 5,
        text: "Perfect voor korte ritten en boodschappen.",
      },
    ],
    lowStockCount: null,
    specIntro:
      "Klein van stuk, groots in kracht. Klein en makkelijk te rijden, maar toch krachtig. Perfect voor korte ritten en dagelijks gebruik.",
    specs: [
      "250W",
      "25 km/u",
      "48V 12Ah accu (40-60 km)",
      "16x4.0 inch banden",
      "Hydraulische schijfremmen",
      "Shimano 7 versnellingen",
      "LCD display",
      "Voorvering",
    ],
  },
  {
    slug: "urban-e-bike",
    title: "Fietshaven Urban E-bike",
    price: "€1,899",
    rating: 4.8,
    reviewCount: 124,
    description:
      "Krachtige elektrische fiets voor modern woon-werkverkeer. Snel, comfortabel en betrouwbaar voor elke dag.",
    features: [
      "Lange accuduur",
      "Lichtgewicht frame",
      "Slim slot",
      "Premium vering",
    ],
    images: ["/bike.jpeg"],
    imageAlt: "Fietshaven Urban E-bike",
    reviews: [
      {
        author: "Alex R.",
        rating: 5,
        text: "Geweldige fiets. Soepele rit, goede accu en hij ziet er top uit.",
      },
      {
        author: "Sarah M.",
        rating: 4,
        text: "Perfect voor de stad. Comfortabel en makkelijk in gebruik.",
      },
      {
        author: "Daniel K.",
        rating: 5,
        text: "Mijn beste aankoop dit jaar. Echt een aanrader.",
      },
    ],
    bestSeller: true,
    lowStockCount: 5,
    moreDetails:
      "Motor: 250 W nominaal (EU-conform). Accu: verwijderbare 540 Wh lithium-ion, geschat bereik tot ca. 90 km afhankelijk van ondersteuning en terrein. Frame: gehydroformd aluminium. Gewicht: ca. 22 kg incl. accu. Remmen: hydraulische schijfremmen. Aandrijving: gesloten riemaandrijving. Slimme functies: GPS-module, app-koppeling voor ritdata en antidiefstal. Lader meegeleverd (100–240 V).",
  },
  {
    slug: "smart-key-remote",
    title: "Slimme afstandsbediening",
    price: "€49",
    rating: 4.7,
    reviewCount: 56,
    description:
      "Veilige afstandsbediening voor je Fietshaven e-bike—vergrendelen, ontgrendelen en essentiële functies in één compacte vorm.",
    features: [
      "Versleutelde draadloze koppeling",
      "Tot 12 maanden batterijduur",
      "Claxon- en lichtbediening",
      "Robuuste, weerbestendige behuizing",
    ],
    images: ["/key-chain.jpeg"],
    imageAlt: "Slimme fietssleutel afstandsbediening",
    lowStockCount: 14,
    moreDetails:
      "Frequentie: 2,4 GHz met versleutelde koppeling. Batterij: CR2032 (zelf te vervangen). Bereik: tot ca. 10 m zichtlijn. Weerbestendigheid: IP54. Compatibel met Fietshaven Urban E-bike (firmware 2023 en nieuwer).",
    reviews: [
      {
        author: "Jordan P.",
        rating: 5,
        text: "Voelt premium en werkt elke keer. Geen gezoek meer naar sleutels.",
      },
      {
        author: "Elena V.",
        rating: 4,
        text: "Snel gekoppeld en de knoppen voelen prettig aan.",
      },
      {
        author: "Marcus T.",
        rating: 5,
        text: "Onmisbaar bij de Urban E-bike. Koppelt direct.",
      },
    ],
  },
  {
    slug: "ride-essentials",
    title: "Essentials voor onderweg",
    price: "€29",
    rating: 4.6,
    reviewCount: 38,
    description:
      "Compacte, duurzame essentials voor elke rit—overzichtelijke opbergruimte waar je het nodig hebt.",
    features: [
      "Weerbestendige materialen",
      "Snelle montage op het stuur",
      "Reflecterende details",
      "Strak profiel aan het stuur",
    ],
    images: ["/phone-holder.jpeg"],
    imageAlt: "Essentials kit voor fietsers",
    lowStockCount: null,
    moreDetails:
      "Bevat modulaire bandjes en adapters voor 25,4 mm en 31,8 mm sturen. Buitenlaag: slijtvaste nylon-composite. Afmetingen (opgevouwen): ca. 16 × 9 × 4 cm. Max. aanbevolen belasting stuurmontage: 0,35 kg.",
    reviews: [
      {
        author: "Priya N.",
        rating: 5,
        text: "Telefoon goed in beeld voor navigatie zonder bulk.",
      },
      {
        author: "Tom W.",
        rating: 4,
        text: "Degelijke kwaliteit. Ritsen en bandjes voelen stevig.",
      },
      {
        author: "Chris L.",
        rating: 5,
        text: "Precies wat ik zocht voor korte ritten in de stad.",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
