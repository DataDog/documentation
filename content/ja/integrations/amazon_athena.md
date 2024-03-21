---
categories:
- cloud
- aws
- ログの収集
dependencies: []
description: Amazon Athena のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_athena/
draft: false
git_integration_title: amazon_athena
has_logo: true
integration_id: ''
integration_title: Amazon Athena
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_athena
public_title: Datadog-Amazon Athena インテグレーション
short_description: Amazon Athena のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Athena は、標準 SQL を使用して Amazon Simple Storage Service (Amazon S3) でデータを直接、簡単に分析できるようにするインタラクティブなクエリサービスです。

このインテグレーションを有効にすると、Datadog にすべての Athena メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Athena` が有効になっていることを確認します。
2. [Datadog - Amazon Athena インテグレーション][3]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_athena" >}}


### ヘルプ

Amazon Athena インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Athena インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-athena
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_athena/amazon_athena_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/