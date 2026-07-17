---
aliases:
- /fr/graphing/widgets/query_value/
description: Afficher une valeur agrégée pour une requête de métrique donnée
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Valeur de requête
widget_type: query_value
---

Les valeurs Query Value affichent la valeur actuelle d'une métrique, d'une requête APM ou d'une requête de log donnée. Elles disposent d'une mise en forme conditionnelle (comme un fond vert/jaune/rouge) pour indiquer si la valeur se situe dans la plage attendue. Cela peut être complété par des fonds facultatifs de données de séries temporelles. Les valeurs affichées par une valeur Query Value ne nécessitent pas une mesure instantanée.

Le widget peut afficher la dernière valeur transmise, ou une agrégation calculée à partir de toutes les valeurs de requête de l'intervalle. Ces visualisations offrent un aperçu limité mais explicite de votre requête d'infrastructure. 

{{< img src="/dashboards/widgets/query_value/query_value_change_indicator.png" alt="Widget Query Value" style="width:80%;" >}}

## Configuration

{{< img src="dashboards/widgets/query_value/query-value-widget-setup1.png" alt="Configuration du widget Valeur de requête" style="width:80%;">}}

### Configuration

1. Choisissez les données à représenter :
    * Métrique : consultez la [section Requêtes][1] pour configurer une requête de métrique.
    * Spans indexées : consultez la [documentation sur la recherche de traces][2] pour configurer une requête de span indexée.
    * Événements de log : consultez la [documentation sur la recherche de logs][3] pour configurer une requête d'événement de log.
2. Réduisez les valeurs de la requête à une valeur unique, calculée comme la valeur `avg`, `min`, `sum`, `max` ou `last` de tous les points de données sur l'intervalle de temps spécifié. Les valeurs de centile telles que `p75` ou `p90` peuvent également être utilisées lorsqu'elles sont prises en charge.
3. Choisissez les unités et la mise en forme. L'option de mise en forme automatique adapte la taille du dashboard en tenant compte des unités.
4. Configurez éventuellement un format conditionnel en fonction de la valeur affichée. Consultez la section [Règles de mise en forme visuelle](#visual-formatting-rules) pour plus d'exemples.
5. Superposez éventuellement un fond de série temporelle :
    * Min to Max : un graphique à échelle du minimum au maximum.
    * Line : un graphique à échelle incluant zéro (0). 
    * Bars : affiche des mesures discrètes et périodiques.

### Options

#### Règles de mise en forme visuelle

<div class="alert alert-info">Les règles de mise en forme visuelle doivent être basées sur la valeur brute de la métrique. Si l'unité de base de la métrique est en nanosecondes, mais que la valeur Query Value est automatiquement formatée en secondes, vos règles conditionnelles doivent être basées sur des nanosecondes.</div>

{{< img src="dashboards/widgets/query_value/visual_formatting_rules_custom_img.png" alt="Règles de mise en forme visuelle du widget Query Value avec fond d'image personnalisé" style="width:90%;" >}}

Personnalisez l'arrière-plan de votre widget Query Value avec des règles conditionnelles. Vous avez la possibilité d'ajouter une couleur de fond, une couleur de police ou une image personnalisée. Pour les images personnalisées, vous pouvez soit importer une image depuis votre ordinateur local, soit référencer des images disponibles sur Internet. Les serveurs internes doivent être mis à jour pour prendre en charge les requêtes cross-origin afin de référencer des images internes.

#### Indicateur de changement

Activez l'**indicateur de changement** pour mettre en évidence la façon dont la valeur actuelle se compare à un intervalle de temps précédent.

{{< img src="/dashboards/widgets/query_value/change_indicator_config.png" alt="Options de configuration de l'indicateur de changement du widget Query Value" style="width:90%;" >}}

* **Display** : `Relative Change` (pourcentage), `Absolute Change` (valeur brute), `Both` ou `Off`
* **Color** : `Increases as better` (vert ↑, rouge ↓), `Decreases as better` (rouge ↑, vert ↓) ou `Neutral`
* **Compared to** : `Previous Period`, `Previous Day/Week/Month` ou intervalle de temps `Custom`

Le widget affiche la différence sous la métrique principale, permettant de mettre en évidence les tendances récentes en un coup d'oeil.

#### Liens de contexte

Les [liens de contexte][4] sont activés par défaut, mais vous pouvez les désactiver si vous le souhaitez. Ils relient les widgets de dashboard à d'autres pages dans Datadog ou sur des applications externes.

#### Intervalle global

Choisissez si votre widget a un délai personnalisé ou le délai global du tableau de bord.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][5]**. Le tableau ci-dessous définit le [schéma JSON du widget][6] :

{{< dashboards-widgets-api >}}

### Dépannage
 - Si votre requête utilise une valeur de centile pour agréger les points de données sous-jacents, il est possible que la valeur renvoyée par le widget reste identique sur différents intervalles de temps. Ce comportement peut être attendu avec un grand nombre de points de données sous-jacents. Les variations de valeurs de ce type peuvent généralement être plus facilement observées sur des intervalles de temps plus restreints. Pour plus d'informations sur ce concept, consultez la [loi des grands nombres][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/querying/#overview
[2]: /fr/tracing/trace_explorer/query_syntax/#search-bar
[3]: /fr/logs/search_syntax/
[4]: /fr/dashboards/guide/context-links/
[5]: /fr/api/latest/dashboards/
[6]: /fr/dashboards/graphing_json/widget_json/
[7]: https://en.wikipedia.org/wiki/Law_of_large_numbers