---
title: Introduction to BYOC Logs
description: Learn about BYOC Logs architecture, components, and supported features
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="BYOC Logs is in Preview" >}}
  Join the BYOC Logs Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

BYOC Logs is Datadog's log management solution that runs in your own infrastructure. It indexes and stores logs in your object storage, executes search and analytics queries, and connects to the Datadog UI for a fully integrated experience. BYOC Logs is designed for organizations with specific requirements:
- Data residency, privacy, and regulatory requirements
- High volume requirements

Here is a high-level overview of how BYOC Logs works:

{{< img src="/cloudprem/overview_diagram_cloudprem.png" alt="BYOC Logs architecture overview showing how logs flow from sources through BYOC Logs to the Datadog platform" style="width:100%;" >}}

The diagram illustrates the BYOC Logs hybrid architecture, highlighting how data is processed and stored within your infrastructure:

*   **Ingestion**: Logs are collected from Datadog Agents and other sources using standard protocols.
*   **Your Infrastructure**: The BYOC Logs platform runs entirely inside your infrastructure. It processes and stores logs in your own storage (S3, Azure Blob, MinIO).
*   **Datadog SaaS**: The Datadog platform is BYOC Logs' Control Plane, it hosts the Datadog UI and communicates with BYOC Logs through a secure connection to send log queries and receive results.

{{< whatsnext desc="Explore BYOC Logs' architecture and capabilities:">}}
  {{< nextlink href="/cloudprem/introduction/architecture/" >}}Architecture - Understand how BYOC Logs components work together{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/network/" >}}Network - Understand how BYOC Logs communicates with Datadog{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/features/" >}}Supported Features - See which Log Explorer features are available in BYOC Logs{{< /nextlink >}}
{{< /whatsnext >}}

## Get started

{{< whatsnext desc="Ready to deploy BYOC Logs? Follow these guides:">}}
  {{< nextlink href="/cloudprem/quickstart/" >}}Quickstart - Run BYOC Logs locally in 5 minutes{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/" >}}Installation - Deploy BYOC Logs on AWS, Azure, or custom Kubernetes{{< /nextlink >}}
  {{< nextlink href="/cloudprem/ingest/agent/" >}}Ingest Logs - Configure the Datadog Agent to send logs to BYOC Logs{{< /nextlink >}}
{{< /whatsnext >}}

