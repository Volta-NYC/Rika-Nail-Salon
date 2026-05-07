export type Service = {
  name: string
  price: number | null
  description: string | null
}

export type ServiceCategory = {
  name: string
  services: Service[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    name: "Manicure",
    services: [
      { name: "Standard Manicure", price: 23, description: null },
      {
        name: "Dazzle Dry Manicure",
        price: 33,
        description:
          "Dazzle Dry is a revolutionary lacquer manicure system, scientifically formulated without the compromises of industry norms. Elevate your nail game with products that prioritize your health, respect your time and empower your individual impact on the world.",
      },
      { name: "Signature Manicure", price: 35, description: null },
      { name: "Milk & Honey Manicure", price: 45, description: null },
      { name: "Polish Change (Hand)", price: 18, description: null },
      { name: "Shiny Buff Manicure", price: 28, description: null },
      { name: "Paraffin Manicure", price: 33, description: null },
      { name: "Nail Fix", price: null, description: "Single Nail Extensions" },
    ],
  },
  {
    name: "Pedicure",
    services: [
      {
        name: "Standard Pedicure",
        price: 39,
        description:
          "The Standard Pedicure includes a soothing foot soak, followed by nail trimming and shaping, exfoliation, and meticulous cuticle care. Enjoy a hydrating foot skin formula, a relaxing massage, and a polished finish for beautifully groomed feet.",
      },
      {
        name: "Dazzle Dry Pedicure",
        price: 49,
        description:
          "Dazzle Dry is a revolutionary lacquer manicure system, scientifically formulated without the compromises of industry norms. Elevate your nail game with products that prioritize your health, respect your time and empower your individual impact on the world.",
      },
      {
        name: "Essential Pedicure",
        price: 58,
        description:
          "The Essential Pedicure offers a rejuvenating treatment for tired feet, featuring a soothing lavender sugar scrub that targets rough, callused areas with a specialized callus-reducing serum. To enhance your experience, enjoy a calming 7-minute foot and lower leg massage before your toes are expertly polished to perfection.",
      },
      {
        name: "Signature Pedicure",
        price: 90,
        description:
          "Experience the ultimate indulgence with our Signature Pedicure, where you'll choose from a selection of aromatic conditioning sea salts to elevate your relaxation. This luxurious treatment includes meticulous nail and cuticle detailing, an invigorating sugar scrub 10-MINUTE massage, a purifying mud mask, and a nourishing botanical extract massage, leaving your feet revitalized and beautifully polished.",
      },
      { name: "Milk & Honey Pedicure", price: 78, description: null },
      { name: "Golden Spa Pedicure", price: 87, description: null },
      { name: "Polish Change (Foot)", price: 25, description: null },
      {
        name: "Color Gel Pedicure",
        price: 65,
        description:
          "Experience a rejuvenating Color Gel Pedicure that includes a soothing foot soak, nail trimming and shaping, and meticulous cuticle care. This service also features exfoliation, a hydrating foot skin formula, a relaxing massage, and the application of a vibrant gel polish for a long-lasting, polished finish.",
      },
    ],
  },
  {
    name: "Extension",
    services: [
      { name: "U.V. Set", price: 110, description: null },
      { name: "U.V. Builder Fill-In", price: 83, description: null },
      {
        name: "Apres Gel-X Extensions",
        price: 95,
        description:
          "Apres Gel-X Nail Extensions are a type of soft gel extension. They are nail tips made of a soft gel material that are applied over your natural nails to extend your nail length. Unlike traditional acrylics, Apres Gel-X does not use monomer liquid and acrylic powder (so no harsh smell, thank goodness!).",
      },
      { name: "Gel-X Refill", price: 83, description: null },
      {
        name: "SNS Powder Extension",
        price: 78,
        description:
          "SNS Powder Extension offers a durable and natural-looking manicure achieved by coating nails with a specialized powder. This method involves applying a base coat, dipping the nails into colored powder, and finishing with a protective topcoat, providing a healthier alternative to traditional acrylics while strengthening and protecting your nails.",
      },
      { name: "Clear Powder Extension (Gel polish)", price: 95, description: null },
      { name: "Clear Powder Fill in (Gel polish)", price: 75, description: null },
      {
        name: "Clear Powder Extension (Regular Polish)",
        price: null,
        description: null,
      },
      {
        name: "Clear Powder Fill in (Regular Polish)",
        price: null,
        description: null,
      },
    ],
  },
  {
    name: "Gel Manicure",
    services: [
      { name: "Gel Manicure without Gel Removal", price: 50, description: null },
      { name: "Gel Manicure with Gel Removal", price: 50, description: null },
      { name: "Gel Manicure with Powder Removal", price: null, description: null },
      {
        name: "Gel Manicure with Extension Removal",
        price: null,
        description: null,
      },
    ],
  },
  {
    name: "Dipping Powder",
    services: [
      { name: "SNS Powder With Removal", price: null, description: null },
      { name: "SNS Powder Without Removal", price: 62, description: null },
    ],
  },
  {
    name: "Massage",
    services: [
      { name: "10Min Massage (Chair or Feet)", price: 15, description: null },
      { name: "15 minutes massage (Chair or Feet)", price: 22.5, description: null },
    ],
  },
  {
    name: "Waxing",
    services: [
      { name: "Eye Brow", price: 13, description: null },
      { name: "Lip", price: 10, description: null },
      { name: "Chin", price: 12, description: null },
      { name: "Under Arm", price: 20, description: null },
      { name: "Half Arm", price: 25, description: null },
      { name: "Full Arm", price: 40, description: null },
      { name: "Lower Leg", price: 35, description: null },
      { name: "Upper Leg", price: 35, description: null },
      { name: "Full Leg", price: 60, description: null },
      { name: "Bikini", price: 25, description: null },
      { name: "Brazilian Bikini", price: 60, description: null },
      { name: "Semi Brazilian Bikini", price: 45, description: null },
    ],
  },
  {
    name: "KIDS Mani and Pedi - Under 10 Years Old",
    services: [
      { name: "Little Manicure", price: 15, description: null },
      { name: "Little Pedicure", price: 20, description: null },
      { name: "Little feet polish change", price: 15, description: null },
      { name: "Little hand polish change", price: 10, description: null },
    ],
  },
]

export function formatPrice(price: number | null) {
  if (price === null) {
    return "Price upon request"
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price)
}

export function categoryStartingPrice(category: ServiceCategory) {
  const prices = category.services
    .map((service) => service.price)
    .filter((price): price is number => price !== null)

  return prices.length ? Math.min(...prices) : null
}
