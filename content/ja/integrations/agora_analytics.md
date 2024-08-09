---
app_id: agora-analytics
app_uuid: a752523e-9c3d-458c-a91a-af0c9fae5adc
assets:
  dashboards:
    Agora Analytics Overview: assets/dashboards/agora_analytics_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - agora.rtc.app_id.online_user
      - agora.rtc.app_id.online_channel
      - agora.rtc.app_id.audio_freeze_rate
      - agora.rtc.app_id.video_freeze_rate
      - agora.rtc.app_id.network_delay_rate
      - agora.rtc.app_id.join_attempt
      - agora.rtc.app_id.join_success_count
      - agora.rtc.app_id.join_success_rate
      - agora.rtc.app_id.join_success_in_5s_rate
      metadata_path: metadata.csv
      prefix: agora.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10335
    source_type_name: Agora Analytics
author:
  homepage: https://www.agora.io
  name: Agora
  sales_email: sales-us@agora.io
  support_email: support@agora.io
categories:
- コラボレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/agora_analytics/README.md
display_on_public_website: true
draft: false
git_integration_title: agora_analytics
integration_id: agora-analytics
integration_title: Agora Analytics
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: agora_analytics
public_title: Agora Analytics
short_description: Datadog で Agora Analytics Collector のメトリクスを表示する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog で Agora Analytics Collector のメトリクスを表示する
  media:
  - caption: Agora Analytics の概要 - ダッシュボード
    image_url: images/agora_analytics_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Agora Analytics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Agora Analytics は、音声やビデオの使用状況、品質、パフォーマンスをリアルタイムに追跡し、解釈します。Analytics は、Agora の音声通話、ビデオ通話、インタラクティブライブストリーミングの拡張機能で、品質問題の特定、根本原因の特定、エンドユーザーエクスペリエンスを向上させるための問題解決に役立ちます。

このインテグレーションは、使用率、品質、パフォーマンスなどのメトリクスを Datadog アカウントに直接送信します。

## 計画と使用

Agora Analytics Datadog Connector の構成については、Agora Analytics インテグレーション[ドキュメント][1]を参照してください。

## リアルユーザーモニタリング

### データセキュリティ

Agora Analytics は Datadog にメトリクスを送信します。

### ヘルプ

Agora Analytics には、イベントは含まれません。

### ヘルプ

Agora Analytics には、サービスのチェック機能は含まれません。

## Agent

ヘルプが必要な場合は、[Agora サポート][2]までお問い合わせください。

[1]: https://docs.agora.io/en/agora-analytics/analyze/video-voice-sdk/datadog-integration
[2]: mailto:support@agora.io