---
title: Add AWS Log Lambda ARN
type: apicontent
order: 15.08
external_redirect: /api/#add-aws-log-lambda-arn
---

## Add AWS log lambda ARN

Attach the Lambda ARN of the Lambda created for the [Datadog-AWS log collection][1] to your AWS account ID to enable log collection.

**ARGUMENTS**:

* **`account_id`** [*required*]:

    Your AWS Account ID without dashes.
    [Consult the Datadog AWS integration to learn more][2] about your AWS account ID.

* **`lambda_arn`** [*required*]:
    ARN of the Datadog [Lambda created during the Datadog-Amazon Web services Log collection setup][1].

[1]: /integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[2]: /integrations/amazon_web_services/#configuration
