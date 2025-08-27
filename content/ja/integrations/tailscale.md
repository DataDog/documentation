---
app_id: tailscale
app_uuid: e3f4a5cf-3594-43fc-9d4e-4e86b9c91ea2
assets:
  dashboards:
    tailscale-overview: assets/dashboards/tailscale_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10420
    source_type_name: Tailscale
  monitors:
    High Physical Traffic Received by Destination: assets/monitors/physical_traffic_received.json
    High Virtual Traffic Received by Destination: assets/monitors/virtual_traffic_received.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- セキュリティ
- ログの収集
- ネットワーク
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tailscale/README.md
display_on_public_website: true
draft: false
git_integration_title: tailscale
integration_id: tailscale
integration_title: Tailscale
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tailscale
public_title: Tailscale
short_description: Datadog で Tailscale の監査ログとネットワーク フロー ログを表示します。
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
  - Category::Security
  - Category::Log Collection
  - Category::Network
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog で Tailscale の監査ログとネットワーク フロー ログを表示します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-tailscale-with-datadog/
  support: README.md#Support
  title: Tailscale
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Tailscale][1] は、ネットワーク接続を簡素化し安全にするピアツーピア VPN サービスです。

このインテグレーションでできること:

1. Tailscale のデータ保持期間を制御できます。
2. カスタムウィジェットやカスタムダッシュボードを構築できます。
3. スタック内の他サービスのデータと Tailscale のイベントを突合できます。

このインテグレーションは Tailscale から次の 2 種類のログをストリーミングします:

[構成監査ログ][2]:

構成監査ログにより、tailnet で「誰が・何を・いつ」行ったかを特定できます。これらのログは、アクションの種類、実行者、対象リソース、日時など、tailnet の構成を変更する操作を記録します。

[ネットワーク フロー ログ][3]:

Tailscale ネットワークでどのノードがいつどのノードと接続したかを示します。これらのネットワーク ログは、長期保存、セキュリティ分析、脅威検出、インシデント調査のためにエクスポートできます。

Tailscale のログを解析した後、Datadog は物理トラフィックと仮想トラフィックのセキュリティ関連イベントのインサイトを、既製の Tailscale Overview ダッシュボードに表示します。

## セットアップ

ログ ストリーミングを有効にするには:

1. Tailscale 管理コンソールにログインします
2. Logs タブに移動します
3. **Start streaming...** ボタンを選択します
4. メニューから Datadog を選択し、URL とトークンまたは [API キー][4] を追加します
5. **Start streaming** ボタンを選択します

## 収集データ

### メトリクス

Tailscale にメトリクスはありません。

### サービスチェック

Tailscale にサービスチェックはありません。

### イベント

Tailscale にイベントはありません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Tailscale プライベート ネットワークの状態を監視する][6]

[1]: https://tailscale.com/
[2]: https://tailscale.com/kb/1203/audit-logging/
[3]: https://tailscale.com/kb/1219/network-flow-logs/
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/monitor-tailscale-with-datadog/