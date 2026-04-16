/* PharmaDroid — Reminders, Interactions Checker, Profile, Settings */

/* === REMINDERS SCREEN === */
function RemindersScreen(props) {
  var useState = React.useState;
  var [, forceRender] = useState(0);
  var reminders = pdGetReminders();
  var today = pdTodaysReminders();

  return React.createElement("div", { style: { paddingBottom: 100 } },
    React.createElement("div", { style: { padding: "14px 22px", background: "white", borderBottom: "1px solid " + PD.grey200, display: "flex", alignItems: "center", gap: 12 } },
      React.createElement("button", { onClick: props.onBack, style: iconBtnStyle() }, Pdi.back),
      React.createElement("div", { style: { flex: 1, fontSize: 20, fontWeight: 800, color: PD.text } }, pd("reminders"))
    ),

    /* Today's schedule */
    React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() }, React.createElement("div", { style: sectionTitleStyle() }, pd("today"))),
      React.createElement("div", { style: { padding: "0 22px" } },
        today.length === 0 && React.createElement("div", { style: { textAlign: "center", padding: 30, color: PD.textLight } },
          React.createElement("div", { style: { fontSize: 40, marginBottom: 10 } }, "🌿"),
          React.createElement("div", { style: { fontSize: 13, fontWeight: 600 } }, pd("noReminders"))
        ),
        today.map(function(d, i) {
          return React.createElement(PdCard, {
            key: d.reminder.id + "_" + i,
            style: { padding: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 12, opacity: d.isPast ? 0.55 : 1 }
          },
            React.createElement("div", {
              style: { width: 50, height: 50, borderRadius: 12, background: PD.purpleSoft, color: PD.purple, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }
            }, d.time),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: PD.text } }, d.reminder.brand),
              React.createElement("div", { style: { fontSize: 12, color: PD.textLight, marginTop: 2 } }, d.reminder.dose || "")
            ),
            !d.isPast && React.createElement(PdBtn, {
              size: "sm", variant: "outline",
              onClick: function() { pdLogReminderAction(d.reminder.id, "taken"); pdToast(pd("taken") + " ✓", "success"); forceRender(Date.now()); }
            }, pd("taken"))
          );
        })
      )
    ),

    /* All reminders */
    React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() },
        React.createElement("div", { style: sectionTitleStyle() }, pd("reminders")),
        React.createElement("div", { style: sectionLinkStyle(), onClick: function() { props.onNew(); } }, "+ " + pd("newReminder"))
      ),
      React.createElement("div", { style: { padding: "0 22px", display: "flex", flexDirection: "column", gap: 10 } },
        reminders.map(function(rem) {
          return React.createElement(PdCard, {
            key: rem.id,
            style: { padding: 14 }
          },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
              React.createElement("div", { style: { fontSize: 22 } }, "💊"),
              React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: PD.text } }, rem.brand),
                React.createElement("div", { style: { fontSize: 12, color: PD.textLight, marginTop: 2 } },
                  (rem.times || []).join(" • ") + " • " + pd("freq" + (rem.frequency || "Daily").charAt(0).toUpperCase() + (rem.frequency || "Daily").slice(1))
                )
              ),
              React.createElement("button", {
                onClick: function() { pdDeleteReminder(rem.id); forceRender(Date.now()); pdScheduleAllReminders(); },
                style: { width: 34, height: 34, borderRadius: 10, background: PD.redSoft, border: "none", color: PD.red, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }
              }, Pdi.trash)
            )
          );
        })
      )
    )
  );
}

