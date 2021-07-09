---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    overview: assets/dashboards/one-screen-overview.json
  logs:
    service: tidb
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - ログの収集
  - autodiscovery
  - cloud
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/tidb/README.md'
display_name: TiDB
draft: false
git_integration_title: tidb
guid: 4b34acac-39ce-4ec4-9329-c68cc4e61279
integration_id: tidb
integration_title: TiDB
is_public: true
kind: インテグレーション
maintainer: xuyifan02@pingcap.com
manifest_version: 1.0.0
metric_prefix: tidb_cluster
metric_to_check: tidb_cluster.tidb.server_connections
name: tidb
public_title: TiDB
short_description: TiDB クラスター用インテグレーション
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[TiDB][1] クラスターを Datadog に接続すると、以下のことができます。

- クラスターの主要な TiDB メトリクスを収集する。
- TiDB/TiKV/TiFlash ログやスロークエリログなど、クラスターのログを収集する。
- 提供されたダッシュボードでクラスターのパフォーマンスを視覚化する。

> **注:** 
>
> - このインテグレーションには TiDB 4.0 以降が必要です。
> - 現在、TiDB Cloud と Datadog のインテグレーションは利用できません。

## セットアップ

### インストール

まず、[Datadog Agent をダウンロードして起動][2]します。

次に、TiDB チェックを手動でインストールします。[指示は環境によって異なります][3]。

> 現在の TiDB インテグレーションバージョン: `1.0.0`

#### ホスト

`datadog-agent integration install -t datadog-tidb==<INTEGRATION_VERSION>` を実行します。

#### コンテナ化

Docker Agent とのこのインテグレーションを使用する最良の方法は、このインテグレーションがインストールされた Agent をビルドすることです。次の Dockerfile を使用して、Agent の更新バージョンをビルドします。

```dockerfile
FROM gcr.io/datadoghq/agent:latest

ARG INTEGRATION_VERSION=1.0.0

RUN agent integration install -r -t datadog-tidb==${INTEGRATION_VERSION}
```

イメージをビルドし、プライベート Docker レジストリにプッシュします。

次に、Datadog Agent コンテナイメージをアップグレードします。Helm チャートを使用する場合は、`values.yaml` の `agents.image` セクションを変更して、デフォルトの Agent イメージを置き換えます。

```yaml
agents:
  enabled: true
  image:
    tag: <NEW_TAG>
    repository: <YOUR_PRIVATE_REPOSITORY>/<AGENT_NAME>
```

新しい `values.yaml` を使用して Agent をアップグレードします。

```shell
helm upgrade -f values.yaml <RELEASE_NAME> datadog/datadog
```

### コンフィギュレーション

#### ホスト

##### メトリクスの収集

1. TiDB のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `tidb.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル tidb.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. TiDB のログの収集を開始するには、次の構成ブロックを `tidb.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
      # pd log
      - type: file
        path: "/tidb-deploy/pd-2379/log/pd*.log"
        service: "tidb-cluster"
        source: "pd"

      # tikv log
      - type: file
        path: "/tidb-deploy/tikv-20160/log/tikv*.log"
        service: "tidb-cluster"
        source: "tikv"

      # tidb log
      - type: file
        path: "/tidb-deploy/tidb-4000/log/tidb*.log"
        service: "tidb-cluster"
        source: "tidb"
        exclude_paths:
          - /tidb-deploy/tidb-4000/log/tidb_slow_query.log
      - type: file
        path: "/tidb-deploy/tidb-4000/log/tidb_slow_query*.log"
        service: "tidb-cluster"
        source: "tidb"
        log_processing_rules:
          - type: multi_line
            name: new_log_start_with_datetime
            pattern: '#\sTime:'
        tags:
          - "custom_format:tidb_slow_query"

      # tiflash log
      - type: file
        path: "/tidb-deploy/tiflash-9000/log/tiflash*.log"
        service: "tidb-cluster"
        source: "tiflash"
   ```

   クラスターのコンフィギュレーションに従って、`path` と `service` を変更します。

   次のコマンドを使用して、すべてのログパスを表示します。

   ```shell
   # show deploying directories
   tiup cluster display <YOUR_CLUSTER_NAME>
   # find specific logging file path by command arguments
   ps -fwwp <TIDB_PROCESS_PID/PD_PROCESS_PID/etc.>
   ```

3. [Agent を再起動します][5]。

#### コンテナ化

##### メトリクスの収集

コンテナ化された環境の場合、TiDB チェックが Datadog Agent イメージに統合された後、オートディスカバリーがデフォルトで構成されます。

したがって、メトリクスは Datadog のサーバーに自動的に収集されます。

デフォルトのオートディスカバリー動作をオーバーライドする必要がある場合は、Datadog アノテーションを TiDB ポッドに追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/tidb.check_names: '["tidb"]'
    ad.datadoghq.com/tidb.init_configs: '[{}]'
    ad.datadoghq.com/tidb.instances: '[{"pd_metric_url": "http://%%host%%:2379/metrics", "tidb_metric_url": "http://%%host%%:10080/metrics", "tikv_metric_url": "http://%%host%%:20180/metrics"}]'
    # (...)
spec:
  containers:
    - name: 'tidb'
# (...)
```

完全なガイダンスについては、[オートディスカバリーインテグレーションテンプレート][6]を参照してください。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent では、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][7]を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "tidb", "service": "tidb_cluster"}` |

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `tidb` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "tidb" >}}


### サービスのチェック

TiDB チェックには、サービスのチェック機能は含まれません。

### イベント

TiDB チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.pingcap.com/tidb/stable
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://github.com/DataDog/integrations-extras/blob/master/tidb/datadog_checks/tidb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/tidb/metadata.csv
[10]: https://docs.datadoghq.com/ja/help/