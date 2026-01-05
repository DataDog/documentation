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
| <strong>Minimum&nbsp;runtime&nbsp;version</strong> | [JDK&nbsp;8+][17]  | Python&nbsp;2.7+ | [previous major Go release][21] | Ruby&nbsp;2.5+ | Node.js&nbsp;18+ | .NET&nbsp;Core&nbsp;2.1+, .NET&nbsp;5+, .NET&nbsp;Framework&nbsp;4.6.1+ | PHP&nbsp;7.1+ |                 |
| <strong>Feature-complete runtime version</strong>       | [JDK&nbsp;11+][17] | Python&nbsp;3.6+ | [latest major Go release][21] | Ruby&nbsp;3.2+ | Node.js&nbsp;18+ |                              .NET&nbsp;7+                               | PHP&nbsp;8.0+ |                 |
| <strong>Feature-complete tracing library version</strong>        | [latest][9]  |   [latest][10]   | [latest][11]  |  [latest][12]  | [latest][13]  |                              [latest][14]                               | [latest][15]  |  [latest][16]   |

## Profile types

The following table shows profile type availability by language. For optimal performance and access to all features, Datadog recommends using the latest version of the tracing library for your language. If a specific runtime version isn't indicated, the profile type is available with the minimum runtime version listed in the [Runtime and tracing library versions](#runtime-and-tracing-library-versions).


| <div style="width:150px"><div>    |                     [Java][1]                     | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------------------------------------------------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="CPU" >}}The time each function/method spent running on the CPU.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}  | {{< tooltip glossary="preview" case="title" >}} | 
| {{< ci-details title="Exceptions" >}}The number of exceptions raised, including those caught.{{< /ci-details >}}   |                 {{< X >}}                 | Python 3.7+ | | | | {{< X >}} | {{< X >}}  | |
| {{< ci-details title="Allocation" >}}Number and sizes of memory allocations made by each function/method, including allocations which were subsequently freed.{{< /ci-details >}}   |                [JDK 11+][17]                 | Python 3.6+ | {{< X >}} | {{< X >}} | | {{< tooltip glossary="preview" case="title" >}}<br>.NET 6+ <br>(.NET 10 recommended)| {{< X >}} | {{< tooltip glossary="preview" case="title" >}} |
| {{< ci-details title="Heap" >}}The amount of heap memory allocated that remains in use.{{< /ci-details >}}   | [JDK 11+][17] | Python 3.6+ | {{< X >}} | {{< tooltip glossary="preview" case="title" >}}<br>Ruby 3.1+<br>Not yet compatible with Ruby 4 | {{< X >}} | {{< tooltip glossary="preview" case="title" >}}<br>.NET 7+ <br>(.NET 10 recommended) | | {{< tooltip glossary="preview" case="title" >}} |
| {{< ci-details title="Wall time" >}}The elapsed time spent in each function/method. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function/method is running.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Locks" >}}The time each function/method spent waiting for and holding locks, and the number of times each function acquired a lock.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | {{< X >}} | | | .NET 5+ | | |
| {{< ci-details title="I/O" >}}The time each method spent reading from and writing to files and sockets.{{< /ci-details >}}   |                 {{< X >}}                 | | | | | | {{< tooltip glossary="preview" case="title" >}} | |

## Other features

The following table outlines additional profiling features by language. For full functionality and best performance, Datadog recommends using the latest version of your language's tracing library. If a specific runtime version isn't indicated, the feature is available with the minimum runtime version listed in the [Runtime and tracing library versions](#runtime-and-tracing-library-versions).

|                                   | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="Trace to Profiling integration" >}}Find specific lines of code related to performance issues. <a href="/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces">Learn more</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Endpoint Profiling" >}}Identify endpoints that are bottlenecks or responsible for heavy resource consumption. <a href="/profiler/connect_traces_and_profiles/#endpoint-profiling">Learn more</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Timeline View" >}}Surface time-based patterns and work distribution over the period of a span. <a href="/profiler/connect_traces_and_profiles/#span-execution-timeline-view">Learn more</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Memory Leaks" >}}A guided workflow to assist in investigating memory leaks. <a href="/profiler/guide/solve-memory-leaks/">Learn more</a>{{< /ci-details >}}   | {{< X >}} | | {{< X >}} | | | | | |

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
[21]: https://go.dev/doc/devel/release

