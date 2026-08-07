<!--
Live Debugger PHP enablement — included when prog_lang is php.
-->

PHP requires manual configuration through environment variables.

**SDK version**: [Datadog PHP SDK (`dd-trace-php`)][1] version 1.23.0 or higher is strongly recommended. The minimum SDK version is 1.5.0, but it may result in unexpected errors and a degraded experience.

Start your service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php
