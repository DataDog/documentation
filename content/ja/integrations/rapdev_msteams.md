---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-msteams
app_uuid: 38da0072-43b5-44e8-a303-1e504bcc0879
assets:
  dashboards:
    MS Teams CQ Call Overview: assets/dashboards/ms_teams_cq_call_overview.json
    MS Teams CQ Lookup Metadata: assets/dashboards/ms_teams_cq_lookup_metadata.json
    MS Teams CQ Lookup Performance Classifiers: assets/dashboards/ms_teams_cq_lookup_performance_classifiers.json
    MS Teams CQ User Devices: assets/dashboards/ms_teams_cq_user_devices.json
    MS Teams CQ User Experience: assets/dashboards/ms_teams_cq_user_experience.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.msteams.call.duration
      metadata_path: metadata.csv
      prefix: rapdev.msteams.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10297
    source_type_name: RapDev MSTeams
  monitors:
    '[Microsoft Teams] Poor Call Session Audio Performance Qualifier A': assets/monitors/performance_audio_packet_utilization.json
    '[Microsoft Teams] Poor Call Session Audio Performance Qualifier B': assets/monitors/performance_audio_rtt.json
    '[Microsoft Teams] Poor Call Session Audio Performance Qualifier C': assets/monitors/performance_audio_packet_loss.json
    '[Microsoft Teams] Poor Call Session Audio Performance Qualifier D': assets/monitors/performance_audio_average_jitter.json
    '[Microsoft Teams] Poor Call Session Video Performance Qualifier A': assets/monitors/performance_video_frame_loss_percentage.json
    '[Microsoft Teams] Poor Call Session Video Performance Qualifier B': assets/monitors/performance_video_average_frame_rate.json
    '[Microsoft Teams] Poor Call Session Video Performance Qualifier C': assets/monitors/performance_video_fecplr.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- コラボレーション
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_msteams
integration_id: rapdev-msteams
integration_title: Microsoft Teams
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_msteams
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.msteams
  product_id: msteams
  short_description: 会議参加者 1 人あたりの単価
  tag: meeting_participant
  unit_label: 会議参加者
  unit_price: 0.1
public_title: Microsoft Teams
short_description: ユーザーとデバイスの Microsoft Teams 通話品質を監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: ユーザーとデバイスの Microsoft Teams 通話品質を監視する
  media:
  - caption: 通話品質概要
    image_url: images/1.png
    media_type: image
  - caption: 通話品質ユーザーエクスペリエンス概要
    image_url: images/2.png
    media_type: image
  - caption: 通話品質ユーザーエクスペリエンスネットワークとオーディオ
    image_url: images/3.png
    media_type: image
  - caption: 通話品質ユーザーエクスペリエンスオーディオとビデオ
    image_url: images/4.png
    media_type: image
  - caption: 通話品質ユーザーデバイス
    image_url: images/5.png
    media_type: image
  - caption: パフォーマンス修飾子ルックアップテーブル
    image_url: images/6.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Teams
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## 概要

RapDev Microsoft Teams インテグレーションは、通話品質レポートを監視し、通話アクティビティとエクスペリエンスに関する洞察を提供するメトリクス、モニター、ダッシュボードを提供します。

このインテグレーションには、以下のものが含まれます。
1. 複数のダッシュボード
2. 通話品質メトリクスに関する推奨モニター
3. 通話メタデータとパフォーマンス修飾子用のメトリクスルックアップテーブル

Microsoft Teams インテグレーションは、Active Directory テナントに最小限の権限しか必要とせず、インストールも簡単なため、組織は迅速に Microsoft Teams の通話品質レポートを展開し、レポーティングを開始することができます。

## Agent
サポートまたは機能リクエストについては、以下のチャンネルで RapDev.io までお問い合わせください。

 - メール: support@rapdev.io 
 - チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 電話: 855-857-0222 

---

ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*


---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-msteams" target="_blank">こちらをクリック</a>してください。