---
app_id: proxysql
app_uuid: aadfa11b-3de5-4827-9cdd-888c4e9587d0
assets:
  dashboards:
    ProxySQL Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: proxysql.active_transactions
      metadata_path: metadata.csv
      prefix: proxysql.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10096
    source_type_name: ProxySQL
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
- caching
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/proxysql/README.md
display_on_public_website: true
draft: false
git_integration_title: proxysql
integration_id: proxysql
integration_title: ProxySQL
integration_version: 5.1.1
is_public: true
manifest_version: 2.0.0
name: proxysql
public_title: ProxySQL
short_description: Collect your ProxySQL metrics and logs.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Log Collection
  - Category::Caching
  configuration: README.md#Setup
  description: Collect your ProxySQL metrics and logs.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ProxySQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [ProxySQL][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

ProxySQL インテグレーションは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

#### SSL の有効化
フル SSL/TLS 検証を使用して ProxySQL に接続するには、`conf.yaml` ファイルで `tls_verify` オプションを有効にします。SSL/TLS による接続に必要な証明書とパスワードを含めます。

```yaml
    tls_verify: true
    tls_ca_cert: ca_cert.pem
```

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. ProxySQL のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1] のルートにある `conf.d/` フォルダーの `proxysql.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル proxysql.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

##### ログ収集

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
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

#### メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `proxysql`                                                   |
| `<INIT_CONFIG>`      | 空白または `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<ユーザー>", "password": "<パスワード>"}`       |

##### ログ収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

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


### イベント

ProxySQL チェックにはイベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "proxysql" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。



[1]: https://proxysql.com/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help