---
aliases:
- /ja/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
further_reading:
- link: /integrations/mysql
  tag: ドキュメント
  text: Datadog MySQL インテグレーション
title: MySQL カスタムクエリ
---

Datadog の MySQL インテグレーションでは、カスタムクエリからメトリクスを収集できます。

## 構成

詳細な設定手順は [MySQL conf.yaml][1] を参照してください。以下の追加事項も考慮してください。

### データベースの明示

[MySQL conf.yaml][1] にカスタムクエリを追加する際は、参照する各テーブルにデータベース名を付けて修飾する必要があります。形式は次のとおりです。

```sql
SELECT * FROM database_name.table_name WHERE...
```

データベース名を省略すると、Agent は `No database selected` エラーでクエリを実行できません。

### メトリクス名の指定

クエリで指定したメトリクス名はそのまま使用され、接頭辞は追加されません。例: `myapp.custom_query.test`

### 収集頻度

デフォルトでは、MySQL チェックによって 15〜20 秒ごとにメトリクスが収集されます。別の頻度で取得したい場合は、MySQL チェック全体の実行間隔を短くする (この場合、一般的な `mysql.*` メトリクスの頻度も変わります) か、[API][2] または [DogStatsD][3] を使用して CRON スクリプトでメトリクスを送信してください。

### カスタムクエリの数

MySQL チェックで大量のカスタムクエリを実行すると、他の Agent チェックが遅延する場合があります。多数のカスタム MySQL クエリからメトリクスを収集する必要がある場合は、[API][2] または [DogStatsD][3] を使用して CRON スクリプトで送信してください。

## 例

`tester` というデータベースに `test_table` というテーブルがあり、以下のデータが含まれているとします。

```text
col_1 | col_2 | col_3
---------------------
1     | a     | a
2     | b     | b
3     | c     | c
```

次のカスタムクエリを MySQL の `conf.yaml` に追加すると、値 `2` のメトリクス `myapp.custom_query.test.b` が収集されます。

```yaml
    custom_queries:
      - query: SELECT col_1 FROM tester.test_table WHERE col_2 = 'b'
        columns:
        - name: myapp.custom_query.test.b
          type: gauge
        tags:
        - tester:mysql
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[2]: /ja/api/
[3]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/