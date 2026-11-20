---
description: Aprenda a usar el procesador de tabla de enriquecimiento para agregar
  contexto a los registros con conjuntos de datos de búsqueda.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: Blog
  text: Agregue contexto de actualización dinámica a los registros con tablas de referencia
    y Observability Pipelines
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Enrutar datos de OTel de aplicaciones de IA a ClickHouse y Datadog usando
    Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-servicenow-cmdb-enrichment
  tag: Blog
  text: Enriquezca los registros con contexto de ServiceNow CMDB antes de enrutarlos
    a cualquier SIEM o herramienta de registro.
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador de tabla de enriquecimiento
---
{{< product-availability >}}

## Descripción general {#overview}

Los registros pueden contener información como direcciones IP, ID de usuario o nombres de servicio que a menudo necesitan contexto adicional. Con el procesador de tabla de enriquecimiento, puede agregar contexto a sus registros, utilizando conjuntos de datos de búsqueda almacenados en [Reference Tables][1] de Datadog, archivos locales o tablas GeoIP de MaxMind. El procesador hace coincidir los registros según una clave especificada y agrega información de su archivo de búsqueda al registro. Si usa [Reference Tables], puede conectarse y enriquecer registros con conjuntos de datos basados en SaaS almacenados directamente en ServiceNow, Snowflake, S3 y más.

También puede usar el procesador de tabla de enriquecimiento con un archivo de búsqueda para asignar secretos, como una clave de Datadog API, tokens HEC de Splunk o encabezados personalizados en una solicitud HTTP, para filtrar y enrutar registros. Consulte [Usar un secreto como atributo de fuente](#use-a-secret-as-a-source-attribute) para obtener más información.

### Cuándo usar este procesador {#when-to-use-this-processor}

Los siguientes son casos de uso para enriquecer registros de integraciones.

#### Almacenamiento de objetos en la nube {#cloud-object-storage}

Los servicios de almacenamiento de objetos en la nube (Amazon S3, Azure Blob Storage, Google Cloud Storage) son servicios de almacenamiento escalables para grandes volúmenes de datos de referencia estructurados y no estructurados.

Use el procesador de tabla de enriquecimiento para enriquecer registros con conjuntos de datos de referencia mantenidos externamente, como fuentes de inteligencia de amenazas, listas de permitidos y denegados, inventarios de activos, mapeos de cumplimiento almacenados como CSV u otros tipos de archivos que se actualizan regularmente.

#### Databricks {#databricks}

Databricks es un data lakehouse basado en la nube utilizado para aprendizaje automático (ML), análisis avanzado y cargas de trabajo de big data.

Use el procesador de tabla de enriquecimiento para:
- Agregar predicciones o puntuaciones generadas por modelos de ML, como probabilidades de fraude y resultados de detección de anomalías.
- Hacer referencia a conjuntos de datos almacenados en Databricks, como perfiles de clientes, información de dispositivos o información de seguridad.

En la documentación de integración de Databricks de Datadog, consulte [Configuración de tablas de referencia][6] para obtener información sobre cómo configurar tablas de referencia para Databricks.

#### Salesforce {#salesforce}

Salesforce es una herramienta de gestión de relaciones con los clientes (CRM) que se utiliza para realizar un seguimiento y almacenar oportunidades de ventas, cuentas, contactos, acuerdos y contratos.

Use el procesador de tabla de enriquecimiento para:
- Adjunte información de clientes y cuentas, como el tipo de industria, el ARR y el propietario, a los registros operativos para priorizar incidentes.
- Enriquezca los paneles centrados en marketing o ventas con señales operativas como picos de latencia vinculados a los clientes.

En la documentación de la integración de Salesforce de Datadog, consulte [Habilitar la ingesta de Reference Tables][2] para obtener información sobre cómo configurar Reference Tables para Salesforce.

#### ServiceNow (CMDB) {#servicenow-cmdb}

ServiceNow es una plataforma de gestión de servicios de TI con una base de datos de gestión de configuración (CMDB) que realiza un seguimiento de los activos de infraestructura, las aplicaciones y las dependencias.

Use el procesador de tabla de enriquecimiento para:
- Enriquezca los registros con el contexto de propiedad y dependencia de la infraestructura, como qué equipo es propietario del servidor y qué unidad de negocio admite ese equipo.
- Agregue información directamente desde los registros de CMDB a la telemetría.

En la documentación de la integración de ServiceNow CMDB de Datadog, consulte [Reference Tables][7] para obtener información sobre cómo configurar Reference Tables para ServiceNow CMDB.

#### Snowflake {#snowflake}

Snowflake es un almacén/lago de datos nativo de la nube que centraliza datos estructurados y semiestructurados.

Use el procesador de tabla de enriquecimiento para:
- Agregue metadatos de clientes (nivel de cuenta, región, SLA) a los registros.
- Combine eventos de seguridad con atributos de usuario o activos almacenados en Snowflake.

En la documentación de la integración de Snowflake de Datadog, consulte [Reference Tables][3] para obtener información sobre cómo configurar Reference Tables para Snowflake.

## Configuración {#setup}

Para configurar el procesador de tabla de enriquecimiento:

1. Haga clic en {{< ui >}}Add enrichment{{< /ui >}}.
1. Defina un {{< ui >}}filter query{{< /ui >}}. Consulte [Sintaxis de búsqueda de registros][8] para obtener más información.
   - Solo los registros que coinciden con el filtro se envían a través del procesador.
   - Todos los registros, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
1. En la sección {{< ui >}}Set lookup mapping{{< /ui >}}, seleccione el tipo de conjunto de datos de búsqueda que desea utilizar.
  {{< tabs >}}
  {{% tab "Reference Table" %}}

  1. Seleccione la Reference Table en el menú desplegable. Consulte [Using reference tables](#using-reference-tables) para obtener más información.
  1. Haga clic en {{< ui >}}Manage{{< /ui >}} para ir a la página de configuración de Reference Tables.
  1. (Opcional) Seleccione columnas específicas con las cuales enriquecer sus logs.
      - Observability Pipelines enriquece los logs con todas las columnas de la tabla de forma predeterminada. Cada columna en la tabla se agrega como un atributo al registro, donde el nombre del atributo es el nombre de la columna y el valor del atributo es el valor de la columna.
      - Si desea enriquecer sus registros con columnas específicas de su Reference Table, seleccione los atributos correspondientes de las columnas en el menú desplegable.
  1. Ingrese un identificador de clave de aplicación de Datadog. Observability Pipelines utiliza [application keys][1] para acceder a la API programática de Datadog al enriquecer datos. Asegúrese de que su clave de aplicación sea:
      - Asociada con una [cuenta de servicio][2] (no una cuenta de usuario personal de Datadog).
      - Limitada al [`reference_tables_read`][3] contexto.
  1. Ingrese el atributo de fuente del registro. El valor del atributo de origen es lo que desea que Observability Pipelines encuentre en la Reference Table. Consulte el [Ejemplo de enriquecimiento](#enrichment-example) para obtener más información.
  1. Ingrese el atributo de destino. El valor del atributo de destino almacena, como un objeto JSON, la información encontrada en la Reference Table. Consulte el [Ejemplo de archivo de enriquecimiento](#enrichment-file-example) para obtener más información.
  1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: /es/account_management/api-app-keys/#application-keys
[2]: /es/account_management/org_settings/service_accounts#service-account-application-keys
[3]: /es/account_management/rbac/permissions/#reference-tables

  {{% /tab %}}
  {{% tab "Archivo" %}}

  1. Introduzca la ruta del archivo.
      - **Nota**: Todas las rutas de archivo se hacen relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` de forma predeterminada. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker`, o al menos ser legible por el grupo o el usuario. Consulte [Configuraciones avanzadas de trabajador][1] para obtener más información.
  1. Introduzca el nombre de la columna. El nombre de la columna en la tabla de enriquecimiento se utiliza para hacer coincidir el valor del atributo de origen. Consulte el [Ejemplo de enriquecimiento](#enrichment-example) para obtener más información.
  1. ({{< tooltip glossary="vista previa" case="title" >}}) Si está utilizando un secreto como atributo de origen, active {{< ui >}}Use Secret as source attribute{{< /ui >}} para habilitarlo.
      - Seleccione el tipo de secreto ({{< ui >}}Datadog API Key{{< /ui >}} o {{< ui >}}Splunk HEC token{{< /ui >}}).
      - Consulte el [ejemplo de uso de un secreto como atributo de fuente](#use-a-secret-as-a-source-attribute) para obtener más información.
  1. Si no está utilizando un secreto, introduzca el atributo de fuente del registro. El valor del atributo de origen se utiliza como clave para hacer coincidir el nombre de la columna en su archivo local.
  1. Ingrese el atributo de destino. El valor del atributo de destino almacena la información encontrada en el archivo como un objeto JSON.
  1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  {{% /tab %}}
  {{% tab "GeoIP" %}}

  1. Para GeoIP, ingrese la ruta de GeoIP a su archivo `.mmdb` relativa al directorio `<DD_OP_DATA_DIR>/config`.
      - **Nota**: Todas las rutas de archivo se hacen relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` de forma predeterminada. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker`, o al menos ser legible por el grupo o el usuario. Consulte [Configuraciones avanzadas de trabajador][1] para obtener más información.
  1. Ingrese el atributo de fuente del registro. El valor del atributo de fuente es lo que desea que Observability Pipelines encuentre en la Reference Table. Consulte el [Ejemplo de archivo de enriquecimiento](#enrichment-file-example) para obtener más información.
  1. Ingrese el atributo de destino. El valor del atributo de destino almacena la información encontrada en la Reference Table como un objeto JSON. Consulte el [Ejemplo de archivo de enriquecimiento](#enrichment-file-example) para obtener más información.
  1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  {{% /tab %}}
  {{< /tabs >}}

### Ejemplo de enriquecimiento {#enrichment-example}

Para este ejemplo:

- Esta es la Reference Table o el archivo que utiliza el procesador de enriquecimiento:
  | merch_id | merchant_name   | city      | state    |
  | -------- | --------------- | --------- | -------- |
  | 803      | Andy's Ottomans | Boise     | Idaho    |
  | 536      | Cindy's Couches | Boulder   | Colorado |
  | 235      | Debra's Benches | Las Vegas | Nevada   |
- `merchant_id` se utiliza como atributo de origen y `merchant_info` como atributo de destino.
- `merch_id` se establece como el nombre de la columna que el procesador utiliza para encontrar el valor del atributo de origen. **Nota**: El valor del atributo de origen no tiene que coincidir con el nombre de la columna.

Si el procesador de enriquecimiento recibe un registro con `"merchant_id":"536"`:

- El procesador busca el valor `536` en la columna `merch_id` de la Reference Table.
- Después de encontrar el valor, agrega toda la fila de información de la Reference Table al atributo `merchant_info` como un objeto JSON:

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

### Utilice un secreto como atributo de origen {#use-a-secret-as-a-source-attribute}

Para la opción de búsqueda de archivos, puede habilitar {{< ui >}}Use Secret as source attribute{{< /ui >}} para asignar a un secreto, como una clave de Datadog API, un token de Splunk HEC o un encabezado personalizado en una solicitud HTTP, en su archivo CSV local. El secreto se utiliza como clave para buscar coincidencias con el nombre de la columna en su archivo local.

**Nota**: Si desea asignar tokens de Splunk HEC, debe utilizar una [fuente de Splunk HEC][9] y habilitar {{< ui >}}Store HEC token{{< /ui >}} en la fuente.

#### Ejemplo de Splunk HEC {#splunk-hec-example}

Por ejemplo, si desea filtrar y enrutar registros basados en tokens de Splunk HEC:

1. Habilite {{< ui >}}Store HEC token{{< /ui >}} en la fuente de Splunk HEC para almacenar el token en los metadatos del evento.
1. Utilice la opción de búsqueda de archivos en el procesador de tabla de enriquecimiento para usar el token HEC almacenado en los metadatos del evento como clave de búsqueda. El Worker enriquece el evento para que pueda filtrar y enrutar registros basados en ese valor.

Ejemplo de un archivo CSV de búsqueda local con tokens de Splunk HEC asignados a un valor:

| Token de Splunk HEC (secreto) | Valor del token HEC |
| ------------------------- | --------------- |
| `abcdef`                  | `hec_token_one` |
| `uvwxyz`                  | `hec_token_two` |

Para este ejemplo, ingrese `Splunk HEC token (secret)` como el nombre de la columna cuando configure el procesador. Si `token_value` es la ruta del atributo de destino, este es el valor del token HEC agregado a un registro de ejemplo:

```
{
  "message": "this is a test"
  "token_value": "hec_token_one"
}

```

Puede filtrar y enrutar registros basados en `token_value: hec_token_one`.

## Métricas de estado {#health-metrics}

### Métricas del procesador {#processor-metrics}

Para ver métricas sobre su procesador de tabla de enriquecimiento, agregue las etiquetas `component_type=enrichment_table` y `component_id=<processor_id>` a las métricas del procesador:

`pipelines.enrichment_rows_not_found_total`
: Número de registros procesados que no tienen filas correspondientes en la tabla.

`pipelines.component_errors_total`
: Número de registros que no se pueden enriquecer debido a un error. Estos errores se informan con la etiqueta `error_code=did_not_enrich_event`.
: La etiqueta `reason` puede contener los siguientes valores:<br>- `target_exists`: El valor de destino para almacenar los datos enriquecidos ya existe y no es un objeto.<br>- `too_many_pending_lookups`: El búfer o la cola de búsqueda está llena.<br>- `lookup_failed`: La clave de búsqueda no se encontró en el registro, no es una cadena o no es un número entero.

### Métricas del búfer (al usar Reference Tables) {#buffer-metrics-when-using-reference-tables}

El búfer del procesador de tabla de enriquecimiento solo se habilita al enriquecer desde una Reference Table.

Para ver las métricas del búfer de su procesador de tabla de enriquecimiento, agregue estas etiquetas a las métricas del búfer:

- `component_type=enrichment_table`
- `component_id=<processor_id>`
- `buffer_id=enrichment_table_buffer`

`pipelines.buffer_events`
: **Descripción**: Número de eventos en el búfer del procesador.
: **Tipo de métrica**: gauge

`pipelines.buffer_size_bytes`
: **Descripción**: Número de bytes en el búfer del procesador.
: **Tipo de métrica**: gauge

`pipelines.buffer_received_events_total`
: **Descripción**: Eventos recibidos por el búfer del procesador.
: **Tipo de métrica**: contador

`pipelines.buffer_received_bytes_total`
: **Descripción**: Bytes recibidos por el búfer del procesador.
: **Tipo de métrica**: contador

`pipelines.buffer_sent_events_total`
: **Descripción**: Eventos enviados aguas abajo por el búfer del procesador.
: **Tipo de métrica**: contador

`pipelines.buffer_sent_bytes_total`
: **Descripción**: Bytes enviados aguas abajo por el búfer del procesador.
: **Tipo de métrica**: contador

### Métricas de Reference Table {#reference-table-metrics}

Para ver métricas sobre su procesador de tabla de enriquecimiento que utiliza una Reference Table, agregue las etiquetas `component_type:enrichment_table` y `component_id=<processor_id>` a las métricas a continuación. La etiqueta `reference_table_id:<table_uuid>` también se puede utilizar para agregar en todos los procesadores que utilizan la misma Reference Table.

`pipelines.enrichment_rows_not_found_total`
: Este contador se incrementa por cada registro procesado que no tiene una fila correspondiente en la tabla. Disponible en la versión 2.14 del Worker y posteriores.

`pipelines.enrichment_cache_hits_total`
: Número de aciertos de caché, es decir, registros que pudieron enriquecerse sin ser almacenados en búfer.

`pipelines.enrichment_cache_misses_total`
: Número de fallos de caché, es decir, registros que requirieron almacenamiento en búfer y el envío de una solicitud a la Reference Tables API.

`pipelines.component_errors_total`
: Número de registros que no pueden enriquecerse debido a un error. Estos errores se informan con la etiqueta `error_code=did_not_enrich_event`.
: La etiqueta `reason` puede contener los siguientes valores:<br>- `target_exists`: El valor de destino para almacenar los datos enriquecidos ya existe y no es un objeto.<br>- `too_many_pending_lookups`: El búfer o la cola de búsqueda está llena.<br>- `lookup_failed`: La clave de búsqueda no se encontró en el registro, no es una cadena o un entero.<br>- `reference_table_read_error`: Ocurrieron errores irrecuperables o demasiados errores consecutivos al intentar leer la Reference Table.


Las métricas a continuación son comunes a todos los procesadores que consumen la misma Reference Table y utilizan las etiquetas `component_type:enrichment_table`, `component_id=reference_table_<table_uuid>` y `reference_table:<table_uuid>`.

`pipelines.reference_table_cached_rows`
: Esta métrica gauge informa el número de filas almacenadas en la caché local. La etiqueta `found:true` informa las filas existentes en la tabla, y `found:false` informa las filas que no existen en la tabla.

`pipelines.reference_table_queued_keys`
: Esta métrica de tipo gauge informa el número de claves de fila que esperan ser leídas desde la Reference Tables API. La cola tiene una capacidad máxima de 5,000 claves. Cuando un registro intenta insertar una clave que excedería este límite, el registro se envía inmediatamente a continuación sin enriquecimiento.

`pipelines.reference_table_fetched_keys_total`
: Por cada solicitud enviada a la Reference Tables API, este contador se incrementa con el número de filas obtenidas en esa solicitud.

## Cómo funciona el procesador {#how-the-processor-works}

### Uso de Reference Tables {#using-reference-tables}

[Reference Tables][4] le permiten almacenar información como detalles de clientes, listas de activos e información de dependencia de servicios en Datadog. El procesador de la Enrichment Table extrae filas de las Reference Tables bajo demanda y las almacena en caché localmente. Las filas de la Reference Table permanecen en la caché durante unos 10 minutos (30 minutos para una búsqueda negativa, donde la fila no se encontró en la Reference Table). Después de eso, se eliminan o se actualizan.

Cuando el procesador encuentra un registro que no tiene una fila correspondiente en la caché, los datos del registro se almacenan en un búfer en la memoria hasta que la fila se recupera de la Reference Table. Si el búfer alcanza su capacidad máxima (20,000 eventos), comienza a enviar los registros almacenados en búfer más antiguos hacia abajo sin enriquecimiento. El procesador no ejerce contrapresión hacia arriba.

Se envía una solicitud para leer las Reference Tables cada segundo o cuando hay 250 claves en cola para una búsqueda.

Si ocurre un error de autenticación al conectarse a la Reference Table o después de una serie de solicitudes fallidas, Datadog envía los registros almacenados en búfer hacia abajo sin enriquecimiento, para evitar que los registros esperen indefinidamente, y el búfer deja de aceptar nuevos registros. El procesador reintenta periódicamente las solicitudes y reanuda automáticamente las operaciones normales cuando una solicitud tiene éxito.

Si ocurre un error que provoca que un registro se envíe sin enriquecimiento, puede visualizarlo en los registros del Worker. También incrementa la métrica [`pipelines.component_errors_total`](#processor-metrics).

Datadog no recomienda usar el procesador en un campo de registro con alta cardinalidad (del orden de 10,000 o más valores posibles dentro de un marco de tiempo de 10 minutos). La Reference Tables API está sujeta a límites de tasa y podría denegar las solicitudes del Worker. Comuníquese con [soporte de Datadog][5] si continúa notando advertencias de límite de tasa en los registros del Worker mientras ejecuta el procesador.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/reference_tables/?tab=cloudstorage
[2]: /es/integrations/salesforce/#optional-enable-ingestion-of-reference-tables
[3]: /es/integrations/snowflake-web/#reference-tables
[4]: https://docs.datadoghq.com/es/reference_tables/?tab=cloudstorage#reference-table-limits
[5]: /es/help/
[6]: /es/integrations/databricks/?tab=useaserviceprincipalforoauth#reference-table-configuration
[7]: /es/integrations/guide/servicenow-cmdb-enrichment-setup/#reference-tables
[8]: /es/observability_pipelines/search_syntax/logs/
[9]: /es/observability_pipelines/sources/splunk_hec/?tab=secretsmanagement