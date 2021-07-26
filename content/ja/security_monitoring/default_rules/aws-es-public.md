---
aliases:
  - /ja/kbp-pln-54a
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elasticsearch
security: コンプライアンス
source: elasticsearch
title: Elasticsearch ドメインは公開されていません
type: security_rules
---
## 説明

アクセスが公開されている Amazon Elasticsearch ドメインを更新して署名のないリクエストをブロックします。

## 根拠

Amazon Elasticsearch ドメインをプライベートドメインに更新すると、データを権限のないユーザーによるアクセスや変更から保護できます。

## 修復

### コンソール

アクセスが公開されている Amazon Elasticsearch ドメインを AWS コンソールで更新する方法については、[アクセスポリシーの構成][1]ドキュメントを参照してください。

### CLI

1. 新しいポリシーの JSON ドキュメントを作成します。特定の IP のみのドメインアクセスを許可するカスタムポリシーを作成するには、[Amazon Elasticsearch ポリシーテンプレート][2]を利用できます。

    {{< code-block lang="bash" filename="ip-based-policy.json" >}}
    {
    ...
    "Statement": [
        ...
        "Action": "es:*",
        "Condition": {
            "IpAddress": {
            "aws:SourceIp": [
                "54.197.25.93/32"
            ]
            }
        },
        "Resource": "arn:aws:es:123456789123:
                    domain/es-cluster/*"
        }
    ]
    }
    {{< /code-block >}}

2. 前のステップで作成された [Elasticsearch ドメイン][3]の名前を使用して、`update-elasticsearch-domain-config` を実行します。

    {{< code-block lang="bash" filename="ip-based-policy.json" >}}
    aws es update-elasticsearch-domain-config
        --domain-name es-cluster
        --access-policies file://ip-based-policy.json
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-createupdatedomains.html#es-createdomain-configure-access-policies
[2]: https://docs.aws.amazon.com/kms/latest/developerguide/determining-access-key-policy.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/update-elasticsearch-domain-config.html