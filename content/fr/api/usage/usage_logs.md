---
title: Obtenir l'utilisation horaire pour des logs
type: apicontent
order: 33.2
external_redirect: "/api/#obtenir-l-utilisation-horaire-pour-des-logs"
---

## Obtenir l'utilisation horaire pour des logs

Obtenez l'utilisation horaire pour des logs.

##### Arguments
* **`start_hr`** [*obligatoire*] :
    datetime au format ISO-8601, UTC, à l'heure près : [AAAA-MM-JJThh] pour une utilisation commençant à cette heure.
* **`end_hr`** [*facultatif*, *défaut*=**1d+start_hr**] :
    datetime au format ISO-8601, UTC, à l'heure près : [AAAA-MM-JJThh] pour une utilisation se terminant AVANT cette heure.

##### Réponse

* **`ingested_events_bytes`** :
    Correspond au nombre d'octets de log ingérés.
* **`indexed_events_count`** :
    Correspond au nombre d'événements de log indexés.
* **`hour`** :
    L'heure de l'utilisation.
