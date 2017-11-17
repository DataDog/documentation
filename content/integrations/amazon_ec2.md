---
aliases:
- /integrations/awsec2/
description: Track instance resource usage, monitor status checks, and more.
git_integration_title: amazon_ec2
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS EC2 Integration
---

## Overview

Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.

Enable this integration to see in Datadog all your EC2 metrics, and additional events like scheduled maintenances.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that EC2 is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS EC2 integration does not include any event at this time.

### Service Checks
The AWS EC2 integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)