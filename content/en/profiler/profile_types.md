---
title: Profile Types
further_reading:
    - link: 'profiler/enabling'
      tag: 'Documentation'
      text: 'Enable continuous profiler for your application'
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tag: 'Blog'
      text: 'Introducing always-on production profiling in Datadog'
---


In the **Profiles** tab, you can see all profile types available for a given language. Depending on the language and version, the information collected about your profile differs.

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,ddprof" >}}
{{< programming-lang lang="java" >}}

Once profiling is enabled, the following profile types are collected for [supported Java versions][1]:


CPU
: The time each method spent running on the CPU. It includes your code that runs in the JVM (for example, Java, Kotlin), but not JVM operations or native code called from within the JVM.

Allocations
: The number of heap allocations made by each method, including allocations which were subsequently freed.<br />
_Requires: Java 11_ 

Allocated Memory
: The amount of heap memory allocated by each method, including allocations which were subsequently freed.<br />
_Requires: Java 11_ 

Heap Live Objects
: The number of objects allocated by each method in heap memory that have not yet been garbage collected. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.<br />
_Requires: Java 11_ <br />
_Since: 1.17.0_

Heap Live Size
: The amount of heap memory allocated by each method that has not yet been garbage collected. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.<br />
_Requires: Java 11_ <br />
_Since: 1.17.0_

Wall Time in Native Code
: The elapsed time spent in native code. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the method is running. This profile does not include time spent running JVM bytecode, which is typically most of your application code.

Class Load
: The number of classes loaded by each method.

Thrown Exceptions
: The number of errors and exceptions thrown by each method, as well as their type.

File I/O
: The time each method spent reading from and writing to files.

Lock
: The time each method spent waiting for a lock.

Socket I/O
: The time each method spent reading from and writing to socket I/O.

[1]: /profiler/enabling/java/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Once profiling is enabled, the following profile types are collected, depending on your [Python version][1] as noted:


Wall Time
: The elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running.<br />
_Requires: Python 2.7+_

Lock Wait Time
: The time each function spent waiting for a lock.<br />
_Requires: Python 2.7+_

Locked Time
: The time each function spent holding a lock.<br />
_Requires: Python 2.7+_

Lock Acquires
: The number of times each function acquired a lock.<br />
_Requires: Python 2.7+_

Lock Releases
: The number of times each function released a lock.<br />
_Requires: Python 2.7+_

CPU
: The time each function spent running on the CPU, including Python and native code.<br />
_Requires: Python 2.7+, POSIX platform_

Heap Live Size
: The amount of heap memory allocated by each function that has not yet been garbage collected. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.<br />
_Requires: Python 3.5+_

Allocated Memory
: The amount of heap memory allocated by each function, including allocations which were subsequently freed.<br />
_Requires: Python 3.5+_

Allocations
: The number of heap allocations made by each function, including allocations which were subsequently freed.<br />
_Requires: Python 3.5+_

Thrown Exceptions
: The number of caught or uncaught exceptions raised by each function, as well as their type.<br />
_Requires: Python 3.7+, POSIX platform_


[1]: /profiler/enabling/python/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Once profiling is enabled, the following profile types are collected for supported [Go versions][3]:


CPU Time
: The time each function spent running on the CPU. Off-CPU time such as waiting for Networking, Channels, Mutexes, and Sleep are not captured in this profile. See Mutex and Block profiles.

