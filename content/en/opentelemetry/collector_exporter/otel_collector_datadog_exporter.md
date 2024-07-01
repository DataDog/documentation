---
title: OpenTelemetry Collector Datadog Exporter
aliases:
- /tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
description: 'Send OpenTelemetry data to the OpenTelemetry collector and Datadog exporter'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "External Site"
  text: "Collector documentation"
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: "Blog"
  text: "Send metrics, traces, and logs from OpenTelemetry Collector to Datadog using Datadog Exporter"
- link: "https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/"
  tag: "Blog"
  text: "Use HiveMQ and OpenTelemetry to monitor IoT applications in Datadog"
- link: "/metrics/open_telemetry/otlp_metric_types"
  tag: "Documentation"
  text: "OTLP Metrics Types"
---

The OpenTelemetry Collector is a vendor-agnostic agent process for collecting and exporting telemetry data emitted by many processes. The [Datadog Exporter][1] for the OpenTelemetry Collector allows you to forward trace, metric, and logs data from OpenTelemetry SDKs on to Datadog (without the Datadog Agent). It works with all supported languages, and you can [connect those OpenTelemetry trace data with application logs][2].

{{< img src="metrics/otel/datadog_exporter.png" alt="Application Instrumented Library, Cloud Integrations, and Other Monitoring Solutions (for example Prometheus) -> Datadog Exporter inside OpenTelemetry Collector -> Datadog" style="width:100%;">}}

## Setting up the OpenTelemetry Collector with the Datadog Exporter

To run the OpenTelemetry Collector along with the Datadog Exporter:

### Step 1 - Download the OpenTelemetry Collector

