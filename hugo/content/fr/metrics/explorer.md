---
aliases:
- /fr/graphing/metrics/explorer/
description: Plongez au cœur de l'ensemble de vos métriques et effectuez des analyses.
further_reading:
- link: /metrics/summary/
  tag: Documentation
  text: Metrics Summary
- link: /metrics/distributions/
  tag: Documentation
  text: Distributions de métriques
title: Metrics Explorer
---

## Présentation

La page [Metrics Explorer][1] est une interface simple qui vous permet d'explorer vos métriques dans Datadog. Pour accéder à des options plus avancées, créez un [notebook][2], un dashboard ([screenboard][3] ou un [timeboard][4]).

## Graphiques

Utilisez l'éditeur de requêtes pour personnaliser le graphique affiché sur la page du Metrics Explorer.

Vous pouvez indiquer la période dans le coin supérieur droit de la page. La valeur par défaut est **Past 1 Hour**.

{{< img src="metrics/explorer/metrics_explorer.png" alt="Le Metrics Explorer affichant deux requêtes sur un graphique à barres" style="width:80%;" >}}

Les métriques qui n'ont pas été transmises lors des dernières 24 heures ne sont pas indiquées dans lʼéditeur de requêtes. Vous pouvez ajouter manuellement ces métriques à vos graphiques en saisissant leur nom ou leur requête complète.

### Scope

Définissez un contexte de filtrage en sélectionnant ou en recherchant des valeurs de tags depuis la zone de texte **from**. Vous pouvez par exemple utiliser cette zone pour afficher uniquement les valeurs de métrique associées à un host, un cluster, un environnement ou encore une région spécifique.

### Agrégation spatiale

Définissez l'[agrégation spatiale][5] utilisée pour combiner les valeurs d'une métrique.

Les options possibles sont les suivantes :

* Moyenne des valeurs transmises (par défaut)
* Maximum des valeurs transmises
* Minimum des valeurs transmises
* Somme des valeurs transmises

**Remarque** : les options proposées peuvent varier en fonction du type de métrique sélectionné.

### Fonctions et formules

Vous pouvez éventuellement ajouter des fonctions à votre requête en utilisant le bouton fonction. Toutes les fonctions ne sont pas disponibles pour tous les types de métriques. Pour plus d'informations, référez-vous à la documentation relative à la [création de requête][6]. 

### Exporter

Exportez votre graphique vers un dashboard ou un notebook à l'aide des boutons situés en haut à droite. Vous pouvez également utiliser **Split Graph in Notebook** pour visualiser les données divisées en graphiques individuels par région, service, ou environnement.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /fr/notebooks/
[3]: /fr/dashboards/#screenboards
[4]: /fr/dashboards/#get-started
[5]: /fr/metrics/introduction/#space-aggregation
[6]: https://docs.datadoghq.com/fr/dashboards/querying/#advanced-graphing