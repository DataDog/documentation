---
aliases:
- /es/ci
- /es/continuous_integration/pipelines_setup/
- /es/continuous_integration/explore_pipelines/
- /es/continuous_integration/setup_pipelines/
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous integration
further_reading:
- link: /account_management/billing/ci_visibility
  tag: Documentación
  text: Obtenga información sobre las consideraciones de facturación para CI Visibility
- link: /continuous_integration/tests/
  tag: Documentación
  text: Explore los datos de prueba para encontrar y corregir las pruebas problemáticas
- link: /monitors/types/ci/
  tag: Documentación
  text: Creación de seguimiento de Pipelines de CI
- link: /cicd/troubleshooting/pipelines/
  tag: Documentación
  text: Solución de problemas de CI Visibility
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: Blog
  text: Monitoree su entorno de CircleCI con Datadog
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configure alertas de canalización con los monitores de CI de Datadog
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: Blog
  text: Mejores prácticas para el seguimiento de aplicaciones web estáticas
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Prácticas recomendadas para el seguimiento de CI/CD
- link: https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/
  tag: Blog
  text: Prácticas recomendadas para monitorear las pruebas de software en CI/CD
- link: https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/
  tag: Blog
  text: Monitoree sus modernizaciones de CI/CD con Datadog CI Pipeline Visibility
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: Blog
  text: Cómo usamos Datadog para la detección como código
- link: https://www.datadoghq.com/blog/cache-purge-ci-cd/
  tag: Blog
  text: Patrones para una purga de caché segura y eficiente en canalizaciones de CI/CD
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Resuelva problemas más rápido con la integración de GitLab Source Code en
    Datadog
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: Blog
  text: Métricas de éxito para Platform Engineering Teams.
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de la versión
  text: ¡Consulte las últimas versiones de Software Delivery! (Se requiere inicio
    de sesión en la aplicación)
