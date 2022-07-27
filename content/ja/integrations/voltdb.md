---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    VoltDB - Overview: assets/dashboards/voltdb_overview.json
  logs:
    source: voltdb
  metrics_metadata: metadata.csv
  monitors:
    CPU load: assets/monitors/cpu_load.json
  saved_views:
    voltdb_processes: assets/saved_views/voltdb_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
- ログの収集
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/voltdb/README.md
display_name: VoltDB
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-voltdb-with-datadog/
  tag: ブログ
  text: Datadog を使用した VoltDB の監視
git_integration_title: voltdb
guid: 15abd7c6-1845-405a-8627-f83be1e48b11
integration_id: voltdb
integration_title: VoltDB
integration_version: 2.1.2
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: voltdb.
metric_to_check: voltdb.cpu.percent_used
name: voltdb
process_signatures:
- voltdb
public_title: VoltDB
short_description: ステータスやパフォーマンスなどのメトリクスを VoltDB クラスターから収集します。
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を通じて [VoltDB][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

**注**: このチェックは、クラスター当たり 1 つの Agent に構成される必要があります。複数ホストに及ぶクラスターを監視する場合は、各ホストに 1 つの Agent をインストールします。ただし、メトリクスが重複してしまうため、1 つ以上のホストで VoltDB インテグレーションを有効にしないでください。

### インストール

VoltDB チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

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

#### ログの収集

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

### サービスのチェック
{{< get-service-checks-from-git "voltdb" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://voltdb.com
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/voltdb/datadog_checks/voltdb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.voltdb.com/UsingVoltDB/SecuritySSL.php
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/voltdb/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/voltdb/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/