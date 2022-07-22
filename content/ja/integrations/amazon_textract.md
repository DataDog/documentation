---
categories:
- クラウド
- AWS
- ログの収集
dependencies: []
description: Amazon Textract の主要なメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_textract/
draft: false
git_integration_title: amazon_textract
has_logo: true
integration_id: amazon-textract
integration_title: Amazon Textract
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_textract
public_title: Datadog-Amazon Textract インテグレーション
short_description: Amazon Textract の主要なメトリクスを追跡します。
version: '1.0'
---


## 概要

Amazon Textract は、スキャンしたドキュメントからテキスト、手書き文字、データを自動的に抽出する機械学習サービスです。

このインテグレーションを有効にすると、すべての Amazon Textract メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]で、メトリクスコレクションの下にある `Textract` にチェックが入っていることを
   確認します。
2. [Datadog - Amazon Textract インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_textract" >}}


### イベント

Amazon Textract インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Textract インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-textract
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_textract/amazon_textract_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/