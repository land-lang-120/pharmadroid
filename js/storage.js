/* PharmaDroid — Storage layer (localStorage wrapper) */

function pdLoad(key, defaultVal) {
  try {
    var raw = localStorage.getItem(key);
    if (raw === null) return defaultVal;
    return JSON.parse(raw);
  } catch (e) { return defaultVal; }
}
function pdSave(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
}

/* Profile */
function pdGetProfile() {
  return pdLoad(PD_KEYS.profile, {
    name: "",
    age: null,
    weight: null,
    height: null,
    gender: null,
    allergies: [],
    conditions: [],
    pregnancy: false,
    breastfeeding: false,
    role: PD_ROLE.USER,
  });
}
function pdSetProfile(p) { pdSave(PD_KEYS.profile, p); }

/* Settings */
function pdGetSettings() {
  return pdLoad(PD_KEYS.settings, {
    mode: PD_MODE.PATIENT,
    notifications: true,
    sound: true,
    darkMode: false,
  });
}
function pdSetSettings(s) { pdSave(PD_KEYS.settings, s); }

/* User medications list */
function pdGetMyMeds() { return pdLoad(PD_KEYS.medications, []); }
function pdSetMyMeds(meds) { pdSave(PD_KEYS.medications, meds); }
function pdAddMyMed(medId) {
  var list = pdGetMyMeds();
  if (list.indexOf(medId) === -1) list.push(medId);
  pdSetMyMeds(list);
}
function pdRemoveMyMed(medId) {
  var list = pdGetMyMeds().filter(function(id) { return id !== medId; });
  pdSetMyMeds(list);
}

/* Favorites */
function pdGetFavorites() { return pdLoad(PD_KEYS.favorites, []); }
function pdToggleFavorite(medId) {
  var list = pdGetFavorites();
  var idx = list.indexOf(medId);
  if (idx !== -1) list.splice(idx, 1);
  else list.push(medId);
  pdSave(PD_KEYS.favorites, list);
  return idx === -1;
}
function pdIsFavorite(medId) { return pdGetFavorites().indexOf(medId) !== -1; }

/* Search history */
function pdGetHistory() { return pdLoad(PD_KEYS.history, []); }
function pdAddToHistory(query) {
  var list = pdGetHistory().filter(function(q) { return q !== query; });
  list.unshift(query);
  pdSave(PD_KEYS.history, list.slice(0, 10));
}
function pdClearHistory() { pdSave(PD_KEYS.history, []); }

/* Reminders */
function pdGetReminders() { return pdLoad(PD_KEYS.reminders, []); }
function pdAddReminder(rem) {
  var list = pdGetReminders();
  rem.id = rem.id || ("r_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7));
  list.push(rem);
  pdSave(PD_KEYS.reminders, list);
  return rem.id;
}
function pdUpdateReminder(id, patch) {
  var list = pdGetReminders();
  var idx = -1;
  for (var i = 0; i < list.length; i++) if (list[i].id === id) { idx = i; break; }
  if (idx === -1) return;
  list[idx] = Object.assign({}, list[idx], patch);
  pdSave(PD_KEYS.reminders, list);
}
function pdDeleteReminder(id) {
  var list = pdGetReminders().filter(function(r) { return r.id !== id; });
  pdSave(PD_KEYS.reminders, list);
}

/* Orders */
function pdGetOrders() { return pdLoad(PD_KEYS.orders, []); }
function pdAddOrder(order) {
  var list = pdGetOrders();
  order.id = order.id || ("ord_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7));
  order.createdAt = order.createdAt || Date.now();
  list.unshift(order);
  pdSave(PD_KEYS.orders, list);
  return order.id;
}
function pdUpdateOrder(id, patch) {
  var list = pdGetOrders();
  var idx = -1;
  for (var i = 0; i < list.length; i++) if (list[i].id === id) { idx = i; break; }
  if (idx === -1) return;
  list[idx] = Object.assign({}, list[idx], patch);
  pdSave(PD_KEYS.orders, list);
}
function pdFindOrder(id) {
  var list = pdGetOrders();
  for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
  return null;
}

/* Driver-specific */
function pdGetDriverProfile() {
  return pdLoad(PD_KEYS.driverProfile, {
    verified: PD_VERIF.NONE,
    firstName: "", lastName: "", birthDate: "",
    phone: "", address: "",
    vehicle: "car",
    idFrontPhoto: null,   /* data URL */
    idBackPhoto: null,
    selfiePhoto: null,
    submittedAt: null,
    rating: 5.0,
    totalDeliveries: 0,
    totalEarnings: 0,
  });
}
function pdSetDriverProfile(p) { pdSave(PD_KEYS.driverProfile, p); }
function pdIsDriverApproved() {
  return pdGetDriverProfile().verified === PD_VERIF.APPROVED;
}
function pdGetDriverOnline() { return pdLoad(PD_KEYS.driverOnline, false); }
function pdSetDriverOnline(on) { pdSave(PD_KEYS.driverOnline, !!on); }

/* Onboarded flag */
function pdIsOnboarded() { return pdLoad(PD_KEYS.onboarded, false); }
function pdSetOnboarded(v) { pdSave(PD_KEYS.onboarded, !!v); }

/* Reset all */
function pdResetAll() {
  Object.keys(PD_KEYS).forEach(function(k) {
    localStorage.removeItem(PD_KEYS[k]);
  });
}
