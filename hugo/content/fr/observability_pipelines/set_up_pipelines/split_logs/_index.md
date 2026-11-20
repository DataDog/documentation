---
aliases:
- /fr/observability_pipelines/split_logs/
disable_toc: false
title: Diviser des logs
---

## Section Overview

Les organisations doivent souvent envoyer leurs logs vers plusieurs produits en fonction de leurs cas d'utilisation. Par exemple, vous pouvez envoyer vos logs de sécurité vers votre application SIEM et vos logs DevOps vers Datadog. Utilisez Observability Pipelines pour envoyer vos logs vers différentes destinations selon le cas d'utilisation.

{{% observability_pipelines/use_case_images/split_logs %}}

Sélectionnez votre source de logs pour commencer :

- [Amazon Data Firehose][12]
- [Amazon S3][11]
- [Agent Datadog][1]
- [Fluentd ou Fluent Bit][2]
- [Google Pub/Sub][3]
- [Client HTTP][4]
- [Serveur HTTP][5]
- [Kafka][13]
- [Logstash][6]
- [HTTP Event Collector (HEC) Splunk][7]
- [Splunk Heavy ou Universal Forwarders (TCP)][8]
- [Socket (TCP ou UDP)][14]
- [Collector hébergé Sumo Logic][9]
- [rsyslog ou syslog-ng][10]

[1]: /fr/observability_pipelines/split_logs/datadog_agent
[2]: /fr/observability_pipelines/split_logs/fluent
[3]: /fr/observability_pipelines/set_up_pipelines/split_logs/google_pubsub
[4]: /fr/observability_pipelines/split_logs/http_client
[5]: /fr/observability_pipelines/set_up_pipelines/split_logs/http_server
[6]: /fr/observability_pipelines/set_up_pipelines/split_logs/logstash
[7]: /fr/observability_pipelines/split_logs/splunk_hec
[8]: /fr/observability_pipelines/split_logs/splunk_tcp
[9]: /fr/observability_pipelines/split_logs/sumo_logic_hosted_collector
[10]: /fr/observability_pipelines/split_logs/syslog
[11]: /fr/observability_pipelines/set_up_pipelines/split_logs/amazon_s3
[12]: /fr/observability_pipelines/set_up_pipelines/split_logs/amazon_data_firehose
[13]: /fr/observability_pipelines/set_up_pipelines/split_logs/kafka
[14]: /fr/observability_pipelines/set_up_pipelines/split_logs/socket