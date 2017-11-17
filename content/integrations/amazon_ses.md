---
aliases:
- /integrations/awsses/
description: Track email bounces, delivery attempts, rejected messages, and more.
git_integration_title: amazon_ses
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS SES Integration
---

## Overview

Amazon Simple Email Service (SES) is a cost-effective, outbound-only email-sending service.

Enable this integration to see in Datadog all your SES metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). The only requirement for this integration is the permission `ses:get`.

### Configuration

In the Amazon Web Services integration tile, ensure that SES is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS SES integration does not include any event at this time.

### Service Checks
The AWS SES integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)