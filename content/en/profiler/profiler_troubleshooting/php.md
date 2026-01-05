---
title: Troubleshooting the PHP Profiler
code_lang: php
type: multi-code-lang
code_lang_weight: 70
further_reading:
    - link: '/tracing/troubleshooting'
      tag: 'Documentation'
      text: 'APM Troubleshooting'
---

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, run the `phpinfo()` function. The profiler hooks into `phpinfo()` to run diagnostics. If the webserver is having problems, run `phpinfo()` from the webserver and not from the command line as each Server API (SAPI) can be configured independently.

[Open a support ticket][1] with the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- The output from `phpinfo()`, which includes PHP version, SAPI type, Datadog library versions, and the profiler diagnostics.

## Reduce overhead from default setup

If the default overhead is not acceptable, you can either [fine-tune][4] the
sampling distances, or disable some of the sample types the profiler gathers by
changing the following INI settings:

- `datadog.profiling.allocation_enabled`: controls allocation profiling
- `datadog.profiling.experimental_cpu_time_enabled`: controls CPU-Time samples
- `datadog.profiling.exception_enabled`: controls exception profiling
- `datadog.profiling.timeline_enabled`: controls data gathering for the [timeline visualization][3]

Disabling those sample types will leave you with only wall time samples being
collected.

See the [configuration docs][2] for other INI settings and their corresponding environment variables.

## Fine-tuning sampling distances

Both the exception and allocation profilers are designed to have minimal impact
under normal conditions. However, under high-load scenarios, such as frequent
exception throwing or massive memory allocations, the sampling mechanism can
contribute noticeable runtime cost.

For exceptions, this situation often arises when exceptions are used for
control flow. For allocations, this is common when working with or processing
large volumes of data. In both cases, the profiler may collect more samples
than necessary - increasing its activity and resulting in higher overhead.

To better manage this, you can adjust the respective sampling distances:

- For exceptions, increase the sampling distance through the `datadog.profiling.exception_sampling_distance` INI setting (default: `100`). Alternatively, disable exception profiling entirely with `datadog.profiling.exception_enabled=0`.
- For allocations, increase the sampling distance using `datadog.profiling.allocation_sampling_distance` (change the default `4194304` bytes, which is equivalent 4 MB, for example). You can also disable allocation profiling with `datadog.profiling.allocation_enabled=0`.

Increasing the sampling distance reduces the frequency of collected samples,
lowering profiler activity and helping to control runtime impact. However, it
also reduces the granularity of the profiling data.

Refer to the [configuration docs][2] for details on sampling distance settings.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tracing/trace_collection/library_config/php/#environment-variable-configuration
[3]: /profiler/profile_visualizations/#timeline-view
[4]: #fine-tuning-sampling-distances
