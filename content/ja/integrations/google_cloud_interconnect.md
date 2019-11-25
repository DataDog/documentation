---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud Interconnect のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_interconnect/'
git_integration_title: google_cloud_interconnect
has_logo: true
integration_title: Google Cloud Interconnect
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_interconnect
public_title: Datadog-Google Cloud Interconnect インテグレーション
short_description: Google Cloud Interconnect のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud Interconnect は、高可用性かつ低レイテンシーの接続により、オンプレミスのネットワークを Google のネットワークに拡張します。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Interconnect からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_interconnect" >}}


### イベント
Google Cloud Interconnect インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Interconnect インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_interconnect/google_cloud_interconnect_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}