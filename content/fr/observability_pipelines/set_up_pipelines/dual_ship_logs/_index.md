---
aliases:
- /fr/observability_pipelines/dual_ship_logs/
disable_toc: false
title: Logs à transmission multiple
---

## Section Overview

À mesure que votre infrastructure et votre organisation évoluent, le volume de vos logs, la complexité de vos données et votre architecture d'observabilité augmentent également. Pour optimiser la gestion de vos logs, vous pourriez avoir besoin de tester différents outils de gestion des logs et des workflows de routage. Utilisez Observability Pipelines pour envoyer vos logs vers différentes destinations, afin de pouvoir évaluer divers outils et workflows avec un minimum d'impact sur votre environnement de production.

{{% observability_pipelines/use_case_images/dual_ship_logs %}}

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
- [rsyslog ou syslog-ng][10]

[1]: /fr/observability_pipelines/dual_ship_logs/datadog_agent
[2]: /fr/observability_pipelines/dual_ship_logs/fluent
[3]: /fr/observability_pipelines/set_up_pipelines/dual_ship_logs/google_pubsub
[4]: /fr/observability_pipelines/dual_ship_logs/http_client
[5]: /fr/observability_pipelines/set_up_pipelines/dual_ship_logs/http_server
[6]: /fr/observability_pipelines/set_up_pipelines/dual_ship_logs/logstash
[7]: /fr/observability_pipelines/dual_ship_logs/splunk_hec
[8]: /fr/observability_pipelines/dual_ship_logs/splunk_tcp
[9]: /fr/observability_pipelines/dual_ship_logs/sumo_logic_hosted_collector
[10]: /fr/observability_pipelines/dual_ship_logs/syslog
[11]: /fr/observability_pipelines/set_up_pipelines/dual_ship_logs/amazon_s3
[12]: /fr/observability_pipelines/set_up_pipelines/dual_ship_logs/amazon_data_firehose
[13]: /fr/observability_pipelines/set_up_pipelines/dual_ship_logs/kafka
[14]: /fr/observability_pipelines/set_up_pipelines/dual_ship_logs/socket