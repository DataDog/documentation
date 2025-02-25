---
title: Runtime Metrics Data Collected
type: multi-code-lang
---

This page lists data collected by the APM runtime metrics.

## Metrics

### Java

Additional JMX metrics can be added using configuration files that are passed on using `dd.jmxfetch.config.dir` and `dd.jmxfetch.config`. You can also enable existing Datadog JMX integrations individually with the `dd.jmxfetch.<INTEGRATION_NAME>.enabled=true` parameter. This auto-embeds configuration from Datadog's existing JMX configuration files. See the [JMX Integration][8] for further details on configuration.

{{< get-metrics-from-git "java" >}}

### Python

{{< get-metrics-from-git "python" >}}

### Ruby

{{< get-metrics-from-git "ruby" >}}

### Go

{{< get-metrics-from-git "go" >}}

### Node.js

{{< get-metrics-from-git "node" >}}

### .NET

{{< get-metrics-from-git "dotnet" >}}

[8]: /integrations/java/#configuration