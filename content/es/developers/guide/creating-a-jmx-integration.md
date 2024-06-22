---
kind: Guía
title: Creación de una integración JMX
---

Esta guía describe la creación de una integración JMX utilizando el [conjunto de herramientas para desarrolladores][1].

## Configuración
### Crear un andamiaje para la integración JMX

```bash
ddev create --type jmx MyJMXIntegration
```

La integración JMX contiene configuraciones específicas de init y de instancia:

```yaml
init_config:
    is_jmx: true                   # Identifica el tipo de integración como JMX.
    collect_default_metrics: true  # Recopila métricas declaradas en `metrics.yaml`.

instancias:
  - host: <HOST>                   # nombre de host JMX
    puerto: <PORT>                # puerto JMX
    ...
```

Para ver más configuraciones de `init` y `instance`, consulta la [documentación de la integración JMX][2].

### Definir la métricas a recopilar

Selecciona las métricas que quieres recopilar de JMX. Para encontrar las métricas disponibles, consulta la documentación del servicio que quieres monitorizar.

También puedes utilizar herramientas como [VisualVM][3], [JConsole][4] o [jmxterm](#jmxterm) para explorar los beans JMX disponibles y sus descripciones.


### Definir filtros de métricas 

Edita `metrics.yaml` para definir los filtros para recopilar métricas.

Para obtener más información sobre el formato de los filtros de métricas, consulta [la integración JMX][5].

Los [casos de tests JMXFetch][6] proporcionan ejemplos del funcionamiento de los filtros de métricas.  

Ejemplo de `metrics.yaml`:

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

#### Tests

Utilizando [`ddev`][7], puedes realizar tests del servicio JMX proporcionando un `dd_environment` en `tests/conftest.py`.

Por ejemplo:

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

Ejemplo de test `e2e`:

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

Ejemplos reales de:

- [dd_environment JMX][8]
- [Test e2e JMX][9]

## Herramientas JMX {#jmxterm}

### Enumerar beans JMX utilizando JMXTerm

```
curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
java -jar /tmp/jmxterm-1.0.1-uber.jar -l localhost:<JMX_PORT>
domains
beans
```

Resultado del ejemplo:

```
$ curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
$ java -jar /tmp/jmxterm-1.0.1-uber.jar -l localhost:1616
Bienvenidos al terminal JMX. Escribe "help" para ver los comandos disponibles.
$>domains
#los siguientes dominios están disponibles
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
#dominio = JMImplementation:
JMImplementation:type=MBeanServerDelegate
#dominio = com.sun.management:
com.sun.management:type=DiagnosticCommand
com.sun.management:type=HotSpotDiagnostic
#dominio = io.fabric8.insight:
io.fabric8.insight:type=LogQuery
#dominio = java.lang:
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

### Enumerar beans JMX utilizando JMXTerm con archivos jar adicionales

En el siguiente ejemplo, el archivo jar adicional es `jboss-client.jar`.

```
curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
java -cp <PATH_WILDFLY>/wildfly-17.0.1.Final/bin/client/jboss-client.jar:/tmp/jmxterm-1.0.1-uber.jar org.cyclopsgroup.jmxterm.boot.CliMain --url service:jmx:remote+http://localhost:9990 -u datadog -p pa$$word
domains
beans
```


[1]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[2]: /es/integrations/java
[3]: https://visualvm.github.io/
[4]: https://docs.oracle.com/javase/7/docs/technotes/guides/management/jconsole.html
[5]: /es/integrations/java/?tab=host#description-of-the-filters
[6]: https://github.com/DataDog/jmxfetch/tree/master/src/test/resources
[7]: https://datadoghq.dev/integrations-core/ddev/cli/
[8]: https://github.com/DataDog/integrations-core/blob/master/activemq/tests/conftest.py
[9]: https://github.com/DataDog/integrations-core/blob/master/activemq/tests/test_check.py