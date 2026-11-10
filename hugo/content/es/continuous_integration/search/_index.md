---
aliases:
- /es/continuous_integration/explorer/search/
description: Aprenda a buscar sus pipelines de CI.
further_reading:
- link: /continuous_integration/explorer
  tag: Documentación
  text: Busque y filtre ejecuciones de pipelines.
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
  tag: Documentación
  text: Identifique los trabajos de CI en la ruta crítica para reducir la duración
    del pipeline
- link: /continuous_integration/guides/use_ci_jobs_failure_analysis/
  tag: Documentación
  text: Use el Análisis de registros para identificar las causas raíz en trabajos
    de CI fallidos.
title: Busque y administre pipelines de CI.
---
## Descripción general {#overview}

La [página de Pipelines][1] es útil para los desarrolladores que desean monitorear el pipeline de compilación de su servicio.

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

Esta página responde a las siguientes preguntas:

- ¿Es el pipeline de su servicio eficiente y confiable, especialmente en la rama predeterminada?
- Si no es así, ¿cuál es la causa raíz?

Puede acceder a tendencias y acumulaciones de alto nivel, que incluyen:

- Una descripción general del estado de todo el sistema de compilación, con estadísticas agregadas para las ejecuciones de pipeline y las ramas.
- Una ventana para detectar y solucionar rápidamente problemas inmediatos y urgentes, como pipelines rotos hacia producción.
- Cómo se ha ejecutado cada pipeline a lo largo del tiempo, y con qué resultados y tendencias.
- El desglose de dónde se emplea el tiempo en cada etapa de compilación, a lo largo del tiempo, para que pueda enfocar sus esfuerzos de mejora donde marcan la mayor diferencia.

## Busque pipelines {#search-for-pipelines}

Para ver sus pipelines, navegue a [**Software Delivery** > **CI Visibility** > **CI Pipeline List**][1].

La [página de Pipelines][1] muestra estadísticas agregadas para la rama predeterminada de cada pipeline durante el período de tiempo seleccionado, así como el estado de la última ejecución de pipeline. Utilice esta página para ver todos sus pipelines y obtener una vista rápida de su estado. En esta página solo se muestran los pipelines con información de Git asociada a la rama predeterminada (generalmente llamada `main` o `prod`), así como los pipelines sin ninguna información de Git.

Las métricas mostradas incluyen frecuencia de compilación, tasa de fallos, duración mediana y cambio en la duración mediana tanto en términos absolutos como relativos. Esta información revela qué pipelines son de alto uso y potencialmente consumidores de muchos recursos, o están experimentando regresiones. El resultado, la duración y el último tiempo de ejecución de la última compilación le muestran el efecto del último commit.

Puede filtrar la página por nombre de pipeline para ver los pipelines que más le interesan. Haga clic en un pipeline que sea lento o que esté fallando para profundizar en los detalles que muestran qué commit podría haber introducido la regresión de rendimiento o el error de compilación. Si está utilizando [Datadog Teams][6], puede filtrar por pipelines específicos asociados a su equipo utilizando [etiquetas personalizadas][7] que coincidan con los identificadores de equipo.

## Detalles y ejecuciones de pipeline {#pipeline-details-and-executions}

Haga clic en un pipeline específico para ver la página {{< ui >}}Pipeline Details{{< /ui >}} que proporciona vistas de los datos para el pipeline que seleccionó durante un marco de tiempo especificado.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="Página de detalles de pipeline para un solo pipeline" style="width:100%;">}}

Obtenga información sobre el pipeline seleccionado, como el total y las ejecuciones fallidas a lo largo del tiempo, los percentiles de duración de compilación, las tasas de error y el desglose del tiempo total empleado por etapa. También hay tablas de resumen para etapas y trabajos para que pueda ordenarlos rápidamente en términos de duración, porcentaje del tiempo total de ejecución o tasa de fallas.

La lista de ejecución de pipelines muestra todas las veces que ese pipeline (o sus etapas o trabajos) se ejecutó durante el marco de tiempo seleccionado, para la rama seleccionada. Utilice las facetas en el lado izquierdo para filtrar la lista exactamente a los pipelines, etapas o trabajos que desea ver.

### Resalte la ruta crítica {#highlight-critical-path}

Para resaltar la ruta crítica en la traza, haga clic en la casilla de verificación {{< ui >}}Critical path{{< /ui >}} en la página de ejecución del pipeline.

La ruta crítica resalta los tramos que necesita acelerar si desea reducir el tiempo total de ejecución de su pipeline. Si un trabajo de CI está en la ruta crítica, significa que es parte de la ruta más larga a través de la traza en términos de tiempo de ejecución. Acelerar los trabajos de CI en la ruta crítica es estrictamente necesario para acelerar el pipeline de CI.

Utilice [esta guía][11] para identificar los trabajos de CI en la ruta crítica y ayudarle a determinar qué trabajos priorizar para reducir la duración total de los pipelines de CI.

### Explorar conexiones a servicios, recursos y eventos de red {#explore-connections-to-services-resources-and-network-events}

Haga clic en una de las ejecuciones para abrir la vista de ejecución del pipeline y ver el flame graph o la lista de tramos para el pipeline y sus etapas. La lista {{< ui >}}Executions (n){{< /ui >}} en el lado izquierdo le brinda acceso rápido a los datos de cada reintento del pipeline para el mismo commit.

Haga clic en el enlace del proveedor de CI (`gitlab-ci gitlab.pipeline > documentation` en la siguiente imagen) para investigar la página de Resource, Service o Analytics para el pipeline, la etapa o el trabajo específicamente. También puede encontrar información completa de etiquetas y enlaces a eventos de monitoreo de red.

{{< img src="ci/ci-pipeline-execution.png" alt="Vista de ejecución de pipeline con información de traza y visualización de flamegraph." style="width:100%;">}}

### Explore conexiones a registros {#explore-connections-to-logs}

Si Logs Storage está habilitado para su proveedor de CI, puede ver los eventos de registro relacionados para una ejecución del pipeline en la pestaña {{< ui >}}Logs{{< /ui >}} del panel deslizante de ejecución del pipeline.

Logs Storage es compatible con los siguientes proveedores:

- [AWS CodePipeline][8]
- [Azure][9]
- [Buildkite][13]
- [CircleCI][10]
- [GitHub Actions][3]
- [GitLab][4]
- [Jenkins][5]

### Logs Analysis basado en registros relevantes {#logs-analysis-based-on-relevant-logs}

CI Visibility utiliza un modelo LLM para generar mensajes de error mejorados y categorizarlos con un dominio y subdominio, según los registros relevantes recopilados de cada trabajo de CI fallido.

Utilice [Logs Analysis][12] para identificar las causas raíz de falla más comunes para sus trabajos de CI.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[3]: /es/continuous_integration/pipelines/github/#logs-storage
[4]: /es/continuous_integration/pipelines/gitlab/#logs-storage
[5]: /es/continuous_integration/pipelines/jenkins#logs-storage
[6]: /es/account_management/teams/
[7]: /es/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /es/continuous_integration/pipelines/awscodepipeline/#logs-storage
[9]: /es/continuous_integration/pipelines/azure/#logs-storage
[10]: /es/continuous_integration/pipelines/circleci/#logs-storage
[11]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
[12]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/
[13]: /es/continuous_integration/pipelines/buildkite/#logs-storage