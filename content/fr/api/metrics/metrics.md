---
title: Métriques
type: apicontent
order: 26
external_redirect: /api/#metriques
---

## Métriques

L'endpoint métrique vous permet de :

* Envoyez vos données de métriques afin de les afficher sur les dashboards de Datadog.
* Interroger les métriques de n'importe quelle période

Comme dans l'interface utilisateur de Datadog, un graphique ne peut contenir qu'un nombre défini de points. Lorsque la durée d'affichage d'une métrique augmente, les points sont agrégés afin de ne pas dépasser ce nombre.

Ainsi, si vous interrogez des intervalles de données plus grands, les points renvoyés sont davantage agrégés. Dans Datadog, la granularité maximale est d'un point par seconde. Ainsi, si vous avez envoyé des points à cet intervalle et que vous avez demandé un très petit intervalle auprès de l'API de requête (ici, probablement moins de 100 secondes), vous pouvez récupérer tous ces points. Sinon, l'algorithme Datadog essaie de renvoyer environ 150 points par intervalle donné, de sorte que vous observerez une granularité de moins en moins précise à mesure que la durée demandée augmente. Cette agrégation temporelle repose sur un système de moyennes.

Nous conservons les points de métrique à une résolution d'une seconde, mais nous vous recommandons
d'envoyer des points seulement toutes les 15 secondes. Toutes les métriques avec des timestamps composés de fractions d'une seconde sont arrondies à la seconde la plus proche. Si plusieurs points possèdent le même timestamp, le dernier point remplace les précédents.

Une imite souple de 100 séries temporelles par host s'applique. Une série temporelle représente
une combinaison unique d'un tag et d'un nom d'une métrique.
