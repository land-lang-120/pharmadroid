/* PharmaDroid — Main screens (Home, Search, MedDetail) */

/* === HOME SCREEN === */
function HomeScreen(props) {
  var profile = pdGetProfile();
  var myMeds = pdGetMyMeds();
  var activeOrders = pdGetActiveOrders();
  var todaysDoses = pdTodaysReminders();
  var upcomingDoses = todaysDoses.filter(function(d) { return !d.isPast; }).slice(0, 3);
  var nearby = pdNearbyPharmacies(5).slice(0, 3);
  var driverProfile = pdGetDriverProfile();
  var isDriver = pdIsDriverApproved();

  return React.createElement("div", { style: { paddingBottom: 100 } },
    /* Header */
    React.createElement("div", { style: {
      background: "white", padding: "16px 22px 22px",
      borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
      boxShadow: PD.shadow,
    } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 } },
        React.createElement("div", null,
          React.createElement("div", { style: { color: PD.textMuted, fontSize: 12, fontWeight: 600 } }, pdGreeting()),
          React.createElement("div", { style: { color: PD.text, fontSize: 22, fontWeight: 800, marginTop: 2 } },
            profile.name || "Bonjour 👋"
          )
        ),
        React.createElement("div", { style: { display: "flex", gap: 10 } },
          React.createElement("button", { onClick: props.onBell, style: iconBtnStyle() },
            Pdi.bell,
            React.createElement("span", { style: notifDotStyle(activeOrders.length > 0) })
          ),
          React.createElement("button", {
            onClick: props.onProfile,
            style: {
              width: 42, height: 42, borderRadius: 14,
              background: "linear-gradient(135deg, " + PD.green + ", " + PD.greenDark + ")",
              border: "none", color: "white", fontSize: 15, fontWeight: 800,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }
          }, (profile.name || "U").substring(0, 1).toUpperCase())
        )
      ),

      /* Search bar */
      React.createElement("div", {
        onClick: props.onSearch,
        style: {
          display: "flex", alignItems: "center", gap: 10,
          background: PD.grey100, borderRadius: 14, padding: "12px 14px",
          cursor: "pointer",
        }
      },
        React.createElement("span", { style: { color: PD.textMuted } }, Pdi.search),
        React.createElement("span", { style: { flex: 1, color: PD.textMuted, fontSize: 14 } }, pd("searchPlaceholder"))
      )
    ),

    /* Quick actions */
    React.createElement("div", { style: sectionHdStyle() },
      React.createElement("div", { style: sectionTitleStyle() }, pd("quickActions"))
    ),
    React.createElement("div", { style: { padding: "0 22px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
      quickActionCard("🎫", pd("scanPrescription"), pd("scanPrescDesc"), PD.green, function() { props.onScan("prescription"); }),
      quickActionCard("💊", pd("checkMed"), pd("scanBarcode"), PD.blue, function() { props.onScan("barcode"); }),
      quickActionCard("⚠️", pd("checkInteractions"), "", PD.orange, function() { props.onCheck(); }),
      quickActionCard("⏰", pd("mySchedule"), pd("upcomingReminders"), PD.purple, function() { props.onReminders(); })
    ),

    /* Active orders */
    activeOrders.length > 0 && React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() },
        React.createElement("div", { style: sectionTitleStyle() }, pd("activeOrders")),
        React.createElement("div", { style: sectionLinkStyle(), onClick: props.onOrders }, pd("seeAll"))
      ),
      React.createElement("div", { style: { padding: "0 22px", display: "flex", flexDirection: "column", gap: 10 } },
        activeOrders.slice(0, 2).map(function(order) {
          var color = PD[pdOrderStatusColor(order.status)];
          return React.createElement(PdCard, {
            key: order.id,
            onClick: function() { props.onOpenOrder(order.id); },
            style: { display: "flex", alignItems: "center", gap: 12, padding: 14 },
          },
            React.createElement("div", {
              style: {
                width: 44, height: 44, borderRadius: 12,
                background: color + "20", color: color,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }
            }, order.deliveryType === PD_DELIVERY.DELIVERY ? Pdi.truck : Pdi.pill),
            React.createElement("div", { style: { flex: 1, minWidth: 0 } },
              React.createElement("div", { style: { color: PD.text, fontSize: 14, fontWeight: 700 } }, order.pharmacyName),
              React.createElement("div", { style: { color: color, fontSize: 12, fontWeight: 600, marginTop: 2 } },
                pdOrderStatusLabel(order.status)
              )
            ),
            React.createElement("span", { style: { color: PD.textMuted } }, Pdi.chevR)
          );
        })
      )
    ),

    /* Upcoming reminders */
    upcomingDoses.length > 0 && React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() },
        React.createElement("div", { style: sectionTitleStyle() }, pd("upcomingReminders")),
        React.createElement("div", { style: sectionLinkStyle(), onClick: props.onReminders }, pd("seeAll"))
      ),
      React.createElement("div", { style: { padding: "0 22px", display: "flex", flexDirection: "column", gap: 10 } },
        upcomingDoses.map(function(d) {
          return React.createElement(PdCard, {
            key: d.reminder.id + d.time,
            style: { display: "flex", alignItems: "center", gap: 12, padding: 14 }
          },
            React.createElement("div", {
              style: {
                width: 44, height: 44, borderRadius: 12,
                background: PD.purpleSoft, color: PD.purple,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
              }
            }, d.time),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { color: PD.text, fontSize: 14, fontWeight: 700 } }, d.reminder.brand),
              React.createElement("div", { style: { color: PD.textLight, fontSize: 12, marginTop: 2 } }, d.reminder.dose || "")
            )
          );
        })
      )
    ),

    /* My meds */
    React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() },
        React.createElement("div", { style: sectionTitleStyle() }, pd("myMeds")),
        React.createElement("div", { style: sectionLinkStyle(), onClick: props.onSearch }, pd("add"))
      ),
      React.createElement("div", { style: { padding: "0 22px" } },
        myMeds.length === 0 && React.createElement(PdCard, {
          onClick: props.onSearch,
          style: { textAlign: "center", padding: 20, border: "1.5px dashed " + PD.grey200, background: PD.grey50 }
        },
          React.createElement("div", { style: { fontSize: 28, marginBottom: 6 } }, "💊"),
          React.createElement("div", { style: { color: PD.textLight, fontSize: 13 } }, pd("noMeds"))
        ),
        myMeds.length > 0 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
          myMeds.slice(0, 4).map(function(medId) {
            var med = pdFindMed(medId);
            if (!med) return null;
            return React.createElement(MedRow, { key: medId, med: med, onClick: function() { props.onOpenMed(medId); } });
          })
        )
      )
    ),

    /* Nearby pharmacies */
    React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() },
        React.createElement("div", { style: sectionTitleStyle() }, pd("nearbyPharmacies"))
      ),
      React.createElement("div", { style: { padding: "0 22px", display: "flex", flexDirection: "column", gap: 10 } },
        nearby.map(function(ph) {
          return React.createElement(PharmacyRow, { key: ph.id, pharmacy: ph });
        })
      )
    ),

    /* Driver mode prompt */
    !isDriver && driverProfile.verified === PD_VERIF.NONE && React.createElement("div", { style: { padding: "0 22px", marginTop: 20 } },
      React.createElement(PdCard, {
        onClick: props.onDriverReg,
        style: {
          background: "linear-gradient(135deg, " + PD.green + ", " + PD.greenDark + ")",
          color: "white", padding: "18px 18px", display: "flex", alignItems: "center", gap: 14,
        }
      },
        React.createElement("div", { style: { fontSize: 32 } }, "🚴"),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { fontSize: 15, fontWeight: 800 } }, pd("becomeDriver")),
          React.createElement("div", { style: { fontSize: 12, opacity: 0.85, marginTop: 2 } }, pd("becomeDriverDesc"))
        ),
        React.createElement("span", { style: { color: "white" } }, Pdi.chevR)
      )
    ),

    /* Driver dashboard shortcut if approved */
    isDriver && React.createElement("div", { style: { padding: "0 22px", marginTop: 20 } },
      React.createElement(PdCard, {
        onClick: props.onDriverDashboard,
        style: {
          background: PD.greenLight, border: "1px solid " + PD.greenMid,
          padding: 14, display: "flex", alignItems: "center", gap: 12,
        }
      },
        React.createElement("div", {
          style: {
            width: 44, height: 44, borderRadius: 12, background: PD.green,
            color: "white", display: "flex", alignItems: "center", justifyContent: "center",
          }
        }, Pdi.truck),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: PD.text } }, pd("driverDashboard")),
          React.createElement("div", { style: { fontSize: 12, color: PD.textLight, marginTop: 2 } },
            pdGetDriverOnline() ? ("🟢 " + pd("driverOnline")) : ("⚪ " + pd("driverOffline"))
          )
        ),
        React.createElement("span", { style: { color: PD.textMuted } }, Pdi.chevR)
      )
    )
  );
}

