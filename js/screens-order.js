/* PharmaDroid — Order / Scanner / Checkout / Track screens */

/* === SCANNER SCREEN === */
function ScannerScreen(props) {
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;
  var [mode, setMode] = useState(props.mode || PD_SCAN_MODE.PRESCRIPTION);
  var [cameraActive, setCameraActive] = useState(false);
  var [detected, setDetected] = useState(null);
  var [cameraError, setCameraError] = useState(null);
  var videoRef = useRef(null);

  useEffect(function() {
    return function() {
      pdScannerStop(videoRef.current);
    };
  }, []);

  function startCamera() {
    setCameraError(null);
    pdScannerStart(videoRef.current).then(function() {
      setCameraActive(true);
    }).catch(function(e) {
      setCameraError(e.message || "camera");
    });
  }

  function stopCamera() {
    pdScannerStop(videoRef.current);
    setCameraActive(false);
  }

  function simulateScan() {
    if (mode === PD_SCAN_MODE.PRESCRIPTION) {
      setDetected({ type: "prescription", items: pdMockDetectPrescription() });
    } else if (mode === PD_SCAN_MODE.BARCODE) {
      setDetected({ type: "barcode", item: pdMockDetectBarcode() });
    }
    stopCamera();
  }

  return React.createElement("div", { style: { background: PD.grey900, minHeight: "100vh", color: "white", paddingBottom: 80 } },
    /* Header */
    React.createElement("div", { style: {
      padding: "14px 22px", display: "flex", alignItems: "center", gap: 12,
      background: "rgba(0,0,0,0.5)", position: "sticky", top: 0, zIndex: 10,
    }},
      React.createElement("button", {
        onClick: function() { stopCamera(); props.onBack(); },
        style: { width: 42, height: 42, borderRadius: 14, background: "rgba(255,255,255,0.15)", border: "none", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }
      }, Pdi.back),
      React.createElement("div", { style: { flex: 1, textAlign: "center", fontSize: 16, fontWeight: 700 } },
        mode === PD_SCAN_MODE.PRESCRIPTION ? pd("scanPrescription") : pd("scanBarcode")
      ),
      React.createElement("div", { style: { width: 42 } })
    ),

    /* Mode toggle */
    React.createElement("div", { style: { padding: "12px 22px", display: "flex", gap: 8, justifyContent: "center" } },
      [
        { id: PD_SCAN_MODE.PRESCRIPTION, label: "📄 " + pd("prescription") },
        { id: PD_SCAN_MODE.BARCODE, label: "💊 " + pd("box") },
      ].map(function(opt) {
        var active = mode === opt.id;
        return React.createElement("button", {
          key: opt.id,
          onClick: function() { setMode(opt.id); setDetected(null); },
          style: {
            padding: "8px 16px", borderRadius: 100,
            background: active ? PD.green : "rgba(255,255,255,0.15)",
            border: "none", color: "white", fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }
        }, opt.label);
      })
    ),

    /* Camera viewfinder */
    React.createElement("div", { style: {
      margin: "0 22px", height: 360, borderRadius: 20,
      background: "black", position: "relative", overflow: "hidden",
      border: "2px solid " + PD.green,
    }},
      React.createElement("video", {
        ref: videoRef,
        playsInline: true,
        muted: true,
        style: { width: "100%", height: "100%", objectFit: "cover", display: cameraActive ? "block" : "none" }
      }),
      /* Placeholder when camera off */
      !cameraActive && !detected && React.createElement("div", {
        style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, color: "rgba(255,255,255,0.6)" }
      },
        React.createElement("div", { style: { fontSize: 60 } }, mode === PD_SCAN_MODE.PRESCRIPTION ? "📄" : "📸"),
        React.createElement("div", { style: { fontSize: 14, fontWeight: 600, textAlign: "center", padding: "0 24px" } }, pd("scanInstructions")),
        cameraError && React.createElement("div", {
          style: { color: PD.red, fontSize: 12, textAlign: "center", padding: "0 24px" }
        }, "❌ " + pd("askCamera"))
      ),
      /* Scan frame overlay */
      cameraActive && React.createElement("div", {
        style: {
          position: "absolute", inset: "10%",
          border: "3px solid " + PD.green, borderRadius: 16,
          boxShadow: "inset 0 0 0 3px rgba(0,0,0,0.3)",
        }
      },
        corner("top", "left"), corner("top", "right"),
        corner("bottom", "left"), corner("bottom", "right")
      ),
      /* Detected preview */
      detected && React.createElement("div", {
        style: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14, padding: 20 }
      },
        React.createElement("div", { style: { fontSize: 50 } }, "✓"),
        React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: PD.green } }, pd("scanDetected")),
        React.createElement("div", { style: { fontSize: 13, textAlign: "center" } },
          detected.type === "prescription" ? (detected.items.length + " " + pd("orderItems")) : detected.item.brand
        )
      )
    ),

    /* Actions */
    React.createElement("div", { style: { padding: "22px", display: "flex", flexDirection: "column", gap: 12 } },
      !cameraActive && !detected && React.createElement(PdBtn, {
        variant: "primary", size: "lg", fullWidth: true, onClick: startCamera,
      }, Pdi.camera, pd("askCamera")),
      cameraActive && React.createElement(PdBtn, {
        variant: "primary", size: "lg", fullWidth: true, onClick: simulateScan,
      }, pd("scanning")),
      detected && React.createElement(React.Fragment, null,
        React.createElement(PdBtn, {
          variant: "primary", size: "lg", fullWidth: true,
          onClick: function() {
            if (detected.type === "prescription") props.onProceedOrder(detected.items);
            else props.onOpenMed(detected.item.medId);
          }
        },
          detected.type === "prescription" ? pd("selectPharmacy") : pd("view")
        ),
        React.createElement(PdBtn, {
          variant: "ghost", size: "md", fullWidth: true,
          onClick: function() { setDetected(null); startCamera(); }
        }, pd("retakePhoto"))
      ),
      !cameraActive && !detected && React.createElement(PdBtn, {
        variant: "outline", size: "md", fullWidth: true,
        style: { borderColor: "rgba(255,255,255,0.3)", color: "white" },
        onClick: simulateScan,
      }, pd("manualEntry") + " (demo)")
    )
  );
}

