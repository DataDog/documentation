---
title: AWS Integration Troubleshooting
kind: guide
description: "Troubleshooting steps for the Datadog AWS Integration"
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Integration"
  text: "AWS Integration"
---

## Overview

Use this guide to troubleshoot [AWS Integration][1] issues.

### Discrepancy between your data in CloudWatch and Datadog

There are two important distinctions to be aware of:

1. In AWS for counters, a graph that is set to 'sum' '1minute' shows the total number of occurrences in one minute leading up to that point, that is the rate per 1 minute. Datadog is displaying the raw data from AWS normalized to per second values, regardless of the time frame selected in AWS. This is why you might see Datadog's value as lower.
2. Overall, min/max/avg have a different meaning within AWS than in Datadog. In AWS, average latency, minimum latency, and maximum latency are three distinct metrics that AWS collects. When Datadog pulls metrics from AWS CloudWatch, the average latency is received as a single timeseries per ELB. Within Datadog, when you are selecting 'min', 'max', or 'avg', you are controlling how multiple timeseries are combined. For example, requesting `system.cpu.idle` without any filter would return one series for each host that reports that metric and those series need to be combined to be graphed. On the other hand, if you requested `system.cpu.idle` from a single host, no aggregation would be necessary and switching between average and max would yield the same result.

### Metrics delayed

When using the AWS integration, Datadog pulls in your metrics through the CloudWatch API. You may see a slight delay in metrics from AWS due to some constraints that exist for their API.

To begin, the CloudWatch API only offers a metric-by-metric crawl to pull data. The CloudWatch APIs have a rate limit that varies based on the combination of authentication credentials, region, and service. Metrics are made available by AWS dependent on the account level. For example, if you are paying for "detailed metrics" within AWS, they are available more quickly. This level of service for detailed metrics also applies to granularity, with some metrics being available per minute and others per five minutes.

Datadog has the ability to prioritize certain metrics within an account to pull them in faster, depending on the circumstances. Contact [Datadog support][114] for more info.

To obtain metrics with virtually zero delay, install the Datadog Agent on the host. For more information, see Datadog's blog post [Don't fear the Agent: Agent-based monitoring][115].

### Missing metrics

CloudWatch's API returns only metrics with data points, so if for instance an ELB has no attached instances, it is expected not to see metrics related to this ELB in Datadog.

### Wrong count of aws.elb.healthy_host_count

When the cross-zone load balancing option is enabled on an ELB, all the instances attached to this ELB are considered part of all availability zones (on CloudWatch’s side), so if you have 2 instances in 1a and 3 in ab, the metric displays 5 instances per availability zone.
As this can be counter intuitive, the metrics **aws.elb.healthy_host_count_deduped** and **aws.elb.un_healthy_host_count_deduped** display the count of healthy and unhealthy instances per availability zone, regardless of if this cross-zone load balancing option is enabled or not.

### Duplicated hosts when installing the Agent

When installing the Agent on an AWS host, you might see duplicated hosts on the infra page for a few hours if you manually set the hostname in the Agent's configuration. This second host disappears a few hours later, and does not affect your billing.

### EC2 metadata with IMDS v2

In your [Agent configuration][128], if the parameter `ec2_prefer_imdsv2`, is set to `true` (defaults to `false`), the Agent requests EC2 metadata using IMDS v2, which offers additional security for accessing metadata. In some situations, additional configuration may be required in AWS, for example: using a containerized Agent on a plain EC2 instance. See the [AWS guidelines][129] for further details.

[1]: /integrations/amazon_web_services/
