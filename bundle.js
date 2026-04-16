/* PharmaDroid — Bundled 2026-04-16T17:06:52.910Z */


/* ══════ js/config.js ══════ */
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


/* ══════ js/i18n.js ══════ */
/* PharmaDroid — i18n (16 languages, fr primary) */

var _pdLang = localStorage.getItem(PD_KEYS.lang) || "fr";

const PD_I18N = {
  /* ═══ FRANCAIS ═══ */
  fr: {
    appName: "PharmaDroid",
    tagline: "Ta pharmacie intelligente",
    loading: "Chargement...",

    /* Navigation */
    navHome: "Accueil",
    navSearch: "Rechercher",
    navScan: "Scanner",
    navOrders: "Commandes",
    navProfile: "Profil",
    navSettings: "Reglages",

    /* Common */
    search: "Rechercher",
    cancel: "Annuler",
    ok: "OK",
    confirm: "Confirmer",
    save: "Enregistrer",
    back: "Retour",
    next: "Suivant",
    done: "Termine",
    close: "Fermer",
    add: "Ajouter",
    remove: "Retirer",
    edit: "Modifier",
    delete: "Supprimer",
    view: "Voir",
    seeAll: "Tout voir",
    continue: "Continuer",

    /* Home */
    greeting_morning: "Bonjour",
    greeting_day: "Bon apres-midi",
    greeting_evening: "Bonsoir",
    greeting_night: "Bonsoir",
    howFeel: "Comment te sens-tu aujourd'hui ?",
    quickActions: "Actions rapides",
    scanPrescription: "Scanner ordonnance",
    scanPrescDesc: "Commande avant d'arriver",
    checkMed: "Verifier un medicament",
    checkInteractions: "Verifier interactions",
    mySchedule: "Mon planning",
    upcomingReminders: "Prises a venir",
    noReminders: "Aucune prise prevue",
    activeOrders: "Commandes en cours",
    noActiveOrders: "Aucune commande en cours",
    myMeds: "Mes medicaments",
    addMed: "Ajouter un medicament",
    noMeds: "Aucun medicament enregistre",
    nearbyPharmacies: "Pharmacies a proximite",
    seeMedDetails: "Voir details",

    /* Search */
    searchPlaceholder: "Nom, marque, molecule...",
    recentSearches: "Recherches recentes",
    popularMeds: "Medicaments populaires",
    byCategory: "Par categorie",
    noResults: "Aucun resultat",
    tryOther: "Essaie un autre terme",

    /* Medication categories */
    catPain: "Antidouleur",
    catAntibio: "Antibiotique",
    catAnti_inflam: "Anti-inflammatoire",
    catAllergy: "Allergie",
    catDigestive: "Digestion",
    catCardio: "Cardio",
    catRespi: "Respiratoire",
    catDerma: "Peau",
    catVitamin: "Vitamine",
    catSleep: "Sommeil",
    catMental: "Mental",
    catDiabetes: "Diabete",

    /* Medication detail */
    dci: "DCI",
    form: "Forme",
    laboratory: "Laboratoire",
    posology: "Posologie",
    indications: "Indications",
    contraIndications: "Contre-indications",
    sideEffects: "Effets secondaires",
    warnings: "Mises en garde",
    storage: "Conservation",
    prescriptionRequired: "Sur ordonnance",
    otc: "Sans ordonnance",
    addToMyMeds: "Ajouter a mes medicaments",
    setReminder: "Creer un rappel",
    orderNow: "Commander",
    checkWithMyMeds: "Verifier avec mes medicaments",
    simpleView: "Vue simple",
    techView: "Vue technique",

    /* Scanner */
    scanner: "Scanner",
    scanOrdonnance: "Scanner ordonnance",
    scanBarcode: "Scanner code-barres",
    scanDesc: "Pointe vers une ordonnance ou un medicament",
    scanInstructions: "Approche la camera du document",
    scanReady: "Scanner pret",
    scanning: "Scan en cours...",
    scanDetected: "Medicaments detectes",
    selectPharmacy: "Choisir une pharmacie",
    sendToPharmacy: "Envoyer a la pharmacie",
    askCamera: "Autoriser la camera",
    manualEntry: "Saisir manuellement",

    /* Orders */
    orderTitle: "Ma commande",
    orderItems: "Medicaments",
    orderStatus: "Statut",
    orderPharmacy: "Pharmacie",
    orderDate: "Date",
    orderQR: "Code QR",
    showAtCounter: "Montrer au comptoir",
    orderSent: "Commande envoyee",
    orderSentDesc: "La pharmacie prepare ta commande",
    orderPreparing: "En preparation",
    orderReady: "Prete a recuperer",
    orderCollected: "Recuperee",
    orderCancelled: "Annulee",
    orderCancel: "Annuler la commande",
    newOrder: "Nouvelle commande",
    noOrders: "Aucune commande",
    historyOrders: "Historique",
    estWait: "Attente estimee",
    readySince: "Prete depuis",

    /* Reminders */
    reminders: "Rappels",
    newReminder: "Nouveau rappel",
    reminderTime: "Heure",
    reminderFreq: "Frequence",
    reminderDose: "Dose",
    reminderNotes: "Notes",
    freqOnce: "Une fois",
    freqDaily: "Chaque jour",
    freqTwice: "2 fois par jour",
    freqThrice: "3 fois par jour",
    freqWeekly: "Chaque semaine",
    freqAsNeeded: "Au besoin",
    today: "Aujourd'hui",
    tomorrow: "Demain",
    taken: "Pris",
    skipped: "Saute",
    missed: "Manque",
    takeNow: "Prendre maintenant",
    notifPerm: "Autoriser les notifications",
    notifDesc: "Pour te rappeler tes prises",

    /* Interactions */
    interactions: "Interactions",
    interactionChecker: "Verificateur d'interactions",
    addMedsToCheck: "Ajoute des medicaments pour verifier",
    checkNow: "Verifier maintenant",
    noInteractions: "Aucune interaction detectee",
    interactionsFound: "Interactions detectees",
    sevNone: "Aucune",
    sevMinor: "Mineure",
    sevModerate: "Moderee",
    sevMajor: "Majeure",
    sevCritical: "Contre-indiquee",
    sevNoneDesc: "Combinaison sans risque connu.",
    sevMinorDesc: "Surveillance simple recommandee.",
    sevModerateDesc: "Precaution d'emploi. Parle-en a ton pharmacien.",
    sevMajorDesc: "Association deconseillee.",
    sevCriticalDesc: "Association dangereuse a eviter.",
    withMed: "avec",
    askPharmacist: "Consulte ton pharmacien",

    /* Profile */
    profile: "Profil",
    editProfile: "Modifier le profil",
    name: "Nom",
    age: "Age",
    weight: "Poids",
    height: "Taille",
    gender: "Sexe",
    male: "Homme",
    female: "Femme",
    other: "Autre",
    allergies: "Allergies",
    conditions: "Pathologies",
    pregnancy: "Grossesse",
    breastfeeding: "Allaitement",
    none: "Aucun(e)",

    /* Settings */
    settings: "Reglages",
    appMode: "Mode de l'application",
    modePatient: "Patient",
    modePatientDesc: "Langage simple, informations vulgarisees",
    modePro: "Professionnel",
    modeProDesc: "DCI, RCP complet, classes ATC",
    language: "Langue",
    notifications: "Notifications",
    darkMode: "Mode sombre",
    about: "A propos",
    version: "Version",
    privacyPolicy: "Confidentialite",
    terms: "Conditions",
    resetData: "Reinitialiser",

    /* Misc */
    emergency: "Urgence",
    poisonCenter: "Centre antipoison",
    call: "Appeler",
    tapToScan: "Touche pour scanner",
    prescription: "Ordonnance",
    box: "Boite",
    pill: "Comprime",
    tablet: "Comprime",
    capsule: "Gelule",
    syrup: "Sirop",
    injection: "Injection",
    cream: "Creme",
    drops: "Gouttes",
    patch: "Patch",

    /* Delivery system */
    delivery: "Livraison",
    pickup: "Retrait en pharmacie",
    pickupDesc: "Tu passes la recuperer au comptoir",
    deliveryOption: "Livraison a domicile",
    deliveryDesc: "Un livreur verifie te l'apporte",
    deliveryFee: "Frais de livraison",
    deliveryTotal: "Total avec livraison",
    trackOrder: "Suivre ma commande",
    driverOnWay: "Livreur en route",
    driverArrivedPharmacy: "Livreur a la pharmacie",
    driverArrivedHome: "Livreur arrive",
    estDeliveryTime: "Arrivee estimee",
    delivered: "Livree",
    confirmReception: "Confirmer reception",
    scanToConfirm: "Scanne le QR du livreur",
    rateDriver: "Noter le livreur",

    /* Driver mode */
    becomeDriver: "Devenir livreur",
    becomeDriverDesc: "Livre des medicaments, gagne de l'argent",
    driverMode: "Mode Livreur",
    driverDashboard: "Tableau de bord livreur",
    driverOnline: "En ligne",
    driverOffline: "Hors ligne",
    toggleOnline: "Se mettre en ligne",
    toggleOffline: "Se deconnecter",
    availableJobs: "Livraisons disponibles",
    noJobsAvailable: "Aucune livraison disponible",
    acceptJob: "Accepter",
    declineJob: "Refuser",
    myDeliveries: "Mes livraisons",
    activeDelivery: "Livraison en cours",
    goToPharmacy: "Aller a la pharmacie",
    pickupPackage: "Recuperer le colis",
    scanPharmacyQR: "Scanne le QR de la pharmacie",
    goToCustomer: "Aller chez le client",
    confirmDelivery: "Confirmer la livraison",
    todayEarnings: "Gains du jour",
    totalEarnings: "Gains totaux",
    totalDeliveries: "Livraisons totales",
    rating: "Note",
    jobDistance: "Distance",
    jobPayout: "Gain",
    jobTime: "Temps estime",

    /* Driver verification */
    driverVerification: "Verification livreur",
    verifTitle: "Verification d'identite",
    verifDesc: "Nous avons besoin de verifier ton identite pour garantir la securite des utilisateurs.",
    verifStep1: "Photo de ta piece d'identite (recto)",
    verifStep1Desc: "Carte nationale, passeport ou permis",
    verifStep2: "Photo de ta piece (verso)",
    verifStep2Desc: "Si ta piece a un verso",
    verifStep3: "Selfie avec ta piece",
    verifStep3Desc: "Tiens ta piece a cote de ton visage, visible",
    verifStep4: "Informations personnelles",
    verifStep4Desc: "Nom, prenom, date de naissance",
    takePhoto: "Prendre la photo",
    retakePhoto: "Reprendre",
    uploadPhoto: "Importer",
    idFront: "Recto piece",
    idBack: "Verso piece",
    selfieWithId: "Selfie avec piece",
    fullName: "Nom complet",
    firstName: "Prenom",
    lastName: "Nom",
    birthDate: "Date de naissance",
    phoneNumber: "Telephone",
    address: "Adresse",
    vehicle: "Vehicule",
    vehicleCar: "Voiture",
    vehicleBike: "Velo",
    vehicleScooter: "Scooter",
    vehicleWalk: "A pied",
    submitVerification: "Soumettre pour verification",
    verifPending: "Verification en cours",
    verifPendingDesc: "Reponse sous 24-48h",
    verifApproved: "Verification validee",
    verifApprovedDesc: "Tu peux maintenant livrer",
    verifRejected: "Verification refusee",
    verifRejectedDesc: "Consulte les raisons et resoumets",
    verifReason: "Motif",
    resubmit: "Resoumettre",

    /* Onboarding */
    welcome: "Bienvenue sur PharmaDroid",
    welcomeDesc: "Ta pharmacie intelligente et connectee",
    onb1Title: "Commande avant d'arriver",
    onb1Desc: "Scanne ton ordonnance chez toi, la pharmacie prepare, tu passes recuperer",
    onb2Title: "Verifie tes medicaments",
    onb2Desc: "Base de donnees complete, interactions, posologies",
    onb3Title: "Ne rate plus aucune prise",
    onb3Desc: "Rappels intelligents pour ton traitement",
    getStarted: "Commencer",
    skip: "Passer",
  },

  /* ═══ ENGLISH ═══ */
  en: {
    appName: "PharmaDroid", tagline: "Your smart pharmacy", loading: "Loading...",
    navHome: "Home", navSearch: "Search", navScan: "Scan", navOrders: "Orders",
    navProfile: "Profile", navSettings: "Settings",
    search: "Search", cancel: "Cancel", ok: "OK", confirm: "Confirm", save: "Save",
    back: "Back", next: "Next", done: "Done", close: "Close", add: "Add",
    remove: "Remove", edit: "Edit", delete: "Delete", view: "View", seeAll: "See all",
    continue: "Continue",
    greeting_morning: "Good morning", greeting_day: "Good afternoon",
    greeting_evening: "Good evening", greeting_night: "Good evening",
    howFeel: "How are you feeling today?", quickActions: "Quick actions",
    scanPrescription: "Scan prescription", scanPrescDesc: "Order before arrival",
    checkMed: "Check a medication", checkInteractions: "Check interactions",
    mySchedule: "My schedule", upcomingReminders: "Upcoming doses",
    noReminders: "No doses scheduled", activeOrders: "Active orders",
    noActiveOrders: "No active orders", myMeds: "My medications",
    addMed: "Add medication", noMeds: "No medications saved",
    nearbyPharmacies: "Nearby pharmacies", seeMedDetails: "See details",
    searchPlaceholder: "Name, brand, molecule...",
    recentSearches: "Recent searches", popularMeds: "Popular medications",
    byCategory: "By category", noResults: "No results", tryOther: "Try another term",
    catPain: "Pain relief", catAntibio: "Antibiotic", catAnti_inflam: "Anti-inflammatory",
    catAllergy: "Allergy", catDigestive: "Digestive", catCardio: "Cardio",
    catRespi: "Respiratory", catDerma: "Skin", catVitamin: "Vitamin",
    catSleep: "Sleep", catMental: "Mental health", catDiabetes: "Diabetes",
    dci: "INN", form: "Form", laboratory: "Laboratory", posology: "Dosage",
    indications: "Indications", contraIndications: "Contraindications",
    sideEffects: "Side effects", warnings: "Warnings", storage: "Storage",
    prescriptionRequired: "Prescription only", otc: "Over-the-counter",
    addToMyMeds: "Add to my meds", setReminder: "Set reminder", orderNow: "Order now",
    checkWithMyMeds: "Check with my meds", simpleView: "Simple view", techView: "Tech view",
    scanner: "Scanner", scanOrdonnance: "Scan prescription",
    scanBarcode: "Scan barcode", scanDesc: "Point at a prescription or medication",
    scanInstructions: "Position camera over document", scanReady: "Scanner ready",
    scanning: "Scanning...", scanDetected: "Medications detected",
    selectPharmacy: "Select a pharmacy", sendToPharmacy: "Send to pharmacy",
    askCamera: "Allow camera access", manualEntry: "Enter manually",
    orderTitle: "My order", orderItems: "Medications", orderStatus: "Status",
    orderPharmacy: "Pharmacy", orderDate: "Date", orderQR: "QR Code",
    showAtCounter: "Show at counter", orderSent: "Order sent",
    orderSentDesc: "The pharmacy is preparing your order",
    orderPreparing: "Preparing", orderReady: "Ready for pickup",
    orderCollected: "Collected", orderCancelled: "Cancelled",
    orderCancel: "Cancel order", newOrder: "New order", noOrders: "No orders",
    historyOrders: "History", estWait: "Estimated wait", readySince: "Ready since",
    reminders: "Reminders", newReminder: "New reminder", reminderTime: "Time",
    reminderFreq: "Frequency", reminderDose: "Dose", reminderNotes: "Notes",
    freqOnce: "Once", freqDaily: "Every day", freqTwice: "Twice a day",
    freqThrice: "3 times a day", freqWeekly: "Weekly", freqAsNeeded: "As needed",
    today: "Today", tomorrow: "Tomorrow", taken: "Taken", skipped: "Skipped",
    missed: "Missed", takeNow: "Take now", notifPerm: "Allow notifications",
    notifDesc: "To remind you of your doses",
    interactions: "Interactions", interactionChecker: "Interaction checker",
    addMedsToCheck: "Add medications to check", checkNow: "Check now",
    noInteractions: "No interactions detected", interactionsFound: "Interactions found",
    sevNone: "None", sevMinor: "Minor", sevModerate: "Moderate",
    sevMajor: "Major", sevCritical: "Contraindicated",
    sevNoneDesc: "No known risk.", sevMinorDesc: "Simple monitoring recommended.",
    sevModerateDesc: "Use with caution. Talk to your pharmacist.",
    sevMajorDesc: "Association not recommended.",
    sevCriticalDesc: "Dangerous combination to avoid.",
    withMed: "with", askPharmacist: "Consult your pharmacist",
    profile: "Profile", editProfile: "Edit profile", name: "Name", age: "Age",
    weight: "Weight", height: "Height", gender: "Gender", male: "Male",
    female: "Female", other: "Other", allergies: "Allergies",
    conditions: "Conditions", pregnancy: "Pregnancy", breastfeeding: "Breastfeeding",
    none: "None",
    settings: "Settings", appMode: "App mode", modePatient: "Patient",
    modePatientDesc: "Simple language, vulgarized info", modePro: "Professional",
    modeProDesc: "INN, full SPC, ATC classes", language: "Language",
    notifications: "Notifications", darkMode: "Dark mode", about: "About",
    version: "Version", privacyPolicy: "Privacy", terms: "Terms",
    resetData: "Reset data",
    emergency: "Emergency", poisonCenter: "Poison center", call: "Call",
    tapToScan: "Tap to scan", prescription: "Prescription", box: "Box",
    pill: "Pill", tablet: "Tablet", capsule: "Capsule", syrup: "Syrup",
    injection: "Injection", cream: "Cream", drops: "Drops", patch: "Patch",
    welcome: "Welcome to PharmaDroid",
    welcomeDesc: "Your smart connected pharmacy",
    onb1Title: "Order before you arrive",
    onb1Desc: "Scan your prescription at home, the pharmacy prepares, you pick up",
    onb2Title: "Check your medications",
    onb2Desc: "Full database, interactions, dosages",
    onb3Title: "Never miss a dose",
    onb3Desc: "Smart reminders for your treatment",
    getStarted: "Get started", skip: "Skip",
    delivery: "Delivery", pickup: "Pickup at pharmacy",
    pickupDesc: "You collect it at the counter",
    deliveryOption: "Home delivery",
    deliveryDesc: "A verified driver brings it to you",
    deliveryFee: "Delivery fee", deliveryTotal: "Total with delivery",
    trackOrder: "Track my order", driverOnWay: "Driver on the way",
    driverArrivedPharmacy: "Driver at pharmacy",
    driverArrivedHome: "Driver arrived",
    estDeliveryTime: "Estimated arrival", delivered: "Delivered",
    confirmReception: "Confirm reception", scanToConfirm: "Scan driver's QR",
    rateDriver: "Rate driver",
    becomeDriver: "Become a driver",
    becomeDriverDesc: "Deliver medications, earn money",
    driverMode: "Driver mode", driverDashboard: "Driver dashboard",
    driverOnline: "Online", driverOffline: "Offline",
    toggleOnline: "Go online", toggleOffline: "Go offline",
    availableJobs: "Available jobs", noJobsAvailable: "No jobs available",
    acceptJob: "Accept", declineJob: "Decline",
    myDeliveries: "My deliveries", activeDelivery: "Active delivery",
    goToPharmacy: "Go to pharmacy", pickupPackage: "Pick up package",
    scanPharmacyQR: "Scan pharmacy QR", goToCustomer: "Go to customer",
    confirmDelivery: "Confirm delivery", todayEarnings: "Today's earnings",
    totalEarnings: "Total earnings", totalDeliveries: "Total deliveries",
    rating: "Rating", jobDistance: "Distance", jobPayout: "Payout",
    jobTime: "Est. time",
    driverVerification: "Driver verification",
    verifTitle: "Identity verification",
    verifDesc: "We need to verify your identity to ensure user safety.",
    verifStep1: "Photo of your ID (front)",
    verifStep1Desc: "National ID, passport or driver's license",
    verifStep2: "Photo of your ID (back)",
    verifStep2Desc: "If your ID has a back side",
    verifStep3: "Selfie with your ID",
    verifStep3Desc: "Hold your ID next to your face, visible",
    verifStep4: "Personal info",
    verifStep4Desc: "Name, surname, date of birth",
    takePhoto: "Take photo", retakePhoto: "Retake", uploadPhoto: "Upload",
    idFront: "ID front", idBack: "ID back", selfieWithId: "Selfie with ID",
    fullName: "Full name", firstName: "First name", lastName: "Last name",
    birthDate: "Date of birth", phoneNumber: "Phone", address: "Address",
    vehicle: "Vehicle", vehicleCar: "Car", vehicleBike: "Bike",
    vehicleScooter: "Scooter", vehicleWalk: "On foot",
    submitVerification: "Submit for verification",
    verifPending: "Verification in progress",
    verifPendingDesc: "Response within 24-48h",
    verifApproved: "Verification approved",
    verifApprovedDesc: "You can now deliver",
    verifRejected: "Verification rejected",
    verifRejectedDesc: "Check reasons and resubmit",
    verifReason: "Reason", resubmit: "Resubmit",
  },
};

