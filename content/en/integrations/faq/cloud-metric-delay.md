---
title: Cloud Metric Delay
kind: faq
aliases:
    - /integrations/faq/are-my-aws-cloudwatch-metrics-delayed/
further_reading:
- link: "agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/"
  tag: "FAQ"
  text: "Why should I install the Datadog Agent on my cloud instances?"
---

## Overview

When using any Datadog cloud integration (AWS, Azure, GCP, etc), metrics are pulled in by API. You may see a delay in metrics due to constraints with the cloud provider API.

## Cloud providers

### AWS

For AWS, if you receive 5-minute metrics from CloudWatch, there can be a ~15-20 min delay in receiving your metrics. This is because CloudWatch makes your data available with a 5-10 minute latency, and Datadog runs the crawler every 10 minutes.

Queueing and CloudWatch API limitations can add up to another 5 minutes. If you receive 1-minute metrics with CloudWatch, then their availability delay is about 2 minutes—so total latency to view your metrics may be ~10-12 minutes.

Further, the CloudWatch API only offers a metric-by-metric crawl to pull data. The CloudWatch APIs have a rate limit that varies based on the combination of authentication credentials, region, and service. Metrics are made available by AWS dependent on the account level. For example, if you are paying for "detailed metrics" within AWS, they are available more quickly. This level of service for detailed metrics also applies to granularity, with some metrics being available per minute and others per five minutes.

## Monitors

When creating monitors in Datadog, a warning message displays if you choose a delayed metric. Datadog recommends extending the timeframe and delaying the monitor evaluation for these metrics.

## Faster metrics

To obtain metrics with virtually zero delay, install the Datadog Agent on your cloud hosts when possible. Refer to the documentation on [installing the Datadog Agent on your cloud instances][1].

On the Datadog side for the AWS and GCP integrations, there is the ability to prioritize certain metrics within an account to pull them in faster, depending on the circumstances. Contact [Datadog support][2] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances
[2]: /help
