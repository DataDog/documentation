---
title: Language and Tracer Versions for Profiler Features
kind: documentation
disable_sidebar: true
further_reading:
- link: "/profiler/enabling"
  tag: "Documentation"
  text: "Enabling Profiler"
---

The following tables summarizes the features available for each language runtime. 
- **Minimum versions** are the minimum required to get access to a particular feature. If you have an earlier version, that feature is not supported. 
- **Recommended versions** are the versions that give you access to **all** the supported features. It's usually best if you update to the latest version of all tracers.

For more more details, go to a language's profiler setup page (click the language heading in each table to access).

## Runtime and tracer versions

To use the Datadog Profiler, use at least the minimum versions summarized in the following table:

|                                   |  [Java][1]   |   [Python][2]    |    [Go][3]    |   [Ruby][4]    | [Node.js][5]  |  [.NET][6]  |   [PHP][7]    | [Rust/C/C++][8] |
|-----------------------------------|:------------:|:----------------:|:-------------:|:--------------:|:-------------:|:-----------------------------------------------------------------------:|:-------------:|:---------------:|
| <strong>Minimum&nbsp;runtime&nbsp;version</strong> | [JDK&nbsp;8+][17]  | Python&nbsp;2.7+ | Go&nbsp;1.19+ | Ruby&nbsp;2.3+ | Node&nbsp;14+ | .NET&nbsp;Core&nbsp;2.1+, .NET&nbsp;5+, .NET&nbsp;Framework&nbsp;4.6.1+ | PHP&nbsp;7.1+ |                 |
| <strong>Recommended runtime version</strong>       | [JDK&nbsp;11+][17] | Python&nbsp;3.6+ | Go&nbsp;1.21+ | Ruby&nbsp;2.3+ | Node&nbsp;18+ |                              .NET&nbsp;6+                               | PHP&nbsp;8.0+ |                 |
| <strong>Minimum tracer version</strong>            |              |      0.35.0      |    1.23.0     |     0.48.0     |    0.23.0     |                                  2.7.0                                  | 0.71.0        |                 |
| <strong>Recommended tracer version</strong>        | [latest][9]  |   [latest][10]   | [latest][11]  |  [latest][12]  | [latest][13]  |                              [latest][14]                               | [latest][15]  |  [latest][16]   |

## Profile types

To collect profile types for each language, use the minimum versions summarized in the following table:

| <div style="width:150px"><div>    | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="CPU" >}}The time each function/method spent running on the CPU.{{< /ci-details >}}   | [JDK&nbsp;8+][17] | tracer&nbsp;0.35.0 | tracer&nbsp;1.23.0 | tracer&nbsp;0.48.0 |   | tracer&nbsp;2.15.0 | tracer&nbsp;0.71.0  | beta<br>ddprof&nbsp;0.1.0 |
| {{< ci-details title="Exceptions" >}}The number of exceptions raised, including those caught.{{< /ci-details >}}   | [JDK&nbsp;8+][17] | Python 3.7+ |       |       |       | .NET 5+<br>tracer&nbsp;2.31.0 |  tracer&nbsp;0.96.0  |       |
| {{< ci-details title="Allocation" >}}Number and sizes of memory allocations made by each function/method, including allocations which were subsequently freed.{{< /ci-details >}}   | [JDK&nbsp;11+][17] | Python 3.6+<br>tracer&nbsp;0.50.0 | tracer&nbsp;1.47.0 |      |       | beta, .NET 6+<br>tracer&nbsp;2.18.0 | tracer&nbsp;0.88.0 | beta<br>ddprof&nbsp;0.9.3 |
| {{< ci-details title="Heap" >}}The amount of heap memory allocated that remains in use.{{< /ci-details >}}   | [JDK&nbsp;11+][17] | Python 3.6+<br> tracer&nbsp;0.50.0 | tracer&nbsp;1.23.0 |      | tracer&nbsp;0.23.0 | beta, .NET 7+<br>tracer&nbsp;2.22.0 |       | beta<br>ddprof&nbsp;0.15.0 |
| {{< ci-details title="Wall time" >}}The elapsed time spent in each function/method. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function/method is running.{{< /ci-details >}}   | [JDK&nbsp;8+][17] | tracer&nbsp;0.35.0 |       | tracer&nbsp;0.48.0 | tracer&nbsp;0.23.0 | tracer&nbsp;2.7.0 | tracer&nbsp;0.71.0 |       |
| {{< ci-details title="Locks" >}}The time each function/method spent waiting for and holding locks, and the number of times each function acquired a lock.{{< /ci-details >}}   | [JDK&nbsp;8+][17] | tracer&nbsp;0.45.0 | tracer&nbsp;1.47.0 |      |       | .NET 5+<br>tracer&nbsp;2.31.0 |       |      |
| {{< ci-details title="I/O" >}}The time each method spent reading from and writing to files and sockets.{{< /ci-details >}}   | [JDK&nbsp;8+][17] |       |       |       |       |       |       |       |


## Other features

To access additional profiling features, use the minimum versions summarized in the following table:

|                                   | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="Code Hotspots" >}}Find specific lines of code related to performance issues. <a href="/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces">Learn more</a>{{< /ci-details >}}   | [JDK&nbsp;8+][17] | tracer&nbsp;0.44.0 | tracer&nbsp;1.37.0 | tracer&nbsp;0.48.0 | beta | tracer&nbsp;2.7.0 | tracer&nbsp;0.71.0 |      |
| {{< ci-details title="Endpoint Profiling" >}}Identify endpoints that are bottlenecks or responsible for heavy resource consumption. <a href="/profiler/connect_traces_and_profiles/#endpoint-profiling">Learn more</a>{{< /ci-details >}}   | [JDK&nbsp;8+][17] | tracer&nbsp;0.54.0 | tracer&nbsp;1.37.0 | tracer&nbsp;0.48.0 | beta | tracer&nbsp;2.15.0 | tracer&nbsp;0.79.0 |      |
| {{< ci-details title="Timeline View" >}}Surface time-based patterns and work distribution over the period of a span. <a href="/profiler/connect_traces_and_profiles/#span-execution-timeline-view">Learn more</a>{{< /ci-details >}}   | beta |       | beta<br>tracer&nbsp;1.51.0 | beta<br>tracer&nbsp;1.15.0 |       | beta<br>tracer&nbsp;2.30.0 | beta<br>tracer&nbsp;0.89.0 |      |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/enabling/java/
[2]: /profiler/enabling/python/
[3]: /profiler/enabling/go/
[4]: /profiler/enabling/ruby/
[5]: /profiler/enabling/nodejs/
[6]: /profiler/enabling/dotnet/
[7]: /profiler/enabling/php/
[8]: /profiler/enabling/ddprof/
[9]: https://github.com/DataDog/dd-trace-java/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-go/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-js/releases
[14]: https://github.com/DataDog/dd-trace-dotnet/releases
[15]: https://github.com/DataDog/dd-trace-php/releases
[16]: https://github.com/DataDog/ddprof/releases
[17]: /profiler/enabling/java/#requirements
[18]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[19]: /profiler/connect_traces_and_profiles/#endpoint-profiling
[20]: /profiler/connect_traces_and_profiles/#span-execution-timeline-view