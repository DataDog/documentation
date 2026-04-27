---
title: Set up Log Ingestion
description: Configure log sources to send data to your BYOC Logs deployment
aliases:
  - /cloudprem/ingest/
---

{{< callout btn_hidden="true" header="BYOC Logs is in Preview" >}}
  BYOC Logs is in Preview.
{{< /callout >}}

## Overview

After installing and configuring BYOC Logs, you need to set up log ingestion to start sending log data from your applications and infrastructure. BYOC Logs supports multiple ingestion methods to accommodate different architectures and requirements.

## Supported log format

BYOC Logs accepts logs as **JSON objects** sent to the `/api/v2/logs` endpoint. Each request body must be a JSON array of log objects:

```json
[
  {"message": "First log entry", "service": "my-app", "level": "info"},
  {"message": "Second log entry", "service": "my-app", "level": "error"}
]
```

<div class="alert alert-info">
<strong>NDJSON (newline-delimited JSON) is not supported.</strong> If your log source sends one JSON object per line without array wrapping, use Observability Pipelines to reformat the payload before sending to BYOC Logs.
</div>

## Log ingestion methods

{{< whatsnext desc="Choose the appropriate ingestion method based on your infrastructure and requirements:">}}
   {{< nextlink href="/byoc-logs/ingest/agent/" >}}Datadog Agent{{< /nextlink >}}
   {{< nextlink href="/byoc-logs/ingest/observability_pipelines/" >}}Observability Pipelines{{< /nextlink >}}
   {{< nextlink href="/byoc-logs/ingest/api/" >}}REST API Integration{{< /nextlink >}}
{{< /whatsnext >}}

## Additional ingestion paths

### Datadog Lambda Forwarder

The [Datadog Lambda Forwarder][1] can send AWS CloudWatch Logs to BYOC Logs by setting the `DD_URL` environment variable to your BYOC Logs endpoint:

```
DD_URL=<CLOUDPREM_HOST>
```

The forwarder sends logs to `https://<DD_URL>:443/api/v2/logs`. 

**Note:** API key validation (`/api/v1/validate`) is sent to Datadog SaaS (controlled by `DD_API_URL`), not to BYOC Logs. This means you need a valid Datadog API key even when forwarding to BYOC Logs.

### OpenTelemetry

BYOC Logs can receive logs from OpenTelemetry collectors through Observability Pipelines. See [Send OTel logs to BYOC Logs with Observability Pipelines][2] for setup instructions.

[1]: /serverless/libraries_integrations/forwarder/
[2]: /byoc-logs/guides/send_otel_logs_observability_pipelines/
