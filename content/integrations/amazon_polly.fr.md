---
aliases:
- /integrations/awspolly/
categories:
- cloud
- aws
ddtype: crawler
description: Track key AWS Polly metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_polly/
git_integration_title: amazon_polly
has_logo: true
integration_title: AWS Polly
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_polly
public_title: Datadog-AWS Polly Integration
short_description: Track key AWS Polly metrics.
version: '1.0'
---

## Overview

Amazon Polly is a service that turns text into lifelike speech.

Enable this integration to see in Datadog all your Polly metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `Polly` is checked under metric collection.

2. Install the [Datadog - AWS Polly integration](https://app.datadoghq.com/account/settings#integrations/amazon_polly).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_polly" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Polly integration does not include any event at this time.

### Service Checks
The AWS Polly integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
