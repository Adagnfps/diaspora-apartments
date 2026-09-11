import { INITIAL_PROPERTIES } from './properties.js';
import { INITIAL_DEALS, PIPELINE_METRICS } from './deals.js';

const STORAGE_KEYS = {
  PROPERTIES: 'comboni_tower_properties_v3',
  DEALS: 'comboni_deals_v3',
  CURRENCY: 'comboni_currency_v3',
  FAVORITES: 'comboni_favorites_v3'
};

class Store {
  constructor() {
    this.listeners = new Set();
    this.properties = this.load(STORAGE_KEYS.PROPERTIES, INITIAL_PROPERTIES);
    this.deals = this.load(STORAGE_KEYS.DEALS, INITIAL_DEALS);
    this.metrics = { ...PIPELINE_METRICS };
    this.currency = this.load(STORAGE_KEYS.CURRENCY, 'ETB');
    this.showIntro = true; // Layer before the marketplace!
    this.activeView = 'marketplace'; // Underlying view is marketplace
    
    this.favorites = new Set(this.load(STORAGE_KEYS.FAVORITES, []));
    this.activePropertyId = null;
    this.hoveredPropertyId = null;
    this.isNewListingModalOpen = false;
    this.isOfferModalOpen = false;
    this.activeOfferUnit = null;

    this.filters = {
      search: '',
      floor: 'all',
      maxPriceETB: 65000000,
      bedrooms: 'all'
    };
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify() {
    for (const fn of this.listeners) {
      fn(this);
    }
  }

  dismissIntro() {
    this.showIntro = false;
    this.notify();
  }


  setView(view) {
    this.activeView = view;
    this.notify();
  }

  setCurrency(curr) {
    this.currency = curr;
    this.save(STORAGE_KEYS.CURRENCY, curr);
    this.notify();
  }

  toggleFavorite(id) {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }
    this.save(STORAGE_KEYS.FAVORITES, Array.from(this.favorites));
    this.notify();
  }

  setActiveProperty(id) {
    this.activePropertyId = id;
    this.notify();
  }

  setHoveredProperty(id) {
    if (this.hoveredPropertyId !== id) {
      this.hoveredPropertyId = id;
      this.notify();
    }
  }

  setFilter(key, value) {
    this.filters[key] = value;
    this.notify();
  }

  resetFilters() {
    this.filters = {
      search: '',
      floor: 'all',
      maxPriceETB: 65000000,
      bedrooms: 'all'
    };
    this.notify();
  }

  toggleNewListingModal(open) {
    this.isNewListingModalOpen = typeof open === 'boolean' ? open : !this.isNewListingModalOpen;
    this.notify();
  }

  openOfferModal(unitId) {
    this.activeOfferUnit = this.properties.find(p => p.id === unitId) || null;
    this.isOfferModalOpen = true;
    this.notify();
  }

  closeOfferModal() {
    this.isOfferModalOpen = false;
    this.activeOfferUnit = null;
    this.notify();
  }

  submitOffer(offerData) {
    const prop = this.activeOfferUnit;
    if (!prop) return;

    const offerETB = Number(offerData.offerAmountETB) || prop.priceETB;
    const offerUSD = Math.round(offerETB / 140);

    const newDeal = {
      id: "OFFER-" + Math.floor(100 + Math.random() * 900),
      priority: "High",
      stage: "new",
      propertyTitle: prop.title,
      specs: `${prop.bedrooms}-Beds • ${prop.floor} (${prop.areaSqM} m²)`,
      priceETB: prop.priceETB,
      priceUSD: prop.priceUSD,
      offerETB: offerETB,
      client: `${offerData.buyerName || 'Private Buyer'} (${offerData.location || 'Diaspora'})`,
      source: "Marketplace Direct Offer",
      contact: offerData.phone || offerData.email || "Confidential",
      paymentMethod: offerData.paymentMethod || "CBE Diaspora FX Escrow",
      reservationDate: "Just Now",
      tags: ["NEW OFFER"],
      commentsCount: 1,
      filesCount: 1,
      thumbnail: prop.images[0],
      floorPlan: prop.floorPlanImage
    };

    this.deals.unshift(newDeal);
    this.save(STORAGE_KEYS.DEALS, this.deals);

    // Increment offers sent in metrics
    this.metrics.offersSent += 1;

    this.closeOfferModal();
    this.notify();

    return newDeal;
  }

