---
aliases:
- /integrations/awselb/
description: Track key Amazon Elastic Loadbalancer metrics.
git_integration_title: amazon_elb
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS ELB & ApplicationELB Integration
---

{{< img src="integrations/amazon_elb/elb.png" alt="ELB default dashboard" responsive="true" responsive="true" >}}

## Overview

Elastic Load Balancing (ELB) is an AWS service used to dispatch incoming web traffic from your applications across your Amazon EC2 backend instances, which may be in different availability zones. ELB helps ensure a smooth user experience and provide increased fault tolerance, handling traffic peaks and failed EC2 instances without interruption.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure the **ELB checkbox** is checked for Classic ELB metrics and the **ApplicationELB** checkbox for Application ELB metrics.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS Elastic Load Balancing integration does not include any event at this time.

### Service Checks
The AWS Elastic Load Balancing integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about how to monitor ELB performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/top-elb-health-and-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor ELB.
