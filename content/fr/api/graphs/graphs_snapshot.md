---
title: Snapshot de graphique
type: apicontent
order: 13.1
external_redirect: '/api/#snapshot-de-graphique'
---
## Snapshot de graphique

**Remarque** : lorsqu'un snapshot est créé, [vous devez attendre un certain temps][1] avant de pouvoir y accéder.

**ARGUMENTS**:

* **`metric_query`** [*obligatoire*] :
    la requête de la métrique.
* **`start`** [*obligatoire*] :
    le timestamp POSIX de début de la requête.
* **`end`** [*obligatoire*] :
    le timestamp POSIX de fin de la requête.
* **`event_query`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    une requête qui ajoute des lignes d'événements au graphique.
* **`graph_def`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    un document JSON définissant le graphique. `graph_def` peut être utilisé à la place de `metric_query`. Le document JSON utilise la [grammaire définie ici][2] et doit être formaté sur une seule ligne. L'encodage URL convertit ensuite le contenu du document de façon à pouvoir le transmettre en ligne.
* **`title`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    le titre du graphique. Si aucun titre n'est spécifié, le graphique n'a pas de titre.

[1]: http://andreafalzetti.github.io/blog/2017/04/17/datadog-png-snapshot-not-showing.html
[2]: /fr/dashboards/graphing_json/#grammar