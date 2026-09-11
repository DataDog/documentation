---
app_id: edgecast-cdn
app_uuid: 2b575f7f-4575-4618-8ebd-f35f7d6a5d22
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: edgecast.request_count
      metadata_path: metadata.csv
      prefix: edgecast.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 619
    source_type_name: Edgecast
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- キャッシュ
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: edgecast_cdn
integration_id: edgecast-cdn
integration_title: Edgecast
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: edgecast_cdn
public_title: Edgecast
short_description: '[非推奨] Datadog メトリクスを使用した Edgecast CDN トラフィックの監視'
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Metrics
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: '[非推奨] Datadog メトリクスを使用した Edgecast CDN トラフィックの監視'
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: documentation
    url: https://docs.datadoghq.com/integrations/edgecast_cdn/
  support: README.md#Support
  title: Edgecast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

**_重要なお知らせ_**: Edgecast CDN インテグレーションは、Edgecast のサービス終了に伴い非推奨です。

Edgecast (EdgeCast Networks, Inc.) は破産に伴い事業を停止しました。
基盤となるサービスが終了したため、このインテグレーションは今後機能しません。
直ちに代替の CDN プロバイダーへの移行を強く推奨します。
一般的な代替案としては Cloudflare、Akamai、Fastly の CDN サービスなどがあります。タイルは 2025 年 7 月 7 日に削除されます。

## セットアップ

### 構成

## 収集データ

### メトリクス

### イベント

### サービスチェック

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/help