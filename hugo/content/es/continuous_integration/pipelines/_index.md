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
    - supported features
disable_sidebar: true
further_reading:
- link: /monitors/types/ci/
  tag: Documentación
  text: Creación de seguimiento de Pipelines de CI
- link: /account_management/billing/ci_visibility
  tag: Documentación
  text: Aprendiendo sobre la facturación de CI Visibility
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
title: CI Pipeline Visibility en Datadog
---
## Descripción general {#overview}

[CI Visibility][1] proporciona una vista centrada en Pipelines sobre el estado de su CI al mostrar métricas y resultados importantes de sus Pipelines. Le ayuda a solucionar fallas en los Pipelines, abordar cuellos de botella en el rendimiento y realizar un seguimiento del rendimiento y la confiabilidad de la CI a lo largo del tiempo.

## Configuración {#setup}

Seleccione su proveedor de CI para configurar CI Visibility en Datadog:

{{< card-grid card_width="225px" >}}
  {{< image-card href="/continuous_integration/pipelines/awscodepipeline/" src="integrations_logos/aws-codepipeline_small.svg" alt="AWS CodePipeline" >}}
  {{< image-card href="/continuous_integration/pipelines/azure/" src="integrations_logos/azure-pipelines_small.svg" alt="extensión de Azure DevOps" >}}
  {{< image-card href="/continuous_integration/pipelines/buildkite/" src="integrations_logos/buildkite_small.svg" alt="Buildkite" >}}
  {{< image-card href="/continuous_integration/pipelines/circleci/" src="integrations_logos/circleci.png" alt="orbe de CircleCI" >}}
  {{< image-card href="/continuous_integration/pipelines/codefresh/" src="integrations_logos/codefresh_small.svg" alt="Codefresh" >}}
  {{< image-card href="/continuous_integration/pipelines/github/" src="integrations_logos/github_small.svg" alt="GitHub Actions" >}}
  {{< image-card href="/continuous_integration/pipelines/gitlab/" src="integrations_logos/gitlab-logo-100.svg" alt="GitLab" >}}
  {{< image-card href="/continuous_integration/pipelines/jenkins/" src="integrations_logos/jenkins.png" alt="Jenkins" >}}
  {{< image-card href="/continuous_integration/pipelines/teamcity/" src="integrations_logos/teamcity_small.svg" alt="TeamCity" >}}
  {{< image-card href="/continuous_integration/pipelines/custom/" src="integrations_logos/docs_other_ci_providers.png" alt="otros proveedores de CI" >}}
{{< /card-grid >}}