function corner(v, h) {
  var s = {
    position: "absolute", width: 22, height: 22,
    borderColor: PD.green, borderStyle: "solid", borderWidth: 0,
  };
  if (v === "top") s.top = -3; else s.bottom = -3;
  if (h === "left") s.left = -3; else s.right = -3;
  if (v === "top") s.borderTopWidth = 5;
  else s.borderBottomWidth = 5;
  if (h === "left") s.borderLeftWidth = 5;
  else s.borderRightWidth = 5;
  return React.createElement("div", { style: s, key: v + h });
}

/* === CHECKOUT / PHARMACY SELECT === */
function CheckoutScreen(props) {
  var useState = React.useState;
  var [pharmacyId, setPharmacyId] = useState(null);
  var [deliveryType, setDeliveryType] = useState(PD_DELIVERY.PICKUP);
  var [address, setAddress] = useState(pdGetProfile().address || "");
  var items = props.items || [];
  var pharmacies = pdNearbyPharmacies(5, deliveryType === PD_DELIVERY.DELIVERY);

  function confirm() {
    if (!pharmacyId) { pdToast("Choisis une pharmacie", "warning"); return; }
    if (deliveryType === PD_DELIVERY.DELIVERY && !address) { pdToast("Renseigne ton adresse", "warning"); return; }
    var order = pdCreateOrder(items, pharmacyId, deliveryType, address);
    pdToast(pd("orderSent") + " ✓", "success");
    props.onOrderCreated(order.id);
  }

  var subtotal = items.reduce(function(s, it) { return s + (it.price || 2.50) * (it.qty || 1); }, 0);
  var fee = deliveryType === PD_DELIVERY.DELIVERY ? PD_DELIVERY_FEE : 0;
  /* Sticky footer occupies ~220px with delivery fee row. Leave generous bottom padding. */
  var footerPad = fee > 0 ? 230 : 190;

  return React.createElement("div", { style: { paddingBottom: footerPad } },
    React.createElement("div", { style: { padding: "14px 22px", display: "flex", alignItems: "center", gap: 12, background: "white", borderBottom: "1px solid " + PD.grey200 } },
      React.createElement("button", { onClick: props.onBack, style: iconBtnStyle() }, Pdi.back),
      React.createElement("div", { style: { flex: 1, fontSize: 18, fontWeight: 800, color: PD.text } }, pd("newOrder"))
    ),

    /* Items */
    React.createElement("div", { style: { padding: "16px 22px" } },
      React.createElement("div", { style: { color: PD.textLight, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 } }, pd("orderItems")),
      items.map(function(it, i) {
        return React.createElement(PdCard, { key: i, style: { padding: 12, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 } },
          React.createElement("div", { style: { fontSize: 22 } }, "💊"),
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: PD.text } }, it.brand),
            React.createElement("div", { style: { fontSize: 12, color: PD.textLight } }, it.form || "")
          ),
          React.createElement("div", { style: { color: PD.text, fontSize: 13, fontWeight: 700 } }, "x" + (it.qty || 1))
        );
      })
    ),

    /* Delivery option */
    React.createElement("div", { style: { padding: "0 22px 16px" } },
      React.createElement("div", { style: { color: PD.textLight, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 } }, pd("delivery")),
      React.createElement("div", { style: { display: "flex", gap: 8 } },
        [
          { id: PD_DELIVERY.PICKUP, icon: "🏥", title: pd("pickup"), desc: pd("pickupDesc"), fee: 0 },
          { id: PD_DELIVERY.DELIVERY, icon: "🚴", title: pd("deliveryOption"), desc: pd("deliveryDesc"), fee: PD_DELIVERY_FEE },
        ].map(function(opt) {
          var sel = deliveryType === opt.id;
          return React.createElement("div", {
            key: opt.id,
            onClick: function() { setDeliveryType(opt.id); },
            style: {
              flex: 1, padding: 14, borderRadius: 14, cursor: "pointer",
              background: sel ? PD.greenLight : "white",
              border: "2px solid " + (sel ? PD.green : PD.grey200),
              transition: "all 0.15s",
            }
          },
            React.createElement("div", { style: { fontSize: 22, marginBottom: 6 } }, opt.icon),
            React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: PD.text } }, opt.title),
            React.createElement("div", { style: { fontSize: 11, color: PD.textLight, marginTop: 3 } }, opt.desc),
            opt.fee > 0 && React.createElement("div", { style: { fontSize: 11, color: PD.green, fontWeight: 700, marginTop: 5 } }, "+" + opt.fee.toFixed(2) + " €")
          );
        })
      ),
      deliveryType === PD_DELIVERY.DELIVERY && React.createElement("input", {
        value: address,
        onChange: function(e) { setAddress(e.target.value); },
        placeholder: pd("address"),
        style: {
          width: "100%", marginTop: 12, padding: "12px 14px", borderRadius: 12,
          border: "1px solid " + PD.grey200, background: "white", outline: "none",
          fontFamily: "inherit", fontSize: 14, boxSizing: "border-box",
        }
      })
    ),

    /* Pharmacy selection */
    React.createElement("div", { style: { padding: "0 22px" } },
      React.createElement("div", { style: { color: PD.textLight, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 } }, pd("selectPharmacy")),
      pharmacies.map(function(ph) {
        var sel = pharmacyId === ph.id;
        return React.createElement("div", {
          key: ph.id,
          onClick: function() { setPharmacyId(ph.id); },
          style: {
            padding: 14, borderRadius: 14, marginBottom: 8, cursor: "pointer",
            background: "white",
            border: "2px solid " + (sel ? PD.green : PD.grey200),
            display: "flex", alignItems: "center", gap: 12,
          }
        },
          React.createElement("div", { style: { fontSize: 26 } }, ph.emoji),
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: PD.text } }, ph.name),
            React.createElement("div", { style: { fontSize: 12, color: PD.textLight, marginTop: 2 } },
              ph.distance + " km • " + ph.avgPrepTime + " min • ⭐ " + ph.rating
            )
          ),
          sel && React.createElement("span", { style: { color: PD.green } }, Pdi.check)
        );
      }),
      pharmacies.length === 0 && React.createElement("div", { style: { textAlign: "center", padding: 20, color: PD.textLight, fontSize: 13 } },
        "Aucune pharmacie disponible pour cette option"
      )
    ),

    /* Total + confirm */
    React.createElement("div", { style: { position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 480, margin: "0 auto", padding: "12px 22px 20px", background: "white", borderTop: "1px solid " + PD.grey200, zIndex: 100 } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" } },
        React.createElement("span", { style: { fontSize: 13, color: PD.textLight } }, "Sous-total"),
        React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: PD.text } }, subtotal.toFixed(2) + " €")
      ),
      fee > 0 && React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" } },
        React.createElement("span", { style: { fontSize: 13, color: PD.textLight } }, pd("deliveryFee")),
        React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: PD.text } }, fee.toFixed(2) + " €")
      ),
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "8px 0 12px", borderTop: "1px solid " + PD.grey100, marginTop: 4 } },
        React.createElement("span", { style: { fontSize: 14, fontWeight: 700, color: PD.text } }, "Total"),
        React.createElement("span", { style: { fontSize: 17, fontWeight: 800, color: PD.green } }, (subtotal + fee).toFixed(2) + " €")
      ),
      React.createElement(PdBtn, { variant: "primary", size: "lg", fullWidth: true, onClick: confirm },
        Pdi.check, pd("sendToPharmacy")
      )
    )
  );
}

