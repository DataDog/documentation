---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - provisioning
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/nomad/README.md'
display_name: Nomad
git_integration_title: nomad
guid: 09fec09d-69ef-435f-bb0d-f586652b9bc7
integration_id: nomad
integration_title: Nomad
is_public: true
kind: integration
maintainer: irabinovitch
manifest_version: 1.0.0
metric_prefix: nomad
metric_to_check: nomad.client.host.cpu.user
name: nomad
public_title: Datadog-Nomad インテグレーション
short_description: アプリケーションをあらゆる規模で簡単にスケジュールおよびデプロイ
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Nomad クラスターからメトリクスを収集して、以下のことができます。

* クラスターのパフォーマンスを視覚化および監視できます。
* クラスターの健全性と可用性に関するアラートを生成できます。

## セットアップ

### インストール

Nomad は、メトリクスを DogStatsD 経由で Datadog に送信します。Nomad インテグレーションを有効にするには、各クライアントおよびサーバーホストに [Datadog Agent をインストール][1]します。

### コンフィグレーション

Datadog Agent がインストールされたら、クライアントとサーバーの Nomad 構成に Telemetry スタンザを追加します。

```
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
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras/blob/master/nomad/metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}