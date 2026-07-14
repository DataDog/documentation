---
description: Señala automáticamente los problemas críticos con información contextual
  y los pasos siguientes recomendados
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
- link: https://www.datadoghq.com/blog/continuous-profiler-timeline-view/
  tag: Blog
  text: Diagnostica las ineficiencias del tiempo de ejecución y del código mediante
    la vista de línea temporal del Continuous Profiler
title: Automated Analysis
---
{{< callout url="https://www.datadoghq.com/product-preview/automated-analysis/" btn_hidden="false" header="Únete a la vista previa." >}}
Automated Analysis está en vista previa.
{{< /callout >}}

## Información general
Automated Analysis detecta automáticamente los problemas de rendimiento de tus aplicaciones utilizando los datos del Continuous Profiler y proporciona información práctica para su resolución. Cuando se detecta un problema, Automated Analysis proporciona:

- Un resumen muy claro que explique el problema y por qué es importante
- Información contextual a partir de datos de perfiles (por ejemplo, métodos, paquetes o procesos afectados).
- Próximos pasos recomendados para ayudarte a resolver el problema

Esto reduce los conocimientos de creación de perfiles necesarios para identificar y resolver problemas de rendimiento en tus aplicaciones que, de otro modo, podrían pasar desapercibidos.

{{< img src="profiler/profiling_automated_analysis_detail.png" alt="La línea temporal del subproceso del Profiler que muestra la información de Excepción recibida" style="width:100%;" >}}

## Explorar la información
Accede a Automated Analysis desde el [Profile Explorer][1]. Se mostrará la siguiente información:

- En la sección **Insights** (Información) de la parte superior de la página
{{< img src="profiler/profiling_automated_analysis_section.png" alt="El cartel de Automated Analysis que muestra información detectada para un servicio dado" style="width:100%;">}}

- Dentro de una vista de gráfico de llamas
{{< img src="profiler/profiling_automated_analysis_flamegraph.png" alt="La columna de Automated Analysis que muestra información detectada para un servicio dado dentro de un gráfico de llamas" style="width:100%;">}}

- Dentro de una vista de línea temporal
{{< img src="profiler/profiling_automated_analysis_thread_timeline.png" alt="La columna de Automated Analysis que muestra información detectada para un servicio dado dentro de una línea temporal" style="width:100%;">}}

Haz clic en una información para ver un resumen muy claro que explica el problema, la información contextual de los datos de perfiles y los próximos pasos recomendados.
{{< img src="profiler/profiling_automated_analysis_detail.png" alt="Información de perfiles expandida que muestra los detalles de un problema detectado" style="width:100%;">}}

La página de Lista de información proporciona una vista centralizada de todos los problemas detectados en tus servicios. Ayuda a los equipos a comprender lo que ocurre en sus entornos, priorizar lo que hay que investigar y comprobar si los problemas recurrentes mejoran con el tiempo.

{{< img  src="profiler/profiling_automated_analysis_list_page_home.png" alt="La página de lista que muestra información detectada entre servicios" style="width:100%;">}}

Cada fila representa un tipo de información que resume:

- Servicio y tiempo de ejecución afectados
- Tipo de información (por ejemplo, GC Pauses o High Lock Contention)
- Gravedad (por ejemplo, Info o Advertencia)

Puedes filtrar la información por tiempo de ejecución, servicio o entorno para limitar la lista a la información más importante. Los equipos suelen utilizar esta vista para identificar patrones, como múltiples servicios afectados por la misma ineficiencia. Al hacer clic en una información, se abre su panel de detalles.

## Información de apoyo

Automated Analysis permite encontrar la siguientes información:

| Nombre                      | Prioridad | Descripción |
|---------------------------|----------|-------------|
| Indicadores duplicados          | Información     | Se activa si se proporcionan indicadores duplicados al tiempo de ejecución (por ejemplo, `-Xmx2g -Xmx5g`). Esto es un problema, ya que puede provocar que los cambios no tengan el efecto esperado. |
| GC explícita               | Información     | Se activa si hay llamadas a System.gc(). |
| Duración del pico de pausa de GC    | Información     | Se activa si al menos una pausa de GC tardó más de 1 segundo. |
| Configuración de GC                  | Información     | Se activa cuando se detecta una de las siguientes situaciones: GC en serie utilizada en una máquina multinúcleo, GC en paralelo en una máquina mononúcleo, se han configurado más subprocesos de GC que núcleos disponibles o se ha configurado una GC en paralelo para ejecutarse en 1 subproceso. |
| Bloqueo del encabezado de línea     | Información     | Se activa si un evento de la cola se queda atascado detrás de la actividad dada. |
| Encapsulado de valores primitivos    | Información     | Se dispara si más del 5% del tiempo de CPU se gastó haciendo conversiones de valores primitivos<>objeto. |
| Subprocesos bloqueados detectados | Advertir   | Se activa si el número máximo de subproceso bloqueados en el contexto de consulta es mayor que 0. |
| Pausas de GC                 | Advertir     | Se activa si más del 10% del tiempo se empleó en pausas de GC. |
| Opciones                   | Advertir     | Se activa si se detectan opciones no documentadas, obsoletas o no recomendadas. |
| Ajuste de la profundidad del stack tecnológico        | Advertir     | Se activa si se encuentran eventos con stack traces truncados que pueden dificultar la comprensión de los datos de perfilado. |
| Excepciones lanzadas         | Advertir     | Se activa cuando la tasa de excepciones lanzadas (capturadas y no capturadas) por minuto supera un umbral (por defecto 10K). |
| Duración pico de operación de VM | Advertir     | Se activa si una operación de VM bloqueante (o una combinación de operaciones cercanas en el tiempo) dura más de 2 segundos. Informa de los detalles de la operación con mayor duración. |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling/explorer