---
title: Send logs to BYOC Logs with REST API
aliases:
- /cloudprem/ingest_logs/rest_api/
- /cloudprem/ingest/api/
description: Learn how to integrate with BYOC Logs using direct API calls
further_reading:
- link: "/byoc-logs/ingest_logs/datadog_agent/"
  tag: "Documentation"
  text: "Datadog Agent Integration"
- link: "/byoc-logs/ingest_logs/observability_pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines Integration"
---

{{< callout btn_hidden="true" header="Join the Preview!" >}}
  BYOC Logs is in Preview.
{{< /callout >}}

## Overview

You can send logs to BYOC Logs using direct REST API calls. This method is useful for custom integrations or scripts that can't use a Datadog Agent or Observability Pipelines.

## Datadog Logs API

**Endpoint**: `POST /api/v2/logs`<br>
**Content-Type**: `application/json`<br>
**Authentication**: Datadog API key

```shell
curl -X POST "http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: your-datadog-api-key" \
  -d '[
    {
      "message": "User login successful",
      "level": "info",
      "timestamp": "2024-01-15T10:30:00Z",
      "service": "auth-service",
      "host": "web-01",
      "tags": ["authentication", "success"]
    }
  ]'
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
