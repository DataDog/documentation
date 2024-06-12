---
app_id: nomad
app_uuid: 245bf496-4185-4407-a0fd-d6ef6fc125bb
assets:
  dashboards:
    Nomad Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: nomad.client.host.cpu.user
      metadata_path: metadata.csv
      prefix: nomad
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10002
    source_type_name: Nomad
  monitors:
    Nomad Excessive Leadership Losses: assets/monitors/nomad_excessive_leadership_losses.json
    Nomad Heartbeats Received: assets/monitors/nomad_heartbeats_received.json
    Nomad Job Is Failing: assets/monitors/nomad_job_is_failing.json
    Nomad No Jobs Running: assets/monitors/nomad_no_jobs_running.json
    Nomad Pending Jobs: assets/monitors/nomad_pending_jobs.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Nomad
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nomad/README.md
display_on_public_website: true
draft: false
git_integration_title: nomad
integration_id: nomad
integration_title: Nomad
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: nomad
public_title: Nomad
short_description: アプリケーションをあらゆる規模で簡単にスケジュール、デプロイ
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::構成 & デプロイ
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: アプリケーションをあらゆる規模で簡単にスケジュール、デプロイ
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nomad
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


![Nomad ダッシュボード][1]

## 概要

Nomad クラスターからメトリクスを収集して、以下のことができます。

- クラスターのパフォーマンスを視覚化および監視できます。
- クラスターの健全性と可用性に関するアラートを生成できます。

推奨されるモニターを使用して、さまざまな Nomad イベントに関する通知を受け取ることができます。

## 計画と使用

### インフラストラクチャーリスト

Nomad は、メトリクスを DogStatsD を通じて Datadog に送信します。Nomad インテグレーションを有効にするには、各クライアントおよびサーバーホストに [Datadog Agent をインストール][2]します。

### ブラウザトラブルシューティング

Datadog Agent がインストールされたら、クライアントとサーバーの Nomad 構成に Telemetry スタンザを追加します。

```conf
telemetry {
  publish_allocation_metrics = true
  publish_node_metrics       = true
  datadog_address = "localhost:8125"
  disable_hostname = true
  collection_interval = "10s"
}
```

次に、各ホストで Nomad エージェントをリロードまたは再起動します。これで、Nomad のメトリクスが Datadog アカウントに収集されるようになります。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "nomad" >}}


### ヘルプ

Nomad チェックには、イベントは含まれません。

### ヘルプ

Nomad チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nomad/images/dashboard_overview.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-extras/blob/master/nomad/metadata.csv
[4]: https://docs.datadoghq.com/ja/help/