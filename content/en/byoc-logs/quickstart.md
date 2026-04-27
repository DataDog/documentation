---
title: BYOC Logs Quickstart
description: Get started with BYOC Logs locally in less than 5 minutes
further_reading:
- link: "/byoc-logs/install/docker/"
  tag: "Documentation"
  text: "BYOC Logs Docker Installation"
- link: "/byoc-logs/ingest_logs/rest_api/"
  tag: "Documentation"
  text: "BYOC Logs REST API"
aliases:
  - /cloudprem/quickstart/
---

{{< callout btn_hidden="true" header="Join the Preview!" >}}
  BYOC Logs is in Preview.
{{< /callout >}}

## Overview

Get started with BYOC Logs locally in less than 5 minutes. This quickstart covers the following:
1. Start BYOC Logs locally using Docker.
2. Verify the cluster status.
3. Send a "Hello World" log.
4. View the log in the Datadog Log Explorer.

## Prerequisites

- Ask for the [BYOC Logs Preview][1].
- **Datadog API Key**: [Get your API key][2].
- **Docker**: [Install Docker][3].

## Step 1: Start BYOC Logs

Run the following command in your terminal to start a local BYOC Logs instance. Replace `<YOUR_API_KEY>` with your actual Datadog API Key.

```shell
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE="datadoghq.com"

docker run -d \
  --name byoc-logs \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

## Step 2: Verify status in the BYOC Logs console

In Datadog, go to the [BYOC Logs console][4] and check that your cluster is connected. You should see the `connected` status.

In the BYOC Logs console, you can edit the cluster metadata and rename your cluster to `demo`.

{{< img src="/cloudprem/quickstart/clouprem_console.png" alt="Screenshot of the BYOC Logs console showing the cluster connected status" style="width:100%;" >}}

## Step 3: Send a log

In your terminal, send a "Hello World" log entry directly to your local BYOC Logs instance using the API:

```shell
curl -X POST "http://localhost:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '[
    {
      "message": "Hello world from BYOC Logs",
      "level": "info",
      "service": "demo"
    }
  ]'
```

## Step 4: Explore logs

1. Go to the [Datadog Log Explorer][5].
2. On the left facet panel, select the checkbox for your index under {{< ui >}}BYOC INDEXES{{< /ui >}}.
3. You should see your "Hello world from BYOC Logs" log entry.

{{< img src="/cloudprem/quickstart/cloudprem_indexes.png" alt="The BYOC Logs index selection in the Datadog Log Explorer" style="width:100%;" >}}

## Next steps

With BYOC Logs running, you can:
- [Send logs with the Datadog Agent][6] to automatically collect logs from your containers.
- [Send logs with Observability Pipelines][7].

[2]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.docker.com/get-docker/
[4]: https://app.datadoghq.com/byoc-logs
[5]: https://app.datadoghq.com/logs?query=index=cloudprem-demo&storage=hot
[6]: /byoc-logs/ingest/agent/
[7]: /byoc-logs/ingest/observability_pipelines/