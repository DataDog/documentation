---
aliases:
- /es/integración_continua/setup_pipelines/custom
further_reading:
- link: /integración_continua/tuberías
  tag: Documentación
  text: Explorar los resultados y el rendimiento de la ejecución de pipelines
- link: /continuous_integration/guides/pipeline_data_model
  tag: Documentación
  text: Más información sobre el modelo de datos y los tipos de ejecución de pipelines
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Enviar pipelines personalizados a Datadog
---

## Información general

Puedes enviar pipelines personalizados a través de HTTP utilizando el [endpoint de la API pública][1]. Para obtener más información sobre cómo se modelan las ejecuciones de pipelines, consulta [Modelo de datos y tipos de ejecución de pipelines][2].

### Compatibilidad

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Pipelines en ejecución][15] | Pipelines en ejecución | Visualiza las ejecuciones de pipelines en curso. |
| [Etiquetas (tags) personalizadas][5] [y medidas en tiempo de ejecución][6] | Etiquetas personalizadas y medidas en tiempo de ejecución | Configura [etiquetas y medidas personalizadas][7] en tiempo de ejecución. |
| [Pasos manuales][8] | Pasos manuales | Visualiza los pipelines activados manualmente. |
| [Parámetros][9] | Parámetros | Configura parámetros personalizados cuando se activa un pipeline. |
| [Reintentos parciales][10] | Pipelines parciales | Visualiza las ejecuciones de pipelines parcialmente reintentadas. |
| [Razones de fallos de pipelines][11] | Razones de fallos de pipelines | Identifica las razones de fallos de los pipelines a partir de los mensajes de error. |
| [Tiempo de cola][12] | Tiempo de cola | Visualiza la cantidad de tiempo que los trabajos de pipelines permanecen en la cola antes de ser procesados. |

## Configurar CI Visibility

Para enviar eventos de pipeline programáticamente a Datadog, asegúrate de que tu [`DD_API_KEY`][14] está configurada.

1. Define las cabeceras de tu solicitud HTTP:

   - `DD-API-KEY`: Tu [clave de API Datadog][14].
   - `Content-Type`: `application/json`.

2. Prepara el cuerpo de la carga útil introduciendo información sobre la [ejecución del pipeline][2] en un comando cURL:

   | Nombre del parámetro | Descripción | Valor de ejemplo |
   |---|---|---|
   | ID único | UUID de la ejecución del pipeline. El ID tiene que ser único entre reintentos y pipelines, incluyendo reintentos parciales. | `b3262537-a573-44eb-b777-4c0f37912b05` |
   | Nombre | Nombre del pipeline. Todas las ejecuciones del pipeline para las compilaciones deben tener el mismo nombre. | `Documentation Build` |
   | Repositorio Git | URL del repositorio Git que activó el pipeline. | `https://github.com/Datadog/documentation` |
   | Autor del commit | Correo electrónico del autor del commit que activó el pipeline. | `contributor@github.com` |
   | SHA del commit | Hash del commit que activó el pipeline. | `cf852e17dea14008ac83036430843a1c` |
   | Estado | Estado final del pipeline. Valores de enumeración permitidos: `success`, `error`, `canceled`, `skipped`, `blocked` o `running`. | `success` |
   | Reintento parcial | Si el pipeline fue o no un reintento parcial de un intento anterior. Este campo espera un valor booleano (`true` o `false`). Un reintento parcial es aquel que sólo ejecuta un subconjunto de los trabajos originales. | `false` |
   | Inicio | Hora de inicio de la ejecución del pipeline (no debe incluir ningún [tiempo de cola][12]). El formato de hora debe ser RFC3339. | `2024-08-22T11:36:29-07:00` |
   | Finalización | Hora en que finalizó la ejecución del pipeline. El formato de la hora debe ser RFC3339. | `2024-08-22T14:36:00-07:00` |
   | URL | URL para observar el pipeline en la interfaz de usuario del proveedor de CI. | `http://your-ci-provider.com/pipeline/{pipeline-id}` |

   Por ejemplo, esta carga útil envía un evento de pipeline CI a Datadog:

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

3. Después de enviar tu evento de pipeline a Datadog, puedes integrar tipos adicionales de eventos como `stage`, `job` y `step`. Para obtener más información, consulta el [endpoint de envío de eventos de pipeline][1].

## Pipelines en ejecución
Los eventos de pipelines enviados con el `status` configurado en `running` tienen el mismo `unique_id` que el evento de pipeline final. Los pipelines en ejecución pueden actualizarse añadiéndoles más información mientras se ejecutan. Un pipeline en ejecución consta de lo siguiente eventos:

1. El evento de pipeline en ejecución inicial con el `status` configurado en `running`.
2. Opcionalmente, `N` eventos de pipelines en ejecución que actualizan el pipeline con más información, con el mismo `unique_id` y el `status` configurado en `running`.
3. El evento de pipeline final **sin** un estado `running` y el mismo `unique_id`.

**Nota**: El valor más reciente puede no ser siempre el que se muestra en la interfaz de usuario cuando se actualiza un campo. Por ejemplo, si la etiqueta `my_tag` se configura en `value1` en el primer pipeline en ejecución y luego se actualiza a `value2`, es posible que veas `value1` en lugar de `value2` en la interfaz de usuario. Se recomienda sólo actualizar los pipelines en ejecución añadiendo más campos en lugar de modificar los existentes.

## Ver datos de pipelines en Datadog

Las páginas [**Lista de pipelines CI**][3] y [**Ejecuciones**][4] se rellenan con datos después de que los pipelines son aceptados para su procesamiento.

La página **Lista de pipelines CI** muestra datos sólo para la rama por defecto de cada repositorio. Para obtener más información, consulte [Buscar y gestionar pipelines CI][13].

## Referencias adicionales

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