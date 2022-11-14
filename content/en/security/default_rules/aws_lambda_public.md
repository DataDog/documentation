---
aliases:
- rl5-ki5-ja8
- /security_monitoring/default_rules/rl5-ki5-ja8
- /security_monitoring/default_rules/aws_lambda_public
disable_edit: true
integration_id: lambda
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: lambda
title: Lambda function is not publicly accessible
type: security_rules
---

## Description

Update your AWS Lambda function access policy to remove access for unauthorized users.

## Rationale

Giving anonymous users the ability to invoke Amazon Lambda functions can lead to data loss, data exposure, and unexpected AWS billing charges.

## Remediation

### From the console

Follow the [Using resource-based policies for AWS lambda][1] docs to update your AWS lambda function permissions.

### From the command line

1. Run `remove-permission` with your [function name and statement ID][2].

  {{< code-block lang="bash" filename="remove-permission.sh" >}}
  aws lambda remove-permission
    --function-name your-function-name
    --statement-id ab-12ab34c5-6a78-9b0c-123d-a123b456c789
  {{< /code-block >}}

2. Run `add-permission` with your [function name, statement ID, principal for the trusted account, and action][3].

  {{< code-block lang="bash" filename="add-permission.sh" >}}
  aws lambda add-permission
    --function-name your-function-name
    --statement-id ab-12ab34c5-6a78-9b0c-123d-a123b456c789
    --principal 0123456780123
    --action lambda:InvokeFunction
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/remove-permission.html#synopsis
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/add-permission.html#synopsis
