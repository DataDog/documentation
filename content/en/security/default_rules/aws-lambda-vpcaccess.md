---
aliases:
- 9ga-poq-w7v
- /security_monitoring/default_rules/9ga-poq-w7v
- /security_monitoring/default_rules/aws-lambda-vpcaccess
disable_edit: true
integration_id: lambda
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: lambda
title: Lambda function has access to VPC resources
type: security_rules
---

## Description

Configure your Amazon Lambda Function to have access to VPC-only resources.

## Rationale

By default, Amazon Lambda functions run in a secure VPC with access to any AWS service and the internet. Selecting which resources have access secures the connections within your private VPC.

## Remediation

### From the console

Follow the [Configuring VPC access (console)][1] docs to configure VPC access for an existing function.

### From the command line

1. Run `update-function-configuration` with your [Amazon Lambda function name and VPC configuration][2]. Set network connectivity to AWS resources within the configured VPC.

   {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
   aws lambda update-function-configuration
       --function-name your-lambda-function-name
       --vpc-config SubnetIds="subnet-ab12cd34","subnet-12345678",SecurityGroupIds="id-0abcd1234abcd5678"
   {{< /code-block >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#vpc-configuring
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/update-function-configuration.html#synopsis
