---
aliases:
- nmb-c7a-8rv
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: sqs
security: compliance
source: sqs
title: SQS Queue has server-side encryption
type: security_rules
---

## Description

Secure your Amazon Simple Queue Service (SQS) messages with server-side encryption.

## Rationale

Encryption ensures that Amazon SQS messages, which may contain sensitive data, are not available to anonymous or unauthorized users.

## Remediation

### Console

Follow the [Configuring service-side encryption for a queue(console)][1] docs to learn how to create and use AWS Key Management Service (AWS KMS) to manage customer master keys (CMK) for server-side encryption.

### CLI

1. Define `set-queue-attributes` in [a file][2]. Use your custom KMS Master Key ARN for `KmsMasterKeyID`. Save the file.

    {{< code-block lang="json" filename="set-queue-attributes.json" >}}
    {
      "KmsMasterKeyId": "custom_key_arn",
      "KmsDataKeyReusePeriodSeconds": "300"
    }
    {{< /code-block >}}

2. Run `set-queue-attributes` with the [queue URL and the file][2] created in step 1.

    {{< code-block lang="bash" filename="set-queue-attributes.sh" >}}
    aws sqs set-queue-attributes
      --queue-url https://us-west-2.queue.amazonaws.com/123456789012/WebWorkerSQSQueue
      --attributes file://sqs-sse-enabled.json
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html
[2]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-properties-sqs-queues-syntax
