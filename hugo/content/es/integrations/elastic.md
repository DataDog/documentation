---
app_id: elasticsearch
app_uuid: fc23bf70-2992-4e07-96db-c65c167f25d6
assets:
  dashboards:
    elasticsearch: assets/dashboards/overview.json
    elasticsearch_timeboard: assets/dashboards/metrics.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: elasticsearch.search.query.total
      metadata_path: metadata.csv
      prefix: elasticsearch.
    process_signatures:
    - java org.elasticsearch.bootstrap.Elasticsearch
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 37
    source_type_name: Elasticsearch
  monitors:
    Average Search Query Latency is High: assets/monitors/elastic_average_search_latency.json
    Current Indexing Load is High: assets/monitors/elastic_indexing_load.json
    Latency is high: assets/monitors/elastic_query_latency_high.json
    Number of pending tasks is high: assets/monitors/elastic_pending_tasks_high.json
    Query load is high: assets/monitors/elastic_query_load_high.json
    Unsuccessful requests rate is high: assets/monitors/elastic_requests.json
  saved_views:
    elasticsearch_processes: assets/saved_views/elasticsearch_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
- tracing
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/elastic/README.md
display_on_public_website: true
draft: false
git_integration_title: elastic
integration_id: elasticsearch
integration_title: Elasticsearch
integration_version: 8.2.0
is_public: true
manifest_version: 2.0.0
name: elastic
public_title: Elasticsearch
short_description: Monitoriza el estado general del clúster hasta el uso del montón
  de JVM y todo lo demás.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Almacenamiento de datos
  - Category::Recopilación de logs
  - Category::Rastreo
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Métricas
  - Submitted Data Type::Logs
  - Submitted Data Type::Trazas
  - Submitted Data Type::Eventos
  - Offering::Integración
  configuration: README.md#Setup
  description: Monitoriza el estado general del clúster hasta el uso del montón de
    JVM y todo lo demás.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics
  support: README.md#Support
  title: Elasticsearch
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


![Dashboard de Elasticsearch][1]

## Información general

Mantente actualizado sobre el estado de tu clúster de Elasticsearch, desde su estado general hasta el uso del montón de JVM y todo lo demás. Recibe notificaciones cuando debas reactivar una réplica, añadir capacidad al clúster o modificar su configuración. Después de hacerlo, realiza un seguimiento de cómo responden las métricas de tu clúster.

El check de Elasticsearch del Datadog Agent recopila métricas sobre el rendimiento de la búsqueda e indexación, el uso de memoria y la recolección de elementos sin usar, la disponibilidad de nodos, las estadísticas de partición, el espacio en disco y el rendimiento, las tareas pendientes, y mucho más. El Agent también envía eventos y checks de servicio para conocer el estado general de tu clúster.

## Configuración

### Instalación

El check de Elasticsearch se incluye en el paquete del [Datadog Agent][2]. No se necesita instalación adicional.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

