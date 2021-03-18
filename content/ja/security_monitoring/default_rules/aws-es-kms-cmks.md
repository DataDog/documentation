---
aliases:
  - /ja/617-v5l-ed8
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elasticsearch
security: コンプライアンス
source: elasticsearch
title: Elasticsearch ドメインが KMS カスタマーマスターキーで暗号化
type: security_rules
---
## 概要

## 説明

Amazon Elasticsearch ドメインを KMS カスタマーマスターキー (CMK) で暗号化します。

## 根拠

KMS カスタマーマスターキーを使用することで、ドメインを保護し、より細かい粒度で暗号化/復号化処理を制御できます。

## 修復

### コンソール

Amazon Elasticsearch ドメインを AWS コンソールで暗号化する方法については、[保存データの暗号化][1]ドキュメントを参照してください。

### CLI

1. 以下の[コンフィギュレーション][2]で、新しい JSON ポリシードキュメントを作成します。

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

2. 新しいポリシードキュメントで `create-key` を実行し [KMS キーを作成][3]します。

    {{< code-block lang="bash" filename="create-key.sh" >}}
    aws kms create-key
    --description 'KMS CMK policy for encrypting es domain data'
    --policy file://es-kms-cmk-policy.json
    {{< /code-block >}}

3. 返された ARN キーで `create-alias` を実行し、CMK に[新しいエイリアスをアタッチ][4]します。

    {{< code-block lang="bash" filename="create-alias.sh" >}}
    aws kms create-alias
        --alias-name your-alias/ESCustomCMK
        --target-key-id arn:aws:kms:111122223333:key/abcdabcd-aaaa-bbbb-cccc-abcdabcdabcd
    {{< /code-block >}}

4. ステップ 3 で返されたコンフィギュレーションデータで `create-elasticsearch-domain` を実行し、`encryption-at-rest-options` が `enabled= true`、そして `KmsKeyId=your-key-id` と設定された[選択済みドメインを作成][5]します。

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