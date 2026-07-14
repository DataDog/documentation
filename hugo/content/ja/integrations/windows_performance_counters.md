---
app_id: windows-performance-counters
app_uuid: ec86de4d-a080-4160-8b0a-b937bbea08e9
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10241
    source_type_name: Windows パフォーマンスカウンター
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- iot
- windows
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/README.md
display_on_public_website: true
draft: false
git_integration_title: windows_performance_counters
integration_id: windows-performance-counters
integration_title: Windows パフォーマンスカウンター
integration_version: 2.1.1
is_public: true
manifest_version: 2.0.0
name: windows_performance_counters
public_title: Windows パフォーマンスカウンター
short_description: Windows OS のパフォーマンスカウンターを監視します。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::IoT
  - カテゴリー::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Windows OS のパフォーマンスカウンターを監視します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/windows-performance-counters-datadog/
  support: README.md#Support
  title: Windows パフォーマンスカウンター
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Windows パフォーマンスカウンター][1]を監視します。

**注:** Agent バージョン 7.33.0 は最小サポートバージョンです。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Windows パフォーマンスカウンターチェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

1. windows_performance_counters のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `windows_performance_counters.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル windows_performance_counters.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `windows_performance_counters` を探します。

## 収集データ

### メトリクス

Windows パフォーマンスカウンターチェックにより収集されたすべてのメトリクスは、[カスタムメトリクス][7]として Datadog に送信できますが、これはお客様への[請求][8]に影響します。

### イベント

Windows パフォーマンスカウンターインテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "windows-performance-counters" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Windows パフォーマンスカウンターを監視する][11]

[1]: https://docs.microsoft.com/en-us/windows/win32/perfctrs/about-performance-counters
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/datadog_checks/windows_performance_counters/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[8]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/
[9]: https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/windows-performance-counters-datadog/