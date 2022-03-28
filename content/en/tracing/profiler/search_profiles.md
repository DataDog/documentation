---
title: Search Profiles
kind: documentation
aliases:
    - /tracing/profiling/search_profiles
further_reading:
    - link: 'tracing/profiler/enabling'
      tag: 'Documentation'
      text: 'Enable continuous profiler for your application'
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog'
---

{{< img src="tracing/profiling/search_profiles.mp4" alt="Search profiles by tags" video=true >}}

Each row is a profile of a process for a short amount of time. By default, profiles are uploaded once a minute. Depending on the language, these processes are profiled between 15s and 60s.

You can filter according to infrastructure tags or application tags set up from your [environment tracing configuration][1]. By default the following facets are available:

| Facet    | Definition                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------ |
| Env      | The environment your application is running on (`production`, `staging`).                                    |
| Service  | The name of the [service][2] your code is running.                                                     |
| Version  | The version of your code.                                                                              |
| Host     | The hostname your profiled process is running on. |
| Runtime  | The type of runtime the profiled process is running (`JVM`, `CPython`).                                |

The following measures are available:

| Measure           | Definition                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CPU              | CPU usage, measured in cores. |
| Memory&nbsp;Allocation | Memory allocation rate over the course of the profile. This value can be above the amount of memory on your system because allocated memory can be garbage collected during the profile. |



## Profiles

Click on a line to view a specific profile:

{{< img src="tracing/profiling/profiling_flamegraph.mp4" alt="A specific profile" video=true >}}

The header contains information associated with your profile, like the service that generated it, or the environment and code version associated to it.

Four tabs are below the profile header:

| Tab          | Definition                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Profiles     | A flame graph and summary table of the profile you are looking at. You can switch between profile types (`CPU`, `Memory allocation`). |
| Analysis     | A set of heuristics that suggest potential issues or areas of improvement in your code. Currently only available for Java.                   |
| Metrics      | Profiler metrics coming from all profiles of the same service.                                                                              |
| Runtime&nbsp;Info | Runtime properties in supported languages, and profile tags.                                                                                                     |

**Note**: In the upper right corner of each profile, there are options to:

- Download the profile
- Switch the profile to full screen


### Profile types

In the **Profiles** tab, you can see all profile types available for a given language. Depending on the language, the information collected about your profile differs.

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,linux" >}}
{{< programming-lang lang="java" >}}

{{< img src="tracing/profiling/profile.png" alt="A specific profile">}}

Once enabled, the following profile types are collected:


CPU
: Shows the time each method spent running on the CPU. It includes your code that runs in the JVM (Java, Kotlin, etc), but not JVM operations or native code called from within the JVM.

Allocations
: Shows the amount of heap memory allocated by each method, including allocations which were subsequently freed.

Wall Time in Native Code
: Shows the elapsed time spent in native code. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the method is running. This profile does not include time spent running JVM bytecode, which is typically most of your application code.

Class Load
: Shows the number of classes loaded by each method.

Thrown Exceptions
: Shows the number of errors and exceptions thrown by each method.

File I/O
: Shows the time each method spent reading from and writing to files.

Lock
: Shows the time each method spent waiting for a lock.

Socket I/O
: Shows the time each method spent reading from and writing to socket I/O.

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Once enabled, the following profile types are collected:


CPU
: Shows the time each function spent running on the CPU, including Python and native code.

Wall Time
: Shows the elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running.

Heap Live Size
: Shows the amount of heap memory allocated by each function that has not been garbage collected (yet). This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.

Allocated Memory
: Shows the amount of heap memory allocated by each function, including allocations which were subsequently freed - only supported with Python 3.

Allocations
: Shows the number of heap allocations made by each function, including allocations which were subsequently freed.

Thrown Exceptions
: Shows the number of caught or uncaught exceptions raised by each function.

Lock Wait Time
: Shows the time each function spent waiting for a lock.

Locked Time
: Shows the time each function spent holding a lock.

Lock Acquires
: Shows the number of times each function acquired a lock.

Lock Releases
: Shows the number of times each function released a lock.

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Once enabled, the following profile types are collected:


CPU Time
: Shows the time each function spent running on the CPU. Off-CPU time such as waiting for Networking, Channels, Mutexes and Sleep are not captured in this profile. See Mutex and Block profiles.

