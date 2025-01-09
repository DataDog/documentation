ランタイムで Spark スパンにタグを設定できます。これらのタグは、タグが追加された後に開始するスパンにのみ適用されます。

```scala
// 次のすべての Spark 計算のタグを追加します
sparkContext.setLocalProperty("spark.datadog.tags.key", "value")
spark.read.parquet(...)
```

ランタイムタグを削除するには

```scala
// 次のすべての Spark 計算のタグを削除します
sparkContext.setLocalProperty("spark.datadog.tags.key", null)
```