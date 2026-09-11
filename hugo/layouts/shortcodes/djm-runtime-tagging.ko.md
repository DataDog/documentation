런타임의 Spark 스팬(span)에서 태그를 설정할 수 있습니다. 본 태그는 태그가 추가된 후 실행되는 _스팬(span)에만_ 적용됩니다.

```scala
// 다음 모든 Spark 컴퓨팅에 태그 추가
sparkContext.setLocalProperty("spark.datadog.tags.key", "value")
spark.read.parquet(...)
```

런타임 태그를 제거하려면 다음을 수행합니다.

```scala
// 다음 모든 Spark 컴퓨팅에서 태그 제거
sparkContext.setLocalProperty("spark.datadog.tags.key", null)
```