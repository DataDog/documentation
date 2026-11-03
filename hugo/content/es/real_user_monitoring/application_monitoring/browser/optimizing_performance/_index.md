---
aliases:
- /es/real_user_monitoring/browser/monitoring_performance_vitals/
- /es/real_user_monitoring/browser/optimizing_performance/
description: Utilice la página RUM Optimization para identificar y solucionar problemas
  de rendimiento del navegador con el análisis de Core Web Vitals y la visualización
  de la experiencia del usuario.
further_reading:
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Configure pruebas de navegador en Synthetic Monitoring
- link: https://learn.datadoghq.com/courses/rum-optimize-frontend-performance
  tag: Centro de aprendizaje
  text: 'Laboratorio interactivo: Optimice el rendimiento del frontend con Datadog
    RUM Browser Monitoring'
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: Blog
  text: Haga un seguimiento de Core Web Vitals con Datadog RUM y Synthetic Monitoring
- link: https://www.datadoghq.com/blog/rum-optimization/
  tag: Blog
  text: 'De los datos a la acción: Optimice Core Web Vitals y más con Datadog RUM'
title: Optimización del rendimiento
---
## Descripción general {#overview}

{{< img src="real_user_monitoring/browser/optimizing_performance/optimization-workflow.mp4" alt="RUM Performance Optimization le ayuda a encontrar la causa raíz de los problemas de rendimiento del navegador según el tráfico real de los usuarios." video="true" >}}

La página Optimization ayuda a identificar la causa raíz de los problemas de rendimiento del navegador utilizando datos de tráfico real de los usuarios. Solucione las causas de las páginas lentas utilizando los KPI del navegador, como [Core Web Vitals][1] (CWV) y el KPI personalizado [Loading Time][2] de Datadog, que evalúa el tiempo de carga de la página completa desde la perspectiva del usuario.

Para un análisis más profundo, la página Optimization proporciona desgloses granulares de Core Web Vitals por datos demográficos del usuario, como navegador, región y versión de la aplicación. Puede utilizar esta información para realizar un seguimiento de las tendencias de rendimiento a lo largo del tiempo, comprender qué grupos de usuarios se ven más afectados y priorizar las optimizaciones con precisión.

## Requisitos previos {#prerequisites}

Para optimizar su aplicación, asegúrese de estar utilizando:

- [RUM Browser SDK][3] versión 5.4.0 o posterior
- [Session Replay][4] para al menos algunas sesiones

## Seleccionar una métrica vital {#selecting-a-vital}

Vaya a la [página Optimization][5], que se encuentra en la pestaña [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}}][6].

{{< img src="real_user_monitoring/browser/optimizing_performance/page-selectors.png" alt="Puede verificar en la página Optimization cuáles son las páginas más visitadas o consultar páginas específicas." style="width:100%;" >}}

Desde esta vista, hay dos formas de seleccionar una página o una métrica vital:

- Elija una página del mapa de árbol de las páginas más visitadas
- Ingrese un nombre de vista en el cuadro de entrada y seleccione la página

Las métricas vitales disponibles incluyen:

- **[Loading Time (LT)][2]**: KPI personalizado de Datadog que mide el tiempo que tarda una página en cargarse desde la perspectiva del usuario.
- **[Largest Contentful Paint (LCP)][8]**: Mide la rapidez con la que se carga el elemento visual más grande de su página, lo cual es un factor crítico tanto en la experiencia del usuario como en las clasificaciones de SEO. Un LCP lento puede frustrar a los usuarios, aumentar las tasas de rebote y perjudicar la visibilidad en las búsquedas. La página Optimization desglosa el LCP en subpartes (Time to First Byte (TTFB), retraso de carga de recursos, tiempo de carga de recursos, retraso de renderización) para que pueda identificar qué fase contribuye más a la métrica general.
- **[First Contentful Paint (FCP)][9]**: Mide el tiempo desde que el usuario navegó por primera vez a la página hasta que cualquier parte del contenido de la página se renderiza en la pantalla. Un FCP rápido ayuda a tranquilizar al usuario, pues le indica que algo está sucediendo.
- **[Cumulative Layout Shift (CLS)][10]**: Mide la mayor ráfaga de cambios de diseño inesperados que ocurren durante el ciclo de vida de una página. Un cambio de diseño ocurre cuando un elemento visible se mueve de un fotograma renderizado al siguiente sin ninguna interacción del usuario, lo que altera la estabilidad visual de la página. Un KPI importante para medir la estabilidad visual porque ayuda a cuantificar con qué frecuencia los usuarios experimentan cambios de diseño inesperados. Un CLS bajo ayuda a garantizar que la página sea agradable.
- **[Interaction to Next Paint (INP)][11]**: Mide cuánto tiempo tarda una página en responder visualmente después de que un usuario interactúa con ella. La página Optimization desglosa el INP en subpartes (retraso de entrada, duración del procesamiento, retraso de presentación) para que pueda identificar si el cuello de botella es la contención del hilo principal, la ejecución del controlador o la renderización.

