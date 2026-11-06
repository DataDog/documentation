---
algolia:
  tags:
  - service page
aliases:
- /es/tracing/visualization/service/
description: Descripción general completa del servicio con métricas, dependencias,
  implementaciones, Error Tracking y Security Insights.
further_reading:
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprenda a configurar el trazado de APM con su aplicación
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Descubra y catalogue los servicios que reportan a Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundice en el rendimiento y las trazas de sus recursos
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Entienda cómo leer una traza de Datadog
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Agregue una URL de página de servicio de APM a su portapapeles
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Obtenga visibilidad de los riesgos, vulnerabilidades y ataques con APM Security
    View
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: Centro de aprendizaje
  text: Introducción a las métricas y trazas de APM
- link: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
  tag: Centro de aprendizaje
  text: Diagnóstico de errores de aplicación con Datadog APM
title: Página de servicio
---
{{< img src="tracing/visualization/service/overview_service_page_1.png" alt="Página de servicio detallada" style="width:100%;">}}

## Descripción general {#overview}

Seleccionar un servicio en el Catálogo lo lleva a la página de servicio detallada. Un servicio es un conjunto de procesos que realizan el mismo trabajo; por ejemplo, un marco web o una base de datos (lea más sobre cómo se definen los servicios en [Getting Started with APM][1]).

Consulte en esta página:

