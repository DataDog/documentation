---
title: SQL Server カスタムメトリクスの収集
kind: ガイド
aliases:
  - /ja/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
  - link: https://www.datadoghq.com/blog/sql-server-metrics/#create-a-stored-procedure-to-generate-and-collect-metrics
    tag: ブログ
    text: メトリクスを生成、収集するストアドプロシージャを作成する
  - link: /integrations/mysql/
    tag: Documentation
    text: Datadog-MySQL インテグレーション
---
デフォルトでは、[Datadog-SQL Server チェック][1]は、`sys.dm_os_performance_counters` テーブルで利用可能な*いくつか*のメトリクスのみをキャプチャします。`custom_metrics` 構造に従ってメトリクスを追加します。

## DMV からメトリクスを収集する

基本的なカスタムメトリクス収集の例を以下に示します。このカウンターに関連付けられたインスタンスはありません。**注**: メトリクスとともに送信されるオプションの `tags` を指定できます。

```yaml
custom_metrics:
  - name: sqlserver.clr.execution
    counter_name: CLR Execution
    tags:
      - tag_name:value
```

パラメーターの説明:

| パラメーター      | 説明                                           |
|----------------|-------------------------------------------------------|
| `name`         | Datadog 内のメトリクスの名前。                   |
| `counter_name` | [SQL Server データベースオブジェクト][2]のカウンター名。 |

カウンターに複数のインスタンスが関連付けられている場合、`instance_name` パラメーター名を使用して単一のインスタンスを取得することを選択できます。

```yaml
custom_metrics:
  - name: sqlserver.exec.in_progress
    counter_name: OLEDB calls
    instance_name: Cumulative execution time (ms) per second
```

粒度をより細かくするために、`object_name` でクエリします。

```yaml
custom_metrics:
- name: sqlserver.cache.hit_ratio
  counter_name: Cache Hit Ratio
  instance_name: SQL Plans
  object_name: SQLServer:Plan Cache
```

複数のインスタンスを持つカウンターのすべてのインスタンスを収集するには、`tag_by` パラメーターの値を**必要とする** `instance_name` パラメーターに、大文字小文字を区別する特別な値 `ALL` を使用します。この例では、`db:mydb1`、`db:mydb2` とタグ付けされたメトリクスを取得します。

```yaml
- name: sqlserver.db.commit_table_entries
  counter_name: Commit table entries
  instance_name: ALL
  tag_by: db
```

カウンターが取得されるデフォルトのテーブルは、`sys.dm_os_performance_counters` テーブルです。Datadog-SQL Server チェックは、`sys.dm_os_wait_stats`、`sys.dm_os_memory_clerks`、`sys.dm_io_virtual_file_stats` もサポートしています。

追加のテーブルの 1 つから取得されたメトリクスをレポートするには、`table` パラメーターでカウンター定義のテーブルを指定し、`columns` パラメーターでレポートするカウンター列を指定します。

```yaml
custom_metrics:
  - name: sqlserver.LCK_M_S
    table: sys.dm_os_wait_stats
    counter_name: LCK_M_S
    columns:
      - max_wait_time_ms
      - signal_wait_time_ms

```

上記の例では、2 つのメトリクス `sqlserver.LCK_M_S.max_wait_time.ms` と `sqlserver.LCK_M_S.signal_wait_time_ms` をレポートします。

**注**: `sys.dm_io_virtual_file_stats` や `sys.dm_os_memory_clerks` などのメトリクスが `counter_name` に関連付けられていない場合、列のみを指定する必要があります。

```yaml
custom_metrics:
  - name: sqlserver.io_file_stats
    table: sys.dm_io_virtual_file_stats
    columns:
      - num_of_reads
      - num_of_writes
```

上記の例は、それぞれデータベース ID とファイル ID でタグ付けされた 2 つのメトリクス、`sqlserver.io_file_stats.num_of_reads` と `sqlserver.io_file_stats.num_of_writes` をレポートします。

## カスタムプロシージャからメトリクスを収集する

カスタムプロシージャからメトリクスを収集すると大量のカスタムメトリクスが生成され、これは請求に影響する可能性があります。

**注**: 6.11 未満の Agent を使用している場合、これが機能するためには `adodbapi` ドライバーをセットアップする必要があります。

### ストアドプロシージャのセットアップ