Download the latest release of the OpenTelemetry Collector Contrib distribution, from [the project's repository][3].

### Step 2 - Configure the Datadog Exporter

To use the Datadog Exporter, add it to your [OpenTelemetry Collector configuration][4]. Create a configuration file and name it `collector.yaml`. Use the example file which provides a basic configuration that is ready to use after you set your Datadog API key as the `DD_API_KEY` environment variable:

{{< code-block lang="yaml" filename="collector.yaml" collapsible="true" >}}
receivers:
  otlp:
    protocols:
      http:
      grpc:
  # The hostmetrics receiver is required to get correct infrastructure metrics in Datadog.
  hostmetrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:
  # The prometheus receiver scrapes metrics needed for the OpenTelemetry Collector Dashboard.
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']

  filelog:
    include_file_path: true
    poll_interval: 500ms
    include:
      - /var/log/**/*example*/*.log

processors:
  batch:
    send_batch_max_size: 100
    send_batch_size: 10
    timeout: 10s

exporters:
  datadog:
    api:
      site: <DD_SITE>
      key: ${env:DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, prometheus, otlp]
      processors: [batch]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
    logs:
      receivers: [otlp, filelog]
      processors: [batch]
      exporters: [datadog]
{{< /code-block >}}

Where `<DD_SITE>` is your site, {{< region-param key="dd_site" code="true" >}}.

The above configuration enables the receiving of OTLP data from OpenTelemetry instrumentation libraries over HTTP and gRPC, and sets up a [batch processor][5], which is mandatory for any non-development environment. Note that you may get `413 - Request Entity Too Large` errors if you batch too much telemetry data in the batch processor.

The exact configuration of the batch processor depends on your specific workload as well as the signal types. Datadog intake has different payload size limits for the 3 signal types:
- Trace intake: 3.2MB
- Log intake: [5MB uncompressed][6]
- Metrics V2 intake: [500KB or 5MB after decompression][7]

#### Advanced configuration

[This fully documented example configuration file][8] illustrates all possible configuration options for the Datadog Exporter. There may be other options relevant to your deployment, such as `api::site` or the ones on the `host_metadata` section.

### Step 3 - Configure your application

To get better metadata for traces and for smooth integration with Datadog:

- **Use resource detectors**: If they are provided by the language SDK, attach container information as resource attributes. For example, in Go, use the [`WithContainer()`][9] resource option.

- **Apply [Unified Service Tagging][10]**: Make sure you've configured your application with the appropriate resource attributes for unified service tagging. This ties Datadog telemetry together with tags for service name, deployment environment, and service version. The application should set these tags using the OpenTelemetry semantic conventions: `service.name`, `deployment.environment`, and `service.version`.

### Step 4 - Configure the logger for your application

{{< img src="logs/log_collection/otel_collector_logs.png" alt="A diagram showing the host, container, or application sending data to the filelog receiver in the collector and the Datadog Exporter in the collector sending the data to the Datadog backend" style="width:100%;">}}

Since the OpenTelemetry SDKs' logging functionality is not fully supported (see your specific language in the [OpenTelemetry documentation][11] for more information), Datadog recommends using a standard logging library for your application. Follow the language-specific [Log Collection documentation][12] to set up the appropriate logger in your application. Datadog strongly encourages setting up your logging library to output your logs in JSON to avoid the need for [custom parsing rules][13]. 

#### Configure the filelog receiver

Configure the filelog receiver using [operators][14]. For example, if there is a service `checkoutservice` that is writing logs to `/var/log/pods/services/checkout/0.log`, a sample log might look like this:

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
    - `json_parser`: Parses JSON logs. By default, the filelog receiver converts each log line into a log record, which is the `body` of the logs' [data model][15]. Then, the `json_parser` converts the JSON body into attributes in the data model.
    - `trace_parser`: Extract the `trace_id` and `span_id` from the log to correlate logs and traces in Datadog. 

#### Remap OTel's `service.name` attribute to `service` for logs

For Datadog Exporter versions 0.83.0 and later, the `service` field of OTel logs is populated as [OTel semantic convention][25] `service.name`. However, `service.name` is not one of the default [service attributes][26] in Datadog's log preprocessing.

To get the `service` field correctly populated in your logs, you can specify `service.name` to be the source of a log's service by setting a [log service remapper processor][27].

<details>
<summary><strong>Optional: Using Kubernetes</strong></summary>

There are multiple ways to deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes infrastructure. For the filelog receiver to work, the [Agent/DaemonSet deployment][16] is the recommended deployment method.

In containerized environments, applications write logs to `stdout` or `stderr`. Kubernetes collects the logs and writes them to a standard location. You need to mount the location on the host node into the Collector for the filelog receiver. Below is an [extension example][17] with the mounts required for sending logs. 

```
apiVersion: apps/v1
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
          image: otel/opentelemetry-collector-contrib:0.71.0
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
</details>

### Step 5 - Run the collector

{{< tabs >}}
{{% tab "On a host" %}}

Run the collector, specifying the configuration file using the `--config` parameter:

```
otelcontribcol_linux_amd64 --config collector.yaml
```

{{% /tab %}}

{{% tab "Docker (localhost)" %}}

To run the OpenTelemetry Collector as a Docker image and receive traces from the same host:

1. Choose a published Docker image such as [`otel/opentelemetry-collector-contrib`][1].

2. Determine which ports to open on your container so that OpenTelemetry traces are sent to the OpenTelemetry Collector. By default, traces are sent over gRPC on port 4317. If you don't use gRPC, use port 4318.

3. Run the container and expose the necessary port, using the previously defined `collector.yaml` file. For example, considering you are using port 4317:

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```


[1]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags

{{% /tab %}}

{{% tab "Docker (other containers)" %}}

To run the OpenTelemetry Collector as a Docker image and receive traces from other containers:

1. Create a Docker network:

    ```
    docker network create <NETWORK_NAME>
    ```

2. Run the OpenTelemetry Collector and application containers as part of the same network.

   ```
   # Run the OpenTelemetry Collector
   docker run -d --name opentelemetry-collector \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

   When running the application container, ensure that the environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` is configured to use the appropriate hostname for the OpenTelemetry Collector. In the example below, this is `opentelemetry-collector`.

   ```
   # Run the application container
   docker run -d --name app \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
       company/app:latest
   ```

{{% /tab %}}

{{% tab "Kubernetes (DaemonSet)" %}}

Using a DaemonSet is the most common and recommended way to configure OpenTelemetry collection in a Kubernetes environment. To deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes infrastructure:

1. Use this [full example of configuring the OpenTelemetry Collector using the Datadog Exporter as a DaemonSet][1], including the application configuration example.

   Note especially some [essential configuration options from the example][2], which ensure the essential ports of the DaemonSet are exposed and accessible to your application:

   ```yaml
   # ...
           ports:
           - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
             hostPort: 4318
           - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
             hostPort: 4317
           - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```

   If you do not need both the standard HTTP and gRPC ports for your application, it is fine to remove them.

2. Collect valuable Kubernetes attributes, which are used for Datadog container tagging, report the Pod IP as a resource attribute, [as shown in the example][3]:

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   This ensures that [Kubernetes Attributes Processor][4] which is used in [the config map][5] is able to extract the necessary metadata to attach to traces. There are additional [roles][6] that need to be set to allow access to this metadata. [The example][1] is complete, ready to use, and has the correct roles set up.
  
3. Provide your [application container][7]. To configure your application container, ensure that the correct OTLP endpoint hostname is used. The OpenTelemetry Collector runs as a DaemonSet, so the current host needs to be targeted. Set your application container's `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable correctly, as in the [example chart][8]:

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32

{{% /tab %}}

{{% tab "Kubernetes (Gateway)" %}}

To deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes Gateway deployment:

1. Use this [full example of configuring the OpenTelemetry Collector using the Datadog Exporter as a DaemonSet][1], including the application configuration example.

   Note especially some [essential configuration options from the example][2], which ensure the essential ports of the DaemonSet are exposed and accessible to your application:

   ```yaml
   # ...
           ports:
           - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
             hostPort: 4318
           - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
             hostPort: 4317
           - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```

   If you do not need both the standard HTTP and gRPC ports for your application, it is fine to remove them.

2. Collect valuable Kubernetes attributes, which are used for Datadog container tagging, report the Pod IP as a resource attribute, [as shown in the example][3]:

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   This ensures that [Kubernetes Attributes Processor][4] which is used in [the config map][5] is able to extract the necessary metadata to attach to traces. There are additional [roles][6] that need to be set to allow access to this metadata. [The example][1] is complete, ready to use, and has the correct roles set up.
  
3. Provide your [application container][7]. To configure your application container, ensure that the correct OTLP endpoint hostname is used. The OpenTelemetry Collector runs as a DaemonSet, so the current host needs to be targeted. Set your application container's `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable correctly, as in the [example chart][8]:

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```

4. Change the DaemonSet to include an [OTLP exporter][9] instead of the Datadog Exporter [currently in place][10]:

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

5. Make sure that the service pipelines use this exporter, instead of the Datadog one that [is in place in the example][11]:

   ```yaml
   # ...
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
           traces:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
   # ...
   ```

   This ensures that each agent forwards its data via the OTLP protocol to the Collector Gateway. 

6. Replace `GATEWAY_HOSTNAME` with the address of your OpenTelemetry Collector Gateway.

7. To ensure that Kubernetes metadata continues to be applied to traces, tell the [`k8sattributes` processor][12] to forward the Pod IP to the Gateway Collector so that it can obtain the metadata:

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   For more information about the `passthrough` option, read [its documentation][13].

8. Make sure that the Gateway Collector's configuration uses the same Datadog Exporter settings that have been replaced by the OTLP exporter in the agents. For example (where `<DD_SITE>` is your site, {{< region-param key="dd_site" code="true" >}}):

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
[9]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15-L18
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L30-L39
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L27
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/e79d917/processor/k8sattributesprocessor/doc.go#L196-L220

{{% /tab %}}

{{% tab "Kubernetes (Operator)" %}}

To use the OpenTelemetry Operator:

1. Follow the [official documentation for deploying the OpenTelemetry Operator][1]. As described there, deploy the certificate manager in addition to the Operator.

2. Configure the Operator using one of the OpenTelemetry Collector standard Kubernetes configurations:
   * [Daemonset deployment][2] - Use the DaemonSet deployment if you want to ensure you receive host metrics. 
   * [Gateway deployment][3]

   For example:

   ```yaml
   apiVersion: opentelemetry.io/v1alpha1
   kind: OpenTelemetryCollector
   metadata:
     name: opentelemetry-example
   spec:
     mode: daemonset
     hostNetwork: true
     image: otel/opentelemetry-collector-contrib
     env:
       - name: DD_API_KEY
         valueFrom:
           secretKeyRef:
             key:  datadog_api_key
             name: opentelemetry-example-otelcol-dd-secret
     config:
       receivers:
         otlp:
           protocols:
             grpc:
             http:
       hostmetrics:
         collection_interval: 10s
         scrapers:
           paging:
             metrics:
               system.paging.utilization:
                 enabled: true
           cpu:
             metrics:
               system.cpu.utilization:
                 enabled: true
           disk:
           filesystem:
             metrics:
               system.filesystem.utilization:
                 enabled: true
           load:
           memory:
           network:
       processors:
         k8sattributes:
         batch:
           send_batch_max_size: 100
           send_batch_size: 10
           timeout: 10s
       exporters:
         datadog:
           api:
             key: ${env:DD_API_KEY}
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [k8sattributes, batch]
             exporters: [datadog]
           traces:
             receivers: [otlp]
             processors: [k8sattributes, batch]
             exporters: [datadog]
   ```

[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesdaemonset#4-run-the-collector
[3]: /opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesgateway#4-run-the-collector

{{% /tab %}}
{{< /tabs >}}


### Logs and traces correlation

If you are using the Datadog Exporter to also send OpenTelemetry traces to Datadog, use the `trace_parser` operator to extract the `trace_id` from each trace and add it to the associated logs. Datadog automatically correlates the related logs and traces. See [Connect OpenTelemetry Traces and Logs][18] for more information.

{{< img src="logs/log_collection/logs_traces_correlation.png" alt="The trace panel showing a list of logs correlated with the trace" style="width:70%;">}}

### Hostname resolution

See [Mapping OpenTelemetry Semantic Conventions to Hostnames][28] to understand how the hostname is resolved.

## Deployment-based limitations

The OpenTelemetry Collector has [two primary deployment methods][20]: Agent and Gateway. Depending on your deployment method, some components are not available.

| Deployment mode | Host metrics | Kubernetes orchestration metrics | Traces | Logs auto-ingestion |
| --- | --- | --- | --- | --- |
| as Gateway | | {{< X >}} | {{< X >}} | |
| as Agent | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## Out-of-the-box dashboards

Datadog provides out-of-the-box dashboards that you can copy and customize. To use Datadog's out-of-the-box OpenTelemetry dashboards:

1. Install the [OpenTelemetry integration][21].
2. Go to **Dashboards** > **Dashboards list** and search for `opentelemetry`:

   {{< img src="metrics/otel/dashboard.png" alt="The Dashboards list, showing two OpenTelemetry out-of-the-box dashboards: Host Metrics and Collector Metrics." style="width:80%;">}}

The **Host Metrics** dashboard is for data collected from the [host metrics receiver][22]. The **Collector Metrics** dashboard is for any other types of metrics collected, depending on which [metrics receiver][23] you choose to enable.


### Containers overview dashboard

<div class="alert alert-info">The Container Overview dashboard is in private beta. <a href="https://forms.gle/g3ndvTnepWY4Bvuh7">Fill out this form</a> to try it out.</div>

<div class="alert alert-warning">This feature is affected by <a href="/containers/guide/docker-deprecation/">Docker deprecation in Kubernetes</a> and you might not be able to use <code>dockerstatsreceiver</code> for OpenTelemetry with Kubernetes version 1.24+.</div>

The [Docker Stats][24] receiver generates container metrics for the OpenTelemetry Collector. The Datadog Exporter translates container metrics to their Datadog counterparts.

Use the following configuration to enable additional attributes on the Docker Stats receiver that populates the containers overview dashboard:

```yaml
  docker_stats:
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```

The minimum required OpenTelemetry Collector version that supports this feature is v0.78.0. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: https://docs.datadoghq.com/api/latest/logs/
[7]: https://docs.datadoghq.com/api/latest/metrics/#submit-metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[9]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[10]: /getting_started/tagging/unified_service_tagging/
[11]: https://opentelemetry.io/docs/instrumentation/
[12]: /logs/log_collection/?tab=host
[13]: /logs/log_configuration/parsing/
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[15]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[16]: https://opentelemetry.io/docs/collector/deployment/#agent
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
[18]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[19]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[20]: https://opentelemetry.io/docs/collector/deployment/
[21]: https://app.datadoghq.com/integrations/otel
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#service-remapper
[28]: /opentelemetry/schema_semantics/hostname/