* [Estado del servicio](#service-health)
* [Estados del monitor de servicio](#service-monitor)
* [Watchdog Insights](#watchdog-insights)
* [Tarjetas de resumen](#summary-cards)
{{< site-region region="ap1,us3,us5,eu,us,ap2,uk1" >}}
* [Dependencias](#dependencies)
{{< /site-region >}}
* [Gráficos predeterminados](#out-of-the-box-graphs)
* [Recursos asociados a este servicio][2]
* [Secciones adicionales](#additional-sections)
    *  [Implementaciones](#deployments), [Error Tracking](#error-tracking), [Trazas](#traces), [Security](#security) y más

## Estado del servicio {#service-health}

**El estado del servicio** proporciona un resumen en tiempo real del estado del servicio para ayudarle a identificar los servicios que necesitan atención inmediata.

El estado del servicio integra múltiples señales (monitores, incidentes y Watchdog Insights) en una sola alerta. Vea qué servicios se encuentran en un estado crítico para detectar y solucionar problemas más rápidamente.

{{< img src="/tracing/services/service_page/service-health3.png" alt="Estado del servicio en la página de servicio y en el mapa de dependencias del servicio." style="width:100%;" >}}

El estado del servicio está disponible en varios lugares de Datadog:

1. [Catálogo][23]
2. Páginas de servicio
3. Mapas de dependencias de servicios, si Watchdog detecta que un problema abarca varias dependencias de servicios.
4. Indicadores de servicio

El estado del servicio muestra el estado de su servicio como *Crítico* o *Advertencia* si se cumple al menos una de las siguientes condiciones:

|   Estado    |                         Condición                          |
|-------------|------------------------------------------------------------|
|  **Crítico**  | **Monitores**: <br>- Un monitor no silenciado con una configuración de integración de paginación (PagerDuty u Opsgenie) está en un estado `ALERT` y se activó dentro del `past 2 days`.<br><br>**Incidentes**: <br>- Un incidente de cualquier gravedad está activo.<br><br>**Watchdog Insights**: <br>- Hay una implementación defectuosa en curso.<br>- Hay una alerta de latencia/tasa de error de APM en curso.  |
| **Advertencia** | **Monitores**: <br>- Un monitor de advertencia no silenciado con una configuración de integración de paginación (PagerDuty u Opsgenie) está en un estado `WARN` y se activó dentro del `past 2 days`.<br><br>**Incidentes**: <br>- Un incidente de cualquier gravedad está estable.<br><br>**Watchdog Insights**: <br>- Hay una alerta de anomalía de registro en curso. |                                                                                                                                                                                                   |
|   **Ok**    |    No hay alertas activas del estado crítico o de advertencia.     |                                                                                                                                                                       ||

## Monitor de servicio {#service-monitor}

El panel de monitor de servicio muestra los Monitors y pruebas Synthetic activos vinculados a su servicio.
Datadog también propone una lista de Monitors según el tipo de servicio:

{{< img src="tracing/visualization/service/service_monitors.png" alt="Service Monitors" style="width:90%;">}}

Habilítelos directamente o cree sus propios [APM monitors][3].

**Nota**: Los monitores se adjuntan a un servicio de APM si `service:<SERVICE_NAME>` está etiquetado en los metadatos, incluido en la consulta del monitor o si la consulta está agrupada por servicio. También puede etiquetar cualquier prueba Synthetic con `service:<SERVICE_NAME>` para adjuntarla a un servicio de APM.

## Watchdog Insights {#watchdog-insights}

El carrusel de [Watchdog Insights][7] muestra anomalías y valores atípicos detectados en etiquetas específicas, lo que le permite investigar la causa raíz de un problema. Los hallazgos se descubren a partir de datos de APM, Continuous Profiler, Log Management e infraestructura que incluyen la etiqueta de servicio. Estos hallazgos son los mismos que aparecen en cada una de las páginas de los productos. Por ejemplo, los mismos valores atípicos de registros en la página de servicio se pueden encontrar en el [explorador de registros][19].

{{< img src="tracing/visualization/service/cross_product_insight_1.jpg" alt="Watchdog Insights" style="width:100%;">}}

Haga clic en un hallazgo para ver más detalles, como el marco de tiempo del hallazgo, registros o trazas relacionados y los siguientes pasos sugeridos.

{{< img src="tracing/visualization/service/watchdog_details_1.jpg" alt="Detalles de Watchdog Insights" style="width:100%;">}}

## Tarjetas de resumen{#summary-cards}

La página de servicio presenta tarjetas de resumen con aspectos destacados sobre el estado de su servicio. Identifique fácilmente posibles implementaciones defectuosas, haga clic en la tarjeta para ver detalles o trazas de la implementación más reciente, o vea todas las implementaciones en este servicio. Vea los nuevos problemas marcados en su servicio a través de nuestra integración con [Error Tracking][4], donde los errores se agregan automáticamente en problemas.

{{< img src="tracing/visualization/service/summary_cards.png" alt="Tarjetas de resumen" style="width:100%;">}}

Nuestros resúmenes de [Service Level Objectives (SLOs)][5] e [Incidents][6] le permiten hacer un seguimiento del estado de los SLO y los incidentes en curso, para que pueda mantener los objetivos de rendimiento presentes. Haga clic en las tarjetas para crear un nuevo SLO en su servicio o declarar un incidente. El resumen de [señales de seguridad][18] destaca cómo reaccionan sus servicios ante las amenazas a las aplicaciones.

## Gráficos predeterminados {#out-of-the-box-graphs}

Datadog proporciona gráficos predeterminados para cualquier servicio determinado. Utilice el menú desplegable sobre cada gráfico para cambiar la información mostrada.

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="Gráficos de servicio predeterminados" style="width:100%;">}}

{{% apm-ootb-graphs %}}

<div class="alert alert-tip">Cuando pase el cursor sobre un pico de latencia en el gráfico de latencia, haga clic en <strong>Investigar con Bits AI</strong> para iniciar una investigación automatizada. Bits AI analiza la divergencia de etiquetas y los cuellos de botella en las trazas afectadas. Para obtener más información, consulte <a href="/bits_ai/bits_chat/">Bits Chat</a>.</div>

### Exportar {#export}

En la esquina superior derecha de cada gráfico, haga clic en la flecha para exportar su gráfico a un [dashboard][10] preexistente:

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="Guardar en dashboard" style="width:60%;">}}

## Recursos {#resources}

Consulte los gráficos de solicitudes, latencia y errores desglosados por recurso para identificar los recursos problemáticos. Los recursos son acciones particulares para sus servicios (normalmente puntos de conexión o consultas individuales).

A continuación, hay una lista de [recursos][11] asociados con su servicio. Nota: Si el recurso representa una interfaz externa de un servicio HTTP, la lista muestra puntos de conexión en su lugar.

Ordene los recursos del servicio por solicitudes, latencia, errores o tiempo para identificar áreas de alto tráfico o posibles problemas. Puede configurar estas columnas de métricas, como se muestra en el siguiente ejemplo:

{{< img src="tracing/visualization/service/resources_tab_1.jpg" alt="Recursos" style="width:100%;">}}

Haga clic en un recurso para abrir un panel lateral que muestra los gráficos predeterminados del recurso (sobre solicitudes, errores y latencia), un mapa de dependencias de recursos y una tabla de resumen de tramo. Utilice las teclas de navegación del teclado para alternar entre los recursos en la lista {{< ui >}}Resources{{< /ui >}} y comparar recursos en su servicio. Para ver la página completa del recurso, haga clic en {{< ui >}}Open Full Page{{< /ui >}}.

[Consulte la documentación dedicada del recurso para obtener más información][2].

### Columnas {#columns}

Elija qué mostrar en su lista de recursos:

* {{< ui >}}Requests{{< /ui >}}: Cantidad absoluta de solicitudes rastreadas (por segundo)
* {{< ui >}}Requests per second{{< /ui >}}: Cantidad absoluta de solicitudes con traza por segundo
* {{< ui >}}Total time{{< /ui >}}: Suma de todo el tiempo dedicado a este recurso
* {{< ui >}}Avg/p75/p90/p95/p99/Max Latency{{< /ui >}}: La latencia promedio/p75/p90/p95/p99/máxima de sus solicitudes con traza
* {{< ui >}}Errors{{< /ui >}}: Cantidad absoluta de errores para un recurso determinado
* {{< ui >}}Error Rate{{< /ui >}}: Porcentaje de errores para un recurso determinado

{{< img src="tracing/visualization/service/resource_columns.png" alt="Columnas de recursos" style="width:40%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
## Dependencias {#dependencies}

Visualice las dependencias ascendentes y descendentes con las que interactúa el servicio desde el mapa de dependencias. El mapa funciona con [métricas de APM][1] para mostrar recuentos de solicitudes, tasas de error y cifras de latencia precisos. El mapa agrupa automáticamente las dependencias por nombre de operación. Por ejemplo, si un servicio llama a dos servicios descendentes mediante gRPC, estos servicios se agrupan. La tabla en el lado izquierdo del mapa muestra las solicitudes y las tasas de error a lo largo del tiempo, lo cual es útil para identificar dependencias con errores.

Las [dependencias de servicio inferidas][2], como bases de datos, colas o servicios de terceros, se representan con un nodo de fondo morado.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Mapa de dependencias de la página de servicio" style="width:100%;">}}

**Nota**: Las [anulaciones de servicio][3] se muestran a lo largo de los bordes (líneas de conexión) entre los nodos en el mapa de dependencias para mantener la visibilidad sobre el servicio remoto, la base de datos o la cola real con la que interactúa el servicio.

### Investigación de una dependencia de servicio específica {#investigating-a-specific-service-dependency}

Haga clic en un nodo de servicio de dependencia para investigar una de las dependencias del servicio. En el panel lateral, el recuento de solicitudes, los errores y las métricas de latencia se limitan a las solicitudes que van desde el servicio hasta la dependencia descendente.

Utilice la siguiente tabla para ver qué recursos se invocan en las llamadas de cliente desde el servicio hasta la dependencia descendente. Por ejemplo, si el servicio está llamando a una base de datos, vea el desglose de las consultas que se realizan a la base de datos y utilice la tabla para identificar consultas lentas o con errores.

{{< img src="tracing/visualization/service/dependencies_side_panel.png" alt="Mapa de dependencias de servicio de la página de servicio" style="width:100%;">}}

[1]: /es/tracing/metrics/metrics_namespace/
[2]: /es/tracing/services/inferred_services/
[3]: /es/tracing/guide/service_overrides/
{{< /site-region >}}

## Secciones adicionales {#additional-sections}

### Deployments {#deployments}
Un servicio configurado con etiquetas de versión mostrará las versiones en la pestaña Deployments. La sección de versiones muestra todas las versiones del servicio que estuvieron activas durante el intervalo de tiempo seleccionado, con las versiones activas en la parte superior.

De forma predeterminada, puede ver:
* Los nombres de las versiones implementadas para este servicio durante el periodo de tiempo.
* Los momentos en los que se vieron por primera vez y por última vez las trazas que corresponden a esta versión.
* Un indicador de Tipos de error, que muestra cuántos tipos de errores aparecen en cada versión que no aparecieron en la versión inmediatamente anterior.

    **Nota**: Este indicador muestra errores que no se vieron en las trazas de la versión anterior. Esto no significa que esta versión necesariamente haya introducido estos errores. Analizar los nuevos tipos de error puede ser una excelente manera de comenzar a investigar errores.

* Solicitudes por segundo.
* Tasa de error como porcentaje del total de solicitudes.

Puede agregar o eliminar columnas de esta tabla de resumen y sus selecciones se guardarán. Las columnas adicionales disponibles son:

* Endpoints que están activos en una versión y que no estaban en la versión anterior.
* Tiempo activo, que muestra la duración desde la primera traza hasta la última traza enviada a Datadog para esa versión.
* Número total de solicitudes.
* Número total de errores.
* Latencia medida por p50, p75, p90, p95, p99 o máxima.

{{< img src="tracing/visualization/service/deployments_1.png" alt="Deployments" style="width:90%;">}}

Lea más sobre Deployments [en la página del servicio][12].

### Error Tracking {#error-tracking}
Vea los problemas en su servicio, los cuales son errores similares agrupados para convertir un flujo ruidoso de errores en problemas manejables y ayudarle a evaluar el impacto de los errores de su servicio. Lea más sobre los problemas en [Error Tracking][4].

Esta pestaña tiene gráficos generales que muestran qué recursos tienen la mayor cantidad de problemas y una lista de los problemas más comunes que ocurren en su servicio. Haga clic en un problema de la lista para ver los detalles en un panel lateral, incluyendo su traza de pila, versiones de código relacionadas y el número total de errores desde el inicio.

{{< img src="tracing/visualization/service/error_tracking_side_panel_1.jpg" alt="Pestaña de Error Tracking" style="width:90%;">}}

### Security {#security}
Comprenda la postura de seguridad del servicio, incluyendo las vulnerabilidades conocidas expuestas en las bibliotecas del servicio y las señales de seguridad en su servicio, las cuales se crean automáticamente cuando Datadog detecta ataques a aplicaciones que afectan a sus servicios. Las señales identifican amenazas significativas para que usted las revise en lugar de evaluar cada intento de ataque individual. Lea más sobre [App and API Protection][18].

La sección superior de la pestaña de seguridad tiene gráficos generales que muestran el número y la gravedad de las vulnerabilidades, una línea de tiempo de los ataques, los tipos de ataques y la información del atacante (IP del cliente o usuario autenticado).

La siguiente sección del panel enumera todas las vulnerabilidades y señales relacionadas con el servicio. Haga clic en una vulnerabilidad de seguridad para abrir un panel lateral con detalles relevantes para investigar más a fondo y remediar la vulnerabilidad. Haga clic en una señal de seguridad para obtener información sobre cuál es la amenaza detectada y qué acciones puede tomar para remediarla.

{{< img src="tracing/visualization/service/security_tab_1.jpg" alt="Security" style="width:90%;">}}

### Bases de datos {#databases}
Vea detalles del servidor, consultas, recomendaciones y dependencias de bases de datos downstream, e identifique valores atípicos de latencia y carga.

#### Consultas {#queries}
La pestaña Consultas incluye una visualización de las duraciones de los tramos muestreados y una lista completa de consultas del intervalo de tiempo seleccionado. Seleccione una consulta de la tabla para abrir el panel de consultas y ver diagnósticos, detalles de errores y trazas.

#### Bases de datos {#databases-1}
La pestaña Bases de datos incluye visualizaciones de conexiones activas y duración promedio de consultas para ayudar a identificar valores atípicos, así como una lista completa de servidores de bases de datos para el servicio seleccionado. Seleccione un servidor de base de datos de la lista para verlo en Database Monitoring.

[Obtenga más información sobre cómo conectar DBM y APM][21].

### Infraestructura {#infrastructure}
Si su servicio se ejecuta en Kubernetes, puede ver una pestaña Infraestructura en la página del servicio. La tabla de pods de Kubernetes en vivo muestra información detallada sobre sus pods, como si el uso de memoria está cerca de su límite, y le permite mejorar la asignación de recursos al ver si los recursos de cómputo aprovisionados exceden lo requerido para un rendimiento óptimo de la aplicación.

{{< img src="tracing/visualization/service/infra_pods.png" alt="Pods de Kubernetes" style="width:90%;">}}

La sección Métricas de Kubernetes contiene un resumen de alto nivel del estado de su infraestructura para el período de tiempo seleccionado e incluye métricas de CPU, memoria, red y disco.

{{< img src="tracing/visualization/service/infra_metrics_1.png" alt="Métricas de Kubernetes" style="width:90%;">}}

Para entornos que no son de Kubernetes (como instalaciones basadas en servidor), consulte la [documentación de Unified Service Tagging][13].

### Runtime Metrics {#runtime-metrics}
Si las métricas en tiempo de ejecución están habilitadas en el cliente de traza, verá una pestaña de Runtime Metrics correspondiente al lenguaje de tiempo de ejecución de su servicio. Lea más en [Runtime Metrics][14].

{{< img src="tracing/visualization/service/runtime_metrics_1.png" alt="Runtime Metrics" style="width:90%;">}}

### Profiling {#profiling}
Verá una pestaña de Profiling si el [Continuous Profiler][15] está configurado para su servicio.

Utilice la información en la pestaña {{< ui >}}Profiling{{< /ui >}} para correlacionar un cambio en la latencia y el rendimiento con un cambio en el rendimiento del código.

En este ejemplo, puede ver cómo la latencia está vinculada a un aumento en la contención de bloqueos en `/GET train` que es causado por la siguiente línea de código:

```java
Thread.sleep(DELAY_BY.minus(elapsed).toMillis());
```

{{< img src="profiler/apm_service_page_pivot_to_contention_comparison_1.mp4" alt="Pasar de la página de servicio de APM a la página de comparación de Profiling para encontrar la línea de código que causa la latencia" video=true >}}

### Memory Leaks {#memory-leaks}
Si configura el [Continuous Profiler][15] y el servicio se ejecuta en un entorno contenedorizado, la pestaña [Memory Leaks][24] estará disponible.

Le guía a través de un flujo de trabajo para identificar posibles fugas de memoria y muestra los datos más procesables.

{{< img src="profiler/apm_service_page_memory_leaks.png" alt="Memory Leaks" style="width:90%;">}}

### Trazas {#traces}
Vea la lista de trazas asociadas con el servicio en la pestaña de trazas, la cual ya está filtrada por su servicio, entorno y nombre de operación. Analice los tramos problemáticos utilizando [facets][16] principales como estado, recurso y tipo de error. Para obtener más información, haga clic en un tramo para ver un gráfico de llama de su traza y más detalles.

{{< img src="tracing/visualization/service/traces_1.png" alt="Trazas" style="width:90%;">}}

### Patrones de registro {#log-patterns}
Vea patrones comunes en los registros de su servicio y utilice facetas como el estado en la barra de búsqueda para filtrar la lista de patrones. Haga clic en un patrón para abrir el panel lateral y ver más detalles, como qué eventos desencadenaron la cascada. Lea más en [Log patterns][17].

{{< img src="tracing/visualization/service/log_patterns_1.png" alt="Log patterns" style="width:90%;">}}

### Costos {#costs}
Visualice el costo asociado con la infraestructura de su servicio utilizada en la pestaña Costos.
[Obtenga información sobre Cloud Cost Management][22].

{{< img src="tracing/visualization/service/costs_tab_1.png" alt="Costos" style="width:90%;">}}

### Actividad de frontend {#frontend-activity}

{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="¡Únase a la vista previa!">}}
¡Únase a la vista previa de Journey monitoring para comenzar a usar la sección de Actividad de frontend!
{{< /callout >}}

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="false" header="¡Únase a la vista previa!">}}
¡Únase a la vista previa de Operations monitoring para comenzar a usar la sección de Actividad de frontend!
{{< /callout >}}

La pestaña Actividad de frontend conecta su servicio de backend con los journeys, operaciones y vistas de [Real User Monitoring (RUM)][24] que dependen de él. Úsela para comprender cómo el rendimiento de su servicio afecta la experiencia del usuario final y los resultados comerciales, como qué recorridos de usuario se ralentizan o no logran convertir cuando el servicio se degrada.

{{< img src="/tracing/services/service_page/front-end-activity.png" alt="El panel lateral de actividad de frontend que muestra detalles de servicio, recorrido, operación, uso y reproducciones de sesión relacionadas" style="width:90%;">}}

Las métricas en esta pestaña se calculan a partir de tramos indexados que están correlacionados con datos de RUM. El encabezado muestra la cantidad de tramos indexados en los que se basa la vista, junto con la proporción del total de tramos que están indexados.

#### Requisitos previos {#prerequisites}
- RUM está configurado para su aplicación de frontend.
- RUM y APM están conectados, de modo que los eventos de frontend se correlacionan con las trazas de backend de este servicio.
- Los Journey y las Operaciones de RUM están habilitados para su organización.

Para completar las métricas de Usuarios y Cuentas, sus SDK de RUM deben enviar los atributos `usr.id` y `account.id`. Sin estos atributos, las métricas de journey, operación y vista siguen estando disponibles, pero Datadog no puede atribuir la actividad a usuarios o cuentas específicos.

#### Filtrado de la vista {#filtering-the-view}

Utilice los selectores en cascada en la parte superior de la pestaña para establecer el contexto de los datos, avanzando desde la agrupación más amplia hasta la más específica:

- Journey: una secuencia de pasos que un usuario realiza en su aplicación, definida en Journey Monitoring
- Operación: una operación de usuario rastreada dentro de un Journey
- Vista: una vista de RUM individual (página o pantalla) asociada con las operaciones seleccionadas

#### Métricas de resumen {#summary-metrics}

Las tarjetas de resumen destacan el impacto agregado en el frontend para la selección actual. Cada tarjeta muestra el valor durante el marco de tiempo seleccionado y el cambio en relación con el período anterior:

- Usuarios: número de usuarios distintos (`usr.id`) activos en los journeys seleccionados.
- Cuentas: número de cuentas distintas (`account.id`) activas en los journeys seleccionados.
- Solicitudes: número de solicitudes de frontend correlacionadas con este servicio.
- Conversión promedio: tasa de conversión promedio en los journeys seleccionados.
- Latencia p95: latencia del percentil 95 experimentada por el frontend.
- Tasa de errores: porcentaje de solicitudes de frontend que resultaron en un error.

#### Enriquecimiento de Product Analytics {#product-analytics-enrichment}

Si utiliza [Product Analytics][25], la pestaña de actividad de frontend muestra detalles enriquecidos sobre los usuarios y cuentas afectados, brindándole más contexto sobre quién se ve afectado cuando el servicio se degrada y ayudándole a priorizar el trabajo por impacto en el negocio.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/
[2]: /es/tracing/services/resource_page/
[3]: /es/monitors/types/apm/
[4]: /es/tracing/error_tracking/
[5]: /es/service_level_objectives/
[6]: /es/incident_response/incident_management/
[7]: /es/watchdog/
[8]: /es/tracing/metrics/metrics_namespace/
[10]: /es/dashboards/
[11]: /es/tracing/glossary/#resources
[12]: /es/tracing/services/deployment_tracking/#versions-deployed
[13]: /es/getting_started/tagging/unified_service_tagging/?tab=systemmetrics#non-containerized-environment
[14]: /es/tracing/metrics/runtime_metrics/
[15]: /es/profiler/
[16]: /es/tracing/trace_explorer/query_syntax/#facets
[17]: https://www.datadoghq.com/blog/log-patterns/
[18]: /es/security/application_security/how-it-works/
[19]: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
[21]: /es/database_monitoring/connect_dbm_and_apm/
[22]: /es/cloud_cost_management/
[23]: https://app.datadoghq.com/services
[24]: /es/profiler/guide/solve-memory-leaks/
[25]: /es/real_user_monitoring/
[26]: /es/product_analytics/