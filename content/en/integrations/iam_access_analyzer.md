---
categories:
- cloud
- aws
- log collection
ddtype: crawler
description: 
short_description: 
doc_link: https://docs.datadoghq.com/integrations/iam_access_analyser/
git_integration_title: amazon_iam_access_analyser
has_logo: true
integration_title: AWS Identity and Access Management (IAM) Access Analyzer
is_public: true
kind: integration
manifest_version: 1.0
name: iam_access_analyzer
public_title: Datadog-AWS Identity and Access Management Access Analyzer
version: 1.0
---

## Overview

Use AWS Identity and Access Management (IAM) Access Analyzer across your Amazon account to continuously analyze IAM permissions granted with any of your account policies. Datadog integrates with Amazon IAM Access Analyzer using a Lambda function that ships its logs to Datadog.

## Setup
### Log Collection

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][1].

2. Create a new rule in CloudWatch EventBridge with the `aws.access-analyzer` Event type:

3. Define the Datadog Lambda function as the target.

4. Save your rule.

2. Add IAM Access Analyzer as a trigger for your Lambda function. Choose **CloudWatch Events** as a trigger and create an `IAM_ACCESS_RULE`:

3. Visit your [Log Explorer][2] to start exploring your logs.

[1]: /integrations/amazon_web_services/#create-a-new-lambda-function
[2]: https://app.datadoghq.com/logs
