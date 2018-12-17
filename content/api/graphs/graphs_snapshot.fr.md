---
title: Snapshot de graphique
type: apicontent
order: 12.1
external_redirect: /api/#snapshot-de-graphique
---

## Snapshot de graphique

**Remarque** : lorsqu'un snapshot est créé, [vous devez attendre un certain temps][1] avant de pouvoir y accéder.

##### ARGUMENTS

* **`metric_query`** [*obligatoire*] :
    La requête de la métrique.
* **`start`** [*obligatoire*] :
    Timestamp POSIX du début de la requête.
* **`end`** [*obligatoire*] :
    Timestamp POSIX de fin de la requête.
* **`event_query`** [*facultatif*, *défaut* = **None**] :
    Une requête qui ajoute des bandes d'événements au graphique.
* **`graph_def`** [*facultatif*, *défaut* = **None**] :
    Un document JSON définissant le graphique. `graph_def` peut être utilisé à la place de `metric_query`. Le document JSON utilise la [grammaire définie ici][2] et doit être formaté sur une seule ligne, puis URLEncoded.
* **`title`** [*facultatif*, *défaut* = **None**] :  
    Le titre du graphique. Si aucun titre n'est spécifié, le graphique n'a pas de titre.

[1]: http://andreafalzetti.github.io/blog/2017/04/17/datadog-png-snapshot-not-showing.html
[2]: /graphing/graphing_json/#grammar
