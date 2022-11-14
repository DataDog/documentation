---
aliases:
- 7b7-txn-jj2
- /security_monitoring/default_rules/7b7-txn-jj2
- /security_monitoring/default_rules/aws-sns-encryption
disable_edit: true
integration_id: sns
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: sns
title: SNS Topic has server-side encryption
type: security_rules
---

## Description

Enable Server-Side Encryption for your AWS Simple Notification Service (SNS) topics.

## Rationale

Server-Side Encryption (SSE) protects the data of published messages within your SNS topics, which can help adhere to compliance and regulatory requirements.

## Remediation

### From the console

Follow the [Enabling server-side encryption (SSE) for an Amazon SNS topic][1] docs to learn how to enable encryption from the AWS Management Console.

### From the command line

Run `set-topic-attributes` with the [ARN of the SNS topic][2] and the [KmsMasterKeyId][3].

{{< code-block lang="bash" filename="set-topic-attributes.sh" >}}
aws sns set-topic-attributes
  --topic-arn arn:aws:sns:region:123456789012:YourTopic
  --attribute-name KmsMasterKeyId
  --attribute-value YourTopicDisplayName
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-enable-encryption-for-topic.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sns/set-topic-attributes.html#set-topic-attributes
[3]: https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html#sse-key-terms
