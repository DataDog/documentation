---
title: Search Profiles
kind: documentation
aliases:
    - /tracing/profiling/search_profiles
further_reading:
    - link: 'tracing/profiler/getting_started'
      tag: 'Documentation'
      text: 'Enable continuous profiler for your application.'
    - link: 'tracing/profiler/intro_to_profiling'
      tag: 'Documentation'
      text: 'Intro to profiling.'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

{{< img src="tracing/profiling/search_profiles.gif" alt="Search profiles by tags">}}

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

{{< img src="tracing/profiling/profiling_flamegraph.gif" alt="A specic profile">}}

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

{{< programming-lang-wrapper langs="java,python,go,ruby" >}}
{{< programming-lang lang="java" >}}

{{< img src="tracing/profiling/profile.png" alt="A specific profile">}}

Once enabled, the following profile types are collected:


CPU in Java Code
: Shows the time each method spent running on the CPU. It includes your code that runs in the JVM (Java, Kotlin, etc), but not JVM operations or native code called from within the JVM.

Allocation
: Shows the amount of heap memory allocated by each method, including allocations which were subsequently freed.

Wall Time in Native Code
: Shows the elapsed time spent in native code. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the method is running. This profile does not include time spent running JVM bytecode, which is typically most of your application code.

Class load
: Shows the number of classes loaded by each method.

Exception Profile
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

Allocation
: Shows the amount of heap memory allocated by each function, including allocations which were subsequently freed - only supported with Python 3.

Allocation Count
: Shows the number of heap allocations made by each function, including allocations which were subsequently freed.

Wall Time
: Shows the elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running.

Exceptions
: Shows the number of caught or uncaught exceptions raised by each function.

Lock
: Shows the time each function spent in locking (waiting for or holding a lock) or the number of times a function was observed locking/unlocking a lock.

Uncaught Exceptions
: Shows the exceptions that were not caught by any try/except block.

Exceptions
: Shows the exceptions that were raised during program execution.

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Once enabled, the following profile types are collected:


CPU Time
: Shows the time each function spent running on the CPU. Off-CPU time such as waiting for Networking, Channels, Mutexes and Sleep is not captured in this profile, see Mutex and Block profile.

Allocations
: Shows the amount of heap memory allocated by each function since the start of the application, including allocations which were subsequently freed. Go calls this `alloc_space`. This is useful for investigating garbage collection load.

Allocated Memory
: Shows the number of objects allocated in heap memory by each function since the start of the application, including allocations which were subsequently freed. This is useful for investigating garbage collection load.

Heap Live Objects
: Shows the number of objects allocated in heap memory by each function, and which objects remained allocated since the start of the application and lived since the last garbage collection. This is useful for investigating the overall memory usage of your service.

Heap Live Size
: Shows the amount of heap memory allocated by each function that remained allocated since the start of the application and lived since the last garbage collection. Go calls this `inuse_space`. This is useful for investigating the overall memory usage of your service.

Mutex
: Shows the time functions have been waiting on mutexes since the start of the application. The stack traces in this profile point the `Unlock()` operation that allowed another goroutine blocked on the mutex to proceed. Short mutex contentions using spinlocks are not captured by this profile, but can be seen in the CPU profile.

Block
: Shows the time functions have been waiting on mutexes and channel operations since the start of the application. Sleep, GC, Network and Syscall operations are not captured by this profile. Blocking operations are only captured after they become unblocked, so this profile cannot be used to debug applications that appear to be stuck. For mutex contentions, the stack traces in this profile point to blocked `Lock()` operations. This will tell you where your program is getting blocked, while the mutex profile tells you what part of your program is causing the contention. See our [Block Profiling in Go][1] research for more in-depth information.

Goroutines
: Shows a snapshot of the number of goroutines currently executing the same functions (On CPU as well as waiting Off-CPU). An increasing number of goroutines between snapshots can indicate that the program is leaking goroutines. In most healthy applications this profile is dominated by worker pools and shows the number of goroutines they utilize. Applications that are extremely latency sensitive and utilize a large number of goroutines (> 10.000) should be aware that enabling this profile requires O(N) stop-the-world pauses. The pauses occur only once every profiling period (default 60s) and normally last for `~1µsec` per goroutine. Typical applications with a p99 latency SLO of `~100ms` can generally ignore this warning. See our [Goroutine Profiling in Go][2] research for more in-depth information.

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
{{< /programming-lang-wrapper >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/send_traces/#configure-your-environment
[2]: /tracing/visualization/#services
