---
algolia:
  tags:
  - generador de perfiles
aliases:
- /es/tracing/profiling/
- /es/tracing/profiler/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /profiler/enabling
  tag: Documentación
  text: Activar Continuous Profiler para tu aplicación
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con Continuous Profiler
- link: profiler/search_profiles
  tag: Documentación
  text: Más información sobre los tipos de perfil disponibles
- link: /developers/guide/data-collection-resolution-retention/
  tag: Documentación
  text: Recopilación, resolución y conservación de datos
- link: https://www.datadoghq.com/blog/source-code-preview/
  tag: Blog
  text: Centrarse en el código importante mediante vistas previas del código fuente
    en Continuous Profiler
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: Blog
  text: Introducción de perfiles de producción siempre activos en Datadog
- link: https://www.datadoghq.com/blog/datadog-github-action-vulnerability-analysis/
  tag: Blog
  text: Acción de GitHub Datadog para el análisis continuo de vulnerabilidades
- link: https://www.datadoghq.com/blog/code-optimization-datadog-profile-comparison/
  tag: Blog
  text: Compara y optimiza tu código con Datadog Profile Comparison.
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: Blog
  text: Optimización de nuestra aplicación Akka utilizando Continuous Profiler de
    Datadog
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: Blog
  text: Analizar el rendimiento del código Ruby con Continuous Profiler de Datadog
- link: https://www.datadoghq.com/blog/continuous-profiler-context-attributes/
  tag: Blog
  text: Cómo nuestro equipo Cloud SIEM utiliza atributos de contexto con Continuous
    Profiler para obtener información crítica sobre el rendimiento
title: Continuous Profiler
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/441865141/rendition/1080p/file.mp4?loc=external&signature=ebc774b892f062e45922dcae82f4ebff0a906c8ec30f34b9d77494b0051748ad" poster="/images/poster/profiler.png" >}}

</br>

Encuentra cuellos de botella de CPU, memoria y E/S, desglosados por nombre de método, nombre de clase y número de línea, para reducir significativamente la latencia del usuario final y los costes de infraestructura.

### Bajo impacto en la producción

Continuous Profiler se ejecuta en producción en todos los servicios aprovechando tecnologías como JDK Flight Recorder para producir un impacto mínimo en el uso de CPU y memoria de tu host.

## Para empezar

Perfila tu servicio para visualizar todas tus trazas (traces) de stack tecnológico en un solo lugar en cuestión de minutos.

### Instrumentar tu solicitud

{{< partial name="profiling/profiling-languages.html" >}}

## Guía de uso del generador de perfiles

La guía [Empezando con el generador de perfiles][1] presenta un ejemplo de servicio con un problema de rendimiento y muestra como utilizar Continuous Profiler para comprender y solucionar el problema.

## Explorar el generador de perfiles de Datadog

Después de configurar tu aplicación para enviar perfiles a Datadog, comienza a obtener información sobre el rendimiento de tu código.

Por defecto, los perfiles se conservan durante siete días y las métricas generadas a partir de datos de perfiles se conservan durante un mes.

{{< learning-center-callout header="Intentar diagnosticar problemas de rendimiento en el Centro de aprendizaje" btn_title="Inscribirse ahora" btn_url="https://learn.datadoghq.com/courses/continuous-profiler-course">}}
El Centro de aprendizaje de Datadog está lleno de cursos prácticos para ayudarte a aprender sobre este tema. Inscríbete sin coste alguno para investigar y mejorar el rendimiento del código de las aplicaciones en producción con Continuous Profiler de Datadog.
{{< /learning-center-callout >}}

### Tipos de perfiles

Consulta [Tipos de perfil][6] para obtener descripciones de los tipos de datos de perfil recopilados para cada lenguaje admitido.

{{< img src="profiler/profile-types.png" alt="Lista de los tipos de perfiles recopilados para aplicaciones Java" style="width:100%;" >}}

### Buscar perfiles por etiquetas (tags)

[Utiliza etiquetas para buscar perfiles][2] en cualquier dimensión, ya sea una versión específica de host, servicio o cualquier combinación.

{{< img src="profiler/search_profiles2.mp4" alt="Buscar perfiles por etiquetas" video=true >}}

### Seguimiento del rendimiento de funciones en despliegues

Obtén métricas de perfiles clave de servicios, como el uso máximo de CPU por método, las asignaciones de memoria máximas por subproceso y el uso de CPU por versión, para visualizarlas en tus dashboards.

{{< img src="profiler/profiling-metric-dashboard.mp4" alt="Añade métricas de perfiles a tus dashboards." video=true >}}

### Conectar trazas con datos de perfiles

Los procesos de aplicación que tienen activados el [rastreo distribuido APM][3] y Continuous Profiler se vinculan automáticamente, por lo que puedes pasar directamente de la información de tramo (span) a los datos de perfiles en la [pestaña Perfiles][4] para encontrar líneas específicas de código relacionadas con problemas de rendimiento.

{{< img src="profiler/profiles_tab.png" alt="Pestaña Perfiles que muestra información sobre perfiles para un tramo de traza APM" >}}

### Buscar cambios en el rendimiento comparando perfiles

Comparar perfiles similares de diferentes momentos, entornos o despliegues puede ayudarte a entender las posibles causas y soluciones a los problemas de rendimiento. El generador de perfiles de Datadog ofrece [visualizaciones comparativas][5] para comprender por qué los perfiles son diferentes en función de los marcos temporales o las etiquetas utilizados para acotar el contexto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/profiler/
[2]: /es/profiler/search_profiles
[3]: /es/tracing/
[4]: /es/profiler/connect_traces_and_profiles/
[5]: /es/profiler/compare_profiles/
[6]: /es/profiler/profile_types/