function quickActionCard(emoji, title, subtitle, color, onClick) {
  return React.createElement("div", {
    onClick: onClick,
    style: {
      background: "white", borderRadius: 16, padding: 14,
      boxShadow: PD.shadow, cursor: "pointer", minHeight: 100,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      borderLeft: "3px solid " + color,
    }
  },
    React.createElement("div", { style: { fontSize: 24 } }, emoji),
    React.createElement("div", null,
      React.createElement("div", { style: { color: PD.text, fontSize: 13, fontWeight: 700, lineHeight: 1.25 } }, title),
      subtitle && React.createElement("div", { style: { color: PD.textLight, fontSize: 11, marginTop: 2 } }, subtitle)
    )
  );
}

function MedRow(props) {
  var med = props.med;
  var catInfo = pdCategoryInfo(med.category);
  return React.createElement(PdCard, {
    onClick: props.onClick,
    style: { display: "flex", alignItems: "center", gap: 12, padding: 14 }
  },
    React.createElement("div", {
      style: {
        width: 44, height: 44, borderRadius: 12, background: PD.greenLight,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
      }
    }, med.emoji || "💊"),
    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
      React.createElement("div", { style: { color: PD.text, fontSize: 14, fontWeight: 700 } }, med.brand),
      React.createElement("div", { style: { color: PD.textLight, fontSize: 12, marginTop: 2 } },
        med.dci + " • " + med.form
      )
    ),
    React.createElement("span", { style: { color: PD.textMuted } }, Pdi.chevR)
  );
}

