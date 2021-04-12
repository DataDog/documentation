---
aliases:
- zbs-gp9-gp2
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: lambda
security: compliance
source: lambda
title: Lambda function uses latest runtime environment version
type: security_rules
---

## Description

Update your Amazon Lambda Function to the latest runtime environment version.

## Rationale

As a best practice, Amazon recommends consistently updating your runtime environment to the latest version for security patches, bug fixes, and the latest features.

## Remediation

### Console

Follow the [Configuring functions in the console][1] docs to learn how to update the Lambda runtime that runs your function.

### CLI

1. Run `update-function-configuration` with [your function name and the latest runtime version][2] supported by AWS.

  {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
  aws lambda update-function-configuration
    --function-name YourLambdaFunction
    --runtime "python3.8"
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-console.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/update-function-configuration.html#synopsis
