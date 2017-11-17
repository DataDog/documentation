---
aliases:
- /integrations/awsroute53/
description: Track Route53 metrics, and monitor health checks.
git_integration_title: amazon_route53
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS Route 53 Integration
---

{{< img src="integrations/amazon_route53/route53_graph.png" alt="route53 graph" responsive="true" >}}

## Overview

AWS Route 53 provides DNS and traffic management along with availability and performance monitoring via health checks. You can view the health check information in Datadog to provide context around other metrics and events in your environments. Here's an example dashboard of Route 53's health check status graph:

For information about the rest of the AWS services, see the [AWS tile](https://docs.datadoghq.com/integrations/aws/)

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/).

Configure Route 53 on AWS and ensure that the policy you created has the **route53:List*** action allowed. Here is an example policy to give access to Route 53 health checks.

```json
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
```

**Note**: To get Amazon Route 53 metrics using CloudWatch, you must choose US East (N. Virginia) as the region. Amazon Route 53 metrics are not available if you select any other region." Read more [here](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-monitor-view-status.html#monitoring-health-checks)

### Configuration

In the Amazon Web Services integration tile, ensure that Route53 is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS Redshift integration does not include any event at this time.

### Service Checks
The AWS Redshift integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
