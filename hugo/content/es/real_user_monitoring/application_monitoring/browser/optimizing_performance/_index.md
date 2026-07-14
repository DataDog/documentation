---
aliases:
- /es/real_user_monitoring/browser/monitoring_performance_vitals/
- /es/real_user_monitoring/browser/optimizing_performance/
description: Utiliza la página de optimización de RUM para identificar y solucionar
  problemas de rendimiento del navegador con el análisis de Core Web Vitals y la visualización
  de la experiencia del usuario.
further_reading:
- link: https://learn.datadoghq.com/courses/rum-optimize-frontend-performance
  tag: Centro de aprendizaje
  text: 'Laboratorio interactivo: optimiza el rendimiento del frontend con la monitorización
    del Datadog RUM Browser'
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: Blog
  text: Monitor de métricas de Core Web Vitals con Datadog RUM y Monitorización Sintético
- link: https://www.datadoghq.com/blog/rum-optimization/
  tag: Blog
  text: 'De los datos a acción: Optimizar Core Web Vitals y mucho más con Datadog
    RUM'
title: Optimizar el rendimiento
---

## Información general

{{< img src="real_user_monitoring/browser/optimizing_performance/optimization-workflow.mp4" alt="La optimización del rendimiento RUM te ayuda a encontrar la causa de origen de los problemas de rendimiento del navegador en función del tráfico real de usuarios." video="true" >}}

La página de optimización ayuda a identificar la causa raíz de los problemas de rendimiento del navegador utilizando datos reales del tráfico de usuarios. Soluciona las causas de la lentitud de las páginas utilizando KPIs del navegador como [Core Web Vitals][1] (CWV) y el KPI personalizado [Loading Time][2] (Tiempo de carga) de Datadog, que evalúa el tiempo de carga completa de la página desde la perspectiva del usuario.

Para un análisis más profundo, la página de optimización proporciona desgloses granulares de Core Web Vitals por datos demográficos de usuario, como navegador, región y versión de la aplicación. Puedes utilizar esta información para realizar un seguimiento de las tendencias de rendimiento a lo largo del tiempo, comprender qué grupos de usuarios se ven más afectados y priorizar las optimizaciones con precisión.

## Requisitos previos

Para optimizar tu aplicación, asegúrate de que estás utilizando:

- [SDK del navegador RUM][3] versión 5.4.0 o posterior
- [Session Replay][4] durante al menos algunas sesiones

## Seleccionar un vital

Ve a la [página de optimización][5], que se encuentra en la pestaña [**Experiencia digital > Monitorización del rendimiento**][6].

{{< img src="real_user_monitoring/browser/optimizing_performance/page-selectors.png" alt="Puedes consultar la página de optimización para ver las diez páginas más visitadas o páginas específicas." style="width:100%;" >}}

Desde esta vista, hay dos formas de seleccionar una página o un vital:

- Elegir en un mapa de árbol de las páginas más visitadas
- Introducir un nombre de vista en el cuadro de entrada y seleccionar la página

Los vitales disponibles incluyen:

- **[Tiempo de carga (LT)][2]**: es un KPI personalizado de Datadog que mide el tiempo de carga de una página desde la perspectiva del usuario.
- **[Largest Contentful Paint (LCP)][8]**: Mide la rapidez con la que se carga el elemento visual más grande de tu página, que es un factor crítico tanto para la experiencia del usuario como para las clasificaciones SEO. Un LCP lento puede frustrar a los usuarios, aumentar las tasas de rebote y perjudicar la visibilidad en las búsquedas.
- **[First Contentful Paint (FCP)][9]**: Mide el tiempo que transcurre desde que el usuario navega por primera vez a la hasta que cualquier parte del contenido de la página se representa en la pantalla. Un FCP rápido ayuda a tranquilizar al usuario de que algo está sucediendo.
- **[Cambios de diseño acumulativo (CLS)][10]**: mide la mayor cantidad de cambios de diseño inesperados que se producen durante el ciclo de vida de una página. Un cambio de diseño se produce cuando un elemento visible se desplaza de un fotograma renderizado al siguiente sin ninguna interacción del usuario, lo que altera la estabilidad visual de la página. Se trata de un KPI importante para medir la estabilidad visual, ya que ayuda a cuantificar la frecuencia con la que los usuarios experimentan cambios de diseño inesperados. Un CLS bajo ayuda a garantizar que la página sea agradable.
- **[Interaction to Next Paint (INP)][11]**: Mide el tiempo que tarda una página en responder visualmente después de que un usuario interactúa con la página.

