---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Ambari base dashboard: assets/dashboards/base_dashboard.json
  logs:
    source: ambari
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - 処理
  - ログの収集
  - オートディスカバリー
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ambari/README.md'
display_name: Ambari
git_integration_title: ambari
guid: 4f518f2c-cfa7-4763-ac33-b1c8846eb738
integration_id: ambari
integration_title: Ambari
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ambari.
metric_to_check: ambari.cpu.cpu_user
name: ambari
public_title: Datadog-Ambari インテグレーション
short_description: Ambari で管理されているすべてのクラスターのメトリクスをホストまたはサービス別に取得
support: コア
supported_os:
  - linux
  - mac_os
---
## 概要

このチェックは、Datadog Agent を通じて [Ambari][1] を監視します。

## セットアップ

### インストール

Ambari チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

##### メトリクスの収集

1. Ambari のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `ambari.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル ambari.d/conf.yaml][3] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL of the Ambari Server, include http:// or https://
     #
     - url: localhost
   ```

2. [Agent を再起動します][4]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. 下部にある `logs` 行のコメントを解除して、`ambari.d/conf.yaml` を編集します。ログの `path` を Ambari ログファイルの正しいパスで更新してください。

    ```yaml
      logs:
        - type: file
          path: /var/log/ambari-server/ambari-alerts.log
          source: ambari
          service: ambari
          log_processing_rules:
              - type: multi_line
                name: new_log_start_with_date
                # 2019-04-22 15:47:00,999
                pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
      ...
    ```

3. [Agent を再起動します][4]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][5]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                        |
| -------------------- | ---------------------------- |
| `<インテグレーション名>` | `ambari`                     |
| `<初期コンフィギュレーション>`      | 空白または `{}`                |
| `<インスタンスコンフィギュレーション>`  | `{"url": "http://%%host%%"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][6]を参照してください。

| パラメーター      | 値                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ambari", "service": "<サービス名>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date","pattern":"\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"}}` |

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `ambari` を探します。

## 収集データ

このインテグレーションは、以下のシステムメトリクスをすべてのクラスター内のホストごとに収集します。

- boottime
- cpu
- disk
- memory
- load
- ネットワーク
- process

`collect_service_metrics` を使用してサービスメトリクスの収集が有効にされている場合、このインテグレーションは、ホワイトリストされたサービスコンポーネントごとに、ホワイトリスト内のヘッダーを持つメトリクスを収集します。

### メトリクス
{{< get-metrics-from-git "ambari" >}}


### サービスのチェック

**ambari.can_connect**:<br>
クラスターが到達可能な場合は、`OK` を返します。それ以外の場合は、`CRITICAL` を返します。

**ambari.state**:<br>
サービスがインストール済みか実行中の場合は `OK`、サービスが停止しようとしているかアンインストール中の場合は `WARNING`、
サービスがアンインストール済みか停止した場合は `CRITICAL` を返します。

### イベント

Ambari には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://ambari.apache.org
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://github.com/DataDog/integrations-core/blob/master/ambari/datadog_checks/ambari/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/ambari/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/