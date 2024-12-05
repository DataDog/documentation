---
aliases:
- /fr/graphing/widgets/geomap/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /notebooks/
  tag: Documentation
  text: Notebooks
title: Widget Geomap
---

Le widget Geomap représente dans un graphique n'importe quelle métrique avec un tag ou une facette de pays.

{{< img src="dashboards/widgets/geomap/geomap.png" alt="Geomap" >}}

## Configuration

{{< img src="dashboards/widgets/geomap/geomap_setup.png" alt="Top List" style="width:80%;">}}

### Configuration

1. Choisissez les données à représenter :
    * RUM : consultez [la documentation dédiée][1] pour configurer une requête RUM.
    * Événements de log : consultez la [documentation sur la recherche de logs][2] pour configurer une requête d'événement de log.
      * **Remarque** : le tag de regroupement doit inclure un code de pays au format ISO alpha-2. Pour cela, vous pouvez utiliser le [processeur GeoIP][3] ou inclure manuellement les [tags lors de l'ingestion][4].
    * Métrique : consultez la [documentation sur les requêtes][5] pour configurer une requête de métrique.
      * **Remarque** : le tag de regroupement doit inclure un code de pays au format ISO alpha-2. Vous pouvez [générer des métriques à partir des logs ingérés][6] ou inclure manuellement les [tags lors de l'ingestion][4].

2. Facultatif : configurez votre vue en définissant la région sur laquelle vous souhaitez par défaut effectuer un zoom sur la carte.

### Options

#### Intervalle global

Sur les screenboards et les notebooks, choisissez si votre widget doit utiliser un intervalle personnalisé ou l'intervalle global.

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/visualize#timeseries
[2]: /fr/logs/search_syntax/
[3]: /fr/logs/log_configuration/processors/#geoip-parser
[4]: /fr/getting_started/tagging/#defining-tags
[5]: /fr/dashboards/querying/
[6]: /fr/logs/logs_to_metrics/