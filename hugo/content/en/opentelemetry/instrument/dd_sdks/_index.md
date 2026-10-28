---
title: Use DDOT SDKs
description: Turn on OpenTelemetry mode in the DDOT SDK for Java, Python, Node.js, or .NET, with OpenTelemetry Operator injection on Kubernetes or with environment variables on a host.
further_reading:
    - link: '/opentelemetry/setup/ddot_collector/kubernetes/'
      text: 'Install the DDOT Collector on Kubernetes'
      tag: 'Documentation'
    - link: '/opentelemetry/compatibility/'
      text: 'Datadog and OpenTelemetry Compatibility'
      tag: 'Documentation'
    - link: '/opentelemetry/config/environment_variable_support/'
      text: 'OpenTelemetry Environment Variables Interoperability'
      tag: 'Documentation'
algolia:
  tags: ['otel custom instrumentation', 'ddot sdk']
---

{{< callout header="false" btn_hidden="true" >}}
DDOT SDKs are in Preview.
{{< /callout >}}

## Overview

A DDOT SDK is the Datadog SDK for your language, run in OpenTelemetry mode. DDOT stands for Datadog Distribution of OpenTelemetry. The DDOT SDK replaces the upstream OpenTelemetry SDK in your application and sends traces, metrics, and logs as OTLP. It adds automatic instrumentation for more frameworks, and it turns on more Datadog features.

You turn on OpenTelemetry mode with environment variables. You don't change your application code. DDOT SDKs are available for Java, Python, Node.js, .NET, and Go.

This page shows you how to:

- Turn on the DDOT SDK on Kubernetes, where the [OpenTelemetry Operator][1] injects it into your pods.
- Turn on the DDOT SDK on a host, with environment variables.
- Check that your data reaches Datadog.

If you followed the DDOT path of the Kubernetes quickstart, your annotated pods already use DDOT SDKs. The installer created the `opentelemetry-kube-stack` instrumentation settings with the DDOT SDK images. To check them, see [Verify][2].

## Where the DDOT SDK sends data

The DDOT SDK sends OTLP to a receiver that forwards it to Datadog:

| Destination | What it does | Set it up |
|---|---|---|
| DDOT Collector | An OpenTelemetry Collector that Datadog builds. | [Install the DDOT Collector on Kubernetes][3] |
| Upstream OpenTelemetry Collector | The OpenTelemetry Collector from the OpenTelemetry project. | [Set up the OpenTelemetry Collector][4] |
| Direct OTLP ingest | **[Placeholder: whether the DDOT SDK can send to the Datadog OTLP intake without a Collector]** | [Datadog OTLP intake endpoint][5] |

The Datadog Agent is optional. **[Placeholder: the Datadog features that need the Agent]** To add the Agent, see [Add the Datadog Agent (optional)][6].

## Prerequisites

- An application written in Java, Python, Node.js, or .NET. For Go, see [Known limits][7].
- A Collector that receives OTLP over HTTP on port `4318`. On Kubernetes, the steps on this page send to a Collector on each node that publishes port `4318` on the node, as the DDOT Collector from [Install the DDOT Collector on Kubernetes][3] does.
- On Kubernetes:
  - The [OpenTelemetry Operator][1]. The Operator tab of [Install the DDOT Collector on Kubernetes][3] installs it.
  - Your application running as a Deployment.
  - `kubectl` access to the application's namespace.

## Turn on the DDOT SDK

{{< tabs >}}
{{% tab "Kubernetes" %}}

The OpenTelemetry Operator injects the DDOT SDK into pods that have an annotation for their language. An `Instrumentation` resource tells the Operator which SDK image to use, how to configure it, and where to send data.

1. Save the following `Instrumentation` resource as `ddot-sdks.yaml`:

