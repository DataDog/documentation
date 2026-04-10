<!--
Configuration for Python profiler.
-->

You can configure the profiler using the [environment variables][1].

### Code provenance

The Python profiler supports code provenance reporting, which provides
insight into the library that is running the code. While this is
enabled by default, you can turn it off by setting
`DD_PROFILING_ENABLE_CODE_PROVENANCE=0`.

[1]: https://ddtrace.readthedocs.io/en/stable/configuration.html#configuration
