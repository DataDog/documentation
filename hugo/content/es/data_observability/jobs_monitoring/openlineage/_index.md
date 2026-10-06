---
description: Haga un seguimiento de trabajos de herramientas internas, canalizaciones
  personalizadas y orquestadores que no cuentan con integraciones nativas de Datadog.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Descripción general de Data Observability
- link: /data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
  tag: Documentación
  text: Configure el Datadog Agent para el proxy de OpenLineage
title: Trabajos personalizados mediante OpenLineage
---
<div class="alert alert-info"> Los trabajos personalizados mediante OpenLineage están en versión preliminar.</div>

## Descripción general {#overview}

Los trabajos personalizados utilizan el estándar [OpenLineage][1] para enviar eventos de trabajo y de linaje a Datadog. Con los trabajos personalizados, usted puede:

- Detectar trabajos con errores o de larga duración
- Identificar y resolver la causa raíz de trabajos con errores o de larga duración
- Comprender las dependencias ascendentes y los consumidores de datos descendentes con el linaje de datos

Utilice trabajos personalizados cuando necesite:

- Capturar linaje de sistemas con los que Datadog no se integra de forma nativa, como herramientas internas o scripts de ETL personalizados
- Emitir eventos de linaje para trabajos u orquestadores donde no hay disponible una integración nativa de Datadog

**Nota**: Para centralizar la configuración y evitar distribuir claves de API a cada aplicación, puede [configurar el Datadog Agent como un proxy de OpenLineage][4].

## Requisitos previos {#prerequisites}

- Una clave de API de Datadog. Consulte [Claves de API y de aplicación][6].
- Su [site URL][3] de Datadog. Los ejemplos en esta página utilizan `datadoghq.com`; reemplace el nombre de host con el punto de conexión de ingesta para su sitio.

## Paso 1: Envíe un evento `START` {#step-1-send-a-start-event}

Utilice una de las siguientes opciones para enviar [eventos de OpenLineage][1] a Datadog:

**Nota**: Datadog requiere el `jobType` [Job Facet][5] para procesar eventos de ejecución.

Para ver también los bordes de linaje entre su trabajo y sus conjuntos de datos, incluya `inputs` y `outputs` en su evento. Los espacios de nombres de los conjuntos de datos deben coincidir con el formato que Datadog espera para cada plataforma. Consulte [Convenciones de nomenclatura de conjuntos de datos](#dataset-naming-conventions).

{{< tabs >}}
{{% tab "HTTP directo con curl" %}}

Envíe un [OpenLineage RunEvent](https://openlineage.io/docs/spec/run-cycle/) sin procesar como JSON al punto de conexión de ingesta de Datadog.

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:00:00Z",
        "eventType": "START",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "inputs": [
          {
            "namespace": "postgres://demo-db.example.com:5432",
            "name": "orders.public.orders"
          }
        ],
        "outputs": [
          {
            "namespace": "snowflake://myorg-myaccount",
            "name": "ANALYTICS.PUBLIC.ORDERS"
          }
        ],
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "Cliente de Python de OpenLineage (transporte HTTP)" %}}

