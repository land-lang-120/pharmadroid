/* PharmaDroid — Driver screens (Registration, Dashboard) */

/* === DRIVER REGISTRATION === */
function DriverRegScreen(props) {
  var useState = React.useState;
  var useRef = React.useRef;
  var existing = pdGetDriverProfile();
  var [step, setStep] = useState(1);
  var [idFrontPhoto, setIdFrontPhoto] = useState(existing.idFrontPhoto || null);
  var [idBackPhoto, setIdBackPhoto] = useState(existing.idBackPhoto || null);
  var [selfiePhoto, setSelfiePhoto] = useState(existing.selfiePhoto || null);
  var [firstName, setFirstName] = useState(existing.firstName || "");
  var [lastName, setLastName] = useState(existing.lastName || "");
  var [birthDate, setBirthDate] = useState(existing.birthDate || "");
  var [phone, setPhone] = useState(existing.phone || "");
  var [address, setAddress] = useState(existing.address || "");
  var [vehicle, setVehicle] = useState(existing.vehicle || "car");
  var [submitting, setSubmitting] = useState(false);

  var fileInputRef = useRef(null);
  var [pickerFor, setPickerFor] = useState(null);

  function openFilePicker(field) {
    setPickerFor(field);
    setTimeout(function() { if (fileInputRef.current) fileInputRef.current.click(); }, 10);
  }

  function onFilePicked(e) {
    var file = e.target.files && e.target.files[0];
    if (!file || !pdIsImageFile(file)) { pdToast("Fichier invalide", "error"); return; }
    pdReadFileAsDataUrl(file).then(function(dataUrl) {
      if (pickerFor === "idFront") setIdFrontPhoto(dataUrl);
      else if (pickerFor === "idBack") setIdBackPhoto(dataUrl);
      else if (pickerFor === "selfie") setSelfiePhoto(dataUrl);
    });
    e.target.value = "";
  }

  function submit() {
    setSubmitting(true);
    var data = {
      idFrontPhoto: idFrontPhoto, idBackPhoto: idBackPhoto, selfiePhoto: selfiePhoto,
      firstName: firstName, lastName: lastName, birthDate: birthDate,
      phone: phone, address: address, vehicle: vehicle,
    };
    if (!pdVerificationComplete(data)) { pdToast("Complete tous les champs", "warning"); setSubmitting(false); return; }
    pdSubmitVerification(data);
    pdToast(pd("verifPending"), "info");
    setSubmitting(false);
    props.onBack();
  }

  return React.createElement("div", { style: { paddingBottom: 120 } },
    React.createElement("div", { style: { padding: "14px 22px", background: "white", borderBottom: "1px solid " + PD.grey200, display: "flex", alignItems: "center", gap: 12 } },
      React.createElement("button", { onClick: props.onBack, style: iconBtnStyle() }, Pdi.back),
      React.createElement("div", { style: { flex: 1, fontSize: 18, fontWeight: 800, color: PD.text } }, pd("driverVerification"))
    ),

    /* Intro */
    step === 0 && React.createElement("div", { style: { padding: "20px 22px" } },
      React.createElement("div", { style: { fontSize: 50, textAlign: "center", marginBottom: 14 } }, "🪪"),
      React.createElement("h2", { style: { textAlign: "center", color: PD.text, fontSize: 22, fontWeight: 800, margin: 0 } }, pd("verifTitle")),
      React.createElement("p", { style: { textAlign: "center", color: PD.textLight, fontSize: 14, margin: "12px 0 20px", lineHeight: 1.6 } }, pd("verifDesc")),
      React.createElement(PdBtn, { variant: "primary", size: "lg", fullWidth: true, onClick: function() { setStep(1); } }, pd("continue"))
    ),

    /* Step indicator */
    step >= 1 && React.createElement("div", { style: { padding: "14px 22px", display: "flex", gap: 8 } },
      [1, 2, 3, 4].map(function(s) {
        return React.createElement("div", {
          key: s,
          style: { flex: 1, height: 4, borderRadius: 100, background: s <= step ? PD.green : PD.grey200, transition: "background 0.3s" }
        });
      })
    ),

    /* Step 1: ID Front */
    step === 1 && React.createElement("div", { style: { padding: "10px 22px" } },
      React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: PD.green, textTransform: "uppercase", letterSpacing: "0.1em" } }, "Etape 1 / 4"),
      React.createElement("h2", { style: { color: PD.text, fontSize: 22, fontWeight: 800, margin: "8px 0 6px" } }, pd("verifStep1")),
      React.createElement("p", { style: { color: PD.textLight, fontSize: 14, margin: "0 0 20px" } }, pd("verifStep1Desc")),
      photoSlot(idFrontPhoto, "🪪 " + pd("idFront"), function() { openFilePicker("idFront"); }, function() { setIdFrontPhoto(null); }),
      React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
        React.createElement(PdBtn, { variant: "secondary", fullWidth: true, onClick: function() { setStep(0); } }, pd("back")),
        React.createElement(PdBtn, { variant: "primary", fullWidth: true, disabled: !idFrontPhoto, onClick: function() { setStep(2); } }, pd("next"))
      )
    ),

    /* Step 2: ID Back */
    step === 2 && React.createElement("div", { style: { padding: "10px 22px" } },
      React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: PD.green, textTransform: "uppercase", letterSpacing: "0.1em" } }, "Etape 2 / 4"),
      React.createElement("h2", { style: { color: PD.text, fontSize: 22, fontWeight: 800, margin: "8px 0 6px" } }, pd("verifStep2")),
      React.createElement("p", { style: { color: PD.textLight, fontSize: 14, margin: "0 0 20px" } }, pd("verifStep2Desc")),
      photoSlot(idBackPhoto, "📄 " + pd("idBack"), function() { openFilePicker("idBack"); }, function() { setIdBackPhoto(null); }),
      React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", borderRadius: 10, background: PD.blueSoft, color: PD.blue, fontSize: 12, fontWeight: 600 } },
        "ℹ️ Facultatif si ta piece n'a pas de verso (passeport)"
      ),
      React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
        React.createElement(PdBtn, { variant: "secondary", fullWidth: true, onClick: function() { setStep(1); } }, pd("back")),
        React.createElement(PdBtn, { variant: "primary", fullWidth: true, onClick: function() { setStep(3); } }, pd("next"))
      )
    ),

    /* Step 3: Selfie */
    step === 3 && React.createElement("div", { style: { padding: "10px 22px" } },
      React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: PD.green, textTransform: "uppercase", letterSpacing: "0.1em" } }, "Etape 3 / 4"),
      React.createElement("h2", { style: { color: PD.text, fontSize: 22, fontWeight: 800, margin: "8px 0 6px" } }, pd("verifStep3")),
      React.createElement("p", { style: { color: PD.textLight, fontSize: 14, margin: "0 0 20px" } }, pd("verifStep3Desc")),
      photoSlot(selfiePhoto, "🤳 " + pd("selfieWithId"), function() { openFilePicker("selfie"); }, function() { setSelfiePhoto(null); }),
      React.createElement("div", { style: { marginTop: 10, padding: "10px 14px", borderRadius: 10, background: PD.yellowSoft, color: "#B8860B", fontSize: 12, fontWeight: 600, lineHeight: 1.5 } },
        "⚠️ Assure-toi que ton visage ET l'ensemble des informations de ta piece sont bien visibles et nets."
      ),
      React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
        React.createElement(PdBtn, { variant: "secondary", fullWidth: true, onClick: function() { setStep(2); } }, pd("back")),
        React.createElement(PdBtn, { variant: "primary", fullWidth: true, disabled: !selfiePhoto, onClick: function() { setStep(4); } }, pd("next"))
      )
    ),

    /* Step 4: Personal info */
    step === 4 && React.createElement("div", { style: { padding: "10px 22px" } },
      React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: PD.green, textTransform: "uppercase", letterSpacing: "0.1em" } }, "Etape 4 / 4"),
      React.createElement("h2", { style: { color: PD.text, fontSize: 22, fontWeight: 800, margin: "8px 0 20px" } }, pd("verifStep4")),
      React.createElement("label", { style: labelStyle() }, pd("firstName")),
      React.createElement("input", { value: firstName, onChange: function(e) { setFirstName(e.target.value); }, style: inputStyle() }),
      React.createElement("label", { style: labelStyle() }, pd("lastName")),
      React.createElement("input", { value: lastName, onChange: function(e) { setLastName(e.target.value); }, style: inputStyle() }),
      React.createElement("label", { style: labelStyle() }, pd("birthDate")),
      React.createElement("input", { type: "date", value: birthDate, onChange: function(e) { setBirthDate(e.target.value); }, style: inputStyle() }),
      React.createElement("label", { style: labelStyle() }, pd("phoneNumber")),
      React.createElement("input", { type: "tel", value: phone, onChange: function(e) { setPhone(e.target.value); }, style: inputStyle(), placeholder: "+237 ..." }),
      React.createElement("label", { style: labelStyle() }, pd("address")),
      React.createElement("input", { value: address, onChange: function(e) { setAddress(e.target.value); }, style: inputStyle() }),
      React.createElement("label", { style: labelStyle() }, pd("vehicle")),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 } },
        [
          { id: "car", icon: "🚗", label: pd("vehicleCar") },
          { id: "scooter", icon: "🛵", label: pd("vehicleScooter") },
          { id: "bike", icon: "🚴", label: pd("vehicleBike") },
          { id: "walk", icon: "🚶", label: pd("vehicleWalk") },
        ].map(function(v) {
          var sel = vehicle === v.id;
          return React.createElement("button", {
            key: v.id,
            onClick: function() { setVehicle(v.id); },
            style: { padding: "10px 4px", borderRadius: 12, background: sel ? PD.greenLight : "white", border: "2px solid " + (sel ? PD.green : PD.grey200), color: PD.text, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }
          },
            React.createElement("span", { style: { fontSize: 20 } }, v.icon),
            v.label
          );
        })
      ),
      React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 24 } },
        React.createElement(PdBtn, { variant: "secondary", fullWidth: true, onClick: function() { setStep(3); } }, pd("back")),
        React.createElement(PdBtn, { variant: "primary", fullWidth: true, onClick: submit, disabled: submitting },
          submitting ? "..." : pd("submitVerification")
        )
      )
    ),

    /* Hidden file input */
    React.createElement("input", {
      ref: fileInputRef, type: "file", accept: "image/*", capture: "user",
      onChange: onFilePicked,
      style: { display: "none" }
    })
  );
}

