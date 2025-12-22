---
aliases:
- /es/continuous_integration/setup_pipelines/buildkite
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explorar los resultados y el rendimiento de la ejecución de pipelines
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentación
  text: Ampliar la visibilidad de los pipelines mediante la adición de etiquetas (tags)
    y medidas personalizadas
title: Configuración de Buildkite para CI Visibility
---

## Información general

[Buildkite][1] es una plataforma de integración y despliegue continuos que te permite ejecutar compilaciones en tu propia infraestructura, lo que te da la habilidad de tener un control total sobre la seguridad y personalizar tu entorno de compilación mientras gestionas la orquestación en la nube.

Configura CI Visibility para que Buildkite optimice el uso de tus recursos, reduzca los gastos generales y mejore la velocidad y la calidad de tu ciclo de vida de desarrollo de software.

### Compatibilidad

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Reintentos parciales][9] | Pipelines parciales | Observa los reintentos parciales de ejecuciones de pipelines. |
| Correlación de métricas de infraestructura  | Correlación de métricas de infraestructura  | Correlaciona los trabajos con las [métricas del host de la infraestructura][6] para los agentes de Buildkite. |
| [Pasos manuales][12] | Pasos manuales | Visualiza los pipelines activados manualmente. |
| [Tiempo de cola][13] | Tiempo de cola | Observa la cantidad de tiempo que los trabajos de pipelines permanecen en la cola antes de ser procesados. |
| [Etiquetas][10] [y medidas personalizadas en tiempo de ejecución][11] | Etiquetas y medidas personalizadas en tiempo de ejecución | Configura [etiquetas y medidas personalizadas][6] en tiempo de ejecución. |
| [Tramos (spans) personalizados][14] | Tramos personalizados | Configura tramos personalizados para tus pipelines. |
| [Filtrar trabajos de CI en la ruta crítica][17] | Filtrar trabajos de CI en la ruta crítica | Filtra por trabajos en la ruta crítica. |
| [Tiempo de ejecución][18] | Tiempo de ejecución  | Ver la cantidad de tiempo que los pipelines han estado ejecutando trabajos. |

### Terminología

Esta tabla muestra la correspondencia de conceptos entre Datadog CI Visibility y Buildkite:

| Datadog                    | Buildkite                       |
|----------------------------|---------------------------------|
| Tuberías                   | Compilación (ejecución de un pipeline) |
| Trabajo                        | Trabajo (ejecución de un paso)       |

## Configurar la integración Datadog

Para configurar la integración de Datadog para [Buildkite][1]:

1. Ve a **Settings > Notification Services** (Configuración > Servicios de notificación) en Buildkite y haz clic en el botón **Add** (Añadir) junto a **Datadog Pipeline Visibility** (Visibilidad de los pipelines de Datadog).
2. Rellena el formulario con la siguiente información:
   * **Description** (Descripción): una descripción para ayudar a identificar la integración en el futuro, como `Datadog CI Visibility integration`.
   * **API key** (Clave de API): la [clave de la API de Datadog][2].
   * **Datadog site** (Sitio de Datadog): `{{< region-param key="dd_site" code="true" >}}`
   * **Pipelines**: selecciona todos los pipelines o el subconjunto de pipelines que deseas rastrear.
   * **Branch filtering** (Filtrado de ramas): deja este campo vacío para rastrear todas las ramas o selecciona el subconjunto de ramas que deseas rastrear.
3. Haz clic en **Add Datadog Pipeline Visibility Notification** (Añadir la notificación sobre la visibilidad de los pipelines de Datadog) para guardar la integración.

## Configuración avanzada

### Establecer etiquetas personalizadas

Se pueden añadir etiquetas personalizadas a las trazas (traces) de Buildkite con el comando `buildkite-agent meta-data set`.
Cualquier etiqueta de metadato con una clave que empiece con `dd_tags.` se añade a los tramos del trabajo y el pipeline. Estas
etiquetas pueden utilizarse para crear facetas de cadena destinadas a buscar y organizar los pipelines.

