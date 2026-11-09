---
title: Monitoring AWS Lambda MicroVMs
description: Collect logs, traces, and metrics from AWS Lambda MicroVMs with serverless-init.
further_reading:
  - link: "/tracing/trace_collection/dd_libraries/nodejs/"
    tag: "Documentation"
    text: "Tracing Node.js Applications"
  - link: "/tracing/trace_collection/dd_libraries/python/"
    tag: "Documentation"
    text: "Tracing Python Applications"
  - link: "/tracing/other_telemetry/connect_logs_and_traces/"
    tag: "Documentation"
    text: "Correlate Logs and Traces"
  - link: "/getting_started/tagging/unified_service_tagging/"
    tag: "Documentation"
    text: "Unified Service Tagging"
  - link: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-microvms-guide.html"
    tag: "External Site"
    text: "AWS Lambda MicroVMs overview"
  - link: "https://docs.aws.amazon.com/lambda/latest/dg/microvms-images-snapshots.html"
    tag: "External Site"
    text: "AWS Lambda MicroVM images and snapshots"
  - link: "https://docs.aws.amazon.com/lambda/latest/dg/microvms-how-it-works.html"
    tag: "External Site"
    text: "How AWS Lambda MicroVMs work"
---

{{< callout url=false btn_hidden="true" header="Join the Preview!">}}
Datadog Serverless Monitoring for AWS Lambda MicroVMs is in Preview.
{{< /callout >}}

## Overview

Datadog provides full visibility into the metrics, logs, and traces emitted by your [AWS Lambda MicroVMs][9] across their lifecycle. A MicroVM runs your application in an isolated, lightweight [Firecracker][12] virtual machine, starting from an [image][10] that snapshots your application's memory and disk. The instance can suspend when idle, resume later with its memory and disk intact, and run for up to 8 hours. See [Lambda MicroVMs quotas][13] for the full list of limits.

### Key features

- Build dashboards and monitors on MicroVM starts, suspends, resumes, and terminations.
- Filter and group telemetry by image, image version, or instance.
- See the last seconds of telemetry before a MicroVM suspends or shuts down.
- Get unique trace IDs for each instance, even when many instances start from the same image.

<div class="alert alert-tip">Every MicroVM reports CPU utilization as <a href="#metrics">enhanced metrics</a>, with nothing to install or turn on. You can chart and alert on <code>aws.lambda.microvm.enhanced.cpu.usage</code> and <code>aws.lambda.microvm.enhanced.cpu.limit</code> as soon as a MicroVM starts.</div>

## Prerequisites

- Your application follows the [AWS MicroVM service model][9].
- `serverless-init` runs as the container entrypoint. Sidecar mode isn't supported.
- A [Datadog API key][3].
- Network egress from the MicroVM to Datadog.
- Your application already sends traces, logs, or custom metrics to Datadog.

### Supported versions

| Component | Minimum version |
|---|---|
| `serverless-init` | 1.11.4 |
| Node.js tracer (`dd-trace-js`) | 6.15.0 |
| Python tracer (`dd-trace-py`) | 4.16.2 |

## Setup

Setup works the same as for [Google Cloud Run][1] and [Azure Container Apps][2]. `serverless-init` detects that it runs in a MicroVM and switches to MicroVM mode. You don't need a separate Agent or sidecar.

1. **Add serverless-init to your image**.

   In your Dockerfile, copy `serverless-init` 1.11.4 or later into the image. Set it as the entrypoint and pass your application's start command as `CMD`:

   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" >}}
COPY --from=datadog/serverless-init:<YOUR_TAG> /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/path/to/your/app"]
{{< /code-block >}}

   `serverless-init` is available on [Docker Hub][14] (`datadog/serverless-init`) and [Amazon ECR Public][15] (`public.ecr.aws/datadog/serverless-init`).

2. **Set the required environment variables**.

   | Variable | Description |
   |---|---|
   | `DD_API_KEY` | Your [Datadog API key][3]. |
   | `DD_SITE` | Your [Datadog site][4]: {{< region-param key="dd_site" code="true" >}}. |
   | `DD_SERVICE` | The service name. See [Unified Service Tagging][5]. |
   | `DD_ENV` | The environment name. |
   | `DD_VERSION` | The application version. |

3. **Enable the lifecycle hooks**.

   In your AWS MicroVM image configuration, enable the MicroVM lifecycle hooks. `serverless-init` answers each hook so that Datadog can follow the MicroVM from image build to shutdown. See [Lifecycle hooks](#lifecycle-hooks) and the AWS documentation on [how MicroVMs work][11].

4. **(Optional) Set up tracing**.

   Install the Datadog tracer in your application:
   - **Node.js**: Install `dd-trace-js` 6.15.0 or later. Use the AWS Amazon Linux 2023 MicroVM base image, which includes the OpenSSL version the tracer needs for unique trace IDs. See [Tracing Node.js Applications][6].
   - **Python**: Install `dd-trace-py` 4.16.2 or later. See [Tracing Python Applications][7].

   Then forward the `/run` hook to your application so the tracer generates unique trace IDs for each instance:

   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" >}}
ENV DD_AWS_MICROVM_USER_APP_PORT=<YOUR_APP_PORT>
ENV DD_AWS_MICROVM_ENABLE_RUN=true
{{< /code-block >}}

   See [Unique trace IDs for each instance](#unique-trace-ids-for-each-instance).

5. **(Optional) Set up logs**.

   To collect logs from stdout and stderr, set `DD_LOGS_ENABLED=true`.

   To correlate logs and traces, turn on log injection and write your logs in JSON format. Log injection is supported for these loggers:
   - **Node.js**: Bunyan, Pino, and Winston
   - **Python**: structlog

   Your logs pipeline must parse the trace and span IDs. See [Correlate Logs and Traces][8].

## How Datadog monitors the MicroVM lifecycle

### Lifecycle hooks

`serverless-init` answers each AWS MicroVM lifecycle hook and supervises your application:

- **Image build**: `/ready` and `/validate`
- **Runtime**: `/run`, `/resume`, `/suspend`, and `/terminate`

If your application needs the hook callbacks, forward them with these environment variables:

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; width: 300px; min-width: 300px;">Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_USER_APP_PORT</code></td>
      <td>The port your application listens on for forwarded hooks.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_ENABLE_&lt;HOOK&gt;</code></td>
      <td>Set to <code>true</code> to forward a hook to your application. For example, <code>DD_AWS_MICROVM_ENABLE_RUN=true</code>.</td>
    </tr>
  </tbody>
</table>

<!-- TODO: Confirm the timeout variable names and defaults for forwarded hooks. -->

### Data flush on suspend and terminate

A MicroVM can suspend or shut down at any time, and AWS can destroy a suspended MicroVM without calling `/terminate`. To avoid losing data, `serverless-init` flushes metrics, logs, and traces when it receives `/suspend` or `/terminate`, before it responds to AWS.

- On `/terminate`, the trace agent shuts down fully and sends all pending trace stats.
- On `/suspend`, `serverless-init` sends all pending trace stats but keeps the trace agent running, so tracing continues after the MicroVM resumes.

As a result, APM charts, service pages, and monitors include a MicroVM's final seconds. Custom metrics that your application sends right before a hook are included in that hook's flush.

### Unique trace IDs for each instance

Every instance starts from the same image, so every instance also starts with the same tracer state. When an instrumented Node.js or Python application receives the forwarded `/run` hook, the tracer resets its trace and span ID generator. It also refreshes its runtime ID and Remote Configuration client ID. This keeps traces from different instances from colliding.

On Python, this works for WSGI and ASGI applications, including Flask, Django, FastAPI, and Starlette.

## Data collected

### Metrics

Datadog sends these enhanced metrics for every MicroVM:

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; width: 400px; min-width: 400px;">Metric</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>aws.lambda.microvm.enhanced.cpu.usage</code></td>
      <td>CPU usage of the MicroVM.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>aws.lambda.microvm.enhanced.cpu.limit</code></td>
      <td>CPU limit of the MicroVM. On guests without cgroups, this is the number of CPUs the guest can see.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>aws.lambda.microvm.enhanced.validate</code></td>
      <td>Emitted on each <code>/validate</code> hook.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>aws.lambda.microvm.enhanced.run</code></td>
      <td>Emitted on each <code>/run</code> hook.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>aws.lambda.microvm.enhanced.resume</code></td>
      <td>Emitted on each <code>/resume</code> hook.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>aws.lambda.microvm.enhanced.suspend</code></td>
      <td>Emitted on each <code>/suspend</code> hook.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>aws.lambda.microvm.enhanced.terminate</code></td>
      <td>Emitted on each <code>/terminate</code> hook.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>aws.lambda.microvm.enhanced.active_instances</code></td>
      <td>Heartbeat emitted while an instance runs. This is a periodic sample, not an exact instance count.</td>
    </tr>
  </tbody>
</table>

### Tags

Datadog tags MicroVM telemetry so you can trace a problem to a specific image or instance:

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; width: 250px; min-width: 250px;">Tag</th>
      <th>Applied to</th>
      <th>Use it to</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;">Image ARN and image version</td>
      <td>All telemetry</td>
      <td>Filter and group by image or image version.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>lambda_microvm_id</code></td>
      <td>Logs, traces, and the <code>active_instances</code> metric</td>
      <td>Filter by a single instance, and go from a slow trace to that instance's logs.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>env</code>, <code>service</code>, and <code>version</code></td>
      <td>Usage metrics</td>
      <td>Route alerts by service and environment. See <a href="/getting_started/tagging/unified_service_tagging/">Unified Service Tagging</a>.</td>
    </tr>
  </tbody>
</table>

<div class="alert alert-info">Datadog adds the <code>lambda_microvm_id</code> tag after AWS sends the <code>/run</code> hook. CPU metrics are tagged by image, not by instance.</div>

## Limitations

- Tracing support is limited to Node.js and Python.
- Sidecar mode isn't supported.
- Memory metrics aren't available.
- CPU metrics are tagged by image, not by instance.
- On guests without cgroups, `cpu.limit` reports the number of visible CPUs. It doesn't report the AWS baseline, burst entitlement, or host quota.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/google_cloud_run/
[2]: /serverless/azure_container_apps/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /getting_started/site/
[5]: /getting_started/tagging/unified_service_tagging/
[6]: /tracing/trace_collection/dd_libraries/nodejs/
[7]: /tracing/trace_collection/dd_libraries/python/
[8]: /tracing/other_telemetry/connect_logs_and_traces/
[9]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-microvms-guide.html
[10]: https://docs.aws.amazon.com/lambda/latest/dg/microvms-images-snapshots.html
[11]: https://docs.aws.amazon.com/lambda/latest/dg/microvms-how-it-works.html
[12]: https://firecracker-microvm.github.io/
[13]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#microvms-quotas
[14]: https://hub.docker.com/r/datadog/serverless-init
[15]: https://gallery.ecr.aws/datadog/serverless-init
