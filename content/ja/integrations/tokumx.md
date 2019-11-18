---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tokumx/README.md'
display_name: TokuMX
git_integration_title: tokumx
guid: 7785939b-bfb6-4d3e-acc2-94c1f5fb33e7
integration_id: tokumx
integration_title: TokuMX
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tokumx.
metric_to_check: tokumx.uptime
name: tokumx
process_signatures:
  - mongod --config /etc/tokumx.conf
public_title: Datadog-TokuMX インテグレーション
short_description: OpCounter、レプリケーションラグ、キャッシュテーブルサイズなどのメトリクスを追跡 and more.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、以下のような TokuMX メトリクスを収集します。

* OpCounter
* レプリケーションラグ
* キャッシュテーブル使用率とストレージサイズ

これらは一例です。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

TokuMX チェックは [Datadog Agent][2] パッケージに含まれています。TokuMX サーバーに追加でインストールする必要はありません。

### コンフィグレーション
#### TokuMX の準備

1.  次のコマンドを使用して、Python MongoDB モジュールを MongoDB サーバーにインストールします。

        sudo pip install --upgrade "pymongo<3.0"


2.  次のコマンドを使用して、モジュールがインストールされていることを確認できます。

        python -c "import pymongo" 2>&1 | grep ImportError && \
        echo -e "\033[0;31mpymongo python module - Missing\033[0m" || \
        echo -e "\033[0;32mpymongo python module - OK\033[0m"


3.  Mongo シェルを起動します。そこで、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成します。

        # 管理者ユーザーとして認証します。
        use admin
        db.auth("admin", "<YOUR_TOKUMX_ADMIN_PASSWORD>")
        # Datadog Agent 用のユーザーを追加します。
        db.addUser("datadog", "<UNIQUEPASSWORD>", true)


4.  次のコマンドを使用して、ユーザーが作成されたことを確認します (mongo シェルではありません)。

        python -c 'from pymongo import Connection; print Connection().admin.authenticate("datadog", "<UNIQUEPASSWORD>")' | \
        grep True && \
        echo -e "\033[0;32mdatadog user - OK\033[0m" || \
        echo -e "\033[0;31mdatadog user - Missing\033[0m"

MongoDB でのユーザーの作成と管理の詳細については、[MongoDB のドキュメント][3]を参照してください。

#### Agent の接続

1. [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `tokumx.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル tokumx.d/conf.yaml][5] を参照してください。

    ```yaml
        init_config:

        instances:
            - server: mongodb://datadog:<UNIQUEPASSWORD>@localhost:27017
    ```

2. [Agent を再起動][6]すると、Datadog への TokuMX メトリクスの送信が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `tokumx` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "tokumx" >}}


### イベント
**レプリケーション状態の変化**:

このチェックは、TokuMX ノードでレプリケーション状態が変化するたびにイベントを送信します。

### サービスのチェック

`tokumx.can_connect`:

Agent が TokuMX に接続してメトリクスを収集できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料

* [MongoDB アプリケーションの TokuMX キーメトリクスの監視][10]


[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://www.mongodb.org/display/DOCS/Security+and+Authentication
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/tokumx/datadog_checks/tokumx/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/tokumx/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/monitor-key-tokumx-metrics-mongodb-applications


{{< get-dependencies >}}