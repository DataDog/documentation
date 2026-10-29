---
aliases:
- /ja/data_observability/datasets/?tab=snowflake
description: Snowflake を Datadog Data Observability に接続して、データ品質を監視し、使用状況をトレースし、問題を検出します。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability の概要
- link: /monitors/types/data_observability/
  tag: ドキュメント
  text: Data Observability モニター
title: Snowflake
---
## 概要{#overview}

Snowflake インテグレーションは Datadog を Snowflake アカウントに接続し、メタデータ、クエリ履歴、テーブルレベルメトリクスを同期します。このインテグレーションを使用して、データの鮮度を監視し、異常を検出し、データウェアハウスおよびダウンストリームツール全体のリネージをトレースできます。

## 前提条件{#prerequisites}

始める前に、以下があることを確認してください。

- Snowflake での `ACCOUNTADMIN` ロールへのアクセス権。
- RSA キーペア。詳細については、[Snowflake キーペア認証のドキュメント][1]を参照してください。
- Snowflake アカウントで IP によるネットワークアクセス制限を行っている場合は、Datadog Webhook IP をネットワークポリシーの許可リストに含める必要があります。IP リストについては、[IP 範囲][7]ページの `webhooks` セクションを参照してください。

  <div class="alert alert-warning">IP 範囲は Datadog サイトごとに異なります。<a href="/api/latest/ip-ranges/">IP 範囲</a>ページで、右上のサイトセレクターを使用して、正しいサイト固有のエンドポイント URL から IP を取得していることを確認してください。</div>

## Snowflake でアカウントをセットアップする {#set-up-your-account-in-snowflake}

Snowflake でアカウントをセットアップするには:

1. 以下の変数を定義します。

   ```sql
   SET role_name      = 'DATADOG_ROLE';
   SET user_name      = 'DATADOG_USER';
   SET warehouse_name = 'DATADOG_WH';
   ```

2. ロール、ウェアハウス、およびキーペア認証されたユーザーを作成します。

   ```sql
   USE ROLE ACCOUNTADMIN;

   -- Create monitoring role
   CREATE ROLE IF NOT EXISTS IDENTIFIER($role_name);

   -- Create an X-SMALL warehouse (auto-suspend after 30s)
   CREATE WAREHOUSE IF NOT EXISTS IDENTIFIER($warehouse_name)
   WAREHOUSE_SIZE       = XSMALL
   WAREHOUSE_TYPE       = STANDARD
   AUTO_SUSPEND         = 30
   AUTO_RESUME          = TRUE
   INITIALLY_SUSPENDED  = TRUE;

   -- Raise the statement timeout so large crawls and queries aren't cut off,
   -- and cap concurrency so this warehouse can't be monopolized.
   ALTER WAREHOUSE IDENTIFIER($warehouse_name) SET
   MAX_CONCURRENCY_LEVEL               = 8
   STATEMENT_TIMEOUT_IN_SECONDS        = 3600
   STATEMENT_QUEUED_TIMEOUT_IN_SECONDS = 1200
   AUTO_SUSPEND                        = 30
   AUTO_RESUME                         = TRUE;

   -- Create Datadog user—key-pair only (no password)
   -- Replace <PUBLIC_KEY> with your RSA public key (PEM, no headers/newlines)
   CREATE USER IF NOT EXISTS IDENTIFIER($user_name)
   LOGIN_NAME     = $user_name
   RSA_PUBLIC_KEY = '<PUBLIC_KEY>';

   GRANT ROLE IDENTIFIER($role_name) TO USER IDENTIFIER($user_name);

   ALTER USER IDENTIFIER($user_name) SET
   DEFAULT_ROLE            = $role_name
   DEFAULT_WAREHOUSE       = $warehouse_name
   DEFAULT_SECONDARY_ROLES = ();
   ```

3. ロールに監視権限を付与します。

   ```sql
   -- Warehouse usage
   GRANT USAGE ON WAREHOUSE IDENTIFIER($warehouse_name) TO ROLE IDENTIFIER($role_name);

   -- Account‐level monitoring (tasks, pipes, query history)
   GRANT MONITOR EXECUTION ON ACCOUNT TO ROLE IDENTIFIER($role_name);

   -- Snowflake account-usage views for metadata, usage, and governance
   -- metrics. These do not grant access to the contents of your data.
   GRANT DATABASE ROLE SNOWFLAKE.OBJECT_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.USAGE_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.GOVERNANCE_VIEWER TO ROLE IDENTIFIER($role_name);
   ```

   <div class="alert alert-info">新しいテーブルの見落としを防ぐため、スキーマレベルの将来の付与を使用してください。Snowflake では、データベースレベルの権限よりもスキーマレベルの権限が優先されます。Datadog にデータベースレベルの付与のみがあり、他のロールに同じスキーマに対してスキーマレベルの付与がある場合、新しいテーブルが Datadog に表示されないことがあります。詳細については、<a href="https://docs.snowflake.com/en/sql-reference/sql/grant-privilege#considerations">Snowflake のドキュメント</a>を参照してください。</div>

