/* PharmaDroid — Medication Reminders
 * Reminders trigger at scheduled times using setTimeout (while app is open)
 * and Notifications API. Persistent scheduling via Service Worker is v2.
 *
 * Reminder shape: {
 *   id, medId, brand, dose, frequency, times:[HH:MM], startDate, endDate,
 *   notes, notifications: bool, logs: [{at, action}]
 * }
 */

var _pdReminderTimers = {};

function pdNotifPermRequest() {
  if (!("Notification" in window)) return Promise.resolve("unsupported");
  if (Notification.permission === "granted") return Promise.resolve("granted");
  if (Notification.permission === "denied") return Promise.resolve("denied");
  return Notification.requestPermission();
}

function pdScheduleAllReminders() {
  /* Clear existing timers */
  Object.keys(_pdReminderTimers).forEach(function(k) { clearTimeout(_pdReminderTimers[k]); });
  _pdReminderTimers = {};

  var reminders = pdGetReminders();
  reminders.forEach(function(rem) {
    if (!rem.notifications) return;
    (rem.times || []).forEach(function(time, idx) {
      var next = pdNextOccurrence(time, rem.frequency);
      if (next) {
        var delay = next - Date.now();
        if (delay > 0 && delay < 24 * 60 * 60 * 1000) {
          _pdReminderTimers[rem.id + "_" + idx] = setTimeout(function() {
            pdFireReminder(rem, time);
          }, delay);
        }
      }
    });
  });
}

/* Compute next occurrence timestamp for an HH:MM time today/tomorrow */
function pdNextOccurrence(hhmm, frequency) {
  if (!hhmm) return null;
  var parts = hhmm.split(":");
  if (parts.length !== 2) return null;
  var h = parseInt(parts[0], 10), m = parseInt(parts[1], 10);
  if (isNaN(h) || isNaN(m)) return null;
  var now = new Date();
  var target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  return target.getTime();
}

function pdFireReminder(rem, time) {
  var title = "💊 " + (rem.brand || pd("reminders"));
  var body = pd("takeNow") + (rem.dose ? " — " + rem.dose : "");
  pdNotify(title, body);
  /* Reschedule for tomorrow */
  setTimeout(function() { pdScheduleAllReminders(); }, 60000);
}

/* Get today's upcoming doses */
function pdTodaysReminders() {
  var reminders = pdGetReminders();
  var now = Date.now();
  var endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  var results = [];
  reminders.forEach(function(rem) {
    (rem.times || []).forEach(function(t) {
      var next = pdNextOccurrence(t, rem.frequency);
      if (next && next <= endOfDay.getTime()) {
        results.push({ reminder: rem, time: t, at: next, isPast: next < now });
      }
    });
  });
  return results.sort(function(a, b) { return a.at - b.at; });
}

function pdLogReminderAction(remId, action) {
  var list = pdGetReminders();
  var idx = -1;
  for (var i = 0; i < list.length; i++) if (list[i].id === remId) { idx = i; break; }
  if (idx === -1) return;
  list[idx].logs = list[idx].logs || [];
  list[idx].logs.push({ at: Date.now(), action: action });
  pdSave(PD_KEYS.reminders, list);
}