El código YAML de abajo representa un pipeline simple en el que se definieron las etiquetas para el nombre del equipo 
y la versión de Go.

```yaml
steps:
  - command: buildkite-agent meta-data set "dd_tags.team" "backend"
  - command: go version | buildkite-agent meta-data set "dd_tags.go.version"
    label: Go version
  - commands: go test ./...
    label: Run tests
```

Las siguientes etiquetas se muestran en el tramo raíz, así como en el tramo del trabajo correspondiente en Datadog.

- `team: backend`
- `go.version: go version go1.17 darwin/amd64` (la salida depende del ejecutor)

El pipeline resultante tiene el siguiente aspecto:

{{< img src="ci/buildkite-custom-tags.png" alt="La traza de un pipeline de Buildkite con etiquetas personalizadas." style="width:100%;">}}

Cualquier metadato con una clave que empiece por `dd-measures.` y contenga un valor numérico se definirá como
una etiqueta de métrica que puede utilizarse para crear medidas numéricas.

Puedes utilizar el comando `buildkite-agent meta-data set` para crear estas etiquetas.

Por ejemplo, puedes medir el tamaño binario en un pipeline con este comando:

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_measures.binary_size"
    label: Go build
```

El pipeline resultante tendrá las etiquetas que se muestran abajo en el tramo del pipeline:

- `binary_size: 502` (la salida depende del tamaño del archivo)

En este ejemplo, puedes utilizar el valor de `binary_size` para graficar el cambio en el tamaño binario a lo largo del tiempo.

### Correlacionar métricas de infraestructura con trabajos

Si utilizas agentes de Buildkite, puedes correlacionar los trabajos con la infraestructura que los ejecuta.
Para que esta característica funcione, instala el [Datadog Agent][7] en los hosts que ejecutan los agentes de Buildkite.

## Ver los pipelines parciales y descendentes

Puedes utilizar los siguientes filtros para personalizar tu consulta de búsqueda en el [explorador de CI Visibility][15].

{{< img src="ci/partial_retries_search_tags.png" alt="La página de ejecuciones del pipeline con la expresión Partial Pipeline:retry ingresada en la consulta de búsqueda." style="width:100%;">}}

| Nombre de la faceta | ID de la faceta | Valores posibles |
|---|---|---|
| Pipeline descendente | `@ci.pipeline.downstream` | `true`, `false` |
| Activación manual | `@ci.is_manual` | `true`, `false` |
| Pipeline parcial | `@ci.partial_pipeline` | `retry`, `paused`, `resumed` |

También puedes aplicar estos filtros mediante el panel de facetas situado en la parte izquierda de la página.

{{< img src="ci/partial_retries_facet_panel.png" alt="El panel de facetas con la faceta Partial Pipeline expandida y el valor Retry seleccionado, la faceta Partial Retry expandida y el valor true seleccionado." style="width:20%;">}}

## Visualizar los datos de los pipelines en Datadog

Las páginas [**CI Pipeline List**][3] (Lista de pipelines de CI) y [**Executions**][4] (Ejecuciones) se rellenan con datos una vez finalizados los pipelines.

En la página **CI Pipeline List** (Lista de pipelines de CI), se muestran datos solo para la rama predeterminada de cada repositorio. Para obtener más información, consulta [Buscar y gestionar los pipelines de CI][16].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://buildkite.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /es/continuous_integration/pipelines/buildkite/#view-partial-and-downstream-pipelines
[6]: /es/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[7]: /es/agent/
[8]: /es/continuous_integration/pipelines/buildkite/#correlate-infrastructure-metrics-to-jobs
[9]: /es/glossary/#partial-retry
[10]: /es/glossary/#custom-tag
[11]: /es/glossary/#custom-measure
[12]: /es/glossary/#manual-step
[13]: /es/glossary/#queue-time
[14]: /es/glossary/#custom-span
[15]: /es/continuous_integration/explorer
[16]: /es/continuous_integration/search/#search-for-pipelines
[17]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[18]: /es/glossary/#pipeline-execution-time