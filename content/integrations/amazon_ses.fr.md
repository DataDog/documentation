---
aliases:
- /integrations/awsses/
categories:
- cloud
- Collaboration
- aws
ddtype: crawler
description: Track email bounces, delivery attempts, rejected messages, and more.
doc_link: https://docs.datadoghq.com/integrations/amazon_ses/
git_integration_title: amazon_ses
has_logo: true
integration_title: AWS SES
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ses
public_title: Datadog-AWS SES Integration
short_description: Track email bounces, delivery attempts, rejected messages, and
  more.
version: '1.0'
---

## Overview

Amazon Simple Email Service (SES) is a cost-effective, outbound-only email-sending service.

Enable this integration to see in Datadog all your SES metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `SES` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon SES metrics: 

    * `ses:GetSendQuota`: Add metrics about send quotas.
    * `ses:GetSendStatistics`: Add metrics about send statistics.

    For more information on SES policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ses.html).

3. Install the [Datadog - AWS SES integration](https://app.datadoghq.com/account/settings#integrations/amazon_ses).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_ses" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS SES integration does not include any event at this time.

### Service Checks
The AWS SES integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
