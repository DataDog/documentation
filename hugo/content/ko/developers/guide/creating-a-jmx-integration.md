---
title: JMX 통합 생성
---

이 가이드에서는 [개발자 툴킷][1]을 사용하여 JMX 통합을 만드는 방법을 설명합니다.

## 설정
### JMX 통합 스캐폴딩 만들기

```bash
ddev create --type jmx MyJMXIntegration
```

JMX 통합에는 특정 초기화 및 인스턴스 설정이 포함되어 있습니다:

```yaml
init_config:
    is_jmx: true                   # 통합 유형을 JMX로 식별합니다.
collect_default_metrics: true # `metrics.yaml`에 표기된 메트릭을 수집합니다.

instances:
  - host: <HOST>                   # JMX hostname
    port: <PORT>                   # JMX port
    ...
```

자세한 `init` 및 `instance` 설정은  [JMX 통합 설명서][2]를 참조하세요.

### 수집할 메트릭 정의

JMX에서 수집하려는 메트릭을 선택합니다. 모니터링이 필요한 서비스에 대해 설명서를 참조하여 사용 가능한 메트릭을 찾아보세요.

[VisualVM][3], [JConsole][4] 또는 [jmxterm](#jmxterm)과 같은 도구를 사용하여 사용 가능한 JMX beans와 해당 설명을 탐색할 수도 있습니다.


### 메트릭 필터 정의

`metrics.yaml`를 편집하여 메트릭 수집을 위한 필터를 정의합니다.

메트릭 필터 형식에 대한 자세한 내용은 [JMX 통합][5]을 참조하세요.

[JMXFetch 테스트 사례][6]는 메트릭 필터의 작동 방식에 대한 예시를 제공합니다.

`metrics.yaml` 예시:

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

#### 테스트

[`ddev`][7]를 사용하여 `tests/conftest.py`에서 `dd_environment`를 제공함으로써 JMX 서비스를 테스트할 수 있습니다.

예시:

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

`e2e` 테스트 예시:

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

실제 예시:

- [JMX dd_environment][8]
- [JMX e2e 테스트][9]

## JMX 도구 {#jmxterm}

### JMXTerm을 사용하여 JMX beans 목록 생성

```
curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
java -jar /tmp/jmxterm-1.0.1-uber.jar -l localhost:<JMX_PORT>
domains
beans
```

출력 예시:

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

### 여분의 jar가 있는 JMXTerm을 사용하여 JMX beans 목록 생성 

아래 예시에서 여분의 jar는 `jboss-client.jar`입니다.

```
curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
java -cp <PATH_WILDFLY>/wildfly-17.0.1.Final/bin/client/jboss-client.jar:/tmp/jmxterm-1.0.1-uber.jar org.cyclopsgroup.jmxterm.boot.CliMain --url service:jmx:remote+http://localhost:9990 -u datadog -p pa$$word
domains
beans
```


[1]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[2]: /ko/integrations/java
[3]: https://visualvm.github.io/
[4]: https://docs.oracle.com/javase/7/docs/technotes/guides/management/jconsole.html
[5]: /ko/integrations/java/?tab=host#description-of-the-filters
[6]: https://github.com/DataDog/jmxfetch/tree/master/src/test/resources
[7]: https://datadoghq.dev/integrations-core/ddev/cli/
[8]: https://github.com/DataDog/integrations-core/blob/master/activemq/tests/conftest.py
[9]: https://github.com/DataDog/integrations-core/blob/master/activemq/tests/test_check.py