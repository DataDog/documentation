---
title: Creating a JMX integration
kind: guide
---

This guide describes the creation of a JMX integration using the [Developer Toolkit][1].

## Setup
### Create a JMX integration scaffolding

```bash
ddev create --type jmx MyJMXIntegration
```

The JMX integration contains specific init and instance configs:

```yaml
init_config:
    is_jmx: true                   # Identifies the integration type as JMX.
    collect_default_metrics: true  # Collect metrics declared in `metrics.yaml`.

instances:
  - host: <HOST>                   # JMX hostname
    port: <PORT>                   # JMX port
    ...
```

See the [JMX integration documentation][2] for more `init` and `instance` configs.

### Define the metrics to collect

Select the metrics you want to collect from JMX. See the documentation for the service you want to monitor to find available metrics.

You can also use tools like [VisualVM][3], [JConsole][4], or [jmxterm](#jmxterm) to explore the available JMX beans and their descriptions.


### Define metrics filters

Edit the `metrics.yaml` to define the filters for collecting metrics.

See the [JMX integration][5] for details on the metrics filters format.

[JMXFetch test cases][6] provide examples of how metrics filters work.  

Example of `metrics.yaml`:

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

#### Testing

Using [`ddev`][7], you can test against the JMX service by providing a `dd_environment` in `tests/conftest.py`.

For example:

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

`e2e` test example:

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

Real examples of:

- [JMX dd_environment][8]
- [JMX e2e test][9]

## JMX tools {#jmxterm}

### List JMX beans using JMXTerm

```
curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
java -jar /tmp/jmxterm-1.0.1-uber.jar -l localhost:<JMX_PORT>
domains
beans
```

Example output:

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
#domain = JMImplementation:
JMImplementation:type=MBeanServerDelegate
#domain = com.sun.management:
com.sun.management:type=DiagnosticCommand
com.sun.management:type=HotSpotDiagnostic
#domain = io.fabric8.insight:
io.fabric8.insight:type=LogQuery
#domain = java.lang:
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

### List JMX beans using JMXTerm with extra jars

In the example below, the extra jar is `jboss-client.jar`.

```
curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
java -cp <PATH_WILDFLY>/wildfly-17.0.1.Final/bin/client/jboss-client.jar:/tmp/jmxterm-1.0.1-uber.jar org.cyclopsgroup.jmxterm.boot.CliMain --url service:jmx:remote+http://localhost:9990 -u datadog -p pa$$word
domains
beans
```


[1]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[2]: /integrations/java
[3]: https://visualvm.github.io/
[4]: https://docs.oracle.com/javase/7/docs/technotes/guides/management/jconsole.html
[5]: /integrations/java/?tab=host#description-of-the-filters
[6]: https://github.com/DataDog/jmxfetch/tree/master/src/test/resources
[7]: https://datadoghq.dev/integrations-core/ddev/cli/
[8]: https://github.com/DataDog/integrations-core/blob/master/activemq/tests/conftest.py
[9]: https://github.com/DataDog/integrations-core/blob/master/activemq/tests/test_check.py
