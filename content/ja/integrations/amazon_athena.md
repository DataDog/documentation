---
categories:
  - cloud
  - aws
  - ログの収集
ddtype: crawler
dependencies: []
description: Amazon Athena のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_athena/'
draft: false
git_integration_title: amazon_athena
has_logo: true
integration_id: amazon-athena
integration_title: Amazon Athena
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_athena
public_title: Datadog-Amazon Athena インテグレーション
short_description: Amazon Athena のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon Athena は、標準 SQL を使用して Amazon Simple Storage Service (Amazon S3) でデータを直接、簡単に分析できるようにするインタラクティブなクエリサービスです。

このインテグレーションを有効にすると、Datadog にすべての Athena メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Athena` をオンにします。
2. [Datadog - Amazon Athena インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_athena" >}}


### イベント

Amazon Athena インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Athena インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-athena
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_athena/amazon_athena_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/