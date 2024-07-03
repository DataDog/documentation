---
app_id: yarn
app_uuid: 427f8f08-00a1-455a-a0e5-9b2ec7ffb0a5
assets:
  dashboards:
    hadoop: assets/dashboards/hadoop_dashboard.json
    yarn: assets/dashboards/yarn_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: yarn.metrics.total_mb
      metadata_path: metadata.csv
      prefix: yarn.
    process_signatures:
    - java org.apache.hadoop.yarn.server.resourcemanager.ResourceManager
    - java org.apache.hadoop.yarn.server.nodemanager.NodeManager
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 134
    source_type_name: Yarn
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/yarn/README.md
display_on_public_website: true
draft: false
git_integration_title: yarn
integration_id: yarn
integration_title: Yarn
integration_version: 5.3.1
is_public: true
manifest_version: 2.0.0
name: yarn
public_title: Yarn
short_description: クラスター全体の健全性メトリクスを収集し、アプリケーションの進捗状況を追跡。
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
  description: クラスター全体の健全性メトリクスを収集し、アプリケーションの進捗状況を追跡。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Yarn
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Hadoop Yarn][1]

## 概要

このチェックは、YARN ResourceManager からメトリクスを収集します。以下は、メトリクスの一例です。

- クラスター全体のメトリクス (実行中のアプリ、実行中のコンテナ、異常なノードの数など)
- アプリケーションごとのメトリクス (アプリの進捗状況、経過した実行時間、実行中のコンテナ数、メモリ使用量など)
- ノードメトリクス (使用可能な vCores、最新の健全性更新時間など)

### 非推奨のお知らせ

`yarn.apps` メトリクスは `GAUGE` ではなく `RATE` として誤って報告されるため、`yarn.apps.<メトリクス>` メトリクスは非推奨になりました。`yarn.apps.<メトリクス>_gauge` メトリクスを使用してください。

## セットアップ

### インストール

YARN チェックは [Datadog Agent][2] パッケージに含まれています。YARN ResourceManager に追加でインストールする必要はありません。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. [Agent の構成ディレクトリ][1]のルートにある `conf.d/` フォルダーの `yarn.d/conf.yaml` ファイルを編集します。

   ```yaml
   init_config:

   instances:
     ## @param resourcemanager_uri - string - required
     ## The YARN check retrieves metrics from YARNS's ResourceManager. This
     ## check must be run from the Master Node and the ResourceManager URI must
     ## be specified below. The ResourceManager URI is composed of the
     ## ResourceManager's hostname and port.
     ## The ResourceManager hostname can be found in the yarn-site.xml conf file
     ## under the property yarn.resourcemanager.address
     ##
     ## The ResourceManager port can be found in the yarn-site.xml conf file under
     ## the property yarn.resourcemanager.webapp.address
     #
     - resourcemanager_uri: http://localhost:8088

       ## @param cluster_name - string - required - default: default_cluster
       ## A friendly name for the cluster.
       #
       cluster_name: default_cluster
   ```

    すべてのチェックオプションの一覧と説明については、[チェックコンフィギュレーションの例][2]を参照してください。

2. [Agent を再起動][3]すると、Datadog への YARN メトリクスの送信が開始されます。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `yarn`                                                                                  |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                           |
| `<INSTANCE_CONFIG>`  | `{"resourcemanager_uri": "http://%%host%%:%%port%%", "cluster_name": "<クラスター名>"}` |

##### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. `yarn.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、 `type`、`path`、`service` パラメーターの値を変更してください。使用可能なすべての構成オプションの詳細については、[サンプル yarn.d/conf.yaml][2] を参照してください。

    ```yaml
    logs:
      - type: file
        path: <LOG_FILE_PATH>
        source: yarn
        service: <SERVICE_NAME>
        # To handle multi line that starts with yyyy-mm-dd use the following pattern
        # log_processing_rules:
        #   - type: multi_line
        #     pattern: \d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}
        #     name: new_log_start_with_date
    ```

3. [Agent を再起動します][3]。

Docker 環境のログを有効にするには、[Docker ログ収集][4]を参照してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンド][3]を実行し、Checks セクションで `yarn` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "yarn" >}}


### イベント

Yarn チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "yarn" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Hadoop アーキテクチャの概要][5]
- [Hadoop メトリクスの監視方法][6]
- [Hadoop メトリクスの収集方法][7]
- [Datadog を使用した Hadoop の監視方法][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/yarn/images/yarn_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[6]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[7]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[8]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog