---
title: Modifier les métadonnées d'une métrique
type: apicontent
order: 15.5
external_redirect: /api/#modifier-les-metadonnes-d-une-metrique
---
## Modifier les métadonnées d'une métrique

L'endpoint des métadonnées des métriques vous permet de modifier les champs des métadonnées d'une métrique spécifique.
[En apprendre plus sur les différents types pris en charge][1].

##### ARGUMENTS

* **`type`** [*obligatoire*] :
    [Type de la métrique][1], p. ex. **gauge** ou **rate**.
* **`description`** [*facultatif*, *défaut* = **None**] :
    Description de la chaîne de caractères de la métrique par défaut.
* **`short_name`** [*obligatoire*] :
    Nom raccourci de la métrique.
* **`unit`** [*facultatif*, *défaut* = **None**] :
    Unité primaire de la métrique, p. ex. **byte** ou **operation**.
* **`per_unit`** [*facultatif*, *défaut* = **None**] :
    Unité secondaire de la métrique, p. ex. **seconde** pour **octets par seconde**.
* **`statsd_interval`** [*facultatif*, *défaut* = **None**] :
    Le cas échéant, statds transmet l'intervalle en secondes pour la métrique.

[1]: /developers/metrics
