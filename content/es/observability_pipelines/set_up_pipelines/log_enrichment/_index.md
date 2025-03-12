---
aliases:
- /es/observability_pipelines/log_enrichment/
disable_toc: false
title: Enriquecimiento de logs
---

## Información general

A medida que tu organización crece, los logs de tus servicios, sistemas y aplicaciones crecen en volumen y complejidad. Para gestionar estos logs, puede que necesites estandarizar su formato y añadir información para facilitar su búsqueda y análisis. Por ejemplo, cada fuente de log tiene su propio formato. Esto puede dificultar la búsqueda y el análisis durante las investigaciones si no se han reformateado y normalizado. También podrías tener información adicional, como ID de clientes o direcciones IP, que desees añadir a tus logs. Utiliza la plantilla de enriquecimiento de logs y estos procesadores de Observability Pipelines para enriquecer y transformar tus logs:

- **Tabla de enriquecimiento**: enriquece tus logs con información de una tabla de referencia, que puede ser un archivo local o una base de datos GeoIP.
- **Grok Parser**: analiza tus logs utilizando las reglas de parseo de grok disponibles para un conjunto de fuentes.
- **Añadir el nombre de host**: añade el nombre del host que envió el log para que puedas usarlo para encontrar la causa raíz de un problema.
- **Procesar JSON**: convierte campos en objetos JSON.

{{% observability_pipelines/use_case_images/log_enrichment %}}

Selecciona una fuente para empezar:

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

[1]: /es/observability_pipelines/log_enrichment/datadog_agent
[2]: /es/observability_pipelines/log_enrichment/fluent
[3]: /es/observability_pipelines/set_up_pipelines/log_enrichment/google_pubsub
[4]: /es/observability_pipelines/log_enrichment/http_client
[5]: /es/observability_pipelines/set_up_pipelines/log_enrichment/http_server
[6]: /es/observability_pipelines/set_up_pipelines/log_enrichment/logstash
[7]: /es/observability_pipelines/log_enrichment/splunk_hec
[8]: /es/observability_pipelines/log_enrichment/splunk_tcp
[9]: /es/observability_pipelines/log_enrichment/sumo_logic_hosted_collector
[10]: /es/observability_pipelines/log_enrichment/syslog
[11]: /es/observability_pipelines/set_up_pipelines/log_enrichment/amazon_s3
[12]: /es/observability_pipelines/set_up_pipelines/log_enrichment/amazon_data_firehose
[13]: /es/observability_pipelines/set_up_pipelines/log_enrichment/kafka