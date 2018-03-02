---
aliases:
- /integrations/awsworkspaces/
categories:
- cloud
- aws
ddtype: crawler
description: Track failed connections, session latency, unhealthy workspaces, and
  more.
doc_link: https://docs.datadoghq.com/integrations/amazon_workspaces/
git_integration_title: amazon_workspaces
has_logo: true
integration_title: AWS Workspaces
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_workspaces
public_title: Datadog-AWS Workspaces Integration
short_description: Track failed connections, session latency, unhealthy workspaces,
  and more.
version: '1.0'
---

## Overview

Amazon WorkSpaces is a fully managed, secure desktop computing service which runs on the AWS cloud.

Enable this integration to see in Datadog all your Workspaces metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that Workspaces is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_workspaces" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS WorkSpaces integration does not include any event at this time.

### Service Checks
The AWS WorkSpaces integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
