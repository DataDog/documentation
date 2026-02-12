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

{{< whatsnext desc="Selecciona un destino para obtener más información:" >}}
    {{< nextlink href="observability_pipelines/destinations/amazon_opensearch" >}}Amazon OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/amazon_s3" >}}Amazon S3{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/azure_storage" >}}Azure Storage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/datadog_logs" >}}Logs de Datadog{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/elasticsearch" >}}Elasticsearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/google_chronicle" >}}Google Chronicle{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/google_cloud_storage" >}}Google Cloud Storage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/new_relic" >}}New Relic{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/microsoft_sentinel" >}}Microsoft Sentinel{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/opensearch" >}}OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/syslog" >}}rsyslog o syslog-ng{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/sentinelone" >}} SentinelOne {{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/splunk_hec" >}}HTTP Event Collector (HEC) de Splunk{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/sumo_logic_hosted_collector" >}}Sumo Logic Hosted Collector{{< /nextlink >}}
{{< /whatsnext >}}

## Sintaxis de la plantilla

Los logs suelen almacenarse en índices independientes basados en datos de logs, como el servicio o el entorno de los que proceden los logs u otro atributo de log. En Observability Pipelines, puedes utilizar la sintaxis de plantilla para dirigir tus logs a diferentes índices basados en campos de log específicos.

Cuando el worker de Observability Pipelines no puede resolver el campo con la sintaxis de la plantilla, el worker adopta por defecto un comportamiento especificado para ese destino. Por ejemplo, si estás utilizando la plantilla `{{application_id}}` para el campo **Prefix** (Prefijo) del destino de Amazon S3, pero no hay un campo `application_id` en el log, el worker crea una carpeta llamada `OP_UNRESOLVED_TEMPLATE_LOGS/` y publica los logs allí.

La siguiente tabla enumera los destinos y campos que admiten la sintaxis de plantilla, y explica qué ocurre cuando el worker no puede resolver el campo:

| Destino       | Campos compatibles con la sintaxis de plantilla | Comportamiento cuando no se puede resolver el campo                                                                                 |
|-------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Amazon Opensearch | Índice                               | El worker escribe logs en el índice `datadog-op`.                                                                          |
| Amazon S3         | Prefijo                              | El worker crea una carpeta llamada `OP_UNRESOLVED_TEMPLATE_LOGS/` y escribe allí los logs.                                |
| Azure Blob        | Prefijo                              | El worker crea una carpeta llamada `OP_UNRESOLVED_TEMPLATE_LOGS/` y escribe allí los logs.                                |
| Elasticsearch     | Tipo de fuente                         | El worker escribe logs en el índice `datadog-op`.                                                                          |
| Google Chronicle  | Tipo de log                            | Por defecto el tipo de log es `DATADOG`.                                                                                            |
| Google Cloud      | Prefijo                              | El worker crea una carpeta llamada `OP_UNRESOLVED_TEMPLATE_LOGS/` y escribe allí los logs.                                |
| Opensearch        | Índice                               | El worker escribe logs en el índice `datadog-op`.                                                                          |
| Splunk HEC        | Índice<br>Tipo de fuente                | El worker envía los logs al índice por defecto configurado en Splunk.<br>El worker envía por defecto el tipo de fuente `httpevent`. |

#### Ejemplo

Si deseas enrutar logs según el campo de ID de aplicación del log (por ejemplo, `application_id`) al destino de Amazon S3, utiliza la sintaxis de campos de evento en el campo **Prefix to apply to all object keys** (Prefijo para aplicar a todas las claves de objeto).

{{< img src="observability_pipelines/amazon_s3_prefix.png" alt="El destino de Amazon S3 que muestra el campo de prefijo mediante la sintaxis de campos de evento /application_id={{ application_id }}/" style="width:40%;" >}}

### Sintaxis

#### Campos de evento

Utiliza `{{ <field_name> }}` para acceder a los campos de evento de logs individuales. Por ejemplo:

```
{{ application_id }}
```

#### Especificadores Strftime

Utiliza [especificadores strftime][3] para la fecha y la hora. Por ejemplo:

```
year=%Y/month=%m/day=%d
```

#### Caracteres de escape

Utiliza un prefijo en un carácter con `\` para escapar del carácter. En este ejemplo, se escapa la sintaxis del campo de evento:

```
\{{ field_name }}
```

Este ejemplo escapa de los especificadores strftime:

```
year=\%Y/month=\%m/day=\%d/
```

## Colocación de eventos en lotes

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
[3]: https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html#specifiers