{{< whatsnext desc="Para opciones de personalización, consulte las siguientes secciones:" >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}Comandos personalizados{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_measures" >}}Etiquetas y medidas personalizadas{{< /nextlink >}}
{{< /whatsnext >}}

## Funciones compatibles {#supported-features}

### Pipeline Visibility y ejecución {#pipeline-visibility-and-execution}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Otros proveedores de CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Almacenamiento de registros" >}}Almacenamiento de registros de Pipeline o de trabajo del proveedor de CI. Los registros se muestran en la pestaña <strong>Registros</strong> en la vista de ejecución de Pipelines.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Correlación de infraestructura" >}}Correlación de información a nivel de servidor para el Datadog Agent, Pipelines de CI o ejecutores de trabajos con datos de ejecución de Pipelines de CI.{{< /ci-details >}} |  |  | {{< X >}} |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Pipelines en ejecución" >}}Identificación de ejecuciones de Pipelines que se están ejecutando con rastreo asociado.{{< /ci-details >}} | {{< X >}} | | | | | {{< X >}} | {{< X >}} | {{< X >}} | | {{< X >}} |
| {{< ci-details title="Trabajos en ejecución" >}}Identificación de ejecuciones de trabajos que se están ejecutando con rastreo asociado.{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  | {{< X >}} |
| {{< ci-details title="Reintentos parciales" >}}Identificación de reintentos parciales (por ejemplo, cuando solo se volvió a intentar un subconjunto de trabajos).{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Granularidad de pasos" >}}Los spans a nivel de paso están disponibles para una visibilidad más granular.{{< /ci-details >}} |  |  |  |  | {{< X >}} | {{< X >}} |  | {{< X >}} <br /> (_Presentado como spans de trabajo_) |  |  {{< X >}} |
| {{< ci-details title="Pasos manuales" >}}Identificación de cuándo hay un trabajo con una fase de aprobación manual en el pipeline general.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |

### Análisis y acciones automáticas {#automatic-analysis-and-actions}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Otros proveedores de CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Análisis de registros" >}}Utiliza modelos LLM en los registros relevantes para analizar la causa raíz de los trabajos de CI fallidos. <a href="https://docs.datadoghq.com/continuous_integration/guides/use_ci_jobs_failure_analysis/">Más información</a>.{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | |  |  |
| {{< ci-details title="Ruta crítica" >}}Identificación de los trabajos de CI que se encuentran en la ruta crítica del pipeline. <a href="https://docs.datadoghq.com/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/">Más información</a>{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Reintentos automáticos de trabajos" >}}Datadog reintenta los trabajos fallidos clasificados como transitorios por su modelo de error de IA. <a href="https://docs.datadoghq.com/continuous_integration/pipelines/automatic_retries/">Más información</a>.{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  |  |

### Desglose de duración {#duration-breakdown}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Otros proveedores de CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Tiempo de ejecución" >}}Tiempo durante el cual un pipeline ha estado ejecutando trabajos.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Tiempo de cola" >}}Tiempo durante el cual un pipeline o trabajo estuvo en la cola antes de la ejecución.{{< /ci-details >}} |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Tiempo de espera de aprobación">}}Tiempo durante el cual un pipeline o trabajo ha estado esperando una aprobación manual.{{< /ci-details >}} | {{< X >}} | {{< X >}}  |  |  |   |  {{< X >}}  | {{< X >}} |  |  |  |

### Personalización y extensibilidad {#customization-and-extensibility}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Otros proveedores de CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Comandos personalizados" >}}Soporte para usar datadog-ci para enviar eventos a nivel de comando a CI Visibility para ser incorporados en la visualización en cascada del pipeline. Luego puede consultar y analizar <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">estos eventos</a>. {{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Etiquetas estáticas" >}}Soporte para configurar etiquetas estáticas de pipeline en el proveedor de CI que no cambian entre ejecuciones.{{< /ci-details >}} |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Etiquetas de tiempo de ejecución" >}}Soporte para agregar <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/">etiquetas de texto y numéricas definidas por el usuario</a> a pipelines y trabajos en CI Visibility.{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="Parámetros" >}}Soporte para agregar parámetros de pipeline personalizados que los usuarios establecen (por ejemplo, <code>DYNAMICS_IS_CHILD:true</code>). Luego puede buscar usando estos parámetros en el <a href="https://docs.datadoghq.com/continuous_integration/explorer/?tab=pipelineexecutions">Explorador de CI Visibility</a> para encontrar todos los eventos con un parámetro específico.{{< /ci-details >}} |  |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |

## Usar datos de pipelines de CI {#use-ci-pipelines-data}

Al crear un [panel][8] o un [notebook][9], puede usar datos de pipelines de CI en su consulta de búsqueda, lo que actualiza las opciones del widget de visualización. Para obtener más información, consulte los [Dashboards][10] y la [Notebooks documentation][11].

## Alertar sobre datos de pipeline {#alert-on-pipeline-data}

Puede exportar su consulta de búsqueda a un [seguimiento de pipeline de CI][12] en la [{{< ui >}}Executions{{< /ui >}} página][6] o en la [{{< ui >}}Test Runs{{< /ui >}} página][13] haciendo clic en el botón {{< ui >}}Export{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[6]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: /es/dashboards
[11]: /es/notebooks
[12]: /es/monitors/types/ci
[13]: https://app.datadoghq.com/ci/test-runs
[14]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/