/* Short entries for 14 other languages (fallback to English) */
function pdAddLang(code, name, tagline, greeting, search, nav) {
  PD_I18N[code] = Object.assign({}, PD_I18N.en, {
    appName: name, tagline: tagline, greeting_morning: greeting,
    search: search, navHome: nav.home, navSearch: nav.search,
    navScan: nav.scan, navOrders: nav.orders, navProfile: nav.profile,
  });
}
pdAddLang("es", "PharmaDroid", "Tu farmacia inteligente", "Buenos dias",
  "Buscar", { home: "Inicio", search: "Buscar", scan: "Escanear", orders: "Pedidos", profile: "Perfil" });
pdAddLang("pt", "PharmaDroid", "Sua farmacia inteligente", "Bom dia",
  "Buscar", { home: "Inicio", search: "Buscar", scan: "Escanear", orders: "Pedidos", profile: "Perfil" });
pdAddLang("de", "PharmaDroid", "Deine intelligente Apotheke", "Guten Morgen",
  "Suchen", { home: "Start", search: "Suchen", scan: "Scannen", orders: "Bestellungen", profile: "Profil" });
pdAddLang("it", "PharmaDroid", "La tua farmacia intelligente", "Buongiorno",
  "Cerca", { home: "Home", search: "Cerca", scan: "Scansiona", orders: "Ordini", profile: "Profilo" });
pdAddLang("nl", "PharmaDroid", "Jouw slimme apotheek", "Goedemorgen",
  "Zoeken", { home: "Home", search: "Zoeken", scan: "Scan", orders: "Bestellingen", profile: "Profiel" });
pdAddLang("tr", "PharmaDroid", "Akilli eczaneniz", "Gunaydin",
  "Ara", { home: "Ana sayfa", search: "Ara", scan: "Tara", orders: "Siparisler", profile: "Profil" });
pdAddLang("ru", "PharmaDroid", "Vasha umnaya apteka", "Dobroye utro",
  "Poisk", { home: "Glavnaya", search: "Poisk", scan: "Skan", orders: "Zakazy", profile: "Profil" });
pdAddLang("ar", "PharmaDroid", "Saydaliyatuka adh-dhakiyya", "Sabah al-khayr",
  "Bahth", { home: "Ar-ra'isiyya", search: "Bahth", scan: "Mashh", orders: "Talabat", profile: "Al-malaf" });
pdAddLang("zh", "PharmaDroid", "Nin de zhineng yaodian", "Zao shang hao",
  "Sousuo", { home: "Shouye", search: "Sousuo", scan: "Saomiao", orders: "Dingdan", profile: "Gerenziliao" });
pdAddLang("ja", "PharmaDroid", "Anata no sumato yakkyoku", "Ohayou",
  "Kensaku", { home: "Homu", search: "Kensaku", scan: "Sukyan", orders: "Chumon", profile: "Purofairu" });
pdAddLang("ko", "PharmaDroid", "Danshin-ui smart yakguk", "Annyeonghaseyo",
  "Geomsaek", { home: "Hom", search: "Geomsaek", scan: "Seukaen", orders: "Jumun", profile: "Peuropil" });
pdAddLang("hi", "PharmaDroid", "Aapki smart pharmacy", "Namaste",
  "Khojo", { home: "Ghar", search: "Khojo", scan: "Scan", orders: "Orders", profile: "Profile" });
pdAddLang("sw", "PharmaDroid", "Duka lako la dawa la akili", "Habari ya asubuhi",
  "Tafuta", { home: "Nyumbani", search: "Tafuta", scan: "Changanua", orders: "Maagizo", profile: "Wasifu" });
pdAddLang("pl", "PharmaDroid", "Twoja inteligentna apteka", "Dzien dobry",
  "Szukaj", { home: "Glowna", search: "Szukaj", scan: "Skanuj", orders: "Zamowienia", profile: "Profil" });

/* Translation lookup */
function pd(key) {
  var dict = PD_I18N[_pdLang] || PD_I18N.fr;
  if (dict[key] !== undefined) return dict[key];
  if (PD_I18N.fr[key] !== undefined) return PD_I18N.fr[key];
  return key;
}

function pdSetLang(lang) {
  if (!PD_I18N[lang]) return;
  _pdLang = lang;
  localStorage.setItem(PD_KEYS.lang, lang);
}

function pdGreeting() {
  var h = new Date().getHours();
  if (h < 12) return pd("greeting_morning");
  if (h < 18) return pd("greeting_day");
  if (h < 22) return pd("greeting_evening");
  return pd("greeting_night");
}

const PD_LANGS = [
  {code:"fr",name:"Francais",flag:"🇫🇷"},
  {code:"en",name:"English",flag:"🇬🇧"},
  {code:"es",name:"Espanol",flag:"🇪🇸"},
  {code:"pt",name:"Portugues",flag:"🇵🇹"},
  {code:"de",name:"Deutsch",flag:"🇩🇪"},
  {code:"it",name:"Italiano",flag:"🇮🇹"},
  {code:"nl",name:"Nederlands",flag:"🇳🇱"},
  {code:"tr",name:"Turkce",flag:"🇹🇷"},
  {code:"ru",name:"Russkiy",flag:"🇷🇺"},
  {code:"ar",name:"Arabiyyah",flag:"🇸🇦"},
  {code:"zh",name:"Zhongwen",flag:"🇨🇳"},
  {code:"ja",name:"Nihongo",flag:"🇯🇵"},
  {code:"ko",name:"Hangugeo",flag:"🇰🇷"},
  {code:"hi",name:"Hindi",flag:"🇮🇳"},
  {code:"sw",name:"Kiswahili",flag:"🇰🇪"},
  {code:"pl",name:"Polski",flag:"🇵🇱"},
];


/* ══════ js/data/meds.js ══════ */
/* PharmaDroid — Medication Database
 * 40+ common medications with patient + pro data.
 * Each entry has:
 *   id, brand (brand name), dci (molecule / INN), category, form, lab,
 *   prescription (bool), emoji, color,
 *   patient: { description, indications, howTo, sideEffects, warnings }
 *   pro: { atc, posology, contraindications, interactions, pharmacology }
 */

const PD_CATEGORIES = [
  { id: "pain",       label: { fr:"Antidouleur", en:"Pain relief" },      emoji: "🩹", color: "red" },
  { id: "antibio",    label: { fr:"Antibiotique", en:"Antibiotic" },      emoji: "💊", color: "orange" },
  { id: "antiinflam", label: { fr:"Anti-inflammatoire", en:"Anti-inflam" },emoji: "🔥", color: "red" },
  { id: "allergy",    label: { fr:"Allergie", en:"Allergy" },             emoji: "🤧", color: "yellow" },
  { id: "digestive",  label: { fr:"Digestion", en:"Digestive" },          emoji: "🫄", color: "green" },
  { id: "cardio",     label: { fr:"Cardio", en:"Cardio" },                emoji: "❤️", color: "red" },
  { id: "respi",      label: { fr:"Respiratoire", en:"Respiratory" },     emoji: "🫁", color: "blue" },
  { id: "derma",      label: { fr:"Peau", en:"Skin" },                    emoji: "🧴", color: "purple" },
  { id: "vitamin",    label: { fr:"Vitamine", en:"Vitamin" },             emoji: "🍊", color: "orange" },
  { id: "sleep",      label: { fr:"Sommeil", en:"Sleep" },                emoji: "😴", color: "purple" },
  { id: "mental",     label: { fr:"Mental", en:"Mental" },                emoji: "🧠", color: "blue" },
  { id: "diabetes",   label: { fr:"Diabete", en:"Diabetes" },             emoji: "🩸", color: "red" },
];

