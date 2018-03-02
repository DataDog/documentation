---
aliases:
- /integrations/awsswf/
categories:
- cloud
- configuration & deployment
- aws
ddtype: crawler
description: Track key Amazon Simple Workflow Service metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_swf/
git_integration_title: amazon_swf
has_logo: true
integration_title: AWS Simple Workflow Service
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_swf
public_title: Datadog-AWS Simple Workflow Service Integration
short_description: Track key Amazon Simple Workflow Service metrics.
version: '1.0'
---

## Overview

Amazon SWF helps developers build, run, and scale background jobs that have parallel or sequential steps.

Enable this integration to see in Datadog all your SWF metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `SWF` is checked under metric collection.

2. Install the [Datadog - AWS SWF integration](https://app.datadoghq.com/account/settings#integrations/amazon_swf).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_swf" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS SWF integration does not include any event at this time.

### Service Checks
The AWS SWF integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
