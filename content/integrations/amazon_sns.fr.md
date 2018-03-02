---
aliases:
- /integrations/awssns/
categories:
- cloud
- notification
- aws
ddtype: crawler
description: Send Amazon SNS messages to Datadog, or send Datadog alerts to SNS.
doc_link: https://docs.datadoghq.com/integrations/amazon_sns/
git_integration_title: amazon_sns
has_logo: true
integration_title: AWS SNS
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_sns
public_title: Datadog-AWS SNS Integration
short_description: Send Amazon SNS messages to Datadog, or send Datadog alerts to
  SNS.
version: '1.0'
---

{{< img src="integrations/amazon_sns/snsdashboard.png" alt="SNS Dashboard" responsive="true" popup="true">}}

## Overview

Connect SNS to Datadog in order to:

* See SNS messages as events in your stream
* Send alert and event notifications to SNS

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `SNS` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon SNS metrics: 

    * `sns:ListTopics`: Used to list available topics.
    * `sns:Publish`: Used to publish notifications (monitors or event feed).

    For more information on SNS policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_sns.html).

3. Install the [Datadog - AWS SNS integration](https://app.datadoghq.com/account/settings#integrations/amazon_sns).

#### Receiving SNS Messages In the Event Stream

1.  On the Topics section of the SNS Management console, select the desired topic and click Create Subscription

2. Select https and enter the following webhook url:

```
https://app.datadoghq.com/intake/webhook/sns?api_key=<API KEY>
```

#### Sending SNS Notifications from Datadog

1.  Configure the AWS account that is associated with an SNS service on the AWS integration tile
2.  [Install the SNS integration](https://app.datadoghq.com/account/settings#integrations/amazon_sns)
3.  Datadog then detects your configured SNS topics and demonstrate the @notifications (e.g., "@sns-topic-name")

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_sns" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS SNS integration does not include any event at this time.

### Service Checks
The AWS SNS integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
