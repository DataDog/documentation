---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- network
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vns3/README.md
display_name: VNS3
draft: false
git_integration_title: vns3
guid: 1a7a2c46-37a8-4660-8d71-aaad733d987a
integration_id: vns3
integration_title: VNS3
integration_version: ''
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: vns3.
metric_to_check: vns3.peering
name: vns3
public_title: VNS3
short_description: アプリケーションの接続とセキュリティのためのクラウドネットワークアプライアンス。
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

VNS3 トポロジーの IPSec エンドポイント/トンネル、VNS3 ピア、オーバーレイクライアントに関する状態情報を取得します。

- ピアリングリンクのステータスチェック

  ![ピアリング][1]

- オーバーレイクライアントのステータスチェック

  ![クライアント][2]

- IPSec トンネルのステータスチェック

  ![IPSec][3]

## セットアップ

### コンフィギュレーション

メトリクスを取得するには、Cohesive Networks の Datadog コンテナをデプロイし、VNS3 ファイアウォールを設定し、コンテナを構成します。詳細は、[Cohesive Networks のガイド][4]または[ビデオ][5]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "vns3" >}}


### イベント

VNS3 チェックには、イベントは含まれません。

### サービスのチェック

VNS3 チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/peering.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/clients.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/ipsec.png
[4]: https://docs.cohesive.net/docs/network-edge-plugins/datadog/
[5]: https://youtu.be/sTCgCG3m4vk
[6]: https://github.com/DataDog/integrations-extras/blob/master/vns3/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/