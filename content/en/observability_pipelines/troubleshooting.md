---
title: Troubleshooting
disable_toc: false
---

## Overview

If you experience unexpected behavior with Datadog Observability Pipelines (OP), there are a few common issues you can investigate, and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

## View Observability Pipelines Worker stats and logs

To view information about the Observability Pipelines Workers running for an active pipeline:

1. Navigate to [Observability Pipelines][2].
1. Select your pipeline.
1. Click the **Workers** tab to see the Workers' memory and CPU utilization, traffic stats, and any errors.
1. To view the Workers' statuses and versions, click the **Latest Deployment & Setup** tab.
1. To see the Workers' logs, click the cog at the top right side of the page, then select **View OPW Logs**. See [Logs Search Syntax][3] for details on how to filter your logs. To see logs for a specific Worker, add `@op_work.id:<worker_id>` to the search query.

## Inspect events sent through your pipeline to identify setup issues

If you can access your Observability Pipelines Workers locally, use the `tap` command to see the raw data sent through your pipeline's source and processors.

### Enable the Observability Pipelines Worker API

 The Observability Pipelines Worker API allows you to interact with the Worker's processes with the `tap` command. If you are using the Helm charts provided when you [set up a pipeline][4], then the API has already been enabled. Otherwise, make sure the environment variable `DD_OP_API_ENABLED` is set to `true` in `/etc/observability-pipelines-worker/bootstrap.yaml`. See [Bootstrap options][5] for more information. This sets up the API to listen on `localhost` and port `8686`, which is what the CLI for `tap` is expecting.

### Use `top` to find the component ID

You need the source's or processor's component ID to `tap` into it. Use the `top` command to find the ID of the component you want to `tap` into:

```
observability-pipelines-worker top
```

### Use `tap` to see your data

If you are on the same host as the Worker, run the following command to `tap` the output of the component:

```
observability-pipelines-worker tap <component_ID>
```

If you are using a containerized environment, use the `docker exec` or `kubectl exec` command to get a shell into the container to run the above `tap` command.

## Seeing delayed logs at the destination

Observability Pipelines destinations batch events before sending them to the downstream integration. For example, the Amazon S3, Google Cloud Storage, and Azure Storage destinations have a batch timeout of 900 seconds. If the other batch parameters (maximum events and maximum bytes) have not been met within the 900-second timeout, the batch is flushed at 900 seconds. This means the destination component can take up to 15 minutes to send out a batch of events to the downstream integration.

These are the batch parameters for each destination:

{{% observability_pipelines/destination_batching %}}

See [event batching][6] for more information.

[1]: /help/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /logs/explorer/search_syntax/
[4]: /observability_pipelines/set_up_pipelines/#set-up-a-pipeline
[5]: /observability_pipelines/advanced_configurations/#bootstrap-options
[6]: /observability_pipelines/destinations/#event-batching-intro