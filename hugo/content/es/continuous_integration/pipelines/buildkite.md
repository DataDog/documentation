---
aliases:
- /es/continuous_integration/setup_pipelines/buildkite
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explore los resultados de la ejecución del pipeline y su rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentación
  text: Amplíe Pipeline Visibility añadiendo etiquetas y métricas personalizadas
title: Configuración de Buildkite para CI Visibility
---
## Descripción general {#overview}

[Buildkite][1] es una plataforma de integración y despliegue continuo que le permite ejecutar compilaciones en su propia infraestructura, brindándole control total sobre la seguridad y la personalización de su entorno de compilación mientras gestiona la orquestación en la nube.

Configure CI Visibility para Buildkite para optimizar el uso de sus recursos, reducir la sobrecarga y mejorar la velocidad y calidad de su ciclo de vida de desarrollo de software.

### Compatibilidad {#compatibility}

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Reintentos parciales][9] | Pipelines parciales | Consulte las ejecuciones de pipelines reintentadas parcialmente. |
| Correlación de métricas de infraestructura | Correlación de métricas de infraestructura | Correlacione los trabajos con las [métricas de servidor de infraestructura][6] para los agentes de Buildkite. |
| [Pasos manuales][12] | Pasos manuales | Consulte los pipelines activados manualmente. |
| [Tiempo de cola][13] | Tiempo de cola | Consulte la cantidad de tiempo que los trabajos de pipeline permanecen en la cola antes de procesarse. |
| [Etiquetas personalizadas][10] [y medidas en tiempo de ejecución][11] | Etiquetas y medidas personalizadas en tiempo de ejecución | Configure [etiquetas y medidas personalizadas][6] en tiempo de ejecución. |
| [Custom spans][14] | Custom spans | Configure tramos personalizados para sus pipelines. |
| [Filtrar trabajos de CI en la ruta crítica][17] | Filtrar trabajos de CI en la ruta crítica | Filtre por trabajos en la ruta crítica. |
| [Tiempo de ejecución][18] | Tiempo de ejecución  | Consulte la cantidad de tiempo que los pipelines han estado ejecutando trabajos. |
| Logs correlation | Logs correlation | Correlacione los tramos de pipeline y de trabajo con los registros y habilite la [recopilación de registros de trabajos][20]. |


### Terminología {#terminology}

Esta tabla muestra el mapeo de conceptos entre Datadog CI Visibility y Buildkite:

| Datadog                    | Buildkite                       |
|----------------------------|---------------------------------|
| Pipeline                   | Build (ejecución de un pipeline) |
| Trabajo                        | Trabajo (ejecución de un paso)       |

## Configurar la integración de Datadog {#configure-the-datadog-integration}

Para configurar la integración de Datadog para [Buildkite][1]:

1. Vaya a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notification Services{{< /ui >}} en Buildkite y haga clic en el botón {{< ui >}}Add{{< /ui >}} junto a {{< ui >}}Datadog Pipeline Visibility{{< /ui >}}.
2. Complete el formulario con la siguiente información:
   * {{< ui >}}Description{{< /ui >}}: Una descripción para ayudar a identificar la integración en el futuro, como `Datadog CI Visibility integration`.
   * {{< ui >}}API key{{< /ui >}}: Su [clave de Datadog API][2].
   * {{< ui >}}Datadog site{{< /ui >}}: `{{< region-param key="dd_site" code="true" >}}`
   * {{< ui >}}Pipelines{{< /ui >}}: Seleccione todos los pipelines o el subconjunto de pipelines que desea rastrear.
   * {{< ui >}}Branch filtering{{< /ui >}}: Déjelo vacío para rastrear todas las ramas o seleccione el subconjunto de ramas que desea rastrear.
3. Haga clic en {{< ui >}}Add Datadog Pipeline Visibility Notification{{< /ui >}} para guardar la integración.

### Recopilar registros de trabajo {#collect-job-logs}

Exporte los registros de trabajos desde el agente de Buildkite como registros de OpenTelemetry al [punto de conexión de registros OTLP de Datadog][23]. Para habilitar la exportación, siga la [documentación de exportación de registros de trabajos de OpenTelemetry][22] de Buildkite.

Datadog factura los registros por separado de CI Visibility. Configure la retención de registros, los filtros de exclusión y los índices en [Log Management][21]. Para limitar estas reglas a los registros de Buildkite, filtre por las etiquetas `datadog.product:cipipeline` y `source:buildkite`.

{{% collapse-content title="Integración de Datadog con Buildkite (heredada)" level="h4" expanded=false id="legacy-buildkite-integration-job-log-collection" %}}

La integración de Datadog con Buildkite es un método heredado para recopilar registros de trabajos. Si no puede utilizar OpenTelemetry, comuníquese con su representante de Datadog.

