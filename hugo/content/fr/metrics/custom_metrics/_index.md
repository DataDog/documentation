---
algolia:
  tags:
  - custom metrics
aliases:
- /fr/guides/metrics/
- /fr/metrictypes/
- /fr/units/
- /fr/developers/metrics/datagram_shell
- /fr/developers/metrics/custom_metrics/
- /fr/getting_started/custom_metrics
- /fr/developers/metrics/
- /fr/metrics/guide/tag-configuration-cardinality-estimation-tool/
description: Découvrez ce que sont les Custom Metrics, comment elles sont identifiées
  par leur nom et leurs tags, et comment elles sont facturées dans Datadog.
further_reading:
- link: /extend/dogstatsd/
  tag: Documentation
  text: En savoir plus sur DogStatsD
- link: /extend/community/libraries/
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentation
  text: Facturation des Custom Metrics
- link: /account_management/billing/metric_name_pricing/
  tag: Documentation
  text: Tarification par nom de métrique pour les Custom Metrics
- link: /metrics/guide/custom_metrics_governance/
  tag: Guide
  text: Bonne pratique pour la gouvernance des métriques custom
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Contrôler de façon dynamique le volume de vos Custom Metrics grâce à Metrics
    without Limits™
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Concevez des dashboards exécutifs efficaces avec Datadog
- link: https://learn.datadoghq.com/courses/metrics-governance
  tag: Centre d'apprentissage
  text: Gouvernance des métriques
