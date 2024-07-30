---
title: Language and Library Versions for Profiler Features
disable_sidebar: true
further_reading:
- link: "/profiler/enabling"
  tag: "Documentation"
  text: "Enabling Profiler"
---

The following tables summarize the features available for each language runtime.
- **Minimum versions** are required to access at least one feature. If you have an earlier version, profiling is not available.
- **Feature-complete versions** give you access to **all** supported features. It's usually best if you update to the latest version of all tracing libraries.

<div class="alert alert-info">For more details, click the language heading in any table to go that language's setup page.</div>


## Runtime and tracing library versions

To use the Datadog Profiler, use at least the minimum versions summarized in the following table. For specific profile type availability by version, see [Profile types](#profile-types).

|                                   |  [Java][1]   |   [Python][2]    |    [Go][3]    |   [Ruby][4]    | [Node.js][5]  |  [.NET][6]  |   [PHP][7]    | [Rust/C/C++][8] |
|-----------------------------------|:------------:|:----------------:|:-------------:|:--------------:|:-------------:|:-----------------------------------------------------------------------:|:-------------:|:---------------:|
| <strong>Minimum&nbsp;runtime&nbsp;version</strong> | [JDK&nbsp;8+][17]  | Python&nbsp;2.7+ | Go&nbsp;1.19+ | Ruby&nbsp;2.3+ | Node&nbsp;14+ | .NET&nbsp;Core&nbsp;2.1+, .NET&nbsp;5+, .NET&nbsp;Framework&nbsp;4.6.1+ | PHP&nbsp;7.1+ |                 |
| <strong>Feature-complete runtime version</strong>       | [JDK&nbsp;11+][17] | Python&nbsp;3.6+ | Go&nbsp;1.21+ | Ruby&nbsp;3.1+ | Node&nbsp;18+ |                              .NET&nbsp;7+                               | PHP&nbsp;8.0+ |                 |
| <strong>Feature-complete tracing library version</strong>        | [latest][9]  |   [latest][10]   | [latest][11]  |  [latest][12]  | [latest][13]  |                              [latest][14]                               | [latest][15]  |  [latest][16]   |

## Profile types

To collect profile types, use at least the minimum versions summarized in the following table. If a runtime isn't specified, the profile type requires the minimum runtime version in [Runtime and tracing library versions](#runtime-and-tracing-library-versions).

| <div style="width:150px"><div>    | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="CPU" >}}The time each function/method spent running on the CPU.{{< /ci-details >}}   | [JDK&nbsp;8+][17] | tracer&nbsp;0.35+ | tracer&nbsp;1.23+ | tracer&nbsp;0.48+ | beta<br>tracer&nbsp;5.11.0,<br>4.35.0, 3.56.0 | tracer&nbsp;2.15+ | tracer&nbsp;0.71+  | beta<br>ddprof&nbsp;0.1+ |
| {{< ci-details title="Exceptions" >}}The number of exceptions raised, including those caught.{{< /ci-details >}}   | [JDK&nbsp;8+][17] | Python 3.7+ |       |       |       | .NET 5+<br>tracer&nbsp;2.31+ |  tracer&nbsp;0.96+  |       |
| {{< ci-details title="Allocation" >}}Number and sizes of memory allocations made by each function/method, including allocations which were subsequently freed.{{< /ci-details >}}   | [JDK&nbsp;11+][17] | Python 3.6+<br>tracer&nbsp;0.50+ | tracer&nbsp;1.47+ | beta<br>Ruby 2.7+<br>tracer&nbsp;1.21.1+ |       | beta<br>.NET 6+<br>tracer&nbsp;2.18+ | tracer&nbsp;0.88+ | beta<br>ddprof&nbsp;0.9.3 |
| {{< ci-details title="Heap" >}}The amount of heap memory allocated that remains in use.{{< /ci-details >}}   | [JDK&nbsp;11+][17] | Python 3.6+<br> tracer&nbsp;0.50+ | tracer&nbsp;1.23+ | alpha<br>Ruby 2.7+<br>tracer&nbsp;1.21.1+ | tracer&nbsp;0.23+ | beta<br>.NET 7+<br>tracer&nbsp;2.22+ |       | beta<br>ddprof&nbsp;0.15+ |
| {{< ci-details title="Wall time" >}}The elapsed time spent in each function/method. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function/method is running.{{< /ci-details >}}   | [JDK&nbsp;8+][17] | tracer&nbsp;0.35+ |       | tracer&nbsp;0.48+ | tracer&nbsp;0.23+ | tracer&nbsp;2.7+ | tracer&nbsp;0.71+ |       |
| {{< ci-details title="Locks" >}}The time each function/method spent waiting for and holding locks, and the number of times each function acquired a lock.{{< /ci-details >}}   | [JDK&nbsp;8+][17] | tracer&nbsp;0.45+ | tracer&nbsp;1.47+ |      |       | .NET 5+ and .NET Framework beta (requires Datadog Agent 7.51+)<br>tracer&nbsp;2.49+ |       |      |
| {{< ci-details title="I/O" >}}The time each method spent reading from and writing to files and sockets.{{< /ci-details >}}   | [JDK&nbsp;8+][17] |       |       |       |       |       |       |       |


## Other features

To access additional profiling features, use at least the minimum versions summarized in the following table. If a runtime isn't specified, the profile type requires the minimum runtime version in [Runtime and tracing library versions](#runtime-and-tracing-library-versions).

|                                   | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="Code Hotspots" >}}Find specific lines of code related to performance issues. <a href="/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces">Learn more</a>{{< /ci-details >}}   | [JDK&nbsp;8+][17] | tracer&nbsp;0.44.0 | tracer&nbsp;1.37.0 | tracer&nbsp;0.48.0 | tracer&nbsp;5.0.0,<br>4.24.0, 3.45.0 | tracer&nbsp;2.7.0 | tracer&nbsp;0.71.0 |      |
| {{< ci-details title="Endpoint Profiling" >}}Identify endpoints that are bottlenecks or responsible for heavy resource consumption. <a href="/profiler/connect_traces_and_profiles/#endpoint-profiling">Learn more</a>{{< /ci-details >}}   | [JDK&nbsp;8+][17] | tracer&nbsp;0.54.0 | tracer&nbsp;1.37.0 | tracer&nbsp;0.52.0 | tracer&nbsp;5.0.0,<br>4.24.0, 3.45.0 | tracer&nbsp;2.15.0 | tracer&nbsp;0.79.0 |      |
| {{< ci-details title="Timeline View" >}}Surface time-based patterns and work distribution over the period of a span. <a href="/profiler/connect_traces_and_profiles/#span-execution-timeline-view">Learn more</a>{{< /ci-details >}}   | beta |       | beta<br>tracer&nbsp;1.51.0 | beta<br>tracer&nbsp;1.21.1 | beta<br>tracer&nbsp;5.11.0,<br>4.35.0, 3.56.0 | beta<br>tracer&nbsp;2.30.0 | beta<br>tracer&nbsp;0.89.0 |      |

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
