---
title: Récupérer l'utilisation horaire pour les métriques custom.
type: apicontent
order: 23.2
external_redirect: /api/#get-hourly-usage-for-custom-metrics
---

## Récupérer l'utilisation horaire pour les métriques custom.

Récupérer l'utilisation horaire pour [les métriques custom][1].

##### Arguments
* **`start_hr`** [*obligatoire*]:  
    datetime dans le format ISO-8601 , UTC, précis à l'heure: [YYYY-MM-DDThh] Pour l'usage depuis le début de cette heure
* **`end_hr`** [*optionnel*, *défaut*=**1d+start_hr**]:  
    datetime dans le format ISO-8601 , UTC, précis à l'heure: [YYYY-MM-DDThh] Pour l'usage AVANT le début de cette heure

[1]: /developers/metrics/custom_metrics/
