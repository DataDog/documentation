---
aliases:
  - /ja/e6r-fkw-pih
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: sns
security: コンプライアンス
source: sns
title: SNS トピックにはサブスクリプションの制限が設定されています
type: security_rules
---
## 説明

Amazon Simple Notification Service (SNS) トピックのサブスクリプションアクセス許可を更新します。

## 根拠

匿名ユーザーは、公開したメッセージをサブスクライブして受信する可能性があるため、アプリケーションまたはサービスのセキュリティが危険にさらされます。

## 修復

### コンソール

[予防的ベストプラクティス][1]のドキュメントに従って、最小特権アクセスを実装する方法、またはアプリケーションと AWS サービスに IAM ロールを使用する方法をご確認ください。

### CLI

1. [アクセス制御ポリシー][2]を IAM ユーザー ARN で更新します。`action` を `SNS:Publish` に設定し、AWS IAM ARN を含めます。ファイルを保存します。

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

2. [SNS トピックの ARN][3] で `set-topic-attributes` を実行します。

    {{< code-block lang="bash" filename="set-topic-attributes.sh" >}}
    aws sns set-topic-attributes
    --topic-arn arn:aws:sns:region:123456789012:YourTopic
    --attribute-name DisplayName
    --attribute-value YourTopicDisplayName
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-security-best-practices.html#preventative-best-practices
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sns/set-topic-attributes.html#set-topic-attributes