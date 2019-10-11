---
title: Obtenir l'utilisation horaire pour des métriques custom
type: apicontent
order: 33.3
external_redirect: '/api/#obtenir-l-utilisation-horaire-pour-des-metriques-custom'
---
## Obtenir l'utilisation horaire pour des métriques custom

Obtenez l'utilisation horaire pour [des métriques custom][1].

##### Arguments
* **`start_hr`** [*obligatoire*] :
    datetime au format ISO-8601, UTC, à l'heure près : [AAAA-MM-JJThh] pour une utilisation commençant à cette heure
* **`end_hr`** [*facultatif*, *défaut*=**1d+start_hr**] :
    datetime au format ISO-8601, UTC, à l'heure près : [AAAA-MM-JJThh] pour une utilisation se terminant AVANT cette heure

[1]: /fr/developers/metrics/custom_metrics