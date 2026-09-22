---
further_reading:
- link: profiler/enabling
  tag: Documentación
  text: Habilite Continuous Profiler para su aplicación
- link: getting_started/profiler
  tag: Documentación
  text: Primeros pasos con Continuous Profiler
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: Blog
  text: Presentación del Continuous Profiler de producción siempre activo en Datadog
- link: https://learn.datadoghq.com/courses/continuous-profiler-course
  tag: Centro de aprendizaje
  text: Diagnostique problemas de rendimiento del código con Continuous Profiler
- link: https://learn.datadoghq.com/courses/profiling-timeline
  tag: Centro de aprendizaje
  text: Optimice la latencia de las solicitudes con la línea de tiempo de perfilado
title: Tipos de perfiles
---
En la pestaña {{< ui >}}Profiles{{< /ui >}}, puede ver todos los tipos de perfiles disponibles para un lenguaje determinado. Dependiendo del lenguaje y la versión, la información recopilada sobre su perfil difiere.

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,ddprof,full_host" >}}
{{< programming-lang lang="java" >}}

Una vez habilitado Continuous Profiler, se recopilan los siguientes tipos de perfiles para [versiones de Java compatibles][1]:


CPU
: El tiempo que cada método pasó ejecutándose en la CPU. Incluye su código que se ejecuta en la JVM (por ejemplo, Java, Kotlin), pero no las operaciones de la JVM ni el código nativo llamado desde dentro de la JVM.

Asignaciones
: La cantidad de asignaciones de heap realizadas por cada método, incluidas las asignaciones que se liberaron posteriormente.<br />
_Requiere: Java 11_

Memoria asignada
: La cantidad de memoria heap asignada por cada método, incluidas las asignaciones que se liberaron posteriormente.<br />
_Requiere: Java 11_

Montón activo (v1.61.0+)
: Los objetos y la memoria asignados por cada método que aún no han sido recolectados por el recolector de basura. Esto es útil para investigar el uso general de memoria de su servicio e identificar posibles fugas de memoria. El Continuous Profiler utiliza automáticamente el motor más preciso disponible para su versión de JVM.<br />
_Requiere: Java 11+_

Tiempo de pared
: El tiempo transcurrido empleado por cada método. El tiempo transcurrido incluye el tiempo en que el código se está ejecutando en la CPU, esperando E/S y cualquier otra cosa que suceda mientras el método se está ejecutando.

Carga de clase
: La cantidad de clases cargadas por cada método.

Excepciones lanzadas
: La cantidad de errores y excepciones lanzados por cada método, así como su tipo.

E/S de archivo
: El tiempo que cada método pasó leyendo y escribiendo en archivos.

Bloqueo
: El tiempo que cada método pasó esperando un bloqueo.

E/S de socket
: El tiempo que cada método pasó leyendo y escribiendo en E/S de socket.

[1]: /es/profiler/enabling/java/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Una vez habilitado Continuous Profiler, se recopilan los siguientes tipos de perfiles, según su [versión de Python][1] como se indica:


Tiempo de pared
: El tiempo transcurrido utilizado por cada función. El tiempo transcurrido incluye el tiempo en que el código se está ejecutando en la CPU, esperando E/S y cualquier otra cosa que suceda mientras la función se está ejecutando.<br />
_Requiere: Python 2.7+_

Tiempo de espera por bloqueo
: El tiempo que cada función pasó esperando un bloqueo.<br />
_Requiere: Python 2.7+_

Tiempo de bloqueo
: El tiempo que cada función pasó manteniendo un bloqueo.<br />
_Requiere: Python 2.7+_

Adquisiciones de bloqueo
: La cantidad de veces que cada función adquirió un bloqueo.<br />
_Requiere: Python 2.7+_

Liberaciones de bloqueo
: La cantidad de veces que cada función liberó un bloqueo.<br />
_Requiere: Python 2.7+_

CPU
: El tiempo que cada función pasó ejecutándose en la CPU, incluyendo código de Python y nativo.<br />
_Requiere: Python 2.7+, plataforma POSIX_