## Filtre y evalúe {#filter-and-evaluate}

Después de seleccionar una página y una métrica vital, analice la información sobre el rendimiento:

- Ajuste el marco de tiempo en la esquina superior derecha
- Utilice los menús desplegables para filtrar por atributos
- Seleccione un grupo en {{< ui >}}Show Filter Breakdown{{< /ui >}}
- Evalúe las métricas vitales en diferentes percentiles

Por ejemplo, una evaluación pc75 representa el valor del percentil 75, comúnmente utilizado para CWV.

{{< img src="real_user_monitoring/browser/optimizing_performance/filter-and-evaluate.png" alt="Filtre y evalúe sus métricas vitales para la vista seleccionada." style="width:100%;" >}}

## Visualice la experiencia del usuario {#visualize-the-users-experience}

La siguiente parte de la página le ayuda a visualizar exactamente lo que sus usuarios están experimentando.

Según el período de tiempo y el tráfico seleccionados, la página Optimization destaca el ejemplo más típico de lo que los usuarios ven en la página cuando se captura la métrica vital seleccionada. Si utiliza [Session Replay][4], aquí es donde verá una imagen de la página.

Para algunas métricas vitales, también puede seleccionar otras versiones de la página para investigar haciendo clic en {{< ui >}}See a different element{{< /ui >}}.

{{< img src="real_user_monitoring/browser/optimizing_performance/vitals-visualize.png" alt="Seleccione diferentes elementos para obtener una vista previa y visualizar la experiencia del usuario." style="width:100%;" >}}

Para Largest Contentful Paint e Interaction to Next Paint, la página Optimization también muestra un desglose de la métrica en sus fases individuales. Utilice el desglose para identificar qué fase contribuye más a la métrica general y dirija el trabajo de optimización a la fase relevante. Para obtener detalles sobre cada subparte, consulte [Diagnostique Core Web Vitals con subpartes][14].

## Solucione problemas de recursos y errores {#troubleshoot-resources-and-errors}

En la sección de solución de problemas, puede ver los recursos y errores que los usuarios encontraron en la página y que podrían haber afectado el rendimiento de la métrica vital. Por ejemplo, para el Largest Contentful Paint (LCP), puede ver los recursos que se cargaron antes de que se activara el LCP. Dado que el LCP es una métrica vital que indica cuánto tiempo tarda en cargarse el elemento más grande de la página, podría investigar lo siguiente:

- Cualquier cosa que suceda antes de ese momento podría estar causando lentitud o problemas de renderización
- Los recursos que son particularmente lentos o grandes podrían estar contribuyendo a problemas de rendimiento
- Errores recurrentes que podrían estar causando problemas

{{< img src="real_user_monitoring/browser/optimizing_performance/troubleshoot.png" alt="La sección Troubleshooting muestra los recursos y errores que los usuarios encontraron en la página y que podrían haber afectado el rendimiento de la métrica vital." style="width:100%;" >}}

## Visualice muestras de eventos {#view-event-samples}