Allocations
: Shows the number of objects allocated by each function in heap memory during the profiling period (default: 60s), including allocations which were subsequently freed. Go calls this `alloc_objects`. Stack allocations are not tracked. This is useful for investigating garbage collection load. See also the note about how this measure changes in version `1.33.0` in [Delta profiles](#delta-profiles).

Allocated Memory
: Shows the amount of heap memory allocated by each function during the profiling period (default: 60s), including allocations which were subsequently freed. Go calls this `alloc_space`. Stack allocations are not tracked. This is useful for investigating garbage collection load. See also the note about how this measure changes in version `1.33.0` in [Delta profiles](#delta-profiles).

Heap Live Objects
: Shows the number of objects allocated by each function in heap memory that have not been garbage collected (yet). Go calls this `inuse_objects`. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.

Heap Live Size
: Shows the amount of heap memory allocated by each function that has not been garbage collected (yet). Go calls this `inuse_space`. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.

Mutex
: Shows the time functions have been waiting on mutexes during the profiling period (default: 60s). The stack traces in this profile point the `Unlock()` operation that allowed another goroutine blocked on the mutex to proceed. Short mutex contentions using spinlocks are not captured by this profile, but can be seen in the CPU profile. See also the note about how this measure changes in version `1.33.0` in [Delta profiles](#delta-profiles).

Block
: Shows the time functions have been waiting on mutexes and channel operations during the profiling period (default: 60s). Sleep, GC, Network and Syscall operations are not captured by this profile. Blocking operations are only captured after they become unblocked, so this profile cannot be used to debug applications that appear to be stuck. For mutex contentions, the stack traces in this profile point to blocked `Lock()` operations. This will tell you where your program is getting blocked, while the mutex profile tells you what part of your program is causing the contention. See our [Block Profiling in Go][1] research for more in-depth information. See also the note about how this measure changes in version `1.33.0` in [Delta profiles](#delta-profiles). **Note:** The block profiler can cause noticeable overhead for production workloads. If enabling it in production, prefer high rates (such as `100000000`, that is 100 milliseconds) and look for signs of increased latency or CPU utilization.

Goroutines
: Shows a snapshot of the number of goroutines currently executing the same functions (On CPU as well as waiting Off-CPU). An increasing number of goroutines between snapshots can indicate that the program is leaking goroutines. In most healthy applications this profile is dominated by worker pools and shows the number of goroutines they use. Applications that are extremely latency sensitive and use a large number of goroutines (> 10.000) should be aware that enabling this profile requires stop-the-world pauses. The pauses occur only once every profiling period (default 60s) and normally last for `~1µsec` per goroutine. Typical applications with a p99 latency SLO of `~100ms` can generally ignore this warning. See our [Goroutine Profiling in Go][2] research for more in-depth information.

#### Delta profiles
<div class="alert alert-info"><strong>Note</strong>: In Go profiler versions before <code>1.33.0</code>, Allocations, Allocated Memory, Mutex, and Block metrics are shown as measures <em>accumulated since the process was started</em>, as opposed to <em>during the profiling period</em>. The change to delta profiles in version <code>1.33.0</code> lets you see how these measures are changing instead of accumulating. Delta profiling is on by default. Profiler version <code>1.35.0</code> allows you to disable delta profiles using the <code>WithDeltaProfiles</code> option. <br/><br/>As of profiler version <code>1.37.0</code>, accumulated profiles are no longer uploaded when delta profiling is enabled to reduce upload bandwidth usage. <a href="/help/">Contact Support</a> to discuss your use case if you rely on the full accumulated profiles.</div>


[1]: https://github.com/DataDog/go-profiler-notes/blob/main/block.md
[2]: https://github.com/DataDog/go-profiler-notes/blob/main/goroutine.md
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Once enabled, the following profile types are collected:

CPU
: Shows the time each function spent running on the CPU, including Ruby and native code.

Wall Time
: Shows the elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running.

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Once enabled, the following profile types are collected:

Wall Time
: Shows the elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running.

Heap Live Size
: Shows the amount of heap memory allocated by each function that has not been garbage collected (yet). This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

{{< img src="tracing/profiling/profile_dotnet.png" alt="A .NET profile">}}

Once enabled, the following profile type is collected:

Wall Time
: Shows the elapsed time spent in managed methods. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the method is running. 

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Once enabled, the following profile types are collected:

Wall Time
: Shows the elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running.

{{< /programming-lang >}}
{{< programming-lang lang="linux" >}}

Once enabled, the following profile types are collected:

CPU
: Shows the time each function spent running on the CPU.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/send_traces/#configure-your-environment
[2]: /tracing/visualization/#services
