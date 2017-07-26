---
title: Datadog-AWS SNS Integration
integration_title: AWS SNS
kind: integration
newhlevel: true
git_integration_title: amazon_sns
---
## Overview

{{< img src="integrations/awssns/snsdashboard.png" alt="SNS Dashboard" >}}

Connect SNS to Datadog in order to:

* See SNS messages as events in your stream
* Send alert and event notifications to SNS

## Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).

### Receiving SNS Messages In the Event Stream

1.  On the Topics section of the SNS Management console, select the desired topic and click Create Subscription
1.  Select https and enter the following webhook url:

        https://app.datadoghq.com/intake/webhook/sns?api_key=<API KEY>

## Configuration

In the Amazon Web Services integration tile, ensure that SNS is checked under metric collection.

### Sending SNS Notifications from Datadog

1.  Configure the AWS account that is associated with an SNS service on the AWS integration tile
2.  Install the SNS integration
3.  Datadog will detect your configured SNS topics and demonstrate the @ notifications you can use below (e.g., "@sns-topic-name")


## Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
