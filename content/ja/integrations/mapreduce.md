---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    mapreduce: assets/dashboards/mapreduce_dashboard.json
  logs:
    source: mapreduce
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/mapreduce/README.md
display_name: MapReduce
draft: false
git_integration_title: mapreduce
guid: 1c143492-84ac-42d2-89d5-a45c718092b0
integration_id: mapreduce
integration_title: Map Reduce
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mapreduce.
metric_to_check: mapreduce.job.elapsed_time.max
name: mapreduce
public_title: Datadog-Map Reduce インテグレーション
short_description: マップのステータスと期間を監視し、タスクを削減。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![MapReduce ダッシュボード][1]

## 概要

mapreduce サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- mapreduce の状態を視覚化および監視できます。
- mapreduce のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Mapreduce チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. サーバーとポートを指定し、監視するマスターを設定するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `mapreduce.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル mapreduce.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `mapreduce`                                                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                 |
| `<インスタンスコンフィギュレーション>`  | `{"resourcemanager_uri": "https://%%host%%:8088", "cluster_name":"<MAPREDUCE_CLUSTER_NAME>"}` |

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. `mapreduce.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、 `type`、`path`、`service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル mapreduce.d/conf.yaml][2] を参照してください。

    ```yaml
    logs:
      - type: file
        path: <LOG_FILE_PATH>
        source: mapreduce
        service: <SERVICE_NAME>
        # To handle multi line that starts with yyyy-mm-dd use the following pattern
        # log_processing_rules:
        #   - type: multi_line
        #     pattern: \d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}
        #     name: new_log_start_with_date
    ```

3. [Agent を再起動します][3]。

Docker 環境でログを収集する Agent を構成する追加の情報に関しては、[Datadog ドキュメント][4]を参照してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `mapreduce` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mapreduce" >}}


### イベント

Mapreduce チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "mapreduce" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Hadoop アーキテクチャの概要][5]
- [Hadoop メトリクスの監視方法][6]
- [Hadoop メトリクスの収集方法][7]
- [Datadog を使用した Hadoop の監視方法][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mapreduce/images/mapreduce_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[6]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[7]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[8]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog