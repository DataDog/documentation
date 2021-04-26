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

Datadog integrates with AWS GuardDuty via a Lambda function that ships GuardDuty findings to Datadog's Log Management solution.

## Setup

### Log collection

#### Enable GuardDuty logging

1. Create a new rule in Cloudwatch with the **GuardDuty Finding** Event type:

    {{< img src="integrations/amazon_guardduty/aws_gd_1.png" alt="aws gd 1"  style="width:75%;" >}}

2. If you haven't already, set up the [Datadog log collection AWS Lambda function][1].

3. Once the Lambda function is created, define the Datadog Lambda function as the target:

    {{< img src="integrations/amazon_guardduty/aws_gd_2.png" alt="aws gd 2"  style="width:75%;" >}}

4. Save your rule.

#### Send your logs to Datadog

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][1].

2. After setting up the Lambda function, add GuardDuty as a trigger by choosing **CloudWatch Events** as a trigger and creating a `GuardDutyRule`:

    {{< img src="integrations/amazon_guardduty/aws_gd_3.png" alt="aws gd 3"  style="width:75%;">}}

3. Once done, visit your [Datadog Log section][2] to start exploring your logs!

[1]: /integrations/amazon_web_services/#create-a-new-lambda-function
[2]: https://app.datadoghq.com/logs
