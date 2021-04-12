---
assets:
  dashboards:
    Nomad Overview: assets/dashboards/overview.json
  metrics_metadata: metadata.csv
  monitors:
    Nomad Excessive Leadership Losses: assets/monitors/nomad_excessive_leadership_losses.json
    Nomad Heartbeats Received: assets/monitors/nomad_heartbeats_received.json
    Nomad Job Is Failing: assets/monitors/nomad_job_is_failing.json
    Nomad No Jobs Running: assets/monitors/nomad_no_jobs_running.json
    Nomad Pending Jobs: assets/monitors/nomad_pending_jobs.json
  service_checks: assets/service_checks.json
categories:
  - provisioning
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/nomad/README.md'
display_name: Nomad
draft: false
git_integration_title: nomad
guid: 09fec09d-69ef-435f-bb0d-f586652b9bc7
integration_id: nomad
integration_title: Nomad
is_public: true
kind: インテグレーション
maintainer: irabinovitch
manifest_version: 1.0.0
metric_prefix: nomad
metric_to_check: nomad.client.host.cpu.user
name: nomad
public_title: Datadog-Nomad インテグレーション
short_description: アプリケーションをあらゆる規模で簡単にスケジュール、デプロイ
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
[!Nomad ダッシュボード][1]

## 概要

Nomad クラスターからメトリクスを収集して、以下のことができます。

- クラスターのパフォーマンスを視覚化および監視できます。
- クラスターの健全性と可用性に関するアラートを生成できます。

推奨されるモニターを使用して、さまざまな Nomad イベントに関する通知を受け取ることができます。

## セットアップ

### インストール

Nomad は、メトリクスを DogStatsD 経由で Datadog に送信します。Nomad インテグレーションを有効にするには、各クライアントおよびサーバーホストに [Datadog Agent をインストール][2]します。

### コンフィギュレーション

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "nomad" >}}


### イベント

Nomad チェックには、イベントは含まれません。

### サービスのチェック

Nomad チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nomad/images/dashboard_overview.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-extras/blob/master/nomad/metadata.csv
[4]: https://docs.datadoghq.com/ja/help/