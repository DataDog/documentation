---
aliases:
- /ja/database_monitoring/sql_extended_events
further_reading:
- link: /database_monitoring/
  tag: ドキュメント
  text: Database Monitoring
- link: /database_monitoring/setup_sql_server/
  tag: ドキュメント
  text: SQL Server のセットアップ
- link: /database_monitoring/guide/parameterized_queries/
  tag: ドキュメント
  text: パラメータ値を使用したクエリキャプチャの構成
- link: /database_monitoring/troubleshooting/
  tag: ドキュメント
  text: Database Monitoring のトラブルシューティング
title: SQL Server でのクエリ完了およびクエリエラーキャプチャの構成
---
この機能は、XE (拡張イベント) を使用して、SQL Server インスタンスからクエリ完了イベントおよびクエリエラーイベントを収集します。これにより、以下のことが明らかになります。
- パラメータ値を持つ SQL クエリのメトリクスと動作
- 実行中に発生したエラーおよびタイムアウト

さまざまなデータベースシステムにおけるクエリパラメータのキャプチャに関する詳細については、「[パラメータ値を使用したクエリキャプチャの構成][1]」を参照してください。

[1]: /ja/database_monitoring/guide/parameterized_queries/

このデータは以下に役立ちます。
- パフォーマンス分析
- アプリケーションの動作のデバッグ
- 予期しないエラーやタイムアウトの監査


## 開始する前に {#before-you-begin}

このガイドの先に進む前に、[SQL Server][1] インスタンスの Database Monitoring を構成する必要があります。


サポートされているデータベース
: SQL Server

サポートされているデプロイメント
: すべてのデプロイメントタイプ。

サポートされているエージェントバージョン
: 7.67.0 以上

## セットアップ {#setup}
{{< tabs >}}
{{% tab "非 Azure SQL Server" %}}

1. SQL Server インスタンスで、次の XE (拡張イベント) セッションを作成します。これらのセッションは、インスタンス内の任意のデータベースで作成できます。

`datadog_query_completions` XE セッションは、RPC 呼び出し、SQL バッチ、およびストアドプロシージャからの長時間実行 SQL クエリ (1 秒超) をキャプチャします。

```sql
-- Query completions: RPC, batch, and stored procedure events
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON SERVER;
GO

CREATE EVENT SESSION datadog_query_completions ON SERVER -- datadog requires this exact session name
ADD EVENT sqlserver.rpc_completed ( -- capture remote procedure call completions
    ACTION ( -- datadog requires these exact actions for rpc_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.sql_batch_completed( -- capture batch completions
    ACTION ( -- datadog requires these exact actions for sql_batch_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.module_end( -- capture stored procedure completions
    SET collect_statement = (1)
    ACTION ( -- datadog requires these exact actions for module_end
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not exceed 1024, values above 1 MB may result in data loss due to SQLServer internals
    TRACK_CAUSALITY = ON, -- allows datadog to correlate related events across activity ID
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems (not supported on RDS)
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_completions ON SERVER STATE = START;
GO
```

datadog_query_errors XE セッションは、[重大度が 11 以上][1]の SQL エラーとクエリタイムアウト ([Attention イベント][2]とも呼ばれます) をキャプチャして、Datadog がクエリの失敗とタイムアウトを報告できるようにします。

```sql
-- Errors and timeouts: SQL errors and attention events
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON SERVER;
GO
CREATE EVENT SESSION datadog_query_errors ON SERVER
ADD EVENT sqlserver.error_reported(
    ACTION( -- datadog requires these exact actions for error_reported
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE severity >= 11
),
ADD EVENT sqlserver.attention(
    ACTION( -- datadog requires these exact actions for attention
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not change, setting this larger than 1 MB may result in data loss due to SQLServer internals
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems (not supported on RDS)
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_errors ON SERVER STATE = START;
GO
```

   **注**: Amazon RDS for SQL Server を使用している場合は、RDS インスタンスではこのオプションがサポートされていないため、両方のセッション構成から `MEMORY_PARTITION_MODE = PER_NODE` 行を削除してください。

2. Datadog Agent 構成で、`sqlserver.d/conf.yaml` の `collect_xe` を有効にします。
利用可能なすべての構成オプションについては、[conf.yaml.example のサンプル][3]を参照してください。

```yaml
  collect_xe:
    query_completions:
      enabled: true
    query_errors:
      enabled: true
```
パラメータ値を含むクエリステートメントを収集するには、`sqlserver.d/conf.yaml` の `collect_raw_query_statement` を有効にします。パラメータキャプチャの詳細については、「[パラメータ値を使用したクエリキャプチャの構成][1]」を参照してください。

```yaml
  collect_raw_query_statement:
    enabled: true
```

<div class="alert alert-info">生のクエリステートメントには、機密情報 (クエリテキスト内のパスワードなど) や個人を特定できる情報が含まれている可能性があります。このオプションを有効にすると、Datadog はクエリサンプルに表示される生のクエリステートメントを収集し、取り込むことができるようになります。このオプションはデフォルトで無効になっています。</div>

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-error-severities
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/event-classes/attention-event-class
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
{{% /tab %}}

{{% tab "Azure DB" %}}

1. Azure SQL Server データベースで、次の XE (拡張イベント) セッションを作成します。

`datadog_query_completions` XE セッションは、RPC 呼び出し、SQL バッチ、およびストアドプロシージャからの長時間実行 SQL クエリ (1 秒超) をキャプチャします。