Allocations
: The number of objects allocated by each function in heap memory during the profiling period (default: 60s), including allocations which were subsequently freed. Go calls this `alloc_objects`. Stack allocations are not tracked. This is useful for investigating garbage collection load. See also the note about how this measure changes in version `1.33.0` in [Delta profiles](#delta-profiles).

Allocated Memory
: The amount of heap memory allocated by each function during the profiling period (default: 60s), including allocations which were subsequently freed. Go calls this `alloc_space`. Stack allocations are not tracked. This is useful for investigating garbage collection load. See also the note about how this measure changes in version `1.33.0` in [Delta profiles](#delta-profiles).

Heap Live Objects
: The number of objects allocated by each function in heap memory that have not yet been garbage collected. Go calls this `inuse_objects`. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.

Heap Live Size
: The amount of heap memory allocated by each function that has not yet been garbage collected. Go calls this `inuse_space`. This is useful for investigating the overall memory usage of your service and [identifying potential memory leaks][4].

Mutex
: The time functions have been waiting on mutexes during the profiling period (default: 60s). The stack traces in this profile point the `Unlock()` operation that allowed another goroutine blocked on the mutex to proceed. Short mutex contentions using spinlocks are not captured by this profile, but can be seen in the CPU profile. See also the note about how this measure changes in version `1.33.0` in [Delta profiles](#delta-profiles).

Block
: The time functions have been waiting on mutexes and channel operations during the profiling period (default: 60s). Sleep, GC, Network, and Syscall operations are not captured by this profile. Blocking operations are only captured after they become unblocked, so this profile cannot be used to debug applications that appear to be stuck. For mutex contentions, the stack traces in this profile point to blocked `Lock()` operations. This tells you where your program is getting blocked, while the mutex profile tells you what part of your program is causing the contention. See Datadog's [Block Profiling in Go][1] research for more in-depth information. See also the note about how this measure changes in version `1.33.0` in [Delta profiles](#delta-profiles). **Note**: The block profiler can cause noticeable overhead for production workloads. If enabling it in production, prefer high rates (such as `100000000`, which is 100 milliseconds) and look for signs of increased latency or CPU utilization.

Goroutines
: A snapshot of the number of goroutines currently executing the same functions (both on-CPU and waiting off-CPU). An increasing number of goroutines between snapshots can indicate that the program is leaking goroutines. In most healthy applications this profile is dominated by worker pools and the number of goroutines they use. Applications that are extremely latency-sensitive and use a large number of goroutines (> 10.000) should be aware that enabling this profile requires stop-the-world pauses. The pauses occur only once every profiling period (default 60s) and normally last for around `1µsec` per goroutine. Typical applications with a p99 latency SLO of around `100ms` can generally ignore this warning. See Datadog's [Goroutine Profiling in Go][2] research for more in-depth information.

#### Delta profiles
<div class="alert alert-info"><strong>Note</strong>: In Go profiler versions before <code>1.33.0</code>, Allocations, Allocated Memory, Mutex, and Block metrics are shown as measures <em>accumulated since the process was started</em>, as opposed to <em>during the profiling period</em>. The change to delta profiles in version <code>1.33.0</code> lets you see how these measures are changing instead of accumulating. Delta profiling is on by default. Profiler version <code>1.35.0</code> allows you to disable delta profiles using the <code>WithDeltaProfiles</code> option. <br/><br/>As of profiler version <code>1.37.0</code>, accumulated profiles are no longer uploaded when delta profiling is enabled to reduce upload bandwidth usage. <a href="/help/">Contact Support</a> to discuss your use case if you rely on the full accumulated profiles.</div>


[1]: https://github.com/DataDog/go-profiler-notes/blob/main/block.md
[2]: https://github.com/DataDog/go-profiler-notes/blob/main/goroutine.md
[3]: /profiler/enabling/go#requirements
[4]: /profiler/guide/solve-memory-leaks
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Once profiling is enabled, the following profile types are collected for [supported Ruby versions][1]:

CPU
: The time each function spent running on the CPU, including Ruby and native code.

Wall Time
: The elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running.

Allocations (beta, v1.21.1+)
: The number of objects allocated by each method during the profiling period (default: 60s), including allocations which were subsequently freed. This is useful for investigating garbage collection load.<br />
_Requires:_ [Manual enablement][3]

Heap Live Objects (alpha, v1.21.1+)
: The number of objects allocated by each method in heap memory that have not yet been garbage collected. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.<br />
_Requires: Ruby 2.7+_ and [manual enablement][2]

Heap Live Size (alpha, v1.21.1+)
: The amount of heap memory allocated by each method that has not yet been garbage collected. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.<br />
_Requires: Ruby 2.7+_ and [manual enablement][2]

[1]: /profiler/enabling/ruby/#requirements
[2]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.19.0#:~:text=You%20can%20enable%20these%20features%3A
[3]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.21.0
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Once profiling is enabled, the following profile types are collected for [supported Node.js versions][1]:

CPU (beta, v5.11.0+, v4.35.0+, v3.56.0+)
: The time each function spent running on the CPU, including JavaScript and native code.<br />

Wall Time
: The elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running.

Heap Live Size
: The amount of heap memory allocated by each function that has not yet been garbage collected. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.

[1]: /profiler/enabling/nodejs/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Once profiling is enabled, the following profile types are collected for [supported .NET versions][1]:

Wall Time
: The elapsed time spent in managed methods. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the method is running.

CPU (v2.15+)
: The time each method spent running on the CPU.

Thrown Exceptions (v2.31+)
: The number of caught or uncaught exceptions raised by each method, as well as their type and message.

Allocations (beta, v2.18+)
: The number and size of allocated objects by each method, as well as their type.<br />
_Requires: .NET 6+_

Lock (v2.49+)
: The number of times threads are waiting for a lock and for how long.<br />
_Requires: beta .NET Framework (requires Datadog Agent 7.51+) / .NET 5+_

Live Heap (beta, v2.22+)
: A subset of the allocated objects (with their class name) that are still in memory.<br />
_Requires: .NET 7+_

[1]: /profiler/enabling/dotnet/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Once profiling is enabled, the following profile types are collected for [supported PHP versions][1]:

Wall Time
: The elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running.

CPU
: Shows the time each function spent running on the CPU.

Allocations (v0.88+)
: The number of allocations by each function during the profiling period (default: 67s), including allocations which were subsequently freed. Stack allocations are not tracked.<br />
_Note: Not available when JIT is active on PHP `8.0.0`-`8.1.20` and `8.2.0`-`8.2.7`_

Allocated memory (v0.88+)
: The amount of heap memory allocated by each function during the profiling period (default: 67s), including allocations which were subsequently freed. Stack allocations are not tracked.<br />
_Note: Not available when JIT is active on PHP `8.0.0`-`8.1.20` and `8.2.0`-`8.2.7`_

Thrown Exceptions (v0.92+)
: The number of caught or uncaught exceptions raised by each method, as well as their type.

[1]: /profiler/enabling/php/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="ddprof" >}}

Once profiling is enabled, the following profile types are collected for [supported languages and versions][1]:

CPU
: The time each function spent running on the CPU.

Allocations
: The number of allocations by each function during the profiling period (default: 59s), including allocations which were subsequently freed. Stack allocations are not tracked.

Allocated memory
: The amount of heap memory allocated by each function during the profiling period (default: 59s), including allocations which were subsequently freed. Stack allocations are not tracked.

[1]: /profiler/enabling/ddprof/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

