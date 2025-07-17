---
aliases:
- /es/continuous_integration/explorer/search/
description: Obtén más información sobre tus pipelines CI.
further_reading:
- link: /continuous_integration/explorer
  tag: Documentación
  text: Buscar y filtrar las ejecuciones de pipelines
- link: /integración_continua/guías/identificar_los_empleos_de_mayor_impacto_con_recorrido_crítico/
  tag: Documentación
  text: Identifique los trabajos CI en la ruta crítica para reduce the Pipeline Duration
title: Buscar y gestionar pipelines CI
---

## Resumen

La página [Pipelines][1] es útil para los desarrolladores que quieren mantener un ojo en el proceso de construcción de su servicio.

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

Esta página responde a las siguientes preguntas:

- ¿Es el pipeline de su servicio eficaz y fiable, especialmente en la rama por defecto?
- Si no es así, ¿cuál es la causa?

Puede acceder a la acumulación de alto nivel y las tendencias, incluyendo:

- Una visión general de la salud de todo el sistema de construcción, con estadísticas agregadas para las ejecuciones de tuberías y ramas.
- Una ventana para detectar y solucionar rápidamente problemas inmediatos y urgentes, como canalizaciones rotas a producción.
- Cómo se ha ejecutado cada canalización, a lo largo del tiempo, y con qué resultados y tendencias.
- El desglose de dónde se invierte el tiempo en cada etapa de construcción, a lo largo del tiempo, para que pueda centrar sus esfuerzos de mejora donde se hace la mayor diferencia.

## Buscar para pipelines

Para ver sus canalizaciones, vaya a [**Software Delivery** > **CI Visibility** > **CI Pipeline lista**][1].

La página [Pipelines][1] muestra las estadísticas agregadas de la rama predeterminada de cada pipeline durante el periodo de tiempo seleccionado, así como el estado de la última ejecución del pipeline. Utiliza esta página para ver todos tus pipelines y obtener una visión rápida de su estado. Sólo se muestran en esta página los pipelines con información Git asociada a la rama por defecto (normalmente llamada `main` o `prod`), así como los pipelines sin ninguna información Git.

 métricas muestra la frecuencia de compilación, la tasa de fallos, la duración media y el cambio en la duración media tanto en términos absolutos como relativos. Esta información revela qué canalizaciones consumen muchos recursos o experimentan regresiones. El último resultado de compilación, la duración y el último tiempo de ejecución muestran el efecto de la última confirmación.

Puede filtrar la página por nombre de canalización para ver las canalizaciones que más le preocupan. Haz clic en un pipeline que sea lento o que falle para profundizar en los detalles que muestran qué commit podría haber introducido la regresión de rendimiento o el error de compilación. Si utilizas [Datadog Teams][6], puedes filtrar los pipelines específicos asociados a tu equipo utilizando [custom etiquetas (tags)][7] que coincidan con los nombres de los equipos.

## Detalles y ejecuciones de los pipelines

Haga clic en un pipeline específico para ver la página _Detalles del pipeline_ que proporciona vistas de los datos del pipeline que ha seleccionado durante un periodo de tiempo especificado.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="Pipeline Details page for a single pipeline" style="width:100%;">}}

Obtenga información sobre el proceso seleccionado, como las ejecuciones totales y fallidas a lo largo del tiempo, los percentiles de duración de la compilación, las tasas de error y el tiempo total de desglose por etapa. También hay tablas de resumen para las etapas y los trabajos para que pueda ordenarlos rápidamente en términos de duración, porcentaje del tiempo de ejecución total o tasa de fallos.

La ejecución del pipeline lista muestra todas las veces que el pipeline (o sus etapas o trabajos) se ejecutó durante el periodo de tiempo seleccionado, para la rama seleccionada. Utilice las facetas de la parte izquierda para filtrar lista exactamente a los pipelines, etapas o trabajos que desee ver.

### Ver canalización unificada rastrear

Para ver el pipeline unificado rastrear, haga clic en la casilla `View unified trace` de la página de ejecución del pipeline.

El rastrear unificado muestra en un único rastrear todos los trazas (traces) del pipeline generados debido a los diferentes reintentos parciales de su pipeline. Si la ejecución del pipeline no tiene reintentos parciales, el rastrear unificado muestra sólo el rastrear de una única ejecución del pipeline.

### Resaltar ruta crítica

Para resaltar la ruta crítica en rastrear, haga clic en la casilla `Critical path` de la página de ejecución del pipeline.

La ruta crítica resalta los tramos (spans) que necesita acelerar si desea reduce el tiempo de ejecución total de su pipeline. Si un trabajo CI está en la ruta crítica, significa que forma parte de la ruta más larga a través de rastrear en términos de tiempo de ejecución. Acelerar los CI Jobs en la ruta crítica es estrictamente necesario para acelerar el pipeline CI.

Puede utilizar [esta guía][11] para identificar los trabajos CI en la ruta crítica para ayuda determinar qué trabajos priorizar con el fin de reducir la duración total de los conductos CI.

### Explore las conexiones con servicios, recursos y red eventos

Haga clic en una de las ejecuciones para abrir la vista de ejecución de la canalización y ver el gráfico de llamas o tramo (span) lista para la canalización y sus etapas. Las _Ejecuciones (n)_ lista en el lado izquierdo le da acceso rápido a los datos para cada reintento de la tubería para el mismo commit.

Haga clic en el enlace del proveedor de CI (`gitlab-ci gitlab.pipeline > documentation` en la siguiente imagen) para investigar la página de Recursos, servicio, o Análisis para el pipeline, etapa o trabajo específicamente. También puede encontrar información completa en etiquetas (tags) y enlaces a red Monitorización eventos .

{{< img src="ci/ci-pipeline-execution.png" alt="Pipeline execution view with rastrear info and flamegraph display" style="width:100%;">}}

### Explorar conexiones a Logs

Si se admite y habilita la recopilación de trabajos loguear para el proveedor de CI, se pueden encontrar loguear eventos relacionados en la vista _Logs_ pestaña de la ejecución de la canalización.

La recopilación de trabajos loguear es compatible con los siguientes proveedores:

- [AWS CodePipeline][8]
- [Azure][9]
- [CircleCI][10]
- [Acciones de GitHub][3]
- [GitLab][4]
- Jenkins][5]

#### Resúmenes generados por IA loguear

<div class="alert alert-info">Los resúmenes generados por la IA loguear están en vista previa. Para solicitar acceso, rellene <a href="https://docs.google.com/forms/d/e/1FAIpQLSfBuPfdyhgqjjduDYpOM5twJdkdDnTTxJdCCWonauaBxWTCnQ/viewform">este formulario</a>.</div>

Pipeline Visibility proporciona explicaciones generadas por IA para los errores de pipeline basadas en su trabajo CI logs. Estas explicaciones pueden encontrarse en **Failed Jobs** pestaña para cada ejecución de canalización. Puede utilizar estos resúmenes para determinar si un error en CI está asociado al código escrito por el desarrollador o a la propia canalización de CI, así como para solucionar los fallos de ejecución.

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
