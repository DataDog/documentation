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
description: Découvrez ce que sont les métriques personnalisées, comment elles sont
  identifiées par leur nom et leurs étiquettes, et comment elles sont facturées dans
  Datadog.
further_reading:
- link: /extend/dogstatsd/
  tag: Documentation
  text: En savoir plus sur DogStatsD
- link: /extend/community/libraries/
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentation
  text: Facturation des métriques custom
- link: /account_management/billing/metric_name_pricing/
  tag: Documentation
  text: Tarification basée sur le nom des métriques personnalisées
- link: /metrics/guide/custom_metrics_governance/
  tag: Guide
  text: Bonne pratique pour la gouvernance des métriques custom
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Contrôler de façon dynamique le volume de vos métriques custom grâce à Metrics
    without Limits™
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Concevez des tableaux de bord exécutifs efficaces avec Datadog
- link: https://learn.datadoghq.com/courses/metrics-governance
  tag: Centre d'apprentissage
  text: Gouvernance des métriques
title: Collecte de traces
---
{{< learning-center-callout header="Participez à une session de webinaire de formation" hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Explorez et inscrivez-vous aux sessions de formation Foundation pour les métriques personnalisées. Découvrez comment les métriques personnalisées vous aident à suivre vos KPI d'application, tels que le nombre de visiteurs, la taille moyenne du panier client, la latence des requêtes ou la distribution des performances pour un algorithme personnalisé.
{{< /learning-center-callout >}}

## Aperçu {#overview}

Les métriques personnalisées vous aident à suivre vos KPI d'application : nombre de visiteurs, taille moyenne du panier client, latence des requêtes ou distribution des performances pour un algorithme personnalisé. Une métrique personnalisée est identifiée par **une combinaison unique du nom d'une métrique et des valeurs de tags (y compris le tag d'hôte)**. Dans l'exemple ci-dessous, la métrique `request.Latency` a quatre combinaisons uniques de valeurs de tags à partir de ses deux clés de tags :

- `endpoint`, qui a la valeur `endpoint:X` ou `endpoint:Y`.
- `status`, qui a la valeur `status:200` ou `status:400`.

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latence des requêtes" style="width:80%;">}}

Les éléments suivants sont également considérés comme des métriques custom :
- En général, toute métrique soumise via [DogStatsD][3] ou via un [Agent Check personnalisé][4]
- Métriques soumises par des [intégrations Marketplace][29]
- Certaines [intégrations standard](#standard-integrations) peuvent potentiellement émettre des métriques personnalisées
- Métriques soumises à partir d'une intégration qui n'est pas l'une des [plus de {{< translate key="integration_count" >}} intégrations Datadog][1].

**Remarque** : Les utilisateurs ayant le rôle d'administrateur Datadog ou `usage_read` la permission peuvent voir le nombre moyen mensuel de métriques personnalisées par heure et les 5000 principales métriques personnalisées pour leur compte sur la [page des détails d'utilisation][5]. En savoir plus sur [comment les métriques personnalisées sont comptées][6].

## Propriétés des métriques personnalisées {#custom-metrics-properties}

Une métrique personnalisée Datadog possède les propriétés ci-dessous. Lisez l'[introduction aux métriques][7] pour apprendre à tracer des métriques dans Datadog.

| Propriété         | Description                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | Le [nom de votre métrique](#naming-custom-metrics).                                                                                                                  |
| `<METRIC_VALUE>` | La valeur de votre métrique. **Remarque** : Les valeurs des métriques doivent être de 32 bits. Les valeurs ne doivent pas refléter des dates ou des horodatages.                                                                                                                                |
| `<TIMESTAMP>`    | L'horodatage associé à la valeur de la métrique. **Remarque** : Les horodatages des métriques ne peuvent pas être plus de dix minutes dans le futur ou plus d'une heure dans le passé. |
| `<TAGS>`         | L'ensemble des tags associés à votre métrique.                                                                                                                 |
| `<METRIC_TYPE>`  | Le type de votre métrique. Lisez à propos des [types de métriques][8].                                                                                             |
| `<INTERVAL>`     | Si le `<TYPE>` de la métrique est [RATE][9] ou [COUNT][10], il définit l'[intervalle][11] correspondant.                                                       |

### Nommer des métriques personnalisées {#naming-custom-metrics}

La convention de nommage suivante s'applique aux métriques custom :

* Les noms de métriques doivent commencer par une lettre.
* Les noms de métriques ne doivent contenir que des alphanumériques ASCII, des traits de soulignement et des points.
  * D'autres caractères, y compris les espaces, sont convertis en traits de soulignement.
  * Unicode n'est _pas_ pris en charge.
* Les noms de métriques ne doivent pas dépasser 200 caractères. Moins de 100 est préférable d'un point de vue UI.

**Remarque** : Les noms de métriques sont sensibles à la casse dans Datadog.

### Unités de métriques {#metric-units}

Définissez les unités de métriques via [Metrics Summary][12] ou définissez des unités de métriques personnalisées avec la fonctionnalité [Unit override][13] dans l'éditeur de graphique de vos visualisations. Pour plus d'informations, consultez la documentation [Metrics Units][14].

## Soumission de métriques personnalisées {#submitting-custom-metrics}

{{< whatsnext desc="Il existe plusieurs façons d'envoyer des métriques à Datadog :">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}Check custom d'Agent{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}API HTTP de Datadog{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}Générer des métriques basées sur les journaux{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}Générer des métriques basées sur les spans APM{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/platform/generate_metrics/" >}}Générer des métriques basées sur les événements RUM{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}Générer des métriques basées sur les processus en direct{{< /nextlink >}}
{{< /whatsnext >}}

Vous pouvez également utiliser l'une des [bibliothèques client de Datadog et sa communauté pour DogStatsD et les API][15] afin d'envoyer vos métriques custom.

**Remarque** : Il n'y a pas de limites de taux fixes imposées sur la soumission de métriques personnalisées. Si votre allocation par défaut est dépassée, vous êtes facturé selon [Datadog's billing policy for custom metrics][6].

## Intégrations standard {#standard-integrations}

Les intégrations standard suivantes peuvent potentiellement générer des métriques custom.

| Type d'intégrations                           | Intégrations                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| Limité à 350 métriques personnalisées par défaut.      | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]                              |
| Pas de limite par défaut sur la collecte de métriques personnalisées. | [Nagios][19] /[PDH Check][20] /[OpenMetrics][21] /[Windows performance counters][22] /[WMI][23] /[Prometheus][21] |
| Peut être configuré pour collecter des métriques personnalisées.   | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27] |
| Métriques personnalisées envoyées depuis des intégrations cloud | [AWS][28] |

## Lectures complémentaires {#further-reading}

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