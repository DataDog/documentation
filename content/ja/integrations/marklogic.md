---
app_id: marklogic
app_uuid: 92342b09-db9a-4542-b442-76bb9b7f716e
assets:
  dashboards:
    MarkLogic - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: marklogic.hosts.total_hosts
      metadata_path: metadata.csv
      prefix: marklogic.
    process_signatures:
    - MarkLogic
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10124
    source_type_name: MarkLogic
  logs:
    source: marklogic
  monitors:
    Marklogic high load: assets/monitors/marklogic_high_load.json
    Marklogic long requests: assets/monitors/marklogic_long_requests.json
    Marklogic low cache: assets/monitors/marklogic_low_cache.json
  saved_views:
    marklogic_processes: assets/saved_views/marklogic_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/marklogic/README.md
display_on_public_website: true
draft: false
git_integration_title: marklogic
integration_id: marklogic
integration_title: MarkLogic
integration_version: 4.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: marklogic
public_title: MarkLogic
short_description: MarkLogic のデータベース、 フォレスト、ホスト、サーバーに関するメトリクスを追跡します。
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
  description: MarkLogic のデータベース、 フォレスト、ホスト、サーバーに関するメトリクスを追跡します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: MarkLogic
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックでは、Datadog Agent を通じて [MarkLogic][1] を監視します。MarkLogic Server は、運用データおよび分析データのためのデータハブとして設計されたマルチモデルデータベースです。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

MarkLogic チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

#### MarkLogic の準備

API または Admin インターフェイスで、Datadog Agent に [`manage-user`][4] ロール権限が最小限のユーザーを作成します。
`enable_health_service_checks` コンフィギュレーションを使用する予定の場合は、Datadog MarkLogic ユーザーにu少なくとも [`manage-admin`][5] ロールを付与します。

##### ヘルプ

1. 特定の値でこのリクエストを調整し、Datadog ユーザーを作成します。
    ```shell
    curl -X POST --anyauth --user <ADMIN_USER>:<ADMIN_PASSWORD> -i -H "Content-Type: application/json" -d '{"user-name": "<USER>", "password": "<PASSWORD>", "roles": {"role": "manage-user"}}' http://<HOSTNAME>:8002/manage/v2/users
    ```
    適切な `<ADMIN_USER>` と `<ADMIN_PASSWORD>` を使用し、Datadog Agent で使用するユーザー名とパスワードを `<USER>` および `<PASSWORD>` に置き換えます。
   詳細は、MarkLogic のドキュメント [POST /manage/v2/users][6] を参照してください。

2. 作成したユーザーが必要なアクセス許可を持っているかを確認するには
    ```shell
    curl -X GET --anyauth --user <USER>:<PASSWORD> -i http://<HOSTNAME>:8002/manage/v2
    ```

##### Admin インターフェイス

1. 監理者アカウントで QConsole にログインします。デフォルトで、QConsole は `http://<HOSTNAME>:8000/qconsole` で使用可能です。

2. データベースに `Security`、クエリタイプに `XQuery` を選択します。

3. このクエリを実行し、Datadog Agent で使用するユーザーとパスワードを `<USER>` と `<PASSWORD>` に置き換えます。
    ```
    xquery version "1.0-ml";
    import module namespace sec="http://marklogic.com/xdmp/security" at 
        "/MarkLogic/security.xqy";

    sec:create-user(
        "<USER>",
        "Datadog Agent user",
        "<PASSWORD>",
        "manage-user",
        (xdmp:permission("security", "read")),
        ("http://marklogic.com/dev_modules"))

    ```
   詳細は、MarkLogic のドキュメント [sec:create-user][7] を参照してください。

4. 作成されたユーザーに十分な権限があることを確認するには、`<USER>` および `<PASSWORD>` を使用して `http://<HOSTNAME>:8002` (デフォルトポート) で認証します。

### ブラウザトラブルシューティング

#### メトリクスベース SLO

1. MarkLogic のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `marklogic.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル `marklogic.d/conf.yaml` ファイル][8]を参照してください。コンフィグファイルのユーザー関連の設定については、作成した Datadog Agent ユーザーを使用します。

2. [Agent を再起動します][9]。

#### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. MarkLogic のログの収集を開始するには、次の構成ブロックを `marklogic.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
       - type: file
         path: /var/opt/MarkLogic/Logs/ErrorLog.txt
         source: marklogic
       - type: file
         path: /var/opt/MarkLogic/Logs/80002_AccessLog.txt
         source: marklogic
   ```

    `path` の値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル  `marklogic.d/conf.yaml` ファイル][8]を参照してください。

3. [Agent を再起動します][9]。

### 検証

[Agent のステータスサブコマンドを実行][10]し、Checks セクションで `marklogic` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "marklogic" >}}


### ヘルプ

MarkLogic には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "marklogic" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。


[1]: https://www.marklogic.com
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_64197
[5]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_28243
[6]: https://docs.marklogic.com/REST/POST/manage/v2/users
[7]: https://docs.marklogic.com/sec:create-user
[8]: https://github.com/DataDog/integrations-core/blob/master/marklogic/datadog_checks/marklogic/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/marklogic/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/marklogic/assets/service_checks.json
[13]: https://docs.datadoghq.com/ja/help