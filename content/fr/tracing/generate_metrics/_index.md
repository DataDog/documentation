---
title: Générer des métriques à partir de spans
kind: documentation
description: Générez des métriques custom à partir des spans ingérées.
aliases:
  - /fr/tracing/span_to_metrics/
further_reading:
  - link: tracing/trace_retention_and_ingestion
    tag: Documentation
    text: Personnalisez l'ingestion de traces et conservez les traces importantes.
  - link: tracing/trace_search_and_analytics/query_syntax
    tag: Documentation
    text: Utilisez des requêtes et des monitors Analytics basés sur les traces conservées.
---
<div class="alert alert-warning">
Cette fonctionnalité est actuellement en version bêta privée. <a href="https://docs.google.com/forms/d/1RlT0FNdFjiEzkQgxiCf77ugpW0w5a17X7JQ7E286jM4">Remplissez ce formulaire</a> pour ajouter cette fonctionnalité pour votre compte ou pour recevoir une notification lorsqu'elle deviendra disponible pour tous.
</div>

## Générer des métriques basées sur des spans

Avec Tracing without Limits™, vous pouvez générer des métriques à partir de toutes les spans ingérées, qu'elles soient ou non indexées par un [filtre de rétention][1].

Vous pouvez associer ces métriques à des filtres de rétention et des monitors Analytics, ou les utiliser seules.

Utilisez des métriques custom pour des comparaisons et des requêtes fixes spécifiques. Parallèlement, vous pouvez créer des filtres de rétention afin de concevoir des requêtes arbitraires et d'examiner les traces conservées et de leur flamegraph.

Les métriques custom vous permettent notamment de visualiser des anomalies, de créer des dashboards et monitors et d'observer des tendances en fonction de différents paramètres importants pour votre contexte métier. Toutes les métriques générées sont disponibles pendant 15 mois sous la forme de [métriques custom][2] Datadog.

| Caractéristique                        | Métriques custom générées à partir de spans                   | Filtres de rétention                           |
| -------------------------------------- | -------------------------------------- | --------------------------------- |
| Période de rétention                     | 15 mois                    | 15 jours             |
| Détection d'anomalies                           | Créez un [monitor d'anomalies][3] basé sur les métriques générées.                            | Utilisez Analytics pour comparer les comportements au cours des 15 derniers jours, et plongez au cœur des traces complètes pour identifier l'origine des anomalies.                         |
| Examen des traces correspondantes avec un contexte global                          | S. O. : les métriques custom n'entraînent pas la conservation des traces associées.                            | Conservez exactement les traces pertinentes pour votre contexte métier grâce aux [filtres de rétention][1].                            |
| Granularité du comportement                           | Créez des métriques custom pour les endpoints importants ou pour d'autres groupes à faible cardinalité.                        | Utilisez la fonctionnalité [d'analyse et de recherche][4] pour des endpoints spécifiques ou l'option « Group By » dans [Analytics][5].                    |
| Prévisions ou calculs mathématiques complexes                          | Créez un [monitor de prévisions][6] basé sur les métriques générées.                          |   S. O.                            |

Pour générer des métriques à partir de spans, depuis la page [APM Setup and Configuration][7], sélectionnez l'onglet [Generate Metrics][8] et cliquez sur le bouton **New Metric**.

<br>

{{< img src="tracing/span_to_metrics/GenerateMetrics.png" style="width:100%;" alt="Génerer des métriques à partir de spans ingérées" >}}


### Création d'une métrique basée sur des spans

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="Comment créer une métrique" >}}

1. **Définissez la requête de métrique** : commencez par ajouter une requête afin de filtrer l'ensemble de données souhaité. La [syntaxe de requête][9] est similaire à celle de la fonctionnalité de recherche et d'analyse de l'APM.

1. **Définissez le champ à surveiller** : sélectionnez `*` pour obtenir le nombre total de spans correspondant à votre requête, ou saisissez un attribut (par exemple, `@cassandra_row_count`) pour agréger une valeur numérique et créer sa métrique agrégée correspondante (count, minimum, maximum, sum et average). Si le type d'attribut est une mesure, la valeur de la métrique correspond à la valeur de l'attribut de la span.

1. **Indiquez la dimension de regroupement** : par défaut, les métriques générées à partir de spans ne présentent aucun tag, sauf si des tags y sont explicitement ajoutés. Tout attribut ou tag existant dans vos spans peut être utilisé pour créer des tags de métrique.

1. **Consultez l'aperçu en temps réel de la requête de la fonctionnalité d'analyse et de recherche** : vous pouvez visualiser l'impact de votre requête en temps réel sur la visualisation des données, ainsi que les spans correspondantes dans par votre requête, dans un aperçu en temps réel.

1. **Donnez un nom à votre métrique** : les noms de métriques doivent suivre la [convention de nommage des métriques][10]. Les noms de métriques commençant par `trace.*` ne sont pas autorisés et ne seront pas enregistrés.

**Remarque importante** : les métriques basées sur des spans sont considérées comme des métriques custom pour la facturation. Évitez donc d'effectuer des regroupements à partir d'attributs sans restriction ou présentant une cardinalité extrêmement élevée, tels que des timestamps, des ID utilisateur, des ID de requête ou des ID de session, pour éviter une hausse conséquente de vos coûts.

### Mise à jour des métriques basées sur des spans existantes

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="Modifier une métrique existante" >}}

Lorsqu'une métrique est créée, seuls deux champs peuvent être mis à jour :

| Champ                                 | Motif                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Requête de filtre de flux                  | Modifier l'ensemble de spans correspondantes à agréger pour générer les métriques.            |
| Groupes d'agrégation             | Modifier les tags pour gérer la cardinalité des métriques générées.                                                     |

**Remarque** : pour modifier le type ou le nom d'une métrique, créez une nouvelle métrique et supprimez l'ancienne.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/trace_retention_and_ingestion
[2]: https://docs.datadoghq.com/fr/developers/metrics/#overview
[3]: /fr/monitors/monitor_types/anomaly/#overview
[4]: /fr/tracing/trace_search_and_analytics/
[5]: /fr/tracing/trace_search_and_analytics/query_syntax/#analytics-query
[6]: /fr/monitors/monitor_types/forecasts/
[7]: https://app.datadoghq.com/apm/getting-started
[8]: https://app.datadoghq.com/apm/traces/generate-metrics
[9]: /fr/tracing/trace_search_and_analytics/query_syntax/
[10]: /fr/developers/metrics/#naming-metrics