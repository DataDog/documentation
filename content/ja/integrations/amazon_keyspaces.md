---
categories:
- AWS
- クラウド
- 構成 & デプロイ
- ログの収集
dependencies: []
description: Amazon Keyspaces の主要なメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_keyspaces/
draft: false
git_integration_title: amazon_keyspaces
has_logo: true
integration_id: ''
integration_title: Amazon Keyspaces (Apache Cassandra 用)
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_keyspaces
public_title: Datadog-Amazon Keyspaces (Apache Cassandra 用) インテグレーション
short_description: Amazon Keyspaces の主要なメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Keyspaces (Apache Cassandra 用) は、スケーラブルで可用性の高い、マネージド型の Apache Cassandra 互換のデータベースサービスです。Amazon Keyspaces を使用すると、現在使用しているのと同じ Cassandra アプリケーションコードと開発者ツールを使用して、AWS 上で Cassandra ワークロードを実行することができます。

このインテグレーションを有効にすると、Datadog にすべての Keyspaces メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Cassandra` が有効になっていることを確認します。
2. [Datadog - Amazon Keyspaces (Apache Cassandra 用) インテグレーション][3]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_keyspaces" >}}


### ヘルプ

Amazon Keyspaces インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Keyspaces インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-keyspaces
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_keyspaces/amazon_certificate_manager_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/