---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - ネットワーク
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/README.md'
display_name: TCP Queue Length
draft: false
git_integration_title: tcp_queue_length
guid: 0468b098-43bd-4157-8a01-14065cfdcb7b
integration_id: tcp-queue-length
integration_title: TCP Queue Length
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tcp_queue.
metric_to_check: tcp_queue.read_buffer_max_usage_pct
name: tcp_queue_length
public_title: Datadog-TCP Queue Length インテグレーション
short_description: Datadog で、TCP バッファのサイズを追跡します。
support: コア
supported_os:
  - linux
---
## 概要

このチェックは、Linux TCP によるキューの送受信の使用方法を監視し、キューを送受信する TCP が個々のコンテナに対して満杯の状態であるかどうかを検知します。

## セットアップ

### インストール

`tcp_queue_length` はコア Agent 6/7 のチェックで、`system-probe` に実装された eBPF パートに依存します。Agent バージョン 7.24.1/6.24.1 以上が必要です。

`system-probe` により使用される eBPF プログラムはランタイムでコンパイルされ、適切なカーネルヘッダーへのアクセスを必要とします。

Debian 系のディストリビューションでは、以下のようにカーネルヘッダーをインストールします。
```sh
apt install -y linux-headers-$(uname -r)
```

RHEL 系のディストリビューションでは、以下のようにカーネルヘッダーをインストールします。
```sh
yum install -y kernel-headers-$(uname -r)
yum install -y kernel-devel-$(uname -r)
```

**注**: CentOS/RHEL バージョン < 8 はサポートされていません。

### コンフィギュレーション

`tcp_queue_length` インテグレーションを有効にするには、`system-probe` とコアエージェントの両方でコンフィギュレーションオプションを有効化する必要があります。

`system-probe.yaml` コンフィギュレーションファイル内で、以下のパラメーターを必ず設定してください。
```yaml
system_probe_config:
  enable_tcp_queue_length: true
```

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `tcp_queue_length.d/conf.yaml` ファイルを編集して、
   tcp_queue_length パフォーマンスデータの収集を開始します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル tcp_queue_length.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。


### Helm のインテグレーション

[Datadog Helm チャート][3]を使用して、`values.yaml` ファイルで `datadog.systemProbe.enabled` を `true` に設定し、`system-probe` がアクティベートされていることを確認する必要があります。
次に、`datadog.systemProbe.enableTCPQueueLength` パラメーターを設定してチェックをアクティベートします。

### 検証

[Agent の `status` サブコマンドを実行][2]し、Checks セクションで `tcp_queue_length` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "tcp_queue_length" >}}


### サービスのチェック

TCP Queue Length チェックには、サービスのチェック機能は含まれません。

### イベント

TCP Queue Length チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/tcp_queue_length.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/helm/charts/tree/master/stable/datadog
[4]: https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/