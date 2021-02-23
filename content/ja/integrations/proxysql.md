---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    ProxySQL Overview: assets/dashboards/overview.json
  logs:
    source: proxysql
  metrics_metadata: metadata.csv
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
draft: false
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

#### SSL の有効化
フル SSL/TLS 検証を使用して ProxySQL に接続するには、`conf.yaml` ファイルで `tls_verify` オプションを有効にします。SSL/TLS による接続に必要な証明書とパスワードを含めます。

```yaml
    tls_verify: true
    tls_ca_cert: ca_cert.pem
```

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. ProxySQL のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1] のルートにある `conf.d/` フォルダーの `proxysql.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル proxysql.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

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

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル proxysql.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/proxysql/datadog_checks/proxysql/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

#### メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<インテグレーション名>` | `proxysql`                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                              |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<ユーザー>", "password": "<パスワード>"}`       |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "proxysql", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `proxysql` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "proxysql" >}}


### サービスのチェック

**proxysql.can_connect**:<br>
Agent が ProxySQL に接続できない場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。このサービスチェックは `server` と `port` でタグ付けされます。

**proxysql.backend.status**:<br>
ProxySQL がバックエンドホストを SHUNNED または OFFLINE_HARD とみなす場合は `CRITICAL` を返します。バックエンドホストが `OFFLINE_SOFT` の場合は `WARNING` を返します。それ以外の場合は `OK` を返します。このサービスチェックは`hostgroup`、`srv_host`、`srv_port` でタグ付けされます。

### イベント

ProxySQL チェックにはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。


[1]: https://proxysql.com/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help