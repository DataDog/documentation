---
title: CloudPrem
description: Learn how to deploy and manage Datadog CloudPrem, a self-hosted log management solution for cost-effective log ingestion, processing, indexing, and search capabilities
private: true
---

<div class="alert alert-warning">CloudPrem is in Preview.</div>

## Overview

{{< img src="/cloudprem/overview_diagram_cloudprem.png" alt="CloudPrem architecture overview showing how logs flow from sources through CloudPrem to the Datadog platform" style="width:100%;" >}}

Datadog CloudPrem is a self-hosted log management solution that enables cost-effective log ingestion, processing, indexing, and search capabilities within your own infrastructure. Built to meet data residency, stringent security, and high-volume requirements, CloudPrem integrates with the Datadog platform to provide log analysis, visualization, and alerting — all while keeping your log data at rest within your infrastructure boundaries.

## Key features

- **Self-hosted**: Deploy CloudPrem within your own infrastructure and store your logs on your object storage.
- **Cost-effective**: Low infrastructure costs thanks to decoupled compute and storage architecture and fast search on object storage.
- **Scalable**: Horizontally scalable architecture to handle high-volume log ingestion.
- **Integrated in Datadog**: CloudPrem works with Datadog's log core features such as full-text search, Dashboards, monitors and more.

## Get started

Follow these steps to deploy and configure CloudPrem:

{{< whatsnext desc="">}}
  {{< nextlink href="/cloudprem/overview/architecture" >}}CloudPrem Architecture{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/" >}}Install CloudPrem{{< /nextlink >}}
  {{< nextlink href="/cloudprem/ingest-logs/datadog-agent" >}}Ingest logs with Datadog Agent{{< /nextlink >}}
  {{< nextlink href="/cloudprem/manage/" >}}Manage and Monitor{{< /nextlink >}}
  {{< nextlink href="/cloudprem/supported-features/" >}}Supported Features{{< /nextlink >}}
{{< /whatsnext >}}
