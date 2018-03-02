---
aliases:
- /integrations/awsebs/
categories:
- cloud
- data store
- aws
ddtype: crawler
description: Track snapshot age, IOPS, read/write times, and more.
doc_link: https://docs.datadoghq.com/integrations/amazon_ebs/
git_integration_title: amazon_ebs
has_logo: true
integration_title: AWS Elastic Block Store
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ebs
public_title: Datadog-AWS Elastic Block Store Integration
short_description: Track snapshot age, IOPS, read/write times, and more.
version: '1.0'
---

## Overview

Amazon EBS provides persistent block storage volumes for use with Amazon EC2 instances in the AWS Cloud.

Enable this integration to see in Datadog all your EBS metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `EBS` is checked under metric collection.

2. Install the [Datadog - AWS EBS integration](https://app.datadoghq.com/account/settings#integrations/amazon_ebs).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_ebs" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS EBS integration does not include any event at this time.

### Service Checks
The AWS EBS integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
