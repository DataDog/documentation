---
aliases:
- /es/continuous_integration/pipelines_setup/
- /es/continuous_integration/explore_pipelines/
- /es/continuous_integration/setup_pipelines/
cascade:
  algolia:
    rank: 70
    tags:
    - ci pipeline
    - ci pipelines
    - funciones compatibles
further_reading:
- link: /monitors/types/ci/
  tag: Documentación
  text: Creación de monitores de CI Pipeline
- link: /account_management/billing/ci_visibility
  tag: Documentación
  text: Más información sobre la facturación de CI Visibility
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Solucionar problemas de CI Visibility
title: CI Pipeline Visibility en Datadog
---

## Información general

[Pipeline Visibility][1] ofrece una visión del estado de tu CI mostrando importantes métricas y resultados de tus pipelines. Te ayuda a solucionar problemas de fallos de pipelines, abordar cuellos de botella de rendimiento y realizar un seguimiento del rendimiento y la fiabilidad de CI a lo largo del tiempo.

## Configurar

{{< whatsnext desc="Selecciona tu proveedor de CI para configurar Pipeline Visibility en Datadog:" >}}
    {{< nextlink href="continuous_integration/pipelines/awscodepipeline" >}}AWS CodePipeline{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/azure" >}}Azure{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/buildkite" >}}Buildkite{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/circleci" >}}CircleCI{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/codefresh" >}}Codefresh{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/github" >}}Acciones GitHub{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/teamcity" >}}TeamCity{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom" >}}Otros proveedores de CI{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}Comandos personalizados{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_measures" >}}Etiquetas (tags) y medidas personalizadas{{< /nextlink >}}
{{< /whatsnext >}}

### Terminología

Aunque el concepto de pipeline CI puede variar en función de tu proveedor, ve cómo se corresponden estos conceptos con la definición de pipeline CI en Datadog Pipeline Visibility:

{{< tabs >}}
{{% tab "Acciones GitHub" %}}

| Datadog  | GitHub Actions |
|----------|----------------|
| Tuberías | Flujo de trabajo       |
| Trabajo      | Trabajo            |
| Paso     | Paso           |

{{% /tab %}}
{{% tab "GitLab" %}}

| Datadog                    | GitLab   |
|----------------------------|----------|
| Tuberías                   | Tuberías |
| Etapa                      | Etapa    |
| Trabajo                        | Trabajo      |
| _No disponible en Datadog_ | Script   |

{{% /tab %}}
{{% tab "Jenkins" %}}

| Datadog  | Jenkins  |
|----------|----------|
| Tuberías | Tuberías |
| Etapa    | Etapa    |
| Trabajo      | Paso     |

{{% /tab %}}
{{% tab "CircleCI" %}}

| Datadog                    | CircleCI  |
|----------------------------|-----------|
| Tuberías                   | Flujo de trabajo  |
| Trabajo                        | Trabajo       |
| _No disponible en Datadog_ | Paso      |

{{% /tab %}}
{{% tab "Buildkite" %}}

| Datadog                    | Buildkite                       |
|----------------------------|---------------------------------|
| Tuberías                   | Compilación (ejecución de un pipeline) |
| Trabajo                        | Trabajo (ejecución de un paso)       |

{{% /tab %}}
{{% tab "TeamCity" %}}

| Datadog                    | TeamCity    |
|----------------------------|-------------|
| Tuberías                   | Crear la cadena |
| Trabajo                        | Compilación       |
| _No disponible en Datadog_ | Paso        |

{{% /tab %}}
{{% tab "Pipelines de Azure" %}}

| Datadog                    | Pipelines Azure |
|----------------------------|-----------------|
| Tuberías                   | Tuberías        |
| Etapa                      | Etapa           |
| Trabajo                        | Trabajo             |
| _No disponible en Datadog_ | Paso            |

{{% /tab %}}
{{% tab "AWS CodePipeline" %}}

| Datadog  | AWS CodePipeline |
|----------|------------------|
| Tuberías | Tuberías         |
| Etapa    | Etapa            |
| Trabajo      | Acción           |

{{% /tab %}}

{{% tab "Otros proveedores de IC" %}}

| Datadog  | Otros proveedores de CI |
|----------|--------------------|
| Tuberías | Tuberías           |
| Etapa    | Etapa              |
| Trabajo      | Trabajo                |
| Paso     | Paso               |

{{% /tab %}}
{{< /tabs >}}

Si tu proveedor de CI no es compatible, puedes intentar configurar Pipeline Visibility a través del [endpoint de la API pública][2].

### Funciones compatibles

