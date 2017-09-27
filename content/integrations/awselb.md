---
title: Datadog-AWS ELB & ApplicationELB Integration
integration_title: AWS ELB
kind: integration
git_integration_title: amazon_elb
updated_for_agent: 5.8.5
newhlevel: true
---

{{< img src="integrations/awselb/elb.png" alt="ELB default dashboard" >}}

## Overview

Elastic Load Balancing (ELB) is an AWS service used to dispatch incoming web traffic from your applications across your Amazon EC2 backend instances, which may be in different availability zones. ELB helps ensure a smooth user experience and provide increased fault tolerance, handling traffic peaks and failed EC2 instances without interruption.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure the **ELB checkbox** is checked for Classic ELB metrics and the **ApplicationELB** checkbox for Application ELB metrics.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

## Further Reading
Learn more about how to monitor ELB performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/top-elb-health-and-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor ELB.
