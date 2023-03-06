---
app_id: twingate
app_uuid: c88bd253-18da-4224-af14-7854ce8ae6ed
assets:
  dashboards:
    Twingate Dashboard: assets/dashboards/twingate_overview.json
author:
  homepage: https://www.twingate.com/?utm_source=datadog&utm_medium=partner&utm_campaign=integrations
  name: Twingate
  sales_email: sales@twingate.com
  support_email: support@twingate.com
categories:
- ネットワーク
- セキュリティ
- クラウド
- AWS
- azure
- google cloud
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/twingate/README.md
display_on_public_website: true
draft: false
git_integration_title: twingate
integration_id: twingate
integration_title: Twingate
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: twingate
oauth: {}
public_title: Twingate
short_description: Twingate は、企業内 VPN に代わる最新のゼロトラストサービスを提供します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  - Category::Network
  - Category::Security
  - Category::Cloud
  - Category::AWS
  - Category::Azure
  - Category::Google Cloud
  configuration: README.md#Setup
  description: Twingate は、企業内 VPN に代わる最新のゼロトラストサービスを提供します。
  media:
  - caption: Twingate アクティビティログ
    image_url: images/twingate_activity_log.png
    media_type: image
  - caption: Twingate リアルタイムアクティビティダッシュボード
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Twingate
---



## 概要

[Twingate][1] は、急成長する企業が迅速かつ容易に AWS 環境への安全なアクセスを提供できる、ゼロトラストのネットワークアクセスプラットフォームです。NAT トラバーサル、QUIC、プライベートプロキシ、スプリットトンネリングなどの最新技術を組み込むことで、Twingate はユーザーパフォーマンスと全体的なセキュリティを向上しながら、従来の VPN やクラウド VPN を置き換えることができます。

このインテグレーションにより、企業はユーザーのリソースアクセスアクティビティをリアルタイムで監視することができます。

## セットアップ
### 前提条件
1. Twingate Connector サーバーに Datadog Agent がインストールされていること。そのホストに接続し、Agent と YAML インテグレーション構成を構成するためのファイルを編集できる必要があります。Datadog Agent をインストールするには、[Agent の概要][2]を参照してください。
2. Twingate Connector をデプロイする必要があります。リアルタイムの接続ログを有効にするには、[Twingate ドキュメント][3]を参照してください。

### Datadog Agent の構成
#### Systemd
1. [Datadog journald インテグレーション][4]を設定します。
2. `journald.d/conf.yaml` を以下の構成に置き換えます。
   ```
    logs:
      - type: journald
        container_mode: true
        include_units:
          - twingate-connector.service
        service: Twingate Connection
        source: Twingate
        log_processing_rules:
        - type: include_at_match
          name: analytics
          pattern: ANALYTICS
        - type: mask_sequences
          name: remove_analytics
          replace_placeholder: ""
          pattern: "ANALYTICS "
   ```
3. `usermod -a -G systemd-journal dd-agent` を使って `dd-agent` ユーザーを `systemd-journal` グループに追加します。
4. `service datadog-agent restart` を実行して、Datadog Agent を再起動します。
5. [ログエクスプローラー][5]に Twingate Analytic のログが表示されることを確認します。

### Twingate Analytics ダッシュボード
1. Datadog の[ダッシュボードリスト][6]に移動します。
2. Twingate Analytics ダッシュボードを検索します。

## トラブルシューティング
ご不明な点は、[Twingate のサポートチーム][7]までお問い合わせください。

[1]: https://www.twingate.com/
[2]: https://docs.datadoghq.com/ja/getting_started/agent/
[3]: https://docs.twingate.com/docs/connector-real-time-logs
[4]: https://docs.datadoghq.com/ja/agent/logs/?tab=journald
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/dashboard/lists
[7]: https://help.twingate.com/hc/en-us