title: Visibilidad de Continuous Integration
---
{{< callout url=# btn_hidden="true" header="CI Visibility es parte de CI/CD Optimization">}}CI/CD Optimization combina CI Visibility y Test Optimization en una interfaz unificada. Esta página cubre CI Visibility; para conocer las funciones compartidas con Test Optimization, consulte [CI/CD Optimization][1].

[1]: /es/cicd/
{{< /callout >}}

{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=CI">}}
  Únase a la sesión Introduction to CI Visibility para comprender cómo Datadog CI Visibility mejora la eficiencia de las canalizaciones de CI y cómo configurar los productos Testing Visibility y Pipeline Visibility. 
{{< /learning-center-callout >}}

<div class="alert alert-info">Esta página trata sobre cómo llevar sus métricas y datos de integración continua (CI) a los paneles de Datadog. Si desea ejecutar pruebas de Continuous Testing en sus canalizaciones de CI, consulte la sección <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing y CI/CD</a>.</div>

Datadog Continuous Integration (CI) Visibility proporciona una vista unificada de los resultados, el rendimiento, las tendencias y la confiabilidad de las canalizaciones en sus entornos de CI. Al integrar Datadog con sus canalizaciones de CI, puede crear monitores, mostrar datos en [paneles de Datadog][1] y [notebooks][2], y crear visualizaciones del estado de CI de su organización.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI Visibility ayuda a los desarrolladores a comprender las causas de las interrupciones en las canalizaciones y a monitorear las tendencias en los tiempos de ejecución de las canalizaciones. También ofrece a los ingenieros de compilación información sobre el estado de CI de toda la organización y el rendimiento de las canalizaciones a lo largo del tiempo.

## Mejore la confiabilidad de la canalización y cree trazas {#improve-pipeline-reliability-and-create-traces}

CI Visibility le ayuda a solucionar fallas en las canalizaciones y compilaciones interrumpidas al conectar las interrupciones de desarrollo más significativas con los commits que las causaron. Puede instrumentar sus canalizaciones y rastrearlas a medida que se ejecutan, lo que permite obtener información más detallada sobre el rendimiento de las canalizaciones.

## Configure CI Visibility {#set-up-ci-visibility}

Datadog se integra con una variedad de proveedores de CI para recopilar métricas que rastrean el rendimiento de sus canalizaciones de CI desde el commit hasta el despliegue. Seleccione su proveedor de CI para configurar CI Visibility en Datadog:

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

También puede usar la CLI de `datadog-ci` para rastrear comandos en sus canalizaciones y agregar etiquetas y medidas personalizadas. Las etiquetas y medidas personalizadas le permiten agregar etiquetas de texto y numéricas definidas por el usuario en los rastreos de sus canalizaciones.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/continuous_integration/pipelines/custom_commands/" >}}Comandos personalizados{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/pipelines/custom_tags_and_measures/" >}}Etiquetas y medidas personalizadas{{< /nextlink >}}
{{< /whatsnext >}}

## Funciones compatibles {#supported-features}

### Pipeline Visibility y ejecución {#pipeline-visibility-and-execution}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Otros proveedores de CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Logs Storage" >}}Almacenamiento de registros de Pipeline o de trabajo del proveedor de CI. Los registros se muestran en la pestaña <strong>Registros</strong> en la vista de ejecución de Pipelines.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Correlación de infraestructura" >}}Correlación de información a nivel de servidor para el Datadog Agent, Pipelines de CI o ejecutores de trabajos con datos de ejecución de Pipelines de CI.{{< /ci-details >}} |  |  | {{< X >}} |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Pipelines en ejecución" >}}Identificación de ejecuciones de Pipelines que se están ejecutando con rastreo asociado.{{< /ci-details >}} | {{< X >}} | | | | | {{< X >}} | {{< X >}} | {{< X >}} | | {{< X >}} |
| {{< ci-details title="Trabajos en ejecución" >}}Identificación de ejecuciones de trabajos que se están ejecutando con rastreo asociado.{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  | {{< X >}} |
| {{< ci-details title="Reintentos parciales" >}}Identificación de reintentos parciales (por ejemplo, cuando solo se volvió a intentar un subconjunto de trabajos).{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Granularidad de pasos" >}}Los spans a nivel de paso están disponibles para una visibilidad más granular.{{< /ci-details >}} |  | {{< X >}} <br /> (_Solo integración de Datadog_) | {{< X >}} <br /> (_Preview_) |  | {{< X >}} | {{< X >}} |  | {{< X >}} <br /> (_Presentado como spans de trabajo_) |  |  {{< X >}} |
| {{< ci-details title="Pasos manuales" >}}Identificación de cuándo hay un trabajo con una fase de aprobación manual en el pipeline general.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |

### Análisis y acciones automáticas {#automatic-analysis-and-actions}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Otros proveedores de CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Logs Analysis" >}}Utiliza modelos LLM en los registros relevantes para analizar la causa raíz de los trabajos de CI fallidos. <a href="https://docs.datadoghq.com/continuous_integration/guides/use_ci_jobs_failure_analysis/">Más información</a>.{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | | {{< X >}} | {{< X >}} |
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

Explore los detalles sobre las ejecuciones de sus canalizaciones en el [CI Visibility Explorer][3]. Al crear un [panel][1] o un [notebook][2], puede usar datos de canalizaciones de CI en su consulta de búsqueda, lo que actualiza las opciones del widget de visualización. Para obtener más información, consulte los [Dashboards][4] y la [documentación de Notebooks][5].

## Alertar sobre datos de pipeline {#alert-on-pipeline-data}

Puede exportar su consulta de búsqueda a un [monitor de canalizaciones de CI][6] en la [página {{< ui >}}Executions{{< /ui >}}][7] o en la [página {{< ui >}}Test Runs{{< /ui >}}][8] haciendo clic en el botón {{< ui >}}Export{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /es/continuous_integration/explorer/
[4]: /es/dashboards
[5]: /es/notebooks
[6]: /es/monitors/types/ci
[7]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/ci/test-runs