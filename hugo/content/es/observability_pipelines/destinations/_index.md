---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentación
  text: Pipelines de procesamiento de registros
title: Destinos
---
## Descripción general {#overview}

Utilice el Observability Pipelines Worker para enviar sus registros y métricas procesados ({{< tooltip glossary="vista previa" case="title" >}}) a diferentes destinos. La mayoría de los destinos de Observability Pipelines envían eventos en lotes a la integración descendente. Consulte [Agrupación de eventos](#event-batching) para más información. Algunos destinos de Observability Pipelines también tienen campos que admiten sintaxis de plantillas, por lo que puede establecer estos campos en función de campos específicos. Consulte [Sintaxis de plantillas](#template-syntax) para más información.

Seleccione un destino en el menú de navegación de la izquierda para ver más información sobre él.

## Destinos {#destinations}

Estos son los destinos disponibles:

{{< tabs >}}
{{% tab "Registros" %}}

- [Amazon OpenSearch][1]
- [Amazon S3][22]
- [Amazon Security Lake][3]
- [Azure Storage][4]
- [CrowdStrike Next-Gen SIEM][6]
- [Databricks (Zerobus)][23]
- [Datadog Archives][2]
- [Datadog BYOC Logs][5]
- [Datadog Logs][7]
- [Elasticsearch][8]
- [Google Cloud Storage][10]
- [Google Pub/Sub][11]
- [Google SecOps][9]
- [HTTP Client][12]
- [Kafka][13]
- [Microsoft Sentinel][14]
- [New Relic][15]
- [OpenSearch][16]
- [SentinelOne][17]
- [Socket][18]
- [Splunk HTTP Event Collector (HEC)][19]
- [Sumo Logic Hosted Collector][20]
- [Syslog][21]

[1]: /es/observability_pipelines/destinations/amazon_opensearch/
[2]: /es/observability_pipelines/destinations/datadog_archives/
[3]: /es/observability_pipelines/destinations/amazon_security_lake/
[4]: /es/observability_pipelines/destinations/azure_storage/
[5]: /es/observability_pipelines/destinations/datadog_byoc_logs/
[6]: /es/observability_pipelines/destinations/crowdstrike_ng_siem/
[7]: /es/observability_pipelines/destinations/datadog_logs/
[8]: /es/observability_pipelines/destinations/elasticsearch/
[9]: /es/observability_pipelines/destinations/google_secops/
[10]: /es/observability_pipelines/destinations/google_cloud_storage/
[11]: /es/observability_pipelines/destinations/google_pubsub/
[12]: /es/observability_pipelines/destinations/http_client/
[13]: /es/observability_pipelines/destinations/kafka/
[14]: /es/observability_pipelines/destinations/microsoft_sentinel/
[15]: /es/observability_pipelines/destinations/new_relic/
[16]: /es/observability_pipelines/destinations/opensearch/
[17]: /es/observability_pipelines/destinations/sentinelone/
[18]: /es/observability_pipelines/destinations/socket/
[19]: /es/observability_pipelines/destinations/splunk_hec/
[20]: /es/observability_pipelines/destinations/sumo_logic_hosted_collector/
[21]: /es/observability_pipelines/destinations/syslog/
[22]: /es/observability_pipelines/destinations/amazon_s3/
[23]: /es/observability_pipelines/destinations/databricks/

{{% /tab %}}

{{% tab "Métricas" %}}

- [Datadog Metrics][1]
- [Elasticsearch][2]
- [HTTP/S Client][3]

[1]: /es/observability_pipelines/destinations/datadog_metrics/
[2]: /es/observability_pipelines/destinations/elasticsearch/
[3]: /es/observability_pipelines/destinations/http_client/

{{% /tab %}}
{{< /tabs >}}

## Sintaxis de plantillas {#template-syntax}

Los registros a menudo se almacenan en índices separados según los datos del registro, como el servicio o el entorno del que provienen los registros o algún otro atributo del registro. En Observability Pipelines, puede usar la sintaxis de plantillas para dirigir sus registros a diferentes índices según campos específicos.

Cuando el Observability Pipelines Worker no puede resolver el campo con la sintaxis de plantillas, el Observability Pipelines Worker utiliza un comportamiento especificado para ese destino. Por ejemplo, si utiliza la plantilla `{{application_id}}` for the Datadog Archives destination's **Prefix** field, but there isn't an `application_id` field in the log, the Worker creates a folder called `OP_UNRESOLVED_TEMPLATE_LOGS/` y publica los registros allí.

La siguiente tabla enumera los destinos y campos que admiten la sintaxis de plantillas, y lo que sucede cuando el Worker no puede resolver el campo:

| Destino       | Campos que admiten la sintaxis de plantillas | Comportamiento cuando el campo no puede ser resuelto                                                                                 |
|-------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Amazon Opensearch | Índice                               | El Worker escribe registros en el índice `datadog-op`.                                                                          |
| Datadog Archives  | Prefijo                              | El Worker crea una carpeta llamada `OP_UNRESOLVED_TEMPLATE_LOGS/` y escribe los registros allí.                                |
| Azure Blob        | Prefijo                              | El Worker crea una carpeta llamada `OP_UNRESOLVED_TEMPLATE_LOGS/` y escribe los registros allí.                                |
| Elasticsearch     | Índice                               | El Worker escribe registros en el índice `datadog-op`.                                                                          |
| Google Chronicle  | Tipo de registro                            | Por defecto es el tipo de registro `DATADOG`.                                                                                            |
| Google Cloud      | Prefijo                              | El Worker crea una carpeta llamada `OP_UNRESOLVED_TEMPLATE_LOGS/` y escribe los registros allí.                                |
| Opensearch        | Índice                               | El Worker escribe registros en el índice `datadog-op`.                                                                          |
| Splunk HEC        | Índice<br>Tipo de fuente                | El Worker envía los registros al índice predeterminado configurado en Splunk.<br>El Worker utiliza por defecto el tipo de fuente `httpevent`. |

#### Ejemplo {#example}

Si desea enrutar registros basados en el campo ID de aplicación del registro (por ejemplo, `application_id`) al destino Datadog Archives, utilice la sintaxis de campos de evento en el **Prefijo para aplicar a todas las claves de objeto** campo.

{{< img src="observability_pipelines/amazon_s3_prefix_20250709.png" alt="El destino Datadog Archives mostrando el campo prefijo utilizando la sintaxis de campos de evento /application_id={{ application_id }}/" style="width:40%;" >}}

### Sintaxis {#syntax}

#### Campos de evento {#event-fields}

Utilice `{{ <field_name> }}` para acceder a campos de eventos de registro individuales. Por ejemplo:

```
{{ application_id }}
```

#### Especificadores strftime {#strftime-specifiers}

Utilice [especificadores strftime][3] para la fecha y la hora. Por ejemplo:

```
year=%Y/month=%m/day=%d
```

#### Caracteres de escape {#escape-characters}

Anteponga `\` a un carácter para escapar dicho carácter. Este ejemplo escapa la sintaxis de campos de evento:

```
\{{ field_name }}
```

Este ejemplo escapa los especificadores de strftime:

```
year=\%Y/month=\%m/day=\%d/
```

## Agrupación de eventos {#event-batching}

Los destinos de Observability Pipelines envían eventos en lotes a la integración descendente. Un lote de eventos se vacía cuando se cumple uno de los siguientes parámetros:

- Número máximo de eventos
- Número máximo de bytes
- Tiempo de espera (segundos)

Por ejemplo, si los parámetros de un destino son:

- Número máximo de eventos = 2
- Número máximo de bytes = 100 000
- Tiempo de espera (segundos) = 5

Y el destino recibe 1 evento en una ventana de 5 segundos, vacía el lote al tiempo de espera de 5 segundos.

Si el destino recibe 3 eventos en 2 segundos, vacía un lote con 2 eventos y luego vacía un segundo lote con el evento restante después de 5 segundos. Si el destino recibe 1 evento que supera los 100 000 bytes, vacía este lote con el 1 evento.

{{% observability_pipelines/destination_batching %}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html#specifiers