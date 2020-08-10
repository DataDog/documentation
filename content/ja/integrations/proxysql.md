---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    ProxySQL Overview: assets/dashboards/overview.json
  logs:
    source: proxysql
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - ログの収集
  - キャッシュ
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/proxysql/README.md'
display_name: ProxySQL
git_integration_title: proxysql
guid: 8d759c9d-eb9e-4c78-9f26-1c2c844233a5
integration_id: proxysql
integration_title: ProxySQL
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: proxysql.
metric_to_check: proxysql.active_transactions
name: proxysql
public_title: Datadog-ProxySQL インテグレーション
short_description: ProxySQLメトリクスとログを収集。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [ProxySQL][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

ProxySQL インテグレーションは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### ホスト

1. ProxySQL のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][4] のルートにある `conf.d/` フォルダーの `proxysql.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル proxysql.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. ProxySQL のログの収集を開始するには、該当のログファイルを `proxysql.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
         # Default logging file
       - type: file
         path: /var/log/proxysql.log
         source: proxysql
         service: "<SERVICE_NAME>"
         # Logged queries, file needs to be in JSON
         # https://github.com/sysown/proxysql/wiki/Query-Logging
       - type: file
         path: "<QUERY_LOGGING_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
         # Audit log
         # https://github.com/sysown/proxysql/wiki/Audit-log
       - type: file
         path: "<AUDIT_LOG_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル proxysql.d/conf.yaml][5] を参照してください。

3. [Agent を再起動します][6]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

#### メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<インテグレーション名>` | `proxysql`                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                              |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<ユーザー>", "password": "<パスワード>"}`       |

##### ログの収集

Datadog Agent では、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][7]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "proxysql", "service": "<サービス名>"}` |


### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `proxysql` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "proxysql" >}}


### サービスのチェック

`proxysql.can_connect`: Agent が ProxySQL に接続できない場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。このサービスチェックは `server` と `port` でタグ付けされます。

`proxysql.backend.status`: ProxySQL がバックエンドホストを SHUNNED または OFFLINE_HARD とみなす場合は `CRITICAL` を返します。バックエンドホストが `OFFLINE_SOFT` の場合は `WARNING` を返します。それ以外の場合は `OK` を返します。このサービスチェックは`hostgroup`、`srv_host`、`srv_port` でタグ付けされます。

### イベント

ProxySQL チェックにはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://proxysql.com/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/proxysql/datadog_checks/proxysql/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/proxysql/metadata.csv
[10]: https://docs.datadoghq.com/ja/help