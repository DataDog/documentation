---
aliases:
- /es/observability_pipelines/log_volume_control/
disable_toc: false
further_reading:
- link: /observability_pipelines/guide/strategies_for_reducing_log_volume/
  tag: documentación
  text: Estrategias para reducir el volumen de logs
title: Control del volumen de logs
---

## Información general

A medida que crecen tu infraestructura y tus aplicaciones, también lo hace el volumen de logs y la complejidad de los datos. Un gran volumen de logs puede introducir mucho ruido y dificultar el análisis y la resolución de problemas de logs. Utiliza los procesadores de Observability Pipelines para decidir qué logs son valiosos y cuáles son ruidosos y carecen de interés, antes de enviar tus logs a sus destinos. Puedes utilizar los siguientes procesadores en Observability Pipeline Worker para gestionar tus logs:

- **Filtro**: añade una consulta para enviar sólo un subconjunto de logs en función de tus condiciones.
- **Muestreo**: define una frecuencia de muestreo para enviar sólo un subconjunto de tus logs.
- **Cuota**: impone límites diarios al volumen de datos de log o al número de eventos de log.
- **Dedupe**: elimina las copias duplicadas de tus logs, por ejemplo, debido a reintentos por problemas de red.
- **Mapa**: añade, suelta o cambia el nombre de un campo en tus logs.

{{% observability_pipelines/use_case_images/log_volume_control %}}

Selecciona una fuente de logs para empezar:

- [Datadog Agent][1]
- [Fluentd o Fluent Bit][2]
- [Google Pub/Sub][3]
- [Cliente HTTP][4]
- [Servidor HTTP][5]
- [Logstash][6]
- [Splunk HTTP Event Collector (HEC)][7]
- [Splunk Heavy o Universal Forwarders (TCP)][8]
- [Sumo Logic Hosted Collector][9]
- [Rsyslog o Syslog-ng][10]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/log_volume_control/datadog_agent
[2]: /es/observability_pipelines/log_volume_control/fluent
[3]: /es/observability_pipelines/set_up_pipelines/log_volume_control/google_pubsub
[4]: /es/observability_pipelines/log_volume_control/http_client
[5]: /es/observability_pipelines/set_up_pipelines/log_volume_control/http_server
[6]: /es/observability_pipelines/set_up_pipelines/log_volume_control/logstash
[7]: /es/observability_pipelines/log_volume_control/splunk_hec
[8]: /es/observability_pipelines/log_volume_control/splunk_tcp
[9]: /es/observability_pipelines/log_volume_control/sumo_logic_hosted_collector
[10]: /es/observability_pipelines/log_volume_control/syslog