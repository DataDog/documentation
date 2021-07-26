---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    riak: assets/dashboards/riak_dashboard.json
  logs:
    source: riak
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/riak/README.md'
display_name: Riak
draft: false
git_integration_title: riak
guid: e1ed642c-8a15-420c-954b-6fb894905956
integration_id: riak
integration_title: Riak
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: riak.
metric_to_check: riak.memory_processes
name: riak
public_title: Datadog-Riak インテグレーション
short_description: RiakKV または RiakTS について、ノード、vnode、およびリングのパフォーマンスメトリクスを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Riak Graph][1]

## 概要

このチェックを使用して、RiakKV または RiakTS から取得されるノード、vnode、およびリングのパフォーマンスメトリクスを追跡します。

## セットアップ

### インストール

Riak チェックは [Datadog Agent][2] パッケージに含まれています。Riak サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `riak.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル riak.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Riak stats url to connect to.
     #
     - url: http://127.0.0.1:8098/stats
   ```

2. [Agent を再起動][3]すると、Datadog への Riak メトリクスの送信が開始されます。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Riak のログの収集を開始するには、次の構成ブロックを `riak.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
       - type: file
         path: /var/log/riak/console.log
         source: riak
         service: "<SERVICE_NAME>"

       - type: file
         path: /var/log/riak/error.log
         source: riak
         service: "<SERVICE_NAME>"
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}

       - type: file
         path: /var/log/riak/crash.log
         source: riak
         service: "<SERVICE_NAME>"
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}
   ```

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                  |
| -------------------- | -------------------------------------- |
| `<インテグレーション名>` | `riak`                                 |
| `<初期コンフィギュレーション>`      | 空白または `{}`                          |
| `<インスタンスコンフィギュレーション>`  | `{"url":"http://%%host%%:8098/stats"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "riak", "service": "riak", "log_processing_rules": {"type": "multi_line", "name": "new_log_Start_with_date", "pattern": "\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `riak` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "riak" >}}


### イベント

Riak チェックには、イベントは含まれません。

### サービスのチェック

**riak.can_connect**:<br>
Agent が Riak 統計エンドポイントに接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riak/images/riak_graph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/