---
aliases:
- /ja/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: /integrations/mysql/
  tag: Documentation
  text: Datadog-MySQL integration
title: Collect SQL Server Custom Metrics
---

このガイドでは、SQL Server からカスタムメトリクスを収集する方法を説明します。

## カスタムクエリ

SQL Server インテグレーションでより複雑なカスタムメトリクスを収集するには、[Agent の構成ディレクトリ][5]のルートにある `conf.d/sqlserver.d/conf.yaml` ファイルの `custom_queries` オプションを使用します。詳細については、サンプル [sqlserver.d/conf.yaml][6] を参照してください。

### 構成

`custom_queries` には以下のオプションがあります:

| オプション        | 必須 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| クエリ         | はい      | 実行する SQL です。簡単なステートメントにすることも、複数行のスクリプトにすることもできます。結果のすべての行が評価されます。複数行のスクリプトが必要な場合は、パイプ文字  (`\|`) を使用します。                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 列       | はい      | 列を表すリストです。左から右へ順に並べられます。<br><br>次の 2 つの必須データがあります。<br> - **`name`**: サフィックスとして `metric_prefix` に付加され、完全な名前を形成します。`type` が `tag` と指定されている場合、この列は、このクエリによって収集されるすべてのメトリクスにタグとして適用されます。<br> - **`type`**: 送信方法 (`gauge`、`count`、`rate` など)。`tag` と設定し、この列のアイテムの名前と値 (`<name>:<row_value>`) で行の各メトリクスにタグ付けすることができます。 |
| usage-metering-get-hourly-usage-for-lambda-traced-invocations          | いいえ       | 各メトリクスに適用する静的タグのリスト。


- 定義済みの `columns` のうち最低 1 つは、メトリクスタイプ (`gauge`、`count`、`rate` など) である必要があります。
- `columns` 内の定義済みアイテム数は、クエリで返される列数と同じである必要があります。
- `columns` のアイテムが定義される順番は、クエリで返される順番と同じである必要があります。

  ```yaml
  custom_queries:
    - query: Select F3, F2, F1 from Table;
      columns:
        - {name: f3_metric_alias, type: gauge}
        - {name: f2_tagkey      , type: tag  }
        - {name: f1_metric_alias, type: count}
      [...]
  ```

### 例

以下に示すのは、`testdb` データベースの `company` テーブルです。テーブルには 3 件の従業員レコードが含まれています。

```text
testdb=# SELECT * FROM company;

id| name  | age| address    |salary | entry_date | last_raise_time
-------------------------------------------------------------------
1 | Paul  | 32 | California | 20000 | 1457570000 | 1457570300
2 | Allen | 25 | Texas      | 30000 | 1457570060 | 1457570300
3 | Teddy | 23 | Norway     | 45000 | 1457570120 | 1457570300
```

次の SQL クエリは、Paul の年齢と給料をメトリクス値として、Paul の名前と住所をタグとして取得します。

```text
SELECT age,salary,name,address FROM company WHERE name = 'Paul'
```

対応する YAML `custom_queries`  の構成

```yaml
custom_queries:
  - query: SELECT age,salary,name,address FROM company WHERE name = 'Paul'
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: localisation
        type: tag
    tags:
      - 'query:custom'
```

SQL Server YAML ファイルを更新した後、[Datadog Agent を再起動][7]します。

#### 検証

結果を確認するには、[メトリクスエクスプローラー][8]を使用してメトリクスを検索します。

#### デバッグ

[Agent の status サブコマンドを実行][9]し、Checks セクションの `sqlserver` を探します。

```text
sqlserver
--------
  - instance #0 [ERROR]: 'Missing query parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

また、[Agent のログ][10]でも有益な情報を確認できる場合があります。

## パフォーマンスカウンターからメトリクスを収集する

デフォルトでは、[Datadog-SQL Server チェック][1]は、`sys.dm_os_performance_counters` テーブルで利用可能なメトリクスの*一部*のみをキャプチャします。

パフォーマンスカウンターからの基本的なメトリクス収集の例を以下に示します。**注**: オプションで、メトリクスとともに送信される `tags` を指定できます。

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
| `tags`         | キー:値のペアで構成されたタグのリスト。                        |

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

複数のインスタンスを持つカウンターのすべてのインスタンスを収集するには、 `instance_name` パラメーターに特別な値 `ALL` (大文字小文字が区別されます) を使用します。このパラメーターは `tag_by` パラメーターの値を**必要とします**。この例では、`db:mydb1`、`db:mydb2` とタグ付けされたメトリクスを取得します。

```yaml
custom_metrics:
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

## カスタムプロシージャからメトリクスを収集する (レガシー)

データベースからカスタムメトリクスを収集するための旧来の方法です。設定手順がよりシンプルで、実行可能な T-SQL の種類に関しても柔軟性が高く、デバックも容易な `custom_queries` パラメーターの使用をお勧めします。カスタムプロシージャからメトリクスを収集すると大量のカスタムメトリクスが生成され、請求に影響する可能性があります。

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

  -- 一時テーブルを作成します
  CREATE TABLE #DataDog
  (
    [metric] varchar(255) not null,
    [type] varchar(50) not null,
    [value] float not null,
    [tags] varchar(255)
  )

  -- 結果セットから行カウントを削除します
  SET NOCOUNT ON;

  -- 変数 count を作成し、User Connections の数に設定します
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

**注**: `proc_only_if` ガード条件は、データベースがサーバー間を移動できる高可用性シナリオに役立ちます。

### トラブルシューティング

カスタムメトリクスが Datadog に表示されない場合は、Agent ログファイルを確認してください。`Could not call procedure <PROCEDURE_NAME>: You must supply -1 parameters for this stored procedure` というエラーが表示される場合は、次のいずれかの問題である可能性があります。

* `<プロシージャ名>` が正しく入力されていない。
* 構成で指定されたデータベースユーザー名に、ストアドプロシージャを実行する権限がない可能性がある。



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/sqlserver/
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-databases-object
[3]: /ja/metrics/#metric-types
[4]: /ja/metrics/types/?tab=histogram#metric-types
[5]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[7]: /ja/agent/guide/agent-commands/#restart-the-agent
[8]: /ja/metrics/explorer/
[9]: /ja/agent/guide/agent-commands/#agent-status-and-information
[10]: /ja/agent/guide/agent-log-files