const PD_MEDS = [
  /* === PAIN RELIEF === */
  {
    id: "doliprane500", brand: "Doliprane", dci: "Paracetamol", category: "pain",
    form: "Comprime 500mg", lab: "Sanofi", prescription: false, emoji: "💊", color: "red",
    patient: {
      description: "Antidouleur et anti-fievre classique. Tres sur quand bien dose.",
      indications: ["Maux de tete", "Fievre", "Douleurs legeres a moderees"],
      howTo: "1 comprime toutes les 4 a 6h. Max 6 par jour (3g). Attention a ne pas depasser 4g/jour.",
      sideEffects: ["Tres rares aux doses normales"],
      warnings: ["Ne pas depasser 4g/jour", "Attention si probleme de foie", "Alcool deconseille"],
    },
    pro: {
      atc: "N02BE01", posology: "500mg-1g x 4-6/j. Max 4g/j. Reduire si insuffisance hepatique.",
      contraindications: ["Insuffisance hepatocellulaire severe", "Hypersensibilite"],
      interactions: ["Alcool (hepatotoxicite)", "Anticoagulants oraux (INR)"],
      pharmacology: "Analgesique et antipyretique. Mecanisme central, inhibe COX-3.",
    },
  },
  {
    id: "ibuprofene200", brand: "Nurofen", dci: "Ibuprofene", category: "antiinflam",
    form: "Comprime 200mg", lab: "Reckitt", prescription: false, emoji: "💊", color: "orange",
    patient: {
      description: "Anti-inflammatoire et antidouleur. Efficace contre inflammation, regles douloureuses.",
      indications: ["Douleurs musculaires", "Regles douloureuses", "Maux de tete", "Fievre"],
      howTo: "1 a 2 comprimes 3 fois par jour, pendant les repas.",
      sideEffects: ["Brulures d'estomac", "Nausees", "Vertiges"],
      warnings: ["Prendre avec nourriture", "Eviter si ulcere", "Interaction avec aspirine"],
    },
    pro: {
      atc: "M01AE01", posology: "200-400mg x 3/j. Max 1200mg/j OTC, 2400mg/j sur ordonnance.",
      contraindications: ["Ulcere gastroduodenal", "Insuffisance renale severe", "3e trimestre grossesse"],
      interactions: ["AVK", "Aspirine", "IEC", "Lithium", "Methotrexate"],
      pharmacology: "AINS non selectif, inhibiteur COX-1 et COX-2.",
    },
  },
  {
    id: "aspirine500", brand: "Aspirine UPSA", dci: "Acide acetylsalicylique", category: "pain",
    form: "Comprime effervescent 500mg", lab: "UPSA", prescription: false, emoji: "💊", color: "red",
    patient: {
      description: "Antidouleur, anti-fievre et fluidifiant sanguin a faible dose.",
      indications: ["Douleurs legeres", "Fievre", "Prevention cardiovasculaire (100mg)"],
      howTo: "1 comprime 2 a 3 fois par jour, pendant les repas.",
      sideEffects: ["Brulures d'estomac", "Saignements"],
      warnings: ["Pas avant 15 ans", "Pas pendant la grossesse (3e trim)", "Risque hemorragique"],
    },
    pro: {
      atc: "N02BA01", posology: "500mg-1g x 3-4/j. Antiagregant: 75-160mg/j.",
      contraindications: ["Ulcere actif", "Syndrome hemorragique", "Enfant < 16 ans (Reye)"],
      interactions: ["AVK", "AINS", "Methotrexate", "ISRS (hemorragie)"],
      pharmacology: "AINS, inhibition COX irreversible. Antiagregant a dose faible.",
    },
  },
  {
    id: "tramadol50", brand: "Topalgic", dci: "Tramadol", category: "pain",
    form: "Gelule 50mg", lab: "Grunenthal", prescription: true, emoji: "💊", color: "red",
    patient: {
      description: "Antidouleur puissant pour douleurs moderees a severes.",
      indications: ["Douleurs moderees a severes", "Douleurs post-op"],
      howTo: "1 gelule toutes les 4 a 6h. Max 8 par jour.",
      sideEffects: ["Nausees", "Somnolence", "Constipation", "Vertiges"],
      warnings: ["Pas de conduite", "Risque de dependance", "Pas d'alcool"],
    },
    pro: {
      atc: "N02AX02", posology: "50-100mg x 4/j. Max 400mg/j.",
      contraindications: ["Intox alcoolique aigue", "IMAO", "Epilepsie non controlee"],
      interactions: ["ISRS (serotoninergique)", "IMAO", "Alcool", "Opiaces"],
      pharmacology: "Agoniste opiace mu + inhibition recapture 5HT/NA.",
    },
  },

  /* === ANTIBIOTICS === */
  {
    id: "amoxicilline500", brand: "Clamoxyl", dci: "Amoxicilline", category: "antibio",
    form: "Gelule 500mg", lab: "GSK", prescription: true, emoji: "💊", color: "orange",
    patient: {
      description: "Antibiotique courant de la famille des penicillines.",
      indications: ["Infections ORL", "Infections respiratoires", "Infections urinaires"],
      howTo: "1 gelule 3 fois par jour pendant 7 jours. Aller au bout du traitement.",
      sideEffects: ["Diarrhee", "Nausees", "Allergies"],
      warnings: ["Allergie penicilline = interdite", "Finir le traitement meme si mieux"],
    },
    pro: {
      atc: "J01CA04", posology: "500mg-1g x 3/j. Enfant: 25-50mg/kg/j en 3 prises.",
      contraindications: ["Allergie beta-lactamines", "Mononucleose (rash)"],
      interactions: ["Methotrexate", "Allopurinol (rash)", "CO (pilule)"],
      pharmacology: "Aminopenicilline, bactericide, inhibe synthese paroi bacterienne.",
    },
  },
  {
    id: "azithromycine250", brand: "Zithromax", dci: "Azithromycine", category: "antibio",
    form: "Comprime 250mg", lab: "Pfizer", prescription: true, emoji: "💊", color: "orange",
    patient: {
      description: "Antibiotique macrolide, utile en cas d'allergie penicilline.",
      indications: ["Infections ORL", "Bronchites", "Infections genitales"],
      howTo: "2 comprimes le 1er jour, puis 1 par jour pendant 4 jours.",
      sideEffects: ["Troubles digestifs", "Rythme cardiaque"],
      warnings: ["Risque cardiaque (QT long)", "A distance des repas"],
    },
    pro: {
      atc: "J01FA10", posology: "500mg J1 puis 250mg x 4j. Ou 500mg x 3j.",
      contraindications: ["Allergie macrolides", "QT long", "Insuffisance hepatique severe"],
      interactions: ["Statines (rhabdo)", "Anticoagulants", "Ergotamine", "Colchicine"],
      pharmacology: "Macrolide, inhibiteur sous-unite 50S ribosome.",
    },
  },

  /* === ANTI-INFLAM / CORTICOIDS === */
  {
    id: "diclofenac50", brand: "Voltarene", dci: "Diclofenac", category: "antiinflam",
    form: "Comprime 50mg", lab: "Novartis", prescription: true, emoji: "💊", color: "orange",
    patient: {
      description: "Anti-inflammatoire puissant pour douleurs articulaires.",
      indications: ["Arthrose", "Tendinites", "Lombalgie", "Crise de goutte"],
      howTo: "1 comprime 2 a 3 fois par jour pendant les repas.",
      sideEffects: ["Brulures d'estomac", "Vertiges", "HTA"],
      warnings: ["Risque cardiovasculaire", "Avec protection gastrique si long terme"],
    },
    pro: {
      atc: "M01AB05", posology: "50mg x 2-3/j. Max 150mg/j.",
      contraindications: ["Ulcere actif", "IC severe", "Grossesse 3e trim"],
      interactions: ["AVK", "Lithium", "Methotrexate", "Diuretiques"],
      pharmacology: "AINS, inhibition COX-1 et COX-2 preferentielle.",
    },
  },
  {
    id: "prednisolone20", brand: "Solupred", dci: "Prednisolone", category: "antiinflam",
    form: "Comprime orodispersible 20mg", lab: "Sanofi", prescription: true, emoji: "💊", color: "red",
    patient: {
      description: "Corticoide (cortisone) anti-inflammatoire puissant.",
      indications: ["Crise d'asthme", "Allergie severe", "Maladies auto-immunes"],
      howTo: "Selon prescription, le matin avec un verre d'eau.",
      sideEffects: ["Prise de poids", "Insomnie", "HTA", "Osteoporose (long terme)"],
      warnings: ["Ne JAMAIS arreter brutalement", "Regime sans sel", "Attention diabete"],
    },
    pro: {
      atc: "H02AB06", posology: "0.5-1mg/kg/j. Decroissance progressive obligatoire.",
      contraindications: ["Infection non controlee", "Ulcere actif", "Psychose"],
      interactions: ["AINS", "AVK", "Diuretiques", "Vaccins vivants"],
      pharmacology: "Glucocorticoide de synthese, anti-inflammatoire et immunosuppresseur.",
    },
  },

  /* === ALLERGY === */
  {
    id: "cetirizine10", brand: "Zyrtec", dci: "Cetirizine", category: "allergy",
    form: "Comprime 10mg", lab: "UCB", prescription: false, emoji: "💊", color: "yellow",
    patient: {
      description: "Antihistaminique contre les allergies, peu sedatif.",
      indications: ["Rhume des foins", "Urticaire", "Conjonctivite allergique"],
      howTo: "1 comprime par jour, de preference le soir.",
      sideEffects: ["Somnolence legere", "Bouche seche"],
      warnings: ["Peu d'impact sur la conduite", "Adapter dose si insuffisance renale"],
    },
    pro: {
      atc: "R06AE07", posology: "10mg/j. Reduire a 5mg si IR.",
      contraindications: ["Insuffisance renale severe", "Hypersensibilite"],
      interactions: ["Alcool (somnolence)", "Depresseurs SNC"],
      pharmacology: "Antihistaminique H1 de 2e generation, peu penetrant SNC.",
    },
  },
  {
    id: "loratadine10", brand: "Clarityne", dci: "Loratadine", category: "allergy",
    form: "Comprime 10mg", lab: "Bayer", prescription: false, emoji: "💊", color: "yellow",
    patient: {
      description: "Antihistaminique non sedatif pour allergies.",
      indications: ["Rhinite allergique", "Urticaire chronique"],
      howTo: "1 comprime par jour, a n'importe quelle heure.",
      sideEffects: ["Maux de tete rares", "Fatigue legere"],
      warnings: ["Pas d'impact significatif sur la conduite"],
    },
    pro: {
      atc: "R06AX13", posology: "10mg x 1/j.",
      contraindications: ["Hypersensibilite"],
      interactions: ["Inducteurs CYP3A4", "Ketoconazole"],
      pharmacology: "Antihistaminique H1 de 2e generation, pas de penetration SNC.",
    },
  },

  /* === DIGESTIVE === */
  {
    id: "omeprazole20", brand: "Mopral", dci: "Omeprazole", category: "digestive",
    form: "Gelule 20mg", lab: "AstraZeneca", prescription: false, emoji: "💊", color: "green",
    patient: {
      description: "Reduit l'acidite gastrique. Pour brulures et ulceres.",
      indications: ["RGO", "Ulcere", "Gastrite", "Prevention AINS"],
      howTo: "1 gelule le matin a jeun, 30 min avant le repas.",
      sideEffects: ["Maux de tete", "Diarrhee", "Nausees"],
      warnings: ["Pas plus de 14 jours sans avis medical", "Attention long terme (Mg, B12)"],
    },
    pro: {
      atc: "A02BC01", posology: "20-40mg/j le matin a jeun.",
      contraindications: ["Hypersensibilite", "Association atazanavir"],
      interactions: ["Clopidogrel", "Methotrexate", "Digoxine", "Atazanavir"],
      pharmacology: "IPP, inhibiteur irreversible pompe H+/K+ ATPase.",
    },
  },
  {
    id: "smecta", brand: "Smecta", dci: "Diosmectite", category: "digestive",
    form: "Sachet poudre 3g", lab: "Ipsen", prescription: false, emoji: "💊", color: "green",
    patient: {
      description: "Pansement intestinal contre diarrhees et brulures.",
      indications: ["Diarrhee aigue", "Brulures gastriques"],
      howTo: "1 sachet dilue dans de l'eau 3 fois par jour.",
      sideEffects: ["Constipation rare"],
      warnings: ["Distance 2h d'autres medicaments", "Retire du marche pediatrique <2 ans"],
    },
    pro: {
      atc: "A07BC05", posology: "3 sachets/j. Adulte.",
      contraindications: ["Enfant < 2 ans", "Hypersensibilite"],
      interactions: ["Reduction absorption de tous les medicaments (espacer 2h)"],
      pharmacology: "Silicate d'aluminium et magnesium, adsorbant et protecteur muqueux.",
    },
  },
  {
    id: "imodium2", brand: "Imodium", dci: "Loperamide", category: "digestive",
    form: "Gelule 2mg", lab: "Janssen", prescription: false, emoji: "💊", color: "green",
    patient: {
      description: "Ralentit le transit pour arreter la diarrhee.",
      indications: ["Diarrhee aigue non infectieuse"],
      howTo: "2 gelules puis 1 apres chaque selle liquide. Max 8/j.",
      sideEffects: ["Constipation", "Ballonnements"],
      warnings: ["Pas si fievre ou sang dans selles", "Max 2 jours sans avis"],
    },
    pro: {
      atc: "A07DA03", posology: "4mg puis 2mg/selle. Max 16mg/j.",
      contraindications: ["Colite", "Dysenterie", "Ileus"],
      interactions: ["Quinidine", "Ritonavir"],
      pharmacology: "Agoniste opiace mu periferique (pas de penetration SNC).",
    },
  },

  /* === CARDIO === */
  {
    id: "amlodipine5", brand: "Amlor", dci: "Amlodipine", category: "cardio",
    form: "Gelule 5mg", lab: "Pfizer", prescription: true, emoji: "💊", color: "red",
    patient: {
      description: "Traite l'hypertension et l'angine de poitrine.",
      indications: ["HTA", "Angor"],
      howTo: "1 gelule par jour, meme heure.",
      sideEffects: ["Oedeme des chevilles", "Bouffees de chaleur", "Maux de tete"],
      warnings: ["Pas d'arret brutal", "Eviter pamplemousse"],
    },
    pro: {
      atc: "C08CA01", posology: "5-10mg/j.",
      contraindications: ["Choc cardiogenique", "Stenose aortique severe"],
      interactions: ["Simvastatine > 20mg", "Pamplemousse (CYP3A4)", "Dantrolene"],
      pharmacology: "Inhibiteur calcique dihydropyridine, vasodilatateur.",
    },
  },
  {
    id: "ramipril5", brand: "Triatec", dci: "Ramipril", category: "cardio",
    form: "Comprime 5mg", lab: "Sanofi", prescription: true, emoji: "💊", color: "red",
    patient: {
      description: "Traite l'hypertension et l'insuffisance cardiaque.",
      indications: ["HTA", "Insuffisance cardiaque", "Post-IDM"],
      howTo: "1 comprime par jour, meme heure.",
      sideEffects: ["Toux seche", "Hyperkaliemie", "Vertiges"],
      warnings: ["Controle K+ et creat", "Pas grossesse", "Pas AINS si possible"],
    },
    pro: {
      atc: "C09AA05", posology: "1.25-10mg/j.",
      contraindications: ["Grossesse", "Stenose bilaterale art. renales", "Angioedeme"],
      interactions: ["AINS", "Diuretiques epargneurs K+", "Lithium"],
      pharmacology: "IEC, reduit formation angiotensine II.",
    },
  },
  {
    id: "atorvastatine20", brand: "Tahor", dci: "Atorvastatine", category: "cardio",
    form: "Comprime 20mg", lab: "Pfizer", prescription: true, emoji: "💊", color: "red",
    patient: {
      description: "Reduit le cholesterol sanguin.",
      indications: ["Hypercholesterolemie", "Prevention cardiovasculaire"],
      howTo: "1 comprime le soir.",
      sideEffects: ["Douleurs musculaires", "Troubles digestifs"],
      warnings: ["Surveiller CPK si douleurs muscu", "Pas pamplemousse"],
    },
    pro: {
      atc: "C10AA05", posology: "10-80mg/j.",
      contraindications: ["Insuffisance hepatique", "Grossesse", "Allaitement"],
      interactions: ["Pamplemousse", "Macrolides", "Fibrates", "Ciclosporine"],
      pharmacology: "Statine, inhibiteur HMG-CoA reductase.",
    },
  },

  /* === RESPIRATORY === */
  {
    id: "ventoline100", brand: "Ventoline", dci: "Salbutamol", category: "respi",
    form: "Aerosol 100mcg/dose", lab: "GSK", prescription: true, emoji: "💨", color: "blue",
    patient: {
      description: "Bronchodilatateur d'urgence pour crise d'asthme.",
      indications: ["Crise d'asthme", "Bronchospasme"],
      howTo: "1 a 2 bouffees en cas de gene. Max 12/j.",
      sideEffects: ["Tremblements", "Palpitations", "Maux de tete"],
      warnings: ["Si besoin > 4/sem, consulter", "Pas efficace si inhalation mauvaise"],
    },
    pro: {
      atc: "R03AC02", posology: "100-200mcg x 4/j si besoin.",
      contraindications: ["Hypersensibilite"],
      interactions: ["Beta-bloquants", "Diuretiques (K+)", "IMAO"],
      pharmacology: "Beta-2 agoniste selectif de courte duree.",
    },
  },
  {
    id: "symbicort", brand: "Symbicort", dci: "Budesonide+Formoterol", category: "respi",
    form: "Turbuhaler 200/6", lab: "AstraZeneca", prescription: true, emoji: "💨", color: "blue",
    patient: {
      description: "Traitement de fond de l'asthme (corticoide + bronchodilatateur).",
      indications: ["Asthme persistant", "BPCO"],
      howTo: "1 a 2 bouffees matin et soir. Rincer la bouche apres.",
      sideEffects: ["Candidose buccale", "Dysphonie", "Tremblements"],
      warnings: ["Bien rincer la bouche", "Pas a arreter seul"],
    },
    pro: {
      atc: "R03AK07", posology: "1-2 bouffees x 2/j. SMART possible.",
      contraindications: ["Hypersensibilite"],
      interactions: ["Inhibiteurs CYP3A4 (ritonavir)", "Beta-bloquants"],
      pharmacology: "CSI + beta-2 agoniste longue duree.",
    },
  },

  /* === SLEEP / MENTAL === */
  {
    id: "zolpidem10", brand: "Stilnox", dci: "Zolpidem", category: "sleep",
    form: "Comprime 10mg", lab: "Sanofi", prescription: true, emoji: "😴", color: "purple",
    patient: {
      description: "Somnifere pour insomnies ponctuelles.",
      indications: ["Insomnie a court terme"],
      howTo: "1 comprime au coucher. Max 4 semaines.",
      sideEffects: ["Somnolence diurne", "Troubles memoire", "Dependance"],
      warnings: ["Risque dependance", "Pas de conduite", "Pas alcool"],
    },
    pro: {
      atc: "N05CF02", posology: "10mg au coucher. 5mg si sujet age.",
      contraindications: ["Apnee du sommeil severe", "Myasthenie", "Insuffisance respi"],
      interactions: ["Depresseurs SNC", "Alcool", "Opiaces"],
      pharmacology: "Imidazopyridine, agoniste GABA-A (recepteur omega-1).",
    },
  },
  {
    id: "xanax025", brand: "Xanax", dci: "Alprazolam", category: "mental",
    form: "Comprime 0.25mg", lab: "Pfizer", prescription: true, emoji: "💊", color: "purple",
    patient: {
      description: "Anxiolytique (benzodiazepine) pour crises d'angoisse.",
      indications: ["Anxiete severe", "Attaques de panique"],
      howTo: "Selon prescription. Duree limitee.",
      sideEffects: ["Somnolence", "Memoire", "Dependance"],
      warnings: ["Risque dependance majeur", "Pas d'arret brutal", "Pas d'alcool"],
    },
    pro: {
      atc: "N05BA12", posology: "0.25-0.5mg x 3/j. Max 3mg/j.",
      contraindications: ["Myasthenie", "Insuffisance respi", "Apnee severe"],
      interactions: ["Alcool", "Opiaces", "Inhibiteurs CYP3A4"],
      pharmacology: "Benzodiazepine, agoniste GABA-A.",
    },
  },

  /* === VITAMINS === */
  {
    id: "vitD3", brand: "Zymad", dci: "Cholecalciferol", category: "vitamin",
    form: "Solution buvable 10000 UI/ml", lab: "Zambon", prescription: false, emoji: "💊", color: "yellow",
    patient: {
      description: "Vitamine D pour os solides et immunite.",
      indications: ["Carence en vitamine D", "Prevention osteoporose"],
      howTo: "Selon prescription. Souvent 1 ampoule tous les 3 mois.",
      sideEffects: ["Tres rares aux doses normales"],
      warnings: ["Ne pas surdoser", "Bilan phospho-calcique"],
    },
    pro: {
      atc: "A11CC05", posology: "800-100000 UI selon indication.",
      contraindications: ["Hypercalcemie", "Hypercalciurie", "Lithiase calcique"],
      interactions: ["Digitaliques (hypercalcemie)", "Diuretiques thiazidiques"],
      pharmacology: "Vitamine D3, regulation metabolisme phospho-calcique.",
    },
  },
  {
    id: "vitC500", brand: "Upsa C", dci: "Acide ascorbique", category: "vitamin",
    form: "Comprime effervescent 500mg", lab: "UPSA", prescription: false, emoji: "🍊", color: "orange",
    patient: {
      description: "Vitamine C pour l'immunite et lutte contre la fatigue.",
      indications: ["Fatigue passagere", "Prevention scorbut"],
      howTo: "1 comprime dans un verre d'eau, le matin.",
      sideEffects: ["Insomnie si prise tardive", "Brulures gastriques"],
      warnings: ["Pas le soir", "Surveillance si calcul renal"],
    },
    pro: {
      atc: "A11GA01", posology: "500-1000mg/j.",
      contraindications: ["Lithiase oxalique"],
      interactions: ["Fer (augmente absorption)", "AVK"],
      pharmacology: "Vitamine C, antioxydant.",
    },
  },

  /* === DIABETES === */
  {
    id: "metformine500", brand: "Glucophage", dci: "Metformine", category: "diabetes",
    form: "Comprime 500mg", lab: "Merck", prescription: true, emoji: "💊", color: "red",
    patient: {
      description: "Traitement de reference du diabete de type 2.",
      indications: ["Diabete type 2"],
      howTo: "1 comprime 2 a 3 fois par jour pendant les repas.",
      sideEffects: ["Troubles digestifs (diarrhee)", "Gout metallique"],
      warnings: ["Risque acidose lactique (rare)", "Arret avant chirurgie/IRM"],
    },
    pro: {
      atc: "A10BA02", posology: "500mg-1g x 2-3/j. Max 3g/j.",
      contraindications: ["IR severe", "Insuffisance hepatique", "Acidose"],
      interactions: ["Diuretiques", "IEC", "Produits iodes (ARRET 48h)"],
      pharmacology: "Biguanide, inhibe neoglucogenese hepatique.",
    },
  },

  /* === OTC COMMON === */
  {
    id: "strepsils", brand: "Strepsils", dci: "Amylmetacresol+Dichlorobenzyl", category: "respi",
    form: "Pastille", lab: "Reckitt", prescription: false, emoji: "🍬", color: "blue",
    patient: {
      description: "Pastille pour mal de gorge.",
      indications: ["Mal de gorge"],
      howTo: "1 pastille toutes les 2-3h, laisser fondre.",
      sideEffects: ["Rares"],
      warnings: ["Si persiste > 5 jours, consulter"],
    },
    pro: {
      atc: "R02AA03", posology: "1 pastille toutes les 2-3h. Max 8/j.",
      contraindications: ["Hypersensibilite"],
      interactions: ["Aucune significative"],
      pharmacology: "Antiseptique local.",
    },
  },
  {
    id: "gaviscon", brand: "Gaviscon", dci: "Alginate+Bicarbonate", category: "digestive",
    form: "Suspension buvable", lab: "Reckitt", prescription: false, emoji: "💊", color: "green",
    patient: {
      description: "Contre les brulures d'estomac et le reflux.",
      indications: ["RGO leger", "Brulures d'estomac"],
      howTo: "1 sachet apres les repas et au coucher.",
      sideEffects: ["Rares, ballonnements"],
      warnings: ["Espacer 2h des autres medicaments"],
    },
    pro: {
      atc: "A02BX13", posology: "10-20ml x 3-4/j.",
      contraindications: ["Hypersensibilite"],
      interactions: ["Absorption reduite (espacer 2h)"],
      pharmacology: "Antireflux forme radeau sur contenu gastrique.",
    },
  },
  {
    id: "humex", brand: "Humex Rhume", dci: "Paracetamol+Pseudoephedrine", category: "respi",
    form: "Comprime", lab: "Urgo", prescription: false, emoji: "🤧", color: "blue",
    patient: {
      description: "Soulage les symptomes du rhume (nez bouche, fievre).",
      indications: ["Rhume", "Etat grippal"],
      howTo: "1 comprime 3 fois par jour. Max 4 jours.",
      sideEffects: ["Insomnie", "Palpitations", "Bouche seche"],
      warnings: ["Pas si HTA", "Pas enceinte", "Pas le soir"],
    },
    pro: {
      atc: "R05X", posology: "1 cp x 3/j. Max 4 jours.",
      contraindications: ["HTA severe", "Coronaropathie", "Glaucome", "Retention urinaire"],
      interactions: ["IMAO", "Sympathomimetiques", "Alcool"],
      pharmacology: "Paracetamol + vasoconstricteur nasal.",
    },
  },
  {
    id: "dafalgan1000", brand: "Dafalgan", dci: "Paracetamol", category: "pain",
    form: "Comprime 1g", lab: "UPSA", prescription: false, emoji: "💊", color: "red",
    patient: {
      description: "Paracetamol dose a 1g pour douleurs moderees.",
      indications: ["Douleurs moderees", "Fievre"],
      howTo: "1 comprime toutes les 6h. Max 3 par jour.",
      sideEffects: ["Tres rares"],
      warnings: ["Max 3g/j a cette dose", "Ne pas cumuler avec autre paracetamol"],
    },
    pro: {
      atc: "N02BE01", posology: "1g x 3/j. Max 3g/j a cette presentation.",
      contraindications: ["Insuffisance hepatique severe"],
      interactions: ["Alcool (hepatotoxicite)", "AVK"],
      pharmacology: "Analgesique et antipyretique central.",
    },
  },

  /* === DERMA === */
  {
    id: "biafine", brand: "Biafine", dci: "Trolamine", category: "derma",
    form: "Emulsion cutanee", lab: "Johnson", prescription: false, emoji: "🧴", color: "purple",
    patient: {
      description: "Creme pour brulures superficielles et plaies.",
      indications: ["Brulures 1er/2e degre", "Coups de soleil", "Plaies non infectees"],
      howTo: "Appliquer en couche epaisse 2-3 fois par jour.",
      sideEffects: ["Irritation rare"],
      warnings: ["Pas sur plaies infectees ou qui saignent"],
    },
    pro: {
      atc: "D03AX12", posology: "2-4 applications/j.",
      contraindications: ["Plaies infectees", "Hypersensibilite"],
      interactions: ["Aucune systemique"],
      pharmacology: "Emulsion hydratante et cicatrisante.",
    },
  },
  {
    id: "hydrocortisone", brand: "Locapred", dci: "Desonide", category: "derma",
    form: "Creme 0.1%", lab: "Pierre Fabre", prescription: true, emoji: "🧴", color: "purple",
    patient: {
      description: "Corticoide local pour eczema et inflammations.",
      indications: ["Eczema", "Dermatite atopique", "Psoriasis"],
      howTo: "Appliquer en fine couche 1-2 fois par jour.",
      sideEffects: ["Atrophie cutanee si usage prolonge", "Infections"],
      warnings: ["Pas sur le visage sans avis", "Pas sur infections cutanees"],
    },
    pro: {
      atc: "D07AB08", posology: "1-2 applications/j. Duree courte.",
      contraindications: ["Infections cutanees", "Tuberculose cutanee", "Acne"],
      interactions: ["Aucune systemique pertinente"],
      pharmacology: "Corticoide activite faible.",
    },
  },
];

