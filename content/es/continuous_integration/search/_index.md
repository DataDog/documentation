---
aliases:
- /es/continuous_integration/explorer/search/
description: Obtén más información sobre tus pipelines CI.
further_reading:
- link: /continuous_integration/explorer
  tag: Documentación
  text: Buscar y filtrar las ejecuciones de pipelines
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
  tag: Documentación
  text: Identifica los trabajos de CI en la ruta crítica para reduce la duración del
    pipeline
- link: /continuous_integration/guides/use_ci_jobs_failure_analysis/
  tag: Documentación
  text: Utilizar el análisis de fallos en los trabajos de CI para identificar las
    causas raíz de los trabajos fallidos
title: Buscar y gestionar pipelines CI
---

## Información general

La [página de pipelines][1] es útil para los desarrolladores que quieren controlar el pipeline de compilación para su servicio.

{{< img src="/continuous_integration/pipelines.png" text="Página de pipelines de CI" style="width:100%" >}}

Esta página responde a las siguientes preguntas:

- ¿El pipeline es eficaz y fiable para tu servicio, especialmente en la rama por defecto?
- Si no es así, ¿cuál es la causa?

Puedes acceder a acumulaciones y tendencias superficiales, entre otras:

- Una visión general del estado de todo el sistema de compilación, con estadísticas agregadas para ejecuciones y ramas de pipeline.
- Una ventana para detectar y solucionar rápidamente problemas inmediatos y urgentes, como pipelines rotos en la producción.
- Cómo ha funcionado cada pipeline, a lo largo del tiempo, y con qué resultados y tendencias.
- El desglose de dónde se invierte el tiempo en cada fase de compilación, a lo largo del tiempo, para que puedas centrar tus esfuerzos de mejora donde se marca la mayor diferencia.

## Buscar pipelines

Para ver tus pipelines, navega hasta [**Software Delivery** > **CI Visibility** > **CI Pipeline List**][1] (Entrega de software > CI Visibility > Lista de pipeline de CI).

La [página de pipelines][1] muestra las estadísticas agregadas de la rama por defecto de cada pipeline durante el periodo seleccionado, así como el estado de la última ejecución del pipeline. Utiliza esta página para ver todos tus pipelines y obtener una visión rápida de su estado. Solo los pipelines con información Git asociada a la rama por defecto (normalmente llamada `main` o `prod`), así como los pipelines sin ninguna información Git, se muestran en esta página.

Las métricas mostradas incluyen la frecuencia de compilación, la tasa de fallos, la duración media y el cambio en la duración media tanto en términos absolutos como relativos. Esta información revela qué pipelines son de uso frecuente y potencialmente consumen muchos recursos, o están experimentando regresiones. El último resultado de compilación, la duración y el último tiempo de ejecución muestran el efecto de la última confirmación.

Puedes filtrar página por el nombre de pipeline para ver los pipelines que más te preocupan. Haz clic en un pipeline que sea lento o que falle para profundizar en los detalles que muestran qué commit podría haber introducido la regresión de rendimiento o el error de compilación. Si estás usando [Datadog Teams][6], puedes filtrar por pipelines específicos asociados a tu equipo usando [etiquetas personalizadas][7] que coincidan con los nombres de los equipos.

## Detalles y ejecuciones de pipeline

Haz clic en un pipeline específico para ver la página de _Detalles del pipeline_ que proporciona vistas de los datos para el pipeline que has seleccionado durante un periodo especificado.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="Página de detalles del pipeline para un único pipeline" style="width:100%;">}}

Obtén información sobre el pipeline seleccionado, como ejecuciones totales y fallidas a lo largo del tiempo, percentiles de duración de la compilación, tasas de error y desglose del tiempo total empleado por fase. También hay tablas de resumen para las etapas y los trabajos para que puedas ordenarlos rápidamente en términos de duración, porcentaje del tiempo total de ejecución o tasa de fallos.

La lista de ejecuciones de pipeline muestra todas las veces que el pipeline (o sus etapas o trabajos) se ejecutaron durante el periodo seleccionado, para la rama seleccionada. Utiliza las facetas del lado izquierdo para filtrar la lista exactamente a los pipelines, etapas o trabajos que desees ver.

### Resaltar la ruta crítica

Para resaltar la ruta crítica en la traza, haz clic en la casilla `Critical path` en la página de ejecución del pipeline.

La ruta crítica destaca los tramos que es necesario acelerar si se quiere reducir el tiempo total de ejecución de pipeline. Si un trabajo de CI se encuentra en la ruta crítica, significa que forma parte de la ruta más larga a través la traza en términos de tiempo de ejecución. Acelerar los trabajos de CI en la ruta crítica es estrictamente necesario para acelerar el pipeline de CI.

Puedes utilizar [esta guía][11] para identificar los trabajos de CI en la ruta crítica para ayudarte a determinar qué trabajos priorizar con el fin de reducir la duración total de los pipelines de CI.

### Explorar conexiones con servicios, recursos y eventos de red

Haz clic en una de las ejecuciones para abrir la vista de ejecución del pipeline y ver la gráfica de llamas o la lista de tramos para el pipeline y sus etapas. La lista _Ejecuciones (n)_ de la izquierda permite acceder rápidamente a los datos de cada reintento del pipeline para la misma confirmación.

Haz clic en el enlace del proveedor de CI (`gitlab-ci gitlab.pipeline > documentation` en la siguiente imagen) para investigar la página de Recurso, Servicio o Analítica para el pipeline, fase o trabajo específicamente. También puedes encontrar información completa sobre etiquetas y enlaces a eventos de monitorización de red.

{{< img src="ci/ci-pipeline-execution.png" alt="Vista de ejecución del pipeline con información de traza y el diseño de gráfica de llamas" style="width:100%;">}}

### Explorar las conexiones con los logs

Si la recopilación de logs de trabajo es compatible y habilitada para el proveedor de CI, los eventos de log relacionados se pueden encontrar en la pestaña _Logs_ de la vista de ejecución del pipeline.

La recopilación de logs de trabajo es compatible con los siguientes proveedores:

- [AWS CodePipeline][8]
- [Azure][9]
- [CircleCI][10]
- [Acciones de GitHub][3]
- [GitLab][4]
- [Jenkins][5]

### Análisis de fallos de trabajos de CI basados en logs pertinentes

CI Visibility utiliza un modelo LLM para generar mensajes de error mejorados y categorizarlos con un dominio y un subdominio, basándose en los logs pertinentes recopilados de cada trabajo de CI fallido.

Utiliza [Análisis de fallos de trabajos de CI][12] para identificar las causas de fallo más comunes de tus trabajos de CI.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[3]: /es/continuous_integration/pipelines/github/#enable-log-collection
[4]: /es/continuous_integration/pipelines/gitlab/#enable-job-log-collection
[5]: /es/continuous_integration/pipelines/jenkins#enable-job-log-collection
[6]: /es/account_management/teams/
[7]: /es/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /es/continuous_integration/pipelines/awscodepipeline/#collect-job-logs
[9]: /es/continuous_integration/pipelines/azure/#enable-job-log-collection
[10]: /es/continuous_integration/pipelines/circleci/#enable-log-collection
[11]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
[12]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/