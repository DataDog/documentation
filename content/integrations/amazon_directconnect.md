---
aliases:
- /integrations/awsdirectconnect/
description: Track key Amazon Direct Connect metrics.
git_integration_title: amazon_directconnect
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS Direct Connect Integration
---

## Overview

This integration collects metrics from AWS Direct Connect (e.g. Connection state, bit rate ingress and egress, packet rate ingress and egress, and more).

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that **Direct Connect** is checked under **metric collection**.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS Direct Connect integration does not include any event at this time.

### Service Checks
The AWS Direct Connect integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)