---
aliases:
- e6r-fkw-pih
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: sns
security: compliance
source: sns
title: SNS Topic has restrictions set for subscription
type: security_rules
---

## Description

Update your Amazon Simple Notification Service (SNS) topic subscription permissions.

## Rationale

Anonymous users can subscribe and receive messages that you publish, leaving the security of your application or service at risk.

## Remediation

### Console

Follow the [Preventative best practices][1] docs to learn how to implement least-privilege access or use IAM roles for your applications and AWS services.

### CLI

1. Update your [access control policy][2] with the IAM user ARN. Configure `action` to `SNS:Publish` and include your AWS IAM ARN. Save the file.

    {{< code-block lang="json" filename="access-control-policy-sub.sh" >}}
    {
      ...
      "Statement": [
        ...
        {
          "Sid": "console_sub",
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::123456789012:root"
          },
          "Action": [
            "SNS:Subscribe",
            "SNS:Receive"
          ],
          ...
        }
      ]
    }
    {{< /code-block >}}

2. Run `set-topic-attributes` with the [ARN of the SNS topic][3].

    {{< code-block lang="bash" filename="set-topic-attributes.sh" >}}
    aws sns set-topic-attributes
    --topic-arn arn:aws:sns:region:123456789012:YourTopic
    --attribute-name DisplayName
    --attribute-value YourTopicDisplayName
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-security-best-practices.html#preventative-best-practices
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sns/set-topic-attributes.html#set-topic-attributes
