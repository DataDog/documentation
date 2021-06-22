---
aliases:
  - /ja/rl5-ki5-ja8
  - /ja/security_monitoring/default_rules/rl5-ki5-ja8
  - /ja/security_monitoring/default_rules/aws_lambda_public
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: lambda
security: コンプライアンス
source: lambda
title: Lambda 関数は公開されていません
type: security_rules
---
## 説明

AWS Lambda 関数のアクセスポリシーを更新し、不正なユーザーのアクセスを削除します。

## 根拠

匿名のユーザーに Amazon Lambda 関数を呼び出す権限を与えると、データの損失、データの暴露、予期しない AWS への課金などにつながる可能性があります。

## 修復

### コンソール

[AWS Lambda でリソースベースのポリシーを使用する][1]ドキュメントに従って、AWS Lambda 関数のアクセス許可を更新してください。

### CLI

1. お使いの[関数名とステートメント ID][2] で `remove-permission` を実行します。

  {{< code-block lang="bash" filename="remove-permission.sh" >}}
  aws lambda remove-permission
    --function-name your-function-name
    --statement-id ab-12ab34c5-6a78-9b0c-123d-a123b456c789
  {{< /code-block >}}

2. お使いの[関数名、ステートメント ID、信頼できるアカウントのプリンシパル、およびアクション][3]で `add-permission` を実行します。

  {{< code-block lang="bash" filename="add-permission.sh" >}}
  aws lambda add-permission
    --function-name your-function-name
    --statement-id ab-12ab34c5-6a78-9b0c-123d-a123b456c789
    --principal 0123456780123
    --action lambda:InvokeFunction
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/remove-permission.html#synopsis
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/add-permission.html#synopsis