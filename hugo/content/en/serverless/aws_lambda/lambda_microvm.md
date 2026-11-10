---
title: Monitoring AWS Lambda MicroVMs
description: Set up Datadog Serverless Monitoring for AWS Lambda MicroVMs.
further_reading:
  - link: https://docs.aws.amazon.com/lambda/latest/dg/lambda-microvms-guide.html
    tag: External Site
    text: AWS Lambda MicroVMs overview
  - link: https://docs.aws.amazon.com/lambda/latest/dg/microvms-how-it-works.html
    tag: External Site
    text: How AWS Lambda MicroVMs work
  - link: https://docs.aws.amazon.com/lambda/latest/dg/microvms-images-snapshots.html
    tag: External Site
    text: AWS Lambda MicroVM images and snapshots
  - link: /tracing/trace_collection/dd_libraries/nodejs/
    tag: Documentation
    text: Tracing Node.js applications
  - link: /tracing/trace_collection/dd_libraries/python/
    tag: Documentation
    text: Tracing Python applications
  - link: /tracing/other_telemetry/connect_logs_and_traces/
    tag: Documentation
    text: Correlate logs and traces
  - link: /getting_started/tagging/unified_service_tagging/
    tag: Documentation
    text: Unified service tagging
  - link: /serverless/google_cloud_run/containers/in_container/
    tag: Documentation
    text: Instrumenting Google Cloud Run containers in-container
---

{{< callout url=false btn_hidden="true" header="Join the Preview!" >}}
Datadog Serverless Monitoring for AWS Lambda MicroVMs is in Preview. To sign up, contact your Datadog representative.
{{< /callout >}}

Datadog collects logs, traces, and metrics, including CPU utilization, from your [AWS Lambda MicroVMs][11] throughout their life cycle. MicroVMs run applications in isolated [Firecracker][12] virtual machines. Each instance starts from an image snapshot and can suspend when idle, then resume with its memory and disk state intact.

## Prerequisites

- A Datadog API key and network egress to Datadog.
- An application that follows the AWS MicroVM service model.
- `serverless-init` v1.11.4 or later, configured as the container entrypoint. Sidecar mode is not supported.

Optionally, to collect traces, install a Datadog tracer that meets the following minimum version. Without a tracer, `serverless-init` still collects logs and metrics.

| Component | Minimum version |
|---|---|
| Node.js tracer (`dd-trace`) | 6.15.0 |
| Python tracer (`ddtrace`) | 4.17.0 |

If your application uses OpenSSL, use a snapshot-compatible version. AWS provides one in the `public.ecr.aws/lambda/microvms:al2023-minimal` container base image. You can also use your own base image with the patched OpenSSL library. See [AWS guidance on snapshots][10].

## Setup

### Instrument the image

1. Add `serverless-init` v1.11.4 or later to your MicroVM image. Set it as the container entrypoint, with your application as the command. The image is available on [Docker Hub][7] and the [Amazon ECR Public Gallery][8].

   The following examples include optional tracing and use an application on port `8080` and life cycle hooks on port `9000`. Replace the application filenames and startup commands as needed.

   {{< tabs >}}

   {{% tab "Node.js" %}}

   Add `dd-trace` v6.15.0 or later to `package.json` and update `package-lock.json`, for example, with `npm install dd-trace@6.15.0`. Install Node.js from the Amazon Linux packages to use snapshot-compatible OpenSSL.

   ```dockerfile
   FROM public.ecr.aws/lambda/microvms:al2023-minimal
   WORKDIR /app
   RUN dnf install -y nodejs22 nodejs22-npm && dnf clean all
   COPY package.json package-lock.json ./
   RUN npm ci --omit=dev
   COPY . .
   COPY --from=datadog/serverless-init:1.11.4 /datadog-init /serverless-init
   ENV DD_AWS_MICROVM_USER_APP_PORT=8080 \
       DD_AWS_MICROVM_ENABLE_RUN=true
   EXPOSE 8080 9000
   ENTRYPOINT ["/serverless-init"]
   CMD ["node", "--require", "dd-trace/init", "app.js"]
   ```

   The `--require dd-trace/init` option initializes the tracer before loading application code. If `app.js` already calls `require('dd-trace').init()` before importing other libraries, use `CMD ["node", "app.js"]` instead.

   For more information, see [Tracing Node.js Applications](/tracing/trace_collection/dd_libraries/nodejs/).

   {{% /tab %}}

   {{% tab "Python" %}}

   Add `ddtrace` v4.17.0 or later to `requirements.txt`. Install the dependencies, then start the application with `ddtrace-run`:

   ```dockerfile
   FROM public.ecr.aws/lambda/microvms:al2023-minimal
   WORKDIR /app
   RUN dnf install -y python3.12 python3.12-pip && dnf clean all
   COPY requirements.txt ./
   RUN python3.12 -m pip install --no-cache-dir -r requirements.txt
   COPY . .
   COPY --from=datadog/serverless-init:1.11.4 /datadog-init /serverless-init
   ENV PYTHONUNBUFFERED=1 \
       DD_AWS_MICROVM_USER_APP_PORT=8080 \
       DD_AWS_MICROVM_ENABLE_RUN=true
   EXPOSE 8080 9000
   ENTRYPOINT ["/serverless-init"]
   CMD ["ddtrace-run", "python3.12", "app.py"]
   ```

   `ddtrace-run` initializes tracing before the application starts. Python tracing supports WSGI and ASGI applications, including Flask, Django, FastAPI, and Starlette.

   For more information, see [Tracing Python Applications](/tracing/trace_collection/dd_libraries/python/).

   {{% /tab %}}

   {{< /tabs >}}

   Each example forwards the `/run` hook to your application. MicroVM instances start from the same image snapshot, so without this, instances can share trace and span IDs. When the tracer receives `/run`, it generates new IDs for the instance.

   <div class="alert alert-info">To collect logs and metrics without tracing, omit the tracer dependency and initialization. Use <code>CMD ["node", "app.js"]</code> for Node.js or <code>CMD ["python3.12", "app.py"]</code> for Python. You can also omit <code>DD_AWS_MICROVM_USER_APP_PORT</code> and <code>DD_AWS_MICROVM_ENABLE_RUN</code> unless your application needs forwarded life cycle hooks.</div>

2. Set the following environment variables:

   ```text
   DD_API_KEY=<DATADOG_API_KEY>
   DD_SITE=<DATADOG_SITE>
   DD_SERVICE=<SERVICE_NAME>
   DD_ENV=<ENVIRONMENT>
   DD_VERSION=<VERSION>
   ```

   Set `DD_SITE` to your [Datadog site][1]: {{< region-param key="dd_site" code="true" >}}.

3. Enable the AWS Lambda MicroVM life cycle hooks in the image configuration.

   `serverless-init` starts and supervises your application. It handles the `/ready` and `/validate` hooks during image setup, and the `/run`, `/resume`, `/suspend`, and `/terminate` hooks at runtime.

### Enable logs

Set `DD_LOGS_ENABLED=true` to collect logs. To correlate logs with traces, enable log injection in your tracer and configure the logs pipeline to parse trace and span IDs. With log injection enabled, JSON logs include active trace and span IDs. Supported Node.js loggers include Bunyan, Pino, and Winston. For Python, use `structlog`.

See [correlating logs and traces][4] for [Node.js][5] and [Python][6].

### Forward life cycle hooks to your application

This section is optional. The Dockerfile examples in the [Instrument the image](#instrument-the-image) section already forward the `/run` hook for tracing.

By default, `serverless-init` handles life cycle hooks on port `9000` and does not forward them to your application. To forward a hook, set `DD_AWS_MICROVM_USER_APP_PORT` to the port your application listens on at `127.0.0.1`, then set the matching `DD_AWS_MICROVM_ENABLE_<HOOK>` variable to `true`. The app and life cycle ports must differ. You need both settings; either one alone leaves forwarding disabled.

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap; width: 320px; min-width: 320px;">Environment variable</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_LIFECYCLE_PORT</code></td>
      <td>Port <code>serverless-init</code> listens on for life cycle hooks.</td>
      <td><code>9000</code></td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_USER_APP_PORT</code></td>
      <td>Port your application listens on at <code>127.0.0.1</code>. Required to forward hooks.</td>
      <td>Not set (no forwarding)</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_ENABLE_READY</code></td>
      <td>Forward <code>/ready</code> to your application.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_ENABLE_VALIDATE</code></td>
      <td>Forward <code>/validate</code> to your application.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_ENABLE_RUN</code></td>
      <td>Forward <code>/run</code> to your application.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_ENABLE_RESUME</code></td>
      <td>Forward <code>/resume</code> to your application.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_ENABLE_SUSPEND</code></td>
      <td>Forward <code>/suspend</code> to your application.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_ENABLE_TERMINATE</code></td>
      <td>Forward <code>/terminate</code> to your application.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_READY_TIMEOUT_MS</code></td>
      <td>Timeout for a forwarded <code>/ready</code> hook, in milliseconds.</td>
      <td><code>30000</code> (30 s)</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_VALIDATE_TIMEOUT_MS</code></td>
      <td>Timeout for a forwarded <code>/validate</code> hook, in milliseconds.</td>
      <td><code>30000</code> (30 s)</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>DD_AWS_MICROVM_FORWARD_TIMEOUT_MS</code></td>
      <td>Timeout for forwarded <code>/run</code>, <code>/resume</code>, <code>/suspend</code>, and <code>/terminate</code> hooks, in milliseconds.</td>
      <td><code>1000</code> (1 s)</td>
    </tr>
  </tbody>
</table>

Timeouts apply only to forwarded hooks. You don't need to forward hooks to collect logs and metrics.

## Data collected

### Metrics

Datadog collects these CPU utilization and life cycle metrics for each MicroVM without additional setup:

| Metric | Description |
|---|---|
| `aws.lambda.microvm.enhanced.cpu.usage` | CPU usage for the MicroVM, in nanocores. |
| `aws.lambda.microvm.enhanced.cpu.limit` | Number of CPUs available to the guest, expressed in nanocores. |
| `aws.lambda.microvm.enhanced.validate` | Number of validation hook events. |
| `aws.lambda.microvm.enhanced.run` | Number of run hook events. |
| `aws.lambda.microvm.enhanced.resume` | Number of resume hook events. |
| `aws.lambda.microvm.enhanced.suspend` | Number of suspend hook events. |
| `aws.lambda.microvm.enhanced.terminate` | Number of termination hook events. |
| `aws.lambda.microvm.enhanced.active_instances` | Periodic heartbeat while a MicroVM is running or resumed. This is a periodic sample, not an exact instance count. |

#### CPU metrics

`serverless-init` samples CPU metrics every 3 seconds, starting when the MicroVM starts. CPU metrics are enabled by default. To disable them, set `DD_ENHANCED_METRICS_ENABLED=false`. Life cycle and heartbeat metrics are still reported.

Both CPU metrics report raw values in nanocores: 1 CPU core equals 1,000,000,000 nanocores. The provided dashboard converts them to cores, the unit AWS uses for CPU capacity, by dividing the values by `1e9`. The metrics use the same units as [`container.cpu.usage` and `container.cpu.limit`][9].

CPU metrics are available with or without cgroups. When cgroups are unavailable, `cpu.limit` reflects the CPU count visible to the MicroVM, which may differ from its AWS CPU capacity.

### Tags

Logs and traces include the MicroVM image ARN as `resource_id`, the image name as `image_name`, and the image version as `lambda_microvm_image_version`. CPU and life cycle metrics include the `resource_id` and `image_name` tags. The instance heartbeat also includes the image ARN as `microvm_image_arn`.

After AWS sends the `/run` hook, logs, traces, life cycle metrics, and the instance heartbeat also include the `lambda_microvm_id` instance ID tag. CPU metrics use image tags, not instance tags. Usage metrics include the unified service tags `env`, `service`, and `version`.

### Data flush on suspend and terminate

When a MicroVM suspends or terminates, `serverless-init` sends pending metrics, logs, and traces to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[4]: /tracing/other_telemetry/connect_logs_and_traces/
[5]: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
[6]: /tracing/other_telemetry/connect_logs_and_traces/python/
[7]: https://hub.docker.com/r/datadog/serverless-init
[8]: https://gallery.ecr.aws/datadog/serverless-init
[9]: /integrations/container/
[10]: https://docs.aws.amazon.com/lambda/latest/dg/microvms-images-snapshots.html
[11]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-microvms-guide.html
[12]: https://firecracker-microvm.github.io/
