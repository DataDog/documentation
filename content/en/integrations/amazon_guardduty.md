---
categories:
    - cloud
    - aws
    - log collection
    - security
ddtype: crawler
description: Gather your AWS GuardDuty logs.
doc_link: /integrations/amazon_guardduty/
has_logo: true
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_guardduty.md']
integration_title: AWS GuardDuty
is_public: true
kind: integration
name: amazon_guardduty
public_title: Datadog-AWS GuardDuty Integration
short_description: Gather your AWS GuardDuty logs.
version: '1.0'
integration_id: "amazon-guardduty"
---

## Overview

Datadog integrates with AWS GuardDuty through a Lambda function that ships GuardDuty findings to Datadog's Log Management solution.

## Setup

### Log collection

#### Enable logging

1. If you haven't already, set up the [Datadog Forwarder Lambda function][1].

2. Create a new rule in [Amazon EventBridge][2] and select **Rule with an event pattern**.

3. In the **Event source** section, select `AWS events or EventBridge partner events`. In the **Event pattern** section, specify `AWS services` for the source, `GuardDuty` for the service, and `GuardDuty Finding` as the type.

4. Set `AWS service` as the target type, `Lambda function` as the target, and select the Datadog forwarder from the dropdown `Function` menu. 

5. Configure any desired tags, and click `Create rule`.



#### Send your logs to Datadog

1. In the AWS console, go to **Lambda**.

2. Click **Functions** and select the Datadog forwarder.

3. Under the **Configuration** tab, click `Add trigger`. Select **EventBridge (CloudWatch Events)** from the dropdown menu, and specify the rule created in the [enable logging section](#enable-logging).

3. Once complete, see the [Datadog Log section][3] to start exploring your logs.

[1]: /logs/guide/forwarder/
[2]: https://docs.aws.amazon.com/eventbridge/index.html
[3]: https://app.datadoghq.com/logs
