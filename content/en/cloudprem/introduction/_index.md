---
title: Introduction to CloudPrem
description: Learn about CloudPrem architecture, components, and supported features
further_reading:
- link: "/cloudprem/install/"
  tag: "Documentation"
  text: "Install CloudPrem"
- link: "/cloudprem/ingest/"
  tag: "Documentation"
  text: "Ingest Logs to CloudPrem"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

CloudPrem is Datadog BYOC log management solution. It runs in your own infrastructure, indexes and stores logs in your object storage, execute search and analytics queries and connects to Datadog UI to give a fully integrated experience with Datadog products.

Here is a high-level overview of how CloudPrem works:

{{< img src="/cloudprem/overview_diagram_cloudprem.png" alt="CloudPrem architecture overview showing how logs flow from sources through CloudPrem to the Datadog platform" style="width:100%;" >}}

The diagram illustrates the CloudPrem hybrid architecture, highlighting how data is processed and stored within your infrastructure:

*   **Ingestion**: Logs are collected from Datadog Agents and other sources using standard protocols.
*   **Your Infrastructure**: The CloudPrem platform runs entirely inside your infrastructure. It processes and stores logs in your own storage (S3, Azure Blob, MinIO).
*   **Datadog SaaS**: The Datadog platform is CloudPrem's Control Plane, it hosts the Datadog UI and communicates with CloudPrem via a secure connection to send log queries and receive results.

## Use cases

CloudPrem is designed for organizations with specific requirements:
- Data residency, privacy and regulatory requirements
- High volume requirements 

## Learn about CloudPrem

{{< whatsnext desc="Explore CloudPrem's architecture and capabilities:">}}
  {{< nextlink href="/cloudprem/introduction/architecture/" >}}Architecture - Understand how CloudPrem components work together{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/network/" >}}Network - Understand how CloudPrem communicates with Datadog{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/features/" >}}Supported Features - See which Log Explorer features are available in CloudPrem{{< /nextlink >}}
{{< /whatsnext >}}

## Get started

Ready to deploy CloudPrem? Follow these guides:

{{< whatsnext desc="Deploy and configure CloudPrem:">}}
  {{< nextlink href="/cloudprem/quickstart/" >}}Quickstart - Run CloudPrem locally in 5 minutes{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/" >}}Installation - Deploy CloudPrem on AWS, Azure, or custom Kubernetes{{< /nextlink >}}
  {{< nextlink href="/cloudprem/ingest/agent/" >}}Ingest Logs - Configure the Datadog Agent to send logs to CloudPrem{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
