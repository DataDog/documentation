---
aliases:
- /es/synthetics/apm/browser_tests
description: Visualice los resultados de la prueba de navegador Synthetic y compare
  las ejecuciones de muestra exitosas o fallidas con las ejecuciones de prueba.
further_reading:
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: Documentación
  text: Explore RUM y Session Replay en Synthetics
- link: /synthetics/dashboards/browser_test/
  tag: Documentación
  text: Obtenga información sobre los tableros de rendimiento de la prueba de navegador.
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de aprendizaje
  text: Introducción a Synthetic Monitoring y a la prueba de navegador
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: Blog
  text: Haga un seguimiento de Core Web Vitals con Synthetic Monitoring.
- link: https://www.datadoghq.com/blog/bits-investigation-synthetic-tests/
  tag: Blog
  text: Clasifique las fallas de la prueba Synthetic más rápido con Bits Investigation.
title: Resultados de pruebas de navegador
---
## Descripción general {#overview}

La página de detalles de la prueba se abre después de que se ejecuta una prueba de navegador sintética y está organizada en cuatro pestañas: [{{< ui >}}Activity{{< /ui >}}](#test-activity), [{{< ui >}}Test Runs{{< /ui >}}](#test-runs), [{{< ui >}}Performance{{< /ui >}}](#test-performance) y [{{< ui >}}Properties{{< /ui >}}](#test-properties). Utilice estas pestañas para hacer un seguimiento del tiempo de actividad, inspeccionar ejecuciones individuales, revisar métricas de rendimiento agregadas y administrar la configuración de la prueba. Cuando una ejecución falla, consulte [Resultados fallidos](#failed-results) para obtener herramientas de solución de problemas como resúmenes de fallas por IA y comparación de capturas de pantalla.

## Actividad de prueba {#test-activity}

En la pestaña {{< ui >}}Activity{{< /ui >}}, puede ver:

- El gráfico {{< ui >}}Global Uptime{{< /ui >}}, que muestra el tiempo de actividad total de todas las ubicaciones de prueba en un intervalo de tiempo determinado. La visualización del tiempo de actividad global se muestra en rojo solo si se activan las [condiciones de alerta][20] configuradas para una prueba en el intervalo de tiempo dado. Dado que el tiempo de actividad de la ubicación se calcula en función del resultado final de la prueba después de que se completan los reintentos, los intervalos de [reintento rápido][24] afectan directamente lo que aparece en su gráfico de tiempo de actividad total. Para obtener más información sobre el monitoreo del tiempo de actividad, consulte la guía [Monitoreo del tiempo de actividad del sitio web con SLO][14].
- Una {{< ui >}}Timeline{{< /ui >}} de activaciones de alerta, recuperaciones y modificaciones de pruebas.
- Un panel {{< ui >}}Summary{{< /ui >}} para el evento de línea de tiempo seleccionado, que muestra lo que sucedió, el resultado fallido y los siguientes pasos sugeridos para la investigación.

{{< img src="synthetics/browser_tests/synthetics_bits_investigation.png" alt="La pestaña Actividad en una página de Detalles de prueba de navegador que muestra el Tiempo de actividad global, la línea de tiempo de alertas y un panel de detalles de fallas con Bits Investigation." style="width:100%;" >}}

## Ejecuciones de prueba {#test-runs}

En la pestaña {{< ui >}}Test Runs{{< /ui >}}, puede ver todas las ejecuciones individuales de su prueba. Filtre por estado (aprobado o fallido), tipo de ejecución, ubicación o dispositivo, y haga clic en cualquier fila para inspeccionar esa ejecución en detalle.

{{< img src="synthetics/browser_tests/synthetics_test_runs.png" alt="La pestaña Test Runs en una página de detalles de prueba de navegador que muestra una tabla filtrable de ejecuciones de prueba con columnas de estado, fecha, tipo de ejecución, pasos, duración, ubicación, dispositivo, navegador y versión de prueba" style="width:100%" >}}

Las ejecuciones de prueba de navegador incluyen componentes como [capturas de pantalla](#screenshots-and-actions), [datos de rendimiento de la página](#test-performance), [errores](#errors-and-warnings), [recursos](#resources) y [trazas de backend](#backend-traces) para ayudar a solucionar el [fallo de su prueba](#failed-results).

{{% collapse-content title="Columnas de ejecución de prueba" level="h3" %}}

A continuación se describe cada columna en la tabla {{< ui >}}Test Runs{{< /ui >}}:

Estado
: El estado de la ejecución de prueba (`PASSED` o `FAILED`).

Fecha
: El tiempo relativo y la marca de tiempo en que se ejecutó la ejecución de prueba.

Tipo de ejecución
: El tipo de ejecución de prueba (programada, CI o activada manualmente).

Pasos
: La cantidad de pasos de prueba completados del total configurado para la ejecución de prueba.

Duración
: La cantidad de tiempo que tardó en completarse la ejecución de prueba.

Ubicación
: La ubicación administrada o privada desde la que se ejecutó la prueba.

Dispositivo
: El tipo de dispositivo desde el que se ejecutó la prueba.

Navegador
: El tipo de navegador desde el cual se ejecutó la prueba.

Versión de la prueba
: La versión de la configuración de prueba utilizada para la ejecución de prueba.

{{% /collapse-content %}}

### Sesiones RUM {#rum-sessions}

Para visualizar sesiones relacionadas y reproducciones disponibles en el [RUM Explorer][22], haga clic en {{< ui >}}View Session in RUM{{< /ui >}}. Para acceder a una sesión de usuario para una acción o paso en particular en [Session Replay][23], haga clic en {{< ui >}}Replay Session{{< /ui >}}. Para obtener más información, consulte [Explorar RUM y Session Replay en Synthetic Monitoring][16].

### Capturas de pantalla y acciones {#screenshots-and-actions}

Cada paso de prueba ejecutado contiene una captura de pantalla de la acción del paso, un enlace a la sesión en Session Replay, la descripción del paso, la URL inicial para un paso determinado, el ID del paso, la duración del paso y la información de rendimiento de la página.

### Errores y advertencias {#errors-and-warnings}

Haga clic en la píldora {{< ui >}}Errors{{< /ui >}} para acceder a la pestaña {{< ui >}}Errors & Warnings{{< /ui >}} y examinar una lista de errores separados por tipo de error (`js` o `network`) y estado (el código de estado de red).

{{< img src="synthetics/browser_tests/test_results/synthetics_errors.png" alt="Detalles de la ejecución de prueba de navegador con la píldora de Errores resaltada en cada paso, indicando dónde hacer clic para abrir la pestaña de Errores y advertencias" style="width:100%" >}}

La pestaña {{< ui >}}Errors & Warnings{{< /ui >}} muestra una lista de errores separados por tipo de error (`js` o `network`) y estado (el código de estado de red).

El tipo de error se registra cuando la prueba de navegador interactúa con la página. Corresponde a los errores recopilados entre el momento en que se abre la página y el momento en que se puede interactuar con ella. El número máximo de errores que se pueden mostrar es 8, por ejemplo: 2 errores `network` + 6 errores `js`.

### Recursos {#resources}

Haga clic en la píldora {{< ui >}}Resources{{< /ui >}} para acceder a la pestaña {{< ui >}}Resources{{< /ui >}} y examinar la combinación de solicitudes y activos, incluyendo el tiempo total de duración del paso bajo {{< ui >}}Fully Loaded{{< /ui >}} y el proveedor de CDN que sirve los recursos. 

{{< img src="synthetics/browser_tests/test_results/synthetics_resources.png" alt="Detalles de la ejecución de prueba de navegador con la píldora de Recursos resaltada en cada paso, indicando dónde hacer clic para abrir la pestaña de Recursos" style="width:100%" >}}

Puede filtrar los recursos por tipo y buscar por nombre en la barra de búsqueda. El número máximo de recursos que se pueden mostrar es 100. Los recursos se ordenan por el momento en que comienzan y se muestran los primeros 100 en Datadog.

{{% collapse-content title="Columnas de la pestaña Recursos" level="h4" %}}

A continuación se describen los encabezados de columna en la pestaña {{< ui >}}Resources{{< /ui >}}:

Tiempo relativo 
: El momento en el que el recurso comenzó a cargarse durante el paso de prueba.

CDN
: El proveedor de CDN que sirvió el recurso. Pase el cursor sobre el icono de un proveedor de CDN para ver el estado de caché sin procesar.  
Datadog detecta Akamai, Cloudflare, Fastly, Amazon Cloudfront, Netlify, Google Cloud CDN, Imperva y Sucuri.

Recurso
: La URL del recurso.

Tipo
: El tipo de recurso (HTML, Descarga, CSS, Fetch, Imagen, JavaScript, XHR u Otro).

Método
: El método de la solicitud.

Protocolo
: El protocolo de la solicitud.

Estado
: El código de estado de respuesta HTTP.

Duración
: El tiempo necesario para realizar la solicitud.

Tamaño
: El tamaño de la respuesta de la solicitud.

{{% /collapse-content %}}

Para recursos Fetch y XHR, haga clic en una fila de recursos para ver sus encabezados y cuerpo de solicitud y respuesta. Los detalles de la carga útil solo están disponibles cuando {{< ui >}}Capture HTTP payloads{{< /ui >}} está habilitado en las [opciones avanzadas][28] de la prueba.

### Trazas de backend {#backend-traces}

Haga clic en la píldora {{< ui >}}Traces{{< /ui >}} para acceder a la pestaña {{< ui >}}Traces{{< /ui >}} y explorar las trazas de APM asociadas con la prueba de navegador. Aunque la interfaz de usuario es similar a la [Visualización de traza][7] en Trace Explorer, un paso de prueba de navegador puede realizar múltiples solicitudes a diferentes URL o puntos finales. Esto resulta en varias trazas asociadas, dependiendo de su configuración de traza y de las URL que permitió para las pruebas de navegador en la [página de Configuración de Synthetic Monitoring][8]. 

Para obtener más información sobre la correlación entre productos, consulte la guía [Facilite la resolución de problemas con la correlación entre productos][21].

### Duración del paso {#step-duration}

La duración del paso representa el tiempo que tarda un paso en considerarse completamente cargado utilizando el [sistema de localizadores de Datadog][9]. Para obtener más información, consulte [Cómo se determina la duración del paso en las pruebas de navegador][25].

Si su prueba alcanza el tiempo máximo de ejecución, el mensaje de tiempo de espera indica que la duración total incluye tanto los pasos de la prueba como la sobrecarga del sistema. Como resultado, la duración de la prueba reportada puede diferir de la suma de las duraciones de los pasos individuales.

{{< img src="synthetics/browser_tests/test_results/test_execution_error.png" alt="Mensaje de error de ejecución de duración de la prueba que indica 'Se alcanzó el tiempo máximo de ejecución de la prueba. Esto incluye los pasos de la prueba y la sobrecarga del sistema, por lo que la duración de la prueba reportada puede variar." style="width:90%;" >}}

## Rendimiento de la prueba {#test-performance}

En la pestaña {{< ui >}}Performance{{< /ui >}}, puede ver métricas de rendimiento agregadas en todas las ejecuciones de su prueba:

Tarjetas de - **tasa de éxito del navegador** para cada tipo de navegador (Chrome, Firefox, Edge), que muestran el porcentaje de ejecuciones de prueba exitosas en el intervalo de tiempo seleccionado.
Gráficos de - **duración promedio de la prueba por tipo de navegador** y **duración promedio de la prueba por ubicación y dispositivo**, que muestran el tiempo que tarda cada navegador, ubicación y dispositivo en completar la prueba en un intervalo de tiempo determinado.
Gráficos de - **p75 Largest Contentful Paint** y **p75 Cumulative Layout Shift**, que muestran el percentil 75 de estas [métricas de Core Web Vital][6] agregadas en todas las ejecuciones.

{{< img src="synthetics/browser_tests/synthetics_browser_graphs.png" alt="La pestaña Performance en una página de Details de prueba de navegador que muestra las tasas de éxito de Chrome, Firefox y Edge, gráficos de duración de la prueba por tipo de navegador y ubicación, y las métricas de Core Web Vital p75 LCP y CLS" style="width=80%" >}}

Dentro de una ejecución de prueba individual, [Largest Contentful Paint][2] y [Cumulative Layout Shift][3] se muestran como píldoras a la derecha de la URL de cada paso. [First Input Delay][4] está disponible como una métrica real si está utilizando [Real User Monitoring][5] para recopilar datos de usuarios reales. Para obtener más información, consulte [Monitoring Page Performance][6].

{{< img src="synthetics/browser_tests/test_results/page_performance_lab_metrics.png" alt="Métricas de laboratorio sintéticas" style="width:100%" >}}

## Propiedades de la prueba {#test-properties}

La pestaña {{< ui >}}Properties{{< /ui >}} contiene los detalles de configuración, la información de propiedad y las integraciones asociadas con su prueba. Utilice la navegación de la izquierda para cambiar entre secciones.

{{< img src="synthetics/browser_tests/synthetics_properties_tab.png" alt="La pestaña Properties en una página de Details de prueba de navegador que muestra las secciones Ownership, Execution y Monitor, con navegación a la izquierda para Continuous Testing, Parent Tests y otra configuración." style="width=80%" >}}

{{% collapse-content title="Secciones de la pestaña Properties" level="h3" %}}

A continuación se describe cada sección disponible en la pestaña {{< ui >}}Properties{{< /ui >}}:

{{< ui >}}Ownership{{< /ui >}}
: Muestra el propietario de la prueba, el editor, la fecha de creación, la fecha de última modificación, los entornos, los equipos y las etiquetas. Las pruebas también incluyen un enlace a un tablero de prueba de navegador Synthetic listo para usar.

{{< ui >}}Execution{{< /ui >}}
: Muestra la frecuencia de la prueba, las condiciones de alerta y el comportamiento de reintento.

{{< ui >}}Monitor{{< /ui >}}
: Contiene el nombre del [Synthetic test monitor][13], la prioridad, los destinatarios configurados y el mensaje de notificación.

{{< ui >}}Continuous Testing{{< /ui >}}
: Establece la [regla de ejecución][12] que se utiliza cuando esta prueba se ejecuta como parte de una [Continuous Testing CI pipeline][19].

{{< ui >}}Parent Tests{{< /ui >}}
: Enumera las pruebas que hacen referencia a esta prueba, como las pruebas de varios pasos que la incluyen como una subprueba.

{{< ui >}}Parent Suites{{< /ui >}}
: Enumera los [conjuntos de pruebas][26] a los que pertenece esta prueba.

{{< ui >}}Downtimes{{< /ui >}}
: Enumera los [tiempos de inactividad programados][27] que pausan la ejecución de esta prueba, por ejemplo, durante ventanas de mantenimiento planificadas.

{{< ui >}}Configuration as Code{{< /ui >}}
: Exporta la configuración de la prueba en formatos como Terraform para administrar pruebas como código.

{{% /collapse-content %}}

## Resultados fallidos {#failed-results}

Un resultado de prueba se considera `FAILED` si no cumple con sus aserciones o si un paso falló por otra razón. Puede solucionar ejecuciones fallidas revisando sus capturas de pantalla, verificando posibles [errores](#errors-and-warnings) a nivel de paso y consultando los [recursos][17] y [rastros de backend](#backend-traces) generados por sus pasos.

### Resúmenes de fallas de IA {#ai-failure-summaries}

Cuando una ejecución de prueba de navegador falla, Datadog genera un resumen de fallas de IA para ayudarle a identificar la causa y los siguientes pasos para la investigación. Cada resumen incluye:

- Una breve explicación de lo que falló, basada en datos de ejecución como errores de red, aserciones y capturas de pantalla.
- Una clasificación de la falla como **falla real** (un problema real con su aplicación) o **configuración incorrecta de la prueba** (un problema con la configuración de la prueba).
- Siguientes pasos sugeridos para la solución de problemas.

Los resúmenes de fallas de IA aparecen en la página de detalles de la ejecución de prueba para cualquier ejecución de prueba de navegador fallida. Considérelos como un punto de partida para la investigación, no como un análisis de causa raíz definitivo, ya que el contenido generado por LLM puede contener imprecisiones. Utilice los botones 👍 y 👎 en el resumen para compartir comentarios y ayudar a mejorar los resultados futuros.

{{< img src="synthetics/browser_tests/test_results/synthetics_ai_summaries_new.png" alt="Panel de resumen de fallas de IA en una ejecución de prueba de navegador fallida" style="width:100%" >}}

### Comparar capturas de pantalla {#compare-screenshots}

Para ayudar durante la investigación, haga clic en {{< ui >}}Compare Screenshots{{< /ui >}} para recibir capturas de pantalla comparativas del resultado fallido y de la última ejecución de prueba exitosa. La comparación le ayuda a detectar cualquier diferencia que podría haber causado que la prueba fallara.

{{< img src="synthetics/browser_tests/test_results/compare_screenshots.png" alt="Compare capturas de pantalla entre sus ejecuciones de prueba fallidas y exitosas." style="width:90%;" >}}

**Nota**: La comparación se realiza entre dos ejecuciones de prueba con la misma versión, URL de inicio, dispositivo, navegador y tipo de ejecución (programada, activación manual, CI/CD). Si no hay una ejecución de prueba previa exitosa con los mismos parámetros, no se ofrece ninguna comparación.
### Errores comunes de pruebas de navegador {#common-browser-test-errors}

`Element located but it's invisible` 
: El elemento está en la página pero no se puede hacer clic en él; por ejemplo, si otro elemento está superpuesto encima.

`Cannot locate element`
: El elemento no se puede encontrar en el HTML.

`Select did not have option`
: La opción especificada no aparece en el menú desplegable.

`Forbidden URL`
: Es probable que la prueba haya encontrado un protocolo que no es compatible. [Comuníquese con el soporte técnico][10] para obtener más detalles.

`General test failure`
: Un mensaje de error general. [Comuníquese con el soporte técnico][10] para obtener más detalles.

## Eventos de prueba {#test-events}

Las alertas de sus [Synthetic test monitors] aparecen en la línea de tiempo en la pestaña [{{< ui >}}Activity{{< /ui >}}](#test-activity), donde puede revisar los activadores de alerta, las recuperaciones y las modificaciones de las pruebas junto con el gráfico de tiempo de actividad global. Para buscar alertas de Synthetic tests en el Explorador de eventos, navegue a [{{< ui >}}Events{{< /ui >}} > {{< ui >}}Explorer{{< /ui >}}][18] e ingrese `@evt.type:synthetics_alert` en la consulta de búsqueda. Para obtener más información, consulte [Using Synthetic Test Monitors][13].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /es/real_user_monitoring/
[6]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[7]: /es/tracing/trace_explorer/trace_view/
[8]: /es/synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[9]: /es/synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator
[10]: /es/help/
[11]: /es/synthetics/dashboards/browser_test/
[12]: /es/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: /es/synthetics/guide/synthetic-test-monitors/
[14]: /es/synthetics/guide/uptime-percentage-widget/
[15]: /es/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-metrics
[16]: /es/synthetics/guide/explore-rum-through-synthetics/
[17]: /es/tracing/services/resource_page/
[18]: https://app.datadoghq.com/event/explorer
[19]: /es/continuous_testing/cicd_integrations
[20]: /es/synthetics/browser_tests/?tab=requestoptions#define-alert-conditions
[21]: /es/logs/guide/ease-troubleshooting-with-cross-product-correlation/#leverage-trace-correlation-to-troubleshoot-synthetic-tests
[22]: /es/real_user_monitoring/explorer
[23]: /es/real_user_monitoring/session_replay
[24]: /es/synthetics/browser_tests/?tab=requestoptions#fast-retry
[25]: /es/synthetics/guide/step-duration/
[26]: /es/synthetics/test_suites/
[27]: /es/synthetics/platform/downtime/
[28]: /es/synthetics/browser_tests/#advanced-options