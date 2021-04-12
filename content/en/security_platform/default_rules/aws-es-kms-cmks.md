---
aliases:
- 617-v5l-ed8
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elasticsearch
security: compliance
source: elasticsearch
title: Elasticsearch domains are encrypted with KMS Customer Master Keys
type: security_rules
---

## Description

Encrypt your Amazon Elasticsearch domains with KMS Customer Master Keys (CMKs).

## Rationale

KMS Custom Master Keys protect your domains and allow more granular control over the encryption/decryption process.

## Remediation

### Console

Follow the [Enabling Encryption of Data at Rest][1] docs to learn how to encrypt Amazon Elasticsearch domains in the AWS Console.

### CLI

1. Create a new policy JSON document with the following [configuration][2]:

    {{< code-block lang="json" filename="es-kms-cmk-policy.json" >}}
    {
    "Id": "es-custom-key-policy",
    "Statement": [
        {
        "Sid": "Enable IAM User Permissions",
        "Effect": "Allow",
        "Principal": {"AWS": "arn:aws:iam::111122223333:root"},
        "Action": "kms:*",
        "Resource": "*"
        },
        {
        "Sid": "Grant access to CMK manager",
        "Effect": "Allow",
        "Principal": {"AWS": "arn:aws:iam::111122223333:role/AmazonESManager"},
        "Action": [
            "kms:Create*",
            "kms:Describe*",
            "kms:Enable*",
            "kms:List*",
            "kms:Put*",
            "kms:Update*",
            "kms:Revoke*",
            "kms:Disable*",
            "kms:Get*",
            "kms:Delete*",
            "kms:ScheduleKeyDeletion",
            "kms:CancelKeyDeletion"
        ],
        "Resource": "*"
        },
        {
        "Sid": "Allow the use of the CMK",
        "Effect": "Allow",
        "Principal": {"AWS": "arn:aws:iam::111122223333:user/ESAdmin"},
        "Action": [
            "kms:Encrypt",
            "kms:Decrypt",
            "kms:ReEncrypt*",
            "kms:GenerateDataKey*",
            "kms:DescribeKey"
        ],
        "Resource": "*"
        },
        {
        "Sid": "Allow attachment of persistent resources",
        "Effect": "Allow",
        "Principal": {"AWS": "arn:aws:iam::111122223333:user/ESAdmin"},
        "Action": [
            "kms:CreateGrant",
            "kms:ListGrants",
            "kms:RevokeGrant"
        ],
        "Resource": "*",
        "Condition": {
            "Bool": {"kms:GrantIsForAWSResource": "true"}
        }
        }
    ]
    }
    {{< /code-block >}}

2. Run `create-key` to [create a KMS key][3] with the new policy document.

    {{< code-block lang="bash" filename="create-key.sh" >}}
    aws kms create-key
    --description 'KMS CMK policy for encrypting es domain data'
    --policy file://es-kms-cmk-policy.json
    {{< /code-block >}}

3. Run `create-alias` with the returned ARN key to [attach a new alias][4] to the CMK.

    {{< code-block lang="bash" filename="create-alias.sh" >}}
    aws kms create-alias
        --alias-name your-alias/ESCustomCMK
        --target-key-id arn:aws:kms:111122223333:key/abcdabcd-aaaa-bbbb-cccc-abcdabcdabcd
    {{< /code-block >}}

4. Run `create-elasticsearch-domain` with the returned configuration data in step 3 to [create the selected domain][5] with `encryption-at-rest-options` set as `enabled= true` and the `KmsKeyId=your-key-id`.

    {{< code-block lang="bash" filename="create-elasticsearch-domain.sh" >}}
    aws es create-elasticsearch-domain
        --domain-name your-domain-name
        ....
        --encryption-at-rest-options Enabled=true,KmsKeyId="abcdabcd-aaaa-bbbb-cccc-abcdabcdabcd"
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-createupdatedomains.html#es-createdomain-configure-access-policies
[2]: https://docs.aws.amazon.com/kms/latest/developerguide/determining-access-key-policy.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/create-key.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/create-alias.html#options
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/create-elasticsearch-domain.html#options
