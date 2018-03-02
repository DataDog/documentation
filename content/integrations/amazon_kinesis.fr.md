---
aliases:
- /integrations/awskinesis/
categories:
- cloud
- processing
- messaging
- aws
ddtype: crawler
description: Track key Amazon Kinesis metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_kinesis/
git_integration_title: amazon_kinesis
has_logo: true
integration_title: AWS Kinesis
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_kinesis
public_title: Datadog-AWS Kinesis Integration
short_description: Track key Amazon Kinesis metrics.
version: '1.0'
---


## Overview

Amazon Kinesis is a fully managed, cloud-based service for real-time processing of large, distributed data streams.

Enable this integration to see in Datadog all your Kinesis metrics, and collect custom Kinesis tags.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/). There are no other installation steps that need to be performed.

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `Kinesis` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon Kinesis metrics: 

    * `kinesis:ListStreams`: List available streams.
    * `kinesis:DescribeStream`: Add tags and new metrics for kinesis streams.
    * `kinesis:ListTagsForStream`: Add custom tags.

    For more information on Kinesis policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_kinesis.html).

3. Install the [Datadog - AWS Kinesis integration](https://app.datadoghq.com/account/settings#integrations/amazon_kinesis).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_kinesis" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Kinesis integration does not include any event at this time.

### Service Checks
The AWS Kinesis integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
