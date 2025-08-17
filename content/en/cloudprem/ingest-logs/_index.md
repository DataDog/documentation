---
title: Set up Log Ingestion
description: Configure log sources to send data to your CloudPrem deployment
private: true
---

<div class="alert alert-warning">CloudPrem is in Preview.</div>

## Overview

After installing and configuring CloudPrem, you need to set up log ingestion to start sending log data from your applications and infrastructure. CloudPrem supports multiple ingestion methods to accommodate different architectures and requirements.

## Log ingestion methods

Choose the appropriate ingestion method based on your infrastructure and requirements:

{{< whatsnext >}}
   {{< nextlink href="/cloudprem/ingest-logs/datadog-agent/" >}}Datadog Agent{{< /nextlink >}}
   {{< nextlink href="/cloudprem/ingest-logs/observability-pipelines/" >}}Observability Pipelines{{< /nextlink >}}
   {{< nextlink href="/cloudprem/ingest-logs/rest-api/" >}}REST API Integration{{< /nextlink >}}
{{< /whatsnext >}}

## Next steps

After setting up log ingestion:

1. **Configure Datadog account** - Register your CloudPrem deployment with Datadog support
2. **Set up monitoring** - Add [monitoring and alerts](../manage/) for your deployment

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
