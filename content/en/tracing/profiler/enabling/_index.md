---
title: Enabling the Profiler
kind: Documentation
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

Select your language below to learn how to enable a profiler for your application:

## Managed runtimes

{{< partial name="profiling/profiling-languages.html" >}}

## Unmanaged runtimes

The following profiling library can be used for applications that are written in compiled languages such as **C**, **C++**, or **Rust**. You can also use this to profile services such as nginx and Postgres: 

{{< partial name="profiling/profiling-unmanaged-code.html" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /tracing/setup_overview/
