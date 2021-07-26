---
aliases:
  - /ja/syd-qyw-b0e
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: dynamodb
security: コンプライアンス
source: dynamodb
title: DynamoDB テーブルの暗号化
type: security_rules
---
## 説明

AWS DynamoDB データにサーバーサイドの暗号化を実装します。

## 根拠

サーバー側の暗号化、または保存時の暗号化は、暗号化されたテーブル内のデータを保護することで、より一層のデータ保護を提供します。保存時の暗号化と AWS Key Management Service (KMS) の統合で、これらのテーブルの暗号化に使用される暗号化キーを管理します。

## 修復

### コンソール

AWS コンソールでテーブルを作成して更新する方法については、[DynamoDB で暗号化されたテーブルを管理するためのチュートリアル][1] を参照してください。

### CLI

テーブル構成で `create-table` を実行し、[新規暗号化テーブルを作成します][2]。暗号化されたテーブルは、デフォルトの AWS 所有の CMK、AWS 管理の CMK、顧客管理の CMK で作成できます。[各コンフィギュレーション例については、AWS ドキュメント][3]を参照してください。たとえば、

    {{< code-block lang="bash" filename="create-table.sh" >}}
    aws dynamodb create-table
    --table-name your-table
    ...
    --sse-specification Enabled=true,SSEType=KMS,KMSMasterKeyId=abcd1234-abcd-1234-a123-ab1234a1b234
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/encryption.tutorial.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/create-table.html
[3]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/encryption.tutorial.html#encryption.tutorial-creating