---
title: Creating a JMX integration
---

このガイドでは、[Developer Toolkit][1] を使用して JMX インテグレーションを作成する方法を説明します。

## セットアップ
### JMX インテグレーションの足場を作る

```bash
ddev create --type jmx MyJMXIntegration
```

JMX インテグレーションには、特定の init および instance コンフィギュレーションが含まれています。

```yaml
init_config:
    is_jmx: true                   # インテグレーションタイプが JMX であることを識別します。
    collect_default_metrics: true  # `metrics.yaml` で宣言されたメトリクスを収集します。

instances:
  - host: <HOST>                   # JMX ホスト名
    port: <PORT>                   # JMX ポート
    ...
```

その他の `init` および `instance` のコンフィギュレーションについては、[JMX インテグレーションのドキュメント][2]を参照してください。

### 収集するメトリクスを定義する

JMX から収集したいメトリクスを選択します。利用可能なメトリクスについては、監視するサービスのドキュメントを参照してください。

また、[VisualVM][3]、[JConsole][4]、[jmxterm](#jmxterm) などのツールを使って、利用できる JMX ビーンとその説明文を調べることができます。


### メトリクスフィルターを定義する

`metrics.yaml` を編集し、メトリクスを収集するためのフィルターを定義します。

メトリクスフィルターのフォーマットについては、[JMX インテグレーション][5]を参照してください。

[JMXFetch のテストケース][6]は、メトリクスフィルターがどのように機能するかの例を示しています。 

`metrics.yaml` の例:

```yaml
jmx_metrics:
  - include:
      domain: org.apache.activemq
      destinationType: Queue
      attribute:
        AverageEnqueueTime:
          alias: activemq.queue.avg_enqueue_time
          metric_type: gauge
        ConsumerCount:
          alias: activemq.queue.consumer_count
          metric_type: gauge
```

#### テスト

[`ddev`][7] を使用し、 `tests/conftest.py` で `dd_environment` を指定すると、JMX サービスに対するテストを行うことができます。

例:

```python
@pytest.fixture(scope="session")
def dd_environment():
    compose_file = os.path.join(HERE, 'compose', 'docker-compose.yaml')
    with docker_run(
        compose_file,
        conditions=[
            # Kafka Broker
            CheckDockerLogs('broker', 'Monitored service is now ready'),
        ],
    ):
        yield CHECK_CONFIG, {'use_jmx': True}
```

`e2e` テスト例:

```python

@pytest.mark.e2e
def test(dd_agent_check):
    instance = {}
    aggregator = dd_agent_check(instance)

    for metric in ACTIVEMQ_E2E_METRICS + JVM_E2E_METRICS:
        aggregator.assert_metric(metric)

    aggregator.assert_all_metrics_covered()
    aggregator.assert_metrics_using_metadata(get_metadata_metrics(), exclude=JVM_E2E_METRICS)
```

実例:

- [JMX dd_environment][8]
- [JMX e2e テスト][9]

## JMX ツール {#jmxterm}

### JMXTerm を使用した JMX Bean のリストアップ

```
curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
java -jar /tmp/jmxterm-1.0.1-uber.jar -l localhost:<JMX_PORT>
domains
beans
```

結果出力例:

```
$ curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
$ java -jar /tmp/jmxterm-1.0.1-uber.jar -l localhost:1616
Welcome to JMX terminal. Type "help" for available commands.
$>domains
#following domains are available
JMImplementation
com.sun.management
io.fabric8.insight
java.lang
java.nio
java.util.logging
jmx4perl
jolokia
org.apache.activemq
$>beans
#ドメイン = JMImplementation:
JMImplementation:type=MBeanServerDelegate
#ドメイン = com.sun.management:
com.sun.management:type=DiagnosticCommand
com.sun.management:type=HotSpotDiagnostic
#ドメイン = io.fabric8.insight:
io.fabric8.insight:type=LogQuery
#ドメイン = java.lang:
java.lang:name=Code Cache,type=MemoryPool
java.lang:name=CodeCacheManager,type=MemoryManager
java.lang:name=Compressed Class Space,type=MemoryPool
java.lang:name=Metaspace Manager,type=MemoryManager
java.lang:name=Metaspace,type=MemoryPool
java.lang:name=PS Eden Space,type=MemoryPool
java.lang:name=PS MarkSweep,type=GarbageCollector
java.lang:name=PS Old Gen,type=MemoryPool
java.lang:name=PS Scavenge,type=GarbageCollector
java.lang:name=PS Survivor Space,type=MemoryPool
java.lang:type=ClassLoading
java.lang:type=Compilation
java.lang:type=Memory
java.lang:type=OperatingSystem
java.lang:type=Runtime
java.lang:type=Threading
[...]
```

### JMXTerm と追加 jar を使用した JMX Bean のリストアップ

以下の例では、追加 jar は `jboss-client.jar` です。

```
curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
java -cp <PATH_WILDFLY>/wildfly-17.0.1.Final/bin/client/jboss-client.jar:/tmp/jmxterm-1.0.1-uber.jar org.cyclopsgroup.jmxterm.boot.CliMain --url service:jmx:remote+http://localhost:9990 -u datadog -p pa$$word
domains
beans
```


[1]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[2]: /ja/integrations/java
[3]: https://visualvm.github.io/
[4]: https://docs.oracle.com/javase/7/docs/technotes/guides/management/jconsole.html
[5]: /ja/integrations/java/?tab=host#description-of-the-filters
[6]: https://github.com/DataDog/jmxfetch/tree/master/src/test/resources
[7]: https://datadoghq.dev/integrations-core/ddev/cli/
[8]: https://github.com/DataDog/integrations-core/blob/master/activemq/tests/conftest.py
[9]: https://github.com/DataDog/integrations-core/blob/master/activemq/tests/test_check.py