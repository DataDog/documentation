---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud Router のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_router/'
git_integration_title: google_cloud_router
has_logo: true
integration_title: Google Cloud Router
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_router
public_title: Datadog-Google Cloud Router インテグレーション
short_description: Google Cloud Router のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud Router では、Border Gateway Protocol (BGP) を使用して、Virtual Private Cloud (VPC) とオンプレミスネットワークの間のルートを動的に交換できます。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Router からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_router" >}}


### イベント
Google Cloud Router インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Router インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_router/google_cloud_router_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}