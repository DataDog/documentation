---
title: Use DDOT SDKs
description: Instrument Java, Python, Node.js, and .NET applications on Kubernetes with DDOT SDKs, which the OpenTelemetry Operator injects into your pods.
further_reading:
    - link: '/opentelemetry/setup/ddot_collector/install/kubernetes_standalone/'
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

A Datadog OpenTelemetry (DDOT) SDK is the Datadog SDK for your language, set up to send OpenTelemetry data. It implements the OpenTelemetry API and exports OTLP to your Collector, in place of the upstream OpenTelemetry SDK. It's the same Datadog SDK you use for APM, packaged as an image that the [OpenTelemetry Operator][1] injects into your pods.

The DDOT SDK sends your application's traces as OTLP. It also sends the metrics and logs that your application records with the OpenTelemetry API.

You turn on the DDOT SDK with an annotation and environment variables. If your code uses the OpenTelemetry API, you keep those calls. Some applications need changes. See [Known limits][2].

Already use a Datadog SDK that sends data to the Datadog Agent? To keep that setup and add the OpenTelemetry API, see [OpenTelemetry API Support][3].

If you followed the DDOT path of the [Kubernetes quickstart][4], your annotated pods already use DDOT SDKs. To check your pods, see [Verify][5].

## Prerequisites

- An application written in Java, Python, Node.js, or .NET, running in Kubernetes as a Deployment. For Go, see [Known limits][2].
- The [OpenTelemetry Operator][1]. The Operator tab of [Install the DDOT Collector on Kubernetes][6] installs it.
- A Collector on each node that receives OTLP over HTTP on port `4318`, such as the [DDOT Collector][6] or the [upstream OpenTelemetry Collector][7].
- `kubectl` access to the application's namespace.

## Turn on the DDOT SDK

An `Instrumentation` resource tells the Operator which SDK image to inject, how to configure it, and where to send data.

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

   In the patch:

   - The `inject-<LANGUAGE>` annotation tells the Operator to inject the DDOT SDK from the `ddot-sdks` resource in the pod's namespace. To use a resource in another namespace, set the value to `<RESOURCE_NAMESPACE>/ddot-sdks`.
   - The `admission.datadoghq.com/enabled: "false"` label stops the Datadog Agent's admission controller from also instrumenting the pod, if you run the Agent in the cluster.

   By default, the service name in Datadog is the Deployment's name, and the version is the container image's tag. To set a different service name, also add the annotation `resource.opentelemetry.io/service.name`.

4. The patch restarts your pods with the DDOT SDK. Wait for the rollout to finish:

   ```shell
   kubectl rollout status deployment/<DEPLOYMENT_NAME> -n <NAMESPACE> --timeout=5m
   ```

5. Send a few requests to your application so it produces traces.

## Verify

Check that the Operator injected the DDOT SDK. List each pod's init container images:

```shell
kubectl get pods -n <NAMESPACE> -o jsonpath='{range .items[*]}{.metadata.name}{": "}{.spec.initContainers[*].image}{"\n"}{end}'
```

Your application's pods list a `datadog/dd-otel-autoinstrumentation-*` image, for example:

```text
my-app-7d9c8b5f6d-x2kqp: datadog/dd-otel-autoinstrumentation-java:1.68.0-preview
```

Then check for your data in Datadog. Data appears within a few minutes. Replace `<SERVICE_NAME>` with your service name, which is the Deployment's name by default, and `<ENVIRONMENT>` with your environment name.

- **Services**: In the [Software Catalog][8], set the environment to `<ENVIRONMENT>` and search for `<SERVICE_NAME>`. Its service page shows requests, errors, and latency.
- **Traces**: In the [Trace Explorer][9], search for `service:<SERVICE_NAME> env:<ENVIRONMENT>` and open a trace to see its spans.
- **Logs**: In the [Log Explorer][10], search for `service:<SERVICE_NAME> env:<ENVIRONMENT>`. This search finds the logs that the DDOT SDK sends as OTLP. **[Placeholder: the logging libraries the DDOT SDK sends logs from, for each language]**

## Add the Datadog Agent (optional)

The DDOT SDK sends your telemetry to your Collector without the Datadog Agent. Some Datadog features need the Agent: **[Placeholder: the Datadog features that need the Agent]**

To use those features:

