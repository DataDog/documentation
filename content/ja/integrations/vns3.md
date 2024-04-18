---
app_id: vns3
app_uuid: f6ffc9ae-a65d-41e4-8abd-c7194fc39a9a
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: vns3.peering
      metadata_path: metadata.csv
      prefix: vns3.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: VNS3
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Cohesive Networks
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- network
- security
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vns3/README.md
display_on_public_website: true
draft: false
git_integration_title: vns3
integration_id: vns3
integration_title: VNS3
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: vns3
public_title: VNS3
short_description: アプリケーションの接続とセキュリティのためのクラウドネットワークアプライアンス。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::クラウド
  - Category::ネットワーク
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: アプリケーションの接続とセキュリティのためのクラウドネットワークアプライアンス。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: VNS3
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