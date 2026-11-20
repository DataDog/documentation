---
description: Comprenda las métricas de rendimiento predeterminadas que están disponibles
  con RUM without Limits.
further_reading:
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentación
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: Documentación
  text: Filtros de retención
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: Documentación
  text: Controle los costos con cuotas de retención
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guía
  text: Prácticas recomendadas para filtros de retención
title: Analice el rendimiento con métricas
---
## Descripción general {#overview}

{{< img src="real_user_monitoring/rum_without_limits/filters-rum-measure-view.png" alt="Visualización del porcentaje de sesiones sin fallos de la aplicación Android durante cuatro semanas." style="width:90%" >}}

Datadog proporciona las siguientes métricas predeterminadas para obtener una visión general completa del estado de su aplicación a lo largo del tiempo. Para garantizar la precisión, estas métricas se calculan antes de conservar o descartar cualquier sesión. Esto significa que incluso si conserva el 0,01 % de sus sesiones, estas métricas se calculan en función del 100 % de las sesiones ingeridas. Estas métricas impulsan el [resumen de rendimiento][1] para brindarle una visión general precisa del rendimiento de sus aplicaciones.

**Notas**:
- El conjunto de cardinalidad {{< ui >}}Default{{< /ui >}} de la tabla a continuación incluye las siguientes dimensiones: entorno, nombre de la aplicación, ID de la aplicación, versión de la aplicación, servicio, nombre del SO, versión del SO, nombre del navegador y país.
- Todas las consultas para las siguientes métricas incluyen `@session.type:user`, excepto las métricas `rum.measure.lighthouse.*`, que provienen de auditorías de pruebas Synthetic del navegador en lugar de sesiones de usuarios reales. Consulte [auditorías de Lighthouse][5].
- Si necesita métricas de rendimiento más allá de las enumeradas a continuación, puede crear [métricas personalizadas][2] a partir de sus eventos de RUM. Tanto las métricas predeterminadas como las personalizadas se calculan en función del 100 % del tráfico ingerido.
- Algunas métricas se capturan cuando se detecta por primera vez una sesión o una vista. Otras se capturan cuando la sesión o la vista deja de estar activa. Comparar estas métricas en ventanas de tiempo cortas puede producir proporciones inesperadas. Consulte [Cuándo se calculan las métricas](#when-metrics-are-computed).

| Nombre de la métrica | Descripción | Dimensiones | Plataforma |
|-------------|-------------|------------|----------|
| `rum.measure.app.startup_to_full_display` | Tiempo hasta la visualización completa durante el inicio de la aplicación | Predeterminado, desglose de percentiles | Solo móvil |
| `rum.measure.app.startup_to_initial_display` | Tiempo hasta la visualización inicial durante el inicio de la aplicación | Predeterminado, desglose de percentiles | Solo móvil |
| `rum.measure.error` | Recuento de errores | Predeterminado, Is Crash, nombre de la vista | Móvil y navegador |
| `rum.measure.error.anr` | Cantidad de ANR (una aplicación de Android que no responde) | Predeterminado, Is Crash, nombre de la vista | Solo móvil |
| `rum.measure.error.hang` | Cantidad de bloqueos (un bloqueo de iOS) | Predeterminado | Solo móvil |
| `rum.measure.error.hang.duration` | Duración de los bloqueos (un bloqueo de iOS) | Predeterminado, nombre de la vista | Solo móvil |
| `rum.measure.lighthouse.performance` | Puntaje de la categoría Performance de Lighthouse (0 a 100) | App ID, nombre de la vista | Solo navegador |
| `rum.measure.lighthouse.accessibility` | Puntaje de la categoría Accessibility de Lighthouse (0 a 100) | App ID, nombre de la vista | Solo navegador |
| `rum.measure.lighthouse.best_practices` | Puntaje de la categoría Best Practices de Lighthouse (0 a 100) | App ID, nombre de la vista | Solo navegador |
| `rum.measure.lighthouse.seo` | Puntaje de la categoría SEO de Lighthouse (0 a 100) | App ID, nombre de la vista | Solo navegador |
| `rum.measure.lighthouse.agentic` | Puntaje de la categoría Agentic de Lighthouse (0 a 100) | App ID, nombre de la vista | Solo navegador |
| `rum.measure.session` | Cantidad de sesiones | Predeterminado | Móvil y navegador |
| `rum.measure.session.action` | Cantidad de acciones | Predeterminado | Móvil y navegador |
| `rum.measure.session.crash_free` | Cantidad de sesiones sin fallas | Predeterminado | Solo móvil |
| `rum.measure.session.error` | Cantidad de errores por sesión (@session.error.count) | Predeterminado, Desglose de percentiles | Móvil y navegador |
| `rum.measure.session.frustration` | Cantidad de señales de frustración | Predeterminado | Móvil y navegador |
| `rum.measure.session.inactive` | Cantidad de sesiones inactivas | Predeterminado | Móvil y navegador |
| `rum.measure.session.time_spent` | Duración de la sesión | Predeterminado, Desglose de percentiles | Móvil y navegador |
| `rum.measure.view` | Cantidad de vistas | Predeterminado, nombre de la vista | Móvil y navegador |
| `rum.measure.view.cpu_ticks_per_second` | Ticks de CPU por segundo | Predeterminado, nombre de la vista | Solo móvil |
| `rum.measure.view.crash_free` | Tasa de sesiones sin fallos | Predeterminado, nombre de la vista | Solo móvil |
| `rum.measure.view.cumulative_layout_shift` | Cumulative Layout Shift | Predeterminado, desglose de percentiles, nombre de la vista | Solo navegador |
| `rum.measure.view.loading_time` | Tiempo hasta que la página está lista y no hay ninguna solicitud de red ni mutación del DOM en curso. | Predeterminado, desglose de percentiles, nombre de la vista | Móvil y navegador |
| `rum.measure.view.error_free` | Recuento de sesiones sin errores | Predeterminado, nombre de la vista | Móvil y navegador |
| `rum.measure.view.first_contentful_paint` | Tiempo en el que el navegador renderiza por primera vez cualquier texto, imagen (incluidas las imágenes de fondo), lienzo no blanco o SVG | Predeterminado, desglose de percentiles, View Name | Solo navegador |
| `rum.measure.view.frozen_frame` | Recuento de fotogramas congelados | Predeterminado, nombre de la vista | Solo móvil |
| `rum.measure.view.frozen_frame_free` | Recuento de vistas sin fotogramas congelados | Predeterminado | Solo móvil |
| `rum.measure.view.inactive` | Recuento de vistas inactivas | Predeterminado, Desglose de percentiles | Móvil y navegador |
| `rum.measure.view.interaction_to_next_paint` | Duración más larga entre la interacción de un usuario con la página y el siguiente renderizado.  | Predeterminado, Desglose de percentiles | Solo navegador |
| `rum.measure.view.interaction_to_next_view` | Tiempo entre la última interacción del usuario en la vista anterior y el inicio de la vista actual | Predeterminado, Desglose de percentiles | Solo móvil |
| `rum.measure.view.largest_contentful_paint` | Tiempo en la carga de la página en el que se renderiza el objeto DOM más grande en el viewport (visible en pantalla) | Predeterminado, desglose de percentiles, View Name | Solo navegador |
| `rum.measure.view.memory` | Cantidad de memoria del sistema utilizada | Predeterminado, Desglose de percentiles | Solo móvil |
| `rum.measure.view.network_settled` | Network settled | Predeterminado, desglose de percentiles | Solo móvil |
| `rum.measure.view.refresh_rate` | Promedio de la frecuencia de actualización del usuario (FPS) | Predeterminado, Desglose de percentiles | Solo móvil |
| `rum.measure.view.slow_rendered` | Recuento de visualizaciones renderizadas lentamente | Predeterminado | Solo móvil |
| `rum.measure.view.time_spent` | Tiempo transcurrido en la visualización actual | Predeterminado | Móvil y navegador |

## Cuándo se calculan las métricas {#when-metrics-are-computed}

Las métricas se capturan en diferentes puntos del ciclo de vida de una sesión o vista:

- {{< ui >}}On detection{{< /ui >}}: `rum.measure.session` y `rum.measure.view` se capturan cuando se detecta una sesión o vista por primera vez.
- {{< ui >}}On inactivity{{< /ui >}}: Las métricas como `rum.measure.session.inactive`, `rum.measure.session.crash_free`, `rum.measure.view.inactive` y `rum.measure.view.crash_free` se capturan cuando una sesión o vista se vuelve inactiva (es decir, cuando finaliza la sesión o vista).

Debido a que una sesión o visualización que comienza en una ventana de tiempo puede terminar en otra, comparar, en ventanas de tiempo cortas, las métricas registradas en el momento de la detección con las registradas cuando la sesión o visualización queda inactiva puede producir resultados inesperados, incluidos valores de proporción superiores al 100 %.

Por ejemplo, si muchas sesiones del día anterior siguen activas y terminan durante el día actual, la cantidad de sesiones inactivas contadas hoy puede exceder la cantidad de sesiones que comenzaron hoy. Esto significa que una proporción como la tasa de sesiones sin fallas (`rum.measure.session.crash_free` / `rum.measure.session`) puede legítimamente devolver un valor superior al 100 %; este es un comportamiento esperado.

**Recomendación**: Al calcular proporciones que combinan métricas registradas en el momento de la detección y métricas registradas cuando una sesión o visualización queda inactiva, utilice una ventana de tiempo lo suficientemente grande como para abarcar tanto el inicio como el final de la mayoría de las sesiones (por ejemplo, una semana o más).

## API {#api}

Las métricas se pueden administrar a través de [API][3] o de los [módulos de Terraform][4] dedicados de Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /es/real_user_monitoring/platform/generate_metrics/
[3]: /es/api/latest/rum-metrics/
[4]: https://registry.terraform.io/providers/DataDog/datadog/3.60.0/docs/resources/rum_metric
[5]: /es/real_user_monitoring/application_monitoring/browser/optimizing_performance/#lighthouse-audits