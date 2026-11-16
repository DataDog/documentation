---
title: Using Upstream OpenTelemetry SDKs
description: Deploy upstream OpenTelemetry SDKs with the OpenTelemetry Operator, application builds, or deployment automation, and send telemetry to Datadog.
aliases:
    - /opentelemetry/instrument/otel_sdks/
further_reading:
    - link: 'https://opentelemetry.io/docs/languages/'
      text: 'OpenTelemetry language SDKs'
      tag: 'External Site'
    - link: '/opentelemetry/setup/'
      text: 'Send OpenTelemetry data to Datadog'
      tag: 'Documentation'
    - link: '/opentelemetry/compatibility/'
      text: 'OpenTelemetry feature compatibility'
      tag: 'Documentation'
---

Upstream OpenTelemetry SDKs use the OpenTelemetry API, SDK, and instrumentation maintained by the OpenTelemetry project. Choose this approach when you want to manage an OpenTelemetry-native SDK and export telemetry with OTLP.

## Adapt an existing deployment

Before installing an SDK, identify what is already attached to the application process:

- **An upstream OpenTelemetry SDK is already attached:** Adapt the existing configuration. Preserve deliberate providers, processors, exporters, resource attributes, and disabled instrumentations. Changing the route to Datadog does not require replacing a working SDK setup.
- **A Datadog SDK is attached or injected by SSI:** Do not attach an upstream OpenTelemetry SDK to the same process. First remove the existing SDK. For SSI, [exclude only the affected workloads][1] with a workload-scoped `DatadogInstrumentation` resource when supported, or with scoped instrumentation rules. Recreate the workload's pods after changing SSI configuration.
- **No SDK is attached:** Choose one deployment method from the following section.

## Choose a deployment method

Use only one SDK deployment method for each application process.

| Environment | Method | Best for |
|---|---|---|
| Kubernetes | OpenTelemetry Operator | Centrally managed auto-instrumentation and configuration through Kubernetes resources and workload annotations. |
| Kubernetes, other containers, hosts, or serverless | Application build or deployment automation | Installing the SDK or auto-instrumentation in the application artifact, image, or deployment process. |
| A supported local application repository | Datadog Pup CLI | An assisted setup that detects the project and proposes project-specific OpenTelemetry changes for review. |

## With the OpenTelemetry Operator (Kubernetes)

The [OpenTelemetry Operator][2] can inject upstream OpenTelemetry auto-instrumentation into supported Kubernetes workloads. Installing the Operator alone does not instrument an application.

1. Install the Operator and create an [`Instrumentation` resource][3] with the exporter endpoint and resource settings for your environment.
1. Add the injection annotation for your language to `spec.template.metadata.annotations` in the workload. For example, a Java Deployment uses:

   ```yaml
   spec:
     template:
       metadata:
         annotations:
           instrumentation.opentelemetry.io/inject-java: "true"
   ```

   Use the [annotation for your language][3]. The value can select an `Instrumentation` resource in the same namespace or in another namespace.
1. Apply the workload change, then roll out the workload or otherwise recreate its pods. The Operator mutates newly created pods; it does not change pods that are already running.

For Go auto-instrumentation, enable the upstream Go instrumentation feature gate and specify `instrumentation.opentelemetry.io/otel-go-auto-target-exe`. Review the upstream privilege requirements. Go auto-instrumentation does not support multi-container pods.

For applications that include the SDK at build time, the Operator's `instrumentation.opentelemetry.io/inject-sdk` annotation injects only configuration environment variables. It does not install an SDK or auto-instrumentation agent.

## Without the OpenTelemetry Operator (Kubernetes or other environments)

Install the upstream SDK or auto-instrumentation in the application build, container image, host deployment, or serverless package. Follow the [upstream instructions for your language][4], then configure an OTLP exporter. On Kubernetes, deploy the resulting image and configuration through your normal release process.

### Use assisted setup

For a supported local project, the [Datadog Pup CLI][5] can analyze the repository and propose OpenTelemetry setup changes:

```shell
npx @datadog/pup setup --site <DATADOG_SITE> --product otel
```

Pup requires Node.js 22 or later. The command downloads the setup package, detects the local project, and proposes project-specific code or configuration changes. Review the diff before deploying it, especially if the application already defines providers, exporters, resource attributes, or disabled instrumentations. Pup does not install an OpenTelemetry Collector or modify running workloads; deploy the reviewed application changes through your normal release process.

### Linux system packages

The OpenTelemetry project also publishes [Linux system packages][6] that install an injector and Java, .NET, Node.js, and Python auto-instrumentation. This upstream option is early-stage, is not recommended for production, uses unsigned package repositories, and does not install an OpenTelemetry Collector or Go instrumentation. Use the [language-specific installation paths][4] for production deployments.

## Choose how telemetry reaches Datadog

The SDK installation method and telemetry route are independent decisions.

| Route | Use when | Considerations |
|---|---|---|
| [DDOT or an upstream OpenTelemetry Collector][7] | You need centralized batching, enrichment, transformation, sampling, or routing. | Configure the SDK's OTLP exporter to reach the Collector. Install and operate the Collector separately from the application SDK. |
| [Datadog Agent OTLP endpoint][8] | You already run the Agent and want a local OTLP receiver without managing a separate pipeline. | The application must be able to reach the Agent endpoint. Review feature compatibility for this route. |
| [Direct OTLP ingest][9] | An intermediary is impractical, such as in supported serverless or managed environments. | Configure authentication and required resource attributes in the workload. Centralized Collector processing is not available. |

When you need a Collector, use this pipeline:

{{< img src="/opentelemetry/setup/oss-collector.png" alt="An upstream OpenTelemetry SDK sends OTLP data to an OpenTelemetry Collector, which processes and exports the data to Datadog." style="width:100%;" >}}

The Collector receives OTLP data, applies configured processors such as batching or resource enrichment, and exports the result to Datadog. It is not required for every upstream SDK deployment.

## Verify the deployment

After you roll out the workload:

1. Confirm that only one SDK or auto-instrumentation agent is attached to each process.
1. Generate application traffic and check that traces appear in Datadog.
1. Check traces for duplicate spans, missing resource attributes, or unexpected service names.
1. If you use a Collector or Agent receiver, verify that the receiver is healthy and exporting data without errors.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/single-step-apm/kubernetes/#remove-instrumentation-for-specific-services
[2]: https://opentelemetry.io/docs/platforms/kubernetes/operator/
[3]: https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/
[4]: https://opentelemetry.io/docs/languages/
[5]: /agentic_onboarding/
[6]: https://opentelemetry.io/docs/platforms/linux/installation/
[7]: /opentelemetry/setup/
[8]: /opentelemetry/setup/agent/#otlp-ingest-in-the-agent
[9]: /opentelemetry/setup/otlp_ingest/