/* === NEW REMINDER MODAL === */
function NewReminderSheet(props) {
  var useState = React.useState;
  var [medId, setMedId] = useState("");
  var [time, setTime] = useState("08:00");
  var [dose, setDose] = useState("");
  var [freq, setFreq] = useState(PD_FREQ.DAILY);

  var meds = pdGetMyMeds().map(pdFindMed).filter(Boolean);
  if (meds.length === 0) meds = PD_MEDS.slice(0, 8);

  function save() {
    var med = pdFindMed(medId) || meds[0];
    if (!med) return;
    pdAddReminder({
      medId: med.id, brand: med.brand, time: time, times: [time],
      frequency: freq, dose: dose, notifications: true,
    });
    pdScheduleAllReminders();
    pdToast(pd("save") + " ✓", "success");
    props.onClose();
  }

  return React.createElement("div", {
    style: { position: "fixed", inset: 0, zIndex: 500, background: "rgba(30,45,58,0.6)", display: "flex", alignItems: "flex-end" }
  },
    React.createElement("div", {
      onClick: function(e) { e.stopPropagation(); },
      style: { background: "white", width: "100%", maxWidth: 480, margin: "0 auto", borderRadius: "24px 24px 0 0", padding: "20px 22px 30px", maxHeight: "85vh", overflowY: "auto" }
    },
      React.createElement("div", { style: { width: 40, height: 4, borderRadius: 4, background: PD.grey200, margin: "0 auto 20px" } }),
      React.createElement("h3", { style: { margin: "0 0 18px", fontSize: 18, fontWeight: 800, color: PD.text } }, pd("newReminder")),

      React.createElement("label", { style: labelStyle() }, pd("myMeds")),
      React.createElement("select", {
        value: medId, onChange: function(e) { setMedId(e.target.value); },
        style: inputStyle(),
      },
        React.createElement("option", { value: "" }, "— Choisir —"),
        meds.map(function(m) { return React.createElement("option", { key: m.id, value: m.id }, m.brand); })
      ),

      React.createElement("label", { style: labelStyle() }, pd("reminderTime")),
      React.createElement("input", { type: "time", value: time, onChange: function(e) { setTime(e.target.value); }, style: inputStyle() }),

      React.createElement("label", { style: labelStyle() }, pd("reminderDose")),
      React.createElement("input", { value: dose, onChange: function(e) { setDose(e.target.value); }, placeholder: "1 comprime", style: inputStyle() }),

      React.createElement("label", { style: labelStyle() }, pd("reminderFreq")),
      React.createElement("select", {
        value: freq, onChange: function(e) { setFreq(e.target.value); }, style: inputStyle()
      },
        [{v:"once",l:pd("freqOnce")},{v:"daily",l:pd("freqDaily")},{v:"twice",l:pd("freqTwice")},{v:"thrice",l:pd("freqThrice")},{v:"weekly",l:pd("freqWeekly")},{v:"asNeeded",l:pd("freqAsNeeded")}].map(function(o){
          return React.createElement("option", { key: o.v, value: o.v }, o.l);
        })
      ),

      React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
        React.createElement(PdBtn, { variant: "secondary", fullWidth: true, onClick: props.onClose }, pd("cancel")),
        React.createElement(PdBtn, { variant: "primary", fullWidth: true, onClick: save, disabled: !medId }, pd("save"))
      )
    )
  );
}

function labelStyle() {
  return { display: "block", fontSize: 12, fontWeight: 700, color: PD.textLight, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 14, marginBottom: 6 };
}
function inputStyle() {
  return {
    width: "100%", padding: "12px 14px", borderRadius: 12,
    border: "1px solid " + PD.grey200, background: PD.grey50,
    outline: "none", fontFamily: "inherit", fontSize: 14, color: PD.text,
    boxSizing: "border-box",
  };
}

