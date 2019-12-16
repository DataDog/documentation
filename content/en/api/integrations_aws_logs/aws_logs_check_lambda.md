---
title: Check that AWS Lambda Function exists
type: apicontent
order: 16.11
external_redirect: /api/#check-aws-lambda
---

## Check that AWS Lambda Function exists

Check function that verifies whether a given Lambda exists within a given AWS account. This endpoint can be polled continuously without blocking.

* Returns a status of `created` when it's checking if the Lambda exists in the account.
* Returns a status of `waiting` while checking.
* Returns a status of `checked and ok` if the Lambda exists.
* Returns a status of `error` if the Lambda does not exist.

**Note**: You must have the given AWS account configured in the main AWS Integration tile for this to successfully verify.

**ARGUMENTS**:

* **`account_id`** [*required*]:

    Your AWS Account ID without dashes.
    [Consult the Datadog AWS integration to learn more][1] about your AWS account ID.

* **`lambda_arn`** [*required*]:
    ARN of the Datadog [Lambda created during the Datadog-Amazon Web services Log collection setup][2].

[1]: /integrations/amazon_web_services/#configuration
[2]: /integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