4. データへの読み取り専用アクセス権を付与します。`grant_database_access` は、前述のとおり他のロールの付与よりも優先されるようにために、データベースレベルではなくスキーマレベルのアクセス権を付与します。また、JSON 配列を受け入れるため、1 回の呼び出しで複数のデータベースへのアクセス権を付与できます。

   ```sql
   -- A database must be selected in order to create a procedure. This can be
   -- any database.
   USE DATABASE SNOWFLAKE;

   CREATE OR REPLACE PROCEDURE grant_database_access(
       databaseNamesJson STRING,
       roleName STRING
   )
   RETURNS STRING
   LANGUAGE JAVASCRIPT
   EXECUTE AS CALLER
   AS
   $$
   function quoteIdentifier(name) {
       return '"' + name.replace(/"/g, '""') + '"';
   }

   var databaseNames;
   try {
       databaseNames = JSON.parse(DATABASENAMESJSON);
   } catch (error) {
       throw new Error("database_names_json must be a JSON array: " + error.message);
   }

   if (!Array.isArray(databaseNames) || databaseNames.length === 0) {
       throw new Error("database_names_json must contain at least one database");
   }

   // the role is always uppercased, so its name here matches regardless of
   // how it was entered when calling this procedure.
   var role = quoteIdentifier(String(ROLENAME).toUpperCase());

   // Grants on TABLE do not apply to dynamic tables, so they are listed
   // separately and additionally receive MONITOR, which dynamic tables need
   // to expose scheduling/lineage metadata.
   var selectKinds = [
       "TABLES",
       "VIEWS",
       "MATERIALIZED VIEWS",
       "EXTERNAL TABLES",
       "EVENT TABLES",
       "ICEBERG TABLES"
   ];

   var databaseCount = 0;
   var schemaCount = 0;

   for (var databaseIndex = 0;
        databaseIndex < databaseNames.length;
        databaseIndex++) {
       var database = quoteIdentifier(databaseNames[databaseIndex]);

       snowflake.execute({sqlText: "GRANT USAGE ON DATABASE " + database + " TO ROLE " + role});

       var schemaResultSet = snowflake.execute({
           sqlText:
               "SELECT SCHEMA_NAME " +
               "FROM " + database + ".INFORMATION_SCHEMA.SCHEMATA " +
               "WHERE SCHEMA_NAME <> 'INFORMATION_SCHEMA'"
       });

       while (schemaResultSet.next()) {
           var schema = quoteIdentifier(schemaResultSet.getColumnValue(1));
           var qualifiedSchema = database + "." + schema;

           snowflake.execute({sqlText: "GRANT USAGE ON SCHEMA " + qualifiedSchema + " TO ROLE " + role});

           for (var kindIndex = 0; kindIndex < selectKinds.length; kindIndex++) {
               var kind = selectKinds[kindIndex];
               snowflake.execute({sqlText: "GRANT SELECT ON ALL " + kind +
                       " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
               snowflake.execute({sqlText: "GRANT SELECT ON FUTURE " + kind +
                       " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
           }

           snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON ALL DYNAMIC TABLES" +
                   " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
           snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON FUTURE DYNAMIC TABLES" +
                   " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});

           schemaCount++;
       }

       // Covers schemas created after onboarding. The schema-level future
       // grants above remain necessary because they take precedence
       // wherever both exist.
       snowflake.execute({sqlText: "GRANT USAGE ON FUTURE SCHEMAS IN DATABASE " + database +
               " TO ROLE " + role});

       for (var futureKindIndex = 0;
            futureKindIndex < selectKinds.length;
            futureKindIndex++) {
           snowflake.execute({sqlText: "GRANT SELECT ON FUTURE " + selectKinds[futureKindIndex] +
                   " IN DATABASE " + database + " TO ROLE " + role});
       }

       snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON FUTURE DYNAMIC TABLES IN DATABASE " +
               database + " TO ROLE " + role});

       databaseCount++;
   }

   return (
       "Granted Datadog access to " + databaseCount +
       " database(s) and " + schemaCount +
       " existing schema(s)"
   );
   $$
   ;

   CALL grant_database_access('["<YOUR_DATABASE>"]', '<ROLE_NAME>');
   ```

   新しいデータベースへのアクセス権を付与するには、`CALL` ステートメントを (更新されたデータベースリストを指定して) 再実行します。または、一時的なデータベースが読み取り可能な状態を維持できるように、この付与を [CI セットアップの一部として][8]実行します。