/* === INTERACTIONS CHECKER === */
function InteractionsScreen(props) {
  var useState = React.useState;
  var [selected, setSelected] = useState(pdGetMyMeds());
  var [, forceRender] = useState(0);
  var meds = selected.map(pdFindMed).filter(Boolean);
  var results = pdCheckInteractions(meds);

  return React.createElement("div", { style: { paddingBottom: 100 } },
    React.createElement("div", { style: { padding: "14px 22px", background: "white", borderBottom: "1px solid " + PD.grey200, display: "flex", alignItems: "center", gap: 12 } },
      React.createElement("button", { onClick: props.onBack, style: iconBtnStyle() }, Pdi.back),
      React.createElement("div", { style: { flex: 1, fontSize: 18, fontWeight: 800, color: PD.text } }, pd("interactionChecker"))
    ),

    /* Selected meds */
    React.createElement("div", { style: { padding: "16px 22px" } },
      React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: PD.textLight, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 } },
        "Medicaments (" + meds.length + ")"
      ),
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
        meds.map(function(m) {
          return React.createElement("div", {
            key: m.id,
            style: { display: "inline-flex", alignItems: "center", gap: 6, background: PD.greenLight, border: "1px solid " + PD.greenMid, padding: "6px 12px 6px 10px", borderRadius: 100 }
          },
            React.createElement("span", null, m.emoji || "💊"),
            React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: PD.text } }, m.brand),
            React.createElement("button", {
              onClick: function() { setSelected(selected.filter(function(id) { return id !== m.id; })); },
              style: { background: "none", border: "none", color: PD.textMuted, cursor: "pointer", fontSize: 16, padding: 0, marginLeft: 4 }
            }, "×")
          );
        }),
        React.createElement("button", {
          onClick: function() { props.onAddMed(function(medId) { setSelected(selected.concat([medId])); }); },
          style: { display: "inline-flex", alignItems: "center", gap: 6, background: "white", border: "1.5px dashed " + PD.green, padding: "6px 12px", borderRadius: 100, color: PD.green, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }
        }, "+ " + pd("add"))
      )
    ),

    /* Results */
    React.createElement("div", { style: { padding: "10px 22px" } },
      meds.length < 2 && React.createElement(PdCard, { style: { padding: 18, textAlign: "center", color: PD.textLight } },
        React.createElement("div", { style: { fontSize: 32, marginBottom: 8 } }, "💊+💊"),
        React.createElement("div", { style: { fontSize: 14, fontWeight: 600 } }, pd("addMedsToCheck"))
      ),
      meds.length >= 2 && results.length === 0 && React.createElement(PdCard, {
        style: { padding: 18, textAlign: "center", background: PD.greenLight, border: "1px solid " + PD.greenMid }
      },
        React.createElement("div", { style: { fontSize: 40, marginBottom: 8 } }, "✅"),
        React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: PD.greenDark } }, pd("noInteractions")),
        React.createElement("div", { style: { fontSize: 12, color: PD.green, marginTop: 4 } }, pd("sevNoneDesc"))
      ),
      meds.length >= 2 && results.length > 0 && React.createElement("div", null,
        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: PD.text, marginBottom: 10 } },
          results.length + " " + pd("interactionsFound")
        ),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
          results.map(function(r, i) {
            var colorKey = pdSeverityColor(r.severity);
            var color = PD[colorKey];
            return React.createElement(PdCard, {
              key: i,
              style: { padding: 16, borderLeft: "4px solid " + color }
            },
              React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } },
                React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: PD.text } }, r.medA.brand + " + " + r.medB.brand),
                React.createElement(PdSeverityBadge, { severity: r.severity })
              ),
              React.createElement("div", { style: { fontSize: 13, color: PD.text, lineHeight: 1.5 } },
                _pdLang === "en" ? r.reason_en : r.reason_fr
              ),
              r.severity >= 3 && React.createElement("div", {
                style: { marginTop: 10, padding: "8px 12px", borderRadius: 10, background: color + "15", color: color, fontSize: 12, fontWeight: 700 }
              }, "⚠️ " + pd("askPharmacist"))
            );
          })
        )
      )
    )
  );
}

