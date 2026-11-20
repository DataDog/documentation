---
algolia:
  tags:
  - profiler
aliases:
- /es/tracing/profiling/
- /es/tracing/profiler/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /profiler/enabling
  tag: Documentación
  text: Habilite Continuous Profiler para su aplicación
- link: getting_started/profiler
  tag: Documentación
  text: Primeros pasos con Continuous Profiler
- link: profiler/profile_visualizations
  tag: Documentación
  text: Obtenga más información sobre los tipos de perfil disponibles
- link: /extend/guide/data-collection-resolution/
  tag: Documentación
  text: Recopilación y resolución de datos
- link: https://learn.datadoghq.com/courses/profiling-timeline
  tag: Centro de aprendizaje
  text: Optimice la latencia de las solicitudes con la línea de tiempo de perfilado
- link: https://www.datadoghq.com/blog/source-code-preview/
  tag: Blog
  text: Concéntrese en el código que importa con vistas previas del código fuente
    en Continuous Profiler
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: Blog
  text: Presentación del Continuous Profiler de producción siempre activo en Datadog
- link: https://www.datadoghq.com/blog/datadog-github-action-vulnerability-analysis/
  tag: Blog
  text: Acción de GitHub de Datadog para el análisis continuo de vulnerabilidades
- link: https://www.datadoghq.com/blog/code-optimization-datadog-profile-comparison/
  tag: Blog
  text: Compare y optimice su código con Datadog Profile Comparison.
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: Blog
  text: Cómo optimizamos nuestra aplicación Akka usando Continuous Profiler de Datadog
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: Blog
  text: Analice el rendimiento del código Ruby con Datadog Continuous Profiler
- link: https://www.datadoghq.com/blog/continuous-profiler-context-attributes/
  tag: Blog
  text: Cómo nuestro equipo de Cloud SIEM utiliza atributos de contexto con Continuous
    Profiler para obtener información crucial sobre el rendimiento
- link: https://www.datadoghq.com/blog/profiling-visualizations/
  tag: Blog
  text: Hacer que las visualizaciones de perfilado sean accesibles para ingenieros
    de todos los niveles
- link: https://www.datadoghq.com/blog/continuous-profiling-fourth-pillar/
  tag: Blog
  text: Por qué Continuous Profiler es el cuarto pilar de la observabilidad
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Haga un seguimiento de sus operadores de Kubernetes para mantener las aplicaciones
    funcionando sin problemas
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Resuelva problemas más rápido con la integración de GitLab Source Code en
    Datadog
title: Continuous Profiler
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/441865141/rendition/1080p/file.mp4?loc=external&signature=ebc774b892f062e45922dcae82f4ebff0a906c8ec30f34b9d77494b0051748ad" poster="/images/poster/profiler.png" >}}

<br>

Encuentre cuellos de botella de CPU, memoria y E/S, desglosados por nombre de método, nombre de clase y número de línea, para reducir significativamente la latencia del usuario final y los costos de infraestructura.

### Bajo impacto en producción {#low-impact-in-production}

Continuous Profiler se ejecuta en producción en todos los servicios mediante el uso de tecnologías como JDK Flight Recorder para tener un impacto mínimo en el uso de CPU y memoria de su servidor.

## Primeros pasos {#getting-started}

Perfilado de su servicio para visualizar todas sus trazas de pila en un solo lugar toma solo minutos.

### Instrumente su aplicación {#instrument-your-application}

{{< card-grid image_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=go" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=java&runtime=graalvm_native_image" src="integrations_logos/graalvm.png" alt="GraalVM" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=node_js" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=php" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=dot_net" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=rust" src="integrations_logos/rust.png" alt="Rust" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=c" src="integrations_logos/c.png" alt="C" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=cpp" src="integrations_logos/cpp.png" alt="C++" >}}
{{< /card-grid >}}

## Guía para usar Continuous Profiler {#guide-to-using-the-profiler}

La guía [Primeros pasos con Continuous Profiler][1] toma un servicio de muestra con un problema de rendimiento y le muestra cómo usar Continuous Profiler para comprender y solucionar el problema.

## Explore Continuous Profiler de Datadog {#explore-datadog-profiler}

Después de configurar su aplicación para enviar perfiles a Datadog, comience a obtener información sobre el rendimiento de su código.

De forma predeterminada, los gráficos de llama (flame graphs), los gráficos de llamadas y las líneas de tiempo de hilos se conservan durante ocho días, y las métricas de perfil se conservan durante un mes. Exporte un gráfico de llama a un notebook para conservarlo durante un año.

{{< learning-center-callout header="Pruebe Diagnose Code Performance Issues en el Learning Center" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/continuous-profiler-course">}}
  El Centro de aprendizaje de Datadog está lleno de cursos prácticos para ayudarle a aprender sobre este tema. Inscríbase sin costo para investigar y mejorar el rendimiento del código de la aplicación en producción con Datadog Continuous Profiler.
{{< /learning-center-callout >}}

### Tipos de perfiles {#profile-types}

Consulte [Tipos de perfiles][6] para obtener descripciones de los tipos de datos de perfil recopilados para cada lenguaje admitido.

{{< img src="profiler/profile-types2.png" alt="La lista de tipos de perfiles recopilados para aplicaciones Java" style="width:100%;" >}}

### Buscar perfiles por etiquetas {#search-profiles-by-tags}

[Use etiquetas para buscar perfiles][2] en cualquier dimensión, ya sea un servidor, servicio, versión o cualquier combinación específica.

{{< img src="profiler/search_profiles4.mp4" alt="Buscar perfiles por etiquetas" video=true >}}

### Realice un seguimiento del rendimiento de las funciones a lo largo de las implementaciones {#track-function-performance-over-deployments}

Obtenga métricas clave de servicios, como el uso máximo de CPU por método, las principales asignaciones de memoria por hilo y el uso de CPU por versión para visualizar en sus tableros.

{{< img src="profiler/profiling-metric-dashboard.mp4" alt="Agregue las métricas de perfil a sus tableros." video=true >}}

### Conecte trazas con datos de perfilado {#connect-traces-to-profiling-data}

Los procesos de aplicación que tienen habilitados tanto [APM distributed tracing][3] como Continuous Profiler se vinculan automáticamente, por lo que puede pasar directamente de la información del tramo a los datos de perfilado en la [{{< ui >}}Profiles{{< /ui >}} pestaña][4] para encontrar líneas de código específicas relacionadas con problemas de rendimiento.

{{< img src="profiler/profiles_tab.png" alt="La pestaña Profiles muestra información de perfilado para un tramo de traza de APM" >}}

### Encuentre cambios en el rendimiento comparando perfiles {#find-changes-in-performance-by-comparing-profiles}

Comparar perfiles similares de diferentes momentos, entornos o implementaciones puede ayudarle a comprender las posibles causas y soluciones a los problemas de rendimiento. El Continuous Profiler de Datadog ofrece [visualizaciones de comparación][5] para entender por qué los perfiles son diferentes según los marcos de tiempo o las etiquetas que usted defina.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/profiler/
[2]: /es/profiler/search_profiles
[3]: /es/tracing/
[4]: /es/profiler/connect_traces_and_profiles/
[5]: /es/profiler/compare_profiles/
[6]: /es/profiler/profile_types/