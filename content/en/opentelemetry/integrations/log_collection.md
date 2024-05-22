---
title: Log Collection
aliases:
- /opentelemetry/collector_exporter/log_collection/
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/log_collection.png" alt="An information log sent from OpenTelemetry" style="width:100%;" >}}

To collect logs from files, configure the [filelog receiver][1] in your Datadog Exporter.

For more information, see the OpenTelemetry project documentation for the [filelog receiver][1].


## Setup

{{< tabs >}}
{{% tab "Host" %}}

For a collector deployed on the same host as the log files to be collected, specify the paths of the log files to collect in your Collector configuration:

```yaml
receivers:
  filelog:
    include_file_path: true
    poll_interval: 500ms
    include:
      - /var/log/*/app.log
    operators:
      - type: json_parser
      # Layout must match log timestamp format. If this section is removed, timestamp will correspond to the time of log intake by Datadog.
      - type: time_parser
        parse_from: attributes.time
        layout: '%Y-%m-%dT%H:%M:%S%z'
```


{{% /tab %}}

{{% tab "Kubernetes" %}}

Add the following lines to `values.yaml`:

```yaml
presets:
  logsCollection:
    enabled: true
    includeCollectorLogs: true
```

The filelog receiver needs access to the file paths. The preset mounts the necessary volumes to the collector container for `/var/log/pods` and collects all logs from `/var/log/pods/*/*/*.log`. See [Important components for Kubernetes][1] for a full list of settings set by the preset.

Collector configuration sets up a list of operators to parse the logs based on different formats:

```yaml
filelog:
    include:
      - /var/log/pods/*/*/*.log
    exclude:
      - /var/log/pods/abc/*.log
    operators:
      - type: json_parser
      - type: trace_parser
        trace_id:
          parse_from: attributes.trace_id
        span_id:
          parse_from: attributes.span_id
        trace_flags:
          parse_from: attributes.trace_flags
      - type: time_parser
        parse_from: attributes.time
        layout: '%Y-%m-%dT%H:%M:%S%z'
```

[1]: https://opentelemetry.io/docs/kubernetes/collector/components/#filelog-receiver
{{% /tab %}}

{{< /tabs >}}

## Data collected

Logs from the configured files.


## Full example configuration

For a full working example configuration with the Datadog exporter, see [`logs.yaml`][2].

## Example logging output

```
ResourceLog #0
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> k8s.container.name: Str(loadgenerator)
     -> k8s.namespace.name: Str(otel-staging)
     -> k8s.pod.name: Str(opentelemetry-demo-loadgenerator-d8c4d699d-ztt98)
     -> k8s.container.restart_count: Str(1)
     -> k8s.pod.uid: Str(92bf09ed-0db9-4f69-a9d6-1dadf12e01aa)
     -> k8s.pod.ip: Str(192.168.55.78)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-0368add8e328c28f7)
     -> host.image.id: Str(ami-08a2e6a8e82737230)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-53-115.ec2.internal)
     -> os.type: Str(linux)
     -> k8s.daemonset.uid: Str(6d6fef61-d4c7-4226-9b7b-7d6b893cb31d)
     -> k8s.daemonset.name: Str(opentelemetry-collector-agent)
     -> k8s.node.name: Str(ip-192-168-53-115.ec2.internal)
     -> kube_app_name: Str(opentelemetry-collector)
     -> kube_app_instance: Str(opentelemetry-collector)
     -> k8s.pod.start_time: Str(2023-11-20T12:53:23Z)
ScopeLogs #0
ScopeLogs SchemaURL: 
InstrumentationScope  
LogRecord #0
ObservedTimestamp: 2023-11-20 13:02:04.332021519 +0000 UTC
Timestamp: 2023-11-20 13:01:46.095736502 +0000 UTC
SeverityText: 
SeverityNumber: Unspecified(0)
Body: Str( return wrapped_send(self, request, **kwargs))
Attributes:
     -> log.file.path: Str(/var/log/pods/otel-staging_opentelemetry-demo-loadgenerator-d8c4d699d-ztt98_92bf09ed-0db9-4f69-a9d6-1dadf12e01aa/loadgenerator/1.log)
     -> time: Str(2023-11-20T13:01:46.095736502Z)
     -> logtag: Str(F)
     -> log.iostream: Str(stderr)
Trace ID: 
Span ID: 
Flags: 0
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/logs.yaml