```sql
-- Query completions: RPC, batch, and stored procedure events
IF EXISTS (
    SELECT * FROM sys.database_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON DATABASE;
GO

CREATE EVENT SESSION datadog_query_completions ON DATABASE -- datadog requires this exact session name
ADD EVENT sqlserver.rpc_completed ( -- capture remote procedure call completions
    ACTION ( -- datadog requires these exact actions for rpc_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.sql_batch_completed( -- capture batch completions
    ACTION ( -- datadog requires these exact actions for sql_batch_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.module_end( -- capture stored procedure completions
    SET collect_statement = (1)
    ACTION ( -- datadog requires these exact actions for module_end
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not exceed 1024, values above 1 MB may result in data loss due to SQLServer internals
    TRACK_CAUSALITY = ON, -- allows datadog to correlate related events across activity ID
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_completions ON DATABASE STATE = START;
GO
```

datadog_query_errors XE セッションは、[重大度が 11 以上][1]の SQL エラーとクエリタイムアウト ([Attention イベント][2]とも呼ばれます) をキャプチャして、Datadog がクエリの失敗とタイムアウトを報告できるようにします。

```sql
-- Errors and timeouts: SQL errors and attention events
IF EXISTS (
    SELECT * FROM sys.database_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON DATABASE;
GO
CREATE EVENT SESSION datadog_query_errors ON DATABASE
ADD EVENT sqlserver.error_reported(
    ACTION( -- datadog requires these exact actions for error_reported
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE severity >= 11
),
ADD EVENT sqlserver.attention(
    ACTION( -- datadog requires these exact actions for attention
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not change, setting this larger than 1 MB may result in data loss due to SQLServer internals
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_errors ON DATABASE STATE = START;
GO
```

2. Datadog Agent 構成で、`sqlserver.d/conf.yaml` の `collect_xe` を有効にします。
利用可能なすべての構成オプションについては、[conf.yaml.example のサンプル][3]を参照してください。

```yaml
  collect_xe:
    query_completions:
      enabled: true
    query_errors:
      enabled: true
```
パラメータ値を含むクエリステートメントを収集するには、`sqlserver.d/conf.yaml` の `collect_raw_query_statement` を有効にします。パラメータキャプチャの詳細については、「[パラメータ値を使用したクエリキャプチャの構成][1]」を参照してください。

```yaml
  collect_raw_query_statement:
    enabled: true
```

<div class="alert alert-info">生のクエリステートメントや実行プランには、機密情報 (クエリテキスト内のパスワードなど) や個人を特定できる情報が含まれている可能性があります。このオプションを有効にすると、Datadog はクエリサンプルや実行プランに含まれる生のクエリステートメントや実行プランを収集し、取り込むことができるようになります。このオプションはデフォルトで無効になっています。</div>

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-error-severities
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/event-classes/attention-event-class
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example

{{% /tab %}}

{{< /tabs >}}

## 環境に合わせた拡張イベントの調整 (オプション) {#tuning-extended-events-for-your-environment-optional}

特定のニーズに合わせて拡張イベントセッションをカスタマイズできます。

### クエリ期間のしきい値 {#query-duration-threshold}
デフォルトのクエリ期間のしきい値は `duration > 1000000` (1 秒) です。この値を調整して、キャプチャするクエリの数を制御します。

- **キャプチャするクエリの数を増やす**: しきい値を下げます (例: 500 ミリ秒の場合は `duration > 500000`)。
- **キャプチャするクエリの数を減らす**: しきい値を上げます (例: 5 秒の場合は `duration > 5000000`)。
<div class="alert alert-danger">しきい値を低く設定しすぎると、イベントが過剰に収集されてサーバーのパフォーマンスに影響を与えたり、バッファオーバーフローによるイベントの損失が発生したり、Datadog では各収集期間で最新の 1000 イベントのみが収集されるため、データが不完全になったりする可能性があります。</div>

### メモリ割り当て {#memory-allocation}
- デフォルト値は `MAX_MEMORY = 1024 KB` です。
- 1024 KB より高い値を設定しないでください。その場合、[SQL Server の内部制限][3]によりデータ損失が発生する可能性があります。
- トラフィックの多いサーバーでは、最大値の 1024 KB に設定することを推奨します。
- トラフィックの少ないサーバーでは、512 KB に設定すれば十分な場合があります。

### イベントフィルタリング {#event-filtering}

イベントの量を減らすには、`WHERE` 句にフィルターを追加します。例:

  ```sql
  WHERE (
      sql_text <> '' AND
      duration > 1000000 AND
      -- Add custom filters here
      database_name = 'YourImportantDB' AND -- Only track specific databases
      username <> 'datadog' -- Exclude Datadog Agent queries or specific users
  )
  ```

### パフォーマンスに関する考慮事項 {#performance-considerations}

拡張イベントは軽量に設計されていますが、多少のオーバーヘッドが発生する可能性があります。パフォーマンスの問題に気付いた場合は、以下を行うことを検討してください。

- [クエリ期間のしきい値を大きくして](#query-duration-threshold)、キャプチャされるクエリの数を制限します。
- [より具体的なフィルターを追加して](#event-filtering)、イベントの数を減らします。
- ピーク負荷時には、以下を実行して、一方または両方のセッションを無効にします。

```sql
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON SERVER;
GO
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON SERVER;
GO
```

### Azure 固有の考慮事項 {#azure-specific-considerations}

Azure SQL Database 環境では通常、リソースがより制限されています。パフォーマンスへの影響を最小限に抑えるには、以下のようにします。

- [より制限の厳しいフィルターを使用します](#event-filtering) (下位のサービスレベルを使用している場合)。
- エラスティックプールを使用している場合は、すべてのデータベースでパフォーマンスへの影響を監視します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/database_monitoring/setup_sql_server/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://techcommunity.microsoft.com/blog/sqlserversupport/you-may-not-see-the-data-you-expect-in-extended-event-ring-buffer-targets8230-/315838