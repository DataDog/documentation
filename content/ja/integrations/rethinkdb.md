---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    RethinkDB Overview: assets/dashboards/overview.json
  logs:
    source: rethinkdb
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    rethinkdb_processes: assets/saved_views/rethinkdb_processes.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/rethinkdb/README.md'
display_name: RethinkDB
draft: false
git_integration_title: rethinkdb
guid: a09f3ed3-c947-413c-a9c6-0dcb641ea890
integration_id: rethinkdb
integration_title: RethinkDB
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: rethinkdb.
metric_to_check: rethinkdb.config.servers
name: rethinkdb
process_signatures:
  - rethinkdb
public_title: Datadog-RethinkDB インテグレーション
short_description: ステータスやパフォーマンスなどのメトリクスを RethinkDB クラスターから収集します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[RethinkDB][1] は分散型のドキュメント指向 NoSQL データベースです。リアルタイムな変更フィードに対してファーストクラスのサポートを提供します。

このチェックは Datadog Agent を使用して RethinkDB クラスターを監視し、パフォーマンス、データ可用性、クラスター コンフィギュレーションなどのメトリクスを収集します。

**注**: このインテグレーションには、RethinkDB **バージョン 2.3.6 以降**が必要です。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

RethinkDB チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. RethinkDB 2.4 以降を使用する場合は、`rethinkdb` データベースに対して読み取り専用のアクセス許可を持つ `datadog-agent` ユーザーを追加してください。
以下の ReQL コマンドを使用できます。詳しくは、[アクセス許可とユーザーアカウント][4]を
参照してください。

    ```python
    r.db('rethinkdb').table('users').insert({'id': 'datadog-agent', 'password': '<PASSWORD>'})
    r.db('rethinkdb').grant('datadog-agent', {'read': True})
    ```

    **注**: RethinkDB 2.3.x の場合、`rethinkdb` データベースに対するアクセス許可の付与はサポートされていません。
   この手順をスキップし、下記の[管理者アカウント][5]を使用してください。

2. [Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `rethinkdb.d/conf.yaml` ファイルを編集します。
使用可能なすべてのコンフィギュレーションオプションについては、[rethinkdb.d/conf.yaml のサンプル][7]を
参照してください。

    ```yaml
    init_config:

    instances:
      - host: localhost
        port: 28015
        user: "<USER>"
        password: "<PASSWORD>"
    ```

3. [Agent を再起動します][8]。

**注**: このインテグレーションはクラスター内のすべてのサーバーからメトリクスを収集します。したがって、Agent は 1 つしか必要ありません。

#### ログの収集


1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. RethinkDB ログの収集を開始するには、次のコンフィギュレーションブロックを `rethinkdb.d/conf.yaml` ファイルで編集します。

    ```yaml
    logs:
      - type: file
        path: "<LOG_FILE_PATH>"
        source: rethinkdb
        service: "<SERVICE_NAME>"
    ```


    `path` パラメーターの値を環境に合わせて変更します。使用可能なすべてのコンフィギュレーションオプションについては、[conf.yaml のサンプル][7]を参照してください。

3. [Agent を再起動します][8]。

Kubernetes 環境でログを収集する Agent を構成する追加の情報に関しては、[Datadog ドキュメント][9]を参照してください。

### 検証

[Agent のステータスサブコマンドを実行][10]し、Checks セクションで `rethinkdb` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "rethinkdb" >}}


### イベント

RethinkDB には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "rethinkdb" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。


[1]: https://rethinkdb.com
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://rethinkdb.com/docs/permissions-and-accounts/
[5]: https://rethinkdb.com/docs/security/#the-admin-account
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/datadog_checks/rethinkdb/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/assets/service_checks.json
[13]: https://docs.datadoghq.com/ja/help/