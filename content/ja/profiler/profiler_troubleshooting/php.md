---
title: Troubleshooting the PHP Profiler
code_lang: php
type: multi-code-lang
code_lang_weight: 70
further_reading:
    - link: /tracing/troubleshooting
      tag: Documentation
      text: APM Troubleshooting
---

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, run the `phpinfo()` function. The profiler hooks into `phpinfo()` to run diagnostics. If the webserver is having problems, run `phpinfo()` from the webserver and not from the command line as each Server API (SAPI) can be configured independently.

[Open a support ticket][1] with the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- The output from `phpinfo()`, which includes PHP version, SAPI type, Datadog library versions, and the profiler diagnostics.

## Reduce overhead from default setup

If the default overhead is not acceptable, you can disable some of the sample
types the profiler gathers by changing the following INI settings:

- `datadog.profiling.allocation_enabled`: controls allocation profiling
- `datadog.profiling.experimental_cpu_time_enabled`: controls CPU-Time samples
- `datadog.profiling.exception_enabled`: controls exception profiling

Disabling those sample types will leave you with only wall time samples being
collected.

See the [configuration docs][2] for other INI settings and their corresponding environment variables.

## Exceptions overwhelming the profiler

The Datadog exception profiler has a small footprint and overhead under normal
conditions. If a lot of exceptions are created and thrown, it can cause
significant overhead for the profiler. This can happen when you use exceptions
for control flow.

If you have an unusually high exception rate, you can either turn of exception
profiling by setting `datadog.profiling.exception_enabled` to `0` or you can
change the sampling distance via the
`datadog.profiling.exception_sampling_distance` INI setting (default `100`) to a
higher value. The higher the sampling distance, the fewer samples are created
and the lower the overhead.

See the [configuration docs][2] for the documentation on the exception sampling
distance.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /help/
[2]: /tracing/trace_collection/library_config/php/#environment-variable-configuration