/* === PROFILE === */
function ProfileScreen(props) {
  var useState = React.useState;
  var [profile, setProfile] = useState(pdGetProfile());
  var [editing, setEditing] = useState(false);

  function save() {
    pdSetProfile(profile);
    setEditing(false);
    pdToast(pd("save") + " ✓", "success");
  }

  return React.createElement("div", { style: { paddingBottom: 100 } },
    React.createElement("div", { style: { padding: "14px 22px", background: "white", borderBottom: "1px solid " + PD.grey200, display: "flex", alignItems: "center", gap: 12 } },
      React.createElement("button", { onClick: props.onBack, style: iconBtnStyle() }, Pdi.back),
      React.createElement("div", { style: { flex: 1, fontSize: 18, fontWeight: 800, color: PD.text } }, pd("profile")),
      !editing && React.createElement(PdBtn, { size: "sm", variant: "ghost", onClick: function() { setEditing(true); } }, pd("edit")),
      editing && React.createElement(PdBtn, { size: "sm", variant: "primary", onClick: save }, pd("save"))
    ),

    /* Avatar */
    React.createElement("div", { style: { padding: "24px 22px", textAlign: "center" } },
      React.createElement("div", {
        style: { width: 90, height: 90, borderRadius: 26, background: "linear-gradient(135deg, " + PD.green + ", " + PD.greenDark + ")", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 36, fontWeight: 800, margin: "0 auto 12px", boxShadow: PD.shadowGreen }
      }, (profile.name || "U").substring(0, 1).toUpperCase()),
      React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: PD.text } }, profile.name || pd("name")),
      profile.age && React.createElement("div", { style: { fontSize: 13, color: PD.textLight, marginTop: 4 } }, profile.age + " " + pd("age"))
    ),

    /* Form */
    React.createElement("div", { style: { padding: "0 22px", display: "flex", flexDirection: "column", gap: 4 } },
      profileField(pd("name"), profile.name, editing, function(v) { setProfile(Object.assign({}, profile, { name: v })); }),
      profileField(pd("age"), profile.age, editing, function(v) { setProfile(Object.assign({}, profile, { age: parseInt(v) || null })); }, "number"),
      profileField(pd("weight") + " (kg)", profile.weight, editing, function(v) { setProfile(Object.assign({}, profile, { weight: parseFloat(v) || null })); }, "number"),
      profileField(pd("height") + " (cm)", profile.height, editing, function(v) { setProfile(Object.assign({}, profile, { height: parseFloat(v) || null })); }, "number"),
      profileField(pd("phoneNumber"), profile.phone, editing, function(v) { setProfile(Object.assign({}, profile, { phone: v })); }),
      profileField(pd("address"), profile.address, editing, function(v) { setProfile(Object.assign({}, profile, { address: v })); }),
      profileField(pd("allergies"), (profile.allergies || []).join(", "), editing, function(v) { setProfile(Object.assign({}, profile, { allergies: v.split(",").map(function(s) { return s.trim(); }).filter(Boolean) })); }),
      profileField(pd("conditions"), (profile.conditions || []).join(", "), editing, function(v) { setProfile(Object.assign({}, profile, { conditions: v.split(",").map(function(s) { return s.trim(); }).filter(Boolean) })); })
    ),

    /* Become driver / Driver dashboard */
    React.createElement("div", { style: { padding: "20px 22px" } },
      pdGetDriverProfile().verified === PD_VERIF.NONE && React.createElement(PdCard, {
        onClick: props.onDriverReg,
        style: { background: "linear-gradient(135deg," + PD.green + "," + PD.greenDark + ")", color: "white", padding: 18, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }
      },
        React.createElement("div", { style: { fontSize: 32 } }, "🚴"),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { fontSize: 15, fontWeight: 800 } }, pd("becomeDriver")),
          React.createElement("div", { style: { fontSize: 12, opacity: 0.85, marginTop: 2 } }, pd("becomeDriverDesc"))
        ),
        Pdi.chevR
      ),
      pdGetDriverProfile().verified === PD_VERIF.PENDING && React.createElement(PdCard, {
        style: { padding: 16, background: PD.yellowSoft, borderLeft: "3px solid " + PD.yellow }
      },
        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: PD.text } }, "⏳ " + pd("verifPending")),
        React.createElement("div", { style: { fontSize: 12, color: PD.textLight, marginTop: 4 } }, pd("verifPendingDesc"))
      ),
      pdGetDriverProfile().verified === PD_VERIF.APPROVED && React.createElement(PdCard, {
        onClick: props.onDriverDashboard,
        style: { padding: 14, display: "flex", alignItems: "center", gap: 12, background: PD.greenLight, border: "1px solid " + PD.greenMid, cursor: "pointer" }
      },
        React.createElement("div", { style: { fontSize: 28 } }, "✅"),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: PD.greenDark } }, pd("verifApproved")),
          React.createElement("div", { style: { fontSize: 12, color: PD.green, marginTop: 2 } }, pd("driverDashboard"))
        ),
        Pdi.chevR
      )
    ),

    /* Settings link */
    React.createElement("div", { style: { padding: "0 22px" } },
      React.createElement(PdCard, {
        onClick: props.onSettings,
        style: { padding: 14, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }
      },
        React.createElement("span", { style: { color: PD.textLight } }, Pdi.settings),
        React.createElement("span", { style: { flex: 1, color: PD.text, fontSize: 14, fontWeight: 600 } }, pd("settings")),
        React.createElement("span", { style: { color: PD.textMuted } }, Pdi.chevR)
      )
    )
  );
}

function profileField(label, value, editing, onChange, type) {
  return React.createElement(PdCard, { style: { padding: "12px 14px", marginBottom: 8 } },
    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: PD.textLight, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 } }, label),
    editing ? React.createElement("input", {
      value: value || "", type: type || "text",
      onChange: function(e) { onChange(e.target.value); },
      style: { width: "100%", border: "none", outline: "none", fontFamily: "inherit", fontSize: 14, color: PD.text, background: "transparent", padding: 0 }
    }) : React.createElement("div", { style: { fontSize: 14, color: value ? PD.text : PD.textMuted, fontWeight: value ? 600 : 400 } }, value || "—")
  );
}

