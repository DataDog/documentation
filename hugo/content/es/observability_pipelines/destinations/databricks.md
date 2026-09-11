---
description: Aprenda a enviar registros a una tabla de Databricks Unity Catalog usando
  el destino Databricks (Zerobus).
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino Databricks (Zerobus)
---
{{< product-availability >}}

{{< callout url="#"
 btn_hidden="true" header="¡Únase a la vista previa!">}}
El destino Databricks (Zerobus) está en versión preliminar. Comuníquese con su administrador de cuenta para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

Utilice el destino Databricks (Zerobus) de Observability Pipelines para enviar registros a una tabla de Databricks Unity Catalog. El destino transmite registros a la [Zerobus Ingest API][1] y se autentica en Databricks con un service principal OAuth.

## Requisitos previos {#prerequisites}

Antes de configurar el destino Databricks (Zerobus), debe:

- [Configure un esquema y una tabla de Unity Catalog](#set-up-a-schema-and-table) en los que el Observability Pipelines Worker escriba los registros.
- [Configure un servicio principal](#set-up-a-service-principal) que el Worker utilice para autenticarse en Databricks. El servicio principal necesita permiso para leer y escribir en la tabla.

### Configure un esquema y una tabla {#set-up-a-schema-and-table}

Los ejemplos de SQL en esta sección utilizan los siguientes marcadores de posición:

| Marcador de posición               | Descripción                                | Ejemplo                    |
|---------------------------|--------------------------------------------|----------------------------|
| `<USER>`                  | El usuario que crea el esquema y la tabla. | `databricks-user@example.com` |
| `<CATALOG_NAME>`          | El nombre de Unity Catalog.                    | `main`                     |
| `<SCHEMA_NAME>`           | El nombre del esquema.                           | `obs_pipelines`            |
| `<TABLE_NAME>`            | El nombre de la tabla.                            | `apache_common_logs`       |
| `<YOUR_MANAGED_LOCATION>` | (Opcional) El URI de la ubicación administrada.       | `s3://your-bucket/managed` |

**Nota**: Los comandos `GRANT` deben ser ejecutados por un administrador del área de trabajo de Databricks.

En el área de trabajo de Databricks:

1. Si no es administrador del área de trabajo de Databricks, pídale a un administrador que ejecute el siguiente comando para otorgar a su usuario permiso para crear un esquema:
    ```sql
    GRANT CREATE SCHEMA ON CATALOG <CATALOG_NAME> TO <USER>;
    ```

1. Cree el esquema:
    ```sql
    CREATE SCHEMA IF NOT EXISTS <CATALOG_NAME>.<SCHEMA_NAME>
    MANAGED LOCATION '<YOUR_MANAGED_LOCATION>';
    ```
    - **Note**: `MANAGED LOCATION` is optional. See Databricks' [Create Schemas][2] documentation for more information.

1. Si no es un usuario administrador, pídale a un administrador que ejecute el siguiente comando para otorgar a su usuario permiso para crear una tabla en el esquema:
    ```sql
    GRANT CREATE TABLE ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <USER>;
    ```

1. Ejecute el siguiente comando para crear la tabla en la que Observability Pipelines escribe registros:
    ```sql
    CREATE TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> (
      host STRING,
      message STRING,
      service STRING,
      source_type STRING,
      timestamp TIMESTAMP
    );
    ```
    - See Databricks' [Create a Unity Catalog Managed Table][3] documentation for more information.

El nombre de tabla totalmente calificado es `catalog.schema.table`, por ejemplo `main.obs_pipelines.apache_common_logs`. Este es el valor que ingresa para {{< ui >}}Table Name{{< /ui >}} cuando configura el destino de Databricks de Observability Pipelines.

### Configure un servicio principal {#set-up-a-service-principal}

La [API de ingesta de Zerobus][1] de Databricks utiliza autenticación OAuth. Cuando crea el servicio principal, se genera el secreto de cliente OAuth y el ID de cliente OAuth es el UUID del service principal.

Para crear un servicio principal:

1. En su Databricks workspace, navegue a **User Settings** > **Identity and access** > **Service principals**.
1. Haga clic en **Add service principal**.
1. Después de crear el servicio principal, genere un secreto OAuth para él.
    - Tome nota del **Application ID** (ID de cliente) del servicio principal y del secreto de cliente OAuth. Necesita ambos cuando configure el destino Databricks de Observability Pipelines.
1. Ejecute este SQL en Databricks para otorgar al servicio principal acceso al catálogo, al esquema y a la tabla. Reemplace `<SERVICE_PRINCIPAL_UUID>` con el ID de aplicación del servicio principal del paso anterior:
    ```sql
    GRANT USE CATALOG ON CATALOG <CATALOG_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT USE SCHEMA ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT SELECT, MODIFY ON TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    ```

Consulte la documentación de Databricks sobre [Agregar servicio principals a su cuenta][4] y [Otorgar permisos sobre un objeto][5] para obtener más información.

## Configuración {#setup}

<div class="alert alert-danger">Para la administración de secretos: solo ingrese el identificador del secreto de cliente OAuth. <b>No</b> ingrese el valor real.</div>

Configure el destino Databricks (Zerobus) cuando [configure una canalización][6]. Puede configurar una canalización en la [UI][7], utilizando la [API][8] o con [Terraform][9]. Los pasos en esta sección se configuran en la interfaz de usuario.

**Nota**: Los campos de registro que no están presentes en el esquema de la tabla se descartan. Por ejemplo, si un registro tiene los campos `id`, `name` y `host`, y el esquema de la tabla solo contiene las columnas `name` y `host`, entonces el campo `id` se descarta y no se escribe en la tabla.

Después de seleccionar el destino Databricks (Zerobus) en la pipeline UI:

<div class="alert alert-warning">

<ul>
<li>Databricks (Zerobus) no convierte las marcas de tiempo en formato de cadena al <a href="https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type"> de Databricks<code>TIMESTAMP</code> tipo</a>. Si su tabla utiliza una columna de marca de tiempo, consulte <a href="#convert-string-timestamps-to-timestamp-format">Convertir marcas de tiempo de cadena a formato de marca de tiempo</a> para obtener más información.

<li> Los valores de los campos de registro deben coincidir con el tipo de datos de su columna correspondiente en el esquema de la tabla. Consulte <a href="#data-type-of-log-field-values">Tipo de datos de los valores de los campos de registro</a> para obtener más información.
</ul>
</div>

1. Ingrese el {{< ui >}}Ingestion Endpoint{{< /ui >}} para su espacio de trabajo de Databricks, como `https://<workspace_id>.zerobus.<region>.cloud.databricks.com`. El Worker envía registros a este punto de conexión.
1. Ingrese el {{< ui >}}Table Name{{< /ui >}} en el formato `catalog.schema.table`, como `main.obs_pipelines.apache_common_logs`.
1. Ingrese el {{< ui >}}Unity Catalog Endpoint{{< /ui >}} para su espacio de trabajo de Databricks, como `https://<workspace>.cloud.databricks.com`. El Worker utiliza este punto de conexión para leer el esquema de la tabla.
1. En el campo {{< ui >}}Auth - Client ID{{< /ui >}}, ingrese el ID de aplicación de la entidad de servicio, como `abcdefgh-1234-5678-abcd-ef0123456789`.
1. En el campo {{< ui >}}Auth - Client Secret{{< /ui >}}, ingrese el identificador para su secreto de cliente de OAuth. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Convertir marcas de tiempo de cadena a formato de marca de tiempo {#convert-string-timestamps-to-timestamp-format}

Si sus registros tienen marcas de tiempo en formato de cadena y su tabla de Databricks tiene una columna de marca de tiempo declarada como un [tipo `TIMESTAMP`][11], debe convertir la cadena al formato de marca de tiempo antes de enviar los registros al destino de Databricks (Zerobus). Databricks (Zerobus) solo puede convertir el formato de marca de tiempo a su tipo `TIMESTAMP`.

Si no convierte la marca de tiempo de cadena, el Worker arroja un error similar a:

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

Para convertir marcas de tiempo en formato de cadena a formato de marca de tiempo:

1. Agregue un [Procesador personalizado][12] a su canalización.
1. Agregue una función con el siguiente script personalizado:
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][13] for more information.

## Tipo de datos de los valores de los campos de registro {#data-type-of-log-field-values}

Los valores de campo de registro deben coincidir con el tipo de datos de su columna correspondiente en el esquema de la tabla. Por ejemplo, si el esquema de la tabla define `message` como `STRING`, pero el campo `message` de un registro entrante es un objeto, como `{"message": {"some": "string"}}`, el Worker no puede codificar el evento, descarta el lote completo y arroja un error similar a:

```
error=Some(EncodingError { message: "Failed to encode batch: SerializingError(Arrow JSON decoding error: Json error: whilst decoding field 'message': expected string got {...})" }) request_id=1142 error_type="request_failed" stage="sending"
```

Para evitar este error, utilice el [Procesador personalizado][17] para convertir los campos de registro al tipo de datos esperado por el esquema de la tabla.

## Valores predeterminados de secretos {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Administración de secretos" %}}

- Identificador del secreto de cliente de OAuth de Databricks:
    - Hace referencia al secreto de cliente de OAuth para el servicio principal que utiliza el Observability Pipelines Worker para autenticarse en Databricks.
    - El identificador predeterminado es `DESTINATION_DATABRICKS_ZEROBUS_OAUTH_CLIENT_SECRET`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas de estado {#health-metrics}

Para [métricas de componentes][14] y [métricas de búfer de destino][15] emitidas por todos los destinos, consulte la documentación de [Métricas de uso de Pipelines][16]. Para filtrar o agrupar por métricas de destino de Databricks, utilice la etiqueta `component_type:databricks_zerobus`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Destinations event batching][10] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 10                | 1                   |

[1]: https://docs.databricks.com/aws/en/ingestion/zerobus-overview
[2]: https://docs.databricks.com/aws/en/schemas/create-schema
[3]: https://docs.databricks.com/aws/en/tables/managed#create-a-managed-table
[4]: https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals#-add-service-principals-to-your-account
[5]: https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/?language=Catalog%C2%A0Explorer#-grant-permissions-on-an-object
[6]: /es/observability_pipelines/configuration/set_up_pipelines/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /es/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /es/observability_pipelines/destinations/#event-batching
[11]: https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type
[12]: /es/observability_pipelines/processors/custom_processor#setup
[13]: /es/observability_pipelines/processors/custom_processor/#parse_timestamp
[14]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[15]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[16]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[17]: /es/observability_pipelines/processors/custom_processor/