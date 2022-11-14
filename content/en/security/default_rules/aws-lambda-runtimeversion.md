---
aliases:
- zbs-gp9-gp2
- /security_monitoring/default_rules/zbs-gp9-gp2
- /security_monitoring/default_rules/aws-lambda-runtimeversion
disable_edit: true
integration_id: lambda
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: lambda
title: Lambda function uses latest runtime environment version
type: security_rules
---

## Description

Update your Amazon Lambda Function to the latest runtime environment version.

## Rationale

As a best practice, Amazon recommends consistently updating your runtime environment to the latest version for security patches, bug fixes, and the latest features.

## Remediation

### From the console

Follow the [Configuring functions in the console][1] docs to learn how to update the Lambda runtime that runs your function.

### From the command line

1. Run `update-function-configuration` with [your function name and the latest runtime version][2] supported by AWS.

#### python3.9
  {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
  aws lambda update-function-configuration
    --function-name YourLambdaFunction
    --runtime "python3.9"
  {{< /code-block >}}

#### nodejs16.x
  {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
  aws lambda update-function-configuration
    --function-name YourLambdaFunction
    --runtime "nodejs14.x"
  {{< /code-block >}}

#### java11
  {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
  aws lambda update-function-configuration
    --function-name YourLambdaFunction
    --runtime "java11"
  {{< /code-block >}}

#### go1.x
  {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
  aws lambda update-function-configuration
    --function-name YourLambdaFunction
    --runtime "go1.x"
  {{< /code-block >}}

#### dotnet6
  {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
  aws lambda update-function-configuration
    --function-name YourLambdaFunction
    --runtime "dotnet6"
  {{< /code-block >}}

#### ruby2.7
  {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
  aws lambda update-function-configuration
    --function-name YourLambdaFunction
    --runtime "ruby2.7"
  {{< /code-block >}}

#### provided.al2
  {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
  aws lambda update-function-configuration
    --function-name YourLambdaFunction
    --runtime "provided.al2"
  {{< /code-block >}}


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-console.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/update-function-configuration.html#synopsis
