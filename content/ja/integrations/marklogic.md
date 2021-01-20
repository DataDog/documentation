---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    MarkLogic - Overview: assets/dashboards/overview.json
  logs:
    source: marklogic
  metrics_metadata: metadata.csv
  monitors:
    Marklogic high load: assets/recommended_monitors/marklogic_high_load.json
    Marklogic long requests: assets/recommended_monitors/marklogic_long_requests.json
    Marklogic low cache: assets/recommended_monitors/marklogic_low_cache.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/marklogic/README.md'
display_name: MarkLogic
draft: false
git_integration_title: marklogic
guid: 0c200415-731f-4b67-9b2c-d6bd1225eee1
integration_id: marklogic
integration_title: MarkLogic
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: marklogic.
metric_to_check: marklogic.hosts.total_hosts
name: marklogic
process_signatures:
  - MarkLogic
public_title: Datadog-MarkLogic インテグレーション
short_description: MarkLogic のデータベース、 フォレスト、ホスト、サーバーに関するメトリクスを追跡します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックでは、Datadog Agent を通じて [MarkLogic][1] を監視します。MarkLogic Server は、運用データおよび分析データのためのデータハブとして設計されたマルチモデルデータベースです。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

MarkLogic チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

#### MarkLogic の準備

API または Admin インターフェイスで、Datadog Agent に [`manage-user`][3] ロール権限が最小限のユーザーを作成します。
`enable_health_service_checks` コンフィギュレーションを使用する予定の場合は、Datadog MarkLogic ユーザーにu少なくとも [`manage-admin`][4] ロールを付与します。

##### API の使用

1. 特定の値でこのリクエストを調整し、Datadog ユーザーを作成します。
    ```shell
    curl -X POST --anyauth --user <ADMIN_USER>:<ADMIN_PASSWORD> -i -H "Content-Type: application/json" -d '{"user-name": "<USER>", "password": "<PASSWORD>", "roles": {"role": "manage-user"}}' http://<HOSTNAME>:8002/manage/v2/users
    ```
    適切な `<ADMIN_USER>` と `<ADMIN_PASSWORD>` を使用し、Datadog Agent で使用するユーザー名とパスワードを `<USER>` および `<PASSWORD>` に置き換えます。
    エンドポイントの詳細については、[MarkLogic に関するドキュメント][5]を参照してください。

2. 作成したユーザーが必要なアクセス許可を持っているかを確認するには
    ```shell
    curl -X GET --anyauth --user <USER>:<PASSWORD> -i http://<HOSTNAME>:8002/manage/v2
    ```

##### Admin インターフェイスを使用する場合

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
   クエリの詳細については、[MarkLogic に関するドキュメント][6]を参照してください。

4. 作成されたユーザーに十分な権限があることを確認するには、`<USER>` および `<PASSWORD>` を使用して `http://<HOSTNAME>:8002` (デフォルトポート) で認証します。

### コンフィギュレーション

#### ホスト

1. MarkLogic のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `marklogic.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル `marklogic.d/conf.yaml` ファイル][7]を参照してください。コンフィグファイルのユーザー関連の設定については、作成した Datadog Agent ユーザーを使用します。

2. [Agent を再起動します][8]。

#### ログの収集

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

    `path` の値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル  `marklogic.d/conf.yaml` ファイル][7]を参照してください。

3. [Agent を再起動します][8]。

### 検証

[Agent のステータスサブコマンドを実行][9]し、Checks セクションで `marklogic` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "marklogic" >}}


### サービスのチェック

**marklogic.can_connect**:<br>
Agent がクエリのエンドポイントに到達できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**marklogic.database.health**:<br>
データベースのステータスが `critical` の場合は `CRITICAL`、`maintenance`、`offline` または `at-risk` の場合は `WARNING`、それ以外の場合は `OK` を返します。

**marklogic.forest.health**:<br>
フォレストのステータスが `critical` の場合は `CRITICAL`、`maintenance`、`offline` または `at-risk` の場合は `WARNING`、それ以外の場合は `OK` を返します。

### イベント

MarkLogic には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://www.marklogic.com
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations
[3]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_64197
[4]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_28243
[5]: https://docs.marklogic.com/REST/POST/manage/v2/users
[6]: https://docs.marklogic.com/sec:create-user
[7]: https://github.com/DataDog/integrations-core/blob/master/marklogic/datadog_checks/marklogic/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/marklogic/metadata.csv
[11]: https://docs.datadoghq.com/ja/help