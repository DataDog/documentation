---
description: Comprende las métricas de rendimiento predefinidas disponibles con RUM
  without Limits.
further_reading:
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentación
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: Documentación
  text: Filtros de retención
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guía
  text: Prácticas recomendadas para filtros de retención
title: Analizar el rendimiento con métricas
---
## Información general

{{< img src="real_user_monitoring/rum_without_limits/filters-rum-measure-view.png" alt="Visualización del porcentaje de sesiones sin caídas de la aplicación Android en cuatro semanas." style="width:90%" >}}

Datadog proporciona las siguientes métricas predefinidas para obtener una visión general del estado de la aplicación a lo largo del tiempo. Para garantizar la precisión, estas métricas se calculan antes de retener o descartar cualquier sesión. Esto significa que aunque conserves el 0,01 % de tus sesiones, estas métricas se calculan basándose en el 100 % de las sesiones ingeridas. Estas métricas son la base del [resumen de rendimiento][1] para ofrecerte una visión precisa del rendimiento de tus aplicaciones.

**Notas**:
- El conjunto de cardinalidad **Predeterminado** de la siguiente tabla incluye las siguientes dimensiones: entorno, nombre de la aplicación, ID de la aplicación, versión de la aplicación, servicio, nombre del SO, versión del SO, nombre del navegador y país.
- Todas las consultas de las siguientes métricas incluyen `@session.type:user`.
- Si necesitas métricas de rendimiento más allá de las enumeradas a continuación, puedes crear [métricas personalizadas][2] desde tus eventos de RUM. Tanto las métricas predefinidas como las personalizadas se calculan basándose en el 100 % del tráfico ingerido.

| Nombre de la métrica | Descripción | Dimensiones | Plataforma |
|-------------|-------------|------------|----------|
| `rum.measure.app.startup_time` | Tiempo de inicio de la aplicación | Por defecto, Desglose de percentiles | Solo móvil |
| `rum.measure.error` | Recuento de errores | Por defecto, Bloqueo, Nombre de la vista | Móvil y navegador |
| `rum.measure.error.anr` | Recuento de ANRs (una congelación de Android) | Por defecto, Bloqueo, Nombre de la vista | Solo móvil |
| `rum.measure.error.hang` | Recuento de caídas (una congelación de iOS) | Valor predeterminado | Solo móvil |
| `rum.measure.error.hang.duration` | Duración de las caídas (congelación de iOS) | Por defecto, Nombre de la vista | Solo móvil |
| `rum.measure.session` | Recuento de sesiones | Valor predeterminado | Móvil y navegador |
| `rum.measure.session.action` | Recuento de acciones | Valor predeterminado | Móvil y navegador |
| `rum.measure.session.crash_free` | Recuento de sesiones sin caídas | Valor predeterminado | Solo móvil |
| `rum.measure.session.error` | Recuento de errores por sesión (@session.error.count) | Por defecto, Desglose de percentiles | Móvil y navegador |
| `rum.measure.session.frustration` | Recuento de señales de frustración | Valor predeterminado | Móvil y navegador |
| `rum.measure.session.inactive` | Recuento de sesiones inactivas | Valor predeterminado | Móvil y navegador |
| `rum.measure.session.time_spent` | Duración de la sesión | Por defecto, Desglose de percentiles | Móvil y navegador |
| `rum.measure.view` | Recuento de visitas | Por defecto, Nombre de la vista | Móvil y navegador |
| `rum.measure.view.cpu_ticks_per_second` | Tics por segundo de la CPU | Por defecto, Nombre de la vista | Solo móvil |
| `rum.measure.view.crash_free` | Tasa de sesiones sin caídas | Por defecto, Nombre de la vista | Solo móvil |
| `rum.measure.view.cumulative_layout_shift` | Desplazamiento de diseño acumulativo | Por defecto, Desglose de percentiles, Nombre de la vista | Solo navegador |
| `rum.measure.view.loading_time` | Tiempo que transcurre hasta que la página está lista y no se está produciendo ninguna solicitud de red ni ninguna mutación del DOM. | Por defecto, Desglose de percentiles, Nombre de la vista | Móvil y navegador |
| `rum.measure.view.error_free` | Recuento de sesiones sin errores | Por defecto, Nombre de la vista | Móvil y navegador |
| `rum.measure.view.first_contentful_paint` | Momento en el que el navegador renderiza por primera vez cualquier texto, imagen (incluidas las imágenes de fondo), lienzo no blanco o SVG. | Por defecto, Desglose de percentiles, Nombre de la vista | Solo navegador |
| `rum.measure.view.frozen_frame` | Recuento de fotogramas congelados | Por defecto, Nombre de la vista | Solo móvil |
| `rum.measure.view.frozen_frame_free` | Recuento de vistas sin fotogramas congelados | Valor predeterminado | Solo móvil |
| `rum.measure.view.inactive` | Recuento de vistas inactivas | Por defecto, Desglose de percentiles | Móvil y navegador |
| `rum.measure.view.interaction_to_next_paint` | Duración máxima entre la interacción de un usuario con la página y la siguiente pintura.  | Por defecto, Desglose de percentiles | Solo navegador |
| `rum.measure.view.interaction_to_next_view` | Tiempo transcurrido entre la última interacción del usuario en la vista anterior y el inicio de la vista actual. | Por defecto, Desglose de percentiles | Solo móvil |
| `rum.measure.view.largest_contentful_paint` | Momento de la carga de la página en el que se renderiza el objeto DOM más grande en la ventana gráfica (visible en pantalla) | Por defecto, Desglose de percentiles, Nombre de la vista | Solo navegador |
| `rum.measure.view.memory` | Cantidad de memoria del sistema utilizada | Por defecto, Desglose de percentiles | Solo móvil |
| `rum.measure.view.network_settled` | Red establecida | Por defecto, Desglose de percentiles | Solo móvil |
| `rum.measure.view.refresh_rate` | Media de la frecuencia de actualización del usuario (FPS) | Por defecto, Desglose de percentiles | Solo móvil |
| `rum.measure.view.slow_rendered` | Recuento de vistas renderizadas lentas | Valor predeterminado | Solo móvil |
| `rum.measure.view.time_spent` | Tiempo dedicado a la vista actual | Valor predeterminado | Móvil y navegador |

## API

Las métricas pueden gestionarse a través de [APIs][3] o los [módulos de Terraform][4] dedicados de Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /es/real_user_monitoring/platform/generate_metrics/
[3]: /es/api/latest/rum-metrics/
[4]: https://registry.terraform.io/providers/DataDog/datadog/3.60.0/docs/resources/rum_metric