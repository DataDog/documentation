<!--
Live Debugger Java enablement — included when prog_lang is java.
-->

You can enable Live Debugger in-app in one of two ways:

- On the [Live Debugger Settings page][1], enable the service and environment.
- Start a Debug Session. Live Debugger is enabled automatically on the selected service and environment.

Either option requires Datadog Java SDK version 1.48.0 or higher.

If your SDK version is lower, or you prefer to configure Live Debugger with environment variables, use the following manual configuration.

**SDK version**: [Datadog Java SDK][2] version 1.64.0 or higher is strongly recommended, running on JDK 8 or higher. The minimum SDK version is 1.42.0, but it may result in unexpected errors and a degraded experience.

Start your service with `DD_DYNAMIC_INSTRUMENTATION_ENABLED=true`, along with `DD_SERVICE`, `DD_ENV`, and `DD_VERSION`. The `-javaagent` argument must come before `-jar`:

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar
```

**Note**: On JDK 18 and earlier, classes compiled with the `-parameters` flag (default in Spring 6+, Spring Boot 3+, and Scala) may fail to instrument with the error `Method Parameters detected`.

[1]: https://app.datadoghq.com/debugging/settings
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
