---
title: CloudPrem Quickstart
description: Get started with CloudPrem locally in less than 5 minutes
further_reading:
- link: "/cloudprem/install/docker/"
  tag: "Documentation"
  text: "CloudPrem Docker Installation"
- link: "/cloudprem/ingest_logs/rest_api/"
  tag: "Documentation"
  text: "CloudPrem REST API"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

In this quickstart, you will:
1. Start CloudPrem locally using Docker.
2. Verify the cluster status.
3. Send a "Hello World" log.
4. View the log in the Datadog Log Explorer.

## Prerequisites

- Ask for the [CloudPrem Preview](https://www.datadoghq.com/product-preview/cloudprem/).
- **Datadog API Key**: [Get your API key](https://app.datadoghq.com/organization-settings/api-keys).
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/).

## Step 1: Start CloudPrem

Run the following command in your terminal to start a local CloudPrem instance. Replace `<YOUR_API_KEY>` with your actual Datadog API Key.

```shell
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE="datadoghq.com"

docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

## Step 2: Verify status in the CloudPrem console

Go to the [CloudPrem console](https://app.datadoghq.com/cloudprem) and check that your cluster is connected. You should see the `connected` status. 

You can edit the cluster metadata and rename your cluster to `demo`.

## Step 3: Send a log

Send a "Hello World" log entry directly to your local CloudPrem instance using the API:

```shell
curl -X POST "http://localhost:7280/api/v1/datadog/ingest?commit=force" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "timestamp": "$(date +%s000)",
      "message": "Hello world from CloudPrem!",
      "level": "info",
      "service": "demo"
    }
  ]'
```

## Step 4: Explore logs

1. Go to the [Datadog Log Explorer](https://app.datadoghq.com/logs?query=index=cloudprem-demo&storage=hot).
2. You should see your "Hello world from CloudPrem!" log entry.

## Next steps

Now that you have CloudPrem running, you can:
- [Send logs with the Datadog Agent](/cloudprem/ingest_logs/datadog_agent) to automatically collect logs from your containers.
- [Send logs with Observability Pipelines](/cloudprem/ingest_logs/observability_pipelines/).
