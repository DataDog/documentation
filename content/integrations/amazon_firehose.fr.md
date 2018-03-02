---
aliases:
- /integrations/awsfirehose/
categories:
- cloud
- processing
- aws
ddtype: crawler
description: Track key Amazon Firehose metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_firehose/
git_integration_title: amazon_firehose
has_logo: true
integration_title: AWS Firehose
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_firehose
public_title: Datadog-AWS Firehose Integration
short_description: Track key Amazon Firehose metrics.
version: '1.0'
---

## Overview

Amazon Firehose is the easiest way to load streaming data into AWS.

Enable this integration to see in Datadog all your Firehose metrics.

## Setup 
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `Firehose` is checked under metric collection.

2. Install the [Datadog - AWS Firehose integration](https://app.datadoghq.com/account/settings#integrations/amazon_firehose).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_firehose" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Kinesis Firehose integration does not include any event at this time.

### Service Checks
The AWS Kinesis Firehose integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
