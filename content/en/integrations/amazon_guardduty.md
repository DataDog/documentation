---
categories:
    - cloud
    - aws
    - log collection
    - security
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

1. Create a new rule in Cloudwatch with the **GuardDuty Finding** Event type:

    {{< img src="integrations/amazon_guardduty/aws_gd_1.png" alt="aws gd 1" style="width:75%;" >}}

2. If you haven't already, set up the [Datadog Forwarder Lambda function][1].

3. Once the Lambda function is created, define the Datadog Lambda function as the target:

    {{< img src="integrations/amazon_guardduty/aws_gd_2.png" alt="aws gd 2" style="width:75%;" >}}

4. Save your rule.

#### Send your logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][1] in your AWS account.
2. Once setup, go to the Datadog Forwarder Lambda function. In the Function Overview section, click **Add Trigger**. 
3. Select the **EventBridge (CloudWatch Events)** trigger for the Trigger Configuration.
4. Select your GuardDuty rule.
5. Click **Add** to add the trigger to your Lambda.

 Go to [Log Explorer][2] to start exploring your logs.

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda Function][3].

[1]: /logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
