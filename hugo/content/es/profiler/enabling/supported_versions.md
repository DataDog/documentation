---
disable_sidebar: true
further_reading:
- link: /profiler/enabling
  tag: Documentación
  text: Habilitación del Profiler
title: Versiones de lenguaje y biblioteca para las funciones del Profiler
---
Las siguientes tablas resumen las funciones disponibles para cada entorno de ejecución de lenguaje.
- **Se requieren versiones mínimas** para acceder al menos a una función. Si tiene una versión anterior, el Profiler no está disponible.
- **Las versiones completas** le brindan acceso a **todas** las funciones compatibles. Por lo general, es mejor actualizar a la versión más reciente de todos los SDK.

<div class="alert alert-info">Para obtener más detalles, haga clic en el encabezado del lenguaje en cualquier tabla para ir a la página de configuración de ese lenguaje.</div>

## Versiones de entorno de ejecución y del SDK {#runtime-and-sdk-versions}

Para usar el Profiler de Datadog, utilice al menos las versiones mínimas resumidas en la siguiente tabla. Para conocer la disponibilidad de tipos de perfiles específicos por versión, consulte [Tipos de perfiles](#profile-types).

|                                   |  [Java][1]   |   [Python][2]    |    [Go][3]    |   [Ruby][4]    | [Node.js][5]  |  [.NET][6]  |   [PHP][7]    | [Rust/C/C++][8] |
|-----------------------------------|:------------:|:----------------:|:-------------:|:--------------:|:-------------:|:-----------------------------------------------------------------------:|:-------------:|:---------------:|
| <strong>Versión mínima del entorno de ejecución</strong> | [JDK 8+][17]  | Python 2.7+ | [versión principal anterior de Go][21] | Ruby 2.5+ | Node.js 18+ | .NET Core 2.1+, .NET 5+, .NET Framework 4.6.1+ | PHP 7.1+ |                 |
| <strong>Versión completa del entorno de ejecución</strong>       | [JDK 11+][17] | Python 3.6+ | [versión principal más reciente de Go][21] | Ruby 3.2+ | Node.js 18+ |                              .NET 7+                               | PHP 8.0+ |                 |
| <strong>Versión completa del SDK</strong>        | [más reciente][9]  |   [más reciente][10]   | [más reciente][11]  |  [más reciente][12]  | [más reciente][13]  |                              [más reciente][14]                               | [más reciente][15]  |  [más reciente][16]   |

## Tipos de perfiles {#profile-types}

La siguiente tabla muestra la disponibilidad de tipos de perfiles por lenguaje. Para obtener un rendimiento óptimo y acceso a todas las funciones, Datadog recomienda usar la versión más reciente del SDK para su lenguaje. Si no se indica una versión específica del entorno de ejecución, el tipo de perfil está disponible con la versión mínima del entorno de ejecución enumerada en [Versiones de entorno de ejecución y SDK](#runtime-and-sdk-versions).


| <div style="width:150px"><div>    |                     [Java][1]                     | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------------------------------------------------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="CPU" >}}El tiempo que cada función/método pasó ejecutándose en la CPU.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}  | {{< tooltip glossary="vista previa" case="title" >}} |
| {{< ci-details title="Excepciones" >}}El número de excepciones lanzadas, incluyendo las que fueron capturadas.{{< /ci-details >}}   |                 {{< X >}}                 | | | | | {{< X >}} | {{< X >}}  | |
| {{< ci-details title="Asignación" >}}Número y tamaños de las asignaciones de memoria realizadas por cada función/método, incluyendo las asignaciones que fueron liberadas posteriormente.{{< /ci-details >}}   |                [JDK 11+][17]                 | Python 3.6+ | {{< X >}} | {{< X >}} | {{< tooltip glossary="vista previa" case="title" >}}<br>Node.js 26+ | {{< tooltip glossary="vista previa" case="title" >}}<br>.NET 6+ <br>(.NET 10 recomendado)| {{< X >}} | {{< tooltip glossary="vista previa" case="title" >}} |
| {{< ci-details title="Heap" >}}La cantidad de memoria heap asignada que permanece en uso.{{< /ci-details >}}   | [JDK 11+][17] | Python 3.6+ | {{< X >}} | {{< tooltip glossary="vista previa" case="title" >}}<br>Ruby 3.1+<br>El tamaño de heap en vivo actualmente no es compatible con Ruby 4 | {{< X >}} | {{< tooltip glossary="vista previa" case="title" >}}<br>.NET 7+ <br>(.NET 10 recomendado) | | {{< tooltip glossary="vista previa" case="title" >}} |
| {{< ci-details title="Tiempo de pared" >}}El tiempo transcurrido en cada función/método. El tiempo transcurrido incluye el tiempo en que el código se está ejecutando en la CPU, esperando E/S y cualquier otra cosa que suceda mientras la función/método se está ejecutando.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Bloqueos" >}}El tiempo que cada función/método pasó esperando y manteniendo bloqueos, y la cantidad de veces que cada función adquirió un bloqueo.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | {{< X >}} | | | .NET 5+ | | |
| {{< ci-details title="E/S" >}}El tiempo que cada método pasó leyendo y escribiendo en archivos y sockets.{{< /ci-details >}}   |                 {{< X >}}                 | | | | | | {{< tooltip glossary="vista previa" case="title" >}} | |

## Otras características {#other-features}

La siguiente tabla describe funciones de perfilado adicionales según el lenguaje. Para obtener una funcionalidad completa y el mejor rendimiento, Datadog recomienda usar la versión más reciente del SDK de su lenguaje. Si no se indica una versión específica del entorno de ejecución, la característica está disponible con la versión mínima del entorno de ejecución indicada en [Versiones de entorno de ejecución y SDK](#runtime-and-sdk-versions).

|                                   | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="Integración de traza a perfilado" >}}Encuentre líneas de código específicas relacionadas con problemas de rendimiento. <a href="/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces">Más información</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Perfilado de puntos de conexión" >}}Identifique los puntos de conexión que son cuellos de botella o responsables de un alto consumo de recursos. <a href="/profiler/connect_traces_and_profiles/#endpoint-profiling">Más información</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Vista cronológica" >}}Muestre patrones basados en el tiempo y la distribución del trabajo durante el período de un tramo. <a href="/profiler/connect_traces_and_profiles/#span-execution-timeline-view">Más información</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Fugas de memoria" >}}Un flujo de trabajo guiado para ayudar en la investigación de fugas de memoria. <a href="/profiler/guide/solve-memory-leaks/">Más información</a>{{< /ci-details >}}   | {{< X >}} | | {{< X >}} | | {{< X >}} | {{< X >}} | | |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/profiler/enabling/?prog_lang=java
[2]: /es/profiler/enabling/?prog_lang=python
[3]: /es/profiler/enabling/?prog_lang=go
[4]: /es/profiler/enabling/?prog_lang=ruby
[5]: /es/profiler/enabling/?prog_lang=node_js
[6]: /es/profiler/enabling/?prog_lang=dot_net
[7]: /es/profiler/enabling/?prog_lang=php
[8]: /es/profiler/enabling/?prog_lang=rust
[9]: https://github.com/DataDog/dd-trace-java/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-go/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-js/releases
[14]: https://github.com/DataDog/dd-trace-dotnet/releases
[15]: https://github.com/DataDog/dd-trace-php/releases
[16]: https://github.com/DataDog/ddprof/releases
[17]: /es/profiler/enabling/?prog_lang=java#requirements
[18]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[19]: /es/profiler/connect_traces_and_profiles/#endpoint-profiling
[20]: /es/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[21]: https://go.dev/doc/devel/release