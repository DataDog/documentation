---
aliases:
- /integrations/awsiot/
categories:
- cloud
- aws
ddtype: crawler
description: Track key Amazon Internet of Things metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_iot/
git_integration_title: amazon_iot
has_logo: true
integration_title: AWS Internet of Things
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_iot
public_title: Datadog-AWS Internet of Things Integration
short_description: Track key Amazon Internet of Things metrics.
version: '1.0'
---

## Overview

AWS IoT is a managed cloud platform that lets connected devices easily and securely interact with cloud applications and other devices.

Enable this integration to see in Datadog all your IOT metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `IoT` is checked under metric collection.

2. Install the [Datadog - AWS IoT integration](https://app.datadoghq.com/account/settings#integrations/amazon_iot).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_iot" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS IoT integration does not include any event at this time.

### Service Checks
The AWS IoT integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
