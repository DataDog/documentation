---
title: Créer une intégration JMX

---
Ce guide décrit la création d'une intégration JMX à l'aide du [kit de développement][1].

## Configuration
### Créer une architecture d'intégration JMX

```bash
ddev create --type jmx MyJMXIntegration
```

L'intégration JMX contient des configurations init et instance spécifiques :

```yaml
init_config:
    is_jmx: true                   # Spécifier qu'il s'agit d'une intégration de type JMX.
    collect_default_metrics: true  # Recueillir les métriques déclarées dans `metrics.yaml`.

instances:
  - host: <HOST>                   # Hostname JMX
    port: <PORT>                   # Port JMX
    ...
```

Consultez la [documentation relative à l'intégration JMX][2] pour découvrir d'autres configurations `init` et `instance`.

### Définir les métriques à recueillir

Sélectionnez les métriques à recueillir à partir de JMX. Consultez la documentation relative au service à surveiller pour découvrir les métriques disponibles.

Vous pouvez utiliser des outils comme [VisualVM][3], [JConsole][4] ou [jmxterm](#jmxterm) pour explorer les beans JMX disponibles, ainsi que leurs descriptions.


### Définir les filtres de métriques

Modifiez le fichier `metrics.yaml` afin de définir les filtres pour recueillir les métriques.

Consultez l'[intégration JMX][5] pour en savoir plus sur le format des filtres de métriques.

Les [scénarios de test JMXFetch][6] fournissent des exemples d'utilisation des filtres de métriques.  

Exemple de fichier `metrics.yaml` :

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

#### Effectuer des tests

Utilisez [`ddev`][7] pour effectuer des tests sur le service JMX en définissant le paramètre `dd_environment` dans `tests/conftest.py`.

Par exemple :

```python
@pytest.fixture(scope="session")
def dd_environment():
    compose_file = os.path.join(HERE, 'compose', 'docker-compose.yaml')
    with docker_run(
        compose_file,
        conditions=[
            # Agent Kafka
            CheckDockerLogs('broker', 'Monitored service is now ready'),
        ],
    ):
        yield CHECK_CONFIG, {'use_jmx': True}
```

Exemple de test `e2e` :

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

Exemples réels :

- [dd_environment JMX][8]
- [Test e2e JMX][9]

## Outils JMX {#jmxterm}

### Énumérer les beans JMX à l'aide de JMXTerm

```
curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
java -jar /tmp/jmxterm-1.0.1-uber.jar -l localhost:<PORT_JMX>
domains
beans
```

Exemple de sortie :

```
$ curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
$ java -jar /tmp/jmxterm-1.0.1-uber.jar -l localhost:1616
Welcome to JMX terminal. Type "help" for available commands.
$>domains
# Les domaines suivants sont disponibles
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

### Énumérer les beans JMX à l'aide de JMXTerm avec des fichiers jar supplémentaires

Dans l'exemple ci-dessous, le fichier jar supplémentaire est `jboss-client.jar`.

```
curl -L https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar -o /tmp/jmxterm-1.0.1-uber.jar
java -cp <CHEMIN_WILDFLY>/wildfly-17.0.1.Final/bin/client/jboss-client.jar:/tmp/jmxterm-1.0.1-uber.jar org.cyclopsgroup.jmxterm.boot.CliMain --url service:jmx:remote+http://localhost:9990 -u datadog -p pa$$word
domains
beans
```


[1]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[2]: /fr/integrations/java
[3]: https://visualvm.github.io/
[4]: https://docs.oracle.com/javase/7/docs/technotes/guides/management/jconsole.html
[5]: /fr/integrations/java/?tab=host#description-of-the-filters
[6]: https://github.com/DataDog/jmxfetch/tree/master/src/test/resources
[7]: https://datadoghq.dev/integrations-core/ddev/cli/
[8]: https://github.com/DataDog/integrations-core/blob/master/activemq/tests/conftest.py
[9]: https://github.com/DataDog/integrations-core/blob/master/activemq/tests/test_check.py