title: Custom Metrics
---
{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Découvrez les sessions Foundation Enablement consacrées aux Custom Metrics et inscrivez-vous-y. Découvrez comment les Custom Metrics vous aident à suivre les KPI de votre application, tels que le nombre de visiteurs, la taille moyenne du panier client, la latence des requêtes ou la distribution des performances pour un algorithme personnalisé.
{{< /learning-center-callout >}}

## Présentation {#overview}

Les Custom Metrics vous aident à suivre les KPI de votre application : nombre de visiteurs, taille moyenne du panier client, latence des requêtes ou distribution des performances pour un algorithme personnalisé. Une métrique personnalisée est identifiée par **une combinaison unique du nom d'une métrique et de valeurs de tags (y compris le tag host)**. Dans l'exemple ci-dessous, la métrique `request.Latency` possède quatre combinaisons uniques de valeurs de tags issues de ses deux clés de tag :

- `endpoint`, qui a la valeur `endpoint:X` ou `endpoint:Y`.
- `status`, qui a la valeur `status:200` ou `status:400`.

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latence des requêtes" style="width:80%;">}}

Les éléments suivants sont également considérés comme des Custom Metrics :
- En général, toute métrique soumise via [DogStatsD][3] ou via un [Agent Check personnalisé][4]
- Métriques soumises par des [intégrations Marketplace][29]
- Certaines [intégrations standard](#standard-integrations) peuvent potentiellement émettre des Custom Metrics
- Métriques soumises depuis une intégration qui ne fait pas partie des [plus de {{< translate key="integration_count" >}} Intégrations Datadog][1].

**Remarque** : les utilisateurs disposant du rôle Datadog Admin ou de l'autorisation `usage_read` peuvent consulter le nombre moyen mensuel de Custom Metrics par heure et les 5000 principales Custom Metrics de leur compte sur la [page des détails d'utilisation][5]. Découvrez [comment les Custom Metrics sont comptabilisées][6].

## Propriétés des Custom Metrics {#custom-metrics-properties}

Une métrique personnalisée Datadog possède les propriétés ci-dessous. Lisez l'[introduction aux métriques][7] pour apprendre à représenter graphiquement des métriques dans Datadog.

| Propriété         | Description                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | Le [nom de votre métrique](#naming-custom-metrics).                                                                                                                  |
| `<METRIC_VALUE>` | La valeur de votre métrique. **Remarque** : les valeurs des métriques doivent être codées sur 32 bits. Les valeurs ne doivent pas refléter de dates ou d'horodatages.                                                                                                                                |
| `<TIMESTAMP>`    | L'horodatage associé à la valeur de la métrique. **Remarque** : les horodatages des métriques ne peuvent pas se situer à plus de dix minutes dans le futur ni dater de plus d'une heure. |
| `<TAGS>`         | L'ensemble des tags associés à votre métrique.                                                                                                                 |
| `<METRIC_TYPE>`  | Le type de votre métrique. Découvrez les [types de métriques][8].                                                                                             |
| `<INTERVAL>`     | Si le `<TYPE>` de la métrique est [RATE][9] ou [COUNT][10], cela définit l'[intervalle][11] correspondant.                                                       |

### Nommage des Custom Metrics {#naming-custom-metrics}

La convention de nommage suivante doit être respectée pour les Custom Metrics :

* Les noms de métriques doivent commencer par une lettre.
* Les noms de métriques ne doivent contenir que des caractères alphanumériques ASCII, des underscores et des points.
  * Les autres caractères, y compris les espaces, sont convertis en underscores.
  * Unicode _n'est pas_ pris en charge.
* Les noms de métriques ne doivent pas dépasser 200 caractères. Pour l'interface utilisateur, privilégiez les noms de métriques de moins de 100 caractères.

**Remarque** : les noms de métriques sont sensibles à la casse dans Datadog.

### Unités des métriques {#metric-units}

Définissez les unités de métrique via le [Metrics Catalog][12] ou définissez des unités de métrique personnalisées avec la fonctionnalité [Unit override][13] dans l'éditeur de graphique de vos visualisations. Pour plus d'informations, consultez la documentation [Metrics Units][14].

## Soumission de Custom Metrics {#submitting-custom-metrics}

{{< whatsnext desc="Il existe plusieurs façons d'envoyer des métriques à Datadog :">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}Agent Check personnalisé{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}API HTTP de Datadog{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}Générez des métriques à partir des journaux{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}Générez des métriques basées sur les spans APM{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/platform/generate_metrics/" >}}Générez des métriques basées sur les événements RUM{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}Générez des métriques basées sur les processus en direct{{< /nextlink >}}
{{< /whatsnext >}}

Vous pouvez également utiliser l'une des [bibliothèques clientes API et DogStatsD officielles et communautaires de Datadog][15] pour soumettre vos Custom Metrics

**Remarque** : aucune limite de débit fixe n'est imposée pour la soumission de Custom Metrics. Si votre quota par défaut est dépassé, vous êtes facturé conformément à la [politique de facturation de Datadog pour les Custom Metrics][6].

## Intégrations standard {#standard-integrations}

Les intégrations standard suivantes peuvent potentiellement émettre des Custom Metrics.

| Type d'intégrations                           | Integrations                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| Limité à 350 Custom Metrics par défaut.      | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]                              |
| Aucune limite par défaut sur la collecte de Custom Metrics. | [Nagios][19] /[PDH Check][20] /[OpenMetrics][21] /[Compteurs de performance Windows][22] /[WMI][23] /[Prometheus][21] |
| Peut être configuré pour collecter des Custom Metrics.   | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27]                        |
| Custom Metrics envoyées depuis des intégrations cloud    | [AWS][28]                                                                          |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/
[2]: /fr/account_management/billing/custom_metrics/#standard-integrations
[3]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /fr/metrics/custom_metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /fr/account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /fr/metrics
[8]: /fr/metrics/types/
[9]: /fr/metrics/types/?tab=rate#metric-types
[10]: /fr/metrics/types/?tab=count#metric-types
[11]: /fr/extend/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /fr/metrics/summary/#metric-unit
[13]: /fr/dashboards/guide/unit-override/
[14]: /fr/metrics/units/
[15]: /fr/extend/community/libraries/
[16]: /fr/integrations/activemq/#activemq-xml-integration
[17]: /fr/integrations/go_expvar/
[18]: /fr/integrations/java/
[19]: /fr/integrations/nagios
[20]: /fr/integrations/pdh_check/
[21]: /fr/integrations/openmetrics/
[22]: /fr/integrations/windows_performance_counters/
[23]: /fr/integrations/wmi_check/
[24]: /fr/integrations/mysql/
[25]: /fr/integrations/oracle/
[26]: /fr/integrations/postgres/
[27]: /fr/integrations/sqlserver/
[28]: /fr/integrations/amazon_web_services/
[29]: /fr/integrations/#cat-marketplace