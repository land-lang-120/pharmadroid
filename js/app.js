/* PharmaDroid — Main App Orchestrator (React) */

function App() {
  var useState = React.useState;
  var useEffect = React.useEffect;

  var [view, setView] = useState("home");
  var [viewParams, setViewParams] = useState({});
  var [newReminderOpen, setNewReminderOpen] = useState(false);
  var [, forceRender] = useState(0);

  useEffect(function() {
    pdNotifPermRequest();
    pdScheduleAllReminders();
  }, []);

  function nav(v, params) {
    setView(v);
    setViewParams(params || {});
    window.scrollTo(0, 0);
  }

  /* Navigation handlers */
  var handlers = {
    onSearch: function() { nav("search"); },
    onScan: function(mode) { nav("scanner", { mode: mode }); },
    onCheck: function() { nav("checker"); },
    onReminders: function() { nav("reminders"); },
    onOrders: function() { nav("orders"); },
    onProfile: function() { nav("profile"); },
    onSettings: function() { nav("settings"); },
    onBell: function() { nav("orders"); },
    onOpenMed: function(medId) { nav("medDetail", { medId: medId }); },
    onOpenOrder: function(orderId) { nav("orderTrack", { orderId: orderId }); },
    onBack: function() { nav("home"); },
    onDriverReg: function() { nav("driverReg"); },
    onDriverDashboard: function() { nav("driverDashboard"); },
    onOrder: function(medId) {
      var med = pdFindMed(medId);
      if (!med) return;
      nav("checkout", { items: [{ medId: med.id, brand: med.brand, form: med.form, qty: 1, price: 2.50 }] });
    },
    onProceedOrder: function(items) { nav("checkout", { items: items }); },
    onOrderCreated: function(orderId) { nav("orderTrack", { orderId: orderId }); },
    onAddMed: function(cb) { /* Modal-less version: just go to search and rely on it */ nav("search"); },
    onLangChange: function() { forceRender(Date.now()); },
    onNew: function() { setNewReminderOpen(true); },
  };

  /* Render view */
  var screen;
  switch (view) {
    case "home":             screen = React.createElement(HomeScreen, Object.assign({}, handlers)); break;
    case "search":           screen = React.createElement(SearchScreen, handlers); break;
    case "medDetail":        screen = React.createElement(MedDetailScreen, Object.assign({}, handlers, { medId: viewParams.medId })); break;
    case "scanner":          screen = React.createElement(ScannerScreen, Object.assign({}, handlers, { mode: viewParams.mode })); break;
    case "checkout":         screen = React.createElement(CheckoutScreen, Object.assign({}, handlers, { items: viewParams.items })); break;
    case "orders":           screen = React.createElement(OrdersScreen, Object.assign({}, handlers, { onOpen: handlers.onOpenOrder })); break;
    case "orderTrack":       screen = React.createElement(OrderTrackScreen, Object.assign({}, handlers, { orderId: viewParams.orderId })); break;
    case "reminders":        screen = React.createElement(RemindersScreen, handlers); break;
    case "checker":          screen = React.createElement(InteractionsScreen, handlers); break;
    case "profile":          screen = React.createElement(ProfileScreen, handlers); break;
    case "settings":         screen = React.createElement(SettingsScreen, handlers); break;
    case "driverReg":        screen = React.createElement(DriverRegScreen, handlers); break;
    case "driverDashboard":  screen = React.createElement(DriverDashboardScreen, handlers); break;
    default:                 screen = React.createElement(HomeScreen, handlers);
  }

  /* Hide bottom nav on fullscreen views */
  var hideNav = view === "scanner" || view === "driverReg" || view === "medDetail" || view === "checkout" || view === "orderTrack";

  return React.createElement("div", { style: { maxWidth: 480, margin: "0 auto", minHeight: "100vh", position: "relative" } },
    screen,

    /* Bottom nav */
    !hideNav && React.createElement("div", {
      style: {
        position: "fixed", bottom: 0, left: 0, right: 0,
        maxWidth: 480, margin: "0 auto",
        background: "white", borderTop: "1px solid " + PD.grey200,
        display: "flex", alignItems: "center", justifyContent: "space-around",
        padding: "8px 0 14px", zIndex: 200,
        paddingBottom: "calc(14px + env(safe-area-inset-bottom))",
      }
    },
      navItem("home", pd("navHome"), Pdi.home, view, nav),
      navItem("search", pd("navSearch"), Pdi.search, view, nav),
      React.createElement("button", {
        onClick: function() { nav("scanner", { mode: PD_SCAN_MODE.PRESCRIPTION }); },
        style: {
          width: 52, height: 52, borderRadius: 18,
          background: "linear-gradient(135deg, " + PD.green + ", " + PD.greenDark + ")",
          border: "none", color: "white", cursor: "pointer", marginTop: -18,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: PD.shadowGreen,
        }
      }, Pdi.scan),
      navItem("orders", pd("navOrders"), Pdi.orders, view, nav),
      navItem("profile", pd("navProfile"), Pdi.profile, view, nav)
    ),

    /* Reminder modal */
    newReminderOpen && React.createElement(NewReminderSheet, { onClose: function() { setNewReminderOpen(false); forceRender(Date.now()); } })
  );
}

function navItem(id, label, icon, currentView, nav) {
  var active = currentView === id;
  return React.createElement("button", {
    onClick: function() { nav(id); },
    style: {
      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      background: "none", border: "none", cursor: "pointer", padding: "4px 10px",
      color: active ? PD.green : PD.textMuted,
      fontFamily: "inherit",
    }
  },
    icon,
    React.createElement("span", { style: { fontSize: 10, fontWeight: 700 } }, label),
    active && React.createElement("div", { style: { width: 4, height: 4, borderRadius: "50%", background: PD.green, marginTop: 1 } })
  );
}
