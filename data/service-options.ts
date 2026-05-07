export type ServiceOptionChoice = {
  label: string
  note?: string
}

export type ServiceOptionGroup = {
  name: string
  maxSelections: number
  optional: boolean
  choices: ServiceOptionChoice[]
}

export type ServiceOptions = {
  serviceName: string
  groups: ServiceOptionGroup[]
}

const massageAddOns = ["15 minutes massage", "10 minutes massage", "Nail Fix"]
const extensionAddOns = [
  "15 minutes massage",
  "10 minutes massage",
  "Nail Fix",
  "Cat Eye / Chrome",
  "French",
]

const nailArtChoice: ServiceOptionChoice = {
  label: "Nail Art",
  note: "Please send picture of ref and prices may vary depending on the design",
}

const powderGelExtensionRemoval = [
  "SNS Powder Removal",
  "Gel Removal",
  "Extension, Hard gel and acrylic removal",
  "None of the above",
]

const gelRemoval = ["Gel Removal", "None of the above"]
const waxingRemoval = ["SNS Powder Removal", "Gel Removal", "None of the above"]

function choices(labels: string[]): ServiceOptionChoice[] {
  return labels.map((label) => ({ label }))
}

function addOn(labels: string[], maxSelections: number): ServiceOptionGroup {
  return {
    name: "Add on",
    maxSelections,
    optional: true,
    choices: choices(labels),
  }
}

function removal(labels: string[]): ServiceOptionGroup {
  return {
    name: "Removal",
    maxSelections: 1,
    optional: true,
    choices: choices(labels),
  }
}

const manicureOptions = [
  addOn(massageAddOns, 2),
  removal(powderGelExtensionRemoval),
]

const manicureRemovalOnly = [removal(powderGelExtensionRemoval)]

const nailFixOptions = [
  addOn(["15 minutes massage", "None of the above"], 1),
  removal(powderGelExtensionRemoval),
]

const standardPedicureOptions = [
  addOn(["15 minutes massage", "10 minutes massage", "Nail Fix", "French"], 2),
  removal(gelRemoval),
]

const pedicureMassageOptions = [
  addOn(massageAddOns, 2),
  removal(gelRemoval),
]

const spaPedicureOptions = [
  addOn(["15 minutes massage", "10 minutes massage", "Nail Fix", "Gel Polish"], 2),
  removal(gelRemoval),
]

const nailArtOptions = [
  {
    ...addOn(extensionAddOns, 2),
    choices: [...choices(extensionAddOns), nailArtChoice],
  },
  removal(powderGelExtensionRemoval),
]

const colorGelPedicureOptions = [
  {
    ...addOn(extensionAddOns, 2),
    choices: [...choices(extensionAddOns), nailArtChoice],
  },
  removal(gelRemoval),
]

const massageTenOptions = [
  addOn(["Nail Fix", "None of the above"], 1),
  removal(waxingRemoval),
]

const massageFifteenOptions = [removal(["SNS Powder Removal", "None of the above"])]

const waxingOptions = [
  addOn(["Nail Fix", "None of the above"], 1),
  removal(waxingRemoval),
]

const kidsManiPediOptions = [
  addOn(massageAddOns, 2),
  removal(gelRemoval),
]

const kidsPolishOptions = [removal(gelRemoval)]

const byService: Record<string, ServiceOptionGroup[]> = {
  "Standard Manicure": manicureOptions,
  "Dazzle Dry Manicure": manicureRemovalOnly,
  "Signature Manicure": manicureOptions,
  "Milk & Honey Manicure": manicureOptions,
  "Polish Change (Hand)": manicureOptions,
  "Shiny Buff Manicure": manicureOptions,
  "Paraffin Manicure": manicureOptions,
  "Nail Fix": nailFixOptions,
  "Standard Pedicure": standardPedicureOptions,
  "Dazzle Dry Pedicure": pedicureMassageOptions,
  "Essential Pedicure": spaPedicureOptions,
  "Signature Pedicure": spaPedicureOptions,
  "Milk & Honey Pedicure": spaPedicureOptions,
  "Golden Spa Pedicure": spaPedicureOptions,
  "Polish Change (Foot)": pedicureMassageOptions,
  "Color Gel Pedicure": colorGelPedicureOptions,
  "U.V. Set": nailArtOptions,
  "U.V. Builder Fill-In": nailArtOptions,
  "Apres Gel-X Extensions": nailArtOptions,
  "Gel-X Refill": nailArtOptions,
  "SNS Powder Extension": nailArtOptions,
  "Clear Powder Extension (Gel polish)": nailArtOptions,
  "Clear Powder Fill in (Gel polish)": nailArtOptions,
  "Clear Powder Extension (Regular Polish)": nailArtOptions,
  "Clear Powder Fill in (Regular Polish)": nailArtOptions,
  "Gel Manicure without Gel Removal": nailArtOptions,
  "Gel Manicure with Gel Removal": nailArtOptions,
  "Gel Manicure with Powder Removal": nailArtOptions,
  "Gel Manicure with Extension Removal": nailArtOptions,
  "SNS Powder With Removal": nailArtOptions,
  "SNS Powder Without Removal": nailArtOptions,
  "10Min Massage (Chair or Feet)": massageTenOptions,
  "15 minutes massage (Chair or Feet)": massageFifteenOptions,
  "Eye Brow": waxingOptions,
  "Lip": waxingOptions,
  "Chin": waxingOptions,
  "Under Arm": waxingOptions,
  "Half Arm": waxingOptions,
  "Full Arm": waxingOptions,
  "Lower Leg": waxingOptions,
  "Upper Leg": waxingOptions,
  "Full Leg": waxingOptions,
  "Bikini": waxingOptions,
  "Brazilian Bikini": waxingOptions,
  "Semi Brazilian Bikini": waxingOptions,
  "Little Manicure": kidsManiPediOptions,
  "Little Pedicure": kidsManiPediOptions,
  "Little feet polish change": kidsPolishOptions,
  "Little hand polish change": kidsPolishOptions,
}

export const serviceOptions: ServiceOptions[] = Object.entries(byService).map(
  ([serviceName, groups]) => ({
    serviceName,
    groups,
  }),
)

export function getServiceOptions(serviceName: string) {
  return byService[serviceName] ?? []
}
