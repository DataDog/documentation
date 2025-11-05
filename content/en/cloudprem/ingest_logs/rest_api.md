---
title: Send logs to CloudPrem with REST API
description: Learn how to integrate with CloudPrem using direct API calls
further_reading:
- link: "/cloudprem/ingest_logs/datadog_agent/"
  tag: "Documentation"
  text: "Datadog Agent Integration"
- link: "/cloudprem/ingest_logs/observability_pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines Integration"
---

{{< callout btn_hidden="true" >}}
  Datadog CloudPrem is in Preview.
{{< /callout >}}

## Overview

You can send logs to CloudPrem using direct REST API calls. This method is useful for custom integrations or scripts that can't use a Datadog Agent or Observability Pipelines.

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
