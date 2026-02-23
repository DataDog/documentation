---
aliases:
- /es/tracing/profiler/compare_profiles/
further_reading:
- link: profiler/enabling
  tag: Documentación
  text: Activar Continuous Profiler para tu aplicación
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con Profiler
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: Blog
  text: Presentación de perfiles de producción siempre activos en Datadog
- link: https://www.datadoghq.com/blog/code-optimization-datadog-profile-comparison/
  tag: Blog
  text: Comparar y optimizar tu código con Datadog Profile Comparison
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: Blog
  text: Cómo optimizamos nuestra aplicación Akka con el Continuous Profiler de Datadog
title: Comparar perfiles
---

Continuous Profiler puede comparar dos perfiles o agregaciones de perfiles entre sí para ayudarte a identificar mejoras, regresiones y cambios estructurales en el rendimiento del código. Puedes comparar un perfil con:

- Perfiles tomados en otro momento
- Una media de los perfiles del servicio a lo largo del tiempo, o
- Perfiles con un conjunto diferente de tags (etiquetas) de Datadog (por ejemplo, entorno, versión o centro de datos).

Esto te ayuda a saber si el servicio tarda más o menos tiempo, si utiliza más o menos memoria, si realiza más o menos asignaciones, si lanza más o menos excepciones, o si involucra más o menos código y llamadas que en el pasado.

## Escenarios de comparación

Las comparaciones funcionan mejor cuando la aplicación experimenta una carga de trabajo (solicitudes totales) similar a la que tenía en el pasado.

Algunos escenarios comunes para utilizar la comparación son:

- Comparar los dos últimos despliegues. Por ejemplo, comprueba si la última corrección implementada reduce el número de asignaciones de memoria que realiza tu método.

- Comparar dos periodos de tiempo distintos. Por ejemplo, calcula el consumo de CPU de hoy en comparación con el de la semana pasada. ¿Qué métodos mejoran o empeoran en términos de consumo de CPU?

- Comparar dos conjuntos diferentes de etiquetas. Por ejemplo, compara perfiles entre diferentes entornos, zonas de disponibilidad, pods, despliegues canarios u otras etiquetas de Datadog personalizadas.

## Acceso a la vista comparativa

Puedes abrir distintos tipos de comparaciones desde distintos lugares de la interfaz de usuario.

### Comparación de distintos periodos de tiempo

Ve a **[APM > Profiles > Comparison][1]** (APM > Perfiles > Comparación) y selecciona un servicio para ver sus perfiles en dos periodos de tiempo distintos.

{{< img src="profiler/compare_time_period.mp4" alt="Abrir la vista de comparación para comparar un perfil con una agregación de dos períodos de tiempo." video="true">}}

Selecciona la métrica que desees comparar (la lista de métricas disponibles depende del lenguaje de programación). Esto te permite correlacionar distintos problemas de rendimiento, por ejemplo, mediante un check de los picos de asignación de memoria mientras investigas un perfil de CPU.

Toma nota de los colores de la leyenda, que muestran:
 - Tonos rojos más intensos para los métodos que requieren más tiempo en el Perfil B.
 - Tonos verdes más intensos para los métodos que requieren menos tiempo en el Perfil B.
 - Púrpura para los métodos que solo están en el perfil A.
 - Azul para los métodos que solo están en el perfil B.

Estos colores te ayudan a identificar cambios estructurales en tu código entre versiones, intervalos de tiempo o despliegues canarios, y cómo estos afectan al rendimiento.

{{< img src="profiler/compare_legend.png" alt="Leyenda para comparación de perfiles." >}}

Pasa el ratón por encima de los métodos del perfil para ver métricas específicas de los métodos que están tardando más o menos tiempo, o realizando menos o más asignaciones que en el perfil comparado.

{{< img src="profiler/compare_tooltip.png" alt="Pasa el ratón sobre un método en el perfil para ver la comparación de métricas" >}}


### Comparación de un perfil con un periodo anterior

Para comparar el perfil que estás viendo con otro periodo de tiempo o con un perfil específico:

1. Desde cualquier vista de perfil único, haz clic en **⇄ Compare** (⇄ Comparar) para abrir la vista de comparación.

2. La vista de comparación se abre con el perfil seleccionado como Perfil B (el objetivo de la comparación).

3. Para el Perfil A (la línea base), selecciona un período  de tiempo de agregación y tags (etiquetas) o proporciona un ID de perfil específico.

4. Selecciona la métrica que desees comparar (la lista de métricas disponibles depende del lenguaje de programación). Esto es útil para correlacionar el rendimiento, por ejemplo, mediante un check de los picos de asignación mientras se investiga un perfil de CPU.

{{< img src="profiler/compare_single_profile_traces.mp4" alt="Abrir la vista de comparación para comparar un perfil con una agregación de un período de tiempo." video="true">}}


### Comparación de versiones recientes

En la vista **Explorer**, selecciona un servicio para ver su perfil agregado para una métrica concreta (por ejemplo, tiempo de muro) en el periodo de tiempo seleccionado. A continuación, haz clic en **Compare to** (Comparar con) para compararlo con el perfil agregado de otra versión.

{{< img src="profiler/compare_version.mp4" alt="Abrir la vista de comparación para dos versiones." video="true">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling/comparison