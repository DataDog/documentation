---
aliases:
  - /ja/dsk-1y0-pv3
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: sqs
security: コンプライアンス
source: sqs
title: SQS キューは公開されていません
type: security_rules
---
## 説明

Amazon Simple Queue Service (SQS) キューのアクセス許可を更新します。

## 根拠

公開されている Amazon SQS キューを使用すると、許可されていないユーザーがキューメッセージを傍受、削除、または送信する可能性があり、データ漏洩につながる可能性があります。

## 修復

### コンソール

[リソースへのアクセスの管理][1]のドキュメントに従って、AWS コンソールにアクセス許可ポリシーを実装する方法をご確認ください。

### CLI

1. `list-queues` を実行して、キューの URL のリストを取得します。
2. ステップ 1 で返された[キュー URL][2]を使用して `get-queue-attributes` を実行します。

    {{< code-block lang="bash" filename="get-queue-attributes.sh" >}}
    aws sqs get-queue-attributes
        --queue-url https://queue.amazonaws.com/123456789012/YourQueue
        --attribute-names Policy
    {{< /code-block >}}

3. `add-permission` を実行して、キューポリシーに[新しいステートメントを追加][3]します。

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