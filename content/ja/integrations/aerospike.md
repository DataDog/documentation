---
app_id: aerospike
app_uuid: 68799442-b764-489c-8bbd-44cb11a15f4e
assets:
  dashboards:
    Aerospike Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - aerospike.uptime
      - aerospike.namespace.memory_free_pct
      metadata_path: metadata.csv
      prefix: aerospike.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10067
    source_type_name: Aerospike
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/aerospike/README.md
display_on_public_website: true
draft: false
git_integration_title: aerospike
integration_id: aerospike
integration_title: Aerospike
integration_version: 2.2.1
is_public: true
manifest_version: 2.0.0
name: aerospike
public_title: Aerospike
short_description: Aerospike データベースからクラスターやネームスペースの統計を収集
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Data Stores
  - Category::ログの収集
  configuration: README.md#Setup
  description: Aerospike データベースからクラスターやネームスペースの統計を収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Aerospike
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Aerospike データベースからメトリクスをリアルタイムに取得すると、以下のことができます。

- Aerospike の状態を視覚化および監視できます。
- Aerospike のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

注: 現在の Aerospike インテグレーションは、Aerospike サーバー v4.9 以上のみで互換性があります。詳細は、Aerospike の [Python クライアントライブラリリリースノート][1]を参照してください。
これ以前のバージョンの Aerospike サーバーを使用している場合は、Datadog Agent のバージョン 7.29.0 以下を使用して監視することができます。

### インストール

Aerospike チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

##### メトリクスの収集
ホストで実行中の Agent に対してこのチェックを構成するには

1. [Aerospike Prometheus Exporter][1] のインストールと構成を行います。詳細は [Aerospike のドキュメント][2]を参照してください。

2. Aerospike のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `aerospike.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル aerospike.d/conf.yaml][3] を参照してください。

3. [Agent を再起動します][4]。

**注**: このチェックのバージョン 1.16.0+ では、メトリクスの収集に [OpenMetrics][5] を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、[コンフィグ例][6]を参照してください。

##### ログ収集


1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Aerospike のログ収集を開始するには、このコンフィギュレーションブロックを `aerospike.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/aerospike/aerospike.log
       source: aerospike
   ```

    `path` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル aerospike.d/conf.yaml][3] を参照してください。

3. [Agent を再起動します][4]。

[1]: https://github.com/aerospike/aerospike-prometheus-exporter
[2]: https://docs.aerospike.com/monitorstack/new/installing-components
[3]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[6]: https://github.com/DataDog/integrations-core/blob/7.36.x/aerospike/datadog_checks/aerospike/data/conf.yaml.example
{{% /tab %}}
{{% tab "コンテナ化" %}}


#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `aerospike`                          |
| `<INIT_CONFIG>`      | 空白または `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:9145/metrics"}` |

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "aerospike", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションの `aerospike` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "aerospike" >}}


### サービスチェック

**aerospike.can_connect**
**aerospike.cluster_up**

### イベント

Aerospike には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://download.aerospike.com/download/client/python/notes.html#5.0.0
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/