{{< code-block lang="yaml" filename="ddot-sdks.yaml" collapsible="true" >}}
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: ddot-sdks
spec:
  # Send OTLP to the Collector on the pod's node
  exporter:
    endpoint: http://$(OTEL_NODE_IP):4318
  # Keep every trace; sample in the Collector
  sampler:
    type: parentbased_always_on
  env:
    # Turn on OpenTelemetry mode
    - name: OTEL_TRACES_EXPORTER
      value: otlp
    - name: DD_TRACE_OTEL_ENABLED
      value: "true"
    - name: DD_LOGS_OTEL_ENABLED
      value: "true"
    - name: DD_METRICS_OTEL_ENABLED
      value: "true"
    # Use OTLP over HTTP, on port 4318, in every language
    - name: OTEL_EXPORTER_OTLP_PROTOCOL
      value: http/protobuf
    - name: OTEL_TRACES_SPAN_METRICS_ENABLED
      value: "false"
  java:
    image: datadog/dd-otel-autoinstrumentation-java:1.68.0-preview
  nodejs:
    image: datadog/dd-otel-autoinstrumentation-js:6.21.0-preview
  python:
    image: datadog/dd-otel-autoinstrumentation-python:4.16.0-preview
    # The Python SDK needs more space than the Operator's 200Mi default
    volumeLimitSize: 500Mi
  dotnet:
    image: datadog/dd-otel-autoinstrumentation-dotnet:3.56.0-preview
    env:
      # Load the Datadog .NET profiler instead of the upstream one
      - name: CORECLR_PROFILER
        value: "{846F5F1C-F9AE-4B07-969E-05C26BC060D8}"
      - name: CORECLR_PROFILER_PATH
        value: /otel-auto-instrumentation-dotnet/linux/Datadog.Trace.ClrProfiler.Native.so
      - name: DD_DOTNET_TRACER_HOME
        value: /otel-auto-instrumentation-dotnet
{{< /code-block >}}

**[Placeholder: image tag format]**

**[Placeholder: final list of OpenTelemetry mode variables]**

**[Placeholder: whether to set `OTEL_TRACES_SPAN_METRICS_ENABLED`]**

In this file:

- `endpoint`: The Operator sets `OTEL_NODE_IP` to the IP address of the pod's node, so each pod sends to the Collector on its own node. If your Collector receives OTLP through a Kubernetes Service instead, set `endpoint` to the Service's address, such as `http://<COLLECTOR_SERVICE>.<COLLECTOR_NAMESPACE>.svc.cluster.local:4318`.
- The images support `amd64` and `arm64` nodes. You only need the section for your application's language. The Operator ignores the others.
- .NET: If your application's image uses Alpine or another musl-based Linux, change `linux` to `linux-musl` in `CORECLR_PROFILER_PATH`.

2. Create the resource in your application's namespace:

   ```shell
   kubectl apply -n <NAMESPACE> -f ddot-sdks.yaml
   ```

3. Add the annotations and label to your Deployment's pod template:

   ```shell
   kubectl patch deployment <DEPLOYMENT_NAME> -n <NAMESPACE> --type merge -p '{"spec":{"template":{"metadata":{"annotations":{"instrumentation.opentelemetry.io/inject-<LANGUAGE>":"ddot-sdks","resource.opentelemetry.io/deployment.environment.name":"<ENVIRONMENT>"},"labels":{"admission.datadoghq.com/enabled":"false"}}}}}'
   ```

   Replace the placeholders:

   | Placeholder | Value |
   |---|---|
   | `<DEPLOYMENT_NAME>` and `<NAMESPACE>` | Your Deployment's name and namespace. |
   | `<LANGUAGE>` | `java`, `python`, `nodejs`, or `dotnet`. |
   | `<ENVIRONMENT>` | The environment name, such as `staging`. It becomes the `env` tag on your data. |

   The patch does three things:

   - The `inject-<LANGUAGE>` annotation tells the Operator to inject the DDOT SDK from the `ddot-sdks` resource in the pod's namespace. To use a resource in another namespace, set the value to `<RESOURCE_NAMESPACE>/ddot-sdks`.
   - The `deployment.environment.name` annotation sets your environment.
   - The `admission.datadoghq.com/enabled: "false"` label stops the Datadog Agent's admission controller from also instrumenting the pod, if you run the Agent in the cluster.

   By default, the service name in Datadog is the Deployment's name, and the version is the container image's tag. To set a different service name, also add the annotation `resource.opentelemetry.io/service.name`.

4. The patch restarts your pods with the DDOT SDK. Wait for the rollout to finish:

   ```shell
   kubectl rollout status deployment/<DEPLOYMENT_NAME> -n <NAMESPACE> --timeout=5m
   ```

Send a few requests to your application so it produces traces.

{{% /tab %}}
{{% tab "Host" %}}

**[Placeholder: Host steps]**

