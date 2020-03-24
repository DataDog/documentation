---
title: Modifier les métadonnées d'une métrique
type: apicontent
order: 26.5
external_redirect: '/api/#modifier-les-metadonnees-d-une-metrique'
---
## Modifier les métadonnées d'une métrique

L'endpoint des métadonnées de métriques vous permet de modifier les champs des métadonnées d'une métrique.
[En savoir plus sur les différents types pris en charge][1].

**ARGUMENTS**:

* **`type`** [*obligatoire*] :
    [type de la métrique][1], p. ex. **gauge** ou **rate**.
* **`description`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    description de la chaîne de caractères de la métrique par défaut.
* **`short_name`** [*obligatoire*] :
    nom raccourci de la métrique.
* **`unit`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    unité primaire de la métrique, p. ex. **byte** ou **operation**.
* **`per_unit`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    unité secondaire de la métrique, p. ex. **seconde** pour **octets par seconde**.
* **`statsd_interval`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    le cas échéant, statds transmet l'intervalle en secondes pour la métrique.

[1]: /fr/developers/metrics