/* === ORDERS LIST === */
function OrdersScreen(props) {
  var orders = pdGetOrders();
  var active = orders.filter(function(o) { return o.status !== PD_ORDER_STATUS.COLLECTED && o.status !== PD_ORDER_STATUS.CANCELLED; });
  var history = orders.filter(function(o) { return o.status === PD_ORDER_STATUS.COLLECTED || o.status === PD_ORDER_STATUS.CANCELLED; });

  return React.createElement("div", { style: { paddingBottom: 100 } },
    React.createElement("div", { style: { padding: "14px 22px", background: "white", borderBottom: "1px solid " + PD.grey200, display: "flex", alignItems: "center", gap: 12 } },
      React.createElement("div", { style: { flex: 1, fontSize: 20, fontWeight: 800, color: PD.text } }, pd("orderTitle"))
    ),

    active.length === 0 && history.length === 0 && React.createElement("div", { style: { textAlign: "center", padding: 60, color: PD.textLight } },
      React.createElement("div", { style: { fontSize: 50, marginBottom: 12 } }, "📦"),
      React.createElement("div", { style: { fontSize: 14, fontWeight: 700 } }, pd("noOrders"))
    ),

    active.length > 0 && React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() },
        React.createElement("div", { style: sectionTitleStyle() }, pd("activeOrders"))
      ),
      React.createElement("div", { style: { padding: "0 22px", display: "flex", flexDirection: "column", gap: 10 } },
        active.map(function(o) { return orderRow(o, props.onOpen); })
      )
    ),

    history.length > 0 && React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() },
        React.createElement("div", { style: sectionTitleStyle() }, pd("historyOrders"))
      ),
      React.createElement("div", { style: { padding: "0 22px", display: "flex", flexDirection: "column", gap: 10, opacity: 0.7 } },
        history.slice(0, 10).map(function(o) { return orderRow(o, props.onOpen); })
      )
    )
  );
}

