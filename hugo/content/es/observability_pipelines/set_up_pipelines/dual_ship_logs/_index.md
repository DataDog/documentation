---
aliases:
- /es/observability_pipelines/dual_ship_logs/
disable_toc: false
title: Logs de envío doble
---

## Información general

A medida que tu infraestructura y tu organización crecen, también lo hace el volumen de tus logs, la complejidad de tus datos y tu arquitectura de observabilidad. Para optimizar la gestión de tus logs, puede que necesites experimentar con diferentes herramientas de gestión de logs y flujos de trabajo de enrutamiento. Utiliza Observability Pipelines para enviar tus logs a diferentes destinos, de modo que puedas evaluar diferentes herramientas y flujos de trabajo con una interrupción mínima de tu entorno de producción.

{{% observability_pipelines/use_case_images/dual_ship_logs %}}

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
- [Rsyslog o Syslog-ng][10]

[1]: /es/observability_pipelines/dual_ship_logs/datadog_agent
[2]: /es/observability_pipelines/dual_ship_logs/fluent
[3]: /es/observability_pipelines/set_up_pipelines/dual_ship_logs/google_pubsub
[4]: /es/observability_pipelines/dual_ship_logs/http_client
[5]: /es/observability_pipelines/set_up_pipelines/dual_ship_logs/http_server
[6]: /es/observability_pipelines/set_up_pipelines/dual_ship_logs/logstash
[7]: /es/observability_pipelines/dual_ship_logs/splunk_hec
[8]: /es/observability_pipelines/dual_ship_logs/splunk_tcp
[9]: /es/observability_pipelines/dual_ship_logs/sumo_logic_hosted_collector
[10]: /es/observability_pipelines/dual_ship_logs/syslog
[11]: /es/observability_pipelines/set_up_pipelines/dual_ship_logs/amazon_s3
[12]: /es/observability_pipelines/set_up_pipelines/dual_ship_logs/amazon_data_firehose
[13]: /es/observability_pipelines/set_up_pipelines/dual_ship_logs/kafka