5. (オプション) 組織で [Snowflake イベント][2]テーブルを使用している場合は、Datadog ロールにそれらのテーブルへのアクセス権を付与できます。

   ```sql
   -- Grant usage on the database, schema, and table of the event table
   GRANT USAGE ON DATABASE <EVENT_TABLE_DATABASE> TO ROLE IDENTIFIER($role_name);
   GRANT USAGE ON SCHEMA <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> TO ROLE IDENTIFIER($role_name);
   GRANT SELECT ON TABLE <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> TO ROLE IDENTIFIER($role_name);

   -- Snowflake-provided application roles for event logs
   GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_ADMIN TO ROLE IDENTIFIER($role_name);
   ```

   Snowflake のセットアップが完了したら、Datadog で Snowflake インテグレーションを構成します。

## Datadog で Snowflake インテグレーションを構成する {#configure-the-snowflake-integration-in-datadog}

Datadog で Snowflake インテグレーションを構成するには:

1. [[{{< ui >}}Datadog Data Observability{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}] (設定)][3] に移動します。
2. Snowflake オプションの [{{< ui >}}Configure{{< /ui >}}] (構成) ボタンをクリックします。

   {{< img src="data_observability/data-obs-settings-integrations.png" alt="[Settings] (設定) ページにある Data Observability インテグレーションのリスト" style="width:100%;" >}}

