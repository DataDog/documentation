---
app_id: emqx
app_uuid: fa40ec7e-e8f6-4c4b-a675-31716b23a9df
assets:
  dashboards:
    EMQX Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - emqx.cluster.nodes_running
      metadata_path: metadata.csv
      prefix: emqx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6726047
    source_type_name: emqx
author:
  homepage: https://www.emqx.com/en
  name: EMQX
  sales_email: contact@emqx.io
  support_email: contact@emqx.io
categories:
- モニター
- iot
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/emqx/README.md
display_on_public_website: true
draft: false
git_integration_title: emqx
integration_id: emqx
integration_title: EMQX
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: emqx
public_title: EMQX
short_description: MQTT ブローカーのパフォーマンス指標、ヘルス関連データ、メッセージ スループット、メッセージ レイテンシなどを収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Category::IoT
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: MQTT ブローカーのパフォーマンス指標、ヘルス関連データ、メッセージ スループット、メッセージ レイテンシなどを収集します。
  media:
  - caption: Datadog ダッシュボードの EMQX ブローカーメトリクス (1)
    image_url: images/emqx-overview-1.png
    media_type: image
  - caption: Datadog ダッシュボードの EMQX ブローカーメトリクス (2)
    image_url: images/emqx-overview-2.png
    media_type: image
  - caption: Datadog ダッシュボードの EMQX ブローカーメトリクス (3)
    image_url: images/emqx-overview-3.png
    media_type: image
  - caption: Datadog ダッシュボードの EMQX ブローカーメトリクス (4)
    image_url: images/emqx-overview-4.png
    media_type: image
  - caption: Datadog ダッシュボードの EMQX ブローカーメトリクス (5)
    image_url: images/emqx-overview-5.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: EMQX
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[EMQX][1] は IoT (モノのインターネット) 向けに設計された高い拡張性を備えるオープンソースの MQTT ブローカーです。MQTT は Message Queuing Telemetry Transport の略で、デバイス間でメッセージを転送する軽量なパブリッシュ・サブスクライブ型ネットワークプロトコルです。

**EMQX の主な特徴:**
- 拡張性: EMQX は数百万もの同時接続を処理でき、大量のデバイスを扱う IoT アプリケーションに適しています。
- 信頼性: デバイスとサーバー間のデータが確実に転送されるよう、安定かつ信頼性の高いメッセージ配信を提供します。
- 低レイテンシ: 低レイテンシが求められるシナリオに適した設計です。
- 高スループット: 大量のメッセージを効率的に処理できます。
- クラスタリング: 分散クラスターでのデプロイが可能で、パフォーマンスと信頼性を高めます。


Datadog と EMQX を連携させることで監視能力が拡張され、MQTT ブローカーのパフォーマンスや稼働状況に関する貴重なインサイトが得られます。これは効率的かつ信頼性が高く、リアルタイムのデータ転送が重要となる IoT アプリケーションで特に有用です。

**Datadog に送信されるデータの種類:**
- メトリクス: メッセージスループット (1秒あたりの送受信メッセージ数) 、接続クライアント数などのパフォーマンス指標を含みます。

- ノードのパフォーマンス: クラスター内の各ノードのパフォーマンス監視 (レイテンシ、負荷、稼働状況など)。

- 運用健全性: MQTT ブローカーのヘルス状態に関するデータ (エラーレートなどの重要指標を含む)。


## セットアップ

### インストール

EMQX チェックを手動でインストールする場合 ([使用環境によって手順が変わる可能性があります][2]):

`datadog-agent integration install -t datadog-emqx==1.1.0` を実行します。

### 構成

1. Agent の設定ディレクトリ (`conf.d/`フォルダ) のルートにある `emqx/conf.yaml` ファイルを編集し、EMQX のパフォーマンスデータ収集を開始します。

2. [Agent を再起動します][3]。

### 検証

[Agent のステータスサブコマンド][4]を実行し、Checks セクションに `emqx` が表示されることを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "emqx" >}}


### イベント

EMQX ではイベントは送信されません。

## トラブルシューティング

サポートが必要な場合は [EMQX サポート][7]へお問い合わせください。

[1]: https://github.com/emqx/emqx
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-extras/blob/master/emqx/metadata.csv
[6]: https://github.com/DataDog/integrations-extras/blob/master/emqx/assets/service_checks.json
[7]: https://www.emqx.com/en/support