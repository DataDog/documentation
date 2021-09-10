---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Aerospike Overview: assets/dashboards/overview.json
  logs:
    source: aerospike
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/aerospike/README.md
display_name: Aerospike
draft: false
git_integration_title: aerospike
guid: 582de9e7-0c99-4037-9cc5-bc34612ce039
integration_id: aerospike
integration_title: Aerospike
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aerospike.
metric_to_check: aerospike.uptime
name: aerospike
public_title: Datadog-Aerospike インテグレーション
short_description: Aerospike データベースからクラスターやネームスペースの統計を収集
support: コア
supported_os:
  - linux
---
## 概要

Aerospike データベースからメトリクスをリアルタイムに取得すると、以下のことができます。

- Aerospike の状態を視覚化および監視できます。
- Aerospike のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Aerospike チェックは Datadog Agent パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

##### メトリクスの収集
ホストで実行中の Agent に対してこのチェックを構成するには:

1. aerospike のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `aerospike.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル aerospike.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

##### ログの収集


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

    `path` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル aerospike.d/conf.yaml][1] を参照してください。

3. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}


#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<インテグレーション名>` | `aerospike`                          |
| `<初期コンフィギュレーション>`      | 空白または `{}`                        |
| `<インスタンスコンフィギュレーション>`  | `{"host":"%%host%%", "port":"3000"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "aerospike", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][1]し、Checks セクションの `aerospike` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "aerospike" >}}


### サービスのチェック

**aerospike.can_connect**
**aerospike.cluster_up**

### イベント

Aerospike には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。


[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[2]: https://docs.datadoghq.com/ja/help/