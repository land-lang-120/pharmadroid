/* PharmaDroid — Driver Identity Verification
 * Handles photo capture (camera or file upload), stores as data URLs.
 * In production: upload to secure backend for human/AI review.
 */

/* Capture a photo from video stream and return a data URL */
function pdCapturePhoto(videoEl, maxWidth) {
  maxWidth = maxWidth || 800;
  var w = videoEl.videoWidth;
  var h = videoEl.videoHeight;
  if (!w || !h) return null;
  var ratio = maxWidth / w;
  if (ratio < 1) { w = maxWidth; h = Math.floor(videoEl.videoHeight * ratio); }
  else { w = videoEl.videoWidth; h = videoEl.videoHeight; }
  var canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(videoEl, 0, 0, w, h);
  try {
    return canvas.toDataURL("image/jpeg", 0.82);
  } catch (e) { return null; }
}

/* Read an uploaded image file as data URL */
function pdReadFileAsDataUrl(file) {
  return new Promise(function(resolve, reject) {
    var r = new FileReader();
    r.onload = function() { resolve(r.result); };
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

/* Validate file type */
function pdIsImageFile(file) {
  return file && typeof file.type === "string" && file.type.indexOf("image/") === 0;
}

/* Submit verification — moves status to PENDING.
 * In production: POST data to backend.
 * Here: simulate with timed auto-approval after 10 seconds for demo.
 */
function pdSubmitVerification(data) {
  var profile = pdGetDriverProfile();
  profile = Object.assign({}, profile, data, {
    verified: PD_VERIF.PENDING,
    submittedAt: Date.now(),
  });
  pdSetDriverProfile(profile);

  /* Demo: auto-approve after 10s */
  setTimeout(function() {
    var p = pdGetDriverProfile();
    if (p.verified === PD_VERIF.PENDING) {
      p.verified = PD_VERIF.APPROVED;
      p.approvedAt = Date.now();
      pdSetDriverProfile(p);
      pdNotify(pd("verifApproved"), pd("verifApprovedDesc"));
    }
  }, 10000);

  return { ok: true };
}

function pdNotify(title, body) {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    new Notification(title, { body: body, icon: "icons/icon-192.svg" });
  }
}

/* Complete verification check */
function pdVerificationComplete(data) {
  return !!(data.idFrontPhoto && data.selfiePhoto && data.firstName && data.lastName && data.birthDate && data.phone);
}

/* Reset verification (for re-submission) */
function pdResetVerification() {
  var p = pdGetDriverProfile();
  p.verified = PD_VERIF.NONE;
  p.idFrontPhoto = null;
  p.idBackPhoto = null;
  p.selfiePhoto = null;
  pdSetDriverProfile(p);
}
