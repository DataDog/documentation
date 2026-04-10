<!--
Requirements for PHP profiler.
-->

The Datadog Profiler requires at least PHP 7.1, on 64-bit Linux.

PHP ZTS builds are supported since `dd-trace-php` version 0.99+, while PHP debug builds are **not** supported.

{% tabs %}

{% tab label="GNU C Linux" %}
An operating system with glibc 2.17 or newer is required. The following versions or newer meet this requirement:
  - CentOS 7
  - Debian 8
  - Ubuntu 14.04

{% alert %}
The operating system versions above have all reached end of life (EOL), Datadog recommends running more recent versions.
{% /alert %}
{% /tab %}

{% tab label="Alpine Linux" %}
Version 3.13 or newer of Alpine Linux is required because the profiler is built against musl v1.2.

Additionally you need to install `libgcc_s` with:

```shell
apk add libgcc
```
{% /tab %}

{% /tabs %}

The following profiling features are available in the following minimum versions of the `dd-trace-php` library:

| Feature                              | Required `dd-trace-php` version |
|--------------------------------------|---------------------------------|
| [Trace to Profiling integration][1] | 0.89.0+                           |
| [Endpoint Profiling][2]             | 0.79.0+                         |
| [Timeline][3]                       | 0.98.0+                         |
| [Source Code Integration][4]        | 1.13.0+                         |

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

[1]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[2]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[3]: /profiler/profile_visualizations/#timeline-view
[4]: /integrations/guide/source-code-integration/?tab=php
