---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Snowflake: assets/dashboards/snowflake.json
  metrics_metadata: metadata.csv
  monitors:
    Snowflake failed logins: assets/recommended_monitors/snowflake_failed_logins.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - data store
  - コスト管理
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/snowflake/README.md'
display_name: Snowflake
draft: false
git_integration_title: snowflake
guid: 4813a514-e9a4-4f28-9b83-b4221b51b18b
integration_id: snowflake
integration_title: Snowflake
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: snowflake.
metric_to_check: snowflake.storage.storage_bytes.total
name: snowflake
public_title: Datadog-Snowflake インテグレーション
short_description: クレジットの使用状況、ストレージ、クエリ、ユーザー履歴などの主要なメトリクスを監視します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [Snowflake][1] を監視します。Snowflake は SaaS 分析データウェアハウスであり、完全にクラウドインフラストラクチャー上で実行されます。
このインテグレーションにより、クレジットの使用状況、請求、ストレージ、クエリメトリクスなどが監視されます。

<div class="alert alert-info"><bold>注: メトリクスは Snowflake へのクエリを介して収集されます。Datadog インテグレーションによるクエリは、Snowflake によって課金されます。</bold></div>

## セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インストール

Snowflake チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

**注**: 現在、Python 2 を使用している Datadog Agent 6 の MacOS では Snowflake チェックをご利用いただけません。

<div class="alert alert-warning"><code>v7.23.0</code> でインテグレーションを構成している場合は、バージョンを <code>2.0.1</code> にアップグレードして最新機能をご利用ください。
下記の<a href=https://docs.datadoghq.com/agent/guide/integration-management/#install>コマンド</a>を使用してインテグレーションをアップグレードできます。<br>

```text
datadog-agent integration install datadog-snowflake==2.0.1
```
</div>

### コンフィギュレーション

1. snowflake のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `snowflake.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル snowflake.d/conf.yaml][3] を参照してください。

   **注**: デフォルトでは、このインテグレーションは `SNOWFLAKE` データベースと `ACCOUNT_USAGE` スキーマを監視します。
   このデータベースはデフォルトで使用でき、表示できるのは `ACCOUNTADMIN` ロールまたは [ACCOUNTADMIN によって付与されたロール][4]のユーザーのみです。

    ```yaml
        ## @param account - string - required
        ## Name of your account (provided by Snowflake), including the platform and region if applicable.
        ## For more information on Snowflake account names,
        ## see https://docs.snowflake.com/en/user-guide/connecting.html#your-snowflake-account-name
        #
      - account: <ACCOUNT>

        ## @param user - string - required
        ## Login name for the user.
        #
        user: <USER>

        ## @param password - string - required
        ## Password for the user
        #
        password: <PASSWORD>

        ## @param min_collection_interval - number - optional - default: 3600
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        ##
        ## NOTE: Most Snowflake ACCOUNT_USAGE views are populated on an hourly basis,
        ## so to minimize unnecessary queries the `min_collection_interval` defaults to 1 hour.
        #
        # min_collection_interval: 3600
    ```

    <div class="alert alert-info">By default, the <code>min_collection_interval</code> is 1 hour. 
    Snowflake metrics are aggregated by day, you can increase the interval to reduce the number of queries.<br>
    <bold>Note</bold>: Snowflake ACCOUNT_USAGE views have a <a href="https://docs.snowflake.com/en/sql-reference/account-usage.html#data-latency">known latency</a> of 45 minutes to 3 hours.</div>

2. [Agent を再起動します][5]。

### Snowflake カスタムクエリ

Snowflake インテグレーションは、カスタムクエリに対応しています。デフォルトで、インテグレーションは共有 `SNOWFLAKE` データベースと `ACCOUNT_USAGE` スキーマに接続します。

カスタムクエリを別のスキーマまたはデータベースで実行する場合は、別のインスタンスを[サンプル snowflake.d/conf.yaml][3] に追加して `database` および `schema` オプションを指定します。
ユーザーとロールには、指定したデータベースまたはスキーマへのアクセス権があることを確認します。

#### コンフィギュレーションオプション
`custom_queries` には以下のオプションがあります。

| オプション        | 必須 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query         | 〇      | 実行する SQL です。簡単なステートメントにすることも、複数行のスクリプトにすることもできます。結果のすべての行が評価されます。複数行のスクリプトが必要な場合は、パイプを使用します。                                                                                                                                                                                                                                                                                                                                                                                                                              |
| columns       | 〇      | 列を表すリストです。左から右へ順に並べられます。<br><br>次の 2 つの必須データがあります。<br> - **`name`**: サフィックスとして metric_prefix に付加され、完全な名前を形成します。`type` が `tag` と指定されている場合、この列は、このクエリによって収集されるすべてのメトリクスにタグとして適用されます。<br> - **`type`**: 送信方法 (`gauge`、`count`、`rate` など)。`tag` と設定し、この列のアイテムの名前と値 (`<name>:<row_value>`) で行の各メトリクスにタグ付けすることができます。 |
| タグ          | ✕       | 各メトリクスに適用する静的タグのリスト。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


##### 注
- 定義済みの `columns` のうち最低 1 つは、メトリクスタイプ (`gauge`、`count`、`rate` など) である必要があります。
- 列内のアイテム数は、クエリで返された列数と同じである必要があります。
- `columns` のアイテムが定義される順番は、クエリで返された順番と同じである必要があります。

```yaml
custom_queries:
  - query: select F3, F2, F1 from Table;
    columns:
      - name: f3_metric_alias
        type: gauge
      - name: f2_tagkey
        type: tag
      - name: f1_metric_alias
        type: count
    tags:
      - test:snowflake
```

#### 例
以下は、データベース、スキーマ、ウェアハウス名でタグ付けされた [`QUERY_HISTORY` ビュー][6]ですべてのクエリをカウントするクエリの例です。

```TEXT
select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
```

##### コンフィギュレーション

`instances` のカスタムクエリのコンフィギュレーションは、以下のようになります。

```yaml
custom_queries:
  - query: select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
    columns:
      - name: query.total
        type: gauge
      - name: database_name
        type: tag
      - name: schema_name
        type: tag
      - name: warehouse_name
        type: tag
    tags:
      - test:snowflake
```

##### 検証

結果を確認するには、[メトリクスの概要][7]を使用してメトリクスを検索します。

![Snowflake メトリクスの概要][8]


### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `snowflake` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "snowflake" >}}


### サービスのチェック

**snowflake.can_connect**:<br>
Agent が認証して Snowflake に接続できない場合は `CRITICAL`、それ以外の場合は `OK` を返します。

### イベント

Snowflake には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://www.snowflake.com/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[4]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[7]: https://docs.datadoghq.com/ja/metrics/summary/
[8]: https://raw.githubusercontent.com/DataDog/integrations-core/master/snowflake/images/custom_query.png
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/snowflake/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/