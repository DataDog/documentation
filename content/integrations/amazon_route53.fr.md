---
aliases:
- /integrations/awsroute53/
categories:
- cloud
- network
- web
- aws
ddtype: crawler
description: Track Route53 metrics, and monitor health checks.
doc_link: https://docs.datadoghq.com/integrations/amazon_route53/
git_integration_title: amazon_route53
has_logo: true
integration_title: AWS Route 53
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_route53
public_title: Datadog-AWS Route 53 Integration
short_description: Track Route53 metrics, and monitor health checks.
version: '1.0'
---

{{< img src="integrations/amazon_route53/route53_graph.png" alt="route53 graph" responsive="true" popup="true">}}

## Overview

AWS Route 53 provides DNS and traffic management along with availability and performance monitoring via health checks. You can view the health check information in Datadog to provide context around other metrics and events in your environments. Here's an example dashboard of Route 53's health check status graph:

For information about the rest of the AWS services, see the [AWS tile](https://docs.datadoghq.com/integrations/amazon_web_services/)

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `Route53` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon Route53 metrics: 

    * `route53:listHealthChecks`: List available health checks.
    * `route53:listTagsForResources`: Add custom tags on Route53 CloudWatch metrics.

    For more information on Route53 policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_route53.html).

3. Install the [Datadog - AWS Route53 integration](https://app.datadoghq.com/account/settings#integrations/amazon_route53).

**Note**: To get Amazon Route 53 metrics using CloudWatch, you must choose US East (N. Virginia) as the region. Amazon Route 53 metrics are not available if you select any other region." Read more [here](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-monitor-view-status.html#monitoring-health-checks)

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_route53" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Redshift integration does not include any event at this time.

### Service Checks
The AWS Redshift integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

