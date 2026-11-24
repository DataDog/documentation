---
description: MariaDB Database Monitoring の高度な構成
title: MariaDB Database Monitoring の高度な構成
---
## 切り捨て `events_statements_summary_by_digest` {#truncating-events-statements-summary-by-digest}

特定のワークロードでは、`performance_schema` 内のテーブルに対してメンテナンスが必要になります。クエリ統計は `performance_schema.events_statements_summary_by_digest` テーブルに集計されますが、このテーブルには行数に制限があります。この制限は[`performance_schema_digests_size` システム変数][1]によって指定されます。テーブルがいっぱいになると、新しいクエリダイジェストはスキーマとクエリダイジェストが null のキャッチオール行に追跡されるため、Agent はその行を構成するクエリを区別できなくなります。

このように、クエリ当たりのメトリクスが正確に追跡されない問題を回避するため、定期的なメンテナンスとしてこのテーブルを切り捨て、すべての新しいクエリが収集されるようにします。

```sql
TRUNCATE performance_schema.events_statements_summary_by_digest;
```

切り捨ての頻度を判断するには、以下のクエリを実行して、このキャッチオール行に送信される 1 秒あたりのステートメント数を特定します。値が 0 より大きい場合は、テーブルがいっぱいであり、切り捨てる必要があります。

```sql
SHOW STATUS LIKE 'Performance_schema_digest_lost';
```

## 多数の同一テーブルの取り扱い {#handling-many-identical-tables}

名前以外のテーブルの定義が同一である複数のテーブル間でデータベースをパーティション化すると、大量のクエリまたは正規化されたクエリが発生します。

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

このような場合は、`replace_digits` オプションを使用してこれらのクエリを単一の正規化されたクエリとして追跡すると、それらのクエリのすべてのメトリクスが単一のクエリにロールアップされます。これにより、DBM クォータに対してカウントされる個別の正規化されたクエリの数が減り、MariaDB パフォーマンススキーマ側のダイジェスト制限には影響しません。

```sql
SELECT * FROM daily_aggregates_?
```

Datadog Agent のデータベースインスタンス構成で、`obfuscator_options` の下に `replace_digits` オプションを追加してください。

```yaml
init_config:

instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

## サンプリングレートの引き上げ {#raising-the-sampling-rate}

比較的実行頻度が低い、または実行速度が速いクエリがある場合は、サンプル収集の頻度を上げるために、`collection_interval` の値を下げてサンプリングレートを引き上げます。

Datadog Agent のデータベースインスタンス構成で `collection_interval` を設定します。デフォルト値は 1 です。値を小さくして、間隔を短くします。

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

**注**: 同じデータベースに対して MariaDB インテグレーションチェックのインスタンスを複数実行する場合は、すべてに対して同じ `collection_interval` 値を使用してください。同じメトリクスに対して収集間隔が混在していると、メトリクスの異常が発生する可能性があります。

[1]: https://mariadb.com/docs/server/reference/system-tables/performance-schema/performance-schema-system-variables#performance_schema_digests_size