|  | Jenkins | GitLab | CircleCI | Buildkite | GitHub Actions | Pipelines Azure | Codefresh | TeamCity | AWS CodePipeline | Otros proveedores de CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Visualización de trazas de pipelines" >}}Visualización de ejecuciones de pipelines con el rastreo asociado.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Análisis de fallos de trabajos" >}}Análisis y categorización de fallos de trabajos utilizando modelos LLM basados en logs relevantes. <a href="https://docs.datadoghq.com/continuous_integration/guides/use_ci_jobs_failure_analysis/">Más información</a>.{{< /ci-details >}} | | {{< X >}} |  |  | {{< X >}} |  |  |  |  |  |
| {{< ci-details title="Pipelines en ejecución" >}}Identificación de las ejecuciones de pipelines que se están ejecutando con el rastreo asociado.{{< /ci-details >}} | {{< X >}} | {{< X >}} | | | {{< X >}} | | | | {{< X >}} | {{< X >}} |
| {{< ci-details title="Análisis de rutas críticas" >}}Identificación de trabajos CI que están en la ruta crítica del pipeline. <a href="https://docs.datadoghq.com/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/">Más información</a>{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Reintentos parciales" >}}Identificación de reintentos parciales (por ejemplo, cuando sólo se han reintentado un subconjunto de trabajos).{{< /ci-details >}} |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Tramos (spans) de pasos" >}}Los tramos a nivel del paso están disponibles para una visibilidad más granular.{{< /ci-details >}} | {{< X >}} (_Pero se presentan como tramos de trabajos_) |  |  |  | {{< X >}} |  | {{< X >}} |  |  |  {{< X >}} |
| {{< ci-details title="Pasos manuales" >}}Identificar cuándo hay un trabajo con una fase de aprobación manual en el pipeline general.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Tiempo de espera de aprobaciones">}}Tiempo durante el cual un pipeline o trabajo ha estado esperando una aprobación manual.{{< /ci-details >}} |  | {{< X >}} |  |  |  {{< X >}}  | {{< X >}}  |   |  | {{< X >}} |  |
| {{< ci-details title="Tiempo de cola" >}}Tiempo durante el cual un pipeline o trabajo ha estado en la cola antes de la ejecución.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="Tiempo de ejecución" >}}Tiempo durante el cual un pipeline ha estado ejecutando trabajos activamente.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Correlación de logs" >}}Recuperación de logs de pipelines o trabajos desde el proveedor de CI. Los logs se muestran en la pestaña <strong>Logs</strong> en la vista Ejecución del pipeline.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  | {{< X >}} |  |
| {{< ci-details title="Correlación de métricas de infraestructura" >}}Correlación de la información de nivel de host del Datadog Agent, pipelines CI o ejecutores de trabajos con los datos de ejecución de pipelines CI.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |  |  |  |
| {{< ci-details title="Tramos personalizados para comandos rastreados utilizando datadog-ci" >}}Compatibilidad con el envío de eventos de nivel de comando a CI Visibility para su incorporación en la visualización de gráficos de llama de canalización. A continuación, podrás consultar y analizar <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">estos eventos</a>. {{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  | {{< X >}} |  |
| {{< ci-details title="Etiquetas personalizadas predefinidas" >}}Compatibilidad con la configuración de etiquetas de pipelines estáticas en el proveedor CI, que no cambian entre ejecuciones.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |  |  |  |
| {{< ci-details title="Etiquetas y medidas personalizadas en el tiempo de ejecución" >}}compatibilidad con el agregado de <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/">texto y etiquetas numéricas definidos por el usuario</a> a pipelines y trabajos en CI Visibility.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  |  |  {{< X >}} |
| {{< ci-details title="Parámetros" >}}Compatibilidad con el agregado de parámetros personalizados de pipelines que configuran los usuarios (por ejemplo, <code>DYNAMICS_IS_CHILD:true</code>). A continuación, podrás buscar utilizando estos parámetros en el <a href="https://docs.datadoghq.com/continuous_integration/explorer/?pestaña=pipelineexecutions">Explorador de CI Visibility</a> para encontrar todos los eventos con un parámetro específico.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} |  |  |  {{< X >}} |

## Uso de datos de pipelines CI

Al crear un [dashboard][8] o un [notebook][9], puedes utilizar datos de pipelines CI en tu consulta de búsqueda, que actualiza las opciones del widget de visualización. Para obtener más información, consulte la documentación de [dashboards][10] y [notebooks][11].

## Alerta sobre datos del pipeline

Puedes exportar tu consulta de búsqueda a un [monitor de CI Pipeline][12] en la [página **Ejecuciones**][6] o en la [página **Ejecuciones de tests**][13], haciendo clic en el botón **Export** (Exportar).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[2]: /es/api/latest/ci-visibility-pipelines/#send-pipeline-event
[6]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: /es/dashboards
[11]: /es/notebooks
[12]: /es/monitors/types/ci
[13]: https://app.datadoghq.com/ci/test-runs
[14]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/