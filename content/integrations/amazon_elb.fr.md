---
aliases:
- /integrations/awselb/
categories:
- cloud
- web
- aws
ddtype: crawler
description: Track key Amazon Load Balancer metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_elb/
git_integration_title: amazon_elb
has_logo: true
integration_title: AWS Load Balancer
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_elb
public_title: Datadog-AWS Load Balancer Integration
short_description: Track key Amazon Load Balancer metrics.
version: '1.0'
---

{{< img src="integrations/amazon_elb/elb.png" alt="ELB default dashboard" responsive="true" responsive="true" popup="true">}}

## Overview

Elastic Load Balancing (ELB) is an AWS service used to dispatch incoming web traffic from your applications across your Amazon EC2 backend instances, which may be in different availability zones. ELB helps ensure a smooth user experience and provide increased fault tolerance, handling traffic peaks and failed EC2 instances without interruption.

Datadog collects metrics and metadata from all three flavors of Elastic Load Balancers that AWS offers: **Application, Classic, and Network Load Balancers.**

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/). 

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `ELB` is checked under metric collection. Check also `ApplicationELB` checkbox for Application ELB metrics, and the `NetworkELB` checkbox for Network ELB metrics.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon ELB metrics: 

    * `elasticloadbalancing:DescribeLoadBalancers`: List ELBs, add additional tags and metrics.
    * `elasticloadbalancing:DescribeTags`: Add custom ELB tags to ELB metrics.
    * `elasticloadbalancing:DescribeInstanceHealth`: Add state of your instances.

    For more information on ELB policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticloadbalancing.html).

3. Install the [Datadog - AWS ELB integration](https://app.datadoghq.com/account/settings#integrations/amazon_elb).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_elb" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Elastic Load Balancing integration does not include any event at this time.

### Service Checks
The AWS Elastic Load Balancing integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about how to monitor ELB performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/top-elb-health-and-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor ELB.

