---
title: Datadog-AWS Load Balancer Integration
git_integration_title: amazon_elb
kind: integration
newhlevel: true
placeholder: true
updated_for_agent: 5.8.5
description: "Track key Amazon Load Balancer metrics."
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/awselb/elb.png" alt="ELB default dashboard" >}}

## Overview

Elastic Load Balancing (ELB) is an AWS service used to dispatch incoming web traffic from your applications across your Amazon EC2 backend instances, which may be in different availability zones. ELB helps ensure a smooth user experience and provide increased fault tolerance, handling traffic peaks and failed EC2 instances without interruption.

Datadog collects metrics and metadata from all three flavors of Elastic Load Balancers that AWS offers: **Application, Classic, and Network Load Balancers.**

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure the **ELB checkbox** is checked for Classic ELB metrics, the **ApplicationELB checkbox** is checked for Application ELB metrics, and the **NetworkELB checkbox** is checked for Network ELB metrics.

## Data Collected
### Metrics

{{< get-metrics-from-git "amazon_elb" >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

## Further Reading
Learn more about how to monitor ELB performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/top-elb-health-and-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor ELB.