Utilice el [cliente de Python de OpenLineage](https://openlineage.io/docs/client/python) con un transporte HTTP especificado manualmente.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient, OpenLineageClientOptions
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run, InputDataset, OutputDataset
from openlineage.client.facet_v2 import job_type_job

client = OpenLineageClient(
    url="https://data-obs-intake.datadoghq.com",
    options=OpenLineageClientOptions(api_key="<DD_API_KEY>")
)

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    inputs=[
        InputDataset(
            namespace="postgres://demo-db.example.com:5432",
            name="orders.public.orders"
        )
    ],
    outputs=[
        OutputDataset(
            namespace="snowflake://myorg-myaccount",
            name="ANALYTICS.PUBLIC.ORDERS"
        )
    ],
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(event)
```

{{% /tab %}}

{{% tab "Cliente de Python de OpenLineage (transporte de Datadog)" %}}

En OpenLineage 1.37.0+, utilice el [Datadog transport](https://openlineage.io/docs/client/python#datadog-transport) para la configuración automática y la entrega optimizada de eventos.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run, InputDataset, OutputDataset
from openlineage.client.facet_v2 import job_type_job
from openlineage.client.transport.datadog import DatadogConfig, DatadogTransport

config = DatadogConfig(
    apiKey="<DD_API_KEY>",
    site="datadoghq.com"  # Change if using a different Datadog site
)

client = OpenLineageClient(transport=DatadogTransport(config))

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    inputs=[
        InputDataset(
            namespace="postgres://demo-db.example.com:5432",
            name="orders.public.orders"
        )
    ],
    outputs=[
        OutputDataset(
            namespace="snowflake://myorg-myaccount",
            name="ANALYTICS.PUBLIC.ORDERS"
        )
    ],
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(event)
```

También puede configurar el Datadog transport con variables de entorno en lugar de `DatadogConfig`:

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_SITE=datadoghq.com
export OPENLINEAGE__TRANSPORT__TYPE=datadog
```

```python
client = OpenLineageClient.from_environment()
```

{{% /tab %}}
{{< /tabs >}}

## Paso 2: Envíe un evento `RUNNING` (opcional) {#step-2-send-a-running-event-optional}

**Nota**: Este paso es opcional. Los eventos `RUNNING` le permiten ver el estado de un trabajo antes de que finalice. Si solo necesita capturar el estado de finalización del trabajo, pase al [Paso 3](#step-3-send-a-complete-or-fail-event).

Mientras el trabajo esté en curso, envíe un evento `RUNNING` para rastrearlo en Jobs Monitoring de Datadog. Utilice el mismo `runId` del evento `START`.

{{< tabs >}}
{{% tab "HTTP directo con curl" %}}

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:02:00Z",
        "eventType": "RUNNING",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "Cliente de Python de OpenLineage (transporte HTTP)" %}}

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

running_event = RunEvent(
    eventType=RunState.RUNNING,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(running_event)
```

{{% /tab %}}

{{% tab "Cliente de Python de OpenLineage (transporte de Datadog)" %}}

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

running_event = RunEvent(
    eventType=RunState.RUNNING,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(running_event)
```

{{% /tab %}}
{{< /tabs >}}

## Paso 3: Envíe un evento `COMPLETE` o `FAIL` {#step-3-send-a-complete-or-fail-event}

Cuando el trabajo finalice, envíe un evento `COMPLETE` o `FAIL` utilizando el mismo `runId` del evento `START`.

{{< tabs >}}
{{% tab "HTTP directo con curl" %}}

**Éxito**

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:05:00Z",
        "eventType": "COMPLETE",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

**Fallo**

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:05:00Z",
        "eventType": "FAIL",
        "run": {
          "runId": "<RUN_UUID>",
          "facets": {
            "errorMessage": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/1-0-1/ErrorMessageRunFacet.json",
              "message": "Job failed: division by zero",
              "programmingLanguage": "Python",
              "stackTrace": "Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            }
          }
        },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "Cliente de Python de OpenLineage (transporte HTTP)" %}}

**Éxito**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run

complete_event = RunEvent(
    eventType=RunState.COMPLETE,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(complete_event)
```

**Fallo**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import error_message_run

fail_event = RunEvent(
    eventType=RunState.FAIL,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(
        runId="<RUN_UUID>",  # same runId as START
        facets={
            "errorMessage": error_message_run.ErrorMessageRunFacet(
                message="Job failed: division by zero",
                programmingLanguage="Python",
                stackTrace="Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            )
        }
    ),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(fail_event)
```

{{% /tab %}}

{{% tab "Cliente de Python de OpenLineage (transporte de Datadog)" %}}

**Éxito**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

complete_event = RunEvent(
    eventType=RunState.COMPLETE,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(complete_event)
```

**Fallo**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job, error_message_run

fail_event = RunEvent(
    eventType=RunState.FAIL,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(
        runId="<RUN_UUID>",  # same runId as START
        facets={
            "errorMessage": error_message_run.ErrorMessageRunFacet(
                message="Job failed: division by zero",
                programmingLanguage="Python",
                stackTrace="Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            )
        }
    ),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(fail_event)
```

{{% /tab %}}
{{< /tabs >}}

## Paso 4: Verifique en Datadog {#step-4-verify-in-datadog}

Después de enviar sus eventos, utilice las siguientes páginas para verificar que Datadog los recibió y procesó:

- [**Jobs Overview**][7]: Confirme que la ejecución de su trabajo aparece con su hora de inicio, duración y estado.
- [**Lineage**][9]: Busque el nombre de su trabajo para ver el trabajo y sus conexiones con cualquier conjunto de datos incluido en el evento.
- [**OpenLineage events**][12]: Verifique el estado de validación de sus eventos: `Ok`, `Warning` o `Error`. Seleccione un evento para ver la carga útil exacta que recibió Datadog, o filtre por estado de validación para solucionar problemas de eventos que no se procesaron correctamente. Comience aquí si los resultados no aparecen como se esperaba en las otras dos vistas.

## Correlacionar registros con ejecuciones de trabajos {#correlate-logs-with-job-runs}

Para correlacionar los registros de su aplicación con una ejecución de trabajo en Datadog, emita sus registros con el ID de ejecución de OpenLineage en el atributo `@openlineage.run_id`. Establezca su valor en el mismo `runId` que envía en sus eventos de ejecución de OpenLineage. Datadog utiliza este atributo para asociar los registros con la ejecución de trabajo correspondiente.

La forma en que adjunta el ID de ejecución depende de su configuración de registro. Para obtener detalles sobre cómo enviar registros con atributos personalizados a Datadog, consulte [Log Collection and Integrations][10].

## Convenciones de nomenclatura de conjuntos de datos {#dataset-naming-conventions}

Para conectar el linaje de su trabajo personalizado con conjuntos de datos ya rastreados por las Integrations nativas de Datadog, incluya `inputs` y `outputs` en su evento utilizando el `namespace` y `name` exactos que Datadog espera para esa plataforma. Por ejemplo, hacer referencia a una tabla de Snowflake en el `outputs` de su trabajo personalizado con el espacio de nombres y el nombre correctos lo vincula al nodo de conjunto de datos existente en el gráfico de linaje.

Datadog resuelve los conjuntos de datos en una jerarquía de cuenta, base de datos, esquema y tabla. Si un nombre tiene menos partes de las esperadas (por ejemplo, `database.table` en lugar de `database.schema.table`), Datadog recurre al nodo de orden superior más cercano en el gráfico de linaje.

| Plataforma   | Espacio de nombres                                        | Nombre                          |
| ---------- | ------------------------------------------------ | ----------------------------- |
| BigQuery   | `bigquery`                                       | `{project}.{dataset}.{table}` |
| Snowflake  | `snowflake://{org}-{account}`                    | `{database}.{schema}.{table}` |
| Redshift   | `redshift://{aws_account_id}:{region}:{cluster}` | `{database}.{schema}.{table}` |
| PostgreSQL | `postgres://{host}:{port}`                       | `{database}.{schema}.{table}` |
| Databricks | `databricks://{workspace-url}`                   | `{database}.{schema}.{table}` |
| Trino      | `trino://{host}:{port}`                          | `{catalog}.{schema}.{table}`  |
| AWS Glue   | `arn:aws:glue:{region}:{accountId}`              | `{database}.{table}`          |
| S3         | `s3://{bucket}`                                  | `{path}`                      |

Para plataformas que no aparecen aquí, siga las [convenciones de nomenclatura de OpenLineage][8].

El siguiente ejemplo muestra un trabajo que lee de una tabla de PostgreSQL y escribe en una tabla de Snowflake:

```json
"inputs": [
  {
    "namespace": "postgres://db.example.com:5432",
    "name": "mydb.public.raw_orders"
  }
],
"outputs": [
  {
    "namespace": "snowflake://myorg-myaccount",
    "name": "ANALYTICS.PUBLIC.ORDERS"
  }
]
```

**Nota**: Si un espacio de nombres de conjunto de datos no se reconoce, Datadog aún crea un nodo de linaje para él, pero no lo muestra en el producto Data Observability. Utilice un formato de espacio de nombres reconocido para que los conjuntos de datos aparezcan en el catálogo y en el gráfico de linaje.

## Facetas admitidas {#supported-facets}

Las facetas son metadatos estructurados adjuntos a los eventos de OpenLineage. Cada faceta requiere `_producer` (un URI que identifica el sistema que la produjo) y `_schemaURL` (un URI que hace referencia a su esquema JSON).

### `JobTypeJobFacet` {#jobtypejobfacet}

La faceta de trabajo `jobType` es **obligatoria**. Determina cómo Datadog clasifica y muestra el trabajo.

#### `integration` valores {#integration-values}

Para trabajos ejecutados en una tecnología que aún no es compatible con una integración nativa, utilice cualquier valor que no esté reservado para una integración nativa (por ejemplo, `my-pipeline`). Este valor se utiliza en todo Datadog para indicar el tipo de trabajo. Los valores reservados a continuación son utilizados por las integraciones nativas de Datadog. El uso de un valor reservado para un trabajo personalizado puede producir un comportamiento inesperado y no es compatible.

| Valor          | Plataforma                                                            |
| -------------- | -------------------------------------------------------------------- |
| `<YOUR_VALUE>` | Plataformas personalizadas o no compatibles                                     |
| `SPARK`        | Apache Spark (solo integración nativa; no utilizar para trabajos personalizados) |
| `AIRFLOW`      | Apache Airflow                                                      |
| `DBT`          | dbt                                                                 |
| `BIGQUERY`     | Google BigQuery                                                     |
| `SNOWFLAKE`    | Snowflake                                                           |
| `TRINO`        | Trino                                                                |
| `ICEBERG`      | Apache Iceberg                                                      |
| `TABLEAU`      | Tableau                                                             |

#### `processingType` valores {#processingtype-values}

`BATCH` o `STREAMING`.

#### `jobType` valores {#jobtype-values}

Los valores comunes incluyen `JOB`, `TASK`, `DAG`, `MODEL`, `COMMAND` y `QUERY`.

**Nota**: Si `jobType` se establece en `QUERY`, Datadog no genera nodos de linaje para el trabajo.

### Otras facetas admitidas {#other-supported-facets}

| Faceta          | Lo que hace Datadog                                                                  |
| -------------- | ---------------------------------------------------------------------------------- |
| `parent`       | Crea una jerarquía de trabajos padre-hijo en el gráfico de linaje                            |
| `errorMessage` | Genera intervalos de error con las etiquetas `error.message` y `error.stack`                  |
| `tags`         | Agrega etiquetas personalizadas al trabajo o ejecución; el valor `_dd.ol_service` se asigna al nombre del servicio de Datadog |
| `sql`          | Analiza y enmascara la consulta SQL; genera eventos de consulta                             |

**Nota**: Cada etiqueta en la [faceta `tags`][2] debe incluir un `key`, un `value` y un `source`.

Para que las etiquetas personalizadas de OpenLineage estén disponibles en los monitores de trabajos de datos, establezca `source` exactamente en `USER`. Las etiquetas con un `source` faltante o diferente no están disponibles en los monitores de trabajos de datos como etiquetas personalizadas.

Las etiquetas en `job.facets.tags` y `run.facets.tags` se comportan de manera diferente:

- **Etiquetas de faceta de trabajo**: se agregan como etiquetas a los rastros de trabajo subyacentes, lo que le permite filtrarlas en la página de descripción general de trabajos y en [Trace Explorer][11]. Cuando `source` es `USER`, también están disponibles en los monitores de trabajos de datos. Utilice etiquetas de faceta de trabajo para propiedades de trabajo estables, como `team` o `owner`.
- **Etiquetas de faceta de ejecución**: disponibles en los monitores de trabajos de datos cuando `source` es `USER`. No se agregan como etiquetas individuales para buscar y filtrar en la página de descripción general de trabajos o en [Trace Explorer][11]. Utilice etiquetas de faceta de ejecución para valores que pueden variar entre ejecuciones.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/docs/spec/run-cycle/
[2]: https://openlineage.io/spec/facets/1-0-0/TagsRunFacet.json
[3]: /es/getting_started/site/#access-the-datadog-site
[4]: /es/data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
[5]: https://openlineage.io/docs/spec/facets/job-facets/job-type/
[6]: /es/account_management/api-app-keys/
[7]: https://app.datadoghq.com/data-jobs
[8]: https://openlineage.io/docs/spec/naming/
[9]: https://app.datadoghq.com/data-obs/lineage
[10]: /es/logs/log_collection/
[11]: /es/tracing/trace_explorer/?tab=listview
[12]: https://app.datadoghq.com/data-obs/settings/open-lineage