## Filtrar y evaluar

Después de seleccionar una página y un vital, analiza los datos de rendimiento:

- Ajustar el intervalo de tiempo en la esquina superior derecha
- Utilizar desplegables para filtrar por atributos
- Seleccionar un grupo en "Mostrar desglose de filtros"
- Evaluar los vitales en diferentes percentiles

Por ejemplo, una evaluación pc75 representa el valor del percentil 75, utilizado habitualmente para CWV.

{{< img src="real_user_monitoring/browser/optimizing_performance/filter-and-evaluate.png" alt="Filtra y evalúa tus vitales para la vista seleccionada." style="width:100%;" >}}

## Visualizar la experiencia del usuario

La siguiente parte de la página te ayuda a visualizar exactamente lo que experimentan tus usuarios.

Basándose en el periodo de tiempo y el tráfico seleccionados, la página de optimización destaca el ejemplo más típico de lo que los usuarios ven en la página cuando se captura el vital seleccionado. Si utilizas [Session Replay][4], es aquí donde ves una imagen de la página.

Para algunos vitales, también puedes seleccionar otras versiones de la página para investigar haciendo clic en "See a different element" (Ver un elemento diferente).

{{< img src="real_user_monitoring/browser/optimizing_performance/vitals-visualize.png" alt="Selecciona diferentes elementos para previsualizar y visualizar la experiencia del usuario." style="width:100%;" >}}

## Solucionar problemas de recursos y errores

En la sección de resolución de problemas, puedes ver los recursos y errores que los usuarios encontraron en la página y que pueden haber afectado al rendimiento del vital. Por ejemplo, para Largest Contentful Paint (LCP), puedes ver los recursos que se cargaron antes de que se activara el LCP. Debido a que LCP es un indicador de cuánto tarda en cargarse el elemento más grande de la página, podrías investigar lo siguiente:

- Cualquier cosa que ocurra antes y podría causar lentitud o problemas de representación.
- Los recursos que son particularmente lentos o grandes podrían estar contribuyendo a los problemas de rendimiento.
- Errores recurrentes que podrían estar causando problemas.

{{< img src="real_user_monitoring/browser/optimizing_performance/troubleshoot.png" alt="La sección de resolución de problemas muestra recursos y errores que los usuarios encontraron en la página y que podrían haber afectado al rendimiento del vital." style="width:100%;" >}}

## Ver ejemplos de eventos

Para verlo todo en contexto con el resto de la actividad de la página, desplázate hasta la cascada y la cronología de los eventos. La cascada muestra la cronología de eventos hasta el momento en que se capturó el vital.

Puedes seleccionar otro evento de ejemplo utilizando el menú desplegable de la parte superior izquierda, y ampliar cualquier evento de la cascada haciendo clic en él para ver el panel lateral, como se muestra a continuación.

{{< img src="real_user_monitoring/browser/optimizing_performance/view-event-samples.png" alt="Consulta ejemplos de eventos para visualizar todo en contexto con el resto de la actividad de la página." style="width:100%;" >}}

## Creación de perfiles de navegador en ejemplos de eventos
Para un análisis más profundo de la causa de origen, utiliza la creación de perfiles de navegador junto con RUM para identificar qué actividad de JavaScript o de representación está generando experiencias lentas o que no responden. La creación de perfiles revela problemas de rendimiento que no siempre son visibles únicamente a través de Core Web Vitals. Para empezar, [asegúrate de que la creación de perfiles de navegador está activada en la configuración del SDK RUM][12].
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="Ejemplo de creación de perfil de navegador al analizar un ejemplo de evento." style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /es/real_user_monitoring/application_monitoring/browser/setup/
[4]: /es/real_user_monitoring/session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring
[8]: https://web.dev/articles/lcp/
[9]: https://web.dev/articles/fcp
[10]: https://web.dev/articles/cls/
[11]: https://web.dev/articles/inp/
[12]: /es/real_user_monitoring/correlate_with_other_telemetry/profiling
[13]: /es/real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks