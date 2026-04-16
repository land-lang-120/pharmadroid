/* PharmaDroid — Pharmacy Directory (mock data)
 * In production: fetched from API with geolocation filtering.
 */

const PD_PHARMACIES = [
  {
    id: "pharma-centrale",
    name: "Pharmacie Centrale",
    address: "12 Rue de la Liberte, Douala",
    distance: 0.4, /* km from user */
    rating: 4.8,
    reviews: 234,
    open: true,
    hours: "8h - 20h",
    phone: "+237 699 001 001",
    services: ["delivery", "onduty", "scan"],
    avgPrepTime: 8, /* minutes */
    emoji: "🏥",
  },
  {
    id: "pharma-croix-verte",
    name: "Pharmacie de la Croix Verte",
    address: "45 Avenue Charles de Gaulle, Yaounde",
    distance: 0.8,
    rating: 4.6,
    reviews: 187,
    open: true,
    hours: "7h30 - 22h",
    phone: "+237 699 002 002",
    services: ["delivery", "onduty"],
    avgPrepTime: 12,
    emoji: "🏥",
  },
  {
    id: "pharma-sante-plus",
    name: "Pharmacie Sante Plus",
    address: "8 Boulevard de l'Unite, Bonaberi",
    distance: 1.2,
    rating: 4.4,
    reviews: 96,
    open: true,
    hours: "8h - 19h",
    phone: "+237 699 003 003",
    services: ["scan"],
    avgPrepTime: 15,
    emoji: "🏥",
  },
  {
    id: "pharma-akwa",
    name: "Pharmacie d'Akwa",
    address: "23 Rue Joss, Akwa",
    distance: 1.8,
    rating: 4.7,
    reviews: 312,
    open: true,
    hours: "24h/24",
    phone: "+237 699 004 004",
    services: ["delivery", "onduty", "scan"],
    avgPrepTime: 6,
    emoji: "🏥",
  },
  {
    id: "pharma-bonapriso",
    name: "Pharmacie Bonapriso",
    address: "67 Rue Drouot, Bonapriso",
    distance: 2.3,
    rating: 4.3,
    reviews: 78,
    open: false,
    hours: "8h - 19h",
    phone: "+237 699 005 005",
    services: [],
    avgPrepTime: 20,
    emoji: "🏥",
  },
  {
    id: "pharma-pk9",
    name: "Pharmacie PK9",
    address: "PK9 Carrefour, Douala",
    distance: 3.1,
    rating: 4.5,
    reviews: 145,
    open: true,
    hours: "7h - 21h",
    phone: "+237 699 006 006",
    services: ["delivery"],
    avgPrepTime: 10,
    emoji: "🏥",
  },
];

function pdFindPharmacy(id) {
  for (var i = 0; i < PD_PHARMACIES.length; i++) if (PD_PHARMACIES[i].id === id) return PD_PHARMACIES[i];
  return null;
}

function pdNearbyPharmacies(maxDistance, requireDelivery) {
  maxDistance = maxDistance || 5;
  return PD_PHARMACIES.filter(function(p) {
    if (p.distance > maxDistance) return false;
    if (requireDelivery && p.services.indexOf("delivery") === -1) return false;
    return p.open;
  }).sort(function(a, b) { return a.distance - b.distance; });
}