Para ver todo en contexto con el resto de la actividad de la página, desplácese hacia abajo hasta la cascada y la línea de tiempo de los eventos. La cascada muestra la línea de tiempo del evento hasta el momento en que se capturó la métrica vital.

Puede seleccionar otro evento de muestra usando el menú desplegable en la parte superior izquierda y expandir cualquier evento en la cascada haciendo clic en él para ver el panel lateral, como se muestra a continuación.

{{< img src="real_user_monitoring/browser/optimizing_performance/view-event-samples.png" alt="Visualice muestras de eventos para ver todo en contexto con el resto de la actividad de la página." style="width:100%;" >}}

## Generación de perfiles del navegador dentro de muestras de eventos {#browser-profiling-within-event-samples}
Para un análisis de causa raíz más profundo, utilice la generación de perfiles del navegador junto con RUM para identificar qué actividad de JavaScript o de representación está causando experiencias lentas o que no responden. La generación de perfiles revela problemas de rendimiento que no siempre son visibles solo a través de Core Web Vitals. Para comenzar, [asegúrese de que la generación de perfiles del navegador esté habilitada en su configuración del SDK de RUM][12].
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="Ejemplo de generación de perfiles del navegador al analizar una muestra de evento." style="width:100%;" >}}

## Auditorías de Lighthouse {#lighthouse-audits}

[Lighthouse][15] es una herramienta de Google de código abierto que califica sus páginas en categorías como rendimiento, accesibilidad, mejores prácticas, SEO y navegación agéntica para que pueda encontrar y solucionar lo que ralentiza o frustra a los usuarios.

Una [prueba Synthetic de navegador][7] puede ejecutar una auditoría de Lighthouse y enviar las puntuaciones a la vista de RUM correspondiente. Las mediciones de laboratorio de Lighthouse complementan los datos de campo de usuarios reales en esta página, para que pueda realizar un seguimiento de la calidad del frontend según un horario.

La auditoría se ejecuta una vez por ejecución de prueba, en la URL final a la que llega la prueba, e informa cinco puntuaciones de categoría de 0 a 100:

- **Performance**: Mide qué tan rápido se carga la página, muestra contenido y se vuelve interactiva.
- **Accessibility**: Mide qué tan bien pueden las personas con discapacidades navegar y usar la página, según verificaciones automatizadas.
- **Best Practices**: Mide si la página sigue los estándares modernos de seguridad, compatibilidad con navegadores y calidad del código.
- **SEO**: Mide si los motores de búsqueda pueden descubrir, comprender e indexar la página.
- **Agentic**: Mide qué tan bien pueden los agentes de IA comprender, navegar e interactuar con la página.

### Requisitos previos {#prerequisites-1}

- Una [prueba Synthetic de navegador][7] que se ejecuta en **Chrome de escritorio** desde una ubicación administrada (Datadog).
- [Recopilación de datos de RUM habilitada en la prueba][16], con una aplicación de RUM seleccionada. La prueba inyecta el SDK de navegador de RUM en la página que carga, por lo que el sitio probado no necesita ser instrumentado para RUM por separado.
- La prueba debe guardarse y ejecutarse según un horario o bajo demanda. Las auditorías no se ejecutan mientras crea o graba una prueba, ni en ejecuciones activadas desde CI/CD.

### Configurar una auditoría de Lighthouse {#set-up-a-lighthouse-audit}

Puede habilitar las auditorías de Lighthouse desde una aplicación RUM o desde Synthetic Monitoring:

- **Desde una aplicación RUM**: En la página Optimization, seleccione una opción para visualizar que aún no tenga datos de Lighthouse y luego seleccione {{< ui >}}Create a Synthetics test{{< /ui >}} en el estado vacío del panel {{< ui >}}Lighthouse{{< /ui >}}. La recopilación de datos RUM y la auditoría de Lighthouse se habilitan automáticamente, y la prueba se vincula a la aplicación RUM. Termine de configurar la prueba y guárdela.
- **Desde Synthetic Monitoring**: Cree o edite una [prueba de navegador][7], habilite la [recopilación de datos RUM][16] y seleccione su aplicación RUM, luego active {{< ui >}}Run Lighthouse audit{{< /ui >}} (disponible solo cuando la recopilación de datos RUM está habilitada). Grabe los pasos que llegan a la página que desea auditar, luego guarde la prueba.

### Visualizar resultados de Lighthouse {#view-lighthouse-results}

Después de que la prueba se ejecute, los resultados de Lighthouse aparecen en dos lugares bajo [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}}][6]. El panel y la tabla de Lighthouse se limitan únicamente a la aplicación, lo que se desea visualizar y el período de tiempo. Otros filtros de página, como navegador, país o equipo, no se aplican.

En la página **Optimization**, cuando se selecciona una sola opción para visualizar, el panel {{< ui >}}Lighthouse{{< /ui >}} muestra la auditoría más reciente de esa opción en el período de tiempo seleccionado:

- Cinco indicadores de puntuación de categoría
- El cambio en la puntuación de cada categoría en comparación con el marco temporal anterior
- Métricas de laboratorio medidas por Lighthouse
- Recuento de auditorías aprobadas y fallidas
- Tendencias de puntuación a lo largo del tiempo

Desde el panel, puede abrir el informe en el visor de Lighthouse, descargarlo como JSON o abrir el resultado de la prueba Synthetic que lo generó.

{{< img src="real_user_monitoring/browser/optimizing_performance/lighthouse-panel.png" alt="El panel de Lighthouse que muestra las puntuaciones de las categorías, las métricas de laboratorio, los resultados de las auditorías y una tendencia de las puntuaciones a lo largo del tiempo." style="width:100%;" >}}

En la **página de resumen de Performance Monitoring**, la sección {{< ui >}}Lighthouse{{< /ui >}} muestra la tabla **Lighthouse scores by view**, que compara las puntuaciones entre las distintas opciones para visualizar. Utilice el selector de percentiles (p75 de forma predeterminada) para elegir qué percentil de las puntuaciones de auditoría en el período de tiempo seleccionado muestra la tabla y seleccione una fila para abrir la página Optimization correspondiente a esa opción para visualizar.

{{< img src="real_user_monitoring/browser/optimizing_performance/lighthouse-scores-by-view.png" alt="La tabla Lighthouse scores by view compara las puntuaciones de las categorías entre las distintas opciones para visualizar en RUM e incluye un selector de percentiles." style="width:100%;" >}}

### Métricas y atributos {#metrics-and-attributes}

El atributo `@synthetics.lighthouse_audited` se establece en `true` en cada opción para visualizar que se haya auditado. Para encontrar las opciones auditadas para visualizar en el [explorador de RUM][17], cambie el tipo de evento a {{< ui >}}Views{{< /ui >}} y busque `@synthetics.lighthouse_audited:true`. Las opciones auditadas para visualizar provienen de pruebas Synthetic y no de sesiones de usuarios reales, así que elimine cualquier filtro `@session.type:user` de la consulta.

Las puntuaciones de las categorías están disponibles como métricas, por lo que puede graficarlas en tableros y configurar monitores para alertar sobre regresiones:

- `rum.measure.lighthouse.performance`
- `rum.measure.lighthouse.accessibility`
- `rum.measure.lighthouse.best_practices`
- `rum.measure.lighthouse.seo`
- `rum.measure.lighthouse.agentic`

Las métricas de puntuación de Lighthouse están etiquetadas con `application.id` y `view.name`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /es/real_user_monitoring/application_monitoring/browser/setup/
[4]: /es/session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring
[8]: https://web.dev/articles/lcp/
[9]: https://web.dev/articles/fcp
[10]: https://web.dev/articles/cls/
[11]: https://web.dev/articles/inp/
[12]: /es/real_user_monitoring/correlate_with_other_telemetry/profiling
[13]: /es/real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks
[14]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#diagnose-core-web-vitals-with-subparts
[7]: /es/synthetics/browser_tests/
[15]: https://developer.chrome.com/docs/lighthouse/overview/
[16]: /es/synthetics/guide/explore-rum-through-synthetics/
[17]: /es/real_user_monitoring/explorer/