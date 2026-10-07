---
aliases:
- /es/observability_pipelines/split_logs/
disable_toc: false
title: Dividir logs
---

## Información general

A menudo, las organizaciones necesitan enviar sus logs a varios productos para diferentes casos de uso. Por ejemplo, puedes enviar tus logs de seguridad a tu aplicación SIEM y tus logs de DevOps a Datadog. Utiliza Observability Pipelines para enviar tus logs a diferentes destinos en función de tu caso de uso.

{{% observability_pipelines/use_case_images/split_logs %}}

Selecciona tu fuente de log para empezar:

<!-- - [Amazon Data Firehose][12] -->
- [Amazon S3][11]
- [Datadog Agent][1]
- [Fluentd o Fluent Bit][2]
- [Google Pub/Sub][3]
- [Cliente HTTP][4]
- [Servidor HTTP][5]
- [Kafka][13]
- [Logstash][6]
- [Splunk HTTP Event Collector (HEC)][7]
- [Splunk Heavy o Universal Forwarders (TCP)][8]
- [Sumo Logic Hosted Collector][9]
- [Rsyslog o Syslog-ng][10]

[1]: /es/observability_pipelines/split_logs/datadog_agent
[2]: /es/observability_pipelines/split_logs/fluent
[3]: /es/observability_pipelines/set_up_pipelines/split_logs/google_pubsub
[4]: /es/observability_pipelines/split_logs/http_client
[5]: /es/observability_pipelines/set_up_pipelines/split_logs/http_server
[6]: /es/observability_pipelines/set_up_pipelines/split_logs/logstash
[7]: /es/observability_pipelines/split_logs/splunk_hec
[8]: /es/observability_pipelines/split_logs/splunk_tcp
[9]: /es/observability_pipelines/split_logs/sumo_logic_hosted_collector
[10]: /es/observability_pipelines/split_logs/syslog
[11]: /es/observability_pipelines/set_up_pipelines/split_logs/amazon_s3
[12]: /es/observability_pipelines/set_up_pipelines/split_logs/amazon_data_firehose
[13]: /es/observability_pipelines/set_up_pipelines/split_logs/kafka