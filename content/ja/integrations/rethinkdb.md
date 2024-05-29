---
app_id: rethinkdb
app_uuid: f8348717-0ba8-4d42-b856-983e0cde0314
assets:
  dashboards:
    RethinkDB Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rethinkdb.config.servers
      metadata_path: metadata.csv
      prefix: rethinkdb.
    process_signatures:
    - rethinkdb
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10092
    source_type_name: RethinkDB
  logs:
    source: rethinkdb
  saved_views:
    rethinkdb_processes: assets/saved_views/rethinkdb_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/rethinkdb/README.md
display_on_public_website: true
draft: false
git_integration_title: rethinkdb
integration_id: rethinkdb
integration_title: RethinkDB
integration_version: 3.1.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: rethinkdb
public_title: RethinkDB
short_description: ステータスやパフォーマンスなどのメトリクスを RethinkDB クラスターから収集します。
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
  description: ステータスやパフォーマンスなどのメトリクスを RethinkDB クラスターから収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: RethinkDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[RethinkDB][1] は分散型のドキュメント指向 NoSQL データベースです。リアルタイムな変更フィードに対してファーストクラスのサポートを提供します。

このチェックは Datadog Agent を使用して RethinkDB クラスターを監視し、パフォーマンス、データ可用性、クラスター コンフィギュレーションなどのメトリクスを収集します。

**注**: このインテグレーションには、RethinkDB **バージョン 2.3.6 以降**が必要です。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

RethinkDB チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

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

#### 収集データ


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

Kubernetes 環境のログを有効にするには、[Kubernetes ログ収集][9]を参照してください。

### 検証

[Agent のステータスサブコマンドを実行][10]し、Checks セクションで `rethinkdb` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "rethinkdb" >}}


### ヘルプ

RethinkDB には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "rethinkdb" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。


[1]: https://rethinkdb.com
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
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