---
aliases:
- fcc-nsq-vkn
- /security_monitoring/default_rules/fcc-nsq-vkn
- /security_monitoring/default_rules/aws-sns-public
disable_edit: true
integration_id: sns
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: sns
title: SNS Topic is not publicly accessible
type: security_rules
---

## Description

Update your Amazon Simple Notification Service (SNS) topic permissions.

## Rationale

Publicly-accessible topics allow unauthorized users access to receive and publish messages and subscribe to exposed topics.

## Remediation

### From the console

Follow the [Using identity-based policies with Amazon SNS][1] docs to learn how to create or add to a policy in the AWS Console.

### From the command line

If you do not have an access control policy, [create one][2].

1. Select `SNS Topic Policy` as the type of policy.
2. Add a statement to allow only specific IAM users and roles to have access to the topic. For example:

    {{< code-block lang="text">}}
    Effect: `Allow`
    Principal: `arn:aws:iam::123456789012:root`
    Action: `Add permission`
    Amazon Resource Name: `arn:aws:iam::123456789012:root`
    {{< /code-block >}}

If you do have an access control policy, follow the [add-permissions][3] docs to add a permission to your existing policy.

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html#iam-and-sns-policies
[2]: https://awspolicygen.s3.amazonaws.com/policygen.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/add-permission.html
