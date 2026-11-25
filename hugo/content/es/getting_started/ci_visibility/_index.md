---
algolia:
  tags:
  - pipeline visibility
  - pipelines
  - ci pipeline
description: Monitoree el estado y el rendimiento de la canalización de CI con trazas,
  métricas y análisis para optimizar la velocidad de desarrollo y reducir los costos.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Haga un seguimiento de todas sus canalizaciones de CI con Datadog
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Prácticas recomendadas para el seguimiento de CI/CD
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Obtenga información sobre CI Pipeline Visibility
- link: /monitors/types/ci
  tag: Documentación
  text: Obtenga información sobre los monitores de canalización de CI
- link: /account_management/billing/ci_visibility
  tag: Documentación
  text: Obtenga información sobre las consideraciones de facturación para CI Visibility
title: Introducción a CI Visibility
---
## Descripción general {#overview}

CI Visibility, o CI Pipeline Visibility, le permite monitorear el estado de sus canalizaciones de CI y visualizar el rendimiento de las ejecuciones de su canalización como trazas, donde los tramos representan los diferentes niveles de la canalización. 

{{< img src="/getting_started/ci_visibility/pipelines_list.png" alt="Una vista de lista de sus canalizaciones de CI en Datadog CI Visibility" style="width:100%" >}}

Puede reenviar registros de trabajos de CI y correlacionarlos automáticamente con sus canalizaciones en CI Visibility. Dependiendo de los proveedores que esté utilizando, puede habilitar la recopilación de registros de trabajos en [{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}][1] o en la configuración de su proveedor para integrarse con Datadog.

También puede usar la CLI de `datadog-ci` para [rastrear comandos][2] en sus canalizaciones, así como los [comandos de etiquetas y medidas personalizadas][3] para agregar etiquetas de texto y numéricas definidas por el usuario a las trazas de su canalización.

CI Visibility proporciona a las organizaciones de DevOps e ingeniería de plataformas monitoreo integral, análisis y la capacidad de identificar y resolver cuellos de botella, optimizar la asignación de recursos y disminuir los costos de CI. 

Al integrar métricas de rendimiento, registros y alertas, las organizaciones pueden mejorar la velocidad de desarrollo, aumentar la confiabilidad de sus canalizaciones y tomar decisiones basadas en datos en entornos en la nube y autohospedados.

## Configure su proveedor de CI {#set-up-your-ci-provider}

CI Visibility rastrea el rendimiento y los resultados de sus canalizaciones de CI, y muestra los resultados después de que la canalización finaliza. 

Para comenzar a enviar métricas de canalización, consulte la documentación de uno de los siguientes proveedores de CI que Datadog admite a continuación.

{{< card-grid card_width="200px">}}
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

Si su proveedor de CI no es compatible, puede enviar mediante programación sus eventos de canalización a Datadog. Consulte la sección [Enviar eventos de canalización a Datadog](#send-pipeline-events-to-datadog).

Dependiendo del proveedor o proveedores de CI elegidos, es posible que CI Visibility no admita todos los niveles en su canalización (etapa, trabajo, paso o comando). Para obtener más información sobre cómo CI Visibility define una canalización de CI, consulte la [sección de terminología][4].

## Use datos de canalización de CI {#use-ci-pipeline-data}

Acceda a las métricas de sus canalizaciones (como tiempos de cola, duraciones, percentiles y estados) para comenzar a identificar tendencias y patrones importantes utilizando los datos recopilados de sus proveedores de CI. 

{{< img src="/getting_started/ci_visibility/pipelines_dashboard.png" alt="Un panel listo para usar con widgets que muestran datos recopilados de sus canalizaciones, trabajos y etapas en CI Visibility" style="width:100%" >}}

Puede crear [paneles][5] para visualizar en qué puntos ocurren fallas en sus canalizaciones, o utilizar un [panel listo para usar][6] con widgets que muestran datos recopilados en CI Visibility para visualizar el estado y el rendimiento de sus canalizaciones de CI, etapas y trabajos.

## Busque y administre sus canalizaciones de CI {#search-and-manage-your-ci-pipelines}

La [página {{< ui >}}CI Pipeline List{{< /ui >}}][7] proporciona una vista integral del rendimiento y la confiabilidad de sus canalizaciones de CI para la rama predeterminada. Acceda a estadísticas agregadas, tendencias e información sobre sus canalizaciones para identificar y resolver problemas como fallas y regresiones.

Para mejorar la resolución de problemas y agilizar sus procesos de gestión de canalizaciones, haga clic en una canalización para acceder a información, revisar historiales de ejecución y consultar registros y datos de telemetría relacionados. Para obtener más información, consulte [Buscar y administrar canalizaciones de CI][8].

## Examine los resultados en CI Visibility Explorer {#examine-results-in-the-ci-visibility-explorer}

[CI Visibility Explorer][9] le permite crear visualizaciones y filtrar spans de pipeline utilizando los datos recopilados de sus proveedores de CI. Cada ejecución de una canalización se reporta como una traza, que incluye información de etapas y trabajos. 

{{< tabs >}}
{{% tab "Pipeline" %}}

Navegue a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}CI Visibility{{< /ui >}} > {{< ui >}}Executions{{< /ui >}}][101] y seleccione {{< ui >}}Pipeline{{< /ui >}} para comenzar a filtrar los resultados de sus spans de pipeline. 