function orderRow(order, onClick) {
  var color = PD[pdOrderStatusColor(order.status)];
  return React.createElement(PdCard, {
    key: order.id,
    onClick: function() { onClick(order.id); },
    style: { padding: 14, display: "flex", alignItems: "center", gap: 12 }
  },
    React.createElement("div", {
      style: { width: 44, height: 44, borderRadius: 12, background: color + "20", color: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }
    }, order.deliveryType === PD_DELIVERY.DELIVERY ? Pdi.truck : Pdi.pill),
    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
      React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: PD.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, order.pharmacyName),
      React.createElement("div", { style: { fontSize: 11, color: PD.textMuted, marginTop: 2 } }, pdFmtDateTime(order.createdAt)),
      React.createElement("div", { style: { fontSize: 12, color: color, fontWeight: 700, marginTop: 4 } }, pdOrderStatusLabel(order.status))
    ),
    React.createElement("span", { style: { color: PD.textMuted } }, Pdi.chevR)
  );
}

/* === ORDER TRACKING === */
function OrderTrackScreen(props) {
  var useState = React.useState;
  var useEffect = React.useEffect;
  var [tick, setTick] = useState(0);
  var order = pdFindOrder(props.orderId);

  useEffect(function() {
    var t = setInterval(function() {
      var o = pdFindOrder(props.orderId);
      if (o) { pdSimulateOrderProgress(o); setTick(Date.now()); }
    }, 3000);
    return function() { clearInterval(t); };
  }, [props.orderId]);

  if (!order) return null;
  var color = PD[pdOrderStatusColor(order.status)];

  var steps = order.deliveryType === PD_DELIVERY.DELIVERY ?
    [PD_ORDER_STATUS.SENT, PD_ORDER_STATUS.PREPARING, PD_ORDER_STATUS.READY, PD_ORDER_STATUS.DRIVER_ASSIGNED, PD_ORDER_STATUS.DELIVERING, PD_ORDER_STATUS.COLLECTED] :
    [PD_ORDER_STATUS.SENT, PD_ORDER_STATUS.PREPARING, PD_ORDER_STATUS.READY, PD_ORDER_STATUS.COLLECTED];
  var currentIdx = steps.indexOf(order.status);

  return React.createElement("div", { style: { paddingBottom: 120 } },
    React.createElement("div", { style: { padding: "14px 22px", background: "white", borderBottom: "1px solid " + PD.grey200, display: "flex", alignItems: "center", gap: 12 } },
      React.createElement("button", { onClick: props.onBack, style: iconBtnStyle() }, Pdi.back),
      React.createElement("div", { style: { flex: 1, fontSize: 16, fontWeight: 800, color: PD.text } }, pd("trackOrder"))
    ),

    /* Status hero */
    React.createElement("div", { style: { padding: "24px 22px", textAlign: "center" } },
      React.createElement("div", {
        style: { width: 80, height: 80, borderRadius: 24, background: color + "20", color: color, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }
      }, order.status === PD_ORDER_STATUS.READY ? "✓" : order.status === PD_ORDER_STATUS.COLLECTED ? "🎉" : "⏱"),
      React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: PD.text } }, pdOrderStatusLabel(order.status)),
      React.createElement("div", { style: { fontSize: 13, color: PD.textLight, marginTop: 6 } },
        order.status === PD_ORDER_STATUS.SENT ? pd("orderSentDesc") :
        order.status === PD_ORDER_STATUS.PREPARING ? (pd("estWait") + ": ~" + order.estPrepTime + " min") :
        order.status === PD_ORDER_STATUS.READY && order.deliveryType === PD_DELIVERY.PICKUP ? pd("showAtCounter") :
        order.status === PD_ORDER_STATUS.READY ? "En attente d'un livreur..." :
        order.status === PD_ORDER_STATUS.DRIVER_ASSIGNED ? (order.driverName + " — " + pd("driverOnWay")) :
        order.status === PD_ORDER_STATUS.DELIVERING ? pd("driverOnWay") :
        pdFmtDateTime(order.createdAt)
      )
    ),

    /* Progress timeline */
    React.createElement("div", { style: { padding: "0 22px 20px" } },
      React.createElement(PdCard, { style: { padding: 16 } },
        steps.map(function(st, i) {
          var done = i <= currentIdx;
          var isCurrent = i === currentIdx;
          return React.createElement("div", {
            key: st,
            style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", opacity: done ? 1 : 0.4 }
          },
            React.createElement("div", {
              style: {
                width: 26, height: 26, borderRadius: "50%",
                background: done ? PD.green : PD.grey200,
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, flexShrink: 0,
                boxShadow: isCurrent ? "0 0 0 4px " + PD.greenSoft : "none",
              }
            }, done ? "✓" : (i + 1)),
            React.createElement("div", { style: { flex: 1, color: PD.text, fontSize: 13, fontWeight: isCurrent ? 700 : 500 } }, pdOrderStatusLabel(st))
          );
        })
      )
    ),

    /* QR Code for pickup (when ready) */
    order.deliveryType === PD_DELIVERY.PICKUP &&
    (order.status === PD_ORDER_STATUS.READY) && React.createElement("div", { style: { padding: "0 22px 20px" } },
      React.createElement(PdCard, { style: { padding: 20, textAlign: "center" } },
        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: PD.text, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 } }, pd("orderQR")),
        React.createElement("div", {
          style: { display: "inline-block", padding: 16, background: "white", borderRadius: 16, border: "2px solid " + PD.green },
          dangerouslySetInnerHTML: { __html: pdQRSvg(order.qrCode, 180) }
        }),
        React.createElement("div", { style: { fontSize: 13, color: PD.textLight, marginTop: 14, letterSpacing: "0.1em", fontWeight: 700 } }, order.qrCode),
        React.createElement("div", { style: { fontSize: 12, color: PD.textMuted, marginTop: 6 } }, pd("showAtCounter"))
      )
    ),

    /* Delivery PIN for home delivery (visible once driver is assigned) */
    order.deliveryType === PD_DELIVERY.DELIVERY && order.deliveryPIN &&
    (order.status === PD_ORDER_STATUS.DRIVER_ASSIGNED ||
     order.status === PD_ORDER_STATUS.PICKED_UP ||
     order.status === PD_ORDER_STATUS.DELIVERING) && React.createElement("div", { style: { padding: "0 22px 20px" } },
      React.createElement(PdCard, { style: { padding: 24, textAlign: "center", border: "2px solid " + PD.green, background: PD.greenLight } },
        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: PD.greenDark, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 } }, "🔐 Code de livraison"),
        React.createElement("div", {
          style: {
            fontSize: 42, fontWeight: 800, color: PD.greenDark,
            letterSpacing: "0.3em", fontFamily: "'Plus Jakarta Sans',monospace",
            padding: "12px 0", background: "white", borderRadius: 14,
            margin: "0 auto", display: "inline-block",
            minWidth: 220, boxShadow: "inset 0 0 0 2px " + PD.greenMid,
          }
        }, order.deliveryPIN.split("").join(" ")),
        React.createElement("div", { style: { fontSize: 12, color: PD.textLight, marginTop: 14, lineHeight: 1.5, padding: "0 10px" } },
          "Communique ce code au livreur uniquement a la reception."
        ),
        React.createElement("div", { style: { fontSize: 11, color: PD.red, marginTop: 8, fontWeight: 700 } },
          "⚠️ Ne le partage JAMAIS avant d'avoir le colis en main."
        )
      )
    ),

    /* Details */
    React.createElement("div", { style: { padding: "0 22px" } },
      React.createElement(PdCard, { style: { padding: 16 } },
        proCard(pd("orderPharmacy"), order.pharmacyName),
        proCard(pd("delivery"), order.deliveryType === PD_DELIVERY.DELIVERY ? pd("deliveryOption") : pd("pickup")),
        proCard(pd("orderItems"), order.items.length + " article(s)"),
        proCard(pd("orderDate"), pdFmtDateTime(order.createdAt))
      )
    ),

    /* Cancel button */
    (order.status === PD_ORDER_STATUS.SENT || order.status === PD_ORDER_STATUS.PREPARING) && React.createElement("div", { style: { padding: "20px 22px" } },
      React.createElement(PdBtn, {
        variant: "danger", fullWidth: true,
        onClick: function() {
          if (confirm("Annuler cette commande ?")) {
            pdCancelOrder(order.id);
            pdToast(pd("orderCancelled"), "warning");
            props.onBack();
          }
        }
      }, Pdi.close, pd("orderCancel"))
    )
  );
}
