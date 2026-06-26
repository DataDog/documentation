---
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Databricks (Zerobus)
---
{{< product-availability >}}

{{< callout url="#"
 btn_hidden="true" header="¡Únase a la versión preliminar!">}}
El destino de Databricks (Zerobus) está en versión preliminar. Contacte a su gerente de cuenta para solicitar acceso.
{{< /callout >}}

## Resumen {#overview}

Utiliza el destino de Databricks (Zerobus) de Observability Pipelines para enviar registros a una tabla de Unity Catalog de Databricks. El destino transmite registros a la [API de Ingesta de Zerobus][1] y se autentica en Databricks con un principal de servicio OAuth.

## Requisitos previos {#prerequisites}

Antes de configurar el destino de Databricks (Zerobus), debe:

- [Configurar un esquema y una tabla de Unity Catalog ](#set-up-a-schema-and-table) a la que Observability Pipelines Worker escriba registros.
- [Configurar un principal de servicio ](#set-up-a-service-principal) que el Observability Pipelines Worker utiliza para autenticarse en Databricks. El principal de servicio necesita permiso para leer y escribir en la tabla.

### Configurar un esquema y una tabla {#set-up-a-schema-and-table}

Los ejemplos de SQL en esta sección utilizan los siguientes marcadores de posición:

| Marcador de posición               | Descripción                                | Ejemplo                    |
|---------------------------|--------------------------------------------|----------------------------|
| `<USER>`                  | El usuario que crea el esquema y la tabla. | `databricks-user@example.com` |
| `<CATALOG_NAME>`          | El nombre de Unity Catalog.                    | `main`                     |
| `<SCHEMA_NAME>`           | El nombre del esquema.                           | `obs_pipelines`            |
| `<TABLE_NAME>`            | El nombre de la tabla.                            | `apache_common_logs`       |
| `<YOUR_MANAGED_LOCATION>` | (Opcional) La URI de ubicación administrada.       | `s3://your-bucket/managed` |

**Nota**: Los comandos `GRANT` deben ser ejecutados por un administrador del espacio de trabajo de Databricks.

En el espacio de trabajo de Databricks:

1. Si no es un administrador del espacio de trabajo de Databricks, pida a un administrador que ejecute el siguiente comando para otorgarle a su usuario permiso para crear un esquema:
    ```sql
    GRANT CREATE SCHEMA ON CATALOG <CATALOG_NAME> TO <USER>;
    ```

1. Cree el esquema:
    ```sql
    CREATE SCHEMA IF NOT EXISTS <CATALOG_NAME>.<SCHEMA_NAME>
    MANAGED LOCATION '<YOUR_MANAGED_LOCATION>';
    ```
    - **Note**: `MANAGED LOCATION` is optional. See Databricks' [Create Schemas][2] documentation for more information.

1. Si no es un usuario administrador, pida a un administrador que ejecute el siguiente comando para otorgarle a su usuario permiso para crear una tabla en el esquema:
    ```sql
    GRANT CREATE TABLE ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <USER>;
    ```

1. Ejecute el siguiente comando para crear la tabla a la que Observability Pipelines escribe datos de registro:
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

El nombre de la tabla completamente calificado es `catalog.schema.table`, por ejemplo `main.obs_pipelines.apache_common_logs`. Este es el valor que ingresa para **Nombre de la Tabla** cuando configura el destino de Observability Pipelines de Databricks.

### Configure un principal de servicio {#set-up-a-service-principal}

La API de Ingesta de Zerobus de Databricks utiliza autenticación OAuth. Cuando crea el principal de servicio, se genera el secreto del cliente OAuth y el ID del cliente OAuth es el UUID del principal de servicio.

Para crear un principal de servicio:

1. En su espacio de trabajo de Databricks, navegue a **Configuración de usuario** > **Identidad y acceso** > **Principal de servicio**.
1. Haga clic en **Agregar principal de servicio**.
1. Después de que se crea el principal de servicio, genere un secreto OAuth para él.
    - Toma nota del **ID de aplicación** (ID de cliente) del principal de servicio y del secreto del cliente OAuth. Necesita ambos cuando configura el destino de Observability Pipelines de Databricks.
1. Ejecute este SQL en Databricks para otorgar al principal de servicio acceso al catálogo, esquema y tabla. Reemplace `<SERVICE_PRINCIPAL_UUID>` con el ID de aplicación del principal de servicio del paso anterior:
    ```sql
    GRANT USE CATALOG ON CATALOG <CATALOG_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT USE SCHEMA ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT SELECT, MODIFY ON TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    ```

Consulta la documentación de Databricks sobre [Agregar principal de servicio a tu cuenta][4] y [Otorgar permisos en un objeto][5] para más información.

## Configuración {#setup}

Configure el destino de Databricks (Zerobus) cuando [configure un pipeline][6]. Puedes configurar un pipeline en la [interfaz de usuario][7], usando la [API][8], o con [Terraform][9]. Los pasos en esta sección están configurados en la interfaz de usuario.

**Nota**: Los campos de registro que no están presentes en el esquema de la tabla son descartados. Por ejemplo, si un registro tiene los campos `id`, `name` y `host`, y el esquema de la tabla solo contiene las columnas `name` y `host`, entonces el campo `id` es descartado y no se escribe en la tabla.

Después de seleccionar el destino de Databricks (Zerobus) en la interfaz de usuario del pipeline:

<div class="alert alert-warning">Databricks (Zerobus) no convierte las marcas de tiempo en formato de cadena al <a href="https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type"> de Databricks.<code>TIMESTAMP</code> tipo</a>. Si su tabla utiliza una columna de marca de tiempo, consulte <a href="#convert-string-timestamps-to-timestamp-format">Convertir marcas de tiempo de cadena a formato de marca de tiempo</a> para más información.</div>

<div class="alert alert-danger">Para la gestión de secretos: Solo ingrese el identificador del secreto del cliente OAuth. No <b>ingrese</b> el valor real.</div>

{{% observability_pipelines/secrets_env_var_note %}}

1. Ingrese el **Punto de Ingesta** para su espacio de trabajo de Databricks, como `https://<workspace_id>.zerobus.<region>.cloud.databricks.com`. El Observability Pipelines Worker envía registros a este punto de conexión.
1. Ingrese el **Nombre de la Tabla** en el formato `catalog.schema.table`, como `main.obs_pipelines.apache_common_logs`.
1. Ingrese el **Punto de Finalización del Catálogo de Unidad** para su espacio de trabajo de Databricks, como `https://<workspace>.cloud.databricks.com`. El Observability Pipelines Worker utiliza este punto de conexión para leer el esquema de la tabla.
1. En el campo **Auth - ID del Cliente**, ingrese el ID de la aplicación del principal del servicio, como `abcdefgh-1234-5678-abcd-ef0123456789`.
1. En el campo **Auth - Secreto del Cliente**, ingrese el identificador de su secreto del cliente OAuth. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

### Opciones opcionales {#optional-settings}

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

### Convertir marcas de tiempo en formato de cadena a formato de marca de tiempo {#convert-string-timestamps-to-timestamp-format}

Si sus registros tienen marcas de tiempo en formato de cadena y su tabla de Databricks tiene una columna de marca de tiempo declarada como un [`TIMESTAMP` tipo][11], debe convertir la cadena a formato de marca de tiempo antes de enviar registros al destino de Databricks (Zerobus). Databricks (Zerobus) solo puede convertir el formato de marca de tiempo a su `TIMESTAMP` tipo.

Si no convierte la marca de tiempo de cadena, el Observability Pipelines Worker genera un error similar a:

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

Para convertir marcas de tiempo en formato de cadena a formato de marca de tiempo:

1. Agregue un [Custom Processor][12] a su pipeline.
1. Agregue una función con el siguiente script personalizado:
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][13] for more information.

## Valores predeterminados secretos {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador del secreto del cliente OAuth de Databricks:
    - Hace referencia al secreto del cliente OAuth para el principal de servicio que utiliza el Trabajador de Pipelines de Observabilidad para autenticarse en Databricks.
    - El identificador predeterminado es `DESTINATION_DATABRICKS_ZEROBUS_OAUTH_CLIENT_SECRET`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

{{% /tab %}}
{{< /tabs >}}

## Cómo funciona el destino {#how-the-destination-works}

### Agrupamiento de eventos {#event-batching}

Un lote de eventos se envía cuando se cumple uno de estos parámetros. Consulta [agrupamiento de eventos][10] para más información.

| Eventos máximos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
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