3. フローに従ってアカウントの詳細を入力し、秘密鍵をアップロードします。
4. [{{< ui >}}Enable Data Observability for Snowflake tables{{< /ui >}}] (Snowflake テーブルに対し Datadog Data Observability を有効にする) をオンにします。
5. (オプション) [{{< ui >}}Custom alias URLs{{< /ui >}}] (カスタムエイリアス URL) で、他のツールがこの Snowflake アカウントを参照するときに使用する追加の名前を登録します。例としては、dbt で構成されたアカウント識別子、BI ツールで使用される接続文字列、または AWS PrivateLink URL などがあります。カスタムエイリアス URL が必要な状況については、以下の[カスタムエイリアス URL](#custom-alias-urls) を参照してください。
6. [{{< ui >}}Save & Test{{< /ui >}}] (保存してテスト) をクリックします。

### Custom alias URLs (カスタムエイリアス URL){#custom-alias-urls}

このフィールドはオプションです。Datadog が接続する Snowflake アカウント名が、他のツールが同じアカウントを参照する方法に一致しない場合に使用します。

Datadog 外部からのリネージイベントには、OpenLineage エミッター、dbt マニフェスト、他のツールのクエリ履歴などが含まれます。これらのイベントは、アップストリームツールの構成時に使用された名前でウェアハウスを識別します。それらの名前が、Datadog が使用する正規のアカウント URL と異なる場合、それらのソースからのリネージは、この Snowflake インテグレーションには結合されません。

それぞれの代替名を {{< ui >}}Custom alias URL{{< /ui >}} (カスタムエイリアス URL) として登録することで、代替名を同じ Snowflake アカウントへの参照として扱うように Datadog に指示することになります。これにより、ツール間のリネージが正しく解決されます。一般的なケースには次のものがあります。

- AWS PrivateLink URL を介してアカウントにアクセスする場合。
- dbt プロジェクト、BI ツール、またはその他のコネクタが、正規の URL と一致しないアカウント識別子を使用して構成されている場合。

エイリアスを追加するには、インテグレーションのセットアップ時に [{{< ui >}}Configure Data Observability{{< /ui >}}] (Data Observability を構成) を展開し、[{{< ui >}}Custom alias URLs{{< /ui >}}] (カスタムエイリアス URL) の下の [{{< ui >}}\+ Add Alias{{< /ui >}}] (\+ エイリアスを追加) をクリックします。代替名ごとに 1 つのエントリを追加します。エイリアスは構成中の Snowflake アカウントにのみ適用されます。各 Snowflake インテグレーションはそれぞれ独自のエイリアスリストを管理します。

## Snowflake タスクと Snowpipe {#snowflake-tasks-and-snowpipes}

Datadog は、Snowflake タスクと Snowpipe の SQL 定義をパースすることで、それらのリネージを導出します。
- タスクの場合、これにはタスク間の依存関係や宛先テーブルへのリネージが含まれます。
- Snowpipe の場合、Datadog はソースステージから宛先テーブルへのリネージを導出します。

どちらの機能も、セットアップ時に付与される `GRANT MONITOR EXECUTION ON ACCOUNT` 権限が必要です。

<div class="alert alert-info">Snowflake タスクのトレースはプレビュー版です。この機能を有効にするには、アカウント担当者にお問い合わせください。</div>

有効にすると、APM で各タスクグラフの実行がトレースとして表示され、個々のタスクがスパンとして表示されます。これには、ステータス、期間、エラーなどの実行詳細が含まれます。確認方法:
1. Datadog で、[{{< ui >}}APM{{< /ui >}}] > [[{{< ui >}}Trace Explorer{{< /ui >}}]][4] に移動します。
2. エクスプローラーをフィルタリングします。
   - 最上位レベルのタスクグラフのスパンの場合は、`operation_name:snowflake.task_graph` でフィルタリングします。
   - 個別のタスクスパンの場合は、`operation_name:snowflake.task` でフィルタリングします。

## オブジェクトタグ {#object-tags}

Datadog は、テーブルに適用されている [Snowflake オブジェクトタグ][6]を取り込み、Data Observability 内の対応するテーブルに関連付けます。タグは、セットアップ時に付与された `SNOWFLAKE.GOVERNANCE_VIEWER` データベースロールを使用して `SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES` から読み取られるため、追加の権限は必要ありません。

取り込まれたタグは、**Data Observability Metrics** データソースで `database`、`schema`、`table`、`entity_id` とともに属性として利用できます。Metrics Explorer およびダッシュボードウィジェットエディターでは、これらのタグを使用して次の操作を実行できます。

- ビジネスディメンション (例: `data_source` または `data_domain`) でテーブルメトリクスをフィルタリングする。
- タグ値でメトリクスをグループ化する。
- ダッシュボードのテンプレート変数を操作する。

Datadog はテーブルごとに最大 50 個のタグを取り込みます。これは Snowflake で規定されている上限です。タグはクロールごとに更新されるため、Snowflake での変更は次回の同期後に反映されます。

## 次のステップ{#next-steps}

保存後、Datadog はバックグラウンドで情報スキーマとクエリ履歴の同期を開始します。初期同期には、Snowflake デプロイメントのサイズに応じて数時間かかる場合があります。

初期同期が完了したら、[Data Observability モニター][5]を作成して、鮮度、行数、列レベルのメトリクス、およびカスタム SQL メトリクスに関するアラートの通知を開始します。

## 権限のトラブルシューティング {#troubleshoot-permissions}

Datadog が Snowflake アカウント内の予期されるデータベース、スキーマ、またはテーブルを参照できない場合は、以下の手順に従って、Datadog ロールに適切なアクセス権があることを確認してください。

<div class="alert alert-info">Snowflake コンソールではセカンダリロールがデフォルトで有効になっているため、ロールには実際よりも多くのアクセス権があるように見える場合があります。以下のステップ 2 は、Datadog ロールの権限のみを使用してテストしていることを確認するのに役立ちます。</div>

1. ロールとユーザーを Datadog 用にプロビジョニングされたものと同じものに設定します。
   ```sql
   USE ROLE DATADOG_ROLE;
   ```

2. Datadog ロールの付与のみが有効になるよう、セカンダリロールを無効にします。
   ```sql
   USE SECONDARY ROLES NONE;
   ```

3. 正しいロールが設定されており、セカンダリロールが使用されていないことを確認します。
   ```sql
   SELECT CURRENT_ROLE(), CURRENT_SECONDARY_ROLES();
   ```

4. Datadog ロールがアクセスできるデータベースを一覧表示します。
   ```sql
   SELECT database_name FROM snowflake.information_schema.databases;
   ```

5. 特定のスキーマまたはテーブルへのアクセス権を確認します。
   ```sql
   SHOW SCHEMAS IN DATABASE "<DATABASE_NAME>";
   SHOW TABLES IN SCHEMA "<DATABASE_NAME>"."<SCHEMA_NAME>";
   ```

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[2]: https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up
[3]: https://app.datadoghq.com/data-obs/settings/integrations
[4]: https://app.datadoghq.com/apm/traces
[5]: /ja/monitors/types/data_observability/
[6]: https://docs.snowflake.com/en/user-guide/object-tagging
[7]: /ja/api/latest/ip-ranges/
[8]: /ja/data_observability/cicd/#drift-detection