function PharmacyRow(props) {
  var ph = props.pharmacy;
  return React.createElement(PdCard, {
    style: { display: "flex", alignItems: "center", gap: 12, padding: 14 }
  },
    React.createElement("div", {
      style: {
        width: 44, height: 44, borderRadius: 12, background: PD.greenLight,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
      }
    }, ph.emoji),
    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
      React.createElement("div", { style: { color: PD.text, fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ph.name),
      React.createElement("div", { style: { color: PD.textLight, fontSize: 12, marginTop: 2, display: "flex", alignItems: "center", gap: 6 } },
        React.createElement("span", { style: { color: PD.yellow, display: "inline-flex", alignItems: "center", gap: 2 } }, Pdi.star, ph.rating),
        "•",
        React.createElement("span", null, ph.distance + " km"),
        "•",
        React.createElement("span", { style: { color: ph.open ? PD.green : PD.red, fontWeight: 700 } }, ph.open ? "Ouverte" : "Fermee")
      )
    )
  );
}

function iconBtnStyle() {
  return {
    width: 42, height: 42, borderRadius: 14,
    background: PD.grey100, border: "none", color: PD.text,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", position: "relative",
  };
}
function notifDotStyle(active) {
  return {
    position: "absolute", top: 8, right: 9,
    width: 8, height: 8, borderRadius: "50%",
    background: active ? PD.red : "transparent",
    border: active ? "2px solid white" : "none",
  };
}
function sectionHdStyle() {
  return { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 22px 12px" };
}
function sectionTitleStyle() {
  return { color: PD.text, fontSize: 16, fontWeight: 800 };
}
function sectionLinkStyle() {
  return { color: PD.green, fontSize: 13, fontWeight: 700, cursor: "pointer" };
}

/* === SEARCH SCREEN === */
function SearchScreen(props) {
  var useState = React.useState;
  var [query, setQuery] = useState("");
  var [, forceRender] = useState(0);
  var results = query ? pdSearchMeds(query) : [];
  var history = pdGetHistory();

  return React.createElement("div", { style: { paddingBottom: 100 } },
    React.createElement("div", { style: {
      background: "white", padding: "14px 22px 18px", display: "flex", alignItems: "center", gap: 12,
      borderBottom: "1px solid " + PD.grey200,
    }},
      React.createElement("button", { onClick: props.onBack, style: iconBtnStyle() }, Pdi.back),
      React.createElement("div", { style: {
        flex: 1, display: "flex", alignItems: "center", gap: 10,
        background: PD.grey100, borderRadius: 14, padding: "10px 14px",
      }},
        React.createElement("span", { style: { color: PD.textMuted } }, Pdi.search),
        React.createElement("input", {
          autoFocus: true,
          value: query,
          onChange: function(e) { setQuery(e.target.value); },
          placeholder: pd("searchPlaceholder"),
          style: {
            flex: 1, border: "none", background: "transparent", outline: "none",
            fontSize: 14, fontFamily: "inherit", color: PD.text,
          }
        })
      )
    ),

    /* Categories (when no query) */
    !query && React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() },
        React.createElement("div", { style: sectionTitleStyle() }, pd("byCategory"))
      ),
      React.createElement("div", { style: { padding: "0 22px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 } },
        PD_CATEGORIES.map(function(cat) {
          return React.createElement("div", {
            key: cat.id,
            onClick: function() { setQuery(cat.id); },
            style: {
              background: "white", borderRadius: 14, padding: "14px 10px",
              boxShadow: PD.shadow, cursor: "pointer", textAlign: "center",
            }
          },
            React.createElement("div", { style: { fontSize: 26, marginBottom: 6 } }, cat.emoji),
            React.createElement("div", { style: { color: PD.text, fontSize: 11, fontWeight: 700, lineHeight: 1.3 } },
              cat.label[_pdLang] || cat.label.en
            )
          );
        })
      ),

      history.length > 0 && React.createElement("div", null,
        React.createElement("div", { style: sectionHdStyle() },
          React.createElement("div", { style: sectionTitleStyle() }, pd("recentSearches")),
          React.createElement("div", {
            style: sectionLinkStyle(),
            onClick: function() { pdClearHistory(); forceRender(Date.now()); }
          }, "×")
        ),
        React.createElement("div", { style: { padding: "0 22px", display: "flex", flexWrap: "wrap", gap: 8 } },
          history.map(function(q, i) {
            return React.createElement("button", {
              key: i,
              onClick: function() { setQuery(q); },
              style: {
                background: PD.grey100, border: "none", padding: "8px 14px",
                borderRadius: 100, fontSize: 13, color: PD.text, cursor: "pointer",
                fontFamily: "inherit", fontWeight: 600,
              }
            }, q);
          })
        )
      ),

      React.createElement("div", { style: sectionHdStyle() },
        React.createElement("div", { style: sectionTitleStyle() }, pd("popularMeds"))
      ),
      React.createElement("div", { style: { padding: "0 22px", display: "flex", flexDirection: "column", gap: 10 } },
        PD_MEDS.slice(0, 6).map(function(med) {
          return React.createElement(MedRow, {
            key: med.id, med: med,
            onClick: function() { pdAddToHistory(med.brand); props.onOpenMed(med.id); },
          });
        })
      )
    ),

    /* Results */
    query && React.createElement("div", { style: { padding: "14px 22px", display: "flex", flexDirection: "column", gap: 10 } },
      results.length === 0 && React.createElement("div", { style: { textAlign: "center", padding: 40, color: PD.textLight } },
        React.createElement("div", { style: { fontSize: 32, marginBottom: 8 } }, "🔍"),
        React.createElement("div", { style: { fontSize: 14, fontWeight: 600 } }, pd("noResults")),
        React.createElement("div", { style: { fontSize: 12, marginTop: 4 } }, pd("tryOther"))
      ),
      results.map(function(med) {
        return React.createElement(MedRow, {
          key: med.id, med: med,
          onClick: function() { pdAddToHistory(query); props.onOpenMed(med.id); },
        });
      })
    )
  );
}

/* === MEDICATION DETAIL SCREEN === */
function MedDetailScreen(props) {
  var useState = React.useState;
  var med = pdFindMed(props.medId);
  var settings = pdGetSettings();
  var [mode, setMode] = useState(settings.mode);
  var [fav, setFav] = useState(pdIsFavorite(props.medId));
  if (!med) return null;

  var info = med[mode] || med.patient;

  return React.createElement("div", { style: { paddingBottom: 120 } },
    /* Hero */
    React.createElement("div", { style: {
      background: "linear-gradient(180deg, " + PD.greenLight + ", white)",
      padding: "14px 22px 26px", position: "relative",
    }},
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 } },
        React.createElement("button", { onClick: props.onBack, style: iconBtnStyle() }, Pdi.back),
        React.createElement("div", { style: { display: "flex", gap: 8 } },
          React.createElement("button", {
            onClick: function() { var n = pdToggleFavorite(props.medId); setFav(n); },
            style: Object.assign({}, iconBtnStyle(), { color: fav ? PD.red : PD.textMuted })
          }, Pdi.heart),
          React.createElement("div", {
            style: {
              display: "inline-flex", gap: 0,
              background: PD.grey100, borderRadius: 100, padding: 3,
            }
          },
            React.createElement("button", {
              onClick: function() { setMode(PD_MODE.PATIENT); var s = pdGetSettings(); s.mode = PD_MODE.PATIENT; pdSetSettings(s); },
              style: {
                padding: "6px 12px", borderRadius: 100, border: "none",
                background: mode === PD_MODE.PATIENT ? PD.green : "transparent",
                color: mode === PD_MODE.PATIENT ? "white" : PD.textLight,
                fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }
            }, pd("simpleView")),
            React.createElement("button", {
              onClick: function() { setMode(PD_MODE.PRO); var s = pdGetSettings(); s.mode = PD_MODE.PRO; pdSetSettings(s); },
              style: {
                padding: "6px 12px", borderRadius: 100, border: "none",
                background: mode === PD_MODE.PRO ? PD.green : "transparent",
                color: mode === PD_MODE.PRO ? "white" : PD.textLight,
                fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }
            }, pd("techView"))
          )
        )
      ),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } },
        React.createElement("div", {
          style: {
            width: 72, height: 72, borderRadius: 20, background: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 34, boxShadow: PD.shadowMd,
          }
        }, med.emoji || "💊"),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { color: PD.text, fontSize: 22, fontWeight: 800 } }, med.brand),
          React.createElement("div", { style: { color: PD.textLight, fontSize: 13, marginTop: 2 } }, med.dci),
          React.createElement("div", { style: { color: PD.textMuted, fontSize: 12, marginTop: 4 } }, med.form + " • " + med.lab)
        )
      ),
      React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" } },
        React.createElement("span", { style: tagStyle(med.prescription ? PD.orange : PD.green) },
          med.prescription ? "🧾 " + pd("prescriptionRequired") : "✓ " + pd("otc")
        ),
        React.createElement("span", { style: tagStyle(PD.blue) }, med.form)
      )
    ),

    /* Patient view */
    mode === PD_MODE.PATIENT && React.createElement("div", { style: { padding: "20px 22px" } },
      infoCard("💡", pd("indications"), React.createElement("ul", { style: ulStyle() },
        info.indications.map(function(t, i) { return React.createElement("li", { key: i }, t); })
      )),
      infoCard("📋", pd("posology"), React.createElement("p", { style: { fontSize: 14, color: PD.text, lineHeight: 1.6 } }, info.howTo)),
      info.sideEffects && info.sideEffects.length > 0 && infoCard("⚠️", pd("sideEffects"),
        React.createElement("ul", { style: ulStyle() },
          info.sideEffects.map(function(t, i) { return React.createElement("li", { key: i }, t); })
        )
      ),
      info.warnings && info.warnings.length > 0 && infoCard("🚨", pd("warnings"),
        React.createElement("ul", { style: ulStyle() },
          info.warnings.map(function(t, i) { return React.createElement("li", { key: i }, t); })
        ), PD.orange
      ),
      info.description && infoCard("ℹ️", pd("appName"), React.createElement("p", { style: { fontSize: 14, color: PD.text, lineHeight: 1.6 } }, info.description))
    ),

    /* Pro view */
    mode === PD_MODE.PRO && React.createElement("div", { style: { padding: "20px 22px" } },
      proCard(pd("dci"), med.dci),
      proCard("ATC", info.atc),
      proCard(pd("posology"), info.posology),
      info.contraindications && infoCard("🚫", pd("contraIndications"),
        React.createElement("ul", { style: ulStyle() },
          info.contraindications.map(function(t, i) { return React.createElement("li", { key: i }, t); })
        ), PD.red
      ),
      info.interactions && infoCard("🔀", pd("interactions"),
        React.createElement("ul", { style: ulStyle() },
          info.interactions.map(function(t, i) { return React.createElement("li", { key: i }, t); })
        ), PD.orange
      ),
      info.pharmacology && infoCard("🧪", "Pharmacologie", React.createElement("p", { style: { fontSize: 13, color: PD.text, lineHeight: 1.6 } }, info.pharmacology))
    ),

    /* Action buttons sticky */
    React.createElement("div", { style: {
      position: "fixed", bottom: 70, left: 0, right: 0,
      maxWidth: 480, margin: "0 auto",
      padding: "12px 22px", background: "white",
      borderTop: "1px solid " + PD.grey200,
      display: "flex", gap: 10, zIndex: 100,
    }},
      React.createElement(PdBtn, {
        variant: "outline", fullWidth: true,
        onClick: function() { pdAddMyMed(props.medId); pdToast(pd("addToMyMeds") + " ✓", "success"); }
      }, Pdi.plus, pd("addToMyMeds")),
      React.createElement(PdBtn, {
        variant: "primary", fullWidth: true,
        onClick: function() { props.onOrder(props.medId); }
      }, Pdi.truck, pd("orderNow"))
    )
  );
}

function tagStyle(color) {
  return {
    display: "inline-block", padding: "4px 10px", borderRadius: 100,
    background: color + "20", color: color,
    fontSize: 11, fontWeight: 700,
  };
}
function infoCard(emoji, title, content, accentColor) {
  accentColor = accentColor || PD.green;
  return React.createElement(PdCard, { style: { marginBottom: 12, borderLeft: "3px solid " + accentColor, padding: 16 } },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } },
      React.createElement("span", { style: { fontSize: 16 } }, emoji),
      React.createElement("span", { style: { color: PD.text, fontSize: 13, fontWeight: 800, letterSpacing: "0.03em", textTransform: "uppercase" } }, title)
    ),
    content
  );
}
function proCard(label, value) {
  if (!value) return null;
  return React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid " + PD.grey100 } },
    React.createElement("span", { style: { color: PD.textLight, fontSize: 12, fontWeight: 600, textTransform: "uppercase" } }, label),
    React.createElement("span", { style: { color: PD.text, fontSize: 13, fontWeight: 700, textAlign: "right" } }, value)
  );
}
function ulStyle() {
  return { paddingLeft: 20, color: PD.text, fontSize: 14, lineHeight: 1.75 };
}
