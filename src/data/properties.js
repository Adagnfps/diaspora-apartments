// The 18 Exclusive Residences of "The Comboni Grand Tower"
// Prime Bole Atlas, Addis Ababa | 40,000,000 ETB to 60,000,000 ETB (~$285k - $430k USD)
const BUILDING_INFO = {
  name: "The Comboni Grand Tower",
  subcity: "Bole Atlas",
  neighborhood: "Cameroon St, Near Atlas Hotel & Edna Mall",
  city: "Addis Ababa, Ethiopia",
  coords: { lat: 9.0015, lng: 38.7845 },
  totalUnits: 18,
  totalFloors: 10,
  completion: "70% Finished (Structural Shell, Facade & Elevators 100% Ready)",
  delivery: "Q1 2027",
  titleDeed: "Guaranteed Digital Carta Handover"
};
const PHOTO_PRESETS = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85"
];

const FLOOR_PLAN_PRESET = "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85";
const ROUGH_IN_PRESET = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85";

// Generate the 18 apartments across Floors 2 through 10
export const INITIAL_PROPERTIES = [
  // Floor 2
  {
    id: "cmb-u201",
    unitNumber: "Unit 201",
    title: "Comboni Tower — Unit 201 (Garden Terrace)",
    floor: "2nd Floor",
    floorNumber: 2,
    type: "3-Bedroom Executive",
    priceETB: 42000000, // 42M ETB
    priceUSD: 300000,
    areaSqM: 175,
    bedrooms: 3,
    bathrooms: 2.5,
    orientation: "East Facing (Morning Sun)",
    features: ["Private 35m² terrace overlooking Bole green belt", "High ceilings (3.2m)", "Soundproof acoustic glazing", "Designated basement parking"],
    images: [PHOTO_PRESETS[0], PHOTO_PRESETS[1], PHOTO_PRESETS[2]]
  },
  {
    id: "cmb-u202",
    unitNumber: "Unit 202",
    title: "Comboni Tower — Unit 202 (Urban Corner)",
    floor: "2nd Floor",
    floorNumber: 2,
    type: "2-Bedroom Luxury",
    priceETB: 40000000, // 40M ETB
    priceUSD: 285000,
    areaSqM: 160,
    bedrooms: 2,
    bathrooms: 2,
    orientation: "South-East Facing",
    features: ["Corner unit with dual-aspect balconies", "Walk-in closet space in master suite", "Pre-installed AC conduits", "1 designated parking space"],
    images: [PHOTO_PRESETS[3], PHOTO_PRESETS[4], PHOTO_PRESETS[5]]
  },

  // Floor 3
  {
    id: "cmb-u301",
    unitNumber: "Unit 301",
    title: "Comboni Tower — Unit 301 (City Residence)",
    floor: "3rd Floor",
    floorNumber: 3,
    type: "3-Bedroom Executive",
    priceETB: 43500000, // 43.5M ETB
    priceUSD: 310000,
    areaSqM: 182,
    bedrooms: 3,
    bathrooms: 3,
    orientation: "East Facing",
    features: ["En-suite bathrooms in all bedrooms", "Utility / maid quarter with private bath", "Fiber optic pre-wired", "Double-glazed balcony sliders"],
    images: [PHOTO_PRESETS[1], PHOTO_PRESETS[2], PHOTO_PRESETS[6]]
  },
  {
    id: "cmb-u302",
    unitNumber: "Unit 302",
    title: "Comboni Tower — Unit 302 (Sunset Suite)",
    floor: "3rd Floor",
    floorNumber: 3,
    type: "3-Bedroom Contemporary",
    priceETB: 44000000, // 44M ETB
    priceUSD: 314000,
    areaSqM: 185,
    bedrooms: 3,
    bathrooms: 2.5,
    orientation: "West Facing (Sunset View)",
    features: ["Open-plan layout ready for Italian kitchen island", "Panoramic sunset balcony", "Private storage locker in basement", "Designated parking"],
    images: [PHOTO_PRESETS[4], PHOTO_PRESETS[0], PHOTO_PRESETS[3]]
  },

  // Floor 4
  {
    id: "cmb-u401",
    unitNumber: "Unit 401",
    title: "Comboni Tower — Unit 401 (Skyline Vista)",
    floor: "4th Floor",
    floorNumber: 4,
    type: "3-Bedroom Executive",
    priceETB: 45500000, // 45.5M ETB
    priceUSD: 325000,
    areaSqM: 190,
    bedrooms: 3,
    bathrooms: 3,
    orientation: "North-East Facing",
    features: ["View of Entoto mountain ridge", "Separate breakfast nook layout", "Central water heater connections ready", "Underground parking"],
    images: [PHOTO_PRESETS[2], PHOTO_PRESETS[5], PHOTO_PRESETS[1]]
  },
  {
    id: "cmb-u402",
    unitNumber: "Unit 402",
    title: "Comboni Tower — Unit 402 (Diplomat Corner)",
    floor: "4th Floor",
    floorNumber: 4,
    type: "3-Bedroom Corner",
    priceETB: 46000000, // 46M ETB
    priceUSD: 328000,
    areaSqM: 192,
    bedrooms: 3,
    bathrooms: 3,
    orientation: "South-West Facing",
    features: ["Generous wraparound corner balcony", "Reinforced security entrance door frame", "Dedicated high-speed elevator access", "Designated parking"],
    images: [PHOTO_PRESETS[5], PHOTO_PRESETS[3], PHOTO_PRESETS[4]]
  },

  // Floor 5
  {
    id: "cmb-u501",
    unitNumber: "Unit 501",
    title: "Comboni Tower — Unit 501 (Grand Panorama)",
    floor: "5th Floor",
    floorNumber: 5,
    type: "3-Bedroom Deluxe",
    priceETB: 47500000, // 47.5M ETB
    priceUSD: 339000,
    areaSqM: 198,
    bedrooms: 3,
    bathrooms: 3.5,
    orientation: "East Facing",
    features: ["Above tree-line unobstructed Addis view", "Master suite with space for freestanding soaking tub", "Sound-insulated plumbing stack", "Underground parking"],
    images: [PHOTO_PRESETS[0], PHOTO_PRESETS[6], PHOTO_PRESETS[2]]
  },
  {
    id: "cmb-u502",
    unitNumber: "Unit 502",
    title: "Comboni Tower — Unit 502 (Executive Wing)",
    floor: "5th Floor",
    floorNumber: 5,
    type: "3-Bedroom Deluxe",
    priceETB: 48000000, // 48M ETB
    priceUSD: 342000,
    areaSqM: 200,
    bedrooms: 3,
    bathrooms: 3.5,
    orientation: "West Facing",
    features: ["Expansive living hall with floor-to-ceiling glass rough-in", "Pantry and laundry room connections", "Smart home conduit wiring", "Designated parking"],
    images: [PHOTO_PRESETS[3], PHOTO_PRESETS[1], PHOTO_PRESETS[0]]
  },

  // Floor 6
  {
    id: "cmb-u601",
    unitNumber: "Unit 601",
    title: "Comboni Tower — Unit 601 (Crown View)",
    floor: "6th Floor",
    floorNumber: 6,
    type: "4-Bedroom Grand",
    priceETB: 50000000, // 50M ETB
    priceUSD: 357000,
    areaSqM: 212,
    bedrooms: 4,
    bathrooms: 3.5,
    orientation: "North-East Facing",
    features: ["4 full bedrooms plus private home office / study", "Dual balconies with 180° views", "Reinforced floor slabs ready for heavy marble", "2 basement parking spots"],
    images: [PHOTO_PRESETS[1], PHOTO_PRESETS[4], PHOTO_PRESETS[5]]
  },
  {
    id: "cmb-u602",
    unitNumber: "Unit 602",
    title: "Comboni Tower — Unit 602 (Sunset Residence)",
    floor: "6th Floor",
    floorNumber: 6,
    type: "4-Bedroom Grand",
    priceETB: 51000000, // 51M ETB
    priceUSD: 364000,
    areaSqM: 215,
    bedrooms: 4,
    bathrooms: 3.5,
    orientation: "South-West Facing",
    features: ["Spectacular evening city light view", "Dedicated maid suite with separate rear access", "Heavy-duty copper plumbing installed", "2 parking spaces"],
    images: [PHOTO_PRESETS[6], PHOTO_PRESETS[2], PHOTO_PRESETS[3]]
  },

  // Floor 7
  {
    id: "cmb-u701",
    unitNumber: "Unit 701",
    title: "Comboni Tower — Unit 701 (Highland Suite)",
    floor: "7th Floor",
    floorNumber: 7,
    type: "4-Bedroom Luxury",
    priceETB: 52500000, // 52.5M ETB
    priceUSD: 375000,
    areaSqM: 220,
    bedrooms: 4,
    bathrooms: 4,
    orientation: "East Facing",
    features: ["High-elevation tranquility above street noise", "All 4 bedrooms en-suite with walk-in layouts", "Full backup generator & solar emergency power", "2 parking spots"],
    images: [PHOTO_PRESETS[2], PHOTO_PRESETS[0], PHOTO_PRESETS[4]]
  },
  {
    id: "cmb-u702",
    unitNumber: "Unit 702",
    title: "Comboni Tower — Unit 702 (Golden Horizon)",
    floor: "7th Floor",
    floorNumber: 7,
    type: "4-Bedroom Luxury",
    priceETB: 53000000, // 53M ETB
    priceUSD: 378000,
    areaSqM: 222,
    bedrooms: 4,
    bathrooms: 4,
    orientation: "West Facing",
    features: ["Golden hour sun exposure across entire living area", "Private entry vestibule from elevator foyer", "German PVC triple-sealed windows", "2 parking spots"],
    images: [PHOTO_PRESETS[4], PHOTO_PRESETS[1], PHOTO_PRESETS[6]]
  },

  // Floor 8
  {
    id: "cmb-u801",
    unitNumber: "Unit 801",
    title: "Comboni Tower — Unit 801 (Ambassador Suite)",
    floor: "8th Floor",
    floorNumber: 8,
    type: "4-Bedroom Premier",
    priceETB: 55000000, // 55M ETB
    priceUSD: 392000,
    areaSqM: 230,
    bedrooms: 4,
    bathrooms: 4.5,
    orientation: "East Facing",
    features: ["Designed for embassy/consular dignitaries and top diaspora executives", "Expansive 40m² entertaining salon", "Dual elevator access", "2 parking spaces"],
    images: [PHOTO_PRESETS[0], PHOTO_PRESETS[3], PHOTO_PRESETS[5]]
  },
  {
    id: "cmb-u802",
    unitNumber: "Unit 802",
    title: "Comboni Tower — Unit 802 (Olympia Royal)",
    floor: "8th Floor",
    floorNumber: 8,
    type: "4-Bedroom Premier",
    priceETB: 56000000, // 56M ETB
    priceUSD: 400000,
    areaSqM: 235,
    bedrooms: 4,
    bathrooms: 4.5,
    orientation: "West Facing",
    features: ["Panoramic skyline towards Meskel Square & Kazanchis", "Chef kitchen rough-in with heavy extraction flue", "Direct elevator card lock", "2 parking spaces"],
    images: [PHOTO_PRESETS[5], PHOTO_PRESETS[2], PHOTO_PRESETS[1]]
  },

  // Floor 9
  {
    id: "cmb-u901",
    unitNumber: "Unit 901",
    title: "Comboni Tower — Unit 901 (Sky Villa East)",
    floor: "9th Floor",
    floorNumber: 9,
    type: "Duplex Sky Villa",
    priceETB: 57500000, // 57.5M ETB
    priceUSD: 410000,
    areaSqM: 250,
    bedrooms: 4,
    bathrooms: 4.5,
    orientation: "East & North Panorama",
    features: ["Double-height 5.8m ceiling in main reception hall", "Architectural floating staircase structure cast in concrete", "Private sky terrace", "2 parking spots"],
    images: [PHOTO_PRESETS[1], PHOTO_PRESETS[6], PHOTO_PRESETS[0]]
  },
  {
    id: "cmb-u902",
    unitNumber: "Unit 902",
    title: "Comboni Tower — Unit 902 (Sky Villa West)",
    floor: "9th Floor",
    floorNumber: 9,
    type: "Duplex Sky Villa",
    priceETB: 58000000, // 58M ETB
    priceUSD: 414000,
    areaSqM: 255,
    bedrooms: 4,
    bathrooms: 4.5,
    orientation: "West & South Panorama",
    features: ["Double-height glass facade framing Addis sunset", "Master penthouse mezzanine ready for private spa", "Basement storage cellar included", "2 parking spots"],
    images: [PHOTO_PRESETS[3], PHOTO_PRESETS[4], PHOTO_PRESETS[2]]
  },

  // Floor 10 (Penthouses)
  {
    id: "cmb-u1001",
    unitNumber: "Penthouse 1001",
    title: "Comboni Tower — Penthouse 1001 (The Imperial)",
    floor: "10th Floor (Top Penthouse)",
    floorNumber: 10,
    type: "Full Penthouse Suite",
    priceETB: 59500000, // 59.5M ETB
    priceUSD: 425000,
    areaSqM: 275,
    bedrooms: 4,
    bathrooms: 5,
    orientation: "360° Eastern Horizon",
    features: ["Top floor absolute privacy", "Private elevator opening directly into the residence foyer", "Massive private rooftop terrace (60m²)", "3 designated underground parking spots"],
    images: [PHOTO_PRESETS[0], PHOTO_PRESETS[1], PHOTO_PRESETS[2]]
  },
  {
    id: "cmb-u1002",
    unitNumber: "Penthouse 1002",
    title: "Comboni Tower — Penthouse 1002 (The Presidential)",
    floor: "10th Floor (Top Penthouse)",
    floorNumber: 10,
    type: "Full Penthouse Suite",
    priceETB: 60000000, // 60M ETB
    priceUSD: 430000,
    areaSqM: 285,
    bedrooms: 5,
    bathrooms: 5.5,
    orientation: "360° Skyline Panorama",
    features: ["The flagship crown jewel of Comboni Tower", "Unrivaled views across entire Addis Ababa plateau", "Private rooftop jacuzzi lounge area", "3 designated underground parking spots"],
    images: [PHOTO_PRESETS[2], PHOTO_PRESETS[5], PHOTO_PRESETS[4]]
  }
].map(prop => ({
  ...prop,
  subcity: BUILDING_INFO.subcity,
  neighborhood: BUILDING_INFO.neighborhood,
  fullAddress: `${prop.unitNumber}, ${BUILDING_INFO.name}, ${BUILDING_INFO.neighborhood}`,
  buildingName: BUILDING_INFO.name,
  completionPct: 70,
  status: "70% Finished — Ready for Custom Interior Fit-Out",
  deliveryDate: BUILDING_INFO.delivery,
  titleDeed: BUILDING_INFO.titleDeed,
  coordinates: BUILDING_INFO.coords,
  buildingImage: PHOTO_PRESETS[0],
  interiorRoughImage: ROUGH_IN_PRESET,
  floorPlanImage: FLOOR_PLAN_PRESET,
  finishingRemaining: [
    "Custom European tile & imported hardwood floor selection",
    "Italian/Turkish designer kitchen cabinetry & quartz islands",
    "Sanitary bathroom suites, jacuzzi and rain shower fittings",
    "Gypsum decorative ceilings & personalized lighting design"
  ],
  diasporaBankingEligible: true,
  financingTerms: "25% down payment escrow, 45% construction milestone installments, 30% upon key & Carta title handover. Foreign currency accepted via CBE & Awash Bank."
}));