Heap en vivo (v1.61.0+)
: La cantidad de memoria heap asignada por cada función que aún no ha sido recolectada por el recolector de basura. Esto es útil para investigar el uso general de memoria de su servicio e identificar posibles fugas de memoria.<br />
_Requiere: Python 3.5+_

Memoria asignada
: La cantidad de memoria heap asignada por cada función, incluyendo las asignaciones que fueron liberadas posteriormente.<br />
_Requiere: Python 3.5+_

Asignaciones
: El número de asignaciones de heap realizadas por cada función, incluyendo las asignaciones que fueron liberadas posteriormente.<br />
_Requiere: Python 3.5+_

[1]: /es/profiler/enabling/python/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Una vez que el perfilado está habilitado, se recopilan los siguientes tipos de perfiles para las [versiones de Go][3] compatibles:


Tiempo de CPU
: El tiempo que cada función pasó ejecutándose en la CPU. El tiempo fuera de CPU, como la espera por redes, canales, mutexes y Sleep, no se captura en este perfil. Consulte los perfiles de Mutex y Bloqueo.

Asignaciones
: La cantidad de objetos asignados por cada función en la memoria heap durante el período de perfilado (predeterminado: 60s), incluyendo las asignaciones que fueron liberadas posteriormente. Go llama a esto `alloc_objects`. Las asignaciones de pila no se rastrean. Esto es útil para investigar la carga de recolección de basura. Consulte también la nota sobre cómo cambia esta medida en la versión `1.33.0` en [Perfiles delta](#delta-profiles).

Memoria asignada
: La cantidad de memoria heap asignada por cada función durante el período de perfilado (predeterminado: 60s), incluyendo las asignaciones que fueron liberadas posteriormente. Go llama a esto `alloc_space`. Las asignaciones de pila no se rastrean. Esto es útil para investigar la carga de recolección de basura. Consulte también la nota sobre cómo cambia esta medida en la versión `1.33.0` en [Perfiles delta](#delta-profiles).

Objetos en uso en la memoria heap
: La cantidad de objetos asignados por cada función en la memoria heap que permanecen en uso después de la recolección de basura. Go llama a esto `inuse_objects`. Esto es útil para investigar el uso general de memoria de su servicio e identificar posibles fugas de memoria.

Heap en vivo (v1.61.0+)
: La cantidad de memoria heap asignada por cada función que permanece en uso después de la recolección de basura. Bajo la configuración predeterminada (GOGC=100), esto representará típicamente ~50% del uso de RSS del proceso. Go llama a esto `inuse_space`. Utilice esta métrica para revisar el consumo de memoria y [diagnosticar fugas][4]. Para obtener más detalles sobre cómo Go gestiona la memoria, consulte [Métricas de memoria de Go desmitificadas][5] y [Una guía para el recolector de basura de Go][6].

Mutex
: El tiempo que las funciones han estado esperando en mutex durante el período de perfilado (predeterminado: 60s). Los seguimientos de pila en este perfil apuntan a la operación `Unlock()` que permitió que otra goroutine bloqueada en el mutex continuara. Las contenciones de mutex cortas que utilizan spinlocks no son capturadas por este perfil, pero pueden verse en el perfil de CPU. Consulte también la nota sobre cómo cambia esta medida en la versión `1.33.0` en [Perfiles delta](#delta-profiles).

Bloqueo
: El tiempo que las funciones han estado esperando en mutex y operaciones de canal durante el período de perfilado (predeterminado: 60s). Las operaciones de Sleep, GC, red y llamadas al sistema no son capturadas por este perfil. Las operaciones de bloqueo solo se capturan después de que se desbloquean, por lo que este perfil no se puede utilizar para depurar aplicaciones que parecen estar bloqueadas. Para las contenciones de mutex, los seguimientos de pila en este perfil apuntan a operaciones `Lock()` bloqueadas. Esto le indica dónde se está bloqueando su programa, mientras que el perfil de mutex le indica qué parte de su programa está causando la contención. Consulte la investigación de Datadog sobre [Perfilado de bloques en Go][1] para obtener información más detallada. Consulte también la nota sobre cómo cambia esta medida en la versión `1.33.0` en [Perfiles delta](#delta-profiles). **Nota**: El perfilador de bloques puede causar una sobrecarga notable para las cargas de trabajo de producción. Si lo habilita en producción, prefiera tasas altas (como `100000000`, que son 100 milisegundos) y busque signos de mayor latencia o utilización de CPU.

Goroutines
: Una instantánea del número de goroutines que ejecutan actualmente las mismas funciones (tanto en la CPU como esperando fuera de la CPU). Un número creciente de goroutines entre instantáneas puede indicar que el programa está filtrando goroutines. En la mayoría de las aplicaciones saludables, este perfil está dominado por grupos de trabajadores y la cantidad de goroutines que utilizan. Las aplicaciones que son extremadamente sensibles a la latencia y utilizan una gran cantidad de goroutines (> 10,000) deben tener en cuenta que habilitar este perfil requiere pausas de "stop-the-world". Las pausas ocurren solo una vez cada período de generación de perfiles (60s por defecto) y normalmente duran alrededor de `1µsec` por goroutine. Las aplicaciones típicas con un SLO de latencia p99 de alrededor de `100ms` generalmente pueden ignorar esta advertencia. Consulte la investigación de Datadog sobre [Generación de perfiles de Goroutine en Go][2] para obtener información más detallada.

#### Perfiles delta {#delta-profiles}
<div class="alert alert-info">En versiones del profiler de Go anteriores a <code>1.33.0</code>, las métricas de Asignaciones, Memoria asignada, Mutex y Bloqueo se muestran como medidas <em>acumuladas desde que se inició el proceso</em>, en lugar de <em>durante el período de generación de perfiles</em>. El cambio a perfiles delta en la versión <code>1.33.0</code> le permite ver cómo cambian estas medidas en lugar de acumularse. La generación de perfiles delta está activada de forma predeterminada. Versión del profiler <code>1.35.0</code> le permite deshabilitar los perfiles delta usando la <code>WithDeltaProfiles</code> opción. <br/><br/>A partir de la versión del profiler <code>1.37.0</code>, los perfiles acumulados ya no se cargan cuando la generación de perfiles delta está habilitada para reducir el uso de ancho de banda de carga. <a href="/help/">Comuníquese con el equipo de soporte</a> para analizar su caso de uso si depende de los perfiles acumulados completos.</div>


[1]: https://github.com/DataDog/go-profiler-notes/blob/main/block.md
[2]: https://github.com/DataDog/go-profiler-notes/blob/main/goroutine.md
[3]: /es/profiler/enabling/go#requirements
[4]: /es/profiler/guide/solve-memory-leaks
[5]: https://www.datadoghq.com/blog/go-memory-metrics/
[6]: https://go.dev/doc/gc-guide
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Una vez habilitada la generación de perfiles, se recopilan los siguientes tipos de perfil para [versiones de Ruby compatibles][1]:

CPU
: El tiempo que cada función pasó ejecutándose en la CPU, incluyendo Ruby y código nativo.

Tiempo de pared
: El tiempo transcurrido utilizado por cada función. El tiempo transcurrido incluye el tiempo en que el código se ejecuta en la CPU, espera por E/S y cualquier otra cosa que suceda mientras la función se está ejecutando.

Asignaciones (v2.3.0+)
: La cantidad de objetos asignados por cada método durante el período de perfilado (predeterminado: 60s), incluidas las asignaciones que se liberaron posteriormente. Esto es útil para investigar la carga de la recolección de basura.<br />
_Requiere:_ [Habilitación manual][2]

Objetos vivos en heap (Vista previa, v2.18.0+)
: La cantidad de objetos asignados por cada método en la memoria del montón que aún no han sido recolectados por el recolector de basura. Esto es útil para investigar el uso general de memoria de su servicio e identificar posibles fugas de memoria.<br />
_Requiere: Ruby 3.1+_ y [habilitación manual][2]

Tamaño de objetos vivos en heap (Vista previa, v2.18.0+)
: La cantidad de memoria del montón asignada por cada método que aún no ha sido recolectada por el recolector de basura. Esto es útil para investigar el uso general de memoria de su servicio e identificar posibles fugas de memoria.<br />
_Requiere: Ruby 3.1+_ y [habilitación manual][2] (Actualmente no es compatible con Ruby 4)

Generación de perfiles de GVL (en Línea de tiempo) (v2.11.0+)
: Registra el tiempo en que se impide que los hilos trabajen debido a otros hilos de "vecinos ruidosos", incluidos los hilos en segundo plano. Esto es útil para investigar picos de latencia en la aplicación al usar la visualización de línea de tiempo.<br />
_Requiere: Ruby 3.2+_

[1]: /es/profiler/enabling/ruby/#requirements
[2]: /es/profiler/enabling/ruby/#configuration
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Una vez habilitada la generación de perfiles, se recopilan los siguientes tipos de perfil para [versiones de Node.js compatibles][1]:

CPU
: El tiempo que cada función pasó ejecutándose en la CPU, incluido el código JavaScript y el código nativo.<br />
: La generación de perfiles de CPU está disponible en Linux y macOS. La función no está disponible en Windows.

Tiempo de pared
: El tiempo transcurrido utilizado por cada función. El tiempo transcurrido incluye el tiempo en que el código se ejecuta en la CPU, espera por E/S y cualquier otra cosa que suceda mientras la función se está ejecutando.

Objetos en uso en la memoria heap
: La cantidad de objetos asignados por cada función en la memoria del montón que aún no han sido recolectados por el recolector de basura. Esto es útil para investigar el uso general de memoria de su servicio e identificar posibles fugas de memoria.

Heap en vivo (v1.61.0+)
: La cantidad de memoria del montón asignada por cada función que aún no ha sido recolectada por el recolector de basura. Esto es útil para investigar el uso general de memoria de su servicio e identificar posibles fugas de memoria.
: Los seguimientos de pila profundos en los perfiles de tamaño de montón activo se truncan a 64 marcos.

Memoria asignada (Vista previa)
: La cantidad de memoria del montón asignada por cada función, incluidas las asignaciones que fueron liberadas posteriormente.<br />
_Requiere: Node.js 26+ y `DD_PROFILING_ALLOCATION_ENABLED=true`_

Asignaciones (Vista previa)
: El número de asignaciones de heap realizadas por cada función, incluyendo las asignaciones que fueron liberadas posteriormente.<br />
_Requiere: Node.js 26+ y `DD_PROFILING_ALLOCATION_ENABLED=true`_

[1]: /es/profiler/enabling/nodejs/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Una vez habilitada la generación de perfiles, se recopilan los siguientes tipos de perfil para [versiones de .NET compatibles][1]:

Tiempo de pared
: El tiempo transcurrido en métodos administrados. El tiempo transcurrido incluye el tiempo en que el código se está ejecutando en la CPU, esperando E/S y cualquier otra cosa que suceda mientras el método se está ejecutando.

CPU (v2.15+)
: El tiempo que cada método pasó ejecutándose en la CPU.

Excepciones lanzadas (v2.31+)
: La cantidad de excepciones capturadas o no capturadas generadas por cada método, así como su tipo y mensaje.

Asignaciones (v3.28+)
: La cantidad y el tamaño de los objetos asignados por cada método, así como su tipo.
Para .NET Framework, el tamaño no está disponible.<br />
_Requiere: .NET Framework (con Datadog Agent 7.51+ y v3.2+) / .NET 6+, pero Datadog recomienda .NET 10+ para un muestreo más preciso.

Bloqueo (v2.49+)
: La cantidad de veces que los hilos esperan por un bloqueo y durante cuánto tiempo.<br />
_Requiere: .NET Framework (requiere Datadog Agent 7.51+) / .NET 5+_

Montón activo (v3.28+)
: Un subconjunto de los objetos asignados (con su nombre de clase) que aún están en la memoria.<br />
_Requiere: .NET 7+ pero Datadog recomienda .NET 10+ para un muestreo más preciso.

Solicitudes HTTP salientes (en Línea de tiempo) (Vista previa, v3.19+)
: Inicio y fin de las solicitudes HTTP salientes con la duración de las diferentes fases (DNS, enlace de seguridad, socket, solicitud/respuesta) y posibles redirecciones inesperadas.<br />
_Requiere: .NET 7+_

Duración del hilo (en la línea de tiempo) (v3.19+)
: Inicio y fin de la vida útil de los hilos para detectar fácilmente el agotamiento del ThreadPool y los hilos de corta duración.<br />
_Requiere: .NET Framework (con Datadog Agent 7.51+ y v3.2+) / .NET 5+_

Consumo de CPU del recolector de basura (v3.19+)
: El tiempo que los hilos del recolector de basura pasaron ejecutándose en la CPU.<br />
_Requiere: .NET Framework (con Datadog Agent 7.51+ y v3.2+) / .NET 5+_

**Nota**: Antes de .NET 10, el perfilado de {{< ui >}}Allocations{{< /ui >}} y {{< ui >}}Live Heap{{< /ui >}} podría mostrar objetos más grandes más que los más pequeños debido al algoritmo de muestreo utilizado por el tiempo de ejecución de .NET. Datadog recomienda usar .NET 10+ para obtener resultados estadísticamente más correctos.


[1]: /es/profiler/enabling/dotnet/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Una vez habilitada la generación de perfiles, se recopilan los siguientes tipos de perfil para [versiones de PHP compatibles][1]:

Tiempo de pared
: El tiempo transcurrido utilizado por cada función. El tiempo transcurrido incluye el tiempo en que el código se ejecuta en la CPU, espera por E/S y cualquier otra cosa que suceda mientras la función se está ejecutando.

CPU
: Muestra el tiempo que cada función pasó ejecutándose en la CPU.

Asignaciones (v0.88+)
: La cantidad de asignaciones realizadas por cada función durante el período de perfilado (predeterminado: 67s), incluidas las asignaciones que se liberaron posteriormente. Las asignaciones de pila no se rastrean.<br />
_Nota: No disponible cuando JIT está activo en PHP `8.0.0`-`8.1.20` y `8.2.0`-`8.2.7`_

Memoria asignada (v0.88+)
: La cantidad de memoria de montón asignada por cada función durante el período de perfilado (predeterminado: 67s), incluidas las asignaciones que se liberaron posteriormente. Las asignaciones de pila no se rastrean.<br />
_Nota: No disponible cuando JIT está activo en PHP `8.0.0`-`8.1.20` y `8.2.0`-`8.2.7`_

Excepciones lanzadas (v0.92+)
: La cantidad de excepciones capturadas o no capturadas generadas por cada método, así como su tipo.

E/S de archivos (Vista previa, v1.7.2+)
: El tiempo que cada método pasó leyendo y escribiendo en archivos, así como la cantidad de bytes leídos y escritos en archivos.

E/S de socket (Vista previa, v1.7.2+)
: El tiempo que cada método pasó leyendo y escribiendo en un socket, así como la cantidad de bytes leídos y escritos en sockets.

[1]: /es/profiler/enabling/php/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="ddprof" >}}

Una vez que el perfilado está habilitado, se recopilan los siguientes tipos de perfil para [lenguajes y versiones compatibles][1]:

CPU
: El tiempo que cada función pasó ejecutándose en la CPU.

Asignaciones
: La cantidad de asignaciones por cada función durante el período de perfilado (predeterminado: 59s), incluyendo las asignaciones que fueron liberadas posteriormente. Las asignaciones de pila no se rastrean.

Memoria asignada
: La cantidad de memoria de montón asignada por cada función durante el período de perfilado (predeterminado: 59s), incluidas las asignaciones que posteriormente se liberaron. Las asignaciones de pila no se rastrean.

[1]: /es/profiler/enabling/ddprof/
{{< /programming-lang >}}
{{< programming-lang lang="full_host" >}}

Una vez que el perfilado está habilitado, se recopilan los siguientes tipos de perfil para [lenguajes y versiones compatibles][1]:

Tiempo de CPU (eBPF)
: Tiempo que cada método o función pasó ejecutándose en la CPU. En programas con múltiples hilos, el tiempo de CPU puede ser mayor que el tiempo transcurrido: si 2 hilos se ejecutan durante 45s cada uno, verá "Tiempo de CPU eBPF, 1m 30s por minuto".

[1]: /es/profiler/enabling/full_host/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}




## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}