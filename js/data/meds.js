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
