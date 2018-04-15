---
title: Snapshot de graphique
type: apicontent
order: 12.1
external_redirect: /api/#graph-snapshot
---

## Snapshot de graphique

**Note**: Quand un snapshot est créé, [il y a du retard][1] avant sa disponibilité.

##### ARGUMENTS

* **`metric_query`** [*obligatoire*]:  
    La requête de la métrique.
* **`start`** [*obligatoire*]:  
    Timestamp POSIX du commencement de la requête.
* **`end`** [*obligatoire*]:  
    Timestamp POSIX de la fin de la requête.
* **`event_query`** [*optionnel*, *défaut*=**None**]:  
    Une requête qui ajoute des bandes d'événements au graphique.
* **`graph_def`** [*optionnel*, *défaut*=**None**]:  
    Un document JSON définissant le graphique. `graph_def` peut être utilisé à la place de `metric_query`. Le document JSON utilise la [grammaire définie ici][2] et doit être formaté sur une seule ligne puis URLEncoded.
* **`title`** [*optionnel*, *défaut*=**None**]:  
    Un titre pour le graphique. Si aucun titre n'est spécifié, le graphique n'a pas de titre.

[1]: http://andreafalzetti.github.io/blog/2017/04/17/datadog-png-snapshot-not-showing.html
[2]: /graphing/miscellaneous/graphingjson/#grammar
