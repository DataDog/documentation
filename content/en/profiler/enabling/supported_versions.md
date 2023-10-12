---
title: Language and Tracer Versions for Profiler Features
kind: documentation
disable_sidebar: true
further_reading:
- link: "/profiler/enabling"
  tag: "Documentation"
  text: "Enabling Profiler"
---

The following table shows a summary of the features available for each language runtime. **Required versions** are the minimum you need to get access to a particular feature. **Recommended versions** are the version that will give you access to all the supported features. It's best if you update to the latest version of all tracing libraries.

|                                   |   Java  | Python  |      Go      |  Ruby |   Node.js  |  .NET   |   PHP  | Rust/C/C++ |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| Operating systems                 | | | | | | | |
| Required runtime version | JDK 8+ [Details][1] | Python&nbsp;2.7+ | Go 1.12+ | Ruby 2.3+ on Linux | Node 14+ | .NET Core 2.1+, .NET 5+, .NET Framework 4.6.1+ [Details][2] | PHP 7.1+ on Linux [Details][3] | Linux v4.17+ |
| Recommended runtime version | JDK 11+ | Python 3.6+ | Go 1.12+ | Ruby 2.3+ on Linux | | .NET 6+ | | |
| Required tracer version   | | 0.35.0 | 1.23.0 | 0.48.0 | | | | |
| Recommended tracer version |    | 0.50.0  | 1.51.0 | 1.15.0 | |   | | |
| **Profile types:** |
| {{< ci-details title="CPU" >}}The time each function spent running on the CPU.{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | private&nbsp;beta | {{< X >}} | {{< X >}} | beta |
| {{< ci-details title="Allocation" >}}Number and sizes of memory allocations made by each function, including allocations which were subsequently freed.{{< /ci-details >}}   | JDK 11+ | Python 3.6+<br>tracer&nbsp;0.50.0 | tracer&nbsp;1.47.0 |      |       | beta, .NET 6+ | {{< X >}} | beta |
| {{< ci-details title="Heap" >}}The amount of heap memory allocated that remains in use.{{< /ci-details >}}   | JDK 11+ | Python 3.6+<br> tracer&nbsp;0.50.0 | {{< X >}} |      | {{< X >}} | beta, .NET 6+ |       |      |
| {{< ci-details title="Locks" >}}The time each function spent waiting for and holding locks, and the number of times each function acquired a lock.{{< /ci-details >}}   | {{< X >}} | tracer&nbsp;0.45.0 | tracer&nbsp;1.47.0 |      |       | .NET 6+ |       |      |
| {{< ci-details title="Wall time" >}}The elapsed time spent in each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running.{{< /ci-details >}}   | {{< X >}} | {{< X >}} |       | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |       |
| {{< ci-details title="Disk I/O" >}}Description tktk.{{< /ci-details >}}   | {{< X >}} |       |       |       |       |       |       |       |
| {{< ci-details title="Socket I/O" >}}Description tktk.{{< /ci-details >}}   | {{< X >}} |       |       |       |       |       |       |       |
| {{< ci-details title="Exceptions" >}}The number of exceptions raised, including those caught.{{< /ci-details >}}   | {{< X >}} | Python 3.7+ |       |       |       | .NET 5+ |        |       |
| **Other features:** |
| {{< ci-details title="Code Hotspots" >}}Description tktk.{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | private&nbsp;beta | {{< X >}} | {{< X >}} |      |
| {{< ci-details title="Endpoint Profiling" >}}Description tktk.{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | private&nbsp;beta | {{< X >}} | {{< X >}} |      |
| {{< ci-details title="Timeline View" >}}Description tktk.{{< /ci-details >}}   | beta |       | beta<br>tracer&nbsp;1.51.0 | private&nbsp;beta<br>tracer&nbsp;1.15.0 |       | beta | beta |      |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/enabling/java/
[2]: /profiler/enabling/dotnet/
[3]: /profiler/enabling/php/