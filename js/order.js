/* PharmaDroid — Order management
 * Create, track, update orders.
 * Order shape:
 *  { id, items:[{medId, brand, qty}], pharmacyId, deliveryType, address,
 *    status, createdAt, qrCode, estPrepTime, totalPrice, driverId,
 *    timeline: [{status, at}] }
 */

function pdCreateOrder(items, pharmacyId, deliveryType, address) {
  var pharmacy = pdFindPharmacy(pharmacyId);
  var order = {
    items: items || [],
    pharmacyId: pharmacyId,
    pharmacyName: pharmacy ? pharmacy.name : "",
    deliveryType: deliveryType || PD_DELIVERY.PICKUP,
    address: address || "",
    status: PD_ORDER_STATUS.SENT,
    estPrepTime: pharmacy ? pharmacy.avgPrepTime : 10,
    deliveryFee: deliveryType === PD_DELIVERY.DELIVERY ? PD_DELIVERY_FEE : 0,
    driverId: null,
    driverName: null,
    qrCode: pdGenerateQRData(),
    timeline: [{ status: PD_ORDER_STATUS.SENT, at: Date.now() }],
  };
  order.id = pdAddOrder(order);
  return order;
}

function pdGenerateQRData() {
  /* Unique token for pickup verification */
  return "PD-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

function pdAdvanceOrderStatus(orderId, newStatus, extra) {
  var order = pdFindOrder(orderId);
  if (!order) return null;
  var timeline = order.timeline || [];
  timeline.push({ status: newStatus, at: Date.now() });
  var patch = Object.assign({ status: newStatus, timeline: timeline }, extra || {});
  pdUpdateOrder(orderId, patch);
  return pdFindOrder(orderId);
}

/* Simulate pharmacy workflow:
 * SENT -> PREPARING (after 30s) -> READY (after est. prep time)
 * Called periodically from app loop.
 */
function pdSimulateOrderProgress(order) {
  var now = Date.now();
  var age = now - order.createdAt;
  var prepMs = (order.estPrepTime || 10) * 60 * 1000;

  if (order.status === PD_ORDER_STATUS.SENT && age > 15 * 1000) {
    pdAdvanceOrderStatus(order.id, PD_ORDER_STATUS.PREPARING);
    return true;
  }
  if (order.status === PD_ORDER_STATUS.PREPARING && age > prepMs) {
    pdAdvanceOrderStatus(order.id, PD_ORDER_STATUS.READY);
    return true;
  }
  return false;
}

/* Cancel order */
function pdCancelOrder(orderId) {
  pdAdvanceOrderStatus(orderId, PD_ORDER_STATUS.CANCELLED);
}

/* Get active orders (not collected, not cancelled) */
function pdGetActiveOrders() {
  return pdGetOrders().filter(function(o) {
    return o.status !== PD_ORDER_STATUS.COLLECTED && o.status !== PD_ORDER_STATUS.CANCELLED;
  });
}

/* Compute total */
function pdOrderSubtotal(order) {
  /* Mock pricing — real app would have prices per med */
  return order.items.reduce(function(sum, it) { return sum + (it.price || 2.50) * (it.qty || 1); }, 0);
}

function pdOrderTotal(order) {
  return pdOrderSubtotal(order) + (order.deliveryFee || 0);
}

/* Status label helper */
function pdOrderStatusLabel(status) {
  switch (status) {
    case PD_ORDER_STATUS.DRAFT:          return pd("draft") || "Brouillon";
    case PD_ORDER_STATUS.SENT:           return pd("orderSent");
    case PD_ORDER_STATUS.PREPARING:      return pd("orderPreparing");
    case PD_ORDER_STATUS.READY:          return pd("orderReady");
    case PD_ORDER_STATUS.DRIVER_ASSIGNED:return pd("driverOnWay");
    case PD_ORDER_STATUS.PICKED_UP:      return pd("driverArrivedPharmacy");
    case PD_ORDER_STATUS.DELIVERING:     return pd("driverOnWay");
    case PD_ORDER_STATUS.COLLECTED:      return pd("delivered");
    case PD_ORDER_STATUS.CANCELLED:      return pd("orderCancelled");
    default: return status;
  }
}

function pdOrderStatusColor(status) {
  switch (status) {
    case PD_ORDER_STATUS.READY:
    case PD_ORDER_STATUS.COLLECTED:
      return "green";
    case PD_ORDER_STATUS.PREPARING:
    case PD_ORDER_STATUS.DRIVER_ASSIGNED:
    case PD_ORDER_STATUS.PICKED_UP:
    case PD_ORDER_STATUS.DELIVERING:
      return "blue";
    case PD_ORDER_STATUS.CANCELLED:
      return "red";
    default:
      return "orange";
  }
}

/* QR rendering — produces SVG path for a simple visual QR (mock)
 * Real QR code would use a library — this is a decorative placeholder.
 */
function pdQRSvg(data, size) {
  size = size || 200;
  var cells = 25;
  var cellSize = size / cells;
  /* Generate deterministic pattern from data hash */
  var hash = 0;
  for (var i = 0; i < data.length; i++) hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  var grid = [];
  for (var y = 0; y < cells; y++) {
    var row = [];
    for (var x = 0; x < cells; x++) {
      var h = ((hash + x * 31 + y * 17) * 2654435761) >>> 0;
      row.push(h % 2);
    }
    grid.push(row);
  }
  /* Force corner finder patterns */
  function finder(gx, gy) {
    for (var yy = 0; yy < 7; yy++)
      for (var xx = 0; xx < 7; xx++) {
        var v = (xx === 0 || xx === 6 || yy === 0 || yy === 6 ||
                 (xx >= 2 && xx <= 4 && yy >= 2 && yy <= 4)) ? 1 : 0;
        grid[gy + yy][gx + xx] = v;
      }
  }
  finder(0, 0); finder(cells - 7, 0); finder(0, cells - 7);

  var rects = "";
  for (var y2 = 0; y2 < cells; y2++)
    for (var x2 = 0; x2 < cells; x2++)
      if (grid[y2][x2]) rects += '<rect x="' + (x2 * cellSize) + '" y="' + (y2 * cellSize) + '" width="' + cellSize + '" height="' + cellSize + '"/>';
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" style="background:white;border-radius:12px"><g fill="#1E2D3A">' + rects + '</g></svg>';
}
