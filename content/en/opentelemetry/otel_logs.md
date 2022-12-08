---
title: Send Logs from OpenTelemetry to Datadog
kind: documentation
aliases:
- /logs/log_collection/opentelemetry/
---

<div class="alert alert-warning"><a href="https://opentelemetry.io/docs/reference/specification/logs/">OpenTelemetry logging</a> and Datadog Exporter's feature for sending logs to Datadog are in alpha.</div>

## Overview

[OpenTelemetry][1] (OTel) is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data. Created as an incubator project by the [Cloud Native Computing Foundation][2] (CNCF), OTel provides a consistent format for instrumenting, generating, gathering, and exporting application telemetry data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

The OpenTelemetry Collector is a vendor-agnostic agent process for collecting and exporting telemetry data emitted by many processes. Datadog has an [Exporter][3] available for the OpenTelemetry Collector which allows you to forward traces, metrics, and logs data from OpenTelemetry to Datadog. 

For collecting logs, Datadog recommends using the Collector’s [filelog receiver][4]. The filelog receiver tails the log files that you specify. Then the Datadog Exporter (set up in the Collector) sends the log data to Datadog. 

{{< img src="logs/log_collection/otel_collector_logs.png" alt="A diagram showing the host, container, or application sending data the filelog receiver in the collector and the Datadog Exporter in the collector sending the data to the Datadog backend" style="width:100%;">}}

## Set up the Collector and Datadog Exporter

See [Running the Collector][5] and [Configuring the Datadog Exporter][6].

#### Logs and traces correlation

If you are using the Datadog Exporter to also send OpenTelemetry traces to Datadog, use the `trace_parser` operator to extract the `trace_id` from each trace and add it to the associated logs. Datadog automatically correlates the related logs and traces. See [Connect OpenTelemetry Traces and Logs][7] for more information.

{{< img src="logs/log_collection/logs_traces_correlation.png" alt="The trace panel showing a list of logs correlated with the trace" style="width:70%;">}}

## Configure the logger for your application

Since the OpenTelemetry SDKs’ logging functionality is not fully supported (see your specific language in the [OpenTelemetry documentation][8] for more information), Datadog recommends using a standard logging library for your application. Follow the language-specific [Log Collection documentation][9] to set up the appropriate logger in your application. Datadog strongly encourages setting up your logging library to output your logs in JSON to avoid the need for [custom parsing rules][10]. 

## Configure the filelog receiver

Configure the filelog receiver using [operators][11]. For example, if there is a service `checkoutservice` that is writing logs to `/var/log/pods/services/checkout/0.log`, a sample log might look like this:

```
{"level":"info","message":"order confirmation email sent to \"jack@example.com\"","service":"checkoutservice","span_id":"197492ff2b4e1c65","timestamp":"2022-10-10T22:17:14.841359661Z","trace_id":"e12c408e028299900d48a9dd29b0dc4c"}
```

Example filelog configuration:

```
filelog:
   include:
     - /var/log/pods/**/*checkout*/*.log
   start_at: end
   poll_interval: 500ms
   operators:
     - id: parse_log
       type: json_parser
       parse_from: body
     - id: trace
       type: trace_parser
       trace_id:
         parse_from: attributes.trace_id
       span_id:
         parse_from: attributes.span_id
   attributes:
     ddtags: env:staging
```

- `include`: The list of files the receiver tails 
- `start_at: end`: Indicates to read new content that is being written 
- `poll_internal`: Sets the poll frequency 
- Operators:
    - `json_parser`: Parses JSON logs. By default, the filelog receiver converts each log line into a log record, which is the `body` of the logs’ [data model][12]. Then, the `json_parser` converts the JSON body into attributes in the data model.
    - `trace_parser`: Extract the `trace_id` and `span_id` from the log to correlate logs and traces in Datadog. 

## Using Kubernetes

There are multiple ways to deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes infrastructure. For the filelog receiver to work, the [Agent/DaemonSet deployment][13] is the recommended deployment method.

In containerized environments, applications write logs to `stdout` or `stderr`. Kubernetes collects the logs and writes them to a standard location. You need to mount the location on the host node into the Collector for the filelog receiver. Below is an [extension example][14] with the mounts required for sending logs. 

```
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: otel-agent
  labels:
    app: opentelemetry
    component: otel-collector
spec:
  template:
    metadata:
      labels:
        app: opentelemetry
        component: otel-collector
    spec:
      containers:
        - name: collector
          command:
            - "/otelcol-contrib"
            - "--config=/conf/otel-agent-config.yaml"
          image: otel/opentelemetry-collector-contrib:0.61.0
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            # The k8s.pod.ip is used to associate pods for k8sattributes
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "k8s.pod.ip=$(POD_IP)"
          ports:
            - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
              hostPort: 4318
            - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
              hostPort: 4317
            - containerPort: 8888 # Default endpoint for querying metrics.
          volumeMounts:
            - name: otel-agent-config-vol
              mountPath: /conf
            - name: varlogpods
              mountPath: /var/log/pods
              readOnly: true
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      volumes:
        - name: otel-agent-config-vol
          configMap:
            name: otel-agent-conf
            items:
              - key: otel-agent-config
                path: otel-agent-config.yaml
        # Mount nodes log file location.
        - name: varlogpods
          hostPath:
            path: /var/log/pods
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[4]: https://opentelemetry.io/docs/reference/specification/logs/overview/#third-party-application-logs
[5]: /opentelemetry/otel_collector_datadog_exporter/#running-the-collector
[6]: /opentelemetry/otel_collector_datadog_exporter/#configuring-the-datadog-exporter
[7]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[8]: https://opentelemetry.io/docs/instrumentation/
[9]: /logs/log_collection/?tab=host
[10]: /logs/log_configuration/parsing/
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[12]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[13]: https://opentelemetry.io/docs/collector/deployment/#agent
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
