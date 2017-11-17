---
aliases:
- /integrations/awssqs/
description: Track queue size, average message size, number of messages, and more.
git_integration_title: amazon_sqs
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS SQS Integration
---

{{< img src="integrations/amazon_sqs/sqsdashboard.png" alt="SQS Dashboard" responsive="true" >}}

## Overview

Amazon Simple Queue Service (SQS) is a fast, reliable, scalable, fully managed message queuing service.

Enable this integration to see all your SQS metrics in Datadog.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that SQS is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS SQS integration does not include any event at this time.

### Service Checks
The AWS SQS integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)