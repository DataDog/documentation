---
algolia:
  tags:
  - página de servicios
aliases:
- /es/tracing/visualization/service/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprender a configurar el rastreo de APM con tu aplicación
- link: /tracing/service_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios que informan a Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundiza en el rendimiento de tus recursos y trazas
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Comprender cómo leer una traza de Datadog
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Añadir una URL de la página de servicios de APM a tu portapapeles
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Disfruta de visibilidad sobre riesgos, vulnerabilidades y ataques con  APM
    Security View
kind: documentación
title: Página de servicios
---

{{< img src="tracing/visualization/service/overview_service_page_1.png" alt="Página de servicios detallada" style="width:100%;">}}

## Información general

Si seleccionas un servicio en el Catálogo de servicios, accederás a la Página de servicios detallada. Un servicio es un conjunto de procesos que hacen el mismo trabajo, por ejemplo, un marco web o una base de datos (lee más sobre cómo se definen los servicios en [Empezando con APM][1]).

Puedes consultar en esta página:

* [Estado del servicio](#service-health) (fase beta privada)
* [Estados del monitor de servicio](#service-monitor)
* [Watchdog Insights](#watchdog-insights)
* [Tarjetas de resumen](#summary-cards)
* [Dependencias](#dependencies)
* [Gráficos predefinidos](#out-of-the-box-graphs)
* [Recursos asociados a este servicio][2]
* [Secciones adicionales](#additional-sections)
    *  [Despliegues](#deployments), [Rastreo de errores](#error-tracking), [Trazas](#traces), [Seguridad](#security) y más

## Estado de servicio

{{< callout header="Opt in to the private beta!" url="https://www.datadoghq.com/private-beta/service-health/" >}}
  El estado de servicio está en fase beta privada. Para solicitar acceso, rellena el formulario.
{{< /callout >}}

El panel **Service Health** (Estado del servicio) ofrece un resumen en tiempo real de las señales del servicio para que comprendas si un servicio requiere tu atención.

El Estado del servicio tiene en cuenta muchos tipos de señales (como monitores, incidencias, Watchdog Insights y problemas de rastreo de errores) y resalta las alertas más críticas. Además, el panel de Estado del servicio proporciona enlaces a las incidencias asociadas, lo que te ayuda a tomar las medidas necesarias.

{{< img src="/tracing/services/service_page/service-health.png" alt="Panel de Estado del servicio en la página de servicios que muestra una incidencia activa." style="width:100%;" >}}

Para acceder al estado de servicio:

1. Ve a [APM > Service Catalog][23] (APM > Catálogo de servicios).
2. Pasa el ratón por encima de un servicio y haz clic en **Full Page** (Página completa).
3. Selecciona **Service Health** (Estado del servicio).

El panel de Estado del servicio muestra el estado de tu servicio como *Ok*, *Warning*, o *Alert* (OK, Advertencia o Alerta) si se cumple al menos una de las siguientes condiciones:

|   Estado    |                         Condición                          |
|-------------|------------------------------------------------------------|
|  **Alerta**  | **Monitores**: <br>- Se activa un monitor de alerta P1 no silenciado.<br>- Se activa un monitor no silenciado con una configuración de integración de página (PagerDuty u Opsgenie).<br><br>**Incidencias**: <br>- Una incidencia de cualquier gravedad está activa.<br><br>**Watchdog Insights**: <br>- Un despliegue defectuoso está activo.<br>- Una alerta de latencia/tasa de error de APM en curso está activa.  |
| **Advertencia** | **Monitores**: <br>- Se activa un monitor de alerta P2 no silenciado.<br>- Se activa un monitor de advertencia P1 no silenciado.<br>- Se dispara un monitor no silenciado con una configuración de integración de página (PagerDuty u Opsgenie).<br><br>**Incidencias**: <br>- Una incidencia de cualquier gravedad se encuentra en estado estable.<br><br>**Watchdog Insights**: <br>- Una alerta de anomalía de log en curso está activa.<br><br>**Problemas de rastreo de errores**: <br>- Una incidencia nueva (en menos de 48 horas) requiere revisión. |                                                                                                                                                                                                   |
|   *Ok**    |    Ninguna señal de estado crítico o de alerta está activa.     |                                                                                                                                                                       ||

## Monitor de servicio

El panel de Monitor de servicio resalta monitores activos y tests Synthetics vinculadas a tu servicio.
Datadog también propone una lista de monitores en función de tu tipo de servicio:

{{< img src="tracing/visualization/service/service_monitors.png" alt="Monitores de servicio" style="width:90%;">}}

Habilítalos directamente o crea tus propios [monitores de APM][3].

**Nota**: Etiqueta cualquier monitor o test Synthetic con `service:<SERVICE_NAME>` para adjuntarlo a un servicio de APM.

## Watchdog Insights

El carrusel de [Watchdog Insights][7] resalta anomalías y outliers detectados en etiquetas (tags) específicas, lo que te permite investigar la causa raíz de un problema. La información se descubre a partir de APM, Continuous Profiler, Log Management y datos de infraestructura que incluyen la etiqueta del servicio. Esta información es la misma que aparece en cada una de las páginas de producto. Por ejemplo, los mismos outliers de log en la página de servicios puede encontrarse en el [Logs Explorer][19].

{{< img src="tracing/visualization/service/cross_product_insight_1.jpg" alt="Watchdog Insights" style="width:100%;">}}

Haz clic en una información para ver más detalles, como el periodo de la información, los logs o trazas (traces) relacionados y los próximos pasos sugeridos.

{{< img src="tracing/visualization/service/watchdog_details_1.jpg" alt="Detalles de Watchdog Insights" style="width:100%;">}}

## Tarjetas de resumen

La Página de servicios incluye tarjetas de resumen con información destacada sobre el estado del servicio. Detecta fácilmente posibles despliegues defectuosos, haz clic en la tarjeta para ver los detalles o trazas del último despliegue, o ver todos los despliegues en este servicio. Ve los nuevos problemas marcados en tu servicio a través de nuestra integración con el [Rastreo de errores][4], donde los errores se agregan automáticamente a problemas.

{{< img src="tracing/visualization/service/summary_cards.png" alt="Tarjetas de resumen" style="width:100%;">}}

Nuestros [Objetivos de nivel de servicio (SLOs)][5] e [Incidencias][6] te permiten monitorizar el estado de los SLOs y de las incidencias en curso, para que puedas tener siempre presentes los objetivos de rendimiento. Haz clic en las tarjetas para crear un nuevo SLO en el servicio o declarar una incidencia. El resumen de [señales de seguridad][18] destaca cómo tus servicios reaccionan ante las amenazas de las aplicaciones.

## Gráficos predefinidos

Datadog proporciona [gráficos predefinidos][8] para usar en cualquier servicio:

* Solicitudes: elige si deseas visualizar:
    *  **Total amount of requests an errors** (Número total de solicitudes y errores)
    *  La cantidad de **Requests and errors per second** (Solicitudes y errores por segundo)
* Latencia: elige si deseas visualizar:
    * **Latency** (Latencia) por versión
    * **Latency** (Latencia) por percentil (Latencia media/p75/p90/p95/p99/p99.9/máxima de tus solicitudes rastreadas) como una serie temporal
    * La **Historical Latency** (Latencia histórica) para comparar la distribución de la latencia con el día y la semana anteriores
    * La **Latency Distribution** (Distribución de la latencia) en el marco temporal seleccionado
    * La **Latency** (Latencia) por error para evaluar el impacto de la latencia de un error en las solicitudes rastreadas.
    * La **Apdex score** (Puntuación Apdex) para servicios web; [más información sobre Apdex][9]
* Error: elige si deseas visualizar:
    * **Total amount of errors** (Número total de solicitudes)
    * La cantidad de **Errors per second** (Errores por segundo)
    * **% Error Rate** (Porcentaje de error)
* Mapa de dependencias:
    * El **Dependency Map** (Mapa de dependencias) muestra los servicios de carga y descarga.
* **Subservicios**: cuando hay múltiples servicios implicados, un cuarto gráfico (en la misma opción de conmutador que el Mapa de dependencias) desglosa tu **%of time spent** (Porcentaje de tiempo empleado) de tu servicio por *servicios* o *tipo*.

  Esto representa el tiempo relativo empleado por trazas en los servicios de descarga desde el actual servicio a los otros *servicios* o *tipo*.

    **Nota**: Para servicios como *Postgres* o *Redis*, que son operaciones "finales" que no llaman a otros servicios, no hay un gráfico de subservicios.
[Watchdog][7] realiza una detección automática de anomalías en los gráficos de solicitudes, latencia y error. Si se detecta una anomalía, aparecerá una superposición en el gráfico y un icono de Watchdog sobre el que puedes hacer clic para obtener más detalles en un panel lateral.

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="Gráficos de servicio predefinidos" style="width:100%;">}}

### Exportar

En la esquina superior derecha de cada gráfico haz clic en la flecha para exportar tu gráfico a un [dashboard][10] preexistente:

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="Guardar en un dashboard" style="width:60%;">}}

## Recursos

Consulta los gráficos de solicitudes, latencia y error desglosados por recurso para identificar los recursos problemáticos. Los recursos son acciones concretas para tus servicios (normalmente endpoints o consultas individuales). Más información en [Empezando con APM][1].

A continuación, hay una lista de [recursos][11] asociados a tu servicio. Ordena los recursos de este servicio por solicitudes, latencia, errores y tiempo, para identificar áreas de alto tráfico o posibles problemas. Ten en cuenta que estas columnas de métrica son configurables (ver imagen inferior).

{{< img src="tracing/visualization/service/resources_tab_1.jpg" alt="Recursos" style="width:100%;">}}

Haz clic en un recurso para abrir un panel lateral que muestra los gráficos predefinidos del recurso (sobre solicitudes, errores y latencia), un mapa de dependencias de recursos y una tabla de resumen de tramos. Utiliza las teclas de navegación del teclado para alternar entre recursos en la lista de **Recursos** y comparar recursos en un servicio. Para ver la página de recursos completa, haz clic en **Open Full Page** (Abrir página completa).

[Para obtener más información, consulta la documentación del recurso específico][2].

### Columnas

Elige qué mostrar en tu lista de recursos:

* **Requests** (Solicitudes): cantidad absoluta de solicitudes rastreadas (por segundos)
* **Requests per second** (Solicitudes): cantidad absoluta de solicitudes rastreadas por segundos
* **Total time** (Tiempo total): suma de todo el tiempo empleado en este recurso
* **Avg/p75/p90/p95/p99/Max Latency** (Latencia media/p75/p90/p95/p99/máxima): la latencia media/p75/p90/p95/p99/máxima de tus solicitudes rastreadas.
* **Errores**: Cantidad absoluta de errores para un recurso determinado.
* **Error Rate** (Porcentaje de error): porcentaje de error de un recurso determinado

{{< img src="tracing/visualization/service/resource_columns.png" alt="Columnas de recurso" style="width:40%;">}}

## Secciones adicionales

### Despliegues
Un servicio configurado con las etiquetas de versión mostrará las versiones en la pestaña Deployment (Despliegue). La sección de versiones muestra todas las versiones del servicio que estuvieron activas durante el intervalo de tiempo seleccionado, con las versiones activas en la parte superior.

Por defecto, puedes ver:
* Los nombres de las versiones desplegadas para este servicio a lo largo del tiempo.
* Las horas a las que las trazas que corresponden a esta versión fueron vistas por primera y última vez.
* Un indicador de Error Types (Tipos de error), que muestra cuántos tipos de error aparecen en cada versión que no aparecían en la versión inmediatamente anterior.

  **Nota:** Este indicador muestra errores que no se veían en trazas de la versión anterior. No significa que esta versión haya introducido necesariamente estos errores. Buscar nuevos tipos de error puede ser una buena forma de empezar a investigar errores.

* Solicitudes por segundo.
* Porcentaje de errores sobre el total de solicitudes.

Puedes añadir o eliminar columnas de este cuadro y tus selecciones se guardarán. Las columnas adicionales disponibles son:

* Endpoints activos en una versión que no estaban en la versión anterior.
* Tiempo activo, que muestra el tiempo transcurrido desde la primera traza hasta la última traza enviada a Datadog para esa versión.
* Número total de solicitudes.
* Número total de errores.
* Latencia medida por p50, p75, p90, p95, p99 o máx.

{{< img src="tracing/visualization/service/deployments_1.png" alt="Despliegues" style="width:90%;">}}

Obtén más información sobre Despliegues [en la Página de servicios][12].

### Rastreo de errores
Ve las incidencias en tu servicio, que son errores similares agregados para convertir un flujo (stream) de errores ruidoso en incidencias manejables y te ayudan a evaluar el impacto de los errores de tu servicio. Obtén más información sobre las incidencias en [Rastreo de errores][4].

Esta pestaña tiene gráficos de información general que muestran qué recursos tienen más problemas y una lista de los problemas más comunes que ocurren en tu servicio. Haz clic en un problema en la lista para ver los detalles en un panel lateral, incluida su stack trace, las versiones de código relacionadas y el total de errores ocurridos desde el inicio.

{{< img src="tracing/visualization/service/error_tracking_side_panel_1.jpg" alt="Pestaña de Rastreo de errores" style="width:90%;">}}

### Seguridad
Comprende la postura de seguridad del servicio, incluidas las vulnerabilidades conocidas expuestas en las bibliotecas del servicio y las señales de seguridad en tu servicio, que se crean automáticamente cuando Datadog detecta ataques de aplicaciones que los afectan. Las señales identifican amenazas significativas para que las revises en lugar de evaluar cada intento de ataque individual. Obtén más información sobre [Seguridad de las aplicaciones][18].

La sección superior de la pestaña de seguridad tiene gráficos generales que muestran el número y la gravedad de las vulnerabilidades, una cronología de los ataques, los tipos de ataques y la información del atacante (IP del cliente o usuario autenticado).

La siguiente sección del panel enumera todas las vulnerabilidades y señales relativas al servicio. Haz clic en una vulnerabilidad de seguridad para abrir un panel lateral con detalles relevantes para investigar más en detalle y remediar la vulnerabilidad. Haz clic en una señal de seguridad para obtener información sobre cuál es la amenaza detectada y qué medidas puedes tomar para remediarla.

{{< img src="tracing/visualization/service/security_tab_1.jpg" alt="Seguridad" style="width:90%;">}}

### Bases de datos
Consulta la lista de las dependencias de bases de datos descendentes identificadas por Database Monitoring e identifica la latencia o outliers de carga.
[Más información sobre la conexión de DBM y APM][21].

{{< img src="tracing/visualization/service/databases_tab_1.png" alt="Bases de datos" style="width:90%;">}}

### Infraestructura
Si tu servicio se está ejecutando en Kubernetes, puedes ver una pestaña Infrastructure (Infraestructura) en la página de servicios. La tabla en vivo de Pods de Kubernetes muestra información detallada sobre tus pods, como por ejemplo si el uso de memoria está cerca de su límite, y te permite mejorar la asignación de recursos si los recursos de computación aprovisionados exceden lo necesario para un rendimiento óptimo de la aplicación.

{{< img src="tracing/visualization/service/infra_pods.png" alt="Pods de Kubernetes" style="width:90%;">}}

La sección de métricas de Kubernetes contiene un resumen muy claro del estado de tu infraestructura para el periodo seleccionado, e incluye métricas de CPU, memoria, red y disco.

{{< img src="tracing/visualization/service/infra_metrics_1.png" alt="Métricas de Kubernetes" style="width:90%;">}}

Para las instalaciones que no sean entornos de Kubernetes (como las basadas en host), consulta la [documentación del etiquetado de servicios unificado][13].

### Métricas de tiempo de ejecución
Si las métricas de tiempo de ejecución están activadas en el cliente de rastreo, verás una pestaña Runtime metrics (Métricas de rastreo) correspondiente al lenguaje del tiempo de ejecución de tu servicio. Más información en [Métricas de tiempo de ejecución][14].

{{< img src="tracing/visualization/service/runtime_metrics_1.png" alt="Métricas  de tiempo de ejecució" style="width:90%;">}}

### Elaboración de perfiles
Verás una pestaña de Profiling (Elaboración de perfiles) si [Continuous Profiler][15] está configurado para tu servicio.

Utiliza la información de la pestaña **Profiling** (Elaboración de perfiles) para correlacionar un cambio de latencia y rendimiento con un cambio de rendimiento del código.

En este ejemplo, puedes ver cómo la latencia está vinculada a un aumento de contención de bloqueos en `/GET train` que es causado por la siguiente línea de código:

```java
Thread.sleep(DELAY_BY.minus(elapsed).toMillis());
```

{{< img src="profiler/apm_service_page_pivot_to_contention_comparison_1.mp4" alt="Cambio de la página de servicios de APM a la página de comparación de Elaboración de perfiles para encontrar la línea de código que causa la latencia" video=true >}}

### Trazas
Ve la lista de trazas asociadas con el servicio en la pestaña de trazas, que ya está filtrada por tu servicio, entorno y nombre de operación. Desglosa los tramos problemáticos utilizando [facetas][16] centrales como el estado, el recurso y el tipo de error. Para obtener más información, haz clic en un tramo para ver una gráfica de llamas de su traza y más detalles.

{{< img src="tracing/visualization/service/traces_1.png" alt="Trazas" style="width:90%;">}}

### Log Patterns
Ve los patrones comunes en los logs de tu servicio y utiliza facetas como el estado en la barra de búsqueda para filtrar la lista de patrones. Haz clic en un patrón para abrir el panel lateral y ver más detalles, como qué eventos desencadenaron la cascada. Más información en [Log Patterns][17].

{{< img src="tracing/visualization/service/log_patterns_1.png" alt="Log Patterns" style="width:90%;">}}

### Costes
Visualiza el coste asociado a la infraestructura de tu servicio utilizado en la pestaña de Costes.
[Más información sobre la gestión de costes en la nube][22].

{{< img src="tracing/visualization/service/costs_tab_1.png" alt="Costes" style="width:90%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/
[2]: /es/tracing/services/resource_page/
[3]: /es/monitors/types/apm/
[4]: /es/tracing/error_tracking/
[5]: /es/service_management/service_level_objectives/
[6]: /es/service_management/incident_management/
[7]: /es/watchdog/
[8]: /es/tracing/metrics/metrics_namespace/
[9]: /es/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[10]: /es/dashboards/
[11]: /es/tracing/glossary/#resources
[12]: /es/tracing/services/deployment_tracking/#versions-deployed
[13]: /es/getting_started/tagging/unified_service_tagging/?tab=systemmetrics#non-containerized-environment
[14]: /es/tracing/metrics/runtime_metrics/
[15]: /es/profiler/
[16]: /es/tracing/trace_explorer/query_syntax/#facets
[17]: https://www.datadoghq.com/blog/log-patterns/
[18]: /es/security/application_security/how-appsec-works/
[19]: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
[21]: /es/database_monitoring/connect_dbm_and_apm/
[22]: /es/cloud_cost_management/
[23]: https://app.datadoghq.com/services