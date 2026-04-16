/* PharmaDroid — Delivery System
 * Driver workflow:
 *  1. Sees available jobs (orders with deliveryType=DELIVERY + status=READY + no driverId)
 *  2. Accepts -> status DRIVER_ASSIGNED
 *  3. At pharmacy, scans QR -> status PICKED_UP
 *  4. Marks delivering -> status DELIVERING
 *  5. At customer, customer scans -> status COLLECTED
 */

/* Available jobs for online drivers */
function pdAvailableJobs() {
  return pdGetOrders().filter(function(o) {
    return o.deliveryType === PD_DELIVERY.DELIVERY &&
           o.status === PD_ORDER_STATUS.READY &&
           !o.driverId;
  });
}

/* Driver's current jobs */
function pdDriverActiveJobs() {
  var profile = pdGetDriverProfile();
  return pdGetOrders().filter(function(o) {
    return o.driverId === profile.id &&
           [PD_ORDER_STATUS.DRIVER_ASSIGNED, PD_ORDER_STATUS.PICKED_UP, PD_ORDER_STATUS.DELIVERING].indexOf(o.status) !== -1;
  });
}

function pdDriverCompletedJobs() {
  var profile = pdGetDriverProfile();
  return pdGetOrders().filter(function(o) {
    return o.driverId === profile.id && o.status === PD_ORDER_STATUS.COLLECTED;
  });
}

/* Accept a job */
function pdAcceptJob(orderId) {
  var profile = pdGetDriverProfile();
  if (!pdIsDriverApproved()) return { ok: false, reason: "notApproved" };
  var order = pdFindOrder(orderId);
  if (!order) return { ok: false, reason: "notFound" };
  if (order.driverId) return { ok: false, reason: "taken" };

  var driverId = profile.id || ("driver_" + Date.now());
  profile.id = driverId;
  pdSetDriverProfile(profile);

  pdAdvanceOrderStatus(orderId, PD_ORDER_STATUS.DRIVER_ASSIGNED, {
    driverId: driverId,
    driverName: (profile.firstName + " " + profile.lastName).trim() || "Driver",
    driverVehicle: profile.vehicle,
  });
  return { ok: true };
}

/* Decline (no-op for UI — just don't show it) */
function pdDeclineJob(orderId) {
  /* Could be recorded if we wanted fairness */
  return { ok: true };
}

/* Driver picks up package at pharmacy */
function pdPickupPackage(orderId) {
  pdAdvanceOrderStatus(orderId, PD_ORDER_STATUS.PICKED_UP);
}

/* Driver starts delivery */
function pdStartDelivery(orderId) {
  pdAdvanceOrderStatus(orderId, PD_ORDER_STATUS.DELIVERING);
}

/* Complete delivery (customer scans driver's QR) */
function pdCompleteDelivery(orderId) {
  var order = pdFindOrder(orderId);
  if (!order) return { ok: false };
  pdAdvanceOrderStatus(orderId, PD_ORDER_STATUS.COLLECTED);
  /* Update driver stats */
  var profile = pdGetDriverProfile();
  profile.totalDeliveries = (profile.totalDeliveries || 0) + 1;
  profile.totalEarnings = (profile.totalEarnings || 0) + PD_DELIVERY_FEE * 0.8; /* 80% to driver */
  pdSetDriverProfile(profile);
  return { ok: true };
}

/* Estimate delivery time based on distance + vehicle */
function pdEstDeliveryTime(distanceKm, vehicle) {
  var speeds = { car: 25, scooter: 20, bike: 15, walk: 5 }; /* km/h */
  var speed = speeds[vehicle] || 20;
  return Math.ceil((distanceKm / speed) * 60); /* minutes */
}

/* Job payout */
function pdJobPayout() { return PD_DELIVERY_FEE * 0.8; }
