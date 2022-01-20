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

{{< site-region region="us5" >}}
<div class="alert alert-warning">
  The Continuous Profiler is not available for the Datadog {{< region-param key="dd_site_name" >}} site.
</div>
{{< /site-region >}}

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

Select your language below to learn how to enable a profiler for your application:

## Managed runtimes

{{< partial name="profiling/profiling-languages.html" >}}

To get notified when a private beta is available for the **PHP**, or **.NET** Profiler, [sign up by completing this form][2]. 

## Unmanaged runtimes

For applications that are compiled to native operating system code. such as **C**, **C++**, or **Rust**. You can also use this to profile services such as nginx and Postgres: 

{{< partial name="profiling/profiling-unmanaged-code.html" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /tracing/setup_overview/
[2]: https://docs.google.com/forms/d/e/1FAIpQLScb9GKmKfSoY6YNV2Wa5P8IzUn02tA7afCahk7S0XHfakjYQw/viewform
