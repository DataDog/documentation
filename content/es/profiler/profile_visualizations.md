---
aliases:
- /es/tracing/profiling/search_profiles/
- /es/tracing/profiler/search_profiles/
- /es/profiler/search_profiles/
further_reading:
- link: profiler/enabling
  tag: Documentación
  text: Activar Continuous Profiler para tu aplicación
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con Profiler
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: Blog
  text: Introducción de perfiles de producción siempre activos en Datadog
- link: https://www.datadoghq.com/blog/continuous-profiler-timeline-view/
  tag: Blog
  text: Diagnostica las ineficiencias del tiempo de ejecución y del código mediante
    la vista de línea temporal de Continuous Profiler.
title: Visualizaciones de perfiles
---

## Buscar perfiles

{{< img src="profiler/search_profiles3.mp4" alt="Buscar perfiles por etiquetas" video=true >}}

Ve a **APM -> Profiles** (APM -> Perfiles) y selecciona un servicio para ver sus perfiles. Selecciona un tipo de perfil para ver diferentes recursos (por ejemplo, CPU, Memoria, Excepción y E/S).

Puedes filtrar según etiquetas de infraestructura o etiquetas de aplicación configuradas desde tu [configuración de rastreo de entorno][1]. Por defecto están disponibles las siguientes facetas:

| Faceta   | Definición                                                                |
| ------- | ------------------------------------------------------------------------- |
| Entorno     | El entorno en el que se ejecuta tu aplicación (`production`, `staging`). |
| Servicio | El nombre del [servicio][2] en el que se ejecuta tu código.                        |
| Versión | La versión de tu código.                                                 |
| Host    | El nombre de host en el que se ejecuta tu proceso de generación de perfiles.                         |
| Tiempo de ejecución | El tipo de tiempo de ejecución que está ejecutando el proceso de generación de perfiles (`JVM`, `CPython`).   |

Existen las siguientes medidas:

| Medición                | Definición                                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU                    | Uso de la CPU, medido en núcleos.                                                                                                                                                            |
| Asignación de memoria | Tasa de asignación de memoria a lo largo del perfil. Este valor puede ser superior a la cantidad de memoria de tu sistema, ya que la memoria asignada puede recopilarse de los elementos no usados durante el perfil. |
| Tiempo de pared              | El tiempo transcurrido utilizado por el código. El tiempo transcurrido incluye el tiempo en que el código se está ejecutando en la CPU, esperando la E/S y cualquier otra cosa que ocurra mientras se está ejecutando.  |

Para cada tiempo de ejecución, también hay disponible un conjunto más amplio de métricas, que puedes consultar [ordenado por series temporales][3].

## Tipos de perfiles

En la pestaña **Profiles** (Perfiles), puedes ver todos los tipos de perfil disponibles para un lenguaje determinado. Según el lenguaje, la información recopilada sobre tu perfil difiere. Consulta [Tipos de perfil][4] para ver una lista de tipos de perfil disponibles para cada lenguaje.

## Visualizaciones

### Gráfico de llama

La gráfica de llamas es la visualización por defecto de Continuous Profiler. Muestra cuánta CPU utilizó cada método (ya que se trata de un perfil de CPU) y cómo se llamó a cada método.

{{< img src="profiler/profiling_viz-flamegraph.png" alt="Una gráfica de llamas" >}}

Por ejemplo, empezando por la primera fila de la imagen anterior, `Thread.run()` llamó a `ThreadPoolExecutor$Worker.run()`, que llamó a `ThreadPoolExecutor.runWorker(ThreadPoolExecutor$Worker)`, y así sucesivamente.

La anchura de un cuadro representa la cantidad de CPU total que ha consumido. A la derecha, puedes ver una lista principal de **Tiempo de CPU por método** que sólo tiene en cuenta el tiempo propio, que es el tiempo que un método pasó en la CPU sin llamar a otro método.

Las gráficas de llamas pueden incluirse en dashboards y notebooks con el [widget de Gráfica de llamas de generación de perfiles][5].

### Perfil único

Por defecto, los perfiles se cargan una vez por minuto. Según el lenguaje, estos procesos generan perfiles entre 15s y 60s.

Para ver un perfil concreto, establece la opción **Visualize as** (Visualizar como) en **Profile List** (Lista de perfil) y haz clic en un elemento de lista:

{{< img src="profiler/profiling_single-profile.png" alt="Seleccionar un perfil único" >}}

El encabezado contiene información asociada a tu perfil, como el servicio que lo generó, o el entorno y la versión del código asociados a él.

Debajo del encabezado del perfil hay cuatro pestañas:

| Pestaña               | Definición                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Perfiles          | Una gráfica de llamas y una tabla de resumen del perfil que estás consultando. Puedes cambiar entre tipos de perfil (por ejemplo, `CPU`, `Memory allocation`). |
| Análisis          | Un conjunto de heurísticas que sugieren posibles problemas o áreas de mejora en tu código. Sólo disponible para Java.            |
| Métricas           | Métricas del perfilador procedentes de todos los perfiles del mismo servicio.                                                                        |
| Información del tiempo de ejecución | Propiedades de tiempo de ejecución en los lenguajes admitidos y etiquetas de perfil.                                                                          |

**Nota**: En la esquina superior derecha de cada perfil, hay opciones para:

- Comparar este perfil con otros
- Ver la confirmación del repositorio
- Ver trazas para el mismo proceso y periodo
- Descargar el perfil
- Abrir el perfil en página completa

### Vista cronológica

La vista cronológica es equivalente a la gráfica de llamas, con patrones basados en el tiempo y la distribución del trabajo a lo largo del [periodo de un único perfil](#single-profile), un único proceso en el [profiling explorer][7] y [una traza][6].

En comparación con la gráfica de llamas, la vista cronológica puede ayudar a:

- Aislar los métodos con picos
- Resolver interacciones complejas entre subprocesos
- Actividad superficial en tiempo de ejecución que afectó el proceso

{{< img src="profiler/profiling_viz-timeline3.png" alt="Una cronología" >}}

Para acceder a la vista cronológica:

1. Ve a [**APM** > **Profiles** > **Explorer**][7] (APM > Perfiles > Explorador).
2. Establece la opción **Visualize as** (Visualizar como) en **Thread Timeline** (Cronología de subproceso).

Según el tiempo de ejecución y del lenguaje, las líneas cronológicas varían:

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,full_host" >}}
{{< programming-lang lang="java" >}}
Cada línea representa un **subproceso**. Los subprocesos de un grupo común se agrupan. Puedes ampliar el grupo para ver los detalles de cada subproceso.

Las líneas de la parte superior son actividades en tiempo de ejecución que pueden afectar al rendimiento.

Para obtener información adicional sobre la depuración de solicitudes p95 lentas o tiempos de espera utilizando la cronología, consulta la entrada del blog [Understanding Request Latency with Profiling][1].

[1]: https://www.datadoghq.com/blog/request-latency-profiling/
{{< /programming-lang >}}
{{< programming-lang lang="Python" >}}
Consulta [requisitos previos][1] para saber cómo activar esta función para Python.

Cada línea representa un **subproceso**. Los subprocesos de un grupo común se agrupan. Puedes ampliar el grupo para ver los detalles de cada subproceso.

[1]: /es/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Consulta [requisitos previos][1] para saber cómo activar esta función para Go.

Cada línea representa una **goroutine**. Las goroutines creadas por la misma sentencia `go` están agrupadas. Puedes expandir el grupo para ver los detalles de cada goroutine.

Las líneas de la parte superior son actividades en tiempo de ejecución que pueden afectar al rendimiento.

Para obtener información adicional sobre la depuración de solicitudes p95 lentas o tiempos de espera utilizando la cronología, consulta la entrada del blog [Debug Go Request Latency with Datadog's Profiling Timeline][2].

[1]: /es/profiler/connect_traces_and_profiles/#prerequisites
[2]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="Ruby" >}}
Consulta [requisitos previos][1] para saber cómo activar esta función para Ruby.

Cada línea representa un **subproceso**. Los subprocesos de un grupo común se agrupan. Puedes ampliar el grupo para ver los detalles de cada subproceso.

El ID del subproceso se muestra como `native-thread-id (ruby-object-id)` donde el ID del subproceso nativo es `Thread#native_thread_id` (cuando está disponible) y el ID del objeto Ruby es `Thread#object_id`.

**Nota**: La VM de Ruby o tu sistema operativo pueden reutilizar IDs de subprocesos nativos.

[1]: /es/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
Consulta [requisitos previos][1] para saber cómo activar esta función para Node.js.

Hay una línea para el **subproceso** de JavaScript.

También puede haber líneas que visualicen varios tipos de **actividad asíncrona** consistente de solicitudes DNS y operaciones de conexión TCP. El número de líneas coincide con
la concurrencia máxima de estas actividades para que puedan visualizarse sin solapamientos.

Las líneas de la parte superior son **actividades de tiempo de ejecución** del recopilador de elementos no usados que pueden añadir latencia adicional a tu solicitud.

[1]: /es/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
Cada línea representa un **subproceso**. Los subprocesos con el mismo nombre se agrupan. Puedes expandir un grupo para ver los detalles de cada subproceso. Ten en cuenta que los subprocesos creados explícitamente por código se agrupan en _Subprocesos administrados_.

Las líneas de la parte superior son actividades en tiempo de ejecución que pueden afectar al rendimiento, como actividad GC.

El ID del subproceso se muestra como `<unique-id> [#OS-thread-id]`.

**Nota**: Tu sistema operativo puede reutilizar los IDs de los subprocesos.

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
Consulta [requisitos previos][1] para saber cómo activar esta función para PHP.

Hay una línea para cada **subproceso** de PHP (en PHP NTS, sólo hay una línea, ya que sólo hay un subproceso por proceso).
Las fibras que se ejecutan en este **subproceso** se representan en la misma línea.

Las líneas de la parte superior son actividades de tiempo de ejecución que pueden añadir latencia adicional a tu solicitud, debido a la compilación de archivos y la recopilación de elementos no usados.

[1]: /es/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}

{{< programming-lang lang="full_host" >}}
La vista cronológica actualmente no es compatible con el perfilado de Full Host
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/send_traces/#configure-your-environment
[2]: /es/tracing/glossary/#services
[3]: https://app.datadoghq.com/profiling/explorer?viz=timeseries
[4]: /es/profiler/profile_types/
[5]: /es/dashboards/widgets/profiling_flame_graph
[6]: /es/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[7]: https://app.datadoghq.com/profiling/explorer?viz=thread_timeline