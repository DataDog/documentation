---
title: OpenTelemetry
disable_toc: false
---

## Overview

Use Observability Pipelines' OpenTelemetry (OTel) source to collect logs from your OTel Collector through HTTP or gRPC. Select and set up this source when you set up a pipeline. The information below is configured in the pipelines UI.

### When to use this source

Common scenarios when you might use this source:

- You are using [OpenTelemetry][1] as your standard method for collecting and routing data, and you want to normalize that data, before routing them to different destinations.
- You are collecting data from multiple sources and want to aggregate them in a central place for consistent processing.
    - For example, if some of your services export logs using OpenTelemetry, while other services use Datadog Agents or other Observability Pipelines [sources][2], you can aggregate all of your data in Observability Pipelines for processing.

## Prerequisites

If your forwarders are globally configured to enable SSL, you need the appropriate TLS certificates and the password you used to create your private key.

## Set up the source in the pipeline UI

Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][3] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS #8) format.

{{< img src="observability_pipelines/sources/otel_settings.png" alt="The OpenTelemetry source settings" style="width:35%;" >}}

## Set the environment variables

{{< img src="observability_pipelines/sources/otel_env_vars.png" alt="The install page showing the OpenTelemetry environment variable field" style="width:75%;" >}}

You must provide both HTTP and gRPC endpoints. Configure your OTLP exporters to point to one of these endpoints. See [Send logs to the Observability Pipelines Worker](#send-logs-to-the-observability-pipelines-worker) for more information.

- HTTP listener address
	- The Observability Pipelines Worker listens to this socket address to receive logs from the OTel collector.
    - Stored as the environment variable `DD_OP_SOURCE_OTEL_HTTP_ADDRESS`.

- gRPC listener address
	- The Observability Pipelines Worker listens to this socket address to receive logs from the OTel collector.
    - Stored as the environment variable `DD_OP_SOURCE_OTEL_GRPC_ADDRESS`.

## Send logs to the Observability Pipelines Worker

Configure your OTel exporters to point to HTTP or gRPC.

### HTTP configuration example

The Worker exposes the HTTP endpoint on port 4317. This is an example of configuring your OTel exporters with HTTP using Python:

```python
    from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
    http_exporter = OTLPLogExporter(
        endpoint="http://worker:4317/v1/logs"
    )
```

### gRPC configuration example

The Worker exposes the gRPC endpoint on port 4318. This is an example of configuring your OTel exporters with gRPC:

```python
    from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
    grpc_exporter = OTLPLogExporter(
        endpoint="grpc://worker:4318"
    )
```

Based on these example configurations, these are values you enter for the following environment variables:

- HTTP listener address: `worker:4317`
- gRPC listener address: `worker:4318`

[1]: https://opentelemetry.io/docs/collector/
[2]: /observability_pipelines/configuration/sources/
[3]: /observability_pipelines/scaling_and_performance/advanced_worker_configurations/#bootstrap-options