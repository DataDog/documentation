---
app_id: voltdb
app_uuid: 4ea56824-28da-4beb-8937-c45ef32fdb7f
assets:
  dashboards:
    VoltDB - Overview: assets/dashboards/voltdb_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: voltdb.cpu.percent_used
      metadata_path: metadata.csv
      prefix: voltdb.
    process_signatures:
    - voltdb
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10149
    source_type_name: VoltDB
  monitors:
    CPU load: assets/monitors/cpu_load.json
  saved_views:
    voltdb_processes: assets/saved_views/voltdb_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/voltdb/README.md
display_on_public_website: true
draft: false
git_integration_title: voltdb
integration_id: voltdb
integration_title: VoltDB
integration_version: 3.2.1
is_public: true
manifest_version: 2.0.0
name: voltdb
public_title: VoltDB
short_description: Collect status, performance and other metrics from a VoltDB cluster.
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
  configuration: README.md#Setup
  description: Collect status, performance and other metrics from a VoltDB cluster.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: VoltDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [VoltDB][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

**注**: このチェックは、クラスター当たり 1 つの Agent に構成される必要があります。複数ホストに及ぶクラスターを監視する場合は、各ホストに 1 つの Agent をインストールします。ただし、メトリクスが重複してしまうため、1 つ以上のホストで VoltDB インテグレーションを有効にしないでください。

### インストール

VoltDB チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

1. VoltDB `deployment.xml` ファイルを編集し、`datadog-agent` ユーザーを追加します。**注**: 特別なロールは必要ないため、組み込みの `user` ロールを割り当てます。

    ```xml
    <users>
        <!-- ... -->
        <user name="datadog-agent" password="<PASSWORD>" roles="user" />
    </users>
    ```

2. VoltDB のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `voltdb.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル voltdb.d/conf.yaml][4] を参照してください。

    ```yaml
    init_config:

    instances:
      - url: http://localhost:8080
        username: datadog-agent
        password: "<PASSWORD>"
    ```

3. [Agent を再起動します][5]。

#### TLS サポート

[TLS/SSL][6] がクライアントの HTTP ポートで有効になっている場合:

1. CA 証明書ファイルを PEM フォーマットでエクスポートします。

    ```bash
    keytool -exportcert -file /path/to/voltdb-ca.pem -keystore <KEYSTORE> -storepass <PASSWORD> -alias voltdb -rfc
    ```

1. 証明書を PEM フォーマットでエクスポート:

    ```bash
    openssl pkcs12 -nodes -in <KEYSTORE> -out /path/to/voltdb.pem -password pass:<PASSWORD>
    ```

    結果のファイルには、_暗号化されていない_ 秘密キーと証明書が含まれています。

    ```
    -----BEGIN PRIVATE KEY-----
    <Private key contents...>
    -----END PRIVATE KEY-----
    -----BEGIN CERTIFICATE-----
    <Certificate contents...>
    -----END CERTIFICATE-----
    ```

2. インスタンスのコンフィギュレーションで、`url` を TLS が有効になっているクライアントのエンドポイントに指定し、`tls_cert` および `tls_ca_cert` のオプションを設定します。例:

    ```yaml
    instances:
    - # ...
      url: https://localhost:8443
      tls_cert: /path/to/voltdb.pem
      tls_ca_cert: /path/to/voltdb-ca.pem
    ```

3. [Agent を再起動します][5]。

#### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. VoltDB のログの収集を開始するには、次の構成ブロックを `voltdb.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
      - type: file
        path: /var/log/voltdb.log
        source: voltdb
    ```

  `path` の値を環境に合わせて変更します。使用可能なすべてのコンフィギュレーションオプションについては、[`voltdb.d/conf.yaml` ファイルのサンプル][4]を参照してください。

  3. [Agent を再起動します][5]。

  Kubernetes 環境のログを有効にするには、[Kubernetes ログ収集][7]を参照してください。

### 検証

[Agent のステータスサブコマンドを実行][8]し、Checks セクションで `voltdb` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "voltdb" >}}


### イベント

このチェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "voltdb" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://voltdb.com
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/voltdb/datadog_checks/voltdb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.voltdb.com/UsingVoltDB/SecuritySSL.php
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/voltdb/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/voltdb/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/