---
disable_sidebar: true
further_reading:
- link: /profiler/enabling
  tag: Documentación
  text: Habilitación del generador de perfiles
title: Lenguaje y versiones de librería de las funciones del generador de perfiles
---

En las tablas siguientes se resumen las funciones disponibles para el tiempo de ejecución de cada lenguaje.
- **Se requieren versiones mínimas** para acceder al menos a una función. Si tienes una versión anterior, la generación de perfiles no está disponible.
- **Las versiones con funciones completas** dan acceso a **todas** las funciones compatibles. Por lo general, es mejor que actualices a la última versión de todas las bibliotecas de rastreo.

<div class="alert alert-info">Para obtener más información, haz clic en el título del lenguaje en cualquier tabla para ir a la página de configuración de ese lenguaje.</div>


## Versiones de tiempo de ejecución y biblioteca de rastreo

Para utilizar Datadog Profiler, utiliza al menos las versiones mínimas resumidas en la siguiente tabla. Para conocer la disponibilidad de tipos de perfil específicos por versión, consulta [Tipos de perfil](#profile-types).

|                                   |  [Java][1]   |   [Python][2]    |    [Go][3]    |   [Ruby][4]    | [Node.js][5]  |  [.NET][6]  |   [PHP][7]    | [Rust/C/C++][8] |
|-----------------------------------|:------------:|:----------------:|:-------------:|:--------------:|:-------------:|:-----------------------------------------------------------------------:|:-------------:|:---------------:|
| <strong>Versión mínima de tiempo de ejecución</strong> | [JDK 8+][17]  | Python 2.7+ | Go 1.19+ | Ruby 2.3+ | Node 14+ | .NET Core 2.1+, .NET 5+, .NET Framework 4.6.1+ | PHP 7.1+ |                 |
| <strong>Versión completa de tiempo de ejecución</strong>       | [JDK 11+][17] | Python 3.6+ | Go 1.21+ | Ruby 3.1+ | Node 18+ |                              .NET 7+                               | PHP 8.0+ |                 |
| <strong>Versión completa de librería de rastreo</strong>        | [última][9]  |   [última][10]   | [última][11]  |  [última][12]  | [última][13]  |                              [última][14]                               | [última][15]  |  [última][16]   |

## Tipos de perfiles

Para recopilar tipos de perfil, utiliza al menos las versiones mínimas resumidas en la siguiente tabla. Si no se especifica un tiempo de ejecución, el tipo de perfil requiere la versión mínima de tiempo de ejecución indicada en [Versiones de tiempo de ejecución y biblioteca de rastreo](#runtime-and-tracing-library-versions).

| <div style="width:150px"><div>    | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="CPU" >}}El tiempo que cada función/método pasó funcionando en la CPU.{{< /ci-details >}}   | [JDK 8+][17] | Rastreador 0.35+ | Rastreador 1.23+ | Rastreador 0.48+ | Fase beta<br>rastreador 5.11.0,<br>4.35.0, 3.56.0 | rastreador 2.15+ | Rastreador 0.71+  | Fase beta<br>ddprof 0.1+ |
| {{< ci-details title="Exceptions" >}}El número de excepciones planteadas, incluidas las capturadas.{{< /ci-details >}}   | [JDK 8+][17] | Python 3.7+ |       |       |       | .NET 5+<br>Rastreador 2.31+ |  Rastreador 0.96+  |       |
| {{< ci-details title="Allocation" >}}Número y tamaño de las asignaciones de memoria realizadas por cada función/método, incluidas las asignaciones liberadas posteriormente.{{< /ci-details >}}   | [JDK 11+][17] | Python 3.6+<br>Rastreador 0.50+ | Rastreador 1.47+ | Fase beta<br>Ruby 2.7+<br>Rastreador 1.21.1+ |       | Fase beta<br>.NET 6+<br>Rastreador 2.18+ | Rastreador 0.88+ | Fase beta<br>ddprof 0.9.3 |
| {{< ci-details title="Heap" >}}La cantidad de memoria heap asignada que permanece en uso.{{< /ci-details >}}   | [JDK 11+][17] | Python 3.6+<br> Rastreador 0.50+ | Rastreador 1.23+ | alpha<br>Ruby 2.7+<br>Rastreador 1.21.1+ | Rastreador 0.23+ | Fase beta<br>.NET 7+<br>Rastreador 2.22+ |       | Fase beta<br>ddprof 0.15+ |
| {{< ci-details title="Wall time" >}}El tiempo transcurrido en cada función/método. El tiempo transcurrido incluye el tiempo en que el código se ejecuta en la CPU, la espera de E/S y cualquier otra cosa que ocurra mientras se ejecuta la función/método.{{< /ci-details >}}   | [JDK 8+][17] | Rastreador 0.35+ |       | Rastreador 0.48+ | Rastreador 0.23+ | Rastreador 2.7+ | Rastreador 0.71+ |       |
| {{< ci-details title="Locks" >}}El tiempo que cada función/método pasó esperando y manteniendo bloqueos, y el número de veces que cada función adquirió un bloqueo.{{< /ci-details >}}   | [JDK 8+][17] | Rastreador 0.45+ | Rastreador 1.47+ |      |       | .NET 5+ y .NET Framework de fase beta (requiere Datadog Agent 7.51+)<br>Rastreador 2.49+ |       |      |
| {{< ci-details title="I/O" >}}El tiempo que cada método pasó leyendo y escribiendo en archivos y sockets.{{< /ci-details >}}   | [JDK 8+][17] |       |       |       |       |       |       |       |


