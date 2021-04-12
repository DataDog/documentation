---
aliases:
- dsk-1y0-pv3
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: sqs
security: compliance
source: sqs
title: SQS Queue is not publicly accessible
type: security_rules
---

## Description

Update Amazon Simple Queue Service (SQS) queue permissions.

## Rationale

Publicly-available Amazon SQS queues give unauthorized users access to potentially intercept, delete, or send queue messages, which can lead to data leaks.

## Remediation

### Console

Follow the [Managing access to resources][1] docs to learn how to implement a permissions policy in the AWS console.

### CLI

1. Run `list-queues` to get a list of queue URLs.
2. Run `get-queue-attributes` with a [queue URL][2] returned in step 1.

    {{< code-block lang="bash" filename="get-queue-attributes.sh" >}}
    aws sqs get-queue-attributes
        --queue-url https://queue.amazonaws.com/123456789012/YourQueue
        --attribute-names Policy
    {{< /code-block >}}

3. Run `add-permission` to [add a new statement][3] to your queue policy.

    {{< code-block lang="bash" filename="add-permission.sh" >}}
    aws sqs add-permission
        --queue-url https://queue.amazonaws.com/123456789012/YourQueue
        --label SendMessages
        --aws-account-ids 123456789012
        --actions SendMessage
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-overview-of-managing-access.html#sqs-managing-access-to-resources
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/get-queue-attributes.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/add-permission.html
