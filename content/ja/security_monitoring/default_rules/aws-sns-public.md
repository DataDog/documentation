---
aliases:
  - /ja/fcc-nsq-vkn
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: sns
security: コンプライアンス
source: sns
title: SNS トピックは公開されていません
type: security_rules
---
## 説明

Amazon Simple Notification Service (SNS) トピックのアクセス許可を更新します。

## 根拠

公開されているトピックを使用すると、許可されていないユーザーがメッセージを受信および公開したり、公開されたトピックをサブスクライブしたりできます。

## 修復

### コンソール

[Amazon SNS での ID ベースのポリシーの使用][1]のドキュメントに従って、AWS コンソールでポリシーを作成または追加する方法をご確認ください。

### CLI

アクセス制御ポリシーがない場合は、[作成][2]します。

1. ポリシーのタイプとして `SNS Topic Policy` を選択します。
2. 特定の IAM ユーザーとロールのみがトピックにアクセスできるようにするステートメントを追加します。例:

    {{< code-block lang="text">}}
    Effect: `Allow`
    Principal: `arn:aws:iam::123456789012:root`
    Action: `Add permission`
    Amazon Resource Name: `arn:aws:iam::123456789012:root`
    {{< /code-block >}}

アクセス制御ポリシーがある場合は、[add-permissions][3] のドキュメントに従って、既存のポリシーにアクセス許可を追加してください。

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html#iam-and-sns-policies
[2]: https://awspolicygen.s3.amazonaws.com/policygen.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/add-permission.html