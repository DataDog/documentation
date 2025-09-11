---
title: OpenTelemetry
disable_toc: false
---

## Overview

Use Observability Pipelines' OpenTelemetry (OTel) source to collect logs from your OTel collector through HTTP or gRPC. Select and set up this source when you set up a pipeline. The information below is configured in the pipelines UI.

## Prerequisites

If your forwarders are globally configured to enable SSL, you need the appropriate TLS certificates and the password you used to create your private key.

## Set up the source in the pipeline UI

Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Configurations][10172] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS #8) format.

## Set the environment variables

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

The Worker exposes the gRPC endpoint on port 4138. This is an example of configuring your OTel exporters with gRPC:

```python
    from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
    grpc_exporter = OTLPLogExporter(
        endpoint="grpc://worker:4318"
    )
```

Based on these example configurations, these are values you enter for the following environment variables:

- HTTP listener address: `worker:4317`
- gRPC listener address: `worker:4318`
