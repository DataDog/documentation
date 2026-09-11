---
algolia:
  tags:
  - log metrics
  - generating logs from metrics
aliases:
- /fr/logs/processing/logs_to_metrics/
- /fr/logs/logs_to_metrics/
description: Générez des métriques à partir de logs ingérés.
further_reading:
- link: logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utilisez des requêtes en notation CIDR pour filtrer vos logs de trafic réseau
- link: https://learn.datadoghq.com/courses/log-investigations
  tag: Centre d'apprentissage
  text: Suivez les logs pour les alertes et les enquêtes
title: Générer des métriques à partir de logs ingérés
---
## Présentation {#overview}

<div class="alert alert-info">Les solutions décrites dans cette documentation sont spécifiques aux environnements de journalisation basés sur le cloud. Pour générer des métriques à partir de logs sur site, consultez la documentation <a href="https://docs.datadoghq.com/observability_pipelines/configuration/explore_templates#generate-metrics">Observability Pipelines</a>.</div>

La fonctionnalité [Logging without Limits][1]* de Datadog vous permet de décider dynamiquement ce qu'il faut inclure ou exclure de vos index pour le stockage et les requêtes, tout en sachant que de nombreux types de logs sont destinés à être utilisés comme télémétrie pour suivre des tendances, telles que des KPI, sur de longues périodes. Les métriques basées sur les logs constituent un moyen rentable de résumer les données de logs provenant de l'ensemble du flux d'ingestion. Cela signifie que même si vous utilisez des [filtres d'exclusion][2] pour limiter ce que vous stockez pour l'exploration, vous pouvez toujours visualiser les tendances et les anomalies sur l'ensemble de vos données de logs avec une granularité de 10 s pendant 15 mois.

Avec des métriques basées sur des logs, vous pouvez générer une métrique count représentant le nombre de logs qui correspondent à une requête, ou une [métrique de distribution][3] représentant une valeur numérique contenue dans des logs, comme la durée des requêtes.

**Note de facturation :** Les métriques créées à partir de logs ingérés sont facturées en tant que [Custom Metrics][4].

## Générer une métrique basée sur les logs {#generate-a-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="Générez une métrique basée sur les logs" style="width:80%;">}}

Pour générer une nouvelle métrique basée sur les logs :

1. Accédez à la page [Generate Metrics][5].
1. Sélectionnez l'onglet {{< ui >}}Generate Metrics{{< /ui >}}.
1. Cliquez sur {{< ui >}}+New Metric{{< /ui >}}.

Vous pouvez également créer des métriques à partir d'une recherche Analytics en sélectionnant l'option {{< ui >}}Generate new metric{{< /ui >}} dans le menu {{< ui >}}Export{{< /ui >}}.

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics2.jpg" alt="Générez une métrique basée sur les logs" style="width:80%;">}}

### Ajouter une nouvelle métrique basée sur les logs {#add-a-new-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="Créez une métrique basée sur les logs" style="width:80%;">}}

1. {{< ui >}}Input a query to filter the log stream{{< /ui >}} : Rédigez la requête en utilisant la [syntaxe de recherche du Log Explorer][6]. Datadog évalue la requête de filtre de flux par rapport au flux de logs au moment de l'ingestion, et non par rapport aux logs indexés. Le filtre ne prend pas en charge toutes les fonctionnalités de recherche du Log Explorer, y compris la [recherche en texte intégral][12] (`*:search_term`). Une requête qui renvoie des résultats dans le Log Explorer peut néanmoins ne correspondre à aucun log ici. L'agrégation ne prend en compte que les logs ingérés avec un horodatage datant de moins de 20 minutes. Excluez l'index de la requête.

   Après avoir enregistré la métrique, confirmez qu'elle produit des points de données dans le [Metrics Explorer][13] avant de vous y fier. Si la requête correspond à des logs dans le Log Explorer mais que la métrique reste vide, réécrivez le terme sous forme de phrase entre guillemets ; par exemple, `message:"Database operation failed."`.
