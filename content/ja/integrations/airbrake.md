---
app_id: airbrake
app_uuid: 9628996b-82c1-4920-a0c5-c5f32dabd4cf
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - airbrake.exception_rate
      metadata_path: metadata.csv
      prefix: airbrake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Airbrake
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- event management
- issue tracking
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: airbrake
integration_id: airbrake
integration_title: Airbrake
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: airbrake
oauth: {}
public_title: Airbrake
short_description: イベントストリームで Airbrake の例外を表示、検索、議論。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Event Management
  - Category::問題の追跡
  configuration: README.md#Setup
  description: イベントストリームで Airbrake の例外を表示、検索、議論。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Airbrake
---

## 概要

Airbrake を Datadog に接続すると、以下のことができます。

- ストリームで例外をリアルタイムに確認できます。
- グラフで例外を検索できます。
- 例外についてチームで議論できます。

{{< img src="integrations/airbrake/airbrakeevent.png" alt="airbrake" popup="true">}}

## セットアップ

### 構成

Airbrake インテグレーションのセットアップには、Webhook を使用します。

1. Airbrake アカウントの Settings ページに移動します。

2. 有効にするプロジェクトごとに、"Integrations" をクリックします。

3. "WebHooks" をクリックして、"URL" フィールドに次の URL を入力します。

    ```text
    https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
    ```

4. "Save" をクリックします。

## 収集データ

新しいエラーが発生するたびに、[イベントストリーム][1]に表示されます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://docs.datadoghq.com/ja/events/
[2]: https://docs.datadoghq.com/ja/help/