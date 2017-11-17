---
aliases:
- /integrations/awssns/
description: Send Amazon SNS messages to Datadog, or send Datadog alerts to SNS.
git_integration_title: amazon_sns
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS SNS Integration
---

{{< img src="integrations/amazon_sns/snsdashboard.png" alt="SNS Dashboard" responsive="true" >}}

## Overview

Connect SNS to Datadog in order to:

* See SNS messages as events in your stream
* Send alert and event notifications to SNS

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/).

#### Receiving SNS Messages In the Event Stream

1.  On the Topics section of the SNS Management console, select the desired topic and click Create Subscription
1.  Select https and enter the following webhook url:

        https://app.datadoghq.com/intake/webhook/sns?api_key=<API KEY>

### Configuration

In the Amazon Web Services integration tile, ensure that SNS is checked under metric collection.

#### Sending SNS Notifications from Datadog

1.  Configure the AWS account that is associated with an SNS service on the AWS integration tile
2.  Install the SNS integration
3.  Datadog will detect your configured SNS topics and demonstrate the @ notifications you can use below (e.g., "@sns-topic-name")

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS SNS integration does not include any event at this time.

### Service Checks
The AWS SNS integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)