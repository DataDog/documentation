---
aliases:
- /es/observability_pipelines/sensitive_data_redaction/
disable_toc: false
title: Redacción de datos confidenciales
---

## Información general

Los datos confidenciales, como números de tarjetas de crédito, números de ruta bancaria y claves de API, pueden revelarse involuntariamente en tus logs, lo que puede exponer a tu organización a riesgos financieros y de privacidad.

Utiliza el worker de Observability Pipelines para identificar, etiquetar y, opcionalmente, redactar o hacer hash en información confidencial antes de enrutar logs a diferentes destinos y fuera de tu infraestructura. Puedes utilizar reglas de escaneado predefinidas para detectar patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, etc. O crear reglas de escaneado personalizadas mediante patrones de expresión regular que coincidan con información confidencial. También puedes crear reglas de análisis personalizadas mediante patrones de expresión regular para buscar información confidencial.

{{% observability_pipelines/use_case_images/sensitive_data_redaction %}}

Selecciona una fuente de log para empezar:

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

[1]: /es/observability_pipelines/sensitive_data_redaction/datadog_agent
[2]: /es/observability_pipelines/sensitive_data_redaction/fluent
[3]: /es/observability_pipelines/set_up_pipelines/sensitive_data_redaction/google_pubsub
[4]: /es/observability_pipelines/sensitive_data_redaction/http_client
[5]: /es/observability_pipelines/set_up_pipelines/sensitive_data_redaction/http_server
[6]: /es/observability_pipelines/set_up_pipelines/sensitive_data_redaction/logstash
[7]: /es/observability_pipelines/sensitive_data_redaction/splunk_hec
[8]: /es/observability_pipelines/sensitive_data_redaction/splunk_tcp
[9]: /es/observability_pipelines/sensitive_data_redaction/sumo_logic_hosted_collector
[10]: /es/observability_pipelines/sensitive_data_redaction/syslog
[11]: /es/observability_pipelines/set_up_pipelines/sensitive_data_redaction/amazon_s3
[12]: /es/observability_pipelines/set_up_pipelines/sensitive_data_redaction/amazon_data_firehose
[13]: /es/observability_pipelines/set_up_pipelines/sensitive_data_redaction/kafka