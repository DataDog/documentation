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
  - 'https://github.com/DataDog/integrations-core/blob/master/pgbouncer/README.md'
display_name: PGBouncer
git_integration_title: pgbouncer
guid: 51386802-4502-4991-b592-27eff1ca111c
integration_id: pgbouncer
integration_title: PGBouncer
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: pgbouncer.
metric_to_check: pgbouncer.pools.sv_idle
name: pgbouncer
process_signatures:
  - pgbouncer
public_title: Datadog-PGBouncer インテグレーション
short_description: 接続プールメトリクスを追跡し、アプリケーションに出入りするトラフィックを監視 application.
support: コア
supported_os:
  - linux
  - mac_os
---
## 概要

PgBouncer チェックは、接続プールメトリクスを追跡し、アプリケーションに出入りするトラフィックの監視を可能にします。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

PgBouncer チェックは [Datadog Agent][2] パッケージに含まれています。PgBouncer ノードに追加でインストールする必要はありません。

### コンフィグレーション

[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `pgbouncer.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル pgbouncer.d/conf.yaml][4] を参照してください。

```
init_config:

instances:
  - host: localhost
    port: 15433
    username: <YOUR_USERNAME>
    password: <YOUR_PASSWORD>
    # tags:
    #   - env:prod

  # 注: インスタンスが `database_url` を使用して構成されている場合、`host`、`port`、`username`、および `password` は無視されます。
  - database_url: postgresql://<DB_USER>:<DB_PASS>@<DB_HOST>:<DB_PORT>/dbname?sslmode=require
    # tags:
    #   - role:main
```

**注**: `database_url` パラメーターの値は PgBouncer 統計データベースを指定する必要があります。

PgBouncer の userlist.txt ファイルで、以下を追加します。
```
"datadog" "<your_pass>"
```

次に、PgBouncer の pgbouncer.ini ファイルで以下を追加します。
```
stats_users = datadog
```

[Agent を再起動][5]すると、Datadog への PgBouncer メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. Pgbouncer のログの収集を開始するには、次の構成ブロックを `pgbouncer.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
        - type: file
          path: /var/log/postgresql/pgbouncer.log
          source: pgbouncer
          service: <SERVICE_NAME>
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル pgbouncer.d/conf.yaml][4] を参照してください。

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `pgbouncer` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "pgbouncer" >}}


**注**: PgBouncer のバージョンによっては、すべてのメトリクスを使用できないことがあります。

### イベント
PgBouncer チェックには、イベントは含まれません。

### サービスのチェック

**pgbouncer.can_connect**:<br>
Agent が PgBouncer に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/datadog_checks/pgbouncer/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}