/* === SETTINGS === */
function SettingsScreen(props) {
  var useState = React.useState;
  var [, forceRender] = useState(0);
  var settings = pdGetSettings();

  function toggle(key) {
    settings[key] = !settings[key];
    pdSetSettings(settings);
    forceRender(Date.now());
  }

  return React.createElement("div", { style: { paddingBottom: 100 } },
    React.createElement("div", { style: { padding: "14px 22px", background: "white", borderBottom: "1px solid " + PD.grey200, display: "flex", alignItems: "center", gap: 12 } },
      React.createElement("button", { onClick: props.onBack, style: iconBtnStyle() }, Pdi.back),
      React.createElement("div", { style: { flex: 1, fontSize: 18, fontWeight: 800, color: PD.text } }, pd("settings"))
    ),

    /* App mode */
    React.createElement("div", { style: { padding: "20px 22px" } },
      React.createElement("div", { style: sectionSubStyle() }, pd("appMode")),
      React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
        [
          { id: PD_MODE.PATIENT, icon: "👤", title: pd("modePatient"), desc: pd("modePatientDesc") },
          { id: PD_MODE.PRO, icon: "⚕️", title: pd("modePro"), desc: pd("modeProDesc") },
        ].map(function(m) {
          var sel = settings.mode === m.id;
          return React.createElement("div", {
            key: m.id,
            onClick: function() { settings.mode = m.id; pdSetSettings(settings); forceRender(Date.now()); },
            style: { flex: 1, padding: 14, borderRadius: 14, cursor: "pointer", background: sel ? PD.greenLight : "white", border: "2px solid " + (sel ? PD.green : PD.grey200) }
          },
            React.createElement("div", { style: { fontSize: 22, marginBottom: 6 } }, m.icon),
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: PD.text } }, m.title),
            React.createElement("div", { style: { fontSize: 11, color: PD.textLight, marginTop: 3 } }, m.desc)
          );
        })
      )
    ),

    /* Language */
    React.createElement("div", { style: { padding: "10px 22px" } },
      React.createElement("div", { style: sectionSubStyle() }, pd("language")),
      React.createElement(PdCard, { style: { padding: 8, marginTop: 10 } },
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 } },
          PD_LANGS.map(function(lang) {
            var active = _pdLang === lang.code;
            return React.createElement("button", {
              key: lang.code,
              onClick: function() { pdSetLang(lang.code); forceRender(Date.now()); if (props.onLangChange) props.onLangChange(); },
              style: { padding: "10px 12px", borderRadius: 10, background: active ? PD.greenLight : "transparent", border: "none", color: active ? PD.greenDark : PD.text, fontSize: 12, fontWeight: active ? 800 : 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-start" }
            },
              React.createElement("span", null, lang.flag),
              React.createElement("span", null, lang.name)
            );
          })
        )
      )
    ),

    /* Toggles */
    React.createElement("div", { style: { padding: "10px 22px" } },
      React.createElement("div", { style: sectionSubStyle() }, pd("notifications")),
      React.createElement(PdCard, { style: { padding: 4, marginTop: 10 } },
        [
          { key: "notifications", label: pd("notifications"), icon: "🔔" },
          { key: "sound", label: pd("sound") || "Son", icon: "🔊" },
          { key: "darkMode", label: pd("darkMode"), icon: "🌙" },
        ].map(function(opt, i) {
          var on = !!settings[opt.key];
          return React.createElement("div", {
            key: opt.key,
            onClick: function() { toggle(opt.key); },
            style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer", borderBottom: i < 2 ? "1px solid " + PD.grey100 : "none" }
          },
            React.createElement("span", { style: { fontSize: 18 } }, opt.icon),
            React.createElement("span", { style: { flex: 1, color: PD.text, fontSize: 14, fontWeight: 600 } }, opt.label),
            React.createElement("div", { style: { width: 38, height: 22, borderRadius: 100, background: on ? PD.green : PD.grey200, position: "relative", transition: "background 0.2s" } },
              React.createElement("div", { style: { width: 16, height: 16, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: on ? 19 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" } })
            )
          );
        })
      )
    ),

    /* About */
    React.createElement("div", { style: { padding: "10px 22px 30px" } },
      React.createElement("div", { style: sectionSubStyle() }, pd("about")),
      React.createElement(PdCard, { style: { padding: 14, marginTop: 10 } },
        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: PD.text } }, PD_APP_NAME),
        React.createElement("div", { style: { fontSize: 12, color: PD.textLight, marginTop: 4 } }, "Version " + PD_VERSION),
        React.createElement("div", { style: { fontSize: 11, color: PD.textMuted, marginTop: 4 } }, "CloneX Studio")
      ),
      React.createElement("button", {
        onClick: function() {
          if (confirm(pd("resetConfirm") || "Tout reinitialiser ?")) {
            pdResetAll();
            location.reload();
          }
        },
        style: { marginTop: 12, width: "100%", padding: "12px", borderRadius: 12, border: "1px solid " + PD.red, background: "transparent", color: PD.red, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }
      }, pd("resetData"))
    )
  );
}

function sectionSubStyle() {
  return { fontSize: 12, fontWeight: 700, color: PD.textLight, textTransform: "uppercase", letterSpacing: "0.05em" };
}
