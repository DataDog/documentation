---
app_id: tokumx
app_uuid: 8169c714-555c-4e00-9be0-c6604cf1e858
assets:
  dashboards:
    tokumx: assets/dashboards/tokumx_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: tokumx.uptime
      metadata_path: metadata.csv
      prefix: tokumx.
    process_signatures: []
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: TokuMX
  saved_views:
    tokumx_processes: assets/saved_views/tokumx_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data store
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tokumx/README.md
display_on_public_website: true
draft: false
git_integration_title: tokumx
integration_id: tokumx
integration_title: TokuMX
integration_version: 3.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: tokumx
public_title: TokuMX
short_description: OpCounter、レプリケーションラグ、キャッシュテーブルサイズなどのメトリクスを追跡。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::キャッシュ
  - Category::データストア
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: OpCounter、レプリケーションラグ、キャッシュテーブルサイズなどのメトリクスを追跡。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TokuMX
---



## 概要

このチェックは、以下を含む TokuMX メトリクスを収集します。

- Opcounters
- レプリケーションラグ
- キャッシュテーブル使用率とストレージサイズ。

## セットアップ

### インストール

TokuMX チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### TokuMX の準備

1. 次のコマンドを使用して、Python MongoDB モジュールを MongoDB サーバーにインストールします。

   ```shell
   sudo pip install --upgrade "pymongo<3.0"
   ```

2. 次のコマンドを使用して、モジュールがインストールされていることを確認できます。

   ```shell
   python -c "import pymongo" 2>&1 | grep ImportError && \
   echo -e "\033[0;31mpymongo python module - Missing\033[0m" || \
   echo -e "\033[0;32mpymongo python module - OK\033[0m"
   ```

3. Mongo シェルを起動し、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成します。

   ```shell
   # Authenticate as the admin user.
   use admin
   db.auth("admin", "<YOUR_TOKUMX_ADMIN_PASSWORD>")
   # Add a user for Datadog Agent
   db.addUser("datadog", "<UNIQUEPASSWORD>", true)
   ```

4. 次のコマンドを使用して、ユーザーが作成されたことを確認します (Mongo シェルではありません)。

   ```shell
   python -c 'from pymongo import Connection; print Connection().admin.authenticate("datadog", "<UNIQUEPASSWORD>")' | \
   grep True && \
   echo -e "\033[0;32mdatadog user - OK\033[0m" || \
   echo -e "\033[0;31mdatadog user - Missing\033[0m"
   ```

MongoDB でのユーザーの作成と管理の詳細については、[MongoDB Security のドキュメント][2]を参照してください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent の構成ディレクトリ][1]のルートにある `conf.d/` フォルダーの `tokumx.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル tokumx.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     - server: "mongodb://<USER>:<PASSWORD>@localhost:27017"
   ```

2. [Agent を再起動][3]すると、Datadog への TokuMX メトリクスの送信が開始されます。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tokumx/datadog_checks/tokumx/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                      |
| -------------------- | ---------------------------------------------------------- |
| `<インテグレーション名>` | `tokumx`                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                              |
| `<インスタンスコンフィギュレーション>`  | `{"server": "mongodb://<ユーザー>:<パスワード>@%%host%%:27017"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `tokumx` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "tokumx" >}}


### イベント

**レプリケーション状態の変化**:

このチェックは、TokuMX ノードでレプリケーション状態が変化するたびにイベントを送信します。

### サービスのチェック
{{< get-service-checks-from-git "tokumx" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [MongoDB アプリケーションの TokuMX キーメトリクスの監視][5]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.mongodb.com/manual/security/
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitor-key-tokumx-metrics-mongodb-applications