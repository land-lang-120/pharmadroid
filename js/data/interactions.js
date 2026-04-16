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