1. Install the Datadog SDK for your language and attach it to your application, as described in [Add the Datadog SDK][8]. Use at least the minimum version listed in [Export Traces from Datadog SDKs in OTLP Format][9].
2. Set these environment variables in the environment that starts your application:

   ```shell
   export OTEL_TRACES_EXPORTER=otlp
   export DD_TRACE_OTEL_ENABLED=true
   export DD_LOGS_OTEL_ENABLED=true
   export DD_METRICS_OTEL_ENABLED=true
   export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
   export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
   export OTEL_SERVICE_NAME=<SERVICE_NAME>
   export OTEL_RESOURCE_ATTRIBUTES=deployment.environment.name=<ENVIRONMENT>
   ```

   - `OTEL_EXPORTER_OTLP_ENDPOINT`: If your Collector runs on another machine, replace `localhost` with its address.
   - `<SERVICE_NAME>` and `<ENVIRONMENT>`: Your service name and environment name. They become the `service` and `env` tags on your data. Don't also set `DD_SERVICE` or `DD_ENV`.

3. Restart your application.

Send a few requests to your application so it produces traces.

[8]: /tracing/trace_collection/dd_libraries/
[9]: /opentelemetry/instrument/dd_sdks/otlp_trace_export/#language-support
{{% /tab %}}
{{< /tabs >}}

## Verify

{{< tabs >}}
{{% tab "Kubernetes" %}}

Check that the Operator injected the DDOT SDK. List each pod's init container images:

```shell
kubectl get pods -n <NAMESPACE> -o jsonpath='{range .items[*]}{.metadata.name}{": "}{.spec.initContainers[*].image}{"\n"}{end}'
```

Your application's pods list a `datadog/dd-otel-autoinstrumentation-*` image, for example:

```text
my-app-7d9c8b5f6d-x2kqp: datadog/dd-otel-autoinstrumentation-java:1.68.0-preview
```

Check that OpenTelemetry mode is on. Each variable is followed by its value:

```shell
kubectl get pods -n <NAMESPACE> -o yaml | grep -A1 -E 'name: (OTEL_TRACES_EXPORTER|DD_TRACE_OTEL_ENABLED|DD_LOGS_OTEL_ENABLED|DD_METRICS_OTEL_ENABLED)$'
```

{{% /tab %}}
{{% tab "Host" %}}

Check that the variables from [Turn on the DDOT SDK][10] are set in the environment of your application's process, not only in your shell.

[10]: #turn-on-the-ddot-sdk

{{% /tab %}}
{{< /tabs >}}

Then check for your data in Datadog. It can take up to five minutes to appear. Replace `<SERVICE_NAME>` with your service name, which on Kubernetes is the Deployment's name by default, and `<ENVIRONMENT>` with your environment name.

- **Services**: In the [Software Catalog][11], set the environment to `<ENVIRONMENT>` and search for `<SERVICE_NAME>`. Its service page shows requests, errors, and latency.
- **Traces**: In the [Trace Explorer][12], search for `service:<SERVICE_NAME> env:<ENVIRONMENT>` and open a trace to see its spans.
- **Logs**: In the [Log Explorer][13], search for `service:<SERVICE_NAME> env:<ENVIRONMENT>`. This search finds the logs that the DDOT SDK sends over OTLP. Which logs the SDK sends depends on your language and logging library. **[Placeholder: the logging libraries the DDOT SDK sends logs from, for each language]** If your Collector also reads container log files, those logs have the `service` and `env` tags only if your Collector adds them. To find them on Kubernetes, search for `kube_namespace:<NAMESPACE>`, where `<NAMESPACE>` is your application's namespace.

## Add the Datadog Agent (optional)

The DDOT SDK sends traces, metrics, and logs without the Datadog Agent. **[Placeholder: the Datadog features that need the Agent]**

To use those features:

1. Install the Agent. On Kubernetes, see [Add the Datadog Agent (optional)][14] on the DDOT Collector page.
2. Set `DD_AGENT_HOST` to the Agent's address. On Kubernetes, add it to the `env` list in `ddot-sdks.yaml`, apply the file, and restart your Deployment.

The DDOT SDK keeps sending your telemetry as OTLP to your Collector. On Kubernetes, keep the `admission.datadoghq.com/enabled: "false"` label on your pods, so the Agent doesn't also instrument them.

## Known limits

- **Go**: Go has no image for the Operator to inject. Instrument your Go application at build time with [Orchestrion][15], then set the OpenTelemetry mode variables:
  - On Kubernetes, use the annotation `instrumentation.opentelemetry.io/inject-sdk` instead of `inject-<LANGUAGE>`. It sets the variables from `ddot-sdks.yaml` and doesn't inject an SDK. Also add `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` to the `env` list, with the `/v1/traces` path, for example `http://$(OTEL_NODE_IP):4318/v1/traces`.
  - On a host, set the variables from the Host tab of [Turn on the DDOT SDK][16], plus `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces`.
- **Python**: The Python image needs the `volumeLimitSize: 500Mi` setting in `ddot-sdks.yaml`. Without it, Kubernetes evicts the pod.
- **Other languages**: DDOT SDKs aren't available for languages other than Java, Python, Node.js, .NET, and Go.

**[Placeholder: other known limits]**

## Troubleshooting

The pod has no `datadog/dd-otel-autoinstrumentation-*` init container
: Check that the annotation names your application's language and the `ddot-sdks` resource. Check that the resource exists in the pod's namespace with `kubectl get instrumentation -n <NAMESPACE>`. The Operator only instruments pods that start after the resource exists, so restart the Deployment:

  ```shell
  kubectl rollout restart deployment <DEPLOYMENT_NAME> -n <NAMESPACE>
  ```

The Python pod is evicted
: Check that the `python` section of `ddot-sdks.yaml` sets `volumeLimitSize: 500Mi`. Apply the file again, then restart the Deployment.

No traces from a .NET application
: Check that the `dotnet` section of `ddot-sdks.yaml` sets the three variables, and that `CORECLR_PROFILER_PATH` uses `linux-musl` on musl-based images.

The SDK sends to the Datadog Agent instead of your Collector
: Check that `OTEL_TRACES_EXPORTER` is `otlp`. The .NET setting `DD_OPENTELEMETRY_ENABLED` doesn't turn on OpenTelemetry mode.

No data in Datadog
: Check that your Collector is running and exporting without errors. See the Troubleshooting section of [Install the DDOT Collector on Kubernetes][3].

## Remove the DDOT SDK

{{< tabs >}}
{{% tab "Kubernetes" %}}

Remove the injection annotation from your Deployment. Its pods restart without the DDOT SDK:

```shell
kubectl patch deployment <DEPLOYMENT_NAME> -n <NAMESPACE> --type json -p '[{"op":"remove","path":"/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-<LANGUAGE>"}]'
kubectl rollout status deployment/<DEPLOYMENT_NAME> -n <NAMESPACE> --timeout=5m
```

When no other Deployment uses it, delete the `Instrumentation` resource:

```shell
kubectl delete -n <NAMESPACE> -f ddot-sdks.yaml
```

{{% /tab %}}
{{% tab "Host" %}}

Unset the environment variables from [Turn on the DDOT SDK][17] and restart your application.

[17]: #turn-on-the-ddot-sdk

{{% /tab %}}
{{< /tabs >}}

## Next steps

- Add the Datadog Agent for the features that need it: [Add the Datadog Agent (optional)][14].
- See which Datadog features each setup supports: [Feature Compatibility][18].
- Learn how Datadog uses `service.name`, `deployment.environment.name`, and `service.version`: [Unified service tagging][19].
- Add custom spans, metrics, and logs with the OpenTelemetry API: [OpenTelemetry API Support][20].
- See every OpenTelemetry environment variable the SDK supports: [OpenTelemetry Environment Variables Interoperability][21].
- See minimum versions and protocols for trace export: [Export Traces from Datadog SDKs in OTLP Format][22].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/
[2]: #verify
[3]: /opentelemetry/setup/ddot_collector/kubernetes/
[4]: /opentelemetry/setup/collector_exporter/
[5]: /opentelemetry/setup/otlp_ingest/
[6]: #add-the-datadog-agent-optional
[7]: #known-limits
[11]: https://app.datadoghq.com/software
[12]: https://app.datadoghq.com/apm/traces
[13]: https://app.datadoghq.com/logs
[14]: /opentelemetry/setup/ddot_collector/kubernetes/#add-the-datadog-agent-optional
[15]: /tracing/trace_collection/dd_libraries/go/
[16]: #turn-on-the-ddot-sdk
[18]: /opentelemetry/compatibility/
[19]: /opentelemetry/correlate/#prerequisite-unified-service-tagging
[20]: /opentelemetry/instrument/dd_sdks/api_support/
[21]: /opentelemetry/config/environment_variable_support/
[22]: /opentelemetry/instrument/dd_sdks/otlp_trace_export/
