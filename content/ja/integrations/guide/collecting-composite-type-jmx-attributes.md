---
aliases:
- /ja/integrations/faq/collecting-composite-type-jmx-attributes/
title: Collecting Composite type JMX attributes
---

## JMXFetch

Agent では、以下の統合のための yaml ファイルがすべて JMXFetch によって読み込まれます。

* [Active MQ][1]
* [Cassandra][2]
* [Java][3]
* [Solr][4]
* [Tomcat][5]

## JMXFetch の属性

JMXFetchが収集できるJMX属性には2種類あります（simpleとcomposite）。

### Simple 属性

これらは、`integer`、`float`、`double`、`long`、`boolean` などです。

**注**: ブール値の true は 1、false は 0 になります。[対応するタイプの一覧をご覧ください][6]

現在の JMX インテグレーションが何を収集しているのかを知るために、`list` コマンドを使用することができます。以下は、Simple 属性を示す出力のスニペットです。

```text
Matching: x/350. Bean name: java.lang - Attribute name: attribute_1 - Attribute type: java.lang.Integer
```

そうすると、次のような構成になります。

```yaml
- include:
     domain: java.lang
     attribute:
       attribute_1:
         metric_type: counter
         alias: java.lang.Integer
```

JMXFetch は属性値を直接抽出し、メトリクス値として使用します。収集方法については、[JMX ドキュメント][3]を参照してください。

### Composite 属性

これらは、配列、ハッシュマップ、あるいは 'simple' 属性で構成されるオブジェクトと見なすことができます。

```text
Matching: x/350. Bean name: java.lang - Attribute name: HeapMemoryUsage - Attribute type: javax.management.openmbean.CompositeData
```

この場合、JMXFetch に、この 'composite' 属性を使用して、どのようにメトリクスの数値を作成するかについて、詳細を追加する必要があります。

そのためには、`.` を使用してコンポーネントを指定します。

```yaml
- include:
    domain: java.lang
    type: Memory
    attribute:
      HeapMemoryUsage.used:
        alias: jvm.heap_memory
        metric_type: gauge
      HeapMemoryUsage.committed:
        alias: jvm.heap_memory_committed
        metric_type: gauge

      # (...)
```

### これらの composite 属性の次のレベルを見るにはどうしたらいいのでしょうか？

これを実現するには、JMXterm (後述) を使用するのが最適でしょう。

```text
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:<PORT> -u <USER> -p <PASSWORD>
```

なお、**Agent v5.32.8 以降** のすべてのバージョンでは、`jmxterm` JAR は Agent に同梱されていません。`jmxterm` をダウンロードして使用するには、[上流プロジェクト][7]を参照してください。

次に、get コマンドで特定のメトリクスを引き出します。

[1]: /ja/integrations/activemq/
[2]: /ja/integrations/cassandra/
[3]: /ja/integrations/java/
[4]: /ja/integrations/solr/
[5]: /ja/integrations/tomcat/
[6]: https://github.com/DataDog/jmxfetch/blob/master/src/main/java/org/datadog/jmxfetch/Instance.java#L23-L27
[7]: https://github.com/jiaqi/jmxterm