A fin de configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `elastic.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1] para empezar a recopilar las [métricas](#metrics) de Elasticsearch. Consulta el [elastic.d/conf.yaml de muestra][2] para ver todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL where Elasticsearch accepts HTTP requests. This is used to
     ## fetch statistics from the nodes and information about the cluster health.
     #
     - url: http://localhost:9200

      ## @param username - string - optional
      ## The username to use if services are behind basic or digest auth.
      #
      # username: <USERNAME>

      ## @param password - string - optional
      ## The password to use if services are behind basic or NTLM auth.
      #
      # password: <PASSWORD>
   ```

    **Notas**:

      - Si recopilas métricas de Elasticsearch desde un solo Datadog Agent que se ejecuta fuera del clúster, como por ejemplo con un Elasticsearch alojado, establece `cluster_stats` en `true`.
      - Las [etiquetas (tags) de nivel de Agent][3] no se aplican a los hosts de un clúster que no ejecuta el Agent. Usa etiquetas de nivel de integración en `<integration>.d/conf.yaml` para garantizar que **TODAS** las métricas tengan etiquetas consistentes. Por ejemplo:

        ```yaml
        init_config:
        instances:
          - url: "%%env_MONITOR_ES_HOST%%"
            username: "%%env_MONITOR_ES_USER%%"
            password: *********
            auth_type: basic
            cluster_stats: true
            tags:
            - service.name:elasticsearch
            - env:%%env_DD_ENV%%
        ```

      - A fin de usar la integración de Elasticsearch del Agent para los servicios de AWS Elasticsearch, configura el parámetro `url` para que apunte a la URL de estadísticas de AWS Elasticsearch.
      - Todas las solicitudes a la API de configuración de Amazon ES deben estar firmadas. Consulta [Cómo realizar y firmar solicitudes de OpenSearch Service][4] para obtener más información.
      - El tipo de autenticación de `aws` se basa en [Boto3][5] para recopilar las credenciales de AWS de `.aws/credentials` de manera automática. Usa `auth_type: basic` en `conf.yaml` y define las credenciales con `username: <USERNAME>` y `password: <PASSWORD>`.
      - Debes crear un usuario y un rol (si aún no los tienes) en Elasticsearch con los permisos adecuados para la monitorización. Esto se puede hacer a través de la API REST que ofrece Elasticsearch o la interfaz de usuario de Kibana.
      - Si has habilitado las funciones de seguridad en Elasticsearch, puedes utilizar los privilegios `monitor` o `manage` mientras utilizas la API para realizar las llamadas a los índices de Elasticsearch.
      - Incluye las siguientes propiedades en el rol creado:
        ```json
        name = "datadog"
        indices {
          names = [".monitoring-*", "metricbeat-*"]
          privileges = ["read", "read_cross_cluster", "monitor"]
        }
        cluster = ["monitor"]
        ```
        Añade el rol al usuario:
        ```json
        roles = [<created role>, "monitoring_user"]
        ```
        Para más información, consulta [crear o actualizar roles][6] y [crear o actualizar usuarios][7].


2. [Reinicia el Agent][8].

###### Consultas personalizadas

La integración de Elasticsearch permite recopilar métricas personalizadas a través de consultas personalizadas utilizando la opción de configuración `custom_queries`. Un endpoint de consulta personalizada puede recopilar múltiples métricas y etiquetas.

Cada consulta personalizada tiene los siguientes parámetros:

- `endpoint` (obligatorio): el endpoint de la API de Elasticsearch que se va a consultar.
- `data_path` (obligatorio): la ruta JSON hasta (sin incluir) la métrica. No puede contener comodines. Por ejemplo: si estás consultando el tamaño de un disyuntor principal, y la ruta completa es `breakers.parent.estimated_size_in_bytes`, entonces `data_path` es `breakers.parent`.
- `columns` (obligatorio): una lista que representa los datos que se recopilarán de la consulta JSON. Cada elemento de esta lista incluye:
   - `value_path` (obligatorio): la ruta JSON desde `data_path` a la métrica. Esta ruta puede incluir claves de cadena e índices de lista. Por ejemplo: si estás consultando el tamaño de un disyuntor principal, y la ruta completa es `breakers.parent.estimated_size_in_bytes`, entonces el `value_path` es `estimated_size_in_bytes`.
   - `name` (obligatorio): El nombre completo de métrica enviado a Datadog. Si también estableces `type` a `tag`, entonces cada métrica recopilada por esta consulta se etiqueta con este nombre.
   - `type` (opcional): designa el tipo de datos enviados. Valores posibles: `gauge`, `monotonic_count`, `rate`, `tag`. Por defecto es `gauge`.
- `payload` (opcional): si se declara, convierte la solicitud GET en una solicitud POST. Utiliza el formato YAML y un usuario de sólo lectura al escribir consultas personalizadas con una carga útil.

**Nota:** Cuando ejecutes consultas personalizadas, utiliza una cuenta de sólo lectura para asegurarte de que la instancia de Elasticsearch no cambia.

Ejemplos:

```yaml
custom_queries:
 - endpoint: /_search
   data_path: aggregations.genres.buckets
   payload:
     aggs:
       genres:
         terms:
           field: "id"
   columns:
   - value_path: key
     name: id
     type: tag
   - value_path: doc_count
     name: elasticsearch.doc_count
   tags:
   - custom_tag:1
```
La consulta personalizada se envía como una solicitud `GET`. Si usas un parámetro `payload` opcional, la solicitud se envía como una solicitud `POST`. 

Los `value_path` pueden ser claves de cadena o índices de lista. Por ejemplo:
```json
{
  "foo": {
    "bar": [
      "result0",
      "result1"
    ]
  }
}
```

`value_path: foo.bar.1` devuelve el valor `result1`.


##### Recopilación de trazas

