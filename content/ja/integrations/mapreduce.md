---
app_id: mapreduce
app_uuid: 25ae6f45-147b-478c-9f0c-5013c3859796
assets:
  dashboards:
    mapreduce: assets/dashboards/mapreduce_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: mapreduce.job.elapsed_time.max
      metadata_path: metadata.csv
      prefix: mapreduce.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 133
    source_type_name: MapReduce
  logs:
    source: mapreduce
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mapreduce/README.md
display_on_public_website: true
draft: false
git_integration_title: mapreduce
integration_id: mapreduce
integration_title: Map Reduce
integration_version: 4.2.0
is_public: true
manifest_version: 2.0.0
name: mapreduce
public_title: Map Reduce
short_description: マップのステータスと期間を監視し、タスクを削減。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ログの収集
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: マップのステータスと期間を監視し、タスクを削減。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Map Reduce
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![MapReduce ダッシュボード][1]

## 概要

mapreduce サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- mapreduce の状態を視覚化および監視できます。
- mapreduce のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

### インフラストラクチャーリスト

Mapreduce チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

1. サーバーとポートを指定し、監視するマスターを設定するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `mapreduce.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル mapreduce.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

##### 収集データ

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

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `mapreduce`                                                                                   |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"resourcemanager_uri": "https://%%host%%:8088", "cluster_name":"<MAPREDUCE_CLUSTER_NAME>"}` |

##### 収集データ

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "mapreduce", "service": "<SERVICE_NAME>"}]'
```

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/docker/log/
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンド][3]を実行し、Checks セクションで `mapreduce` を検索します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "mapreduce" >}}


### ヘルプ

Mapreduce チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "mapreduce" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Hadoop アーキテクチャの概要][5]
- [Hadoop メトリクスの監視方法][6]
- [Hadoop メトリクスの収集方法][7]
- [Datadog を使用した Hadoop の監視方法][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mapreduce/images/mapreduce_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[6]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[7]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[8]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog