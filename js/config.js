/* PharmaDroid — Config & Theme Tokens (Medical Green) */

const PD = {
  /* Pharmacy green palette */
  green:       "#00A86B",
  greenDark:   "#007A4D",
  greenDarker: "#005934",
  greenLight:  "#E6F7F1",
  greenMid:    "#B3E8D4",
  greenGlow:   "rgba(0,168,107,0.15)",

  /* Accent colors */
  red:         "#FF4757",
  redSoft:     "rgba(255,71,87,0.1)",
  orange:      "#FF6B35",
  orangeSoft:  "rgba(255,107,53,0.1)",
  blue:        "#4F80FF",
  blueSoft:    "rgba(79,128,255,0.1)",
  purple:      "#8B5CF6",
  purpleSoft:  "rgba(139,92,246,0.1)",
  yellow:      "#FFB800",
  yellowSoft:  "rgba(255,184,0,0.1)",

  /* Surfaces */
  white:       "#FFFFFF",
  grey50:      "#F8FAFB",
  grey100:     "#F0F4F7",
  grey200:     "#DDE4EC",
  grey300:     "#C5D0DC",
  grey400:     "#9AAAB8",
  grey500:     "#758493",
  grey600:     "#5A6B7A",
  grey700:     "#3D4C5B",
  grey800:     "#1E2D3A",
  grey900:     "#0F1A24",

  /* Semantic */
  text:        "#1E2D3A",
  textLight:   "#5A6B7A",
  textMuted:   "#9AAAB8",

  /* Severity levels for interactions */
  sevNone:     "#00A86B",
  sevMinor:    "#FFB800",
  sevModerate: "#FF6B35",
  sevMajor:    "#FF4757",
  sevCritical: "#C41E3A",

  /* Shadow */
  shadow:      "0 1px 3px rgba(15,26,36,0.08)",
  shadowMd:    "0 4px 12px rgba(15,26,36,0.10)",
  shadowLg:    "0 8px 24px rgba(15,26,36,0.12)",
  shadowGreen: "0 6px 20px rgba(0,168,107,0.30)",
};

/* App identity */
const PD_APP_NAME    = "PharmaDroid";
const PD_APP_TAGLINE = "Ta pharmacie intelligente";
const PD_VERSION     = "1.0.0";

/* User modes (what content is shown) */
const PD_MODE = {
  PATIENT: "patient",   /* Simple language, vulgarized info */
  PRO:     "pro",       /* Technical data, full RCP */
};

/* User roles (unlockable capabilities) */
const PD_ROLE = {
  USER:     "user",     /* Default — can order meds */
  DRIVER:   "driver",   /* Verified delivery driver */
};

/* Driver verification status */
const PD_VERIF = {
  NONE:      "none",       /* Not submitted */
  PENDING:   "pending",    /* Awaiting review */
  APPROVED:  "approved",   /* Verified, can deliver */
  REJECTED:  "rejected",   /* Rejected, can resubmit */
};

/* Delivery options */
const PD_DELIVERY = {
  PICKUP:   "pickup",      /* Customer picks up at pharmacy */
  DELIVERY: "delivery",    /* Driver delivers to home */
};

/* Delivery fees */
const PD_DELIVERY_FEE = 3.50; /* EUR */

/* Medication severity levels (for interactions) */
const PD_SEVERITY = {
  NONE:     0,   /* No interaction */
  MINOR:    1,   /* Monitor */
  MODERATE: 2,   /* Caution */
  MAJOR:    3,   /* Avoid */
  CRITICAL: 4,   /* Contraindicated */
};
const PD_SEV_LABELS = {
  0: { fr: "Aucune",       en: "None" },
  1: { fr: "Mineure",      en: "Minor" },
  2: { fr: "Moderee",      en: "Moderate" },
  3: { fr: "Majeure",      en: "Major" },
  4: { fr: "Contre-indiquee", en: "Critical" },
};

/* Order status — extended for delivery flow */
const PD_ORDER_STATUS = {
  DRAFT:          "draft",        /* Being composed */
  SENT:           "sent",         /* Sent to pharmacy */
  PREPARING:      "preparing",    /* Pharmacy preparing */
  READY:          "ready",        /* Ready — pickup OR awaiting driver */
  DRIVER_ASSIGNED:"driverAssigned",/* Driver accepted job */
  PICKED_UP:      "pickedUp",     /* Driver has the package */
  DELIVERING:     "delivering",   /* En route to customer */
  COLLECTED:      "collected",    /* Customer has it (pickup or delivered) */
  CANCELLED:      "cancelled",
};

/* Reminder frequencies */
const PD_FREQ = {
  ONCE:    "once",
  DAILY:   "daily",
  TWICE:   "twice",
  THRICE:  "thrice",
  WEEKLY:  "weekly",
  AS_NEEDED: "asNeeded",
};

/* Locale map */
const PD_LOCALES = {fr:"fr-FR",en:"en-US",es:"es-ES",pt:"pt-BR",de:"de-DE",it:"it-IT",nl:"nl-NL",tr:"tr-TR",ru:"ru-RU",ar:"ar-SA",zh:"zh-CN",ja:"ja-JP",ko:"ko-KR",hi:"hi-IN",sw:"sw-KE",pl:"pl-PL"};
const pdLocale = () => PD_LOCALES[_pdLang] || "fr-FR";

/* Utils */
const pdFmtDate = (d) => new Date(d).toLocaleDateString(pdLocale(), { day: "numeric", month: "short", year: "numeric" });
const pdFmtTime = (d) => new Date(d).toLocaleTimeString(pdLocale(), { hour: "2-digit", minute: "2-digit" });
const pdFmtDateTime = (d) => pdFmtDate(d) + " • " + pdFmtTime(d);
const pdDayName = (idx) => ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"][idx] || "";

/* Storage keys */
const PD_KEYS = {
  lang:        "pd_lang",
  mode:        "pd_mode",
  profile:     "pd_profile",
  medications: "pd_medications", /* user's current meds */
  reminders:   "pd_reminders",
  orders:      "pd_orders",
  history:     "pd_history",
  favorites:   "pd_favorites",
  onboarded:   "pd_onboarded",
  settings:    "pd_settings",
  driverProfile:"pd_driver_profile",
  driverJobs:  "pd_driver_jobs",
  driverOnline:"pd_driver_online",
  driverEarnings:"pd_driver_earnings",
};