Para obtener instrucciones de instalación y configuración, consulte la [documentación de la integración de Buildkite][19].

<div class="alert alert-warning">Esta integración recupera los registros de trabajos a través de la API de Buildkite. La recopilación de registros puede consumir una parte significativa de su límite de tasa de la API de Buildkite.</div>

{{% /collapse-content %}}

## Configuración avanzada {#advanced-configuration}

### Establezca etiquetas personalizadas {#set-custom-tags}

Se pueden agregar etiquetas personalizadas a los trazos de Buildkite mediante el comando `buildkite-agent meta-data set`.
Cualquier etiqueta de metadatos con una clave que comience con `dd_tags.` se agrega a los tramos de trabajo y de pipeline. Estas
Las etiquetas se pueden utilizar para crear facetas de cadena para buscar y organizar los pipelines.

El YAML a continuación ilustra un pipeline simple donde las etiquetas para el nombre del equipo y la versión de Go han
sido establecidas.

```yaml
steps:
  - command: buildkite-agent meta-data set "dd_tags.team" "backend"
  - command: go version | buildkite-agent meta-data set "dd_tags.go.version"
    label: Go version
  - commands: go test ./...
    label: Run tests
```

Las siguientes etiquetas se muestran en el tramo raíz, así como en el tramo del trabajo relevante en Datadog.

- `team: backend`
- `go.version: go version go1.17 darwin/amd64` (la salida depende del ejecutor)

El pipeline resultante se ve de la siguiente manera:

{{< img src="ci/buildkite-custom-tags.png" alt="Traza de pipeline de Buildkite con etiquetas personalizadas" style="width:100%;">}}

Cualquier metadato con una clave que comience con `dd-measures.` y contenga un valor numérico se establecerá como
una etiqueta de métrica que se puede utilizar para crear medidas numéricas.

Puede utilizar el comando `buildkite-agent meta-data set` para crear estas etiquetas.

Por ejemplo, puede medir el tamaño del binario en un pipeline con este comando:

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_measures.binary_size"
    label: Go build
```

El pipeline resultante tendrá las etiquetas que se muestran a continuación en el span de pipeline:

- `binary_size: 502` (la salida depende del tamaño del archivo)

En este ejemplo, puede utilizar el valor de `binary_size` para graficar el cambio en el tamaño del binario a lo largo del tiempo.

### Correlacione métricas de infraestructura con trabajos {#correlate-infrastructure-metrics-to-jobs}

Si utiliza agentes de Buildkite, puede correlacionar los trabajos con la infraestructura que los ejecuta.
Para que esta función funcione, instale el [Datadog Agent][7] en los servidores que ejecutan los agentes de Buildkite.

## Visualizar Pipelines parciales y descendentes {#view-partial-and-downstream-pipelines}

Puede utilizar los siguientes filtros para personalizar su consulta de búsqueda en el [CI Visibility Explorer][15].

{{< img src="ci/partial_retries_search_tags.png" alt="La página de ejecuciones de Pipeline con Partial Pipeline:retry ingresado en la consulta de búsqueda" style="width:100%;">}}

| Nombre de faceta | ID de faceta | Valores posibles |
|---|---|---|
| Pipelines descendentes | `@ci.pipeline.downstream` | `true`, `false` |
| Activado manualmente | `@ci.is_manual` | `true`, `false` |
| Pipelines parciales | `@ci.partial_pipeline` | `retry`, `paused`, `resumed` |

También puede aplicar estos filtros usando el panel de faceta en el lado izquierdo de la página.

{{< img src="ci/partial_retries_facet_panel.png" alt="El panel de faceta con la faceta Pipelines parciales expandida y el valor Retry seleccionado, la faceta Partial Retry expandida y el valor true seleccionado" style="width:20%;">}}

## Visualice datos de Pipelines en Datadog {#visualize-pipeline-data-in-datadog}

Las páginas [**Lista de CI Pipeline**][3] y [**Ejecuciones**][4] se completan con datos después de que los pipelines finalizan.

La página {{< ui >}}CI Pipeline List{{< /ui >}} muestra datos solo para la rama predeterminada de cada repositorio. Para obtener más información, consulte [Buscar y administrar Pipelines][16].

## Lecturas adicionales {#further-reading}

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
[19]: /es/integrations/buildkite/
[20]: /es/continuous_integration/pipelines/buildkite/#collect-job-logs
[21]: /es/logs/
[22]: https://buildkite.com/docs/agent/self-hosted/monitoring-and-observability/tracing#exporting-job-logs-as-opentelemetry-logs
[23]: /es/opentelemetry/setup/otlp_ingest/logs/