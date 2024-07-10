---
app_id: neoload
app_uuid: 3d16e6da-7ac2-47b4-95c0-0d221686f05a
assets:
  dashboards:
    NeoLoad Performance Testing: assets/dashboards/neoload_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: NeoLoad.Controller.User.Load
      metadata_path: metadata.csv
      prefix: NeoLoad.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10317
    source_type_name: neoload
  logs: {}
author:
  homepage: https://www.tricentis.com/products/performance-testing-neoload
  name: Tricentis
  sales_email: sales@tricentis.com
  support_email: support@tricentis.com
categories:
- notifications
- テスト
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neoload/README.md
display_on_public_website: true
draft: false
git_integration_title: neoload
integration_id: neoload
integration_title: NeoLoad
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: neoload
public_title: NeoLoad
short_description: NeoLoad によるパフォーマンステスト結果のモニタリングと分析
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Category::Testing
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: NeoLoad によるパフォーマンステストの結果のモニタリングと分析
  media:
  - caption: NeoLoad パフォーマンステストダッシュボード
    image_url: images/neoload-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NeoLoad
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Tricentis NeoLoad][1] は、プロトコルおよびブラウザベースの機能で、API やマイクロサービスのパフォーマンステストに加え、エンドツーエンドのアプリケーションテストの簡略化とスケーリングを実現します。

NeoLoad インテグレーションを使用すると、NeoLoad テストのパフォーマンスメトリクスを追跡して次のことができます。

- アプリケーションの性能と NeoLoad の負荷試験メトリクスを関連付けることができます。
- すぐに使えるダッシュボード [Metrics Explorer][2] を利用して、Datadog 内でスループット、エラー、パフォーマンスなどの NeoLoad メトリクスを分析し、可視化できます。

## 計画と使用

### ブラウザトラブルシューティング

NeoLoad の構成の詳細な手順については、[NeoLoad に関するドキュメント][3]に従ってください。NeoLoad バージョン 9.1 からは、NeoLoad 内にある Datadog Connector の **Push Counters** 構成で、どのメトリクスを送信するかを選択できるようになりました。

デフォルトの NeoLoad ダッシュボードをダッシュボードリストに追加するには、Datadog で NeoLoad インテグレーションをインストールします。


## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "neoload" >}}


### ヘルプ

NeoLoad のパフォーマンステストイベントは、すべて [Datadog イベントエクスプローラー][5]に送信されます。
NeoLoad は、テストの終了時と開始時に Datadog API  にイベントを送信します。
このオプションは、NeoLoad の Datadog Connector の **Push Counters** 構成で設定します。NeoLoad 9.1 から利用可能です。

## ヘルプ

ヘルプが必要ですか？[Datadog サポート][6]または [Tricentis NeoLoad サポート][7]にお問い合わせください。

[1]: https://www.tricentis.com/products/performance-testing-neoload
[2]: /ja/metrics/explorer
[3]: https://documentation.tricentis.com/neoload/latest/en/content/reference_guide/datadog.htm
[4]: https://github.com/DataDog/integrations-extras/blob/master/neoload/metadata.csv
[5]: https://docs.datadoghq.com/ja/events/
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://support-hub.tricentis.com/