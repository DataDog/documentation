---
disable_toc: false
title: Générer des métriques
---

## Section Overview

<div class="alert alert-info">Les solutions décrites dans cette documentation s'appliquent aux environnements de journalisation sur site. Pour générer des métriques à partir de logs cloud, consultez la documentation <a href="/observability_pipelines/set_up_pipelines/generate_metrics/">Observability Pipelines</a>.</div>

Certaines sources de logs, comme les pare-feux et les équipements réseau, génèrent un grand volume d'événements de log contenant des données qui ne nécessitent pas forcément d'être stockées. Souvent, vous souhaitez simplement afficher un résumé des logs et le comparer à des données historiques. Utilisez le modèle Generate Metrics pour générer une métrique de comptage à partir des logs correspondant à une requête, ou une métrique de distribution à partir d'une valeur numérique contenue dans les logs, comme une durée de requête. Le modèle commence avec les processeurs suivants :

- **Filter** : ajoutez une requête pour n'envoyer qu'un sous-ensemble de logs selon vos conditions.
- **Grok Parser** : analysez vos logs à l'aide des règles de parsing grok disponibles pour un ensemble de sources ou ajoutez des règles de parsing personnalisées.
- **Generate metrics** : générez des métriques à partir de vos logs ou d'un sous-ensemble de ceux-ci. Consultez la section [Types de métriques](#types-de-metriques) pour découvrir les types de métriques que vous pouvez générer.

{{% observability_pipelines/use_case_images/generate_metrics %}}

Sélectionnez une source pour commencer :

- [Amazon Data Firehose][12]
- [Amazon S3][11]
- [Agent Datadog][1]
- [Fluentd ou Fluent Bit][2]
- [Google Pub/Sub][3]
- [Client HTTP][4]
- [Serveur HTTP][5]
- [Kafka][13]
- [Logstash][6]
- [Socket][14]
- [HTTP Event Collector (HEC) Splunk][7]
- [Splunk Heavy ou Universal Forwarders (TCP)][8]
- [Collector hébergé Sumo Logic][9]
- [rsyslog ou syslog-ng][10]

[1]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/datadog_agent
[2]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/fluent
[3]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/google_pubsub
[4]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/http_client
[5]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/http_server
[6]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/logstash
[7]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/splunk_hec
[8]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/splunk_tcp
[9]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/sumo_logic_hosted_collector
[10]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/syslog
[11]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/amazon_s3
[12]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/amazon_data_firehose
[13]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/kafka
[14]: /fr/observability_pipelines/set_up_pipelines/generate_metrics/socket

## Types de métriques

{{% observability_pipelines/metrics_types %}}