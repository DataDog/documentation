---
title: Editer les metadata d'une métrique
type: apicontent
order: 15.5
external_redirect: /api/#edit-metric-metadata
---
## Editer les metadata d'une métrique

L'endpoint des métadonnées des métriques vous permet de modifier les métadonnées sur une métrique spécifique.
[En apprendre plus sur les différents types supportés][1]

**ARGUMENTS**:

* **`type`** [*obligatoire*]:  
    [Type de la métrique][1] tel **gauge** ou **rate**
* **`description`** [*optionnel*, *défaut*=**None**]:  
    String description de la métrique par défaut
* **`short_name`** [*obligatoire*]:  
    Nom raccourci de la métrique.
* **`unit`** [*optionnel*, *défaut*=**None**]:  
    Unité primaire de la métrique telle: **byte** ou **operation**
* **`per_unit`** [*optionnel*, *défaut*=**None**]:  
    Par unité pour la métrique, tel **second** dans **bytes per second**
* **`statsd_interval`** [*optionnel*, *défaut*=**None**]:  
    Si applicable, statds interval d'envoi en seconde pour la métrique.

[1]: /developers/metrics
