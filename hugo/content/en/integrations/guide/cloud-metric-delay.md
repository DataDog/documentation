---
title: Cloud Metric Delay
description: "Understand expected delays for AWS, Azure, Google Cloud, and other cloud integration metrics collected by API."

aliases:
    - /integrations/faq/are-my-aws-cloudwatch-metrics-delayed/
    - /integrations/faq/why-is-there-a-delay-in-receiving-my-data/
    - /integrations/faq/cloud-metric-delay
further_reading:
- link: "/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/"
  tag: "FAQ"
  text: "Why should I install the Datadog Agent on my cloud instances?"
---

## Overview

When using any Datadog cloud integration (AWS, Azure, Google Cloud, etc.), metrics are pulled in by API with a crawler. You may see a delay in metrics due to constraints with the cloud provider API.

## Summary

| Provider   | Default crawler  |
|------------|------------------|
| Alibaba    | Every 2 minutes  |
| AWS        | Every 10 minutes by default. Some namespaces use a different schedule. See [AWS collection schedules](#collection-schedules). |
| Azure      | Every 2 minutes  |
| Cloudflare | Every 5 minutes |
| GCP        | Every 5 minutes  |
| OCI        | Not applicable (metrics are forwarded through [Service Connector Hubs][6]) |

## Cloud providers

These are specifics related to particular cloud providers.

### Alibaba

Alibaba emits metrics with one-minute granularity. Therefore, expect metric delays of up to ~10 minutes.

### AWS

This section is the reference for AWS metric collection schedules and latency. Other AWS integration guides link here.

#### How Datadog collects AWS metrics

By default, Datadog collects CloudWatch metrics by polling the CloudWatch [`GetMetricData`][7] API. Each request batches queries for many metrics. For most metrics, Datadog requests one-minute datapoints. Metrics that AWS publishes less frequently, such as daily Amazon S3 storage metrics, are requested with a longer period.

Each collection run requests datapoints starting slightly before the last datapoint Datadog collected. If CloudWatch publishes a datapoint late, Datadog collects it on a later run instead of dropping it.

#### Collection schedules

Datadog polls each CloudWatch namespace on its own schedule. The following defaults apply on all [Datadog sites][4]:

| Namespace | Default schedule |
|---|---|
| `AWS/RDS` | Every 3 minutes |
| `AWS/States` | Every 5 minutes |
| `AWS/Usage` | Every hour |
| `AWS/S3/Storage-Lens` | Every 2 hours |
| `AWS/Billing` | Every 4 hours |
| All other namespaces, including custom namespaces | Every 10 minutes |

On the US3, US5, AP1, and US1-FED sites, the following namespaces also use shorter default schedules:

| Namespace | Default schedule |
|---|---|
| `AWS/EBS`, `AWS/EFS`, `AWS/NetworkELB`, `AWS/Redshift` | Every 2 minutes |
| `AWS/ApplicationELB`, `AWS/ELB` | Every 3 minutes |
| `AWS/CloudFront`, `AWS/ECS`, `AWS/Lambda` | Every 5 minutes |

The schedule for your organization can differ from these defaults if it was adjusted by [Datadog support][2].

#### Adaptive polling

[Adaptive polling][8] reduces how often Datadog collects metrics that have not been queried in Datadog for at least 30 days. These metrics are collected about once an hour instead of on their namespace schedule. When you query one of these metrics in a dashboard, monitor, notebook, or the API, it returns to its namespace schedule after a few minutes.

A metric under adaptive polling receives new datapoints about once an hour, so it can appear delayed or have gaps when you first open it.

#### Latency

The time between a measurement in AWS and its availability in Datadog combines three factors:

1. **AWS publication delay**: How long CloudWatch takes to make a datapoint available through its API. This depends on the AWS service and the metric resolution. One-minute metrics are typically available within a few minutes. Five-minute metrics can take longer. Some metrics, such as S3 storage metrics and billing metrics, are published only a few times a day.
2. **Datadog collection schedule**: A datapoint that is available in CloudWatch is collected on the next run for its namespace. This adds up to one [collection schedule](#collection-schedules) interval, or up to about one hour for metrics under [adaptive polling](#adaptive-polling).
3. **Processing**: CloudWatch API throttling, large numbers of resources, and queueing can add a few more minutes.

For example, a one-minute metric in a namespace on the 10-minute schedule is typically available in Datadog within the AWS publication delay plus up to 10 minutes. Expect a longer delay for five-minute metrics, for metrics under adaptive polling, and for accounts with many resources.

#### EC2 detailed monitoring

[Detailed monitoring][9] is a per-instance setting in AWS. With basic monitoring, AWS publishes most EC2 instance metrics in five-minute periods. With detailed monitoring, AWS publishes these metrics in one-minute periods. Status check metrics are published every minute in both cases.

Detailed monitoring changes the resolution of the datapoints, not how often Datadog collects them. For instances with basic monitoring, Datadog receives one datapoint every five minutes for the affected metrics. Detailed monitoring incurs additional AWS charges.

#### CloudWatch Metric Streams

On your selected [Datadog site][4] ({{< region-param key="dd_site_name" >}}), you can optionally configure Amazon CloudWatch Metric Streams and Amazon Data Firehose to send CloudWatch metrics to Datadog as AWS publishes them, instead of waiting for a polling run. Streamed metrics typically arrive within a few minutes. See [Metric streaming][5] to learn more about this approach.


### Azure

Azure emits metrics with 1-minute granularity. Therefore, expect metric delays of ~4-5 minutes.

### GCP

GCP emits metrics with 1-minute granularity. Therefore, expect metric delays of ~7-8 minutes.

### OCI

OCI metrics are forwarded to Datadog through [Service Connector Hubs][6] instead of a crawler. Expect metric delays of up to ~10 minutes.

## Monitors

When creating monitors in Datadog, a warning message displays if you choose a delayed metric. Datadog recommends extending the timeframe and delaying the monitor evaluation for these metrics.

<div class="alert alert-info">For AWS-backed metric monitors, {{< ui >}}Edit{{< /ui >}} can show a recommended evaluation delay (often 900 seconds). That value comes from the AWS integration and is not stored until you click {{< ui >}}Save{{< /ui >}}. To check the saved configuration, open the monitor {{< ui >}}Status{{< /ui >}} page, export the JSON, and look for <code>evaluation_delay</code>. If the field is missing, set the delay in {{< ui >}}Edit{{< /ui >}} and save the monitor.</div>

## Faster metrics

To obtain system-level metrics with virtually zero delay, install the Datadog Agent on your cloud hosts when possible. For a full list of the benefits of installing the Agent on your cloud instances, refer to the documentation [Why should I install the Datadog Agent on my cloud instances?][1].

For the AWS, Azure, and GCP integrations, Datadog may be able to shorten the default collection schedule. For AWS, schedules can be adjusted per namespace. For AWS metrics that are collected less often because they have not been queried recently, see [Adaptive polling](#adaptive-polling). Contact [Datadog support][2] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[2]: /help/
[4]: /getting_started/site/
[5]: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[6]: /integrations/oracle-cloud-infrastructure/
[7]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_GetMetricData.html
[8]: /integrations/guide/adaptive-cloudwatch-polling/
[9]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/manage-detailed-monitoring.html
