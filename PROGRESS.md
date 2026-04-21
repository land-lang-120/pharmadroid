# 📊 pharmadroid — Suivi

> Mis à jour : **2026-04-21**

| | |
|---|---|
| **Stack** | Vanilla JS multi-fichiers (~207KB bundle) |
| **Statut** | 🟠 Dev actif |
| **Type** | App pharmacie (B2C + portail B2B) |

---

## ✅ Fait

- Polish UX v2
- Système PIN de livraison
- Portail pharmacie B2B (interface séparée)
- Détection interactions médicamenteuses (par marque + DCI)

## 🔄 En cours

- Logique de vérification des interactions (à fiabiliser)
- UI du portail pharmacie

## 📋 À faire

1. Créer `CAHIER-CHARGES.md` (formaliser produit + workflows pharmacie)
2. Migration TypeScript + Vite
3. Backend Firebase : catalogue médicaments, ordonnances, stock pharmacies
4. Géolocalisation + cartes (trouver pharmacie de garde la plus proche)
5. Scan ordonnance (OCR ou photo)
6. Tests E2E (commande, vérif interaction, livraison)
7. Audit légal — règles vente médicaments en ligne (Cameroun + zone CEMAC)
8. Audit sécurité données médicales
9. Réduction bundle (207KB → cible < 150KB)
10. Build APK + soumission stores