Datadog APM se integra con Elasticsearch para ver las trazas (traces) en todo el sistema distribuido. La recopilación de trazas se encuentra habilitada de manera predeterminada en el Datadog Agent versión 6 o posterior. Para empezar a recopilar trazas:

1. [Habilita la recopilación de trazas en Datadog][9].
2. [Instrumenta tu aplicación que realiza solicitudes a Elasticsearch][10].

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en el archivo `datadog.yaml` con:

   ```yaml
   logs_enabled: true
   ```

2. Para recopilar logs lentos de búsqueda e indexarlos, [configura tus ajustes de Elasticsearch][11]. De manera predeterminada, los logs lentos de búsqueda no se encuentran habilitados.

   - A fin de configurar logs lentos de índice para un índice `<INDEX>` determinado:

     ```shell
     curl -X PUT "localhost:9200/<INDEX>/_settings?pretty" -H 'Content-Type: application/json' -d' {
       "index.indexing.slowlog.threshold.index.warn": "0ms",
       "index.indexing.slowlog.threshold.index.info": "0ms",
       "index.indexing.slowlog.threshold.index.debug": "0ms",
       "index.indexing.slowlog.threshold.index.trace": "0ms",
       "index.indexing.slowlog.level": "trace",
       "index.indexing.slowlog.source": "1000"
     }'
     ```

   - A fin de configurar logs lentos de búsqueda para un índice `<INDEX>` determinado:

     ```shell
     curl -X PUT "localhost:9200/<INDEX>/_settings?pretty" -H 'Content-Type: application/json' -d' {
       "index.search.slowlog.threshold.query.warn": "0ms",
       "index.search.slowlog.threshold.query.info": "0ms",
       "index.search.slowlog.threshold.query.debug": "0ms",
       "index.search.slowlog.threshold.query.trace": "0ms",
       "index.search.slowlog.threshold.fetch.warn": "0ms",
       "index.search.slowlog.threshold.fetch.info": "0ms",
       "index.search.slowlog.threshold.fetch.debug": "0ms",
       "index.search.slowlog.threshold.fetch.trace": "0ms"
     }'
     ```

3. Añade este bloque de configuración a tu archivo `elastic.d/conf.yaml` para empezar a recopilar tus logs de Elasticsearch:

   ```yaml
   logs:
     - type: file
       path: /var/log/elasticsearch/*.log
       source: elasticsearch
       service: "<SERVICE_NAME>"
   ```

   - Añade instancias adicionales para empezar a recopilar logs lentos:

     ```yaml
     - type: file
       path: "/var/log/elasticsearch/\
             <CLUSTER_NAME>_index_indexing_slowlog.log"
       source: elasticsearch
       service: "<SERVICE_NAME>"

     - type: file
       path: "/var/log/elasticsearch/\
             <CLUSTER_NAME>_index_search_slowlog.log"
       source: elasticsearch
       service: "<SERVICE_NAME>"
     ```

     Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

4. [Reinicia el Agent][8].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#file-location
[4]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ac.html#managedomains-signing-service-requests
[5]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[6]: https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-role.html
[7]: https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-user.html
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/tracing/send_traces/
[10]: https://docs.datadoghq.com/es/tracing/setup/
[11]: https://docs.datadoghq.com/es/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como etiquetas (labels) Docker en el contenedor de tu aplicación:

```yaml
LABEL "com.datadoghq.ad.check_names"='["elastic"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"url": "http://%%host%%:9200"}]'
```

##### Recopilación de logs


La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Docker][2].

Luego, configura [integraciones de logs][3] como etiquetas Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"elasticsearch","service":"<SERVICE_NAME>"}]'
```

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con el Agent v6 o posterior, pero requiere configuración adicional para empezar a recopilar trazas.

Variables de entorno requeridas en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | verdadero                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | verdadero |

Consulta el [Rastreo de aplicaciones de Kubernetes][4] y la [Configuración del daemon de Kubernetes][5] para obtener una lista completa de las variables de entorno y configuración disponibles.

Luego, [instrumenta tu contenedor de aplicaciones][6] y configura `DD_AGENT_HOST` con el nombre del contenedor de tu Agent.


[1]: https://docs.datadoghq.com/es/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/es/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/es/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/es/agent/kubernetes/apm/?tab=java
[5]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[6]: https://docs.datadoghq.com/es/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Para Configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como anotaciones de pod en el contenedor de tu aplicación. Además de esto, las plantillas también se pueden configurar con [un archivo, un ConfigMap o un almacén de clave-valor][2].

**Anotaciones v1** (para el Datadog Agent v7.36 o anterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.check_names: '["elastic"]'
    ad.datadoghq.com/elasticsearch.init_configs: '[{}]'
    ad.datadoghq.com/elasticsearch.instances: |
      [
        {
          "url": "http://%%host%%:9200"
        }
      ]
spec:
  containers:
    - name: elasticsearch
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.checks: |
      {
        "elastic": {
          "init_config": {},
          "instances": [
            {
              "url": "http://%%host%%:9200"
            }
          ]
        }
      }
spec:
  containers:
    - name: elasticsearch
```

