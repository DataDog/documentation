---
aliases:
- /integrations/awscloudsearch/
categories:
- cloud
- processing
- search
- aws
ddtype: crawler
description: Track index utilization, successful request count, and more.
doc_link: https://docs.datadoghq.com/integrations/awscloudsearch/
git_integration_title: amazon_cloudsearch
has_logo: true
integration_title: AWS CloudSearch
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_cloudsearch
public_title: Datadog-AWS CloudSearch Integration
short_description: Track index utilization, successful request count, and more.
version: '1.0'
---

## Overview

Amazon CloudSearch is a managed service in the AWS Cloud that makes it simple and cost-effective to set up, manage, and scale a search solution.

Enable this integration to see in Datadog all your CloudSearch metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `CloudSearch` is checked under metric collection.

2. Install the [Datadog - AWS CloudSearch integration](https://app.datadoghq.com/account/settings#integrations/amazon_cloudsearch).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_cloudsearch" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Cloudsearch integration does not include any event at this time.

### Service Checks
The AWS Cloudsearch integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
