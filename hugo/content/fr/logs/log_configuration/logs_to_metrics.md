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
  text: Utilisez des requêtes en notation CIDR pour filtrer vos journaux de trafic
    réseau
- link: https://learn.datadoghq.com/courses/log-investigations
  tag: Centre d'apprentissage
  text: Suivez les journaux pour les alertes et les enquêtes
title: Générer des métriques à partir de logs ingérés
---
## Aperçu {#overview}

<div class="alert alert-info">Les solutions décrites dans cette documentation sont spécifiques aux environnements de journalisation basés sur le cloud. Pour générer des métriques à partir de journaux sur site, consultez la documentation <a href="https://docs.datadoghq.com/observability_pipelines/configuration/explore_templates#generate-metrics">Pipelines d'Observabilité</a>.</div>

La fonctionnalité [Journalisation sans limites][1]\* de Datadog vous permet de décider dynamiquement ce que vous souhaitez inclure ou exclure de vos index pour le stockage et la requête, tout en permettant à de nombreux types de journaux d'être utilisés pour la télémétrie afin de suivre les tendances, telles que les KPI, sur de longues périodes. Les métriques basées sur les journaux sont un moyen rentable de résumer les données de journal de l'ensemble du flux d'ingestion. Cela signifie que même si vous utilisez des [filtres d'exclusion][2] pour limiter ce que vous stockez pour l'exploration, vous pouvez toujours visualiser les tendances et les anomalies sur l'ensemble de vos données de journal avec une granularité de 10 secondes pendant 15 mois.

Avec des métriques basées sur des logs, vous pouvez générer une métrique count représentant le nombre de logs qui correspondent à une requête, ou une [métrique de distribution][3] représentant une valeur numérique contenue dans des logs, comme la durée des requêtes.

**Remarque de facturation&nbsp;:** Les métriques créées à partir des journaux ingérés sont facturées comme des [Métriques personnalisées][4].

## Générez une métrique basée sur les journaux {#generate-a-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="Générez des métriques à partir des journaux" style="width:80%;">}}

Pour générer une nouvelle métrique basée sur les journaux&nbsp;:

1. Accédez à la page [Générer des métriques][5].
1. Sélectionnez l'onglet **Générer des métriques**.
1. Cliquez sur **+New Metric**.

Vous pouvez également créer des métriques depuis une recherche Analytics en sélectionnant l'option « Generate new metric » depuis le menu Export.

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics2.jpg" alt="Générez des métriques à partir des journaux" style="width:80%;">}}

### Ajoutez une nouvelle métrique basée sur les journaux {#add-a-new-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="Créez une métrique à partir des journaux" style="width:80%;">}}

1. **Saisissez une requête pour filtrer le flux de journaux**&nbsp;: La syntaxe de la requête est la même que pour la [Recherche dans l'Explorateur de journaux][6]. Seuls les journaux ingérés avec un horodatage dans les 20 dernières minutes sont pris en compte pour l'agrégation. L'index doit être exclu de la requête.
2. **Sélectionnez le champ que vous souhaitez suivre**&nbsp;: Sélectionnez `*` pour générer un compte de tous les journaux correspondant à votre requête ou entrez un attribut de journal (par exemple, `@network.bytes_written`) pour agréger une valeur numérique et créer ses `count`, `min`, `max`, `sum` et `avg` métriques agrégées. Si la facette d'attribut de journal est une [mesure][7], la valeur de la métrique est la valeur de l'attribut de journal.
3. **Ajoutez des dimensions à `group by`**&nbsp;: Par défaut, les métriques générées à partir des journaux n'ont pas de balises, sauf si elles sont explicitement ajoutées. Tout attribut ou dimension de balise qui existe dans vos journaux (par exemple, `@network.bytes_written`, `env`) peut être utilisé pour créer des [balises de métriques][8]. Les noms des balises de métriques sont égaux au nom de l'attribut ou de la balise d'origine, sans le @.
4. **Ajoutez des agrégations de percentile**&nbsp;: Pour les métriques de distribution, vous pouvez générer optionnellement des percentiles p50, p75, p90, p95 et p99. Les métriques de percentile sont également considérées comme des métriques personnalisées, et [facturées en conséquence][9].
5. **Nommez votre métrique**&nbsp;: Les noms des métriques basées sur les journaux doivent suivre la [convention de nommage des métriques personnalisées][10].

**Remarque**&nbsp;: Les points de données pour les métriques basées sur les journaux sont générés à des intervalles de 10 secondes. Lorsque vous créez un [graphique de tableau de bord][11] pour les métriques basées sur les journaux, le paramètre `count unique` est basé sur les valeurs dans l’intervalle de 10 secondes.

{{< img src="logs/processing/logs_to_metrics/count_unique.png" alt="La page de configuration du graphique de séries temporelles avec le paramètre de requête 'nombre unique' mis en évidence." style="width:80%;">}}

<div class="alert alert-danger">Les métriques basées sur les journaux sont considérées comme des <a href="/metrics/custom_metrics/">métriques personnalisées</a> et facturées en conséquence. Évitez de regrouper par des attributs à cardinalité illimitée ou extrêmement élevée comme les horodatages, les identifiants d'utilisateur, les identifiants de requête ou les identifiants de session pour éviter d'impacter votre facturation.</div>

### Mettez à jour une métrique basée sur les journaux {#update-a-log-based-metric}

Lorsqu'une métrique est créée, les champs suivants peuvent être mis à jour :

- Requête de filtre de flux&nbsp;: Pour changer l'ensemble des journaux correspondants à agréger en métriques.
- Groupes d'agrégation&nbsp;: Pour mettre à jour les balises ou gérer la cardinalité des métriques générées.
- Sélection de percentile&nbsp;: Cochez ou décochez la case **Calculate percentiles** pour supprimer ou générer des métriques de percentile.

Pour modifier le type ou le nom d'une métrique, une nouvelle métrique doit être créée.

## Métriques d'utilisation des journaux {#logs-usage-metrics}

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="Métriques d'utilisation recommandées" style="width:80%;">}}

Les métriques d'utilisation sont des estimations de votre utilisation actuelle de Datadog en temps quasi réel. Ils vous permettent de&nbsp;:

- Tracez votre utilisation estimée.
- Créez des moniteurs autour de votre utilisation estimée.
- Recevez des alertes instantanées concernant les pics ou les baisses de votre utilisation.
- Évaluez l'impact potentiel des modifications de code sur votre utilisation en temps quasi réel.

Les métriques d'utilisation Log Management s'accompagnent de trois tags qui peuvent être utilisés pour une surveillance plus granulaire :

| Étiquette                     | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
|  `datadog_index`        | Indique la requête de routage qui associe un journal à un index prévu.  |
|  `datadog_is_excluded`  | Indique si un journal correspond ou non à une requête d'exclusion.            |
|  `service`              | L'attribut de service de l'événement de journal.                               |

**Remarque**&nbsp;: Les champs `datadog_is_excluded` et `datadog_index` peuvent avoir une valeur de `N/A`. Cela indique que le(s) journal(aux) a été ingéré, mais n'a pas correspondu à des critères d'inclusion ou d'exclusion pour être explicitement routé vers un index.

Une étiquette `status` supplémentaire est disponible sur la métrique `datadog.estimated_usage.logs.ingested_events` pour refléter l'état du journal (`info`, `warning`, etc.).

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits est une marque déposée de Datadog, Inc.

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