/* Helper: find med by ID */
function pdFindMed(id) {
  for (var i = 0; i < PD_MEDS.length; i++) if (PD_MEDS[i].id === id) return PD_MEDS[i];
  return null;
}

/* Search meds by query (brand, dci, category) */
function pdSearchMeds(query) {
  if (!query) return PD_MEDS.slice();
  var q = query.toLowerCase().trim();
  return PD_MEDS.filter(function(m) {
    return m.brand.toLowerCase().indexOf(q) !== -1 ||
           m.dci.toLowerCase().indexOf(q) !== -1 ||
           m.category.indexOf(q) !== -1;
  });
}

function pdMedsByCategory(catId) {
  return PD_MEDS.filter(function(m) { return m.category === catId; });
}

function pdCategoryInfo(catId) {
  for (var i = 0; i < PD_CATEGORIES.length; i++) if (PD_CATEGORIES[i].id === catId) return PD_CATEGORIES[i];
  return null;
}


/* ══════ js/data/pharmacies.js ══════ */
/* PharmaDroid — Pharmacy Directory (mock data)
 * In production: fetched from API with geolocation filtering.
 */

const PD_PHARMACIES = [
  {
    id: "pharma-centrale",
    name: "Pharmacie Centrale",
    address: "12 Rue de la Liberte, Douala",
    distance: 0.4, /* km from user */
    rating: 4.8,
    reviews: 234,
    open: true,
    hours: "8h - 20h",
    phone: "+237 699 001 001",
    services: ["delivery", "onduty", "scan"],
    avgPrepTime: 8, /* minutes */
    emoji: "🏥",
  },
  {
    id: "pharma-croix-verte",
    name: "Pharmacie de la Croix Verte",
    address: "45 Avenue Charles de Gaulle, Yaounde",
    distance: 0.8,
    rating: 4.6,
    reviews: 187,
    open: true,
    hours: "7h30 - 22h",
    phone: "+237 699 002 002",
    services: ["delivery", "onduty"],
    avgPrepTime: 12,
    emoji: "🏥",
  },
  {
    id: "pharma-sante-plus",
    name: "Pharmacie Sante Plus",
    address: "8 Boulevard de l'Unite, Bonaberi",
    distance: 1.2,
    rating: 4.4,
    reviews: 96,
    open: true,
    hours: "8h - 19h",
    phone: "+237 699 003 003",
    services: ["scan"],
    avgPrepTime: 15,
    emoji: "🏥",
  },
  {
    id: "pharma-akwa",
    name: "Pharmacie d'Akwa",
    address: "23 Rue Joss, Akwa",
    distance: 1.8,
    rating: 4.7,
    reviews: 312,
    open: true,
    hours: "24h/24",
    phone: "+237 699 004 004",
    services: ["delivery", "onduty", "scan"],
    avgPrepTime: 6,
    emoji: "🏥",
  },
  {
    id: "pharma-bonapriso",
    name: "Pharmacie Bonapriso",
    address: "67 Rue Drouot, Bonapriso",
    distance: 2.3,
    rating: 4.3,
    reviews: 78,
    open: false,
    hours: "8h - 19h",
    phone: "+237 699 005 005",
    services: [],
    avgPrepTime: 20,
    emoji: "🏥",
  },
  {
    id: "pharma-pk9",
    name: "Pharmacie PK9",
    address: "PK9 Carrefour, Douala",
    distance: 3.1,
    rating: 4.5,
    reviews: 145,
    open: true,
    hours: "7h - 21h",
    phone: "+237 699 006 006",
    services: ["delivery"],
    avgPrepTime: 10,
    emoji: "🏥",
  },
];

