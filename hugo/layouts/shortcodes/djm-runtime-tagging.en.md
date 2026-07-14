You can set tags on Spark spans at runtime. These tags are applied _only_ to spans that start after the tag is added.

```scala
// Add tag for all next Spark computations
sparkContext.setLocalProperty("spark.datadog.tags.key", "value")
spark.read.parquet(...)
```

To remove a runtime tag:

```scala
// Remove tag for all next Spark computations
sparkContext.setLocalProperty("spark.datadog.tags.key", null)
```