<!--
Live Debugger Go enablement — included when prog_lang is go.
-->

Go services require enabling Live Debugger in both the Datadog Agent and the application. After the Agent is configured, services on the same host can be enabled from the [Live Debugger Settings page][1] (Go SDK 2.6.0 or higher) or through environment variables.

**SDK version**: [Datadog Go SDK][2] version 2.9.0 or higher is strongly recommended (or 1.74.6 or higher on the v1 line).

**Additional requirements:**

- [Datadog Agent][3] version 7.73.0 or higher, running on the same host as your application
- Linux kernel 5.17 or higher

**Configure the Datadog Agent** using one of the following methods, depending on how you deploy the Agent:

- **Configuration YAML file**: Update `system-probe.yaml` (located alongside `datadog.yaml`) with the following. For more information, see [Agent configuration files][4].

  ```yaml
  dynamic_instrumentation:
    enabled: true
  ```

- **Environment variable**: Add the following to your Datadog Agent manifest:

  ```text
  DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
  ```

- **Helm**: Add the following to your Helm chart:

  ```yaml
  datadog:
    dynamicInstrumentationGo:
      enabled: true
  ```

**Configure your service**: After the Agent is configured, start the service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

[1]: https://app.datadoghq.com/debugging/settings
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[3]: /agent/
[4]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
