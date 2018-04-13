---
description: Track Route53 metrics, and monitor health checks.
git_integration_title: amazon_route53
integration_title: AWS Route 53
kind: integration
newhlevel: true
placeholder: true
title: Datadog-AWS Route 53 Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/awsroute53/route53_graph.png" >}}

## Overview

AWS Route 53 provides DNS and traffic management along with availability and performance monitoring via health checks. You can view the health check information in Datadog to provide context around other metrics and events in your environments. Here's an example dashboard of Route 53's health check status graph:

For information about the rest of the AWS services, see the [AWS tile][1]

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).

Configure Route 53 on AWS and ensure that the policy you created has the **route53:List*** action allowed. Here is an example policy to give access to Route 53 health checks.
{{< highlight json >}}
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "route53:List*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
{{< /highlight >}}

### Configuration

In the Amazon Web Services integration tile, ensure that Route53 is checked under metric collection.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

[1]: /integrations/aws
