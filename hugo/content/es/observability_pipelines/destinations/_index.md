---
aliases:
- /es/observability_pipelines/destinations/datadog_apm/
- /es/observability_pipelines/destinations/opentelemetry/traces/
- /es/observability_pipelines/destinations/opentelemetry/metrics/
- /es/observability_pipelines/destinations/prometheus/
description: Obtenga información sobre los destinos disponibles para el Observability
  Pipelines Worker.
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentación
  text: Canalizaciones de procesamiento de registros
title: Destinos
---
## Descripción general {#overview}

Utilice el Observability Pipelines Worker para enviar sus registros y métricas procesados a diferentes destinos. La mayoría de los destinos de Observability Pipelines envían eventos en lotes a la integración descendente. Consulte [Procesamiento por lotes de eventos](#event-batching) para obtener más información. Algunos destinos de Observability Pipelines también tienen campos que admiten sintaxis de plantilla, por lo que puede configurar estos campos según campos específicos. Consulte [Sintaxis de plantilla](#template-syntax) para obtener más información.

**Notas**:
- Puede agregar un total de 20 destinos para una canalización.
- Si agrega varios destinos del mismo tipo a una canalización, debe usar [Secrets Management][4]. Por ejemplo, si agrega dos destinos de cliente HTTP para dos clientes HTTP diferentes, debe usar identificadores de secreto para los URI de cliente HTTP. No puede usar el `DESTINATION_HTTP_CLIENT_URI` predeterminado para almacenar los dos URI de cliente HTTP diferentes.

## Destinos {#destinations}

Estos son los destinos disponibles:

{{< tabs >}}
{{% tab "Registros" %}}

- [Amazon OpenSearch][1]
- [Amazon S3][22]
- [Amazon Security Lake][3]
- [Azure Storage][4]
- [ClickHouse][24]
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
[19]: /es/observability_pipelines/destinations/splunk_hec/logs/
[20]: /es/observability_pipelines/destinations/sumo_logic_hosted_collector/
[21]: /es/observability_pipelines/destinations/syslog/
[22]: /es/observability_pipelines/destinations/amazon_s3/
[23]: /es/observability_pipelines/destinations/databricks/
[24]: /es/observability_pipelines/destinations/clickhouse/

{{% /tab %}}

{{% tab "Métricas" %}}

- [Datadog Metrics][1]
- [Elasticsearch][2]
- [HTTP/S Client][3]
- [Splunk HEC][4]

[1]: /es/observability_pipelines/destinations/datadog_metrics/
[2]: /es/observability_pipelines/destinations/elasticsearch/
[3]: /es/observability_pipelines/destinations/http_client/
[4]: /es/observability_pipelines/destinations/splunk_hec/metrics

{{% /tab %}}
{{< /tabs >}}

## Sintaxis de plantilla {#template-syntax}

Los registros a menudo se almacenan en índices separados según los datos de registro, como el servicio o el entorno del que provienen los registros u otro atributo de registro. En Observability Pipelines, puede usar la sintaxis de plantilla para enrutar sus registros a diferentes índices según campos de registro específicos.

Cuando el Observability Pipelines Worker no puede resolver el campo con la sintaxis de plantilla, el Worker utiliza un comportamiento predeterminado para ese destino. Por ejemplo, si está usando la plantilla `{{application_id}}` for the Datadog Archives destination's **Prefix** field, but there isn't an `application_id` field in the log, the Worker creates a folder called `OP_UNRESOLVED_TEMPLATE_LOGS/` y publica los registros allí.

La siguiente tabla enumera los destinos y campos que admiten la sintaxis de plantilla, y lo que sucede cuando el Worker no puede resolver el campo:

| Destino       | Campos que admiten la sintaxis de plantilla                        | Comportamiento cuando el campo no se puede resolver                                                                                 |
|-------------------|--------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| Amazon Opensearch | Índice (modo Bulk)<br><br>Tipo, conjunto de datos, espacio de nombres (modo Data streams) | El Worker escribe los registros en el índice `datadog-op`.<br><br>El Worker descarta los registros si alguno de estos campos no se puede resolver. |
| [Datadog Archives]  | Prefijo                              | El Worker crea una carpeta llamada `OP_UNRESOLVED_TEMPLATE_LOGS/` y escribe los registros allí.                                |
| Azure Blob        | Prefijo                              | El Worker crea una carpeta llamada `OP_UNRESOLVED_TEMPLATE_LOGS/` y escribe los registros allí.                                |
| Elasticsearch     | Índice (modo Bulk)<br><br>Tipo, conjunto de datos, espacio de nombres (modo Data streams) | El Worker escribe los registros en el índice `datadog-op`.<br><br>El Worker descarta los registros si alguno de estos campos no se puede resolver. |
| Google Chronicle  | Tipo de registro                            | Utiliza el tipo de registro `DATADOG` de forma predeterminada.                                                                                            |
| Google Cloud      | Prefijo                              | El Worker crea una carpeta llamada `OP_UNRESOLVED_TEMPLATE_LOGS/` y escribe los registros allí.                                |
| Opensearch        | Índice (modo Bulk)<br><br>Tipo, conjunto de datos, espacio de nombres (modo Data streams) | El Worker escribe los registros en el índice `datadog-op`.<br><br>El Worker descarta los registros si alguno de estos campos no se puede resolver. |
| Prometheus*        | Tenant ID                           | El Worker descarta la métrica.  |
| Splunk HEC        | Índice<br>Tipo de fuente                | El Worker envía los registros al índice predeterminado configurado en Splunk.<br>El Worker utiliza de forma predeterminada el `httpevent` tipo de fuente. |

*La plantilla debe tener un prefijo literal, como `prefix-{{ tenant_id }}` or `prefix/{{ tenant_id }}`. Templates without a literal prefix, such as `{{ tenant_id }}`, son rechazados; el Worker registra un error y la canalización no se inicia.

#### Ejemplo {#example}

Si desea enrutar registros según el campo de ID de aplicación del registro (por ejemplo, `application_id`) al destino de Datadog Archives, use la sintaxis de campos de evento en el campo **Prefijo a aplicar a todas las claves de objeto**.

{{< img src="observability_pipelines/amazon_s3_prefix_20250709.png" alt="El destino de Datadog Archives mostrando el campo de prefijo usando la sintaxis de campos de evento /application_id={{ application_id }}/" style="width:40%;" >}}

### Sintaxis {#syntax}

#### Campos de evento {#event-fields}

Use `{{ <field_name> }}` para acceder a campos individuales de registro de eventos. Por ejemplo:

```
{{ application_id }}
```

#### Especificadores de strftime {#strftime-specifiers}

Use [especificadores de strftime][3] para la fecha y la hora. Por ejemplo:

```
year=%Y/month=%m/day=%d
```

#### Caracteres de escape {#escape-characters}

Anteponga un carácter con `\` para escapar el carácter. Este ejemplo escapa la sintaxis de campo de evento:

```
\{{ field_name }}
```

Este ejemplo escapa los especificadores de strftime:

```
year=\%Y/month=\%m/day=\%d/
```

## Procesamiento por lotes de eventos {#event-batching}

Los destinos de Observability Pipelines envían eventos en lotes a la integración descendente. Un lote de eventos se vacía cuando se cumple uno de los siguientes parámetros:

- Número máximo de eventos
- Número máximo de bytes
- Tiempo de espera (segundos)

Por ejemplo, si los parámetros de un destino son:

- Número máximo de eventos = 2
- Número máximo de bytes = 100,000
- Tiempo de espera (segundos) = 5

Y el destino recibe 1 evento en una ventana de 5 segundos, vacía el lote al cumplirse el tiempo de espera de 5 segundos.

Si el destino recibe 3 eventos en un lapso de 2 segundos, vacía un lote con 2 eventos y luego vacía un segundo lote con el evento restante después de 5 segundos. Si el destino recibe 1 evento que supera los 100,000 bytes, vacía este lote con ese evento.

{{% observability_pipelines/destination_batching %}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html#specifiers
[4]: /es/observability_pipelines/configuration/secrets_management/