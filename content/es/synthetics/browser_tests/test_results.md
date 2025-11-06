---
aliases:
- /es/synthetics/apm/browser_tests
description: Visualiza los resultados de tests del navegador Synthetic y compara las
  ejecuciones de muestra correctas o fallidas con las ejecuciones de tests.
further_reading:
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: Blog
  text: Monitorización de Core Web Vitals con la monitorización Synthetic
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: Documentación
  text: Explorar RUM y Session Replay en Synthetics
- link: /synthetics/dashboards/browser_test/
  tag: Documentación
  text: Más información sobre el dashboard de rendimiento de los tests del navegador
title: Resultados de tests del navegador
---

## Información general

Después de la ejecución de un test Synthetic, las ejecuciones de los tests aparecen en una página de detalles de tests. Los [Resultados de muestra](#sample-results) se correlacionan con las ejecuciones más recientes de tests aprobados y fallidos durante un intervalo de tiempo y en un número específico de localizaciones y dispositivos.

## Propiedades de los tests

En la sección **Propiedades**, se pueden ver el ID del test, las fechas de creación y modificación del test, una lista de etiquetas (tags), la prioridad de los tests y un vínculo a un [dashboard de tests del navegador][11] Synthetic predefinido.

**Información general** 
: Esta sección describe la URL del test, el número de localizaciones, el número de dispositivos, el intervalo de los tests y el número de pasos de los tests, incluidos los pasos personalizados.

**Monitor**
: Esta sección contiene el nombre del [monitor de tests Synthetic][13] y el mensaje de notificación configurado.

**Ejecución CI/CD**
: Esta sección contiene un menú desplegable para cambiar la [regla de ejecución][12] para la ejecución de este test como parte de un [pipeline CI de tests continuos][19].

## Historial de tests

En la sección **Historial**, puedes ver tres gráficos:

- El gráfico de **Tiempo de actividad global** muestra el tiempo total de actividad de todas las localizaciones de test durante un intervalo dado de tiempo. El tiempo de actividad global tiene en cuenta las [condiciones de alerta][20] configuradas para un test.
- El gráfico **Tiempo hasta la interactividad por localización y dispositivo** muestra la cantidad de tiempo en segundos hasta que se pueda interactuar con una página. Para obtener más información sobre la monitorización de tiempos de actividad, consulta la guía [Monitorización de tiempos de actividad de sitios web con SLOs][14].
- El gráfico **Duración de test por localización y dispositivo** muestra la cantidad de tiempo en minutos que se tarda en completar cada localización y dispositivo en un intervalo dado de tiempo. 

{{< img src="synthetics/browser_tests/history.png" alt="Sección Historial y ejecuciones de muestra, en la página de detalles de tests" style="width=80%" >}}

## Resultados de ejemplo

Las ejecuciones de tests de navegador incluyen componentes como [capturas de pantalla](#screenshots-and-actions), [datos de rendimiento de página](#page-performance), [errores](#errors-and-warnings), [recursos](#resources) y [trazas (traces) de backend](#backend-traces) para ayudar a solucionar [tests fallidos](#failed-results).

En la sección **Ejecuciones de ejemplo**, se pueden analizar las ejecuciones de tests fallidas más recientes y compararlas con ejecuciones de tests recientes superadas.

### Atributos de información general

Estado
: El estado de ejecución de tu test (`PASSED` o `FAILED`).

URL de inicio
: La URL del escenario de test del navegador.

Pasos
: El número de pasos completados en la ejecución de muestra.

Duración
: El tiempo que ha tardado la ejecución del test.

Localización
: La localización, tanto gestionada como privada, desde donde se ha ejecutado el test.

Dispositivo
: El tipo de dispositivo desde el que se ha ejecutado el test.

Navegador
: El tipo de navegador desde el que se ha ejecutado el test.

Tiempo desde ejecución
: El tiempo transcurrido desde la ejecución del test.

Tipo de ejecución
: El tipo de ejecución de test (CI, reintento rápido, activada manualmente o programada).

### Sesiones RUM

Para ver sesiones relacionadas y reproducciones disponibles en el [Explorador RUM][22], haz clic en **View Session in RUM** (Ver Sesión en RUM). Para acceder a una sesión de usuario para ver una acción o un paso específico en [Session Replay][23], haz clic en **Replay Session** (Reproducir sesión). Para obtener más información, consulta [Explorar RUM y Session Replay en Synthetic Monitoring][16].

### Capturas de pantalla y acciones

Cada paso que se ejecuta contiene una captura de pantalla de la acción del paso, un vínculo a la sesión de Session Replay, la descripción del paso, la URL de inicio para un paso dado, la ID del paso, la duración del paso y la información del rendimiento de la página.

### Rendimiento de la página

La monitorización Synthetic incluye dos métricas [Core Web Vital][6] ([Largest Contentful Paint][2] y [Cambio de Diseño Acumulativo][3]) como métricas de laboratorio y las muestra como secciones a la derecha de la URL de cada paso.

{{< img src="synthetics/browser_tests/test_results/page_performance_lab_metrics.png" alt="Métricas de laboratorio Synthetic" style="width:100%" >}}

[First Input Delay][4] está disponible como una métrica real si se estás utilizando [Real User Monitoring][5] para recopilar datos de usuarios reales. Para obtener más información, consulta [Monitorización del rendimiento de la página][6].

### Errores y advertencias

Haz clic en la sección **Errores** para acceder a la pestaña de **Errores y advertencias** y poder examinar la lista de errores agrupados por tipo de error (`js` o `network`) y estado (el código de estado de la red).

{{< img src="synthetics/browser_tests/test_results/errors_pill.png" alt="Sección Errores" style="width:100%" >}}

El tipo de error se registra cuando el test del navegador interactúa con la página. Corresponde a los errores recopilados desde el momento en que se abrió la página hasta el momento en que se puede interactuar con la página. El número máximo de errores que se pueden mostrar es 8, por ejemplo: 2 `network` + 6 `js` errores.

### Recursos

Haz clic en la sección **Recursos** para acceder a la pestaña **Recursos** y poder examinar la combinación de solicitudes y recursos, incluida la duración total del paso en **Completamente cargado** y el proveedor CDN que proporciona los recursos. 

{{< img src="synthetics/browser_tests/test_results/resources_pill.png" alt="Sección Recursos" style="width:100%" >}}

Se pueden filtrar los recursos por tipo y realizar una búsqueda por nombre en la barra de búsqueda. Se pueden mostrar un número máximo de 100 recursos. Los recursos se ordenan por la hora en que se inician y se muestran los primeros 100 en Datadog.

{{< img src="synthetics/browser_tests/resources_panel.png" alt="Panel de recursos" style="width:100%" >}}

Tiempo relativo 
: momento en el que el recurso comenzó a cargarse durante el paso de test.

CDN
: El proveedor CDN que ha proporcionado el recurso. Pasa el cursor sobre el icono de un proveedor CDN para ver el estado del cache sin procesar.
Datadog detecta Akamai, Cloudflare, Fastly, Amazon Cloudfront, Netlify, Google Cloud CDN, Imperva y Sucuri.

Recurso
: La URL del recurso.

Tipo
: El tipo de recurso (HTML, Download, CSS, Fetch, Image, JavaScript, XHR u otro).

Método
: El método de la solicitud.

Protocolo
: El protocolo de la solicitud.

Estado
: El código HTTP de estado de respuesta.

Duración
: El tiempo necesario para realizar la solicitud.

Tamaño
: El tamaño de la respuesta a la solicitud.

### Trazas de backend

Haz clic en la sección **Trazas** para acceder a la pestaña **Trazas** y poder explorar las trazas de APM asociadas al test del navegador. Aunque la interfaz de usuario es similar a la [Vista de trazas][7] en el Explorador de trazas, un paso del test de navegador puede enviar varias solicitudes a distintas URL o endpoints. El resultado son varias trazas asociadas, dependiendo de tu configuración de rastreo y de las URL que hayas autorizado en los tests de navegador en la [página de configuración de la monitorización Synthetic][8].

Para obtener más información sobre la correlación entre productos, consulta la guía [Facilitar la resolución de problemas con la correlación entre productos][21].

### Duración de los pasos

La duración de los pasos es la cantidad de tiempo que tarda el paso en ejecutarse utilizando el [sistema localizador de Datadog][9]. Además de la acción (como las interacciones del usuario), la duración del paso incluye el mecanismo de espera y reintento, lo que permite que los tests de navegador garanticen que se pueda interactuar con un elemento. Para obtener más información, consulta [Opciones avanzadas para los pasos de tests de navegador][9].

## Resultados fallidos

El resultado de un test se considera `FAILED` si no cumple las aserciones o si el paso ha fallado por alguna otra razón. Se pueden solucionar problemas de ejecuciones fallidas inspeccionando sus capturas de pantallas, buscando [errores](#errors-and-warnings) potenciales a nivel de los pasos y examinando los [recursos][17] y [trazas de backend](#backend-traces) generadas por los pasos.

### Comparar capturas de pantalla
Para obtener ayuda durante la investigación, haz clic en **Comparar capturas de pantalla** para recibir capturas de pantalla paralelas del resultado fallido y de la última ejecución exitosa. La comparación te ayudará a detectar cualquier diferencia que pueda haber provocado el fallo del test.
{{< img src="synthetics/browser_tests/test_results/compare_screenshots.png" alt="Comparar capturas de pantalla de tus ejecuciones exitosas y fallidas" style="width:90%;" >}}
**Nota**: La comparación se realiza entre dos ejecuciones de test con la misma versión, URL de inicio, dispositivo, navegador y tipo de ejecución (programada, activación manual, CI/CD). Si no hay ninguna ejecución anterior exitosa con los mismos parámetros, no se ofrece ninguna comparación.
### Errores comunes en los tests de navegador

`Element located but it's invisible` 
: El elemento está en la página pero no se puede hacer clic en él, por ejemplo, si hay otro elemento sobrepuesto.

`Cannot locate element`
: El elemento no se encuentra en el HTML.

`Select did not have option`
: La opción especificada no está en el menú desplegable.

`Forbidden URL`
: Es probable que el test haya encontrado un protocolo incompatible. Para obtener más información, [ponte en contacto con el servicio de asistencia][10].

`General test failure`
: Un mensaje general de error. Para obtener más información, [ponte en contacto con el servicio de asistencia][10].

## Eventos de tests

Las alertas de los monitores de tests Synthetic aparecen en la pestaña **Eventos** debajo de **Ejecuciones de tests**. Para realizar una búsqueda de alertas de tests Synthetic en el Explorador de eventos, ve a [**Eventos** > **Explorador**][18] e introduce `Event Type:synthetics_alert` en la consulta de búsqueda. Para obtener más información, consulta [Uso de monitores de tests Synthetic][13].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /es/real_user_monitoring/
[6]: /es/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[7]: /es/tracing/trace_explorer/trace_view/
[8]: /es/synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[9]: /es/synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator
[10]: /es/help/
[11]: /es/synthetics/dashboards/browser_test/
[12]: /es/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: /es/synthetics/guide/synthetic-test-monitors/
[14]: /es/synthetics/guide/uptime-percentage-widget/
[15]: /es/real_user_monitoring/browser/data_collected/#long-task-timing-metrics
[16]: /es/synthetics/guide/explore-rum-through-synthetics/
[17]: /es/tracing/services/resource_page/
[18]: https://app.datadoghq.com/event/explorer
[19]: /es/continuous_testing/cicd_integrations
[20]: /es/synthetics/browser_tests/?tab=requestoptions#define-alert-conditions
[21]: /es/logs/guide/ease-troubleshooting-with-cross-product-correlation/#leverage-trace-correlation-to-troubleshoot-synthetic-tests
[22]: /es/real_user_monitoring/explorer
[23]: /es/real_user_monitoring/session_replay