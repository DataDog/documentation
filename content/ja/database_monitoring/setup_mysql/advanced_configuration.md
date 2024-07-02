---
title: Advanced Configuration for MySQL Database Monitoring
description: Advanced Configuration for MySQL Database Monitoring

---

## `events_statements_summary_by_digest` の切り捨て

一部のワークロードでは、`performance_schema` のテーブルのメンテナンスが必要です。クエリの統計情報は `performance_schema.events_statements_summary_by_digest` テーブルで集計されますが、行数に上限があります。この上限は、[`performance_schema_digests_size` システム変数][1]により指定されます。テーブルの行がいっぱいの場合、新しいクエリダイジェストは null スキーマおよび null クエリダイジェストで「その他」の行でまとめて追跡されるため、Agent はその行に含まれるクエリの違いを特定できなくなります。

このように、クエリ当たりのメトリクスが正確に追跡されない問題を回避するため、定期的なメンテナンスとしてこのテーブルを切り捨て、すべての新しいクエリが収集されるようにします。

```sql
TRUNCATE performance_schema.events_statements_summary_by_digest;
```

切り捨ての頻度を決定するには、下記のクエリを実行してこの「その他」行に送信されるステートメントの 1 秒あたりの数を確認します。0 より大きい値は、テーブルがいっぱいで切り捨てが必要であることを示します。

```sql
SHOW STATUS LIKE 'Performance_schema_digest_lost';
```

## 多数の同一テーブルの取り扱い

名前以外のテーブルの定義が同一である複数のテーブル間でデータベースをパーティション化すると、大量のクエリまたは正規化されたクエリが発生します。

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

このような場合は、`replace_digits` オプションを使用してこのクエリを単一の正規化されたクエリとして追跡すると、このクエリのすべてのメトリクスが単一のクエリにロールアップされます。

```sql
SELECT * FROM daily_aggregates_?
```

Datadog Agent のデータベースインスタンスのコンフィギュレーションに `replace_digits` オプションを追加します。

```yaml
init_config:

instances:
  - dbm: true
    ...
    replace_digits: true
```

## サンプリングレートの増加

比較的頻度が低い、またはすばやく実行するクエリがある場合は、`collection_interval` の値を下げてサンプル収集の頻度を上げ、サンプリングレートを増加します。

Datadog Agent のデータベースインスタンスコンフィギュレーションで `collection_interval` を設定します。デフォルト値は 1 で、値を小さくするとインターバルが小さくなります。

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-system-variables.html#sysvar_performance_schema_digests_size
