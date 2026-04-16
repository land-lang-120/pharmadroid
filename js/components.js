/* PharmaDroid — Shared React components */

/* === LOGO — Pharmacy droid === */
function PdLogo(props) {
  var size = props.size || 64;
  var fill = props.fill || PD.green;
  var bg = props.bg || "white";
  return React.createElement("svg", {
    width: size, height: (size * 130 / 120), viewBox: "0 0 120 130", fill: "none",
    style: { filter: "drop-shadow(0 4px 12px " + PD.greenGlow + ")" },
  },
    /* Antennas */
    React.createElement("line", { x1: 42, y1: 20, x2: 33, y2: 8, stroke: fill, "stroke-width": 3.5, "stroke-linecap": "round" }),
    React.createElement("circle", { cx: 31, cy: 6, r: 3.5, fill: fill }),
    React.createElement("line", { x1: 78, y1: 20, x2: 87, y2: 8, stroke: fill, "stroke-width": 3.5, "stroke-linecap": "round" }),
    React.createElement("circle", { cx: 89, cy: 6, r: 3.5, fill: fill }),
    /* Head */
    React.createElement("path", { d: "M26 44 C26 28 40 18 60 18 C80 18 94 28 94 44 L94 60 C94 65 90 68 85 68 L35 68 C30 68 26 65 26 60 Z", fill: fill }),
    React.createElement("circle", { cx: 45, cy: 42, r: 5, fill: bg }),
    React.createElement("circle", { cx: 75, cy: 42, r: 5, fill: bg }),
    /* Body (pharmacy box) */
    React.createElement("rect", { x: 28, y: 72, width: 64, height: 44, rx: 8, fill: fill }),
    /* Arms */
    React.createElement("rect", { x: 14, y: 72, width: 12, height: 34, rx: 6, fill: fill }),
    React.createElement("rect", { x: 94, y: 72, width: 12, height: 34, rx: 6, fill: fill }),
    /* Cross on body */
    React.createElement("rect", { x: 36, y: 85, width: 48, height: 18, rx: 4, fill: bg }),
    React.createElement("rect", { x: 51, y: 76, width: 18, height: 36, rx: 4, fill: bg }),
    /* Legs */
    React.createElement("rect", { x: 36, y: 118, width: 18, height: 10, rx: 5, fill: fill, opacity: 0.7 }),
    React.createElement("rect", { x: 66, y: 118, width: 18, height: 10, rx: 5, fill: fill, opacity: 0.7 })
  );
}

/* === ICONS (Lucide-inspired) === */
const Pdi = {
  home: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"}),React.createElement("path",{d:"M9 22V12h6v10"})),
  search: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("circle",{cx:11,cy:11,r:7}),React.createElement("path",{d:"M21 21l-4.35-4.35"})),
  scan: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M8 12h8"})),
  orders: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"})),
  profile: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"}),React.createElement("circle",{cx:12,cy:7,r:4})),
  back: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2.5,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M19 12H5M12 19l-7-7 7-7"})),
  close: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2.5,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M18 6L6 18M6 6l12 12"})),
  bell: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"})),
  plus: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2.5,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M12 5v14M5 12h14"})),
  settings: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("circle",{cx:12,cy:12,r:3}),React.createElement("path",{d:"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"})),
  pill: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("rect",{x:2,y:8,width:20,height:8,rx:4}),React.createElement("line",{x1:12,y1:8,x2:12,y2:16})),
  clock: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("circle",{cx:12,cy:12,r:10}),React.createElement("path",{d:"M12 6v6l4 2"})),
  shield: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z"})),
  check: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2.5,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M20 6L9 17l-5-5"})),
  warning: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"})),
  heart: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"})),
  chevR: React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2.5,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M9 18l6-6-6-6"})),
  chevL: React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2.5,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M15 18l-6-6 6-6"})),
  chevD: React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2.5,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M6 9l6 6 6-6"})),
  mapPin: React.createElement("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"}),React.createElement("circle",{cx:12,cy:10,r:3})),
  truck: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("rect",{x:1,y:3,width:15,height:13}),React.createElement("polygon",{points:"16 8 20 8 23 11 23 16 16 16 16 8"}),React.createElement("circle",{cx:5.5,cy:18.5,r:2.5}),React.createElement("circle",{cx:18.5,cy:18.5,r:2.5})),
  qr: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("rect",{x:3,y:3,width:7,height:7}),React.createElement("rect",{x:14,y:3,width:7,height:7}),React.createElement("rect",{x:3,y:14,width:7,height:7}),React.createElement("path",{d:"M14 14h3v3h-3zM17 17h4v4h-4z"})),
  camera: React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"}),React.createElement("circle",{cx:12,cy:13,r:4})),
  star: React.createElement("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"currentColor"},React.createElement("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"})),
  trash: React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"})),
  phone: React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("path",{d:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.339 1.85.573 2.81.7A2 2 0 0122 16.92z"})),
  info: React.createElement("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},React.createElement("circle",{cx:12,cy:12,r:10}),React.createElement("line",{x1:12,y1:16,x2:12,y2:12}),React.createElement("line",{x1:12,y1:8,x2:12.01,y2:8})),
};

/* === BUTTON === */
function PdBtn(props) {
  var variant = props.variant || "primary";
  var size = props.size || "md";
  var sizes = {
    sm: { padding: "8px 14px", fontSize: 12, borderRadius: 10 },
    md: { padding: "12px 20px", fontSize: 14, borderRadius: 12 },
    lg: { padding: "15px 26px", fontSize: 15, borderRadius: 14 },
    xl: { padding: "18px 32px", fontSize: 16, borderRadius: 16 },
  };
  var variants = {
    primary: {
      background: "linear-gradient(135deg, " + PD.green + ", " + PD.greenDark + ")",
      color: "white",
      border: "none",
      boxShadow: PD.shadowGreen,
    },
    secondary: {
      background: PD.grey100,
      color: PD.text,
      border: "none",
    },
    outline: {
      background: "transparent",
      color: PD.green,
      border: "1.5px solid " + PD.green,
    },
    danger: {
      background: "linear-gradient(135deg, " + PD.red + ", #E13247)",
      color: "white",
      border: "none",
    },
    ghost: {
      background: "transparent",
      color: PD.green,
      border: "none",
    },
  };
  var base = {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontWeight: 700,
    cursor: props.disabled ? "not-allowed" : "pointer",
    opacity: props.disabled ? 0.5 : 1,
    transition: "transform 0.12s, box-shadow 0.15s",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    userSelect: "none",
    width: props.fullWidth ? "100%" : "auto",
  };
  var style = Object.assign({}, base, sizes[size], variants[variant], props.style || {});
  return React.createElement("button", {
    onClick: props.disabled ? null : props.onClick,
    style: style,
    type: props.type || "button",
  }, props.children);
}

/* === CARD === */
function PdCard(props) {
  return React.createElement("div", {
    onClick: props.onClick,
    style: Object.assign({
      background: "white",
      borderRadius: 16,
      padding: 16,
      boxShadow: PD.shadow,
      cursor: props.onClick ? "pointer" : "default",
      transition: "transform 0.12s",
    }, props.style || {})
  }, props.children);
}

/* === TOAST === */
var _pdToastTimer = null;
function pdToast(msg, type) {
  type = type || "info";
  var el = document.getElementById("pd-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "pd-toast";
    document.body.appendChild(el);
  }
  var colors = { info: PD.green, success: PD.green, warning: PD.orange, error: PD.red };
  var bg = colors[type] || PD.green;
  el.textContent = msg;
  el.style.cssText =
    "position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:9999;" +
    "background:" + bg + ";color:white;padding:12px 22px;border-radius:14px;" +
    "font:600 14px 'Plus Jakarta Sans',sans-serif;" +
    "box-shadow:0 8px 24px rgba(0,0,0,0.15);opacity:1;" +
    "max-width:90%;text-align:center;transition:opacity .3s, transform .3s;";
  if (_pdToastTimer) clearTimeout(_pdToastTimer);
  _pdToastTimer = setTimeout(function() {
    if (el) { el.style.opacity = "0"; el.style.transform = "translateX(-50%) translateY(-20px)"; }
  }, 2600);
}

/* === SEVERITY BADGE === */
function PdSeverityBadge(props) {
  var sev = props.severity;
  var colorKey = pdSeverityColor(sev);
  var color = PD[colorKey];
  return React.createElement("span", {
    style: {
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 10px", borderRadius: 100,
      background: color + "20",
      color: color,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.03em",
      textTransform: "uppercase",
    }
  },
    sev >= 3 && "⚠ ",
    pdSeverityLabel(sev)
  );
}

/* === LOADER === */
function PdLoader(props) {
  var size = props.size || 24;
  return React.createElement("div", {
    style: {
      width: size, height: size,
      border: "3px solid " + PD.grey200,
      borderTopColor: PD.green,
      borderRadius: "50%",
      animation: "pdSpin 0.8s linear infinite",
    }
  });
}
