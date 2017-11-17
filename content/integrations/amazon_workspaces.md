---
aliases:
- /integrations/awsworkspaces/
description: Track failed connections, session latency, unhealthy workspaces, and
  more.
git_integration_title: amazon_workspaces
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS Workspaces Integration
---

## Overview

Amazon WorkSpaces is a fully managed, secure desktop computing service which runs on the AWS cloud.

Enable this integration to see in Datadog all your Workspaces metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that Workspaces is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS WorkSpaces integration does not include any event at this time.

### Service Checks
The AWS WorkSpaces integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)