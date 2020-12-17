---
title: エンリッチメントテーブルを含むログにカスタムメタデータを追加する
kind: ガイド
beta: true
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: ログの処理方法について
  - link: /logs/processing/parsing/
    tag: Documentation
    text: パースの詳細
---
<div class="alert alert-warning">
エンリッチメントテーブル機能は現在非公開ベータ版です。詳細については、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>にお問い合わせください。
</div>

## 概要

情報のテーブルを含む CSV ファイルをアップロードして、顧客の詳細、サービス名と情報、IP アドレスなどの新しいエンティティを Datadog で定義します。これは、エンリッチメントテーブルのプライマリキーと関連するメタデータによって表されます。このデータは、[Lookup Processor][1] での取り込み時にログのタグとして適用できます。

{{< img src="logs/guide/enrichment-tables/overview.png" alt="エンリッチメントテーブル" style="width:100%;">}}

## エンリッチメントテーブルを作成する

{{< tabs >}}
{{% tab "手動アップロード" %}}

**New Enrichment Table +** をクリックしてから、CSV ファイルをアップロードし、適切な列に名前を付けて、ルックアップのプライマリキーを定義します。

{{< img src="logs/guide/enrichment-tables/configure-enrichment-table.png" alt="エンリッチメントテーブルを作成する" style="width:100%;">}}
{{% /tab %}}

{{% tab "AWS S3 アップロード" %}}

エンリッチメントテーブルは、AWS S3 バケットから CSV ファイルを自動的にプルして、データを最新の状態に保つことができます。インテグレーションでは、S3 で CSV ファイルへの変更が検索され、ファイルが更新されると、エンリッチメントテーブルが新しいデータに置き換えられます。これにより、初期エンリッチメントテーブルが構成されると、S3 API を使用した API 更新も可能になります。

S3 からエンリッチメントテーブルを更新するために、Datadog は [AWS インテグレーション][1]用に構成した AWS アカウントの IAM ロールを使用します。このロールをまだ作成していない場合は、[こちらの手順][2]で作成してください。このロールがエンリッチメントテーブルを更新できるようにするには、次のアクセス許可ステートメントを IAM ポリシーに追加します。バケット名は、環境に合わせて編集します。


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

**New Enrichment Table +** をクリックしてから、名前を追加し、AWS S3 を選択し、すべてのフィールドに入力し、インポートをクリックして、ルックアップのプライマリキーを定義します。

{{< img src="logs/guide/enrichment-tables/configure-s3-enrichment-table.png" alt="エンリッチメントテーブルを作成する" style="width:100%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=automaticcloudformation#installation
{{% /tab %}}
{{< /tabs >}}

このエンリッチメントテーブルを使用して、[Lookup Processor][1] でログに属性を追加できます。

## エンリッチメントテーブルを変更する

既存のエンリッチメントテーブルを新しいデータで変更するには、テーブルを選択してから右上隅にある **Update Data +** をクリックします。選択した CSV がテーブルにアップサートされます。つまり、同じプライマリキーを持つ既存のすべての行が更新され、すべての新しい行が追加されます。テーブルが保存されると、アップサートされた行は非同期で処理され、プレビューで更新されます。更新された行が影響を受けるログに表示されるまで、最大 10 分かかる場合があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/processors/?tab=ui#lookup-processor