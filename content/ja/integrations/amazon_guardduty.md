---
categories:
- cloud
- aws
- log collection
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_guardduty.md
description: Gather your Amazon GuardDuty logs.
doc_link: /integrations/amazon_guardduty/
has_logo: true
integration_id: amazon-guardduty
integration_title: Amazon GuardDuty
is_public: true
name: amazon_guardduty
public_title: Datadog-Amazon GuardDuty Integration
short_description: Gather your Amazon GuardDuty logs.
version: '1.0'
---

## Overview

Datadog integrates with Amazon GuardDuty through a Lambda function that ships GuardDuty findings to Datadog's Log Management solution.

## Setup

### Log collection

#### Enable logging

1. If you haven't already, set up the [Datadog Forwarder Lambda function][1].

2. Create a new rule in [Amazon EventBridge][2]. Give the rule a name and select **Rule with an event pattern**. Click **Next**.

3. Build the event pattern to match your GuardDuty Findings. In the **Event source** section, select `AWS events or EventBridge partner events`. In the **Event pattern** section, specify `AWS services` for the source, `GuardDuty` for the service, and `GuardDuty Finding` as the type. Click **Next**.

4. Select the Datadog Forwarder as the target. Set `AWS service` as the target type, `Lambda function` as the target, and choose the Datadog forwarder from the dropdown `Function` menu. Click **Next**.

5. Configure any desired tags, and click **Create rule**.

#### Send your logs to Datadog

1. In the AWS console, go to **Lambda**.

2. Click **Functions** and select the Datadog forwarder.

3. In the Function Overview section, click **Add Trigger**. Select **EventBridge (CloudWatch Events)** from the dropdown menu, and specify the rule created in the [enable logging section](#enable-logging).

4. See any new GuardDuty Findings in the [Datadog Log Explorer][3].

[1]: /ja/logs/guide/forwarder/
[2]: https://console.aws.amazon.com/events/home
[3]: https://app.datadoghq.com/logs