{{< img src="/getting_started/ci_visibility/pipeline_view.png" alt="Resultados de ejecución de canalizaciones en CI Visibility Explorer filtrados por el repositorio Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Apipeline

{{% /tab %}}
{{% tab "Stage" %}}

Navegue a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}CI Visibility{{< /ui >}} > {{< ui >}}Executions{{< /ui >}}][101] y seleccione {{< ui >}}Stage{{< /ui >}} para comenzar a filtrar los resultados de sus tramos de etapa. 

{{< img src="/getting_started/ci_visibility/stage_view.png" alt="Resultados de etapas en CI Visibility Explorer filtrados por el repositorio Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Astage

{{% /tab %}}
{{% tab "Job" %}}

Navegue a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}CI Visibility{{< /ui >}} > {{< ui >}}Executions{{< /ui >}}][101] y seleccione {{< ui >}}Job{{< /ui >}} para comenzar a filtrar los resultados de sus tramos de trabajo. 

{{< img src="/getting_started/ci_visibility/job_view.png" alt="Resultados de trabajos en CI Visibility Explorer filtrados por el repositorio Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Ajob

{{% /tab %}}
{{% tab "Step" %}}

Navegue a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}CI Visibility{{< /ui >}} > {{< ui >}}Executions{{< /ui >}}][101] y seleccione {{< ui >}}Step{{< /ui >}} para comenzar a filtrar los resultados de los tramos de sus pasos. 