function pdFindPharmacy(id) {
  for (var i = 0; i < PD_PHARMACIES.length; i++) if (PD_PHARMACIES[i].id === id) return PD_PHARMACIES[i];
  return null;
}

function pdNearbyPharmacies(maxDistance, requireDelivery) {
  maxDistance = maxDistance || 5;
  return PD_PHARMACIES.filter(function(p) {
    if (p.distance > maxDistance) return false;
    if (requireDelivery && p.services.indexOf("delivery") === -1) return false;
    return p.open;
  }).sort(function(a, b) { return a.distance - b.distance; });
}


/* ══════ js/data/interactions.js ══════ */
/* PharmaDroid — Interaction Rules Database
 * Each rule: [molecule_a, molecule_b, severity, reason_fr, reason_en]
 * Keys are DCI (INN) molecule names, lowercase.
 */

const PD_INTERACTIONS = [
  /* Major / Critical interactions */
  {
    a: "ibuprofene", b: "aspirine", severity: 3,
    reason_fr: "Augmente le risque de saignement digestif et reduit l'effet cardioprotecteur de l'aspirine.",
    reason_en: "Increases GI bleeding risk and reduces aspirin's cardioprotective effect.",
  },
  {
    a: "tramadol", b: "alcool", severity: 4,
    reason_fr: "Depression respiratoire severe, risque vital.",
    reason_en: "Severe respiratory depression, life-threatening.",
  },
  {
    a: "zolpidem", b: "alprazolam", severity: 3,
    reason_fr: "Sommation des effets sedatifs, risque de somnolence extreme et depression respiratoire.",
    reason_en: "Summation of sedative effects, risk of extreme drowsiness.",
  },
  {
    a: "zolpidem", b: "alcool", severity: 4,
    reason_fr: "Depression du SNC dangereuse, peut entrainer perte de conscience.",
    reason_en: "Dangerous CNS depression, can cause loss of consciousness.",
  },
  {
    a: "alprazolam", b: "alcool", severity: 4,
    reason_fr: "Depression respiratoire, risque vital.",
    reason_en: "Respiratory depression, life-threatening.",
  },
  {
    a: "tramadol", b: "alprazolam", severity: 3,
    reason_fr: "Depression du SNC majoree, somnolence intense.",
    reason_en: "Increased CNS depression.",
  },

  /* Moderate interactions */
  {
    a: "amlodipine", b: "atorvastatine", severity: 2,
    reason_fr: "Augmentation de la concentration de la statine, risque de douleurs musculaires.",
    reason_en: "Increased statin concentration, risk of muscle pain.",
  },
  {
    a: "omeprazole", b: "clopidogrel", severity: 2,
    reason_fr: "Reduit l'efficacite antiagregante du clopidogrel. Preferer pantoprazole.",
    reason_en: "Reduces clopidogrel efficacy. Prefer pantoprazole.",
  },
  {
    a: "ibuprofene", b: "ramipril", severity: 2,
    reason_fr: "Diminue l'effet antihypertenseur. Surveiller TA et fonction renale.",
    reason_en: "Reduces antihypertensive effect. Monitor BP and kidney.",
  },
  {
    a: "diclofenac", b: "ramipril", severity: 2,
    reason_fr: "Diminue l'effet antihypertenseur, risque IRA chez sujet age.",
    reason_en: "Reduces antihypertensive effect, risk of acute kidney injury.",
  },
  {
    a: "ibuprofene", b: "metformine", severity: 2,
    reason_fr: "Peut aggraver le risque d'acidose lactique.",
    reason_en: "May increase lactic acidosis risk.",
  },
  {
    a: "amoxicilline", b: "methotrexate", severity: 2,
    reason_fr: "Peut augmenter la toxicite du methotrexate.",
    reason_en: "May increase methotrexate toxicity.",
  },
  {
    a: "azithromycine", b: "amiodarone", severity: 3,
    reason_fr: "Risque d'allongement du QT et torsades de pointe.",
    reason_en: "QT prolongation and torsades risk.",
  },
  {
    a: "paracetamol", b: "alcool", severity: 2,
    reason_fr: "Augmente le risque de toxicite hepatique si alcool regulier.",
    reason_en: "Increases hepatic toxicity with regular alcohol.",
  },

  /* Minor interactions */
  {
    a: "cetirizine", b: "alcool", severity: 1,
    reason_fr: "Somnolence potentiellement majoree.",
    reason_en: "Possible increased drowsiness.",
  },
  {
    a: "loratadine", b: "alcool", severity: 1,
    reason_fr: "Effet sedatif faible potentiellement majore.",
    reason_en: "Mild sedative effect may be increased.",
  },
  {
    a: "aspirine", b: "alcool", severity: 2,
    reason_fr: "Augmente le risque de saignement digestif.",
    reason_en: "Increases GI bleeding risk.",
  },
  {
    a: "vitamin_c", b: "fer", severity: 0,
    reason_fr: "La vitamine C ameliore l'absorption du fer (effet recherche).",
    reason_en: "Vitamin C improves iron absorption (beneficial).",
  },
  {
    a: "diosmectite", b: "paracetamol", severity: 1,
    reason_fr: "Peut reduire l'absorption du paracetamol. Espacer de 2h.",
    reason_en: "May reduce paracetamol absorption. Space 2h apart.",
  },
  {
    a: "diosmectite", b: "amoxicilline", severity: 1,
    reason_fr: "Peut reduire l'absorption. Espacer de 2h.",
    reason_en: "May reduce absorption. Space 2h apart.",
  },
];

