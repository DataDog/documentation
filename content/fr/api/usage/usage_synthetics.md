---
title: Obtenir l'utilisation horaire pour Synthetics
type: apicontent
order: 33.6
external_redirect: '/api/#obtenir-l-utilisation-horaire-pour-synthetics'
---
## Obtenir l'utilisation horaire pour Synthetics

Obtenez l'utilisation horaire pour [Synthetics][1].

**ARGUMENTS**:

* **`start_hr`** [*obligatoire*] :
    datetime au format ISO-8601, UTC, à l'heure près : [AAAA-MM-JJThh] pour une utilisation commençant à cette heure
* **`end_hr`** [*facultatif*, *défaut*=**1d+start_hr**] :
    datetime au format ISO-8601, UTC, à l'heure près : [AAAA-MM-JJThh] pour une utilisation se terminant AVANT cette heure

[1]: /fr/synthetics