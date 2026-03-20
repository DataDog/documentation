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

Get started with CloudPrem locally in less than 5 minutes. This quickstart covers the following:
1. Start CloudPrem locally using Docker.
2. Verify the cluster status.
3. Send a "Hello World" log.
4. View the log in the Datadog Log Explorer.

## Prerequisites

- Ask for the [CloudPrem Preview][1].
- **Datadog API Key**: [Get your API key][2].
- **Docker**: [Install Docker][3].

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

In Datadog, go to the [CloudPrem console][4] and check that your cluster is connected. You should see the `connected` status.

In the CloudPrem console, you can edit the cluster metadata and rename your cluster to `demo`.

{{< img src="/cloudprem/quickstart/clouprem_console.png" alt="Screenshot of the CloudPrem console showing the cluster connected status" style="width:100%;" >}}

## Step 3: Send a log

In your terminal, send a "Hello World" log entry directly to your local CloudPrem instance using the API:

```shell
curl -X POST "http://localhost:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '[
    {
      "message": "Hello world from CloudPrem",
      "level": "info",
      "service": "demo"
    }
  ]'
```

## Step 4: Explore logs

1. Go to the [Datadog Log Explorer][5].
2. On the left facet panel, select the checkbox for your index under **CLOUDPREM INDEXES**.
3. You should see your "Hello world from CloudPrem" log entry.

{{< img src="/cloudprem/quickstart/cloudprem_indexes.png" alt="The CloudPrem index selection in the Datadog Log Explorer" style="width:100%;" >}}

## Next steps

With CloudPrem running, you can:
- [Send logs with the Datadog Agent][6] to automatically collect logs from your containers.
- [Send logs with Observability Pipelines][7].

[1]: https://www.datadoghq.com/product-preview/cloudprem/
[2]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.docker.com/get-docker/
[4]: https://app.datadoghq.com/cloudprem
[5]: https://app.datadoghq.com/logs?query=index=cloudprem-demo&storage=hot
[6]: /cloudprem/ingest/agent/
[7]: /cloudprem/ingest/observability_pipelines/