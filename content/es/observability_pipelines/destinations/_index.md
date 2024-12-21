---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentación
  text: Pipelines de procesamiento de logs
title: Destinos
---

## Información general

Utiliza el worker de pipelines de observabilidad para enviar tus logs procesados a diferentes destinos.

Selecciona y configura tus destinos cuando [configures un pipeline][1]. Este es el paso 4 del proceso de configuración de pipelines:

1. Ve a [Pipelines de observabilidad][2].
1. Selecciona una plantilla.
1. Selecciona y configura tu fuente.
1. Selecciona y configura tus destinos.
1. Configura tus procesadores.
1. Instala el worker de pipelines de observabilidad.

{{< whatsnext desc="Select a destination for more information:" >}}
    {{< nextlink href="observability_pipelines/destinations/amazon_opensearch" >}}Amazon OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/amazon_s3" >}}Amazon S3{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/azure_storage" >}}Azure Storage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/datadog_logs" >}}Logs de Datadog{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/elasticsearch" >}}Elasticsearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/google_chronicle" >}}Google Chronicle{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/google_cloud_storage" >}}Google Cloud Storage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/new_relic" >}}New Relic{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/opensearch" >}}OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/syslog" >}}rsyslog o syslog-ng{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/splunk_hec" >}}HTTP Event Collector (HEC) de Splunk{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/sumo_logic_hosted_collector" >}}Sumo Logic Hosted Collector{{< /nextlink >}}
{{< /whatsnext >}}


## Eventos en lotes

Los destinos de los pipelines de observabilidad envían eventos en lotes a la integración aguas abajo. Un lote de eventos se descarga cuando se cumple uno de los siguientes parámetros:

- Número máximo de eventos
- Número máximo de bytes
- Tiempo de espera (segundos)

Por ejemplo, si los parámetros de un destino son:

- Número máximo de eventos = 2
- Número máximo de bytes = 100.000
- Tiempo de espera (segundos) = 5

Y el destino recibe 1 evento en una ventana de 5 segundos, descarga el lote en el tiempo de espera de 5 segundos.

Si el destino recibe 3 eventos en 2 segundos, descarga un lote con 2 eventos y descarga un segundo lote con el evento restante luego de 5 segundos. Si el destino recibe 1 evento que supera los 100.000 bytes, descarga este lote con ese evento.

{{% observability_pipelines/destination_batching %}}

[1]: /es/observability_pipelines/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines