---
title: Monitoring AWS Lambda MicroVMs
description: Set up Datadog Serverless Monitoring for AWS Lambda MicroVMs.
further_reading:
  - link: /serverless/google_cloud_run/containers/in_container/
    tag: Documentation
    text: Instrumenting Google Cloud Run containers in-container
---

Datadog collects logs, traces, and metrics throughout the AWS Lambda MicroVM lifecycle, including CPU utilization. MicroVMs run applications in isolated Firecracker virtual machines. When idle, a MicroVM can suspend and later resume with its memory and disk state intact.

**Supported runtimes for tracing:** Node.js, Python

## Setup

### Instrument your MicroVM image

1. Add `serverless-init` v1.11.4 or later to your MicroVM image. Set it as the container entrypoint and your application as the command. Sidecar mode is not supported.
2. Set the following environment variables:

   ```text
   DD_API_KEY=<DATADOG_API_KEY>
   DD_SITE=<DATADOG_SITE>
   DD_SERVICE=<SERVICE_NAME>
   DD_ENV=<ENVIRONMENT>
   DD_VERSION=<VERSION>
   ```

   See [Datadog sites][1] for the value of `DD_SITE` for your account.

3. Enable the AWS Lambda MicroVM lifecycle hooks in the image configuration. `serverless-init` starts and supervises your application, and handles the `/ready`, `/validate`, `/run`, `/resume`, `/suspend`, and `/terminate` hooks.

   By default, `serverless-init` handles lifecycle hooks on port `9000` and does not forward them to your application. To forward a hook, set `DD_AWS_MICROVM_USER_APP_PORT` to the port your application listens on at `127.0.0.1`, then set the matching `DD_AWS_MICROVM_ENABLE_<HOOK>` variable to `true`. The app and lifecycle ports must differ. You need both settings; either one alone leaves forwarding disabled.

   | Environment variable | Description | Default |
   |---|---|---|
   | `DD_AWS_MICROVM_LIFECYCLE_PORT` | Port `serverless-init` listens on for lifecycle hooks. | `9000` |
   | `DD_AWS_MICROVM_USER_APP_PORT` | Port your application listens on `127.0.0.1`. Required to forward hooks. | Not set (no forwarding) |
   | `DD_AWS_MICROVM_ENABLE_READY` | Forward `/ready` to your application. | `false` |
   | `DD_AWS_MICROVM_ENABLE_VALIDATE` | Forward `/validate` to your application. | `false` |
   | `DD_AWS_MICROVM_ENABLE_RUN` | Forward `/run` to your application. | `false` |
   | `DD_AWS_MICROVM_ENABLE_RESUME` | Forward `/resume` to your application. | `false` |
   | `DD_AWS_MICROVM_ENABLE_SUSPEND` | Forward `/suspend` to your application. | `false` |
   | `DD_AWS_MICROVM_ENABLE_TERMINATE` | Forward `/terminate` to your application. | `false` |
   | `DD_AWS_MICROVM_READY_TIMEOUT_MS` | Timeout for a forwarded `/ready` hook, in milliseconds. | `30000` (30 s) |
   | `DD_AWS_MICROVM_VALIDATE_TIMEOUT_MS` | Timeout for a forwarded `/validate` hook, in milliseconds. | `30000` (30 s) |
   | `DD_AWS_MICROVM_FORWARD_TIMEOUT_MS` | Timeout for forwarded `/run`, `/resume`, `/suspend`, and `/terminate` hooks, in milliseconds. | `1000` (1 s) |

   Timeouts apply only to forwarded hooks.

### Enable tracing

Install the Datadog tracer in your application. Minimum supported versions:

| Component | Minimum version |
|---|---|
| Node.js tracer (`dd-trace`) | 6.15.0 |
| Python tracer (`ddtrace`) | 4.17.0 |

See the setup instructions for [Node.js][2] or [Python][3].

To give each new MicroVM instance unique trace and span IDs, forward the `/run` hook to your application. Set `DD_AWS_MICROVM_USER_APP_PORT` and `DD_AWS_MICROVM_ENABLE_RUN=true`. Node.js images must use the AWS Amazon Linux 2023 MicroVM base image, which includes the snapshot-safe OpenSSL version required by the tracer. Python tracing supports WSGI and ASGI applications, including Flask, Django, FastAPI, and Starlette.

### Enable logs

Set `DD_LOGS_ENABLED=true` to collect logs. To correlate logs with traces, enable log injection in your tracer and configure the logs pipeline to parse trace and span IDs. With log injection enabled, JSON logs include the active trace and span IDs for Node.js applications using Bunyan, Pino, or Winston, and Python applications using `structlog`. See [correlating logs and traces][4] for [Node.js][5] and [Python][6].

## Data collected

### Metrics

Datadog collects these CPU utilization metrics for each MicroVM without additional setup:

| Metric | Description |
|---|---|
| `aws.lambda.microvm.enhanced.cpu.usage` | CPU usage for the MicroVM. |
| `aws.lambda.microvm.enhanced.cpu.limit` | Number of CPUs available to the guest. |

CPU metrics work with or without cgroups. `serverless-init` reads CPU data from cgroups when they are available. Otherwise, it uses `/proc/stat` and the CPU count visible to the guest. In that case, `cpu.limit` reports the guest-visible CPU count, not AWS baseline capacity, burst entitlement, or host quota.

`serverless-init` also emits enhanced lifecycle metrics under `aws.lambda.microvm.enhanced.*` for validation, run, resume, suspend, and termination events. It reports an `active_instances` heartbeat while an instance is running or resumed. This is a periodic sample, not an exact instance count.

Memory metrics are not available.

### Tags

Telemetry includes the MicroVM image ARN and image version. After AWS sends the `/run` hook, logs, traces, and the instance heartbeat also include the `lambda_microvm_id` instance ID. CPU metrics use image tags, not instance tags. Usage metrics include the unified service tags `env`, `service`, and `version`.

### Lifecycle data delivery

On `/suspend` and `/terminate`, `serverless-init` flushes metrics, logs, and traces before returning the lifecycle response. On `/terminate`, it shuts down the trace agent and sends pending trace statistics. On `/suspend`, it sends pending trace statistics but leaves the trace agent running for a later resume. DogStatsD flushes its packet buffer every 1 ms on MicroVMs, so custom metrics sent just before a lifecycle hook are included in that flush.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[4]: /tracing/other_telemetry/connect_logs_and_traces/
[5]: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
[6]: /tracing/other_telemetry/connect_logs_and_traces/python/
