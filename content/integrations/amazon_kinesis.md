---
aliases:
- /integrations/awskinesis/
description: Track key Amazon Kinesis metrics.
git_integration_title: amazon_kinesis
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS Kinesis Integration
---


## Overview

Amazon Kinesis is a fully managed, cloud-based service for real-time processing of large, distributed data streams.

Enable this integration to see in Datadog all your Kinesis metrics, and collect custom Kinesis tags.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that Kinesis is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS Kinesis integration does not include any event at this time.

### Service Checks
The AWS Kinesis integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)