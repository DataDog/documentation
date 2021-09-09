---
title: Postgres データベースモニタリングの高度なコンフィギュレーション
kind: documentation
description: Postgres データベースモニタリングの高度なコンフィギュレーション

---
{{< site-region region="us3,gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

## 多数のリレーションの取り扱い

Postgres データベースに大量 (数千単位) のリレーションがある場合、Datadog ではそのデータベースのインスタンスのコンフィギュレーションに `collect_database_size_metrics: false` を追加することをおすすめしています。この設定が無効の場合、Agent はデータベースのサイズ統計を収集する関数 `pg_database_size()` を実行しないため、大量のテーブルがあるインスタンスでパフォーマンスが悪くなります。

```yaml
instances:
  - dbm: true
    ...
    collect_database_size_metrics: false
```

さらに、名前以外のテーブルの定義が同一である複数のテーブル間でデータをパーティション化すると、大量のクエリまたは正規化されたクエリが発生します。

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

このような場合は、`quantize_sql_tables` オプションを使用してこのクエリを単一の正規化されたクエリとして追跡すると、このクエリのすべてのメトリクスが単一のクエリにロールアップされます。

```sql
SELECT * FROM daily_aggregates_?
```

Datadog Agent のデータベースインスタンスのコンフィギュレーションに `quantize_sql_tables` オプションを追加します。

```yaml
instances:
  - dbm: true
    ...
    quantize_sql_tables: true
```
