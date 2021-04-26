---
categories:
    - cloud
    - aws
    - log collection
    - security
ddtype: crawler
description:
short_description:
doc_link: https://docs.datadoghq.com/integrations/iam_access_analyser/
git_integration_title: amazon_iam_access_analyser
has_logo: true
integration_title: AWS Identity and Access Management (IAM) Access Analyzer
is_public: true
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/iam_access_analyzer.md']
kind: integration
manifest_version: 1.0
name: iam_access_analyzer
public_title: Datadog-AWS Identity and Access Management Access Analyzer
version: 1.0
integration_id: "iam-access-analyzer"
---

## Overview

Use AWS Identity and Access Management (IAM) Access Analyzer across your Amazon account to continuously analyze IAM permissions granted with any of your account policies. Datadog integrates with Amazon IAM Access Analyzer using a Lambda function that ships its logs to Datadog.

## Setup

### Log collection

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][1].

2. Create a new rule in AWS EventBridge.

3. Define a custom event pattern with the following:

    ```json
    {
        "source": ["aws.access-analyzer"]
    }
    ```

4. Select an event bus and define the Datadog Lambda function as the target.

5. Save your rule.

6. Visit your [Log Explorer][2] to start exploring your logs.

[1]: /integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[2]: https://app.datadoghq.com/logs