function photoSlot(dataUrl, label, onUpload, onRemove) {
  if (dataUrl) {
    return React.createElement("div", { style: { position: "relative", borderRadius: 16, overflow: "hidden", background: PD.grey100 } },
      React.createElement("img", { src: dataUrl, style: { width: "100%", height: 240, objectFit: "cover", display: "block" } }),
      React.createElement("button", {
        onClick: onRemove,
        style: { position: "absolute", top: 10, right: 10, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.6)", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }
      }, Pdi.close)
    );
  }
  return React.createElement("div", {
    onClick: onUpload,
    style: { height: 240, borderRadius: 16, border: "2px dashed " + PD.grey300, background: PD.grey50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, cursor: "pointer", color: PD.textLight }
  },
    React.createElement("div", { style: { fontSize: 50 } }, label.split(" ")[0]),
    React.createElement("div", { style: { fontSize: 15, fontWeight: 700 } }, pd("takePhoto")),
    React.createElement("div", { style: { fontSize: 12 } }, label.split(" ").slice(1).join(" "))
  );
}

/* === DRIVER DASHBOARD === */
function DriverDashboardScreen(props) {
  var useState = React.useState;
  var useEffect = React.useEffect;
  var [, forceRender] = useState(0);
  var profile = pdGetDriverProfile();
  var online = pdGetDriverOnline();
  var activeJobs = pdDriverActiveJobs();
  var availableJobs = online ? pdAvailableJobs() : [];

  useEffect(function() {
    var t = setInterval(function() { forceRender(Date.now()); }, 3000);
    return function() { clearInterval(t); };
  }, []);

  return React.createElement("div", { style: { paddingBottom: 100 } },
    React.createElement("div", { style: { padding: "14px 22px", background: "white", borderBottom: "1px solid " + PD.grey200, display: "flex", alignItems: "center", gap: 12 } },
      React.createElement("button", { onClick: props.onBack, style: iconBtnStyle() }, Pdi.back),
      React.createElement("div", { style: { flex: 1, fontSize: 18, fontWeight: 800, color: PD.text } }, pd("driverDashboard"))
    ),

    /* Status toggle */
    React.createElement("div", { style: { padding: "18px 22px" } },
      React.createElement(PdCard, {
        style: {
          padding: 18, background: online ? "linear-gradient(135deg," + PD.green + "," + PD.greenDark + ")" : "white",
          color: online ? "white" : PD.text,
          display: "flex", alignItems: "center", gap: 14,
        }
      },
        React.createElement("div", { style: { fontSize: 32 } }, online ? "🟢" : "⚪"),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { fontSize: 16, fontWeight: 800 } }, online ? pd("driverOnline") : pd("driverOffline")),
          React.createElement("div", { style: { fontSize: 12, opacity: 0.8, marginTop: 2 } },
            online ? "Tu recois des livraisons" : "Mets-toi en ligne pour livrer"
          )
        ),
        React.createElement("button", {
          onClick: function() { pdSetDriverOnline(!online); forceRender(Date.now()); },
          style: { width: 56, height: 32, borderRadius: 100, background: online ? "rgba(255,255,255,0.3)" : PD.grey200, border: "none", position: "relative", cursor: "pointer" }
        },
          React.createElement("div", { style: { position: "absolute", top: 3, left: online ? 27 : 3, width: 26, height: 26, borderRadius: "50%", background: "white", transition: "left 0.2s" } })
        )
      )
    ),

    /* Stats */
    React.createElement("div", { style: { padding: "0 22px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 } },
      statCard(pd("todayEarnings"), "0 €", PD.green),
      statCard(pd("totalDeliveries"), profile.totalDeliveries || 0, PD.blue),
      statCard(pd("rating"), "⭐ " + (profile.rating || 5).toFixed(1), PD.yellow)
    ),

    /* Active delivery */
    activeJobs.length > 0 && React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() }, React.createElement("div", { style: sectionTitleStyle() }, pd("activeDelivery"))),
      React.createElement("div", { style: { padding: "0 22px", display: "flex", flexDirection: "column", gap: 10 } },
        activeJobs.map(function(job) { return activeJobCard(job, forceRender); })
      )
    ),

    /* Available jobs */
    online && React.createElement("div", null,
      React.createElement("div", { style: sectionHdStyle() },
        React.createElement("div", { style: sectionTitleStyle() }, pd("availableJobs")),
        React.createElement("div", { style: { fontSize: 12, color: PD.textLight, fontWeight: 600 } }, availableJobs.length + " dispo")
      ),
      React.createElement("div", { style: { padding: "0 22px", display: "flex", flexDirection: "column", gap: 10 } },
        availableJobs.length === 0 && React.createElement("div", { style: { textAlign: "center", padding: 30, color: PD.textLight, fontSize: 13 } },
          React.createElement("div", { style: { fontSize: 40, marginBottom: 10 } }, "⏳"),
          pd("noJobsAvailable")
        ),
        availableJobs.map(function(job) {
          return React.createElement(PdCard, { key: job.id, style: { padding: 14 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 } },
              React.createElement("div", { style: { fontSize: 28 } }, "📦"),
              React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: PD.text } }, job.pharmacyName),
                React.createElement("div", { style: { fontSize: 12, color: PD.textLight } }, job.items.length + " article(s) • " + pdFmtTime(job.createdAt))
              ),
              React.createElement("div", { style: { color: PD.green, fontSize: 16, fontWeight: 800 } }, pdJobPayout().toFixed(2) + " €")
            ),
            React.createElement("div", { style: { display: "flex", gap: 8 } },
              React.createElement(PdBtn, {
                size: "sm", variant: "outline", fullWidth: true,
                onClick: function() { pdDeclineJob(job.id); forceRender(Date.now()); }
              }, pd("declineJob")),
              React.createElement(PdBtn, {
                size: "sm", variant: "primary", fullWidth: true,
                onClick: function() {
                  var res = pdAcceptJob(job.id);
                  if (res.ok) { pdToast("Livraison acceptee", "success"); forceRender(Date.now()); }
                }
              }, pd("acceptJob"))
            )
          );
        })
      )
    )
  );
}

function statCard(label, value, color) {
  return React.createElement(PdCard, {
    style: { padding: 12, textAlign: "center", borderTop: "3px solid " + color }
  },
    React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: PD.text } }, value),
    React.createElement("div", { style: { fontSize: 10, color: PD.textLight, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 } }, label)
  );
}

function activeJobCard(job, forceRender) {
  return React.createElement(ActiveJobCard, { key: job.id, job: job, forceRender: forceRender });
}

function ActiveJobCard(props) {
  var useState = React.useState;
  var job = props.job;
  var step = job.status;
  var [pinEntry, setPinEntry] = useState("");
  var [pinError, setPinError] = useState(false);

  function tryDeliver() {
    if (pinEntry.length !== 4) { setPinError(true); return; }
    if (pdVerifyDeliveryPIN(job.id, pinEntry)) {
      pdCompleteDelivery(job.id);
      pdToast(pd("delivered") + " ✓", "success");
      props.forceRender(Date.now());
    } else {
      setPinError(true);
      pdToast("Code incorrect", "error");
      setTimeout(function(){ setPinError(false); setPinEntry(""); }, 1200);
    }
  }

  return React.createElement(PdCard, { style: { padding: 14, borderLeft: "3px solid " + PD.green } },
    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: PD.green, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 } },
      pdOrderStatusLabel(step)
    ),
    React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: PD.text, marginBottom: 4 } }, job.pharmacyName),
    React.createElement("div", { style: { fontSize: 12, color: PD.textLight, marginBottom: 12 } }, job.items.length + " article(s) • " + pdJobPayout().toFixed(2) + " €"),

    step === PD_ORDER_STATUS.DRIVER_ASSIGNED && React.createElement(PdBtn, {
      variant: "primary", fullWidth: true,
      onClick: function() { pdPickupPackage(job.id); pdToast(pd("pickupPackage") + " ✓", "success"); props.forceRender(Date.now()); }
    }, Pdi.qr, pd("pickupPackage")),

    step === PD_ORDER_STATUS.PICKED_UP && React.createElement(PdBtn, {
      variant: "primary", fullWidth: true,
      onClick: function() { pdStartDelivery(job.id); pdToast(pd("driverOnWay") + " ✓", "info"); props.forceRender(Date.now()); }
    }, Pdi.truck, pd("goToCustomer")),

    /* Delivery — PIN entry required */
    step === PD_ORDER_STATUS.DELIVERING && React.createElement("div", null,
      React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: PD.text, marginBottom: 8 } }, "🔐 Demande le code au client"),
      React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 } },
        [0,1,2,3].map(function(i) {
          var filled = i < pinEntry.length;
          return React.createElement("div", {
            key: i,
            style: {
              width: 44, height: 52, borderRadius: 10,
              border: "2px solid " + (pinError ? PD.red : (filled ? PD.green : PD.grey200)),
              background: pinError ? PD.redSoft : (filled ? PD.greenLight : PD.grey50),
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 800, color: pinError ? PD.red : PD.text,
            }
          }, filled ? pinEntry.charAt(i) : "");
        })
      ),
      /* Numpad */
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 } },
        [1,2,3,4,5,6,7,8,9,"del",0,"ok"].map(function(k) {
          if (k === "del") return React.createElement("button", {
            key: "del",
            onClick: function() { setPinError(false); setPinEntry(pinEntry.slice(0, -1)); },
            style: numKeyStyle(PD.grey100)
          }, "⌫");
          if (k === "ok") return React.createElement("button", {
            key: "ok",
            onClick: tryDeliver,
            disabled: pinEntry.length !== 4,
            style: Object.assign({}, numKeyStyle(pinEntry.length === 4 ? PD.green : PD.grey200), { color: pinEntry.length === 4 ? "white" : PD.textMuted })
          }, "✓");
          return React.createElement("button", {
            key: k,
            onClick: function() { if (pinEntry.length < 4) { setPinError(false); setPinEntry(pinEntry + k); } },
            style: numKeyStyle("white")
          }, k);
        })
      )
    )
  );
}

function numKeyStyle(bg) {
  return {
    padding: "14px 0", borderRadius: 10,
    background: bg, border: "1px solid " + PD.grey200,
    color: PD.text, fontSize: 20, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
  };
}
