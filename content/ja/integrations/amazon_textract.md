---
categories:
- 自動化
- AWS
- クラウド
- ログの収集
- ai/ml
dependencies: []
description: Amazon Textract の主要なメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_textract/
draft: false
git_integration_title: amazon_textract
has_logo: true
integration_id: ''
integration_title: Amazon Textract
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_textract
public_title: Datadog-Amazon Textract インテグレーション
short_description: Amazon Textract の主要なメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->

## 概要

Amazon Textract は、スキャンしたドキュメントからテキスト、手書き文字、データを自動的に抽出する機械学習サービスです。

このインテグレーションを有効にすると、すべての Amazon Textract メトリクスを Datadog に表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Textract` が有効になっていることを確認します。
2. [Datadog - Amazon Textract インテグレーション][3]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_textract" >}}


### ヘルプ

Amazon Textract インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Textract インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-textract
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_textract/amazon_textract_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/