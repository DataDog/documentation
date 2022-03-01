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

Use this guide to troubleshoot issues related to the Datadog [AWS Integration][1].

## IAM permission errors

### Datadog is not authorized to perform sts:AssumeRole

The `sts:Assumerole` permission error indicates an issue with the trust policy associated with the `DatadogAWSIntegrationRole`. See the [Error: Datadog is not authorized to perform sts:AssumeRole][2] documentation on how to resolve this issue.

**Note**: This error may persist in the Datadog UI for a few hours while the changes propagate.

## Data discrepancies

### Discrepancy between your data in CloudWatch and Datadog

There are two important distinctions to be aware of:

1. Datadog displays raw data from AWS in per-second values, regardless of the time frame selected in AWS. This is why Datadog's value could appear lower.

2. `min`, `max`, and `avg` have a different meaning within AWS than in Datadog. In AWS, average latency, minimum latency, and maximum latency are three distinct metrics that AWS collects. When Datadog pulls metrics from AWS CloudWatch, the average latency is received as a single timeseries per Elastic Load Balancer (ELB). Within Datadog, when you are selecting `min`, `max`, or `avg`, you are controlling how multiple timeseries are combined. For example, requesting `system.cpu.idle` without any filter returns one series for each host that reports that metric, and those series need to be combined to be graphed. If instead you requested `system.cpu.idle` from a single host, no aggregation is necessary and switching between average and max yields the same result.

## Metrics

### Metrics delayed

When using the AWS integration, Datadog pulls in your metrics through the CloudWatch API. You may see a slight delay in metrics from AWS due to some constraints that exist for their API.

The CloudWatch API only offers a metric-by-metric crawl to pull data. CloudWatch APIs have a rate limit that varies based on the combination of authentication credentials, region, and service. Metrics are made available by AWS dependent on the account level. For example, if you are paying for "detailed metrics" within AWS, they are available more quickly. This level of service for detailed metrics also applies to granularity, with some metrics being available per minute and others per five minutes.

Install the Datadog Agent on the host to avoid metric delay. See the [Datadog Agent documentation][3] to get started. Datadog has the ability to prioritize certain metrics within an account to pull them in faster, depending on the circumstances. Contact [Datadog support][4] for additional information.

### Missing metrics

CloudWatch's API returns only metrics with data points, so if for example an ELB has no attached instances, it is expected not to see metrics related to this ELB in Datadog.

### Wrong count of aws.elb.healthy_host_count

When the cross-zone load balancing option is enabled on an ELB, all the instances attached to this ELB are considered part of all availability zones (on CloudWatch’s side). For example, if you have two instances in `1a` and three instances in `ab`, the metric displays five instances per availability zone.
As this can be counter intuitive, the metrics **aws.elb.healthy_host_count_deduped** and **aws.elb.un_healthy_host_count_deduped** display the count of healthy and unhealthy instances per availability zone, regardless of if this cross-zone load balancing option is enabled or not.

## Datadog app

### Duplicated hosts when installing the Agent

When installing the Agent on an AWS host, you might see duplicated hosts on the Datadog infrastructure page for a few hours if you manually set the hostname in the Agent's configuration. The duplicate hosts disappear a few hours later, and does not affect your billing.

## Datadog Agent

### EC2 metadata with IMDS v2

In your [Agent configuration][5], if the parameter `ec2_prefer_imdsv2`, is set to `true` (defaults to `false`), the Agent requests EC2 metadata using Instance Metadata Service Version 2 (IMDSv2), which offers additional security for accessing metadata. In some situations, additional configuration may be required in AWS, for example: using a containerized Agent on a plain EC2 instance. See the [Transition to using Instance Metadata Service Version 2][6] documentation for details.

## Tags

### Hosts still have AWS tags after removing the AWS EC2 integration

You can use the AWS integration to collect data from CloudWatch, or install a Datadog Agent directly on each EC2 instance to get data and tags. If you have opted to use both of these methods to collect data, Datadog's backend merges the data from both from the integration and the Datadog Agent to a single host object.

If you removed the AWS integration, but continue to run a Datadog Agent on your EC2 instances, the hosts in your Datadog account continues to have the old host-tags associated with it that were collected from AWS. This is intended behavior, and it does not indicate that the AWS integration or AWS EC2 integration is still enabled.

You can verify the integration is enabled by checking the “Apps Running” for that host from the infrastructure list or by checking the metrics summary and creating a notebook scoped to that host.

If you want to permanently remove AWS host tags from a host, you can do this by using the [Remove host tags API endpoint][7].

[1]: /integrations/amazon_web_services/
[2]: /integrations/faq/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /agent/
[4]: /help/
[5]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[7]: /api/latest/tags/#remove-host-tags