## Otras características

Para acceder a otras funciones de generación de perfiles, utiliza al menos las versiones mínimas resumidas en la siguiente tabla. Si no se especifica un tiempo de ejecución, el tipo de perfil requiere la versión mínima de tiempo de ejecución indicada en [Versiones de tiempo de ejecución y biblioteca de rastreo](#runtime-and-tracing-library-versions).

|                                   | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="Code Hotspots" >}}Encuentra líneas específicas de código relacionadas con problemas de rendimiento. <a href="/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces">Más información</a>{{< /ci-details >}}   | [JDK 8+][17] | Rastreador 0.44.0 | Rastreador 1.37.0 | Rastreador 0.48.0 | Rastreador 5.0.0,<br>4.24.0, 3.45.0 | Rastreador 2.7.0 | Rastreador 0.71.0 |      |
| {{< ci-details title="Endpoint Profiling" >}}Identifica los endpoints que son cuellos de botella o responsables de un gran consumo de recursos. <a href="/profiler/connect_traces_and_profiles/#endpoint-profiling">Más información</a>{{< /ci-details >}}   | [JDK 8+][17] | Rastreador 0.54.0 | Rastreador 1.37.0 | Rastreador 0.52.0 | Rastreador 5.0.0,<br>4.24.0, 3.45.0 | Rastreador 2.15.0 | Rastreador 0.79.0 |      |
| {{< ci-details title="Timeline View" >}}Supervisa los patrones temporales y la distribución del trabajo a lo largo de un tramo (span). <a href="/profiler/connect_traces_and_profiles/#span-execution-timeline-view">Más información</a>{{< /ci-details >}}   | Fase beta |       | Fase beta<br>Rastreador 1.51.0 | Fase beta<br>Rastreador 1.21.1 | Fase beta<br>Rastreador 5.11.0,<br>4.35.0, 3.56.0 | Fase beta<br>Rastreador 2.30.0 | Fase beta<br>Rastreador 0.89.0 |      |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/profiler/enabling/java/
[2]: /es/profiler/enabling/python/
[3]: /es/profiler/enabling/go/
[4]: /es/profiler/enabling/ruby/
[5]: /es/profiler/enabling/nodejs/
[6]: /es/profiler/enabling/dotnet/
[7]: /es/profiler/enabling/php/
[8]: /es/profiler/enabling/ddprof/
[9]: https://github.com/DataDog/dd-trace-java/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-go/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-js/releases
[14]: https://github.com/DataDog/dd-trace-dotnet/releases
[15]: https://github.com/DataDog/dd-trace-php/releases
[16]: https://github.com/DataDog/ddprof/releases
[17]: /es/profiler/enabling/java/#requirements
[18]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[19]: /es/profiler/connect_traces_and_profiles/#endpoint-profiling
[20]: /es/profiler/connect_traces_and_profiles/#span-execution-timeline-view