  addProperty(newProp) {
    const unitCount = this.properties.length + 1;
    const priceETB = Number(newProp.priceETB) || 45000000;
    const priceUSD = Math.round(priceETB / 140);

    const formatted = {
      id: 'cmb-u' + Date.now().toString().slice(-4),
      unitNumber: newProp.unitNumber || `Unit ${unitCount}`,
      title: newProp.title || `Comboni Tower — Unit ${unitCount}`,
      floor: newProp.floor || '5th Floor',
      floorNumber: Number(newProp.floorNumber) || 5,
      type: `${newProp.bedrooms || 3}-Bedroom Executive`,
      priceETB: priceETB,
      priceUSD: priceUSD,
      bedrooms: Number(newProp.bedrooms) || 3,
      bathrooms: Number(newProp.bathrooms) || 2.5,
      areaSqM: Number(newProp.areaSqM) || 180,
      orientation: 'Addis Skyline View',
      subcity: 'Bole Atlas',
      neighborhood: 'Cameroon St, Near Atlas Hotel',
      fullAddress: `${newProp.unitNumber || 'Unit'}, The Comboni Grand Tower, Bole Atlas, Addis Ababa`,
      buildingName: 'The Comboni Grand Tower',
      completionPct: 70,
      status: '70% Finished — Ready for Custom Interior Fit-Out',
      deliveryDate: 'Q1 2027',
      titleDeed: 'Guaranteed Digital Carta Handover',
      coordinates: { lat: 9.0015, lng: 38.7845 },
      images: newProp.images && newProp.images.length > 0 ? newProp.images : [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85'
      ],
      buildingImage: newProp.buildingImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
      interiorRoughImage: newProp.interiorRoughImage || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
      floorPlanImage: newProp.floorPlanImage || 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
      features: [
        'Reinforced Concrete Core & 100% Cast Structure',
        'OTIS High-Speed Twin Elevators Installed',
        'Plumbing Conduits & Heavy Copper Electric Risers Ready',
        'Underground Designated Parking'
      ],
      finishingRemaining: [
        'Custom porcelain / hardwood tiles selection',
        'Italian / Turkish style kitchen cabinetry',
        'Bathroom sanitaryware & shower installations',
        'Personalized interior paint & lighting design'
      ],
      diasporaBankingEligible: true,
      financingTerms: '25% down payment, 45% milestone installments, 30% upon title handover. Diaspora FX accepted.'
    };

    this.properties.unshift(formatted);
    this.save(STORAGE_KEYS.PROPERTIES, this.properties);

    this.notify();
    return formatted;
  }

  moveDeal(dealId, newStage) {
    const deal = this.deals.find(d => d.id === dealId);
    if (deal) {
      deal.stage = newStage;
      this.save(STORAGE_KEYS.DEALS, this.deals);
      this.notify();
    }
  }

  getFilteredProperties() {
    return this.properties.filter(p => {
      if (this.filters.floor !== 'all') {
        const targetFloor = Number(this.filters.floor);
        if (p.floorNumber !== targetFloor) return false;
      }
      if (this.filters.bedrooms !== 'all' && p.bedrooms !== Number(this.filters.bedrooms)) {
        return false;
      }
      if (p.priceETB > this.filters.maxPriceETB) {
        return false;
      }
      if (this.filters.search) {
        const query = this.filters.search.toLowerCase();
        const text = `${p.title} ${p.unitNumber} ${p.type} ${p.floor} ${p.orientation}`.toLowerCase();
        if (!text.includes(query)) return false;
      }
      return true;
    });
  }
}

export const appStore = new Store();