##### Recopilación de logs


La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [Recopilación de logs de Kubernetes][3].

Luego, configura las [integraciones de logs][4] como anotaciones de pod. Esto también se puede configurar con [un archivo, un mapa de configuración o un almacén de clave-valor][5].

**Anotaciones v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.logs: '[{"source":"elasticsearch","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: elasticsearch
```

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con hosts que se ejecutan en la versión 6 o posteriores del Agent, pero requiere configuración adicional para empezar a recopilar trazas.

Variables de entorno requeridas en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | verdadero                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | verdadero |

Para ver una lista completa de las variables de entorno y la configuración disponibles, consulta [Rastreo de aplicaciones Kubernetes][6] y la [configuración del DaemonSet de Kubernetes][7].

Luego, [instrumenta tu contenedor de aplicaciones][8] y configura `DD_AGENT_HOST` con el nombre del contenedor de tu Agent.

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/es/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/es/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/es/agent/kubernetes/log/?tab=daemonset#configuration
[6]: https://docs.datadoghq.com/es/agent/kubernetes/apm/?tab=java
[7]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[8]: https://docs.datadoghq.com/es/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como etiquetas (labels) Docker en el contenedor de tu aplicación:

```json
{
  "containerDefinitions": [{
    "name": "elasticsearch",
    "image": "elasticsearch:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"elastic\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"url\": \"http://%%host%%:9200\"}]"
    }
  }]
}
```

##### Recopilación de logs


La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de ECS][2].

Luego, configura [integraciones de logs][3] como etiquetas Docker:

```json
{
  "containerDefinitions": [{
    "name": "elasticsearch",
    "image": "elasticsearch:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"elasticsearch\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con el Agent v6 o posterior, pero requiere configuración adicional para empezar a recopilar trazas.

Variables de entorno requeridas en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | verdadero                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | verdadero |

Consulta el [Rastreo de aplicaciones de Kubernetes][4] y la [Configuración del daemon de Kubernetes][5] para obtener una lista completa de las variables de entorno y configuración disponibles.

Luego, [instrumenta tu contenedor de aplicaciones][6] y configura `DD_AGENT_HOST` en la [dirección IP privada de EC2][7].


[1]: https://docs.datadoghq.com/es/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/es/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/es/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/es/agent/kubernetes/apm/?tab=java
[5]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[6]: https://docs.datadoghq.com/es/tracing/setup/
[7]: https://docs.datadoghq.com/es/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `elastic` en la sección Checks:

## Datos recopilados

De manera predeterminada, el Agent no envía todas las siguientes métricas. Para enviar todas las métricas, configura indicadores en `elastic.yaml` como se muestra arriba.

- `pshard_stats` envía las métricas **elasticsearch.primaries.\*** y **elasticsearch.indices.count**
- `index_stats` envía la métrica **elasticsearch.index.\***
- `pending_task_stats` envía la métrica **elasticsearch.pending\_\***
- `slm_stats` envía la métrica **elasticsearch.slm.\***
- `cat_allocation_stats` envía métricas de **elasticsearch.disk.\***.

### Métricas
{{< get-metrics-from-git "elastic" >}}


### Eventos

El check de Elasticsearch emite un evento a Datadog cada vez que cambia el estado general de tu clúster de Elasticsearch: rojo, amarillo o verde.

### Checks de servicio
{{< get-service-checks-from-git "elastic" >}}


## Solucionar problemas

- [El Agent no se puede conectar][4]
- [¿Por qué Elasticsearch no envía todas mis métricas?][5]

## Referencias adicionales

- [Cómo monitorizar el rendimiento de Elasticsearch][6]



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/elastic/images/elasticsearch-dash.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/integrations/faq/elastic-agent-can-t-connect/
[5]: https://docs.datadoghq.com/es/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[6]: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics