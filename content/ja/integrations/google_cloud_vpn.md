---
categories:
  - cloud
  - network
  - google cloud
ddtype: クローラー
dependencies: []
description: VPN トンネルのステータス、スループット、セッション数などを監視
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_vpn/'
git_integration_title: google_cloud_vpn
has_logo: true
integration_title: Google VPN
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_vpn
public_title: Datadog-Google VPN インテグレーション
short_description: VPN トンネルのステータス、スループット、セッション数などを監視
version: '1.0'
---
## 概要
Google Cloud VPN は、既存のネットワークを Google Cloud Platform ネットワークに安全に接続します。

Google VPN からメトリクスを取得して、以下のことができます。

* VPN のパフォーマンスを視覚化できます。
* VPN のパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_vpn" >}}


### イベント
Google Cloud VPN インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud VPN インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_vpn/google_cloud_vpn_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}