{{< img src="/getting_started/ci_visibility/step_view.png" alt="Resultados de pasos en CI Visibility Explorer filtrados por el repositorio Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Astep

{{% /tab %}}
{{< /tabs >}}

Utilice [facetas][9] para personalizar la consulta de búsqueda e identificar cambios en el tiempo dedicado a cada nivel de su canalización.

Una vez que haga clic en una canalización, puede acceder a las ejecuciones de canalización individuales enumeradas en la sección {{< ui >}}Pipeline Executions{{< /ui >}}. Cuando hace clic en una ejecución de canalización, puede ver un gráfico de llama o una lista de tramos en la pestaña {{< ui >}}Trace{{< /ui >}}. 

{{< img src="/getting_started/ci_visibility/executions.png" alt="Resultados de la ejecución de la canalización visualizados como un gráfico de llama para la canalización Staging Build and Test" style="width:100%" >}}

Puede identificar cuellos de botella en su canalización y examinar nodos individuales clasificados desde el mayor al menor porcentaje de tiempo de ejecución. 

Después de configurar Test Optimization, puede acceder a información sobre las pruebas que se ejecutaron en sus canalizaciones de CI, incluido el estado de la prueba (Failed, New Flaky, Passed o Skipped), en la pestaña {{< ui >}}Test Runs{{< /ui >}} del panel lateral de una ejecución de canalización. Para obtener más información, consulte la [documentación de Flaky Test Management][10].

Puede acceder a los registros de canalización o de trabajo en ejecutores en la nube y autohospedados, y ver información sobre sus ejecutores en la pestaña {{< ui >}}Logs{{< /ui >}} del panel lateral de una ejecución de canalización.

Si utiliza [proveedores compatibles][11], puede correlacionar las métricas de infraestructura con sus trabajos de GitLab y acceder a la información del servidor, el sistema, las etiquetas del servidor y las métricas del servidor del trabajo de GitLab. Para obtener más información, consulte [Correlación de métricas de infraestructura con trabajos de GitLab en Datadog][12].

## Enviar eventos de canalización a Datadog {#send-pipeline-events-to-datadog}

Para otros proveedores de canalización y canalizaciones personalizadas, puede enviar eventos de canalización a Datadog mediante programación utilizando la [CI Visibility Pipelines API][16]. Para obtener más información, consulte [Modelo de datos de canalización y tipos de ejecución][13].

Proporcione la siguiente información de Git (la URL del repositorio, el SHA de confirmación y el correo electrónico del autor) de la confirmación que activó la ejecución de la canalización en la solicitud.

## Crear un monitor de canalización de CI {#create-a-ci-pipeline-monitor}

Alerte a los equipos pertinentes de su organización sobre el estado de la canalización y las regresiones de rendimiento cuando ocurran fallas o se excedan los umbrales de duración en sus canalizaciones de CI con [monitores de CI][14].

{{< img src="/getting_started/ci_visibility/avg_duration_monitor.png" alt="Un monitor de canalización de CI configurado para activar una alerta cuando la duración promedio de la canalización Test and Deploy Cart supere los cinco minutos en el último día" style="width:100%" >}}

Para configurar un monitor que alerte sobre su canalización de CI cuando la duración promedio en el último día supere un umbral de cinco minutos:

1. Navegue a [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][15] y seleccione {{< ui >}}CI{{< /ui >}}. 
1. Seleccione un tipo de monitor común para canalizaciones de CI para comenzar, por ejemplo: {{< ui >}}Long Running Pipeline{{< /ui >}} para activar alertas cuando una canalización lleve demasiado tiempo en ejecución o {{< ui >}}Failed Job{{< /ui >}} para activar alertas por fallas en los trabajos; también puede personalizar su propia consulta de búsqueda. En este ejemplo, ingrese `@ci.pipeline.name:test_and_deploy_cart` y seleccione Avg of `Duration (@duration)`.
1. En la sección {{< ui >}}Evaluate the query over the{{< /ui >}}, seleccione {{< ui >}}last 1 day{{< /ui >}}. 
1. Establezca las condiciones de alerta para que se activen cuando el valor evaluado sea {{< ui >}}above{{< /ui >}} el umbral, y especifique los valores para los umbrales de alerta o advertencia, como `Alert threshold > 300000000000`.
1. En la sección {{< ui >}}Configure notifications and automations{{< /ui >}}, configure los ajustes de notificación de su monitor.
1. Establezca los permisos para el monitor.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[2]: /es/continuous_integration/pipelines/custom_commands/
[3]: /es/continuous_integration/pipelines/custom_tags_and_measures/
[4]: /es/continuous_integration/pipelines/?tab=githubactions#terminology
[5]: /es/dashboards/
[6]: https://app.datadoghq.com/dash/integration/30516/ci-visibility---pipelines-dashboard
[7]: https://app.datadoghq.com/ci/pipelines
[8]: /es/continuous_integration/search/
[9]: /es/continuous_integration/explorer
[10]: /es/tests/flaky_test_management/
[11]: /es/continuous_integration/pipelines/?tab=githubactions#supported-features
[12]: /es/continuous_integration/guides/infrastructure_metrics_with_gitlab/
[13]: /es/continuous_integration/guides/pipeline_data_model/
[14]: /es/monitors/types/ci/?tab=pipelines
[15]: https://app.datadoghq.com/monitors/create
[16]: /es/api/latest/ci-visibility-pipelines/