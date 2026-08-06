---
title: Quickstart - Send OpenTelemetry Data to Datadog
description: Get data from an application that is already instrumented with OpenTelemetry into Datadog, using either the recommended DDOT Collector or a lightweight OTLP-in-the-Agent setup.
further_reading:
- link: "/opentelemetry/setup/"
  tag: "Documentation"
  text: "Compare all setup paths"
- link: "/opentelemetry/setup/ddot_collector/"
  tag: "Documentation"
  text: "Datadog Distribution of the OpenTelemetry Collector"
- link: "/opentelemetry/setup/otlp_ingest_in_the_agent/"
  tag: "Documentation"
  text: "OTLP Ingestion by the Datadog Agent"
---

## Overview

This quickstart gets data from an application that is **already instrumented with OpenTelemetry** into Datadog. It offers two tracks depending on your goal:

- **Production (recommended)**: Deploy the [Datadog Distribution of the OpenTelemetry (DDOT) Collector][2]. This is Datadog's recommended setup and unlocks Datadog Agent-based features such as Fleet Automation, Live Container Monitoring, and {{< translate key="integration_count" >}}+ integrations. Best for Kubernetes or Linux hosts.
- **Quick evaluation**: Enable [OTLP ingestion in the Datadog Agent][3]. This is the fastest way to see your data flowing, with minimal configuration and no Collector to deploy.

Prefer a different starting point?

- **New to OpenTelemetry?** Learn the concepts with a sample application in the [getting started tutorials][1].
- **Comparing every option?** See the full breakdown in [Choose your setup path][4].

## Prerequisites

- A [Datadog account][5] and [API key][6].
- An application instrumented with OpenTelemetry SDKs. If you haven't instrumented your application yet, see [Instrument Your Applications][7].

## Set up and send data

{{< tabs >}}
{{% tab "Production: DDOT Collector (Recommended)" %}}

The DDOT Collector runs as part of the Datadog Agent on Kubernetes or Linux. These steps summarize the Kubernetes (Helm) install; for the Datadog Operator, Linux, and full configuration details, follow [Install the DDOT Collector][101].

**Requirements**: A Kubernetes cluster (v1.29+), [Helm][102] (v3+), and [kubectl][103].

1. Add the Datadog Helm repository:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

2. Store your Datadog API key as a Kubernetes secret:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DD_API_KEY>
   ```

3. Enable the OpenTelemetry Collector in your Datadog Agent Helm values and deploy. See [Install the DDOT Collector][101] for the complete `datadog-values.yaml` and deployment command.

4. Point your application at the Collector's OTLP endpoint. The exact endpoint depends on your environment; see the [install guide][101] for the correct value.

[101]: /opentelemetry/setup/ddot_collector/install/
[102]: https://helm.sh/docs/intro/install/
[103]: https://kubernetes.io/docs/tasks/tools/
{{% /tab %}}

{{% tab "Quick evaluation: OTLP in the Agent" %}}

This track uses OTLP ingestion in the Datadog Agent. It's generally available and requires only a running Agent on the same host as your application.

**Requirements**: A running [Datadog Agent][201] (v7.32.0+) on the same host as your application. The Agent is already configured with your API key.

1. Enable the OTLP/HTTP receiver on its default port (`4318`) by adding the following to your `datadog.yaml`, then restart the Agent. Metrics and traces ingestion are on by default.
   ```yaml
   otlp_config:
     receiver:
       protocols:
         http:
           endpoint: 0.0.0.0:4318
   ```
   For gRPC, environment-variable configuration, or containerized setups (Docker, Kubernetes, Helm), see [OTLP Ingestion by the Datadog Agent][202].

2. In your **application's** environment, set the OTLP endpoint so the OpenTelemetry SDK exports to the Agent:
   ```shell
   export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
   ```
   Without this variable, your application does not send telemetry to the Agent, even when the receiver is enabled.

[201]: /agent/
[202]: /opentelemetry/setup/otlp_ingest_in_the_agent/
{{% /tab %}}
{{< /tabs >}}

## View your data in Datadog

Start your application and generate some traffic. Within a few minutes, your telemetry appears in Datadog:

- View traces in [APM Traces][8].
- View metrics in the [Metrics Explorer][9].

If you don't see data, see [Troubleshooting][10].

## Next steps

- **Moving from quick evaluation to production?** Compare the trade-offs of each path in [Choose your setup path][4].
- **Send logs**: OTLP logs ingestion is disabled by default. To enable it, see [Enabling OTLP logs ingestion][11].
- **Correlate your data**: Connect traces with logs, metrics, and RUM. See [Correlate OpenTelemetry Data][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/getting_started/
[2]: /opentelemetry/setup/ddot_collector/
[3]: /opentelemetry/setup/otlp_ingest_in_the_agent/
[4]: /opentelemetry/setup/
[5]: https://app.datadoghq.com/signup
[6]: /account_management/api-app-keys/
[7]: /opentelemetry/instrument/
[8]: https://app.datadoghq.com/apm/traces
[9]: https://app.datadoghq.com/metric/explorer
[10]: /opentelemetry/troubleshooting/
[11]: /opentelemetry/setup/otlp_ingest_in_the_agent/#enabling-otlp-logs-ingestion
[12]: /opentelemetry/correlate/
