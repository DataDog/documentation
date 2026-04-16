---
title: Set up Log Ingestion
description: Configure log sources to send data to your CloudPrem deployment
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

After installing and configuring CloudPrem, you need to set up log ingestion to start sending log data from your applications and infrastructure. CloudPrem supports multiple ingestion methods to accommodate different architectures and requirements.

## Supported log format

CloudPrem accepts logs as **JSON objects** sent to the `/api/v2/logs` endpoint. Each request body must be a JSON array of log objects:

```json
[
  {"message": "First log entry", "service": "my-app", "level": "info"},
  {"message": "Second log entry", "service": "my-app", "level": "error"}
]
```

<div class="alert alert-info">
<strong>NDJSON (newline-delimited JSON) is not supported.</strong> If your log source sends one JSON object per line without array wrapping, use Observability Pipelines to reformat the payload before sending to CloudPrem.
</div>

## Log ingestion methods

{{< whatsnext desc="Choose the appropriate ingestion method based on your infrastructure and requirements:">}}
   {{< nextlink href="/cloudprem/ingest/agent/" >}}Datadog Agent{{< /nextlink >}}
   {{< nextlink href="/cloudprem/ingest/observability_pipelines/" >}}Observability Pipelines{{< /nextlink >}}
   {{< nextlink href="/cloudprem/ingest/api/" >}}REST API Integration{{< /nextlink >}}
{{< /whatsnext >}}

## Additional ingestion paths

### Datadog Lambda Forwarder

The [Datadog Lambda Forwarder][1] can send AWS CloudWatch Logs to CloudPrem by setting the `DD_URL` environment variable to your CloudPrem endpoint:

```
DD_URL=<CLOUDPREM_HOST>
```

The forwarder sends logs to `https://<DD_URL>:443/api/v2/logs`. Note that API key validation (`/api/v1/validate`) is sent to Datadog SaaS (controlled by `DD_API_URL`), not to CloudPrem. This means you need a valid Datadog API key even when forwarding to CloudPrem.

### OpenTelemetry

CloudPrem can receive logs from OpenTelemetry collectors through Observability Pipelines. See [Send OTel logs to CloudPrem with Observability Pipelines][2] for setup instructions.

[1]: /serverless/libraries_integrations/forwarder/
[2]: /cloudprem/guides/send_otel_logs_observability_pipelines/