Datadog にレポートするためのカスタムメトリクスを収集するには、一時テーブルを設定する必要があります。テーブルには次の列が必要です。

| 列   | 説明                                               |
|----------|-----------------------------------------------------------|
| `metric` | Datadog に表示されるメトリクスの名前。          |
| `type`   | [メトリクスタイプ][3]（ゲージ、レート、または[ヒストグラム][4]）。    |
| `value`  | メトリクスの値（浮動小数点数に変換可能である必要があります）。 |
| `tags`   | カンマで区切られた Datadog に表示されるタグ。     |

次のストアドプロシージャがマスターデータベース内に作成されます。

```text
-- <PROCEDURE_NAME> という名前のストアドプロシージャを作成します
CREATE PROCEDURE [dbo].[<PROCEDURE_NAME>]
AS
BEGIN

  -- インテグレーション手順ごとに一時テーブルを作成します
  CREATE TABLE #DataDog
  (
    [metric] varchar(255) not null,
    [type] varchar(50) not null,
    [value] float not null,
    [tags] varchar(255)
  )

  -- 結果セットから行カウントを削除します
  SET NOCOUNT ON;

  -- 変数カウントを作成し、User Connections の数に設定します
  DECLARE @count float;
  SET @count = (select cntr_value from sys.dm_os_performance_counters where counter_name = 'User Connections');

  -- テーブル #Datadog にカスタムメトリクスを挿入します
  INSERT INTO #Datadog (metric, type, value, tags)
  VALUES ('sql.test.test', 'gauge', @count, 'db:master,env:staging')
        ,('sql.test.gauge', 'gauge', FLOOR(RAND()*20), 'tag:test')
        ,('sql.test.rate', 'rate', FLOOR(RAND()*20), 'metric:gauge')
        ,('sql.test.histogram', 'histogram', FLOOR(RAND()*20), 'metric:histogram')
  SELECT * from #DataDog
END
GO

-- ストアドプロシージャを実行する権限を付与します
GRANT EXECUTE ON [dbo].[<PROCEDURE_NAME>] To Public
GO
```

ストアドプロシージャは、次のカスタムメトリクスを出力します。

* `sql.test.test`
* `sql.test.gauge`
* `sql.test.rate`
* `sql.test.histogram.95percentile`
* `sql.test.histogram.avg`
* `sql.test.histogram.count`
* `sql.test.histogram.max`
* `sql.test.histogram.median`

### SQL Server インテグレーション構成を更新する

カスタムプロシージャからメトリクスを収集するには、実行するプロシージャを含む `sqlserver.d/conf.yaml` ファイル内に新しいインスタンス定義を作成します。既存の構成には個別のインスタンスが必要です。ストアドプロシージャを持つインスタンスは、ストアドプロシージャ以外は処理しません。例:

```yaml
  - host: 127.0.0.1,1433
    username: datadog
    password: "<パスワード>"
    database: master
  - host: 127.0.0.1,1433
    username: datadog
    password: "<パスワード>"
    stored_procedure: "<プロシージャ名>"
    database: master
```

以下を指定することもできます。

| パラメーター                 | 説明                                                                               | デフォルト            |
|---------------------------|-------------------------------------------------------------------------------------------|--------------------|
| `ignore_missing_database` | 指定された DB がサーバーに存在しない場合は、チェックを実行しません。                  | `False`            |
| `proc_only_if`            | `stored_procedure` の各呼び出しの前にこの SQL を実行します。1 を返した場合、プロシージャを呼び出します。 |                    |
| `proc_only_if_database`   | `proc_only_if` SQL を実行するデータベース。                                            | データベース属性 |

**注**: `proc_only_if` ガード条件は、データベースがサーバー間を移動できる HA シナリオに役立ちます。

### トラブルシューティング

カスタムメトリクスが Datadog に表示されない場合は、Agent ログファイルを確認してください。`Could not call procedure <プロシージャ名>: You must supply -1 parameters for this stored procedure` というエラーが表示される場合は、次のいずれかの問題である可能性があります。

* `<プロシージャ名>` が正しく入力されていない。
* 構成で指定されたデータベースユーザー名に、ストアドプロシージャを実行する権限がない可能性がある。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/sqlserver/
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-databases-object
[3]: /ja/developers/metrics/#metric-types
[4]: /ja/developers/metrics/histograms/