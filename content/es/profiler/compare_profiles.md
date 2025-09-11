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
- Perfiles con un conjunto diferente de etiquetas (tags) de Datadog (por ejemplo, entorno, versión o centro de datos).

Esto te ayuda a saber si el servicio tarda más o menos tiempo, si utiliza más o menos memoria, si realiza más o menos asignaciones, si lanza más o menos excepciones, o si involucra más o menos código y llamadas que en el pasado.

## Escenarios de comparación

Las comparaciones funcionan mejor cuando la aplicación experimenta una carga de trabajo (solicitudes totales) similar a la que tenía en el pasado.

Algunos escenarios comunes para utilizar la comparación son:

- Comparar los dos últimos despliegues. Por ejemplo, comprueba si la última corrección implementada reduce el número de asignaciones de memoria que realiza tu método.

- Comparar dos periodos de tiempo distintos. Por ejemplo, calcula el consumo de CPU de hoy en comparación con el de la semana pasada. ¿Qué métodos mejoran o empeoran en términos de consumo de CPU?

- Comparar dos conjuntos diferentes de etiquetas. Por ejemplo, compara perfiles entre diferentes entornos, zonas de disponibilidad, pods, despliegues canarios u otras etiquetas de Datadog personalizadas.

## Acceso a la vista comparativa

Puedes abrir diferentes tipos de comparaciones desde distintos lugares de la interfaz de usuario.

### Comparación de un perfil con un periodo de tiempo anterior

En la vista Búsqueda del generador de perfiles, selecciona un perfil en la lista. Haz clic en **Compare** (Comparar) para abrir la vista de comparación. Por defecto, el perfil seleccionado se muestra como Perfil B. Para el Perfil A, selecciona un periodo de tiempo de agregación y etiquetas, o un ID de perfil específico.

Selecciona la métrica que quieres comparar (la lista varía en función del lenguaje del código). Esto puede ser útil, por ejemplo, para observar los picos de asignación mientras se investigan perfiles de CPU.

{{< img src="profiler/compare_time_period.mp4" alt="Abrir la vista de comparación para comparar un perfil con una agregación para un periodo de tiempo." video="true">}}

Toma nota de los colores de la leyenda, que muestran:
 - Tonos rojos más intensos para los métodos que requieren más tiempo en el Perfil B.
 - Tonos verdes más intensos para los métodos que requieren menos tiempo en el Perfil B.
 - Azul para los métodos que sólo están en el Perfil A.
 - Púrpura para los métodos que sólo están en el Perfil B.

Estos colores te ayudan a identificar cambios estructurales en tu código entre versiones, intervalos de tiempo o despliegues canarios, y cómo estos afectan al rendimiento.

{{< img src="profiler/compare_legend.png" alt="Leyenda de la comparación de perfiles." >}}

Pasa el ratón por encima de los métodos del perfil para ver métricas específicas de los métodos que están tardando más o menos tiempo, o realizando menos o más asignaciones que en el perfil comparado.

{{< img src="profiler/compare_tooltip.png" alt="Pasa el ratón por encima de un método del perfil para ver la comparación de métricas" >}}

### Comparación de versiones recientes

En la vista Agregación, selecciona un servicio para ver su perfil agregado para una métrica concreta (por ejemplo, tiempo de pared) durante el periodo de tiempo seleccionado. A continuación, haz clic en **Compare** (Comparar) para compararlo con el perfil agregado de otra versión.

{{< img src="profiler/compare_version.mp4" alt="Abrir la vista de comparación para ver dos versiones diferentes." video="true">}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}