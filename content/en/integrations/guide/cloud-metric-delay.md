---
title: Cloud Metric Delay

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
| Alibaba    | Every 10 minutes |
| AWS        | Every 10 minutes |
| Azure      | Every 2 minutes  |
| Cloudflare | Every 15 minutes |
| GCP        | Every 5 minutes  |

## Cloud providers

These are specifics related to particular cloud providers.

### Alibaba

Alibaba emits metrics with one-minute granularity. Therefore, expect metric delays of ~7-8 minutes.

### AWS

AWS offers two levels of granularity for metrics (5 and 1 minute metrics). If you receive 5-minute metrics from CloudWatch, there can be ~15-20 minute delay in receiving your metrics. This is because CloudWatch makes your data available with a 5-10 minute latency plus the Datadog default of 10 minutes. Queueing and CloudWatch API limitations can add up to another 5 minutes. If you receive 1-minute metrics with CloudWatch, then their availability delay is about 2 minutes—so total latency to view your metrics may be ~10-12 minutes.

Further, the CloudWatch API only offers a metric-by-metric crawl to pull data. The CloudWatch APIs have a rate limit that varies based on the combination of authentication credentials, region, and service. Metrics are made available by AWS dependent on the account level. For example, if you are paying for *detailed metrics* within AWS, they are available more quickly. This level of service for detailed metrics also applies to granularity, with some metrics being available per minute and others per five minutes.

{{% site-region region="us,us5,eu,ap1" %}}
On your selected [Datadog site][1] ({{< region-param key="dd_site_name" >}}), you can optionally configure Amazon CloudWatch Metric Streams and Amazon Data Firehose to get CloudWatch metrics into Datadog faster with a 2-3 minute latency. Visit the [documentation on metric streaming][2] to learn more about this approach.

[1]: /getting_started/site/
[2]: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
{{% /site-region %}}

### Azure

Azure emits metrics with 1-minute granularity. Therefore, expect metric delays of ~4-5 minutes.

### GCP

GCP emits metrics with 1-minute granularity. Therefore, expect metric delays of ~7-8 minutes.

## Monitors

When creating monitors in Datadog, a warning message displays if you choose a delayed metric. Datadog recommends extending the timeframe and delaying the monitor evaluation for these metrics.

## Faster metrics

To obtain system-level metrics with virtually zero delay, install the Datadog Agent on your cloud hosts when possible. For a full list of the benefits of installing the Agent on your cloud instances, refer to the documentation [Why should I install the Datadog Agent on my cloud instances?][1].

On the Datadog side for the AWS, Azure, and GCP integrations, Datadog may be able to speed up the default metric crawler for all metrics. Additionally, for AWS, Datadog has namespace specific crawlers. Contact [Datadog support][2] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[2]: /help/