/* Normalize molecule names for comparison (lowercase, accents removed) */
function pdNormalizeMol(name) {
  return String(name || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/* Find interaction between two molecules */
function pdFindInteraction(molA, molB) {
  var a = pdNormalizeMol(molA);
  var b = pdNormalizeMol(molB);
  if (!a || !b || a === b) return null;
  for (var i = 0; i < PD_INTERACTIONS.length; i++) {
    var rule = PD_INTERACTIONS[i];
    var ra = pdNormalizeMol(rule.a);
    var rb = pdNormalizeMol(rule.b);
    if ((a.indexOf(ra) !== -1 && b.indexOf(rb) !== -1) ||
        (a.indexOf(rb) !== -1 && b.indexOf(ra) !== -1)) {
      return rule;
    }
  }
  return null;
}

/* Check all pairs in a list of meds, return list of interactions.
 * Tries to match on DCI, then brand name, so rules like "aspirine" can match
 * meds with DCI "Acide acetylsalicylique" via brand "Aspirine UPSA".
 */
function pdCheckInteractions(medList) {
  var results = [];
  for (var i = 0; i < medList.length; i++) {
    for (var j = i + 1; j < medList.length; j++) {
      var medA = medList[i], medB = medList[j];
      var namesA = [medA.dci, medA.brand].filter(Boolean);
      var namesB = [medB.dci, medB.brand].filter(Boolean);
      var interaction = null;
      for (var a = 0; a < namesA.length && !interaction; a++) {
        for (var b = 0; b < namesB.length && !interaction; b++) {
          interaction = pdFindInteraction(namesA[a], namesB[b]);
        }
      }
      if (interaction && interaction.severity > 0) {
        results.push({
          medA: medA, medB: medB,
          severity: interaction.severity,
          reason_fr: interaction.reason_fr,
          reason_en: interaction.reason_en,
        });
      }
    }
  }
  return results.sort(function(x, y) { return y.severity - x.severity; });
}

function pdSeverityColor(severity) {
  switch (severity) {
    case 0: return "sevNone";
    case 1: return "sevMinor";
    case 2: return "sevModerate";
    case 3: return "sevMajor";
    case 4: return "sevCritical";
    default: return "sevNone";
  }
}

function pdSeverityLabel(severity) {
  var labels = {
    0: { fr: "Aucune", en: "None" },
    1: { fr: "Mineure", en: "Minor" },
    2: { fr: "Moderee", en: "Moderate" },
    3: { fr: "Majeure", en: "Major" },
    4: { fr: "Contre-indiquee", en: "Critical" },
  };
  return (labels[severity] && labels[severity][_pdLang]) || labels[severity].en;
}


/* ══════ js/storage.js ══════ */
/* PharmaDroid — Storage layer (localStorage wrapper) */

function pdLoad(key, defaultVal) {
  try {
    var raw = localStorage.getItem(key);
    if (raw === null) return defaultVal;
    return JSON.parse(raw);
  } catch (e) { return defaultVal; }
}
function pdSave(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
}

/* Profile */
function pdGetProfile() {
  return pdLoad(PD_KEYS.profile, {
    name: "",
    age: null,
    weight: null,
    height: null,
    gender: null,
    allergies: [],
    conditions: [],
    pregnancy: false,
    breastfeeding: false,
    role: PD_ROLE.USER,
  });
}
function pdSetProfile(p) { pdSave(PD_KEYS.profile, p); }

/* Settings */
function pdGetSettings() {
  return pdLoad(PD_KEYS.settings, {
    mode: PD_MODE.PATIENT,
    notifications: true,
    sound: true,
    darkMode: false,
  });
}
function pdSetSettings(s) { pdSave(PD_KEYS.settings, s); }

/* User medications list */
function pdGetMyMeds() { return pdLoad(PD_KEYS.medications, []); }
function pdSetMyMeds(meds) { pdSave(PD_KEYS.medications, meds); }
function pdAddMyMed(medId) {
  var list = pdGetMyMeds();
  if (list.indexOf(medId) === -1) list.push(medId);
  pdSetMyMeds(list);
}
function pdRemoveMyMed(medId) {
  var list = pdGetMyMeds().filter(function(id) { return id !== medId; });
  pdSetMyMeds(list);
}

/* Favorites */
function pdGetFavorites() { return pdLoad(PD_KEYS.favorites, []); }
function pdToggleFavorite(medId) {
  var list = pdGetFavorites();
  var idx = list.indexOf(medId);
  if (idx !== -1) list.splice(idx, 1);
  else list.push(medId);
  pdSave(PD_KEYS.favorites, list);
  return idx === -1;
}
function pdIsFavorite(medId) { return pdGetFavorites().indexOf(medId) !== -1; }

/* Search history */
function pdGetHistory() { return pdLoad(PD_KEYS.history, []); }
function pdAddToHistory(query) {
  var list = pdGetHistory().filter(function(q) { return q !== query; });
  list.unshift(query);
  pdSave(PD_KEYS.history, list.slice(0, 10));
}
function pdClearHistory() { pdSave(PD_KEYS.history, []); }

/* Reminders */
function pdGetReminders() { return pdLoad(PD_KEYS.reminders, []); }
function pdAddReminder(rem) {
  var list = pdGetReminders();
  rem.id = rem.id || ("r_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7));
  list.push(rem);
  pdSave(PD_KEYS.reminders, list);
  return rem.id;
}
function pdUpdateReminder(id, patch) {
  var list = pdGetReminders();
  var idx = -1;
  for (var i = 0; i < list.length; i++) if (list[i].id === id) { idx = i; break; }
  if (idx === -1) return;
  list[idx] = Object.assign({}, list[idx], patch);
  pdSave(PD_KEYS.reminders, list);
}
function pdDeleteReminder(id) {
  var list = pdGetReminders().filter(function(r) { return r.id !== id; });
  pdSave(PD_KEYS.reminders, list);
}

/* Orders */
function pdGetOrders() { return pdLoad(PD_KEYS.orders, []); }
function pdAddOrder(order) {
  var list = pdGetOrders();
  order.id = order.id || ("ord_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7));
  order.createdAt = order.createdAt || Date.now();
  list.unshift(order);
  pdSave(PD_KEYS.orders, list);
  return order.id;
}
function pdUpdateOrder(id, patch) {
  var list = pdGetOrders();
  var idx = -1;
  for (var i = 0; i < list.length; i++) if (list[i].id === id) { idx = i; break; }
  if (idx === -1) return;
  list[idx] = Object.assign({}, list[idx], patch);
  pdSave(PD_KEYS.orders, list);
}
function pdFindOrder(id) {
  var list = pdGetOrders();
  for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
  return null;
}

/* Driver-specific */
function pdGetDriverProfile() {
  return pdLoad(PD_KEYS.driverProfile, {
    verified: PD_VERIF.NONE,
    firstName: "", lastName: "", birthDate: "",
    phone: "", address: "",
    vehicle: "car",
    idFrontPhoto: null,   /* data URL */
    idBackPhoto: null,
    selfiePhoto: null,
    submittedAt: null,
    rating: 5.0,
    totalDeliveries: 0,
    totalEarnings: 0,
  });
}
function pdSetDriverProfile(p) { pdSave(PD_KEYS.driverProfile, p); }
function pdIsDriverApproved() {
  return pdGetDriverProfile().verified === PD_VERIF.APPROVED;
}
function pdGetDriverOnline() { return pdLoad(PD_KEYS.driverOnline, false); }
function pdSetDriverOnline(on) { pdSave(PD_KEYS.driverOnline, !!on); }

/* Onboarded flag */
function pdIsOnboarded() { return pdLoad(PD_KEYS.onboarded, false); }
function pdSetOnboarded(v) { pdSave(PD_KEYS.onboarded, !!v); }

/* Reset all */
function pdResetAll() {
  Object.keys(PD_KEYS).forEach(function(k) {
    localStorage.removeItem(PD_KEYS[k]);
  });
}


/* ══════ js/order.js ══════ */
/* PharmaDroid — Order management
 * Create, track, update orders.
 * Order shape:
 *  { id, items:[{medId, brand, qty}], pharmacyId, deliveryType, address,
 *    status, createdAt, qrCode, estPrepTime, totalPrice, driverId,
 *    timeline: [{status, at}] }
 */

function pdCreateOrder(items, pharmacyId, deliveryType, address) {
  var pharmacy = pdFindPharmacy(pharmacyId);
  var order = {
    items: items || [],
    pharmacyId: pharmacyId,
    pharmacyName: pharmacy ? pharmacy.name : "",
    deliveryType: deliveryType || PD_DELIVERY.PICKUP,
    address: address || "",
    status: PD_ORDER_STATUS.SENT,
    estPrepTime: pharmacy ? pharmacy.avgPrepTime : 10,
    deliveryFee: deliveryType === PD_DELIVERY.DELIVERY ? PD_DELIVERY_FEE : 0,
    driverId: null,
    driverName: null,
    qrCode: pdGenerateQRData(),
    timeline: [{ status: PD_ORDER_STATUS.SENT, at: Date.now() }],
  };
  order.id = pdAddOrder(order);
  return order;
}

function pdGenerateQRData() {
  /* Unique token for pickup verification */
  return "PD-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

function pdAdvanceOrderStatus(orderId, newStatus, extra) {
  var order = pdFindOrder(orderId);
  if (!order) return null;
  var timeline = order.timeline || [];
  timeline.push({ status: newStatus, at: Date.now() });
  var patch = Object.assign({ status: newStatus, timeline: timeline }, extra || {});
  pdUpdateOrder(orderId, patch);
  return pdFindOrder(orderId);
}

/* Simulate pharmacy workflow:
 * SENT -> PREPARING (after 30s) -> READY (after est. prep time)
 * Called periodically from app loop.
 */
function pdSimulateOrderProgress(order) {
  var now = Date.now();
  var age = now - order.createdAt;
  var prepMs = (order.estPrepTime || 10) * 60 * 1000;

  if (order.status === PD_ORDER_STATUS.SENT && age > 15 * 1000) {
    pdAdvanceOrderStatus(order.id, PD_ORDER_STATUS.PREPARING);
    return true;
  }
  if (order.status === PD_ORDER_STATUS.PREPARING && age > prepMs) {
    pdAdvanceOrderStatus(order.id, PD_ORDER_STATUS.READY);
    return true;
  }
  return false;
}

/* Cancel order */
function pdCancelOrder(orderId) {
  pdAdvanceOrderStatus(orderId, PD_ORDER_STATUS.CANCELLED);
}

/* Get active orders (not collected, not cancelled) */
function pdGetActiveOrders() {
  return pdGetOrders().filter(function(o) {
    return o.status !== PD_ORDER_STATUS.COLLECTED && o.status !== PD_ORDER_STATUS.CANCELLED;
  });
}

/* Compute total */
function pdOrderSubtotal(order) {
  /* Mock pricing — real app would have prices per med */
  return order.items.reduce(function(sum, it) { return sum + (it.price || 2.50) * (it.qty || 1); }, 0);
}

function pdOrderTotal(order) {
  return pdOrderSubtotal(order) + (order.deliveryFee || 0);
}

/* Status label helper */
function pdOrderStatusLabel(status) {
  switch (status) {
    case PD_ORDER_STATUS.DRAFT:          return pd("draft") || "Brouillon";
    case PD_ORDER_STATUS.SENT:           return pd("orderSent");
    case PD_ORDER_STATUS.PREPARING:      return pd("orderPreparing");
    case PD_ORDER_STATUS.READY:          return pd("orderReady");
    case PD_ORDER_STATUS.DRIVER_ASSIGNED:return pd("driverOnWay");
    case PD_ORDER_STATUS.PICKED_UP:      return pd("driverArrivedPharmacy");
    case PD_ORDER_STATUS.DELIVERING:     return pd("driverOnWay");
    case PD_ORDER_STATUS.COLLECTED:      return pd("delivered");
    case PD_ORDER_STATUS.CANCELLED:      return pd("orderCancelled");
    default: return status;
  }
}

function pdOrderStatusColor(status) {
  switch (status) {
    case PD_ORDER_STATUS.READY:
    case PD_ORDER_STATUS.COLLECTED:
      return "green";
    case PD_ORDER_STATUS.PREPARING:
    case PD_ORDER_STATUS.DRIVER_ASSIGNED:
    case PD_ORDER_STATUS.PICKED_UP:
    case PD_ORDER_STATUS.DELIVERING:
      return "blue";
    case PD_ORDER_STATUS.CANCELLED:
      return "red";
    default:
      return "orange";
  }
}

/* QR rendering — produces SVG path for a simple visual QR (mock)
 * Real QR code would use a library — this is a decorative placeholder.
 */
function pdQRSvg(data, size) {
  size = size || 200;
  var cells = 25;
  var cellSize = size / cells;
  /* Generate deterministic pattern from data hash */
  var hash = 0;
  for (var i = 0; i < data.length; i++) hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  var grid = [];
  for (var y = 0; y < cells; y++) {
    var row = [];
    for (var x = 0; x < cells; x++) {
      var h = ((hash + x * 31 + y * 17) * 2654435761) >>> 0;
      row.push(h % 2);
    }
    grid.push(row);
  }
  /* Force corner finder patterns */
  function finder(gx, gy) {
    for (var yy = 0; yy < 7; yy++)
      for (var xx = 0; xx < 7; xx++) {
        var v = (xx === 0 || xx === 6 || yy === 0 || yy === 6 ||
                 (xx >= 2 && xx <= 4 && yy >= 2 && yy <= 4)) ? 1 : 0;
        grid[gy + yy][gx + xx] = v;
      }
  }
  finder(0, 0); finder(cells - 7, 0); finder(0, cells - 7);

  var rects = "";
  for (var y2 = 0; y2 < cells; y2++)
    for (var x2 = 0; x2 < cells; x2++)
      if (grid[y2][x2]) rects += '<rect x="' + (x2 * cellSize) + '" y="' + (y2 * cellSize) + '" width="' + cellSize + '" height="' + cellSize + '"/>';
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" style="background:white;border-radius:12px"><g fill="#1E2D3A">' + rects + '</g></svg>';
}


/* ══════ js/delivery.js ══════ */
/* PharmaDroid — Delivery System
 * Driver workflow:
 *  1. Sees available jobs (orders with deliveryType=DELIVERY + status=READY + no driverId)
 *  2. Accepts -> status DRIVER_ASSIGNED
 *  3. At pharmacy, scans QR -> status PICKED_UP
 *  4. Marks delivering -> status DELIVERING
 *  5. At customer, customer scans -> status COLLECTED
 */

/* Available jobs for online drivers */
function pdAvailableJobs() {
  return pdGetOrders().filter(function(o) {
    return o.deliveryType === PD_DELIVERY.DELIVERY &&
           o.status === PD_ORDER_STATUS.READY &&
           !o.driverId;
  });
}

/* Driver's current jobs */
function pdDriverActiveJobs() {
  var profile = pdGetDriverProfile();
  return pdGetOrders().filter(function(o) {
    return o.driverId === profile.id &&
           [PD_ORDER_STATUS.DRIVER_ASSIGNED, PD_ORDER_STATUS.PICKED_UP, PD_ORDER_STATUS.DELIVERING].indexOf(o.status) !== -1;
  });
}

function pdDriverCompletedJobs() {
  var profile = pdGetDriverProfile();
  return pdGetOrders().filter(function(o) {
    return o.driverId === profile.id && o.status === PD_ORDER_STATUS.COLLECTED;
  });
}

/* Accept a job */
function pdAcceptJob(orderId) {
  var profile = pdGetDriverProfile();
  if (!pdIsDriverApproved()) return { ok: false, reason: "notApproved" };
  var order = pdFindOrder(orderId);
  if (!order) return { ok: false, reason: "notFound" };
  if (order.driverId) return { ok: false, reason: "taken" };

  var driverId = profile.id || ("driver_" + Date.now());
  profile.id = driverId;
  pdSetDriverProfile(profile);

  pdAdvanceOrderStatus(orderId, PD_ORDER_STATUS.DRIVER_ASSIGNED, {
    driverId: driverId,
    driverName: (profile.firstName + " " + profile.lastName).trim() || "Driver",
    driverVehicle: profile.vehicle,
  });
  return { ok: true };
}

/* Decline (no-op for UI — just don't show it) */
function pdDeclineJob(orderId) {
  /* Could be recorded if we wanted fairness */
  return { ok: true };
}

/* Driver picks up package at pharmacy */
function pdPickupPackage(orderId) {
  pdAdvanceOrderStatus(orderId, PD_ORDER_STATUS.PICKED_UP);
}

/* Driver starts delivery */
function pdStartDelivery(orderId) {
  pdAdvanceOrderStatus(orderId, PD_ORDER_STATUS.DELIVERING);
}

/* Complete delivery (customer scans driver's QR) */
function pdCompleteDelivery(orderId) {
  var order = pdFindOrder(orderId);
  if (!order) return { ok: false };
  pdAdvanceOrderStatus(orderId, PD_ORDER_STATUS.COLLECTED);
  /* Update driver stats */
  var profile = pdGetDriverProfile();
  profile.totalDeliveries = (profile.totalDeliveries || 0) + 1;
  profile.totalEarnings = (profile.totalEarnings || 0) + PD_DELIVERY_FEE * 0.8; /* 80% to driver */
  pdSetDriverProfile(profile);
  return { ok: true };
}

/* Estimate delivery time based on distance + vehicle */
function pdEstDeliveryTime(distanceKm, vehicle) {
  var speeds = { car: 25, scooter: 20, bike: 15, walk: 5 }; /* km/h */
  var speed = speeds[vehicle] || 20;
  return Math.ceil((distanceKm / speed) * 60); /* minutes */
}

/* Job payout */
function pdJobPayout() { return PD_DELIVERY_FEE * 0.8; }


/* ══════ js/verification.js ══════ */
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


/* ══════ js/reminders.js ══════ */
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


/* ══════ js/scanner.js ══════ */
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


/* ══════ js/components.js ══════ */
/* PharmaDroid — Shared React components */

/* === LOGO === */
function PdLogo(props) {
  var size = props.size || 64;
  return React.createElement("svg", {
    width: size, height: size, viewBox: "0 0 100 100", fill: "none",
    style: { filter: "drop-shadow(0 4px 12px " + PD.greenGlow + ")" },
  },
    /* Rounded shield */
    React.createElement("rect", { x: 10, y: 10, width: 80, height: 80, rx: 22,
      fill: "url(#pdLogoG)", }),
    React.createElement("defs", null,
      React.createElement("linearGradient", { id: "pdLogoG", x1: 0, y1: 0, x2: 1, y2: 1 },
        React.createElement("stop", { offset: "0", "stop-color": PD.green }),
        React.createElement("stop", { offset: "1", "stop-color": PD.greenDark })
      )
    ),
    /* Cross + capsule */
    React.createElement("rect", { x: 43, y: 26, width: 14, height: 48, rx: 4, fill: "white" }),
    React.createElement("rect", { x: 26, y: 43, width: 48, height: 14, rx: 4, fill: "white" }),
    /* Small pill accent */
    React.createElement("circle", { cx: 50, cy: 50, r: 5, fill: PD.green }),
    React.createElement("circle", { cx: 50, cy: 50, r: 2, fill: "white" })
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


/* ══════ js/screens-main.js ══════ */
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


/* ══════ js/screens-order.js ══════ */
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

  return React.createElement("div", { style: { paddingBottom: 120 } },
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

    /* QR Code (when ready) */
    (order.status === PD_ORDER_STATUS.READY || order.status === PD_ORDER_STATUS.DRIVER_ASSIGNED || order.status === PD_ORDER_STATUS.PICKED_UP) && React.createElement("div", { style: { padding: "0 22px 20px" } },
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


/* ══════ js/screens-user.js ══════ */
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


/* ══════ js/screens-driver.js ══════ */
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
  var step = job.status;
  return React.createElement(PdCard, { key: job.id, style: { padding: 14, borderLeft: "3px solid " + PD.green } },
    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: PD.green, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 } },
      pdOrderStatusLabel(step)
    ),
    React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: PD.text, marginBottom: 4 } }, job.pharmacyName),
    React.createElement("div", { style: { fontSize: 12, color: PD.textLight, marginBottom: 12 } }, job.items.length + " article(s) • " + pdJobPayout().toFixed(2) + " €"),

    step === PD_ORDER_STATUS.DRIVER_ASSIGNED && React.createElement(PdBtn, {
      variant: "primary", fullWidth: true,
      onClick: function() { pdPickupPackage(job.id); pdToast(pd("pickupPackage") + " ✓", "success"); forceRender(Date.now()); }
    }, Pdi.qr, pd("pickupPackage")),

    step === PD_ORDER_STATUS.PICKED_UP && React.createElement(PdBtn, {
      variant: "primary", fullWidth: true,
      onClick: function() { pdStartDelivery(job.id); pdToast(pd("driverOnWay") + " ✓", "info"); forceRender(Date.now()); }
    }, Pdi.truck, pd("goToCustomer")),

    step === PD_ORDER_STATUS.DELIVERING && React.createElement(PdBtn, {
      variant: "primary", fullWidth: true,
      onClick: function() { pdCompleteDelivery(job.id); pdToast(pd("delivered") + " ✓", "success"); forceRender(Date.now()); }
    }, Pdi.check, pd("confirmDelivery"))
  );
}


/* ══════ js/app.js ══════ */
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


/* ══════ js/main.js ══════ */
/* PharmaDroid — Entry point */

(function() {
  var root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(App));
})();

