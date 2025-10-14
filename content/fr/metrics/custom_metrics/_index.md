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
further_reading:
- link: /developers/dogstatsd/
  tag: Documentation
  text: En savoir plus sur DogStatsD
- link: /developers/community/libraries/
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentation
  text: Facturation des métriques custom
- link: /metrics/guide/custom_metrics_governance/
  tag: Guide
  text: Bonne pratique pour la gouvernance des métriques custom
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Contrôler de façon dynamique le volume de vos métriques custom grâce à Metrics
    without Limits™
title: Métriques custom
---

{{< learning-center-callout header="Participez un webinar de formation" hide_image="true" btn_title="Inscription" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Explorez et inscrivez-vous aux sessions Foundation Enablement sur les métriques personnalisées. Découvrez comment ces métriques vous aident à suivre les KPI de vos applications, comme le nombre de visiteurs, la taille moyenne des paniers, la latence des requêtes ou la répartition des performances d'un algorithme personnalisé.
{{< /learning-center-callout >}}

## Section Overview

Les métriques custom vous permettent de suivre les KPI de votre application : nombre de visiteurs, taille moyenne du panier client, latence des requêtes ou répartition des performances pour un algorithme personnalisé. Une métrique custom est identifiée par **une combinaison unique du nom de la métrique et des valeurs de tags (y compris le tag de host)**. Dans l'exemple ci-dessous, la métrique `request.Latency` comporte quatre combinaisons uniques de valeurs de tags issues de ses deux clés de tag :

- `endpoint`, qui a pour valeur `endpoint:X` ou `endpoint:Y` ;
- `status`, qui a pour valeur `status:200` ou `status:400`.

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latence des requêtes" style="width:80%;">}}

Les éléments suivants sont également considérés comme des métriques custom :
- Globalement, toute métrique soumise par l'intermédiaire de [DogStatsD][3] ou d'un [check custom d'Agent][4]
- Les métriques envoyées par les intégrations [Marketplace][29]
- Certaines [intégrations standard](#integrations-standard) peuvent potentiellement émettre des métriques custom
- Les métriques envoyées depuis une intégration qui ne fait pas partie des [plus de {{< translate key="integration_count" >}} intégrations Datadog][1].

**Remarque** : les utilisateurs ayant le rôle Admin Datadog ou la permission `usage_read` peuvent consulter le nombre mensuel moyen de métriques custom par heure, ainsi que les 5 000 métriques custom les plus utilisées pour leur compte sur la [page des détails sur l'utilisation][5]. Pour en savoir plus, consultez la page [sur le mode de comptabilisation des métriques custom][6].

## Propriétés des métriques custom

Les métriques custom Datadog possèdent les propriétés ci-dessous. Consultez la [présentation des métriques][7] pour découvrir comment représenter graphiquement des métriques au sein de Datadog.

| Propriété         | Rôle                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<NOM_MÉTRIQUE>`  | Le [nom de votre métrique](#nom-des-metriques-custom).                                                                                                                  |
| `<VALEUR_MÉTRIQUE>` | La valeur de votre métrique. **Remarque** : les valeurs des métriques respecter un format 32 bits. Elles ne doivent pas représenter des dates ou des timestamps.                                                                                                                                |
| `<TIMESTAMP>`    | Le timestamp associé à la valeur de la métrique. **Remarque** : les timestamps des métriques ne peuvent pas correspondre à une date plus d'une heure avant l'événement et plus de 10 minutes après celui-ci. |
| `<TAGS>`         | L'ensemble des tags associés à votre métrique.                                                                                                                 |
| `<TYPE_MÉTRIQUE>`  | Le type de votre métrique. En savoir plus sur les [types de métriques][8].                                                                                             |
| `<INTERVALLE>`     | Si le `<TYPE>` de la métrique est [RATE][9] ou [COUNT][10], cette propriété définit l'[intervalle][11] correspondant.                                                       |

### Nom des métriques custom

La convention de nommage suivante s'applique aux métriques custom :

* Les noms des métriques doivent commencer par une lettre.
* Les noms de métriques doivent contenir uniquement des caractères alphanumériques ASCII, des underscores et des points.
  * Les autres caractères, y compris les espaces, sont remplacés par des underscores.
  * Le format Unicode n'est _pas_ pris en charge.
* Les noms de métriques ne doivent pas dépasser 200 caractères. Nous vous recommandons d'utiliser moins de 100 caractères pour une meilleure lisibilité sur l'interface.

**Remarque** : les noms de métrique sont sensibles à la casse dans Datadog.

### Unités des métriques

Définissez les unités des métriques via le [Résumé des métriques][12] ou définissez des unités personnalisées pour les métriques à l'aide de la fonctionnalité [Remplacement des unités][13] dans l'éditeur de graphiques de vos visualisations. Pour plus d'informations, consultez la documentation relative aux [unités de métriques][14].

## Envoi de métriques custom

{{< whatsnext desc="Il existe plusieurs façons d'envoyer des métriques à Datadog :" >}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}Check d'Agent custom{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}API HTTP Datadog{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}Générer des métriques basées sur des logs{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}Générer des métriques basées sur des spans APM{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/platform/generate_metrics/" >}}Générer des métriques basées sur les événements du RUM{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}Générer des mesures basées sur les live processes{{< /nextlink >}}
{{< /whatsnext >}}

Vous pouvez également utiliser l'une des [bibliothèques client de Datadog et sa communauté pour DogStatsD et les API][15] afin d'envoyer vos métriques custom.

**Remarque** : aucune limite de débit fixe n'est appliquée lors de l'envoi des métriques custom. Si vous dépassez votre nombre de métriques par défaut, vous serez facturé conformément à la [politique de facturation de Datadog pour les métriques custom][6].

## Intégrations standard

Les intégrations standard suivantes peuvent potentiellement générer des métriques custom.

| Types d'intégrations                           | Intégrations                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| Limitées à 350 métriques custom par défaut.      | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]                              |
| Aucune limite appliquée à la collecte de métriques custom par défaut. | [Nagios][19] / [PDH Check][20] / [OpenMetrics][21] / [Compteurs de performances Windows][22] / [WMI][23] / [Prometheus][21] |
| Peuvent être configurées pour collecter des métriques custom.   | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27]                        |
| Métriques custom envoyées depuis des intégrations cloud    | [AWS][28]                                                                          |

## Pour aller plus loin

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
[11]: /fr/developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /fr/metrics/summary/#metric-unit
[13]: /fr/dashboards/guide/unit-override/
[14]: /fr/metrics/units/
[15]: /fr/developers/community/libraries/
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
