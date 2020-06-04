---
title: Metrics Explorer
kind: documentation
description: Plongez au cœur de l'ensemble de vos métriques et effectuez des analyses.
aliases:
  - /fr/graphing/metrics/explorer/
further_reading:
  - link: /metrics/summary/
    tag: Documentation
    text: Metrics Summary
  - link: /metrics/distributions/
    tag: Documentation
    text: Distributions de métriques
---
## Présentation

La page [Metrics Explorer][1] est une interface simple qui vous permet d'explorer vos métriques dans Datadog. Pour accéder à des options plus avancées, créez un [notebook][2], un dashboard ([screenboard][3] ou un [timeboard][4]).

## Graphiques

Cliquez sur la zone de texte **Graph** pour afficher la liste des métriques que vous avez envoyées à Datadog. Commencez à saisir du texte pour filtrez les métriques, puis cliquez sur une métrique pour la sélectionner. Chaque métrique que vous sélectionnez génère un graphique mis à jour en temps réel sur la droit de la page.

Utilisez les options au-dessus des graphiques pour spécifier un intervalle et la taille du graphique.

{{< img src="metrics/explorer/graphs.png" alt="Metrics Explorer"  style="width:80%;" >}}

**Remarque** : la case **Calculate as count where applicable** apparaît lorsque la métrique est de type `RATE`.

### Contexte

Définissez un contexte de filtrage en sélectionnant ou en recherchant des valeurs de tags depuis la zone de texte **Over**. Vous pouvez par exemple utiliser cette zone pour afficher uniquement les valeurs de métrique associées à un host, un cluster, un environnement ou encore une région spécifique.

### Groupes

Définissez les règles de regroupement en sélectionnant ou en recherchant des clés de tags depuis la zone de texte **One graph per**. Vous pouvez par exemple créer un graphique différent pour chaque host, conteneur, région, environnement, etc. d'une même métrique. Les métriques associées à des tags au format `<KEY>:<VALUE>` peuvent être regroupées.

### Agrégation spatiale

Définissez l'[agrégation spatiale][5] à utiliser pour combiner les valeurs d'une métrique à l'aide de la zone de texte **On each graph, aggregate with the**. Les options proposées sont :

* Moyenne des valeurs transmises (par défaut)
* Maximum des valeurs transmises
* Minimum des valeurs transmises
* Somme des valeurs transmises

**Remarque** : les options proposées peuvent varier en fonction du type de métrique sélectionné.

### Options

Le Metrics Explorer vous permet de modifier les options suivantes :

* Ajouter le préfixe `<VALEUR>` au titre des graphiques : cette option est vide par défaut.
* Afficher jusqu'à `<NOMBRE>` graphiques en même temps : la valeur par défaut est 20.

### Export

Utilisez les boutons en bas à gauche pour exporter tous vos graphiques vers un nouveau timeboard ou un timeboard existant. Pour exporter un graphique spécifique, cliquez sur l'icône d'exportation en haut à droite de celui-ci.

### Snapshot

Pour créer un snapshot d'un graphique spécifique, cliquez sur l'icône en forme d'appareil photo en haut à droite de celui-ci.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /fr/notebooks/
[3]: /fr/dashboards/screenboard/
[4]: /fr/dashboards/timeboard/
[5]: /fr/metrics/introduction/#space-aggregation