1. Install the Agent. See the Datadog Agent section of [Install the DDOT Collector on Kubernetes][11].
2. Point the DDOT SDK at the Agent: **[Placeholder: the `DD_AGENT_HOST` value and the Agent settings the DDOT SDK needs]**. Add the variables to the `env` list in `ddot-sdks.yaml`, apply the file, and restart your Deployment.

The DDOT SDK keeps sending your telemetry as OTLP to your Collector.

## Known limits

- **Languages**: DDOT SDKs are available for Java, Python, Node.js, .NET, and Go.
- **Go**: The Operator doesn't inject a DDOT SDK into Go applications. **[Placeholder: Go setup steps]**
- **Node.js and the OpenTelemetry API**: In Node.js, Datadog drops spans that your code creates with the OpenTelemetry API unless your application registers Datadog's tracer provider. For the registration code, see [OpenTelemetry API Support for Node.js][17]. **[Placeholder: how to register the provider when the Operator injects the DDOT SDK]**
- **OpenTelemetry SDK components**: The DDOT SDK supports the OpenTelemetry API, not OpenTelemetry SDK components such as span processors and exporters. **[Placeholder: confirm, and what to change if your application sets up the OpenTelemetry SDK in code]**

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
: List the OpenTelemetry mode variables on your pods. Each variable is followed by its value:

  ```shell
  kubectl get pods -n <NAMESPACE> -o yaml | grep -A1 -E 'name: (OTEL_TRACES_EXPORTER|DD_TRACE_OTEL_ENABLED|DD_LOGS_OTEL_ENABLED|DD_METRICS_OTEL_ENABLED)$'
  ```

  Check that `OTEL_TRACES_EXPORTER` is `otlp`. In Java, also check that `DD_TRACE_OTEL_ENABLED` is `true`. Without it, the Java SDK ignores the `OTEL_*` variables. In .NET, check that `OTEL_EXPORTER_OTLP_PROTOCOL` is `http/protobuf` or `http/json`. With any other value, the .NET SDK sends traces to the Agent. The .NET setting `DD_OPENTELEMETRY_ENABLED` doesn't turn on OpenTelemetry mode.

No data in Datadog
: Check that your Collector is running and exporting without errors. See [OpenTelemetry Troubleshooting][18].

## Remove the DDOT SDK

Remove the injection annotation from your Deployment. Its pods restart without the DDOT SDK:

```shell
kubectl patch deployment <DEPLOYMENT_NAME> -n <NAMESPACE> --type json -p '[{"op":"remove","path":"/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-<LANGUAGE>"}]'
kubectl rollout status deployment/<DEPLOYMENT_NAME> -n <NAMESPACE> --timeout=5m
```

When no other Deployment uses it, delete the `Instrumentation` resource:

```shell
kubectl delete -n <NAMESPACE> -f ddot-sdks.yaml
```

## Next steps

- See which Datadog features each setup supports: [Feature Compatibility][13].
- Learn how Datadog uses `service.name`, `deployment.environment.name`, and `service.version`: [Unified service tagging][14].
- Add custom spans, metrics, and logs with the OpenTelemetry API: [OpenTelemetry API Support][3].
- See every OpenTelemetry environment variable the SDK supports: [OpenTelemetry Environment Variables Interoperability][15].
- See minimum versions and protocols for trace export: [Export Traces from Datadog SDKs in OTLP Format][16].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/
[2]: #known-limits
[3]: /opentelemetry/instrument/dd_sdks/api_support/
[4]: /opentelemetry/getting_started/kubernetes/?tab=ddot
[5]: #verify
[6]: /opentelemetry/setup/ddot_collector/install/kubernetes_standalone/
[7]: /opentelemetry/setup/collector_exporter/
[8]: https://app.datadoghq.com/software
[9]: https://app.datadoghq.com/apm/traces
[10]: https://app.datadoghq.com/logs
[11]: /opentelemetry/setup/ddot_collector/install/kubernetes_standalone/#install-the-core-datadog-agent-alongside-ddot
[13]: /opentelemetry/compatibility/
[14]: /opentelemetry/correlate/#prerequisite-unified-service-tagging
[15]: /opentelemetry/config/environment_variable_support/
[16]: /opentelemetry/instrument/dd_sdks/otlp_trace_export/
[17]: /opentelemetry/instrument/dd_sdks/api_support/?prog_lang=node_js&platform=traces
[18]: /opentelemetry/troubleshooting/
