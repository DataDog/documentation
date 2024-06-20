---
title: Représentation des centiles dans Datadog
aliases:
  - /fr/graphing/faq/how-to-graph-percentiles-in-datadog
  - /fr/graphing/guide/how-to-graph-percentiles-in-datadog
---
## Implémentation DogStatsD

Vous pouvez obtenir des centiles dans Datadog en envoyant des données sous la forme de métrique histogram via DogStatsD. L'Agent intègre un serveur [DogStatsD][1] qui reçoit des paquets [DogStatsD][1], [réalise l'agrégation des données][2] et envoie les métriques de centile finales à Datadog.

Étant donné que cette agrégation se fait au niveau de la collecte, elle ne peut pas être utilisée comme fonction visuelle dans l'interface graphique.

Les données histogram contiennent le 95e centile, le 50e centile, la moyenne, la valeur maximale et le nombre de valeurs.

* [Présentation rapide de DogStatsD][1]

* [Clients DogStatsD disponibles pour chaque langage de programmation][3]

### Centiles supplémentaires

La ligne « histogram_percentiles » du fichier de configuration de l'Agent vous permet d'obtenir des centiles supplémentaires, notamment :

* histogram_percentiles: 0.95, 0.75

[En savoir plus sur les données histogram][4]

## Agrégations locales

Les histogrammes sont calculés toutes les 10 secondes sur un host par l'Agent Datadog. Ce calcul s'effectue par host. Un tel modèle de collecte a ses avantages et ses limites.

### Avantages

* Les points de données bruts utilisés pour calculer les métriques histogram ne sont pas exposés ni transmis au site Datadog.
* StatsD traite les agrégations pertinentes et envoie directement le package de données calculées au serveur Datadog.

### Inconvénients

* Si vous possédez deux flux de transmission de données agrégées, il n'est pas actuellement possible d'agréger les points de données bruts des deux flux. Vous pouvez uniquement agréger les agrégations.
    * Exemple : le calcul de la moyenne sur `<NOM_MÉTRIQUE>.avg` pour toutes les régions tient compte des valeurs de flux moyennes pour chaque région et génère une moyenne de moyennes.

* Tout changement visant à augmenter la complexité des tags (ajout de tags pour gagner en spécificité) entraîne la modification du comportement d'une visualisation de métriques cumulées.
    * Exemple : `<NOM_MÉTRIQUE>.avg` (sans aucun tag) agrège tous les points de données bruts (StatsD tient compte de tous les points de données bruts, les agrège, puis les transmet via un flux de métriques unique). Néanmoins, si vous ajoutez par exemple un tag de région (US, EU), StatsD regroupe les points de données bruts en deux compartiments, les agrège, puis les transmet via deux flux. Le graphique AVG `<NOM_MÉTRIQUE>.avg` avec le paramètre * contient donc deux flux, et non un seul.

[En savoir plus sur les caractéristiques des histogrammes Datadog][5]

[1]: /fr/metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
[3]: /fr/developers/community/libraries/
[4]: /fr/metrics/types/?tab=histogram#metric-types
[5]: /fr/developers/faq/characteristics-of-datadog-histograms/