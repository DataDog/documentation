---
aliases:
- integrations/awsautoscaling/
categories:
- cloud
- provisioning
- configuration & deployment
- aws
ddtype: crawler
description: Track the status and counts of instances in your Auto Scaling groups.
doc_link: https://docs.datadoghq.com/integrations/amazon_auto_scaling/
git_integration_title: amazon_auto_scaling
has_logo: true
integration_title: AWS Auto Scaling
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_auto_scaling
public_title: Datadog-AWS Auto Scaling Integration
short_description: Track the status and counts of instances in your Auto Scaling groups.
version: '1.0'
---

## Overview

Amazon Auto Scaling is a service to launch or terminate EC2 instances automatically based on user-defined policies.

Enable this integration to see in Datadog all your Auto Scaling metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/). 
### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `AutoScaling` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon Auto Scaling metrics: 

    * `autoscaling:DescribeAutoScalingGroups`: Used to list all autoscaling groups.
    * `autoscaling:DescribePolicies`: List available policies (for autocompletion in events and monitors).
    * `autoscaling:DescribeTags`: Used to list tags for a given autoscaling group. This will add ASG custom tags on ASG CloudWatch metrics.
    * `autoscaling:DescribeScalingActivities`: Used to generate events when an ASG scales up or down.
    * `autoscaling:ExecutePolicy`: Execute one policy (scale up or down from a monitor or the events feed).  
    This is not included in the [installation Policy Document](#installation) and should only be included if you are using monitors or events to execute an autoscaling policy.

    For more information on Auto Scaling policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_application-autoscaling.html).

3. Install the [Datadog - AWS Auto Scaling integration](https://app.datadoghq.com/account/settings#integrations/amazon_auto_scaling).


## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_auto_scaling" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Auto-Scaling integration does not include any event at this time.

### Service Checks
The AWS Auto-Scaling integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
