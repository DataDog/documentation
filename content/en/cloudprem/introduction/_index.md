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

Datadog CloudPrem is a hybrid log management solution that runs in your own environment and stores logs in your object storage (such as Amazon S3, Azure Blob Storage, or Google Cloud Storage). Similar to Observability Pipelines, CloudPrem keeps your log data within your infrastructure while integrating with the Datadog platform for search, visualization, and alerting.

Built on a decoupled architecture that separates compute and storage, CloudPrem enables you to:

- **Store logs at scale** - Process and index petabytes of log data using your own object storage
- **Search with Datadog** - Query and analyze your self-hosted logs through the familiar Datadog Log Explorer interface
- **Meet compliance requirements** - Keep sensitive log data within your infrastructure boundaries while leveraging Datadog's visualization and alerting
- **Control costs** - Optimize log storage costs by using your own infrastructure and object storage

## Use cases

CloudPrem is designed for organizations with specific data management needs:

**Data residency and privacy requirements**
- Healthcare, financial services, and other regulated industries
- Organizations operating in regions where data must remain in-country (such as China, India, Vietnam, UAE, and other locations without a Datadog datacenter)
- Customers with strict data sovereignty or privacy policies

**High-volume log management**
- Processing more than 50TB of logs per day
- Looking for cost-effective alternatives to solutions like Elastic or self-built systems (such as ClickHouse)
- Need to scale log management without proportional cost increases

## Learn about CloudPrem

{{< whatsnext desc="Explore CloudPrem's architecture and capabilities:">}}
  {{< nextlink href="/cloudprem/introduction/architecture/" >}}Architecture - Understand how CloudPrem components work together{{< /nextlink >}}
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
