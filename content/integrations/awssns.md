---
title: Datadog-AWS SNS Integration
integration_title: AWS SNS
kind: integration
newhlevel: true
git_integration_title: amazon_sns
---
# Overview

![SNS Dashboard](/static/images/snsdashboard.png)

Connect SNS to Datadog in order to:

* See SNS messages as events in your stream
* Send alert and event notifications to SNS

# Installation

## Receiving SNS Messages In the Event Stream

1.  On the Topics section of the SNS Management console, select the desired topic and click Create Subscription
1.  Select https and enter the following webhook url:

        https://app.datadoghq.com/intake/webhook/sns?api_key=<API KEY>

# Configuration

## Sending SNS Notifications from Datadog

1.  Configure the AWS account that is associated with an SNS service on the AWS integration tile
2.  Install the SNS integration
3.  Datadog will detect your configured SNS topics and demonstrate the @ notifications you can use below (e.g., "@sns-topic-name")


# Metrics

<%= get_metrics_from_git()%> 

