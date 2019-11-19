---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/riak/README.md'
display_name: Riak
git_integration_title: riak
guid: e1ed642c-8a15-420c-954b-6fb894905956
integration_id: riak
integration_title: Riak
is_public: true
kind: integration
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

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Riak チェックは [Datadog Agent][3] パッケージに含まれています。Riak サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `riak.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル riak.yaml][6] を参照してください。

    ```yaml
    init_config:

    instances:
        - url: http://127.0.0.1:8098/stats # or whatever your stats endpoint is
    ```

2. [Agent を再起動][6]すると、Datadog への Riak メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. Riak のログの収集を開始するには、次の構成ブロックを `riak.d/conf.yaml` ファイルに追加します。

    ```
      logs:
        - type: file
          path: /var/log/riak/console.log
          source: riak
          service: <SERVICE_NAME>

        - type: file
          path: /var/log/riak/error.log
          source: riak
          service: <SERVICE_NAME>
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \d{4}\-\d{2}\-\d{2}

        - type: file
          path: /var/log/riak/crash.log
          source: riak
          service: <SERVICE_NAME>
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \d{4}\-\d{2}\-\d{2}
    ```

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `riak` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "riak" >}}


### イベント
Riak チェックには、イベントは含まれません。

### サービスのチェック

**riak.can_connect**:<br>
Agent が Riak 統計エンドポイントに接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riak/images/riak_graph.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/riak/metadata.csv
[9]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}