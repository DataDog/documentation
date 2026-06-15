---
aliases:
- /es/observability_pipelines/archive_logs/
disable_toc: false
title: Archivar logs en Archivos de Datadog
---

## Información general

Utiliza Observability Pipelines para dirigir los logs ingeridos a una solución de almacenamiento en la nube (Amazon S3, Google Cloud Storage o Azure Storage) en formato rehidratable de Datadog. A continuación, puedes rehidratar el archivo en Datadog ad hoc siempre que necesites analizarlos e investigarlos. Esto es útil cuando:

- Estás migrando de otro proveedor de logs a Datadog Log Management y deseas asegurarte de que tienes acceso a logs históricos cuando finalices la migración.
- Dispones de un gran volumen de logs con ruido, pero es posible que debas indexarlos en Log Management ad hoc.
- Tienes una política de retención.

{{% observability_pipelines/use_case_images/archive_logs %}}

Selecciona una fuente para empezar:

- [Amazon Data Firehose][12]
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
- [rsylsog o syslog-ng][10]

[1]: /es/observability_pipelines/archive_logs/datadog_agent
[2]: /es/observability_pipelines/archive_logs/fluent
[3]: /es/observability_pipelines/set_up_pipelines/archive_logs/google_pubsub
[4]: /es/observability_pipelines/archive_logs/http_client
[5]: /es/observability_pipelines/set_up_pipelines/archive_logs/http_server
[6]: /es/observability_pipelines/set_up_pipelines/archive_logs/logstash
[7]: /es/observability_pipelines/archive_logs/splunk_hec
[8]: /es/observability_pipelines/archive_logs/splunk_tcp
[9]: /es/observability_pipelines/archive_logs/sumo_logic_hosted_collector
[10]: /es/observability_pipelines/archive_logs/syslog
[11]: /es/observability_pipelines/set_up_pipelines/archive_logs/amazon_s3
[12]: /es/observability_pipelines/set_up_pipelines/archive_logs/amazon_data_firehose
[13]: /es/observability_pipelines/set_up_pipelines/archive_logs/kafka