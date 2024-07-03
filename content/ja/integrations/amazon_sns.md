---
aliases:
- /ja/integrations/awssns/
categories:
- cloud
- notifications
- aws
- log collection
custom_kind: インテグレーション
dependencies: []
description: Amazon SNS メッセージを Datadog に、Datadog アラートを SNS に送信。
doc_link: https://docs.datadoghq.com/integrations/amazon_sns/
draft: false
git_integration_title: amazon_sns
has_logo: true
integration_id: ''
integration_title: Amazon Simple Notification Service (SNS)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_sns
public_title: Datadog-Amazon Simple Notification Service (SNS) Integration
short_description: Send Amazon SNS messages to Datadog, or send Datadog alerts to
  SNS.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_sns/snsdashboard.png" alt="SNS Dashboard" popup="true">}}

## Overview

Connect Amazon Simple Notification Service (SNS) to Datadog in order to:

- See SNS messages as events in your Event Explorer
- Send alert and event notifications to SNS

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `SNS` is enabled under the `Metric Collection` tab.

2. Add the following permissions to your [Datadog IAM policy][3] in order to collect Amazon SNS metrics. For more information, see the [SNS policies][4] on the AWS website.

    | AWS Permission   | Description                                             |
    | ---------------- | ------------------------------------------------------- |
    | `sns:ListTopics` | Used to list available topics.                          |
    | `sns:Publish`    | Used to publish notifications (monitors or event feed). |

3. Install the [Datadog - Amazon SNS integration][5].

### Event collection

#### Receive SNS messages

You can receive SNS messages in the Datadog Event Explorer through both the `HTTPS` and `Email` protocols. Using the `HTTPS` protocol allows you to automatically confirm the subscription with a webhook URL. 

Using the `Email` protocol requires a manual confirmation step for the email address that Datadog automatically generates for this purpose. Read the [Create Datadog Events from Amazon SNS Emails][6] guide for more information. 

To receive SNS messages in the Datadog Event Explorer through `HTTPS`:

1. In the **Topics** section of the SNS Management console, select the desired topic and click **Create Subscription**.
2. Select `HTTPS` as the protocol and enter the following webhook URL, substituting `<API_KEY>` with the value of any valid Datadog API key:

    ```text
    ## Datadog US site
    https://app.datadoghq.com/intake/webhook/sns?api_key=<API_KEY>

    ## Datadog EU site
    https://app.datadoghq.eu/intake/webhook/sns?api_key=<API_KEY>
    ```

3. Leave **Enable raw message delivery** unchecked.
4. Click **Create subscription**.

#### Send SNS notifications

To send SNS notifications from Datadog:

1. Configure the AWS account that is associated with an SNS service on the AWS integration page.
2. Install the [SNS integration][5].
3. Datadog then detects your configured SNS topics and enables @notifications, for example: `@sns-topic-name`.

### Log collection

SNS does not provide logs. Process logs and events that are transiting through to the SNS.

#### Send logs to Datadog

1. Configure a new SNS subscription.
2. Select the topic where messages come from.
3. For the Protocol, select **AWS Lambda**. 
4. For the Endpoint, enter the ARN of your Datadog Forwarder Lambda function.

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_sns" >}}


Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The Amazon SNS integration includes events for topic subscriptions. See the example event below:

{{< img src="integrations/amazon_sns/aws_sns_event.png" alt="Amazon SNS Events" >}}

### Service Checks

The Amazon SNS integration does not include any service checks.

## Troubleshooting

Datadog does not support SNS notifications from Datadog to topics in China.

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html
[5]: https://app.datadoghq.com/integrations/amazon-sns
[6]: https://docs.datadoghq.com/ja/integrations/guide/events-from-sns-emails/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sns/amazon_sns_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/