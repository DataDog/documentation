---
description: Postgres データベースモニタリングの高度なコンフィギュレーション
title: Postgres データベースモニタリングの高度なコンフィギュレーション
---

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

このような場合は、`replace_digits` オプションを使用してこのクエリを単一の正規化されたクエリとして追跡すると、このクエリのすべてのメトリクスが単一のクエリにロールアップされます。

```sql
SELECT * FROM daily_aggregates_?
```

Datadog Agent のデータベースインスタンスのコンフィギュレーションに `replace_digits` オプションを追加します。

```yaml
instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

## サンプリングレートの増加

比較的頻度が低い、またはすばやく実行するクエリがある場合は、`collection_interval` の値を下げてサンプル収集の頻度を上げ、サンプリングレートを増加します。

Datadog Agent のデータベースインスタンス構成で `collection_interval` を設定します。デフォルト値は 1 秒で、<a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L332C9-L336" target="_blank">`postgres/conf.yaml.example`</a> で確認できます。

より小さな間隔に値を下げます。

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```