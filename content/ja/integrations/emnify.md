---
app_id: emnify
app_uuid: 000307b4-8304-424a-8378-daf9a41b4d93
assets:
  dashboards:
    EMnify Dashboard: assets/dashboards/emnify_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: emnify.endpoint.volume
      metadata_path: metadata.csv
      prefix: emnify.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10304
    source_type_name: EMnify
  monitors:
    Daily Traffic Forecast: assets/monitors/emnify_data_usage_forecast.json
    High Incoming Traffic: assets/monitors/emnify_data_usage_high_rx.json
    High Outgoing Traffic: assets/monitors/emnify_data_usage_high_tx.json
    Traffic Transmition Stopped: assets/monitors/emnify_data_usage_host_stopped.json
author:
  homepage: https://emnify.com
  name: EMnify
  sales_email: sales@emnify.com
  support_email: mail@emnify.com
categories:
- iot
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/emnify/README.md
display_on_public_website: true
draft: false
git_integration_title: emnify
integration_id: emnify
integration_title: EMnify
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: emnify
public_title: EMnify
short_description: EMnify データ使用量メトリクスのモニターとダッシュボード
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::IoT
  - Category::Metrics
  configuration: README.md#Setup
  description: EMnify データ使用量メトリクスのモニターとダッシュボード
  media:
  - caption: オールインワンのダッシュボードにより、組織の消費量を観測し、デバイスインベントリの使用パターンを分析することができます。
    image_url: images/data_usage_dashboard.png
    media_type: image
  - caption: デバイスのデータ交換が予期せず停止した場合を監視します。
    image_url: images/datastop_monitor.png
    media_type: image
  - caption: データ消費量を予測し、予測を上回った場合に通知します。
    image_url: images/above_forecast_monitor.png
    media_type: image
  - caption: デバイスのデータ受信量が通常より多い場合に通知されます。
    image_url: images/high_data_monitor.png
    media_type: image
  - caption: デバイスのデータ転送量が通常より多い場合に通知されます。
    image_url: images/high_transmission_monitor.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: EMnify
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要
[EMnify][1] は、デバイスを接続したまま安全に保つ、セルラー IoT 接続プラットフォームです。

Datadog-EMnify インテグレーションを使用して、IoT EMnify デバイスからメトリクスとデータ使用量を収集します。

## 計画と使用
[EMnify インテグレーションガイド][2]に従って、**インテグレーションの手順**と**インテグレーションの検証**のセクションを使用して、使用量データのストリーミングを構成してください。

### ログ管理

使用パターンは人によって異なるため、モニターに特定のケースを反映させるには、作業量に応じた境界線と感度を定義する必要があります。
詳細については、[予測値モニター][3]と[異常モニター][4]のドキュメントをお読みください。

### ダッシュボード  

[ダッシュボード][5]で時間帯を選択し、表示されるデータにフィルターをかけることができます。

## Agent

ご不明な点は、[EMnify サポート][6]までお問い合わせください。

[1]: https://www.emnify.com/
[2]: https://www.emnify.com/integration-guides/emnify-datastreamer-integration-for-datadog
[3]: https://docs.datadoghq.com/ja/monitors/create/types/forecasts/?tab=linear
[4]: https://docs.datadoghq.com/ja/monitors/create/types/anomaly/
[5]: https://app.datadoghq.com/dashboard/lists?q=emnify
[6]: https://support.emnify.com/hc/en-us