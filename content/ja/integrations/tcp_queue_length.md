---
app_id: tcp-queue-length
app_uuid: 2c48a360-9fbb-4cd6-9316-0e9afd9926c8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: tcp_queue.read_buffer_max_usage_pct
      metadata_path: metadata.csv
      prefix: tcp_queue.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10295
    source_type_name: TCP Queue Length
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- developer tools
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/README.md
display_on_public_website: true
draft: false
git_integration_title: tcp_queue_length
integration_id: tcp-queue-length
integration_title: TCP Queue Length
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: tcp_queue_length
public_title: TCP Queue Length
short_description: Datadog で、TCP バッファのサイズを追跡します。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Datadog で、TCP バッファのサイズを追跡します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TCP Queue Length
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Linux TCP によるキューの送受信の使用方法を監視します。キューを送受信する TCP が個々のコンテナに対して満杯の状態であるかどうかを検知できます。

## 計画と使用

### インフラストラクチャーリスト

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

**注**: バージョン 8 以前の Windows および CentOS/RHEL はサポートされません。

### ブラウザトラブルシューティング

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

[Datadog Helm チャート][3]を使用して、`values.yaml` ファイルで `datadog.systemProbe.enabled` を `true` に設定し、`system-probe` がアクティベートされている必要があります。
次に、`datadog.systemProbe.enableTCPQueueLength` パラメーターを設定してチェックをアクティベートします。

### Operator (v1.0.0+) による構成

DatadogAgent マニフェストで `features.tcpQueueLength.enabled` パラメーターを設定します。
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    tcpQueueLength:
      enabled: true
```

**注**: COS (Container Optimized OS) を使用する場合は、ノード Agent で `src` ボリュームをオーバーライドしてください。
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    tcpQueueLength:
      enabled: true
  override:
    nodeAgent:
      volumes: 
      - emptyDir: {}
        name: src
```

### 検証

[Agent の `status` サブコマンドを実行][2]し、Checks セクションで `tcp_queue_length` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "tcp_queue_length" >}}


### ヘルプ

TCP Queue Length チェックには、サービスのチェック機能は含まれません。

### ヘルプ

TCP Queue Length チェックには、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/tcp_queue_length.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/helm-charts
[4]: https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/