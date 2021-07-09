---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    hadoop: assets/dashboards/hadoop_dashboard.json
    yarn: assets/dashboards/yarn_dashboard.json
  logs:
    source: yarn
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
  - 'https://github.com/DataDog/integrations-core/blob/master/yarn/README.md'
display_name: Yarn
draft: false
git_integration_title: yarn
guid: 3223c2e3-29dd-4cfb-82a2-51b951c648eb
integration_id: yarn
integration_title: Yarn
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: yarn.
metric_to_check: yarn.metrics.total_mb
name: yarn
public_title: Datadog-Yarn インテグレーション
short_description: クラスター全体の健全性メトリクスを収集し、アプリケーションの進捗状況を追跡。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
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

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

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
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `yarn`                                                                                  |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                           |
| `<インスタンスコンフィギュレーション>`  | `{"resourcemanager_uri": "http://%%host%%:%%port%%", "cluster_name": "<クラスター名>"}` |

##### ログの収集

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

Docker 環境でログを収集する Agent を構成する追加の情報に関しては、[Datadog ドキュメント][4]を参照してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: 
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `yarn` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "yarn" >}}


### イベント

Yarn チェックには、イベントは含まれません。

### サービスのチェック

**yarn.can_connect**:<br>
Agent が ResourceManager URI に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**yarn.application.status**:<br>
[`conf.yaml`][4] ファイルで指定されたマッピングに応じて、アプリケーションのステータスごとに返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

- [Hadoop アーキテクチャの概要][6]
- [Hadoop メトリクスの監視方法][7]
- [Hadoop メトリクスの収集方法][8]
- [Datadog を使用した Hadoop の監視方法][9]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/yarn/images/yarn_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[7]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[8]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[9]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog