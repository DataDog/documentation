---
aliases:
  - /ja/integrations/awscloudsearch/
categories:
  - cloud
  - processing
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: インデックスの使用率、正常に完了したリクエストの数などを追跡
doc_link: 'https://docs.datadoghq.com/integrations/awscloudsearch/'
git_integration_title: amazon_cloudsearch
has_logo: true
integration_title: Amazon CloudSearch
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_cloudsearch
public_title: Datadog-Amazon CloudSearch インテグレーション
short_description: インデックスの使用率、正常に完了したリクエストの数などを追跡
version: '1.0'
---
## 概要

Amazon CloudSearch は、AWS クラウドにおけるマネージド型サービスであり、検索ソリューションを容易かつコスト効率よくセットアップ、管理、スケーリングできます。

このインテグレーションを有効にすると、Datadog にすべての CloudSearch メトリクスを表示できます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### コンフィグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`CloudSearch` をオンにします。

2. [Datadog - AWS CloudSearch インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_cloudsearch" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS Cloudsearch インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS Cloudsearch インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudsearch
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudsearch/amazon_cloudsearch_metadata.csv
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}