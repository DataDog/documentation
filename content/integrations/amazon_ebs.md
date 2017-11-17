---
aliases:
- /integrations/awsebs/
description: Track snapshot age, IOPS, read/write times, and more.
git_integration_title: amazon_ebs
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS Elastic Block Store Integration
---

## Overview

Amazon EBS provides persistent block storage volumes for use with Amazon EC2 instances in the AWS Cloud.

Enable this integration to see in Datadog all your EBS metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that EBS is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS EBS integration does not include any event at this time.

### Service Checks
The AWS EBS integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)