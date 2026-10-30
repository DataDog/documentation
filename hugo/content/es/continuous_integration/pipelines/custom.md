---
aliases:
- /es/continuous_integration/setup_pipelines/custom
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explore los resultados de la ejecución del pipeline y su rendimiento
- link: /continuous_integration/guides/pipeline_data_model
  tag: Documentación
  text: Obtenga información sobre el modelo de datos de pipeline y los tipos de ejecución
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
title: Envíe Pipelines personalizados a Datadog.
---
## Descripción general {#overview}

Si su proveedor de CI no es compatible, puede enviar Pipelines personalizados a través de HTTP utilizando el [punto de conexión de la API pública][1]. Para obtener más información sobre cómo se modelan las ejecuciones de Pipeline, consulte [Modelo de datos de Pipeline y tipos de ejecución][2].

### Compatibilidad {#compatibility}

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Análisis de registros][21] | Análisis de registros | Utiliza modelos LLM en los registros relevantes para analizar la causa raíz de los trabajos de CI fallidos. |
| Correlación de registros | Correlación de registros | Correlacione los tramos de pipeline y de trabajo con los registros. Requiere [almacenamiento de logs](#logs-storage). |
| [Pipelines en ejecución][15] | Pipelines en ejecución | Visualice las ejecuciones de Pipelines que se están ejecutando. |
| [Etiquetas personalizadas][5] [y medidas en tiempo de ejecución][6] | Etiquetas y medidas personalizadas en tiempo de ejecución | Configure [etiquetas y medidas personalizadas][7] en tiempo de ejecución. |
| [Pasos manuales][8] | Pasos manuales | Consulte los Pipelines activados manualmente. |
| [Parámetros][9] | Parámetros | Configure parámetros personalizados cuando se active un Pipeline. |
| [Reintentos parciales][10] | Pipelines parciales | Visualice las ejecuciones de Pipelines reintentadas parcialmente. |
| [Motivos de falla de Pipeline][11] | Motivos de falla de Pipeline | Identifique los motivos de falla de Pipeline a partir de los mensajes de error. |
| [Tiempo de cola][12] | Tiempo de cola | Consulte la cantidad de tiempo que los trabajos de Pipeline permanecen en la cola antes de procesarse. |
| [Filtrar trabajos de CI en la ruta crítica][16] | Filtrar trabajos de CI en la ruta crítica | Filtre por trabajos en la ruta crítica. |
| [Tiempo de ejecución][17] | Tiempo de ejecución  | Consulte la cantidad de tiempo que los Pipelines han estado ejecutando trabajos. |


## Configure CI Visibility {#configure-ci-visibility}

Para enviar eventos de Pipeline mediante programación a Datadog, asegúrese de que su [`DD_API_KEY`][14] esté configurado.

1. Configure los encabezados de su solicitud HTTP:

   - `DD-API-KEY`: Su [clave de API de Datadog][14].
   - `Content-Type`: `application/json`.

2. Prepare el cuerpo de la carga útil ingresando información sobre la [ejecución del Pipeline][2] en un comando cURL:

   | Nombre del parámetro | Descripción | Valor de ejemplo |
   |---|---|---|
   | ID único | El UUID de la ejecución de Pipeline. El ID debe ser único entre reintentos y Pipelines, incluyendo reintentos parciales. | `b3262537-a573-44eb-b777-4c0f37912b05` |
   | Name | El nombre del Pipeline. Todas las ejecuciones de Pipeline para las compilaciones deben tener el mismo nombre. | `Documentation Build` |
   | Git Repository | La URL del repositorio Git que activó el Pipeline. | `https://github.com/Datadog/documentation` |
   | Commit Author | El correo electrónico del autor de la confirmación que activó el Pipeline. | `contributor@github.com` |
   | Commit SHA | El hash de confirmación que activó el Pipeline. | `cf852e17dea14008ac83036430843a1c` |
   | Status | El estado final del Pipeline. Valores de enumeración permitidos: `success`, `error`, `canceled`, `skipped`, `blocked` o `running`. | `success` |
   | Reintento parcial | Indica si el Pipeline fue un reintento parcial de un intento anterior. Este campo espera un valor booleano (`true` o `false`). Un reintento parcial es aquel que solo ejecuta un subconjunto de los trabajos originales. | `false` |
   | Inicio | Hora en la que comenzó la ejecución del Pipeline (no debe incluir ningún [Tiempo de cola][12]). El formato de hora debe ser RFC3339. | `2024-08-22T11:36:29-07:00` |
   | Fin | Hora en la que finalizó la ejecución del Pipeline. El formato de hora debe ser RFC3339. La hora de finalización no puede ser superior a 1 año después de la hora de inicio. | `2024-08-22T14:36:00-07:00` |
   | URL | La URL para ver el Pipeline en la interfaz de usuario del proveedor de CI. | `http://your-ci-provider.com/pipeline/{pipeline-id}` |

   Por ejemplo, esta carga útil envía un evento de Pipeline de CI a Datadog:

   {{< code-block lang="bash" >}}
   curl -X POST "https://api.datadoghq.com/api/v2/ci/pipeline" \
   -H "Content-Type: application/json" \
   -H "DD-API-KEY: <YOUR_API_KEY>" \
   -d @- << EOF
   {
     "data": {
       "attributes": {
         "provider_name": "<YOUR_CI_PROVIDER>",
         "resource": {
           "level": "pipeline",
           "unique_id": "b3262537-a573-44eb-b777-4c0f37912b05",
           "name": "Documentation Build",
           "git": {
             "repository_url": "https://github.com/Datadog/documentation",
             "author_email": "contributor@github.com",
             "sha": "cf852e17dea14008ac83036430843a1c"
           },
           "status": "success",
           "start": "2024-08-22T11:36:29-07:00",
           "end": "2024-08-22T14:36:00-07:00",
           "partial_retry": false,
           "url": ""
         }
       },
       "type": "cipipeline_resource_request"
     }
   }
   EOF
   {{< /code-block >}}

3. Después de enviar su evento de Pipeline a Datadog, puede integrar tipos de eventos adicionales como `stage`, `job` y `step`. Para obtener más información, consulte el [punto de conexión Send Pipeline Event][1].

## Pipelines en ejecución {#running-pipelines}

Los eventos de Pipeline enviados con el `status` establecido en `running` tienen el mismo `unique_id` que el evento de Pipeline final. Los Pipelines en ejecución se pueden actualizar agregando más información mientras aún están en ejecución. Un Pipeline en ejecución consta de los siguientes eventos:

1. El evento de Pipeline en ejecución inicial con el `status` establecido en `running`.
2. Opcionalmente, `N` eventos de Pipeline en ejecución que actualizan el Pipeline con más información, con el mismo `unique_id` y el `status` establecido en `running`.
3. El evento final de Pipeline **sin** un estado `running` y con el mismo `unique_id`.

**Nota**: Es posible que el valor más reciente no siempre sea el que se muestra en la interfaz de usuario cuando se actualiza un campo. Por ejemplo, si la etiqueta `my_tag` se establece en `value1` en el primer Pipeline en ejecución, y luego se actualiza a `value2`, es posible que vea `value1` en lugar de `value2` en la interfaz de usuario. Se recomienda actualizar los Pipelines en ejecución solo agregando más campos en lugar de modificar los existentes.

## Trabajos en ejecución {#running-jobs}

Los eventos de trabajo también se pueden enviar mientras un trabajo aún se está ejecutando configurando `status` en `running`. Al igual que con los Pipelines en ejecución, todos los eventos para el mismo trabajo comparten el mismo `id` y `pipeline_unique_id`. Un trabajo en ejecución consta de los siguientes eventos:

1. El evento inicial de trabajo en ejecución con `status` configurado en `running`.
2. El evento final de trabajo con un estado terminal (como `success` o `error`) y el mismo `id` y `pipeline_unique_id`.

Un evento de trabajo en ejecución no requiere un tiempo de `end`. El tiempo de `end` se establece cuando se envía el evento final de trabajo.

## Administrar registros de trabajo {#manage-job-logs}

### Análisis de registros {#logs-analysis}

El Análisis de registros utiliza modelos LLM para clasificar las fallas de los trabajos por causa raíz basándose en los registros relevantes provenientes de su proveedor de CI.
Para obtener una explicación completa, consulte la [guía de Análisis de registros][21].

El Análisis de registros está habilitado de forma predeterminada en Datadog, pero requiere que se configure el reenvío de registros de trabajo, como se describe a continuación. En
[Configuración del repositorio de optimización de CI/CD][22], puede habilitar o deshabilitar el Análisis de registros para su organización o
repositorios individuales.

Envíe líneas de registro para un trabajo de CI personalizado a la [API de ingesta de registros de trabajos de CI][19]. Utilice identificadores que coincidan con el Pipeline y
los eventos de trabajo que envíe a través de la [API de Pipelines de CI Visibility][1]. Cada objeto de registro tiene tres campos obligatorios:

- `message`: El texto no vacío de la línea de registro.
- `pipeline_unique_id`: Debe coincidir con el `resource.unique_id` del evento de Pipeline y el del evento de trabajo
  `resource.pipeline_unique_id`.
- `job_id`: Debe coincidir con el `resource.id` del evento de trabajo.

Todos los demás campos de registro son opcionales. Si se proporciona, `provider_name` debe coincidir con el `provider_name` del evento de Pipeline.
Datadog utiliza `custom` cuando el campo se omite tanto del evento de Pipeline como de las líneas de registro.

Envíe líneas de registro en lotes mientras se ejecuta el trabajo, o envíe los lotes cuando este finalice. Datadog recomienda enviar
todos los lotes antes de enviar el evento de trabajo completado. Después de enviar ese evento, Datadog cierra el registro del trabajo después de
20 segundos sin una nueva línea. Las líneas recibidas después de que se cierre pueden no aparecer en la pestaña Logs del trabajo.

La siguiente solicitud envía una línea de registro para un trabajo. Este ejemplo utiliza el sitio US1; reemplace `datadoghq.com` con su
sitio de Datadog si es necesario.

{{< code-block lang="bash" >}}
curl -X POST "https://http-intake.logs.datadoghq.com/api/v2/cilogs" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-d @- << EOF
{
  "message": "Running go test ./...",
  "pipeline_unique_id": "b3262537-a573-44eb-b777-4c0f37912b05",
  "job_id": "job-456",
  "provider_name": "<YOUR_CI_PROVIDER>"
}
EOF
{{< /code-block >}}

Una solicitud puede contener un objeto de registro o una matriz de hasta 1,000 objetos de registro, con un cuerpo sin comprimir de hasta 5.1 MiB.
Para obtener información sobre compresión, orientación sobre reintentos, atributos opcionales y límites por trabajo, consulte la [referencia de la API de envío de registros de trabajos de CI][19].

### Almacenamiento de logs {#logs-storage}

Después de configurar la entrega de registros de trabajo como se describe en [Análisis de registros](#logs-analysis), vaya a
[Configuración del repositorio de optimización de CI/CD][22] y habilite Logs Storage para su organización o repositorios individuales.
Los registros almacenados aparecen en la pestaña {{< ui >}}Logs{{< /ui >}} del trabajo.

El Almacenamiento de registros se factura por separado de CI Visibility. Configure la retención de registros, los filtros de exclusión y los índices en
[Log Management][20].

## Visualice datos de Pipelines en Datadog {#visualize-pipeline-data-in-datadog}

Las páginas [**CI Pipeline List**][3] y [**Executions**][4] se completan con datos después de que los pipelines son aceptados para su procesamiento.

La página **CI Pipeline List** muestra datos solo para la rama predeterminada de cada repositorio. Para obtener más información, consulte [Buscar y administrar CI Pipelines][13].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/ci-visibility-pipelines/#send-pipeline-event
[2]: /es/continuous_integration/guides/pipeline_data_model/
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /es/glossary/#custom-tag
[6]: /es/glossary/#custom-measure
[7]: /es/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /es/glossary/#manual-step
[9]: /es/glossary/#parameter
[10]: /es/glossary/#partial-retry
[11]: /es/glossary/#pipeline-failure
[12]: /es/glossary/#queue-time
[13]: /es/continuous_integration/search/#search-for-pipelines
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: /es/glossary/#running-pipeline
[16]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[17]: /es/glossary/#pipeline-execution-time
[19]: /es/api/latest/ci-visibility-logs/send-ci-job-logs/
[20]: /es/logs/
[21]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/
[22]: https://app.datadoghq.com/ci/settings/ci-cd/repositories