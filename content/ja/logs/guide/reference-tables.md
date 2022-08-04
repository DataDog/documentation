---
aliases:
- /ja/logs/guide/enrichment-tables/
beta: true
further_reading:
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法について
- link: /logs/log_configuration/parsing
  tag: ドキュメント
  text: パースの詳細
kind: ガイド
title: リファレンステーブルを含むログにカスタムメタデータを追加する
---

<div class="alert alert-warning">
リファレンステーブル機能は現在公開ベータ版です。リファレンステーブルを定義したりクエリを作成したりしても、請求内容には影響しません。詳細については、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>にお問い合わせください。
ベータ版期間中は、1 アカウントにつき 100 個のリファレンステーブルという制限があります。
</div>

## 概要

情報のテーブルを含む CSV ファイルをアップロードして、顧客の詳細、サービス名と情報、IP アドレスなどの新しいエンティティを Datadog で定義します。これは、リファレンステーブルのプライマリキーと関連するメタデータによって表されます。このデータは、[Lookup Processor][1] での取り込み時にログのタグとして適用できます。

{{< img src="logs/guide/enrichment-tables/overview.png" alt="リファレンステーブル" style="width:100%;">}}

## リファレンステーブルを作成する

{{< tabs >}}
{{% tab "手動アップロード" %}}

**New Reference Table +** をクリックしてから、CSV ファイルをアップロードし、適切な列に名前を付けて、ルックアップのプライマリキーを定義します。

{{< img src="logs/guide/enrichment-tables/configure-enrichment-table.png" alt="リファレンステーブルを作成する" style="width:100%;">}}

**注**: CSV の手動アップロードは、4MB までのファイルをサポートしています。

{{% /tab %}}

{{% tab "AWS S3 アップロード" %}}

リファレンステーブルは、AWS S3 バケットから CSV ファイルを自動的にプルして、データを最新の状態に保つことができます。インテグレーションでは、S3 で CSV ファイルへの変更が検索され、ファイルが更新されると、リファレンステーブルが新しいデータに置き換えられます。これにより、初期リファレンステーブルが構成されると、S3 API を使用した API 更新も可能になります。

S3 からリファレンステーブルを更新するために、Datadog は [AWS インテグレーション][1]用に構成した AWS アカウントの IAM ロールを使用します。このロールをまだ作成していない場合は、[こちらの手順][2]で作成してください。このロールがリファレンステーブルを更新できるようにするには、次のアクセス許可ステートメントを IAM ポリシーに追加します。バケット名は、環境に合わせて編集します。


```json
{
    "Statement": [
        {
            "Sid": "EnrichmentTablesS3",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::<MY_BUCKET_NAME_1/*>",
                "arn:aws:s3:::<MY_BUCKET_NAME_2>"
            ]
        }
    ],
    "Version": "2012-10-17"
}
```
### テーブルを定義する

**New Reference Table +** をクリックしてから、名前を追加し、AWS S3 を選択し、すべてのフィールドに入力し、インポートをクリックして、ルックアップのプライマリキーを定義します。

{{< img src="logs/guide/enrichment-tables/configure-s3-reference-table.png" alt="リファレンステーブルを作成する" style="width:100%;">}}

**注**: S3 バケットからのアップロードは、200MB までのファイルをサポートしています。

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=automaticcloudformation#installation
{{% /tab %}}
{{< /tabs >}}

このリファレンステーブルを使用して、[Lookup Processor][1] でログに属性を追加できます。

## リファレンステーブルを変更する

既存のリファレンステーブルを新しいデータで変更するには、テーブルを選択し、右上の **Update Data +** をクリックします。
選択した CSV がテーブルにアップサートされます。つまり、

* 同じ主キーを持つ既存の行はすべて更新される
* すべての新しい行が追加される
* 新しいファイルに含まれない古い行はすべて削除される

テーブルが保存されると、アップサートされた行は非同期で処理され、プレビューで更新されます。更新が完了するまでには、最大で 10 分かかる場合があります。

## リファレンステーブルを削除する

リファレンステーブルを削除するには、テーブルを選択し、右上の歯車アイコンをクリックし、 **Delete Table** をクリックします。
テーブルと関連するすべての行が削除されます。

リファレンステーブルを使用している Lookup Processor がある場合、ログエンリッチメントが停止します。エンリッチメントが停止するまで、最大で 10 分かかる場合があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/processors/#lookup-processor