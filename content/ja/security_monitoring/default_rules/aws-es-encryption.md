---
aliases:
  - /ja/62v-0kq-n6b
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elasticsearch
security: コンプライアンス
source: elasticsearch
title: Elasticsearch ドメインは暗号化されています
type: security_rules
---
## 説明

AWS KMS サービスを使い、Amazon Elasticsearch (ES) ドメインに保存時の暗号化を実装します。

## 根拠

保存時の暗号化の実装により、不正なアクセスからドメインを守り、セキュリティおよびコンプライアンス要件を満たすことができます。

## 修復

### コンソール

ドメインに暗号化を実装する方法については、[保存データの暗号化][1]ドキュメントを参照してください。

### CLI

1. ES ドメインで `describe-elasticsearch-domain` を実行し、構成メタデータを返します。

    {{< code-block lang="bash" filename="describe-elasticsearch-domain.sh" >}}
    aws es describe-elasticsearch-domain
        --domain-name your-es-domain
    {{< /code-block >}}

2. ドメイン名と `encryption-at-rest-options` で `create-elasticsearch-domain` を実行します。前のステップで返されたメタデータを使用し 、[ES ドメインを作成して再起動し、保存時の暗号化を有効にします][3]。

    {{< code-block lang="bash" filename="create-elasticsearch-domain.sh" >}}
    aws es create-elasticsearch-domain
        --domain-name your-es-domain
        ...
        --encryption-at-rest-options Enabled=true,KmsKeyId="abcdabcd-aaaa-bbbb-cccc-abcdabcdabcd"
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/encryption-at-rest.html#enabling-ear
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/describe-elasticsearch-domain.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/create-elasticsearch-domain.html