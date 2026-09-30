---
description: Postgres Database Monitoringの詳細設定
title: Postgres Database Monitoringの詳細設定
---
## 多数のリレーションの処理{#handling-many-relations}

Postgresデータベースに多数（数千単位）のリレーションがある場合、Datadogではそのデータベースのインスタンス設定に`collect_database_size_metrics: false`を追加することを推奨しています。この設定が無効になっている場合、Agentはデータベースサイズの統計を収集するための関数`pg_database_size()`を実行しません。この関数は、テーブル数が非常に多いインスタンスではパフォーマンスが低下します。

```yaml
instances:
  - dbm: true
    ...
    collect_database_size_metrics: false
```

さらに、名前以外はテーブル定義が同一になるようにデータをテーブル間でパーティション分割している場合、多数の正規化されたクエリが発生する可能性があります：

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

このような場合は、`replace_digits`オプションを使用してこれらのクエリを単一の正規化されたクエリとして追跡し、それらのクエリのすべてのメトリクスを1つのクエリに集約します：

```sql
SELECT * FROM daily_aggregates_?
```

Datadog Agentのデータベースインスタンス設定に`replace_digits`オプションを追加します：

```yaml
instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

パーティション分割はスキーマ収集にも影響します。ネイティブの宣言的パーティション分割（`PARTITION BY`）を使用してパーティション分割されたテーブルは、パーティション数に関係なく、`max_tables`の`collect_schemas`制限に対して単一のテーブルとしてカウントされます。テーブル継承（`INHERITS`）を使用してパーティション分割されたテーブル（上記の`daily_aggregates_*`テーブルなど）は、各パーティションが個別にカウントされます。そのため、このパターンを使用するデータベースでは、完全にカバーするために`max_tables`の制限値を高く設定する必要がある場合があります。詳細については、[スキーマ収集のチューニング][2]を参照してください。

## サンプリングレートの引き上げ{#raising-the-sampling-rate}

比較的頻度が低いクエリや実行時間が短いクエリがある場合は、`collection_interval`の値を下げることでサンプリングレートを引き上げ、実行計画をより頻繁に収集してください。

Datadog Agentのデータベースインスタンス設定で`collection_interval`を設定します。デフォルト値は1秒で、<a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example" target="_blank">`postgres/conf.yaml.example`</a>で確認できます。

値をより短い間隔に下げます：

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

## 列統計収集の設定{#configuring-column-statistics-collection}

列統計の収集では、`pg_stats`（`n_distinct`、`null_frac`、`avg_width`、`correlation`、`most_common_freqs`）から列ごとの統計を定期的に読み取ります。これには、監視対象のすべてのデータベースに`datadog.column_statistics()`関数が存在する必要があります。関数定義については、[セルフホスト型Postgresのデータベース監視の設定][1]を参照してください。

関数が存在したら、Postgresインスタンスの設定で収集を有効にして調整します：

```yaml
instances:
  - dbm: true
    ...
    collect_column_statistics:
      enabled: true
      collection_interval: 3600   # seconds between collection runs; default 3600 (hourly)
      max_tables: 500              # maximum tables to collect per run; default 500
```

| オプション | デフォルト | 変更時期 |
| --- | --- | --- |
| `enabled` | `false` | 列統計の収集を有効にするには、`true`に設定します。|
| `collection_interval` | `3600` | 統計の応答性を高めるには値を下げます（`pg_stats`に対するクエリが増加します）。非常に大規模または高負荷なクラスターでは、クエリ負荷を軽減するために値を上げます。|
| `max_tables` | `500` | 500を超えるテーブルを監視していて完全なカバレッジが必要な場合は値を上げます。収集コストを抑えるには値を下げます。この制限は`max_tables`の`collect_schemas`オプションとは別のもので、デフォルト値は`300`です。|

列統計が収集されるためには、基盤となるテーブルに対して少なくとも一度は`ANALYZE`（またはautoanalyze）が実行されている必要があります。統計が収集されていないテーブルの場合、`pg_stats`は空になります。

[1]: /ja/database_monitoring/setup_postgres/selfhosted/#create-the-column-statistics-function
[2]: /ja/database_monitoring/schema_explorer/#tuning-schema-collection