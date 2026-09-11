---
aliases:
- /es/tracing/profiling/search_profiles/
- /es/tracing/profiler/search_profiles/
- /es/profiler/search_profiles/
further_reading:
- link: profiler/enabling
  tag: Documentación
  text: Habilite Continuous Profiler para su aplicación
- link: getting_started/profiler
  tag: Documentación
  text: Primeros pasos con Continuous Profiler
- link: https://learn.datadoghq.com/courses/continuous-profiler-course
  tag: Centro de aprendizaje
  text: Diagnostique problemas de rendimiento del código con Continuous Profiler
- link: https://learn.datadoghq.com/courses/profiling-timeline
  tag: Centro de aprendizaje
  text: Optimice la latencia de las solicitudes con la línea de tiempo de perfilado
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: Blog
  text: Presentación del Continuous Profiler de producción siempre activo en Datadog
- link: https://www.datadoghq.com/blog/continuous-profiler-timeline-view/
  tag: Blog
  text: Diagnostique las ineficiencias del código y del tiempo de ejecución mediante
    la vista cronológica de Continuous Profiler.
- link: https://www.datadoghq.com/blog/profiling-visualizations/
  tag: Blog
  text: Visualizaciones de perfilado accesibles
title: Visualizaciones de perfilado
---
## Buscar perfiles {#search-profiles}

{{< img src="profiler/search_profiles4.mp4" alt="Buscar perfiles por etiquetas" video=true >}}

Vaya a {{< ui >}}APM{{< /ui >}} > {{< ui >}}Profiles{{< /ui >}} y seleccione un servicio para ver sus perfiles.

Puede filtrar según las etiquetas de infraestructura o las etiquetas de aplicación configuradas desde su [configuración de rastreo de entorno][1]. De forma predeterminada, están disponibles las siguientes facetas:

| Faceta   | Definición                                                                |
| ------- | ------------------------------------------------------------------------- |
| Entorno | El entorno en el que se ejecuta su aplicación (`production`, `staging`). |
| Servicio | El nombre del [servicio][2] en el que se ejecuta su código.                        |
| Versión | La versión de su código.                                                 |
| Host    | El nombre de host en el que se ejecuta su proceso perfilado.                         |
| Tiempo de ejecución | El tipo de tiempo de ejecución en el que se ejecuta el proceso perfilado (`JVM`, `CPython`).   |

## Visualizations {#visualizations}

### Flame graph {#flame-graph}

El flame graph es la visualización predeterminada para Continuous Profiler. El que aparece a continuación muestra cuánto CPU utilizó cada método y cómo se llamó a cada método. Hay otros [tipos de perfil][4] disponibles según el lenguaje.

{{< img src="profiler/profiling_viz-flamegraph2.png" alt="Un flame graph" >}}

Por ejemplo, comenzando desde la primera fila en la imagen anterior, `Thread.run()` llamó a `Thread.runWith(Object, Runnable)`, que llamó a `ThreadPoolExecutor$Worker.run()`, y así sucesivamente.

El ancho de un marco representa cuánto del total de CPU consumió. A la derecha, puede ver una lista principal {{< ui >}}CPU time by Method{{< /ui >}} que solo tiene en cuenta el tiempo propio, que es el tiempo que un método pasó en la CPU sin llamar a otro método.

De forma predeterminada, los marcos más oscuros indican un mayor uso de CPU, mientras que los marcos más claros significan un menor uso; los métodos que consumen más recursos se agrupan en el lado izquierdo del flame graph.

Los flame graphs se pueden incluir en Dashboards y Notebooks con el [Profiling Flame Graph Widget][5]. Los datos de perfilado que se exportaron a un Notebook se conservan durante un año.

### vista cronológica {#timeline-view}

La vista cronológica es equivalente al flame graph, con patrones basados en el tiempo y distribución del trabajo durante [el período de un solo perfil](#single-profile), un solo proceso en [explorador][7] y [una traza][6].

En comparación con el gráfico de llama, la vista cronológica puede ayudarle a:

- Aislar métodos con picos de actividad
- Resolver interacciones complejas entre hilos
- Mostrar la actividad del tiempo de ejecución que afectó al proceso

{{< img src="profiler/profiling_viz-timeline3.png" alt="Una línea de tiempo" >}}

Para acceder a la vista cronológica:

1. Vaya a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Profiles{{< /ui >}} > {{< ui >}}Explorer{{< /ui >}}][7].
2. Establezca la opción {{< ui >}}Visualize as{{< /ui >}} en {{< ui >}}Thread Timeline{{< /ui >}}.

Dependiendo del tiempo de ejecución y el lenguaje, los carriles de la línea de tiempo varían:

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,full_host" >}}
{{< programming-lang lang="java" >}}
Cada carril representa un **hilo**. Los hilos de un grupo común se agrupan. Puede expandir el grupo para ver los detalles de cada hilo.

Los carriles en la parte superior son actividades en tiempo de ejecución que pueden afectar el rendimiento.

Para obtener información adicional sobre cómo depurar solicitudes p95 lentas o tiempos de espera mediante la vista cronológica, consulte la publicación del blog [Understanding Request Latency with Profiling][1].

[1]: https://www.datadoghq.com/blog/request-latency-profiling/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
Consulte los [requisitos previos][1] para saber cómo habilitar esta función para Python.

Cada carril representa un **hilo**. Los hilos de un grupo común se agrupan. Puede expandir el grupo para ver los detalles de cada hilo.

[1]: /es/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Consulte los [requisitos previos][1] para saber cómo habilitar esta función para Go.

Cada carril representa una **goroutine**. Las goroutines creadas por la misma instrucción `go` se agrupan. Puede expandir el grupo para ver los detalles de cada goroutine.

Los carriles en la parte superior son actividades en tiempo de ejecución que pueden afectar el rendimiento.

Para obtener información adicional sobre cómo depurar solicitudes p95 lentas o tiempos de espera mediante la vista cronológica, consulte la publicación del blog [Debug Go Request Latency with Datadog's Profiling Timeline][2].

[1]: /es/profiler/connect_traces_and_profiles/#prerequisites
[2]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
Consulte los [requisitos previos][1] para saber cómo habilitar esta función para Ruby.

Cada carril representa un **hilo**. Los hilos de un grupo común se agrupan. Puede expandir el grupo para ver los detalles de cada hilo.

El ID del hilo se muestra como `native-thread-id (ruby-object-id)`, donde el ID del hilo nativo es `Thread#native_thread_id` (cuando está disponible) y el ID del objeto de Ruby es `Thread#object_id`.

**Nota**: La VM de Ruby o su sistema operativo podrían reutilizar los IDs de hilos nativos.

[1]: /es/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
Consulte los [requisitos previos][1] para saber cómo habilitar esta función para Node.js.

Hay un carril para el **hilo** de JavaScript.

También puede haber carriles que visualicen varios tipos de **actividad asíncrona** que consisten en solicitudes DNS y operaciones de conexión TCP. El número de carriles coincide.
la concurrencia máxima de estas actividades para que puedan visualizarse sin superposiciones.

Los carriles en la parte superior son actividades del **tiempo de ejecución** del recolector de basura que pueden añadir latencia adicional a su solicitud.

[1]: /es/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
Cada carril representa un **hilo**. Los hilos con el mismo nombre se agrupan. Puede expandir un grupo para ver los detalles de cada hilo. Tenga en cuenta que los hilos creados explícitamente por código se agrupan bajo _Managed Threads_.

Los carriles en la parte superior son actividades del tiempo de ejecución que pueden afectar el rendimiento, como la actividad de GC.

El ID del hilo se muestra como `<unique-id> [#OS-thread-id]`.

**Nota**: Es posible que su sistema operativo reutilice los ID de hilo.

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
Consulte los [requisitos previos][1] para saber cómo habilitar esta función para PHP.

Hay un carril para cada **hilo** de PHP (en PHP NTS, solo hay un carril ya que solo hay un hilo por proceso).
Las fibras que se ejecutan en este **hilo** se representan en el mismo carril.

Los carriles en la parte superior son actividades del tiempo de ejecución que pueden añadir latencia adicional a su solicitud, debido a la compilación de archivos y la recolección de basura.

[1]: /es/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}

{{< programming-lang lang="full_host" >}}
La vista cronológica no es compatible actualmente con la generación de perfiles de servidor completo.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Series temporales y tabla {#timeseries-and-table}

Para cada tiempo de ejecución, hay un amplio conjunto de métricas disponibles, que puede ver [enumeradas por series temporales][3].

### Gráfico de llamadas {#call-graph}

El gráfico de llamadas utiliza los mismos datos de generación de perfiles que los gráficos de llama, pero muestra cada método solo una vez, como un único nodo, con bordes utilizados para transmitir qué métodos se han llamado entre sí.

El grosor del borde se utiliza para mostrar el tiempo dedicado a llamar a otros métodos, mientras que el color y el tamaño indican el tiempo propio.

{{< img src="profiler/profiling_viz-callgraph.png" alt="Un gráfico de llamadas" >}}

### Single profile {#single-profile}

De forma predeterminada, los perfiles se cargan una vez por minuto. Dependiendo del lenguaje, estos procesos se perfilan entre 15 y 60 segundos.

Para ver un perfil específico, establezca la opción {{< ui >}}Visualize as{{< /ui >}} en {{< ui >}}Profile List{{< /ui >}} y haga clic en un elemento de la lista:

{{< img src="profiler/profiling_single-profile2.png" alt="Select a single profile" >}}

El encabezado contiene información asociada con su perfil, como el servicio que lo generó, o el entorno y la versión del código asociados con él.

Debajo del encabezado del perfil hay cuatro pestañas:

| Tab | Definición |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profiles | Un flame graph y una tabla resumen del perfil que está viendo. Puede cambiar entre tipos de perfil (por ejemplo, `CPU`, `Memory allocation`). |
| Insights | Un conjunto de heurísticas que sugieren posibles problemas o áreas de mejora en su código.                                                            |
| Métricas | Métricas del profiler provenientes de todos los perfiles del mismo servicio.                                                                                     |
| Info de tiempo de ejecución | Propiedades del tiempo de ejecución en lenguajes compatibles y etiquetas de perfil.                                                                                       |
| Related Processes | Procesos relacionados con el perfil.                                                                                                                  |

**Nota**: En la esquina superior derecha de cada perfil, hay opciones para:

- Compare this profile with others
- View repository commit
- View traces for the same process and time frame
- Download the profile
- Open the profile in full page

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/send_traces/#configure-your-environment
[2]: /es/tracing/glossary/#services
[3]: https://app.datadoghq.com/profiling/explorer?viz=timeseries
[4]: /es/profiler/profile_types/
[5]: /es/dashboards/widgets/profiling_flame_graph
[6]: /es/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[7]: https://app.datadoghq.com/profiling/explorer?viz=thread_timeline