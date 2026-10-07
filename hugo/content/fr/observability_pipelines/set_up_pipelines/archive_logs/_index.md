---
aliases:
- /fr/observability_pipelines/archive_logs/
disable_toc: false
title: Archiver les logs dans les archives Datadog
---

## Présentation

Utilisez Observability Pipelines pour router les logs ingérés vers une solution de stockage cloud (Amazon S3, Google Cloud Storage ou Azure Storage) au format réhydratable par Datadog. Vous pouvez ensuite réhydrater l'archive dans Datadog à la demande, chaque fois que vous avez besoin d'analyser ou d'investiguer ces données. Cela est utile lorsque :

- vous migrez depuis un autre fournisseur de gestion des logs vers Datadog Log Management et souhaitez vous assurer d'avoir accès aux logs historiques une fois la migration terminée.
- vous avez un volume élevé de logs peu pertinents, mais vous pourriez avoir besoin de les indexer ponctuellement dans Log Management.
- vous avez une politique de conservation.

{{% observability_pipelines/use_case_images/archive_logs %}}

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
- [HTTP Event Collector (HEC) Splunk][7]
- [Splunk Heavy ou Universal Forwarders (TCP)][8]
- [Socket (TCP ou UDP)][14]
- [Collector hébergé Sumo Logic][9]
- [rsylsog ou syslog-ng][10]

[1]: /fr/observability_pipelines/archive_logs/datadog_agent
[2]: /fr/observability_pipelines/archive_logs/fluent
[3]: /fr/observability_pipelines/set_up_pipelines/archive_logs/google_pubsub
[4]: /fr/observability_pipelines/archive_logs/http_client
[5]: /fr/observability_pipelines/set_up_pipelines/archive_logs/http_server
[6]: /fr/observability_pipelines/set_up_pipelines/archive_logs/logstash
[7]: /fr/observability_pipelines/archive_logs/splunk_hec
[8]: /fr/observability_pipelines/archive_logs/splunk_tcp
[9]: /fr/observability_pipelines/archive_logs/sumo_logic_hosted_collector
[10]: /fr/observability_pipelines/archive_logs/syslog
[11]: /fr/observability_pipelines/set_up_pipelines/archive_logs/amazon_s3
[12]: /fr/observability_pipelines/set_up_pipelines/archive_logs/amazon_data_firehose
[13]: /fr/observability_pipelines/set_up_pipelines/archive_logs/kafka
[14]: /fr/observability_pipelines/set_up_pipelines/archive_logs/socket