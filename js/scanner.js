/* PharmaDroid — Scanner logic (camera-based)
 * Real product would use ZXing or QuaggaJS for barcode, OCR API for prescriptions.
 * This is a clean scaffold with camera access + mock detection.
 */

var PD_SCANNER = {
  stream: null,
  active: false,
};

function pdScannerStart(videoEl, constraints) {
  constraints = constraints || {
    video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
    audio: false,
  };
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return Promise.reject(new Error("unsupported"));
  }
  return navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    PD_SCANNER.stream = stream;
    PD_SCANNER.active = true;
    videoEl.srcObject = stream;
    return videoEl.play().then(function() { return stream; });
  });
}

function pdScannerStop(videoEl) {
  if (PD_SCANNER.stream) {
    PD_SCANNER.stream.getTracks().forEach(function(t) { t.stop(); });
    PD_SCANNER.stream = null;
  }
  PD_SCANNER.active = false;
  if (videoEl) {
    videoEl.srcObject = null;
  }
}

/* Simulate prescription OCR — detects 2-4 random meds from database */
function pdMockDetectPrescription() {
  var all = PD_MEDS.slice();
  /* Shuffle */
  for (var i = all.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = all[i]; all[i] = all[j]; all[j] = t;
  }
  var count = 2 + Math.floor(Math.random() * 3);
  return all.slice(0, count).map(function(m) {
    return { medId: m.id, brand: m.brand, dci: m.dci, form: m.form, qty: 1 };
  });
}

/* Simulate barcode scan — picks a random med */
function pdMockDetectBarcode() {
  var m = PD_MEDS[Math.floor(Math.random() * PD_MEDS.length)];
  return { medId: m.id, brand: m.brand, dci: m.dci, form: m.form };
}

/* Scanner mode selector */
const PD_SCAN_MODE = {
  PRESCRIPTION: "prescription",
  BARCODE: "barcode",
  DELIVERY_QR: "deliveryQR",
  VERIF_ID: "verifId",
};
