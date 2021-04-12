---
aliases:
- syd-qyw-b0e
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: dynamodb
security: compliance
source: dynamodb
title: DynamoDB table encrypted
type: security_rules
---

## Description

Implement server-side encryption for your AWS DynamoDB data.

## Rationale

Server-side encryption, or encryption at rest, provides an additional layer of data protection by securing your data in an encrypted table. Encryption at rest integrates with AWS Key Management Service (KMS) to manage encryption keys that are used to encrypt these tables.

## Remediation

### Console

Follow the [Managing Encrypted Tables in DynamoDB tutorial][1] to learn how to create and update a table in the AWS Console.

### CLI

Run `create-table` with a table configuration to [create a new encrypted table][2]. You can create an encrypted table with the default AWS owned CMK, AWS managed CMK, or customer managed CMK. Refer to the [AWS documentation for examples of each configuration][3]. For example:

    {{< code-block lang="bash" filename="create-table.sh" >}}
    aws dynamodb create-table
    --table-name your-table
    ...
    --sse-specification Enabled=true,SSEType=KMS,KMSMasterKeyId=abcd1234-abcd-1234-a123-ab1234a1b234
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/encryption.tutorial.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/create-table.html
[3]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/encryption.tutorial.html#encryption.tutorial-creating