2. {{< ui >}}Select the field you would like to track{{< /ui >}}: Sélectionnez `*` pour générer un décompte de tous les logs correspondant à votre requête ou saisissez un attribut de log (par exemple, `@network.bytes_written`) pour agréger une valeur numérique et créer les métriques agrégées correspondantes `count`, `min`, `max`, `sum` et `avg`. Si la facette d'attribut de log est une [mesure][7], la valeur de la métrique est la valeur de l'attribut de log.
3. {{< ui >}}Add dimensions to `group by`{{< /ui >}}: Par défaut, les métriques générées à partir des logs ne possèdent aucun tag, sauf s'ils sont explicitement ajoutés. Tout attribut ou dimension de tag existant dans vos logs (par exemple, `@network.bytes_written`, `env`) peut être utilisé pour créer des [tags][8] de métrique. Les noms des tags de métrique sont identiques au nom de l'attribut ou du tag d'origine, sans le `@`.
4. {{< ui >}}Add percentile aggregations{{< /ui >}}: Pour les métriques de distribution, vous pouvez générer en option des percentiles p50, p75, p90, p95 et p99. Les métriques de percentile sont également considérées comme des métriques personnalisées et [facturées en conséquence][9].
5. {{< ui >}}Name your metric{{< /ui >}}: Les noms des métriques basées sur les logs doivent respecter la [convention de nommage des métriques personnalisées][10].

**Note**: Datadog génère des points de données pour les métriques basées sur les logs à des intervalles de 10 secondes. Lorsque vous créez un [graphique de dashboard][11] pour des métriques basées sur les logs, le paramètre `count unique` utilise les valeurs au sein de l'intervalle de 10 secondes.

{{< img src="logs/processing/logs_to_metrics/count_unique.png" alt="La page de configuration du graphique de série temporelle avec le paramètre de requête de comptage unique mis en évidence" style="width:80%;">}}

<div class="alert alert-danger">Les métriques basées sur les logs sont considérées comme des <a href="/metrics/custom_metrics/">métriques personnalisées</a> et facturées en conséquence. Évitez de regrouper par des attributs à cardinalité illimitée ou extrêmement élevée comme les horodatages, les identifiants utilisateur, les identifiants de requête ou les identifiants de session pour éviter d'impacter votre facturation.</div>

### Mettre à jour une métrique basée sur les logs {#update-a-log-based-metric}

Lorsqu'une métrique est créée, les champs suivants peuvent être mis à jour :

- Requête de filtre de flux : Pour modifier l'ensemble des logs correspondants à agréger en métriques
- Groupes d'agrégation : Pour mettre à jour les tags ou gérer la cardinalité des métriques générées
- Sélection de centiles : Cochez ou décochez la case {{< ui >}}Calculate percentiles{{< /ui >}} pour supprimer ou générer des métriques de centiles

Pour modifier le type ou le nom d'une métrique, une nouvelle métrique doit être créée.

## Métriques d'utilisation des logs {#logs-usage-metrics}

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="Métriques d'utilisation recommandées" style="width:80%;">}}

Les métriques d'utilisation sont des estimations de votre utilisation actuelle de Datadog en temps quasi réel. Elles vous permettent de :

- Visualisez votre utilisation estimée.
- Créez des monitors basés sur votre utilisation estimée.
- Recevez des alertes instantanées en cas de pics ou de chutes de votre utilisation.
- Évaluez l'impact potentiel des modifications de code sur votre utilisation en temps quasi réel.

Les métriques d'utilisation Log Management s'accompagnent de trois tags qui peuvent être utilisés pour une surveillance plus granulaire :

| Tag                     | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
|  `datadog_index`        | Indique la requête de routage qui associe un log à un index désigné.  |
|  `datadog_is_excluded`  | Indique si un log correspond ou non à une requête d'exclusion.            |
|  `service`              | L'attribut service de l'événement de log.                               |

**Remarque** : Les champs `datadog_is_excluded` et `datadog_index` peuvent avoir une valeur de `N/A`. Cela indique que le ou les logs ont été ingérés, mais ne correspondaient à aucun critère d'inclusion ou d'exclusion pour être explicitement routés vers un index.

Un tag `status` supplémentaire est disponible sur la métrique `datadog.estimated_usage.logs.ingested_events` pour refléter le statut du log (`info`, `warning`, etc.).

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/
[2]: /fr/logs/indexes/#exclusion-filters
[3]: /fr/metrics/distributions/#overview
[4]: /fr/metrics/custom_metrics/
[5]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[6]: /fr/logs/search_syntax/
[7]: /fr/logs/explorer/facets/#quantitative-facets-measures
[8]: /fr/getting_started/tagging/
[9]: /fr/account_management/billing/custom_metrics/?tab=countrategauge
[10]: /fr/metrics/custom_metrics/#naming-custom-metrics
[11]: /fr/dashboards/querying/
[12]: /fr/logs/explorer/search_syntax/#full-text-search
[13]: /fr/metrics/explorer/