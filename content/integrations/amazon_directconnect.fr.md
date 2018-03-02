---
aliases:
- /integrations/awsdirectconnect/
categories:
- cloud
- direct connect
- aws
ddtype: crawler
description: Track key Amazon Direct Connect metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_directconnect/
git_integration_title: amazon_directconnect
has_logo: true
integration_title: AWS Direct Connect
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_directconnect
public_title: Datadog-AWS Direct Connect Integration
short_description: Track key Amazon Direct Connect metrics.
version: '1.0'
---

## Overview

This integration collects metrics from AWS Direct Connect (e.g. Connection state, bit rate ingress and egress, packet rate ingress and egress, and more).

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `DirectConnect` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon Direct Connect metrics: 

    * `directconnect:DescribeConnections`: Used to list available Direct Connect connections.
    * `directconnect:DescribeTags`: Used to gather custom tags applied to Direct Connect connections.

    For more information on Direct Connect policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_directconnect.html).

3. Install the [Datadog - AWS Direct Connect integration](https://app.datadoghq.com/account/settings#integrations/amazon_directconnect).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_directconnect" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Direct Connect integration does not include any event at this time.

### Service Checks
The AWS Direct Connect integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)