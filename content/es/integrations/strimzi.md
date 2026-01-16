---
app_id: strimzi
app_uuid: 06a90da7-974a-489e-b9bf-9a2828a351fe
assets:
  dashboards:
    strimzi: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - strimzi.cluster_operator.jvm.gc.memory_promoted_bytes.count
      - strimzi.topic_operator.jvm.gc.memory_promoted_bytes.count
      - strimzi.user_operator.jvm.gc.memory_promoted_bytes.count
      metadata_path: metadata.csv
      prefix: strimzi.
    process_signatures:
    - java io.strimzi.operator.cluster.Main
    - java io.strimzi.operator.topic.Main
    - java io.strimzi.operator.user.Main
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10352
    source_type_name: Strimzi
  monitors:
    Strimzi Cluster Operator Resource on host is in a "fail" state": assets/monitors/cluster_operator_resource.json
    Strimzi Topic Operator Resource on host is in a "fail" state": assets/monitors/topic_operator_resource.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/strimzi/README.md
display_on_public_website: true
draft: false
git_integration_title: strimzi
integration_id: strimzi
integration_title: Strimzi
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: strimzi
public_title: Strimzi
short_description: Strimzi
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Strimzi
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/container-native-integrations/#messaging-and-streaming-with-strimzi
  support: README.md#Support
  title: Strimzi
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Strimzi][1] a través del Datadog Agent.

## Configuración

### Instalación

El check de Strimzi está incluido en el paquete del [Datadog Agent][2].
No es necesaria ninguna instalación adicional en tu servidor.

<div class="alert alert-danger">Este check utiliza <a href="https://docs.datadoghq.com/integrations/openmetrics/">OpenMetrics</a>, que requiere Python 3.</div>

### Configuración

El check de Strimzi recopila las métricas de formato de Prometheus de los siguientes operadores:
   - Clúster
   - Tema
   - Usuario

**Nota**: Para la monitorización de Kafka y Zookeeper, utiliza los checks de [Kafka][3], [Kafka Consumer][4] y [Zookeeper][5] respectivamente.

Sigue las instrucciones siguientes para activar y configurar este check para un Agent.

#### Host

1. Edita el archivo `strimzi.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar tus datos de rendimiento de Strimzi. Consulta el [strimzi.d/conf.yaml de ejemplo][6] para todas las opciones disponibles de configuración.

2. [Reinicia el Agent][7].

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][8] para obtener orientación sobre la aplicación de estas instrucciones. He aquí un ejemplo de cómo configurar esto en los diferentes manifiestos de operador utilizando anotaciones pod:

##### Operador de clúster:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: strimzi-cluster-operator
  labels:
    app: strimzi
  namespace: kafka
spec:
  replicas: 1
  selector:
    matchLabels:
      name: strimzi-cluster-operator
      strimzi.io/kind: cluster-operator
  template:
    metadata:
      labels:
        name: strimzi-cluster-operator
        strimzi.io/kind: cluster-operator
      annotations:
        ad.datadoghq.com/strimzi-cluster-operator.checks: |
          {
            "strimzi": {
              "instances":[
                {
                  "cluster_operator_endpoint": "http://%%host%%:8080/metrics"
                }
              ]
            }
          }
      spec:
        containers:
        - name: strimzi-cluster-operator
...
```
**Nota**: La plantilla utilizada para este ejemplo puede encontrarse [aquí][9].


##### Operadores de temas y usuarios:
```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: my-cluster
spec:
...
  entityOperator:
    topicOperator: {}
    userOperator: {}
    template:
      pod:
        metadata:
          annotations:
            ad.datadoghq.com/topic-operator.checks: |
              {
                "strimzi": {
                  "instances":[
                    {
                      "topic_operator_endpoint": "http://%%host%%:8080/metrics"
                    }
                  ]
                }
              }
            ad.datadoghq.com/user-operator.checks: |
              {
                "strimzi": {
                  "instances":[
                    {
                      "user_operator_endpoint": "http://%%host%%:8081/metrics"
                    }
                  ]
                }
              } 
...
```
**Nota**: La plantilla utilizada para este ejemplo puede encontrarse [aquí][10].

Consulta el [strimzi.d/conf.yaml de ejemplo][6] para conocer todas las opciones disponibles de configuración.

#### Kafka y Zookeeper

Los componentes de Kafka y Zookeeper de Strimzi pueden ser monitorizados usando checks de [Kafka][3], [Kafka Consumer][4] y [Zookeeper][5]. Las métricas de Kafka se recopilan a través de JMX. Para más información sobre cómo habilitar JMX, consulta la [documentación de Strimzi sobre opciones de JMX][11]. He aquí un ejemplo de cómo configurar los checks de Kafka, Kafka Consumer y Zookeeper utilizando anotaciones pod:
```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: my-cluster
spec:
  kafka:
    jmxOptions: {}
    version: 3.4.0
    replicas: 1
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
    template:
      pod:
        metadata:  
          annotations:
            ad.datadoghq.com/kafka.checks: |
              {
                "kafka": {
                  "init_config": {
                    "is_jmx": true, 
                    "collect_default_metrics": true, 
                    "new_gc_metrics": true
                  },
                  "instances":[
                    {
                      "host": "%%host%%",
                      "port": "9999"
                    }
                  ]
                },
                "kafka_consumer": {
                  "init_config": {},
                  "instances": [
                    {
                      "kafka_connect_str": "%%host%%:9092",
                      "monitor_unlisted_consumer_groups": "true"
                    }
                  ]
                }
              }        
    config:
      offsets.topic.replication.factor: 1
      transaction.state.log.replication.factor: 1
      transaction.state.log.min.isr: 1
      inter.broker.protocol.version: "3.4"
    storage:
      type: ephemeral
  zookeeper:
    replicas: 1
    storage:
      type: ephemeral
    template:
      pod:
        metadata:
          annotations:
            ad.datadoghq.com/zookeeper.checks: |
              {
                "zk": {
                  "instances":[
                    {
                      "host":"%%host%%","port":"2181"
                    }
                  ]
                }
              } 
```
**Nota**: La plantilla utilizada para este ejemplo puede encontrarse [aquí][10].

#### Recopilación de logs

_Disponible para el Agent versiones >6.0_

Los logs de Strimzi pueden recopilarse de los distintos pods de Strimzi a través de Kubernetes. La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Para habilitarla, consulta [recopilación de logs de Kubernetes][12].

Consulta las [plantillas de integración de Autodiscovery][8] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "strimzi", "service": "<SERVICE_NAME>"}`   |

### Validación

[Ejecuta el subcomando de estado del Agent][13] y busca `strimzi` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "strimzi" >}}


### Eventos

La integración de Strimzi no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "strimzi" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][16].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de tus tecnologías nativas en contenedores][17]


[1]: https://strimzi.io/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/integrations/kafka/
[4]: https://docs.datadoghq.com/es/integrations/kafka/?tab=host#kafka-consumer-integration
[5]: https://docs.datadoghq.com/es/integrations/zk/
[6]: https://github.com/DataDog/integrations-core/blob/master/strimzi/datadog_checks/strimzi/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[9]: https://github.com/strimzi/strimzi-kafka-operator/blob/release-0.34.x/install/cluster-operator/060-Deployment-strimzi-cluster-operator.yaml
[10]: https://github.com/strimzi/strimzi-kafka-operator/blob/release-0.34.x/examples/kafka/kafka-ephemeral-single.yaml
[11]: https://strimzi.io/docs/operators/0.20.0/full/using.html#assembly-jmx-options-deployment-configuration-kafka
[12]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[13]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[14]: https://github.com/DataDog/integrations-core/blob/master/strimzi/metadata.csv
[15]: https://github.com/DataDog/integrations-core/blob/master/strimzi/assets/service_checks.json
[16]: https://docs.datadoghq.com/es/help/
[17]: https://www.datadoghq.com/blog/container-native-integrations/#messaging-and-streaming-with-strimzi