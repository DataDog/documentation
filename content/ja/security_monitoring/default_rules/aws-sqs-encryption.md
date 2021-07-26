---
aliases:
  - /ja/nmb-c7a-8rv
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: sqs
security: コンプライアンス
source: sqs
title: SQS キューにはサーバー側の暗号化があります
type: security_rules
---
## 説明

サーバー側の暗号化を使用して、Amazon Simple Queue Service (SQS) メッセージを保護します。

## 根拠

暗号化により、機密データが含まれている可能性のある Amazon SQS メッセージを匿名または無許可のユーザーが利用できないようにします。

## 修復

### コンソール

[queue(console) のサービス側暗号化の構成][1]のドキュメントに従って、AWS Key Management Service (AWS KMS) を作成および使用して、サーバー側暗号化のカスタマーマスターキー (CMK) を管理する方法をご確認ください。

### CLI

1. [ファイル][2]で `set-queue-attributes` を定義します。`KmsMasterKeyID` にはカスタム KMS マスターキー ARN を使用します。ファイルを保存します。

    {{< code-block lang="json" filename="set-queue-attributes.json" >}}
    {
      "KmsMasterKeyId": "custom_key_arn",
      "KmsDataKeyReusePeriodSeconds": "300"
    }
    {{< /code-block >}}

2. ステップ 1 で作成した[キュー URL とファイル][2]を使用して `set-queue-attributes` を実行します。

    {{< code-block lang="bash" filename="set-queue-attributes.sh" >}}
    aws sqs set-queue-attributes
      --queue-url https://us-west-2.queue.amazonaws.com/123456789012/WebWorkerSQSQueue
      --attributes file://sqs-sse-enabled.json
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html
[2]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-properties-sqs-queues-syntax
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/set-queue-attributes.html#synopsis