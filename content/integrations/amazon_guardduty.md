---
categories:
- cloud
- aws
- log collection
- security
ddtype: crawler
description: Gather your AWS GuardDuty logs.
doc_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
has_logo: true
integration_title: AWS GuardDuty
is_public: true
kind: integration
name: amazon_guardduty
public_title: Datadog-AWS GuardDuty Integration
short_description: Gather your AWS GuardDuty logs.
version: '1.0'
---

## Overview


Datadog integrates with AWS GuardDuty via a Lambda function that ships GuardDuty findings to Datadog's Log Management solution.

## Setup
### Log Collection
#### Enable GuardDuty logging

1. Create a new rule in Cloudwatch with the **GuardDuty Finding** Event type:

    {{< img src="integrations/amazon_guardduty/aws_gd_1.png" alt="aws gd 1" responsive="true" style="width:75%;" >}}

2. If you haven't already, set up the [Datadog log collection AWS Lambda function](/integrations/amazon_web_services/#create-a-new-lambda-function).

3. Once the Lambda function is created, define the Datadog Lambda function as the target:

    {{< img src="integrations/amazon_guardduty/aws_gd_2.png" alt="aws gd 2" responsive="true" style="width:75%;" >}}

4. Save your rule.

#### Send your Logs to Datadog

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][1].

2. After setting up the Lambda function, add GuardDuty as a trigger by choosing **CloudWatch Events** as a trigger and creating a `GuardDutyRule`:

    {{< img src="integrations/amazon_guardduty/aws_gd_3.png" alt="aws gd 3" responsive="true" style="width:75%;">}}

3. Once done, visit your [Datadog Log section](https://app.datadoghq.com/logs) to start exploring your logs!

[1]: /integrations/amazon_web_services/#create-a-new-lambda-function
