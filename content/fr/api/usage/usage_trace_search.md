---
title: Obtenir l'utilisation horaire pour la recherche de traces
type: apicontent
order: 34.5
external_redirect: "/api/#obtenir-l-utilisation-horaire-pour-la-recherche-de-traces"
---

## Obtenir l'utilisation horaire pour la recherche de traces

Obtenez l'utilisation horaire pour la recherche de traces.

**ARGUMENTS**:

* **`start_hr`** [*obligatoire*] :
    datetime au format ISO-8601, UTC, à l'heure près : [AAAA-MM-JJThh] pour une utilisation commençant à cette heure
* **`end_hr`** [*facultatif*, *défaut*=**1d+start_hr**] :
    datetime au format ISO-8601, UTC, à l'heure près : [AAAA-MM-JJThh] pour une utilisation se terminant AVANT cette heure

##### Réponse

* **`indexed_events_count`** :
  contient le nombre d'événements de recherche de traces indexés.
* **`hour`** :
  l'heure de l'utilisation.
