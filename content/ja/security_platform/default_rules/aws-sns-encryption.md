---
aliases:
  - /ja/7b7-txn-jj2
  - /ja/security_monitoring/default_rules/7b7-txn-jj2
  - /ja/security_monitoring/default_rules/aws-sns-encryption
cloud: AWS
disable_edit: true
integration_id: amazon-sns
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: sns
security: コンプライアンス
source: sns
title: SNS トピックにサーバーサイド暗号化が設定されています
type: security_rules
---
## 説明

AWS の Simple Notification Service (SNS) サーバーでサーバーサイド暗号化を有効化します。

## 根拠

サーバーサイド暗号化 (SSE) は SNS トピック内で公開されたメッセージのデータを保護し、コンプライアンスと規制要件の遵守をサポートします。

## 修復

### コンソール

[Amazon SNS トピックでサーバーサイド暗号化 (SSE) を有効化][1]のドキュメントに従って、AWS の管理コンソールから暗号化を有効化する方法をご確認ください。

### CLI

[SNS トピックの ARN][2] および [KmsMasterKeyId][3] で `set-topic-attributes` を実行します。

    {{< code-block lang="bash" filename="set-topic-attributes.sh" >}}
    aws sns set-topic-attributes
    --topic-arn arn:aws:sns:region:123456789012:YourTopic
    --attribute-name KmsMasterKeyId
    --attribute-value YourTopicDisplayName
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-enable-encryption-for-topic.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sns/set-topic-attributes.html#set-topic-attributes
[3]: https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html#sse-key-terms