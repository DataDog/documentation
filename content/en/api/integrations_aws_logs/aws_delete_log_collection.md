---
title: Delete an AWS Logs integration
type: apicontent
order: 16.10
external_redirect: /api/#delete-an-aws-logs-integration
---

## Delete an AWS Logs integration

Delete a Datadog-AWS logs configuration by removing the specific Lambda ARN associated with a given AWS account.

**ARGUMENTS**:

* **`account_id`** [*required*]:

    Your AWS Account ID without dashes.
    [Consult the Datadog AWS integration to learn more][1] about your AWS account ID.

* **`lambda_arn`** [*required*]:
    ARN of the Datadog [Lambda created during the Datadog-Amazon Web services Log collection setup][2].

[1]: /integrations/amazon_web_services/#configuration
[2]: /integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
