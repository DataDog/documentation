---
aliases:
- /es/integrations/elastic
app_id: elasticsearch
categories:
- almacenes de datos
- recopilación de logs
- rastreo
custom_kind: integración
description: Monitoriza el estado general del clúster hasta el uso de memoria heap
  de máquinas virtuales Java y todo lo demás.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics
  tag: blog
  text: Monitorización del rendimiento de Elasticsearch
integration_version: 9.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Elasticsearch
---
![Dashboard de Elasticsearch](https://raw.githubusercontent.com/DataDog/integrations-core/master/elastic/images/elasticsearch-dash.png)

## Información general

Mantente actualizado sobre el estado de tu clúster de Elasticsearch, desde su estado general hasta el uso del montón de JVM y todo lo demás. Recibe notificaciones cuando debas reactivar una réplica, añadir capacidad al clúster o modificar su configuración. Después de hacerlo, realiza un seguimiento de cómo responden las métricas de tu clúster.

El check de Elasticsearch del Datadog Agent recopila métricas sobre el rendimiento de la búsqueda e indexación, el uso de memoria y la recolección de elementos sin usar, la disponibilidad de nodos, las estadísticas de partición, el espacio en disco y el rendimiento, las tareas pendientes, y mucho más. El Agent también envía eventos y checks de servicio para conocer el estado general de tu clúster.

## Configuración

### Instalación

El check de Elasticsearch está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `elastic.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus [métricas](#metrics) de Elasticsearch. Consulta el [ejemplo de elastic.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

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

   - Las [etiquetas (tags) de nivel del Agent](https://docs.datadoghq.com/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#file-location) no se aplican a los hosts de un clúster que no ejecuta el Agent. Utiliza etiquetas de nivel de integración en `<integration>.d/conf.yaml` para garantizar que **TODAS** las métricas tengan etiquetas consistentes. Por ejemplo:

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

   - Todas las solicitudes a la API de configuración de Amazon ES deben estar firmadas. Consulta [Realizar y firmar solicitudes de OpenSearch Service](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ac.html#managedomains-signing-service-requests) para obtener más información.

   - El tipo de autenticación de `aws` se basa en [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials) para recopilar las credenciales de AWS de `.aws/credentials` de manera automática. Utiliza `auth_type: basic` en `conf.yaml` y define las credenciales con `username: <USERNAME>` y `password: <PASSWORD>`.

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

     Para obtener más información, consulta [cómo crear o actualizar roles](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-role.html) y [cómo crear o actualizar usuarios](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-user.html).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

###### Consultas personalizadas

La integración de Elasticsearch permite recopilar métricas personalizadas a través de consultas personalizadas utilizando la opción de configuración `custom_queries`. Un endpoint de consulta personalizada puede recopilar múltiples métricas y etiquetas.

Cada consulta personalizada tiene los siguientes parámetros:

- `endpoint` (obligatorio): El endpoint de la API de Elasticsearch que se va a consultar.
- `data_path` (obligatorio): La ruta JSON hasta (sin incluir) la métrica. No puede contener comodines. Por ejemplo: si estás consultando el tamaño de un disyuntor principal, y la ruta completa es `breakers.parent.estimated_size_in_bytes`, entonces `data_path` es `breakers.parent`.
- `columns` (obligatorio): Una lista que representa los datos que se recopilarán de la consulta JSON. Cada elemento de esta lista incluye:
  - `value_path` (obligatorio): La ruta JSON desde `data_path` a la métrica. Esta ruta puede incluir claves de cadena e índices de lista. Por ejemplo: si estás consultando el tamaño de un disyuntor principal, y la ruta completa es `breakers.parent.estimated_size_in_bytes`, entonces `value_path` es `estimated_size_in_bytes`.
  - `name` (obligatorio): El nombre completo de la métrica enviada a Datadog. Si también configuras `type` como `tag`, entonces cada métrica recopilada por esta consulta se etiqueta con este nombre.
  - `type` (opcional): Designa el tipo de datos enviados. Valores posibles: `gauge`, `monotonic_count`, `rate`, `tag`. Por defecto es `gauge`.
- `payload` (opcional): Si se declara, convierte la solicitud GET en una solicitud POST. Utiliza el formato YAML y un usuario de solo lectura al escribir consultas personalizadas con una carga útil.

**Nota:** Cuando ejecutes consultas personalizadas, utiliza una cuenta de solo lectura para asegurarte de que la instancia Elasticsearch no cambia.

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

La consulta personalizada se envía como una solicitud `GET`. Si utilizas un parámetro `payload` opcional, la solicitud se envía como una solicitud `POST`. 

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

1. [Activa la recopilación de trazas (traces) en Datadog](https://docs.datadoghq.com/tracing/send_traces/).
1. [Instrumenta tu aplicación que realiza solicitudes a Elasticsearch](https://docs.datadoghq.com/tracing/setup/).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en el archivo `datadog.yaml` con:

   ```yaml
   logs_enabled: true
   ```

1. Para recopilar logs lentos de búsqueda e indexarlos, [configura tus parámetros de Elasticsearch](https://docs.datadoghq.com/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/). Por defecto, los logs lentos no están activados.

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

1. Añade este bloque de configuración a tu archivo `elastic.d/conf.yaml` para empezar a recopilar tus logs de Elasticsearch:

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

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Docker" %}}

#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Configura [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas (labels) de Docker en el contenedor de tu aplicación:

```yaml
LABEL "com.datadoghq.ad.check_names"='["elastic"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"url": "http://%%host%%:9200"}]'
```

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent . Para activarla, consulta [Recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation).

A continuación, configura [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas (labels) de Docker:

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

Consulta [Rastreo de aplicaciones Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=java) y [Configuración de Kubernetes Daemon](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing) para obtener una lista completa de las variables de entorno y la configuración disponibles.

Luego, [instrumenta el contenedor de tu aplicación](https://docs.datadoghq.com/tracing/setup/) y configura `DD_AGENT_HOST` con el nombre del contenedor de tu Agent.

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

Para Configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes) como anotaciones de pod en el contenedor de tu aplicación. Aparte de esto, las plantillas también se pueden configurar con [un archivo, un mapa de configuración o un almacén de clave-valor](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration).

**Anotaciones v1** (para Datadog Agent \< v7.36)

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

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup).

A continuación, configura [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como anotaciones de pod. Esto también se puede configurar con [un archivo, un mapa de configuración o un almacén de clave-valor](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration).

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

Consulta [Rastreo de aplicaciones Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=java) y [Configuración de Kubernetes Daemon](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing) para obtener una lista completa de las variables de entorno y la configuración disponibles.

Luego, [instrumenta el contenedor de tu aplicación](https://docs.datadoghq.com/tracing/setup/) y configura `DD_AGENT_HOST` con el nombre del contenedor de tu Agent.

{{% /tab %}}

{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Establezca [Autodiscovery Integrations Templates](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas (labels) de Docker en tu contenedor de aplicaciones:

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

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de ECS](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux).

A continuación, configura [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas (labels) de Docker:

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

Consulta [Rastreo de aplicaciones Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=java) y [Configuración de Kubernetes Daemon](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing) para obtener una lista completa de las variables de entorno y la configuración disponibles.

A continuación, [instrumenta tu contenedor de aplicaciones](https://docs.datadoghq.com/tracing/setup/) y configura `DD_AGENT_HOST` en la [dirección IP privada de EC2](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup).

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `elastic` en la sección Checks.

## Datos recopilados

De manera predeterminada, el Agent no envía todas las siguientes métricas. Para enviar todas las métricas, configura indicadores en `elastic.yaml` como se muestra arriba.

- `pshard_stats` envía las métricas **elasticsearch.primaries.\*** y **elasticsearch.indices.count**
- `index_stats` envía la métrica **elasticsearch.index.\***
- `pending_task_stats` envía la métrica **elasticsearch.pending\_\***
- `slm_stats` envía la métrica **elasticsearch.slm.\***
- `cat_allocation_stats` envía métricas de **elasticsearch.disk.\***.

### Métricas

| | |
| --- | --- |
| **elasticsearch.active_primary_shards** <br>(gauge) | Número de fragmentos primarios activos en el clúster.<br>_Se muestra como fragmento_ |
| **elasticsearch.active_shards** <br>(gauge) | Número de fragmentos activos en el clúster.<br>_Se muestra como fragmento_ |
| **elasticsearch.breakers.fielddata.estimated_size_in_bytes** <br>(gauge) | Tamaño estimado en bytes del disyuntor de datos de campo \[v1.4.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.breakers.fielddata.overhead** <br>(gauge) | Multiplicador constante para las estimaciones en bytes del disyuntor de datos de campo \[v1.4.0 o posterior\].|
| **elasticsearch.breakers.fielddata.tripped** <br>(gauge) | Número de veces que se ha disparado el disyuntor de datos de campo \[v1.4.0 o posterior\\].|
| **elasticsearch.breakers.inflight_requests.estimated_size_in_bytes** <br>(gauge) | Tamaño estimado en bytes del disyuntor en proceso \[v5 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.breakers.inflight_requests.overhead** <br>(gauge) | Multiplicador constante para las estimaciones en bytes del disyuntor en vuelo \[v5 o posterior\].|
| **elasticsearch.breakers.inflight_requests.tripped** <br>(gauge) | El número de veces que se ha disparado el interruptor de a bordo \[v5 o posterior\].|
| **elasticsearch.breakers.parent.estimated_size_in_bytes** <br>(gauge) | Tamaño estimado en bytes del disyuntor principal \[v1.4.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.breakers.parent.overhead** <br>(gauge) | Multiplicador constante para las estimaciones en bytes del disyuntor principal \[v1.4.0 o posterior\].|
| **elasticsearch.breakers.parent.tripped** <br>(gauge) | Número de veces que se ha disparado el disyuntor principal.|
| **elasticsearch.breakers.request.estimated_size_in_bytes** <br>(gauge) | Tamaño estimado en bytes del interruptor de solicitudes \[v1.4.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.breakers.request.overhead** <br>(gauge) | Multiplicador constante para las estimaciones en bytes del disyuntor de solicitudes \[v1.4.0 o posterior\].|
| **elasticsearch.breakers.request.tripped** <br>(gauge) | Número de veces que se ha disparado el disyuntor de solicitudes \[v1.4.0 o posterior\].|
| **elasticsearch.cache.field.evictions** <br>(gauge) | Número total de desalojos de la caché de datos de campo \[pre v0.90.5\].<br>_Se muestra como desalojo_ |
| **elasticsearch.cache.field.size** <br>(gauge) | Tamaño de la caché de campo [pre v0.90.5].<br>_Se muestra en bytes_ |
| **elasticsearch.cache.filter.count** <br>(gauge) | Número de elementos en la caché de filtros \[pre v0.90.5\].<br>_Se muestra como elemento_ |
| **elasticsearch.cache.filter.evictions** <br>(gauge) | Número total de desalojos de la caché de filtros \[pre v0.90.5\].<br>_Se muestra como desalojo_ |
| **elasticsearch.cache.filter.evictions.count** <br>(count) | Número total de desalojos de la caché de filtros presentados como un recuento \[v0.90.5 pre 2.0\].<br>_Se muestra como desalojo_ |
| **elasticsearch.cache.filter.size** <br>(gauge) | Tamaño de la caché de filtros \[pre 2.0\].<br>_Se muestra en bytes_ |
| **elasticsearch.cgroup.cpu.stat.number_of_elapsed_periods** <br>(gauge) | Número de periodos de información transcurridos \[v5 o posterior\]|
| **elasticsearch.cgroup.cpu.stat.number_of_times_throttled** <br>(gauge) | Número de veces que todas las tareas en el mismo cgroup que el proceso de Elasticsearch han sido limitadas \[v5 o posterior\]|
| **elasticsearch.cluster_status** <br>(gauge) | Salud del clúster de Elasticsearch como un número: rojo = 0, amarillo = 1, verde = 2|
| **elasticsearch.delayed_unassigned_shards** <br>(gauge) | Número de fragmentos cuya asignación se ha retrasado \[v2.4 o posterior\].<br>_Se muestra como fragmento_ |
| **elasticsearch.disk.avail** <br>(gauge) | Espacio libre en disco disponible para Elasticsearch.<br>_Se muestra en bytes_ |
| **elasticsearch.disk.indices** <br>(gauge) | Espacio en disco utilizado por fragmentos del nodo.<br>_Se muestra en bytes_ |
| **elasticsearch.disk.percent** <br>(gauge) | Porcentaje total de espacio de disco en uso. Calculado como disk.used / disk.total.<br>_Se muestra como porcentaje_. |
| **elasticsearch.disk.total** <br>(gauge) | Espacio total en disco para el nodo, incluyendo el espacio en uso y el disponible.<br>_Se muestra en bytes_ |
| **elasticsearch.disk.used** <br>(gauge) | Espacio total de disco en uso.<br>_Se muestra en bytes_ |
| **elasticsearch.docs.count** <br>(gauge) | Número total de documentos en el clúster en todos los fragmentos.<br>_Se muestra como documento_ |
| **elasticsearch.docs.deleted** <br>(gauge) | Número total de documentos eliminados del clúster en todos los fragmentos.<br>_Se muestra como documento_ |
| **elasticsearch.fielddata.evictions** <br>(gauge) | Número total de desalojos de la caché de datos de campo \[v0.90.5 o posterior\].<br>_Se muestra como desalojo_ |
| **elasticsearch.fielddata.evictions.count** <br>(count) | Número total de desalojos de la caché de datos de campo presentados como un recuento \[v0.90.5 o posterior\].<br>_Se muestra como desalojo_ |
| **elasticsearch.fielddata.size** <br>(gauge) | Tamaño de la caché de datos de campo \[v0.90.5 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.flush.total** <br>(gauge) | Número total de descargas de índices al disco desde el inicio.<br>_Se muestra como descarga_ |
| **elasticsearch.flush.total.count** <br>(count) | Número total de descargas de índices al disco desde el inicio enviados como un recuento.<br>_Se muestra como descarga_ |
| **elasticsearch.flush.total.time** <br>(gauge) | Tiempo total empleado en descargar el índice al disco.<br>_Se muestra en segundos_ |
| **elasticsearch.flush.total.time.count** <br>(count) | Tiempo total empleado en descargar el índice al disco presentado como un recuento.<br>_Se muestra en segundos_ |
| **elasticsearch.fs.total.available_in_bytes** <br>(gauge) | Número total de bytes disponibles para esta máquina virtual Java en este almacén de archivos.<br>_Se muestra en bytes_ |
| **elasticsearch.fs.total.disk_io_op** <br>(gauge) | Total de operaciones de E/S en el almacén de archivos \[v1.0 o posterior\].<br>_Se muestra como operación_ |
| **elasticsearch.fs.total.disk_io_size_in_bytes** <br>(gauge) | Total de bytes utilizados para todas las operaciones de E/S en el almacén de archivos \[v1.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.fs.total.disk_read_size_in_bytes** <br>(gauge) | Total de bytes leídos del almacén de archivos \[v1.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.fs.total.disk_reads** <br>(gauge) | Número total de lecturas del almacén de archivos \[v1.0 o posterior\].<br>_Se muestra como lectura_ |
| **elasticsearch.fs.total.disk_write_size_in_bytes** <br>(gauge) | Total de bytes escritos en el almacén de archivos \[v1.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.fs.total.disk_writes** <br>(gauge) | Número total de escrituras en el almacén de archivos \[v1.0 o posterior\].<br>_Se muestra como escritura_ |
| **elasticsearch.fs.total.free_in_bytes** <br>(gauge) | Número total de bytes sin asignar en el almacén de archivos.<br>_Se muestra en bytes_ |
| **elasticsearch.fs.total.total_in_bytes** <br>(gauge) | Tamaño total en bytes del almacén de archivos.<br>_Se muestra en bytes_ |
| **elasticsearch.get.current** <br>(gauge) | Número de solicitudes GET actualmente en ejecución.<br>_Se muestra como solicitud_ |
| **elasticsearch.get.exists.time** <br>(gauge) | Tiempo total empleado en solicitudes GET en que existía el documento.<br>_Se muestra en segundos_ |
| **elasticsearch.get.exists.time.count** <br>(count) | Tiempo total dedicado a las solicitudes GET en que existía el documento, presentado como un recuento.<br>_Se muestra en segundos_ |
| **elasticsearch.get.exists.total** <br>(gauge) | Número total de solicitudes GET en que existía el documento.<br>_Se muestra como solicitud_ |
| **elasticsearch.get.exists.total.count** <br>(count) | Número total de solicitudes GET en que existía el documento, presentado como un recuento.<br>_Se muestra como solicitud_ |
| **elasticsearch.get.missing.time** <br>(gauge) | Tiempo total empleado en solicitudes GET en que faltaba el documento.<br>_Se muestra en segundos_ |
| **elasticsearch.get.missing.time.count** <br>(count) | Tiempo total empleado en solicitudes GET en que faltaba el documento, presentado en forma de recuento.<br>_Se muestra en segundos_ |
| **elasticsearch.get.missing.total** <br>(gauge) | Número total de solicitudes GET en que faltaba el documento.<br>_Se muestra como solicitud_ |
| **elasticsearch.get.missing.total.count** <br>(count) | Número total de solicitudes GET en que faltaba el documento, presentado como un recuento.<br>_Se muestra como solicitud_ |
| **elasticsearch.get.time** <br>(gauge) | Tiempo total dedicado a solicitudes GET.<br>_Se muestra en segundos_ |
| **elasticsearch.get.time.count** <br>(count) | Tiempo total dedicado a solicitudes GET enviadas en forma de recuento.<br>_Se muestra en segundos_ |
| **elasticsearch.get.total** <br>(gauge) | Número total de solicitudes GET<br>_Se muestra como solicitud_ |
| **elasticsearch.get.total.count** <br>(count) | Número total de solicitudes GET enviadas en forma de recuento.<br>_Se muestra como solicitud_ |
| **elasticsearch.http.current_open** <br>(gauge) | Número de conexiones HTTP abiertas actualmente.<br>_Se muestra como conexión_ |
| **elasticsearch.http.total_opened** <br>(gauge) | Número total de conexiones HTTP abiertas.<br>_Se muestra como conexión_ |
| **elasticsearch.http.total_opened.count** <br>(count) | Número total de conexiones HTTP abiertas presentadas como un recuento.<br>_Se muestra como conexión_ |
| **elasticsearch.id_cache.size** <br>(gauge) | Tamaño de la caché de ID \[v0.90.5 pre 2.0\].<br>_Se muestra en bytes_ |
| **elasticsearch.index.docs.count** <br>(gauge) | Número de documentos en el índice<br>_Se muestra como documento_ |
| **elasticsearch.index.docs.deleted** <br>(gauge) | Número de documentos eliminados en el índice<br>_Se muestra como documento_ |
| **elasticsearch.index.health** <br>(gauge) | Estado del índice como número: verde = 0, amarillo = 1, rojo = 2|
| **elasticsearch.index.health.reverse** <br>(gauge) | Estado del índice como número: rojo = 0, amarillo = 1, verde = 2|
| **elasticsearch.index.primary_shards** <br>(gauge) | Número de fragmentos primarios en el índice<br>_Se muestra como fragmento_ |
| **elasticsearch.index.primary_store_size** <br>(gauge) | Tamaño de almacenamiento de fragmentos primarios en el índice<br>_Se muestra en bytes_ |
| **elasticsearch.index.replica_shards** <br>(gauge) | Número de fragmentos de réplica en el índice<br>_Se muestra como fragmento_ |
| **elasticsearch.index.search.query.time** <br>(gauge) | Tiempo en milisegundos empleado en realizar operaciones de consulta<br>_Se muestra en milisegundos_ |
| **elasticsearch.index.search.query.total** <br>(gauge) | Número total de operaciones de consulta|
| **elasticsearch.index.store_size** <br>(gauge) | Tamaño de almacenamiento de fragmentos primarios y de réplica en el índice<br>_Se muestra en bytes_ |
| **elasticsearch.indexing.delete.current** <br>(gauge) | Número de documentos que se están eliminando actualmente de un índice.<br>_Se muestra como documento_ |
| **elasticsearch.indexing.delete.time** <br>(gauge) | Tiempo total empleado en eliminar documentos de un índice.<br>_Se muestra en segundos_ |
| **elasticsearch.indexing.delete.time.count** <br>(count) | Tiempo total empleado en eliminar documentos de un índice, presentado en forma de recuento.<br>_Se muestra en segundos_ |
| **elasticsearch.indexing.delete.total** <br>(gauge) | Número total de documentos eliminados de un índice.<br>_Se muestra como documento_ |
| **elasticsearch.indexing.delete.total.count** <br>(count) | Número total de documentos eliminados de un índice, presentado en forma de recuento.<br>_Se muestra como documento_ |
| **elasticsearch.indexing.index.current** <br>(gauge) | Número de documentos actualmente indexados en un índice.<br>_Se muestra como documento_ |
| **elasticsearch.indexing.index.time** <br>(gauge) | Tiempo total empleado en indexar documentos en un índice.<br>_Se muestra en segundos_ |
| **elasticsearch.indexing.index.time.count** <br>(count) | Tiempo total empleado en indexar documentos en un índice, presentado en forma de recuento.<br>_Se muestra en segundos_ |
| **elasticsearch.indexing.index.total** <br>(gauge) | Número total de documentos indexados en un índice.<br>_Se muestra como documento_ |
| **elasticsearch.indexing.index.total.count** <br>(count) | Número total de documentos indexados en un índice, presentado en forma de recuento.<br>_Se muestra como documento_ |
| **elasticsearch.indexing_pressure.memory.current.all_in_bytes** <br>(gauge) | Memoria consumida, en bytes, por las solicitudes de indexación en la etapa de coordinación, primaria o de réplica \[v7.9 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.current.combined_coordinating_and_primary_in_bytes** <br>(gauge) | Memoria consumida, en bytes, por las solicitudes de indexación en la etapa de coordinación o primaria. Este valor no es la suma de coordinación y primaria, ya que un nodo puede reutilizar la memoria de la coordinación si la etapa primaria se ejecuta localmente \[v7.9 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.current.coordinating_in_bytes** <br>(gauge) | Memoria consumida por las solicitudes de indexación en la etapa de coordinación \[v7.9 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.current.primary_in_bytes** <br>(gauge) | Memoria consumida por las solicitudes de indexación en la etapa primaria \[v7.9 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.current.replica_in_bytes** <br>(gauge) | Memoria consumida por solicitudes de indexación en la etapa de réplica \[v7.9 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.limit_in_bytes** <br>(gauge) | Límite de memoria configurado, en bytes, para solicitudes de indexación. Las solicitudes de réplica tienen un límite automático que es 1,5 veces este valor \[v7.10 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.total.all_in_bytes** <br>(gauge) | Memoria consumida, en bytes, por solicitudes de indexación en la etapa de coordinación, primaria o de réplica \[v7.9 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.total.combined_coordinating_and_primary_in_bytes** <br>(gauge) | Memoria consumida, en bytes, por las solicitudes de indexación en la etapa de coordinación o primaria. Este valor no es la suma de coordinación y primaria, ya que un nodo puede reutilizar la memoria de la coordinación si la etapa primaria se ejecuta localmente \[v7.9 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.total.coordinating_in_bytes** <br>(gauge) | Memoria consumida por las solicitudes de indexación en la etapa de coordinación \[v7.9 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.total.coordinating_rejections** <br>(gauge) | Número de solicitudes de indexación rechazadas en la etapa de coordinación \[v7.9 o posterior\].<br>_Se muestra como solicitud_ |
| **elasticsearch.indexing_pressure.memory.total.primary_in_bytes** <br>(gauge) | Memoria consumida por las solicitudes de indexación en la etapa primaria \[v7.9 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.total.primary_rejections** <br>(gauge) | Número de solicitudes de indexación rechazadas en la etapa primaria \[v7.9 o posterior\].<br>_Se muestra como solicitud_ |
| **elasticsearch.indexing_pressure.memory.total.replica_in_bytes** <br>(gauge) | Memoria consumida por las solicitudes de indexación en la etapa de réplica \[v7.9 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indexing_pressure.memory.total.replica_rejections** <br>(gauge) | Número de solicitudes de indexación rechazadas en la etapa de réplica \[v7.9 o posterior\].<br>_Se muestra como solicitud_ |
| **elasticsearch.indices.count** <br>(gauge) | Número de índices en el cluster.<br>_Se muestra como índice_ |
| **elasticsearch.indices.indexing.index_failed** <br>(gauge) | Número de operaciones de indexación fallidas \[v2.1 o posterior\].|
| **elasticsearch.indices.indexing.index_failed.count** <br>(count) | Número de operaciones de indexación fallidas presentadas en forma de recuento \[v2.1 o posterior\].|
| **elasticsearch.indices.indexing.throttle_time** <br>(gauge) | Tiempo total que la indexación ha esperado debido a la limitación \[v1.4.0 o posterior\].<br>_Se muestra en milisegundos_ |
| **elasticsearch.indices.indexing.throttle_time.count** <br>(count) | Tiempo total de espera que la indexación ha esperado debido a la limitación, presentado en forma de recuento \[v1.4.0 o posterior\].<br>_Se muestra en milisegundos_ |
| **elasticsearch.indices.query_cache.cache_count** <br>(count) | \[v2.0 o posterior\].|
| **elasticsearch.indices.query_cache.cache_size** <br>(gauge) | \[v2.0 o posterior\].|
| **elasticsearch.indices.query_cache.evictions** <br>(gauge) | Número de desalojos de la caché de consultas \[v1.4.0 o posterior\].<br>_Se muestra como desalojo_ |
| **elasticsearch.indices.query_cache.evictions.count** <br>(count) | Número de desalojos de la caché de consultas enviados en forma de recuento \[v1.4.0 o posterior\].<br>_Se muestra como desalojo_ |
| **elasticsearch.indices.query_cache.hit_count** <br>(gauge) | Número de aciertos en la caché de consultas \[v1.4.0 o posterior\].<br>_Se muestra como acierto_ |
| **elasticsearch.indices.query_cache.hit_count.count** <br>(count) | El número de aciertos en la caché de consultas enviados en forma de recuento \[v1.4.0 o posterior\].<br>_Se muestra como acierto_ |
| **elasticsearch.indices.query_cache.memory_size_in_bytes** <br>(gauge) | Memoria utilizada por la caché de consultas \[v1.4.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indices.query_cache.miss_count** <br>(gauge) | Número de fallos de la caché de consultas \[v1.4.0 o posterior\].<br>_Se muestra como fallo_ |
| **elasticsearch.indices.query_cache.miss_count.total** <br>(count) | Número de fallos de la caché de consultas \[v1.4.0 o posterior\].<br>_Se muestra como fallo_ |
| **elasticsearch.indices.query_cache.total_count** <br>(count) | \[v2.0 o posterior\].|
| **elasticsearch.indices.recovery.current_as_source** <br>(gauge) | Número de recuperaciones en curso para las que un fragmento sirve como fuente \[v1.5.0 o posterior\].|
| **elasticsearch.indices.recovery.current_as_target** <br>(gauge) | Número de recuperaciones en curso para las que un fragmento sirve como destino.|
| **elasticsearch.indices.recovery.throttle_time** <br>(gauge) | Tiempo total que las recuperaciones han esperado debido a la limitación \[v1.5.0 o posterior\].<br>_Se muestra en milisegundos_ |
| **elasticsearch.indices.recovery.throttle_time.count** <br>(count) | Tiempo total que las recuperaciones han esperado debido a la limitación, presentado en forma de recuento \[v1.4.0 o posterior\].<br>_Se muestra en milisegundos_ |
| **elasticsearch.indices.request_cache.evictions** <br>(gauge) | Número de desalojos de la caché de solicitudes \[v2.0 o posterior\].<br>_Se muestra como desalojo_ |
| **elasticsearch.indices.request_cache.evictions.count** <br>(count) | Número de desalojos de la caché de desalojos enviados en forma de recuento \[v2.0 o posterior\].<br>_Se muestra como desalojo_ |
| **elasticsearch.indices.request_cache.hit_count** <br>(gauge) | Número de aciertos en la caché de consultas \[v2.0 o posterior\].<br>_Se muestra como acierto_ |
| **elasticsearch.indices.request_cache.hit_count.count** <br>(count) | Número de aciertos de la caché enviados en forma de recuento \[v2.0 o posterior\].<br>_Se muestra como acierto_ |
| **elasticsearch.indices.request_cache.memory_size_in_bytes** <br>(gauge) | Memoria utilizada por la caché de solicitudes \[v2.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indices.request_cache.miss_count** <br>(gauge) | Número de fallos de la caché de solicitudes \[v2.0+\].<br>_Se muestra como fallo_ |
| **elasticsearch.indices.request_cache.miss_count.count** <br>(count) | Número de fallos de la caché de solicitudes presentados en forma de recuento \[v2.0+\].<br>_Se muestra como fallo_ |
| **elasticsearch.indices.segments.count** <br>(gauge) | Número de segmentos en un fragmento de índice.<br>_Se muestra como segmento_ |
| **elasticsearch.indices.segments.doc_values_memory_in_bytes** <br>(gauge) | Memoria utilizada por valores de documentos.<br>_Se muestra en bytes_ |
| **elasticsearch.indices.segments.fixed_bit_set_memory_in_bytes** <br>(gauge) | Memoria utilizada por el conjunto de bits fijos \[v1.4.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indices.segments.index_writer_max_memory_in_bytes** <br>(gauge) | Memoria máxima utilizada por el escritor de índices \[v1.4.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indices.segments.index_writer_memory_in_bytes** <br>(gauge) | Memoria utilizada por el escritor de índices \[v1.3.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indices.segments.memory_in_bytes** <br>(gauge) | Memoria utilizada por segmentos de índice.<br>_Se muestra en bytes_ |
| **elasticsearch.indices.segments.norms_memory_in_bytes** <br>(gauge) | Memoria utilizada por normas \[v2.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indices.segments.stored_fields_memory_in_bytes** <br>(gauge) | Memoria utilizada por campos almacenados \[v2.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indices.segments.term_vectors_memory_in_bytes** <br>(gauge) | Memoria utilizada por vectores de términos.<br>_Se muestra en bytes_ |
| **elasticsearch.indices.segments.terms_memory_in_bytes** <br>(gauge) | Memoria utilizada por términos \[v2.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indices.segments.version_map_memory_in_bytes** <br>(gauge) | Memoria utilizada por el mapa de la versión del segmento \[v1.3.0 o posterior\].<br>_Se muestra en bytes_ |
| **elasticsearch.indices.translog.operations** <br>(gauge) | Número de operaciones del log de transacciones.<br>_Se muestra como operación_ |
| **elasticsearch.indices.translog.size_in_bytes** <br>(gauge) | Tamaño del log de transacciones.<br>_Se muestra en bytes_ |
| **elasticsearch.initializing_shards** <br>(gauge) | Número de fragmentos que se están inicializando actualmente.<br>_Se muestra como fragmento_ |
| **elasticsearch.merges.current** <br>(gauge) | Número de fusiones de segmentos actualmente activas.<br>_Se muestra como fusión_ |
| **elasticsearch.merges.current.docs** <br>(gauge) | Número de documentos en los segmentos que se están fusionando actualmente.<br>_Se muestra como documento_ |
| **elasticsearch.merges.current.size** <br>(gauge) | Tamaño de los segmentos que se están fusionando actualmente.<br>_Se muestra en bytes_ |
| **elasticsearch.merges.total** <br>(gauge) | Número total de fusiones de segmentos.<br>_Se muestra como fusión_ |
| **elasticsearch.merges.total.count** <br>(count) | Número total de fusiones de segmentos enviados en forma de recuento.<br>_Se muestra como fusión_ |
| **elasticsearch.merges.total.docs** <br>(gauge) | Número total de documentos de todos los segmentos fusionados.<br>_Se muestra como documento_ |
| **elasticsearch.merges.total.docs.count** <br>(count) | Número total de documentos de todos los segmentos fusionados presentados en forma de recuento.<br>_Se muestra como documento_ |
| **elasticsearch.merges.total.size** <br>(gauge) | El tamaño total de todos los segmentos fusionados.<br>_Se muestra como byte_ |
| **elasticsearch.merges.total.size.count** <br>(count) | Tamaño total de todos los segmentos fusionados presentados en forma de recuento.<br>_Se muestra en bytes_ |
| **elasticsearch.merges.total.time** <br>(gauge) | Tiempo total empleado en fusionar segmentos.<br>_Se muestra en segundos_ |
| **elasticsearch.merges.total.time.count** <br>(count) | Tiempo total empleado en fusionar segmentos presentado en forma de recuento.<br>_Se muestra en segundos_ |
| **elasticsearch.number_of_data_nodes** <br>(gauge) | Número de nodos de datos en el clúster.<br>_Se muestra como nodo_ |
| **elasticsearch.number_of_nodes** <br>(gauge) | Número total de nodos en el clúster<br>_Se muestra como nodo_ |
| **elasticsearch.pending_tasks_priority_high** <br>(gauge) | Número de tareas pendientes de alta prioridad.<br>_Se muestra como tarea_ |
| **elasticsearch.pending_tasks_priority_urgent** <br>(gauge) | Número de tareas pendientes de prioridad urgente.<br>_Se muestra como tarea_ |
| **elasticsearch.pending_tasks_time_in_queue** <br>(gauge) | Tiempo medio empleado por las tareas en la cola.<br>_Se muestra en milisegundos_ |
| **elasticsearch.pending_tasks_total** <br>(gauge) | Número total de tareas pendientes.<br>_Se muestra como tarea_ |
| **elasticsearch.primaries.docs.count** <br>(gauge) | Número total de documentos en los fragmentos primarios.<br>_Se muestra como documento_ |
| **elasticsearch.primaries.docs.deleted** <br>(gauge) | Número total de documentos eliminados de fragmentos primarios.<br>_Se muestra como documento_ |
| **elasticsearch.primaries.flush.total** <br>(gauge) | Número total de descargas de índices al disco desde fragmentos primarios desde el inicio.<br>_Se muestra como descarga_ |
| **elasticsearch.primaries.flush.total.time** <br>(gauge) | Tiempo total empleado en enviar el índice al disco desde fragmentos primarios.<br>_Se muestra en segundos_ |
| **elasticsearch.primaries.get.current** <br>(gauge) | Número de solicitudes GET que se están ejecutando actualmente en fragmentos primarios.<br>_Se muestra como solicitud_ |
| **elasticsearch.primaries.get.exists.time** <br>(gauge) | Tiempo total empleado en solicitudes GET de los fragmentos primarios en que existía el documento.<br>_Se muestra como solicitud_ |
| **elasticsearch.primaries.get.exists.total** <br>(gauge) | Número total de solicitudes GET en fragmentos primarios en que existía el documento.<br>_Se muestra como solicitud_ |
| **elasticsearch.primaries.get.missing.time** <br>(gauge) | Tiempo total empleado en solicitudes GET de los fragmentos primarios en que faltaba el documento.<br>_Se muestra como solicitud_ |
| **elasticsearch.primaries.get.missing.total** <br>(gauge) | Número total de solicitudes GET de los fragmentos primarios en que faltaba el documento.<br>_Se muestra como solicitud_ |
| **elasticsearch.primaries.get.time** <br>(gauge) | Tiempo total empleado en las solicitudes GET de los fragmentos primarios.<br>_Se muestra en segundos_ |
| **elasticsearch.primaries.get.total** <br>(gauge) | Número total de solicitudes GET de los fragmentos primarios.<br>_Se muestra como solicitud_ |
| **elasticsearch.primaries.indexing.delete.current** <br>(gauge) | Número de documentos que se están eliminando actualmente de un índice en los fragmentos primarios.<br>_Se muestra como documento_ |
| **elasticsearch.primaries.indexing.delete.time** <br>(gauge) | Tiempo total empleado en eliminar documentos de un índice en los fragmentos primarios.<br>_Se muestra en segundos_ |
| **elasticsearch.primaries.indexing.delete.total** <br>(gauge) | Número total de documentos eliminados de un índice en los fragmentos primarios.<br>_Se muestra como documento_ |
| **elasticsearch.primaries.indexing.index.current** <br>(gauge) | Número de documentos indexados actualmente en un índice de los fragmentos primarios.<br>_Se muestra como documento_ |
| **elasticsearch.primaries.indexing.index.time** <br>(gauge) | Tiempo total empleado en indexar documentos en un índice en los fragmentos primarios.<br>_Se muestra en segundos_ |
| **elasticsearch.primaries.indexing.index.total** <br>(gauge) | Número total de documentos indexados en un índice en los fragmentos primarios.<br>_Se muestra como documento_ |
| **elasticsearch.primaries.merges.current** <br>(gauge) | Número de fusiones de segmentos actualmente activas en los fragmentos primarios.<br>_Se muestra como fusión_ |
| **elasticsearch.primaries.merges.current.docs** <br>(gauge) | Número de documentos de segmentos que se están fusionando actualmente en los fragmentos primarios.<br>_Se muestra como documento_ |
| **elasticsearch.primaries.merges.current.size** <br>(gauge) | Tamaño de los segmentos que se están fusionando actualmente en los fragmentos primarios.<br>_Se muestra en bytes_ |
| **elasticsearch.primaries.merges.total** <br>(gauge) | Número total de fusiones de segmentos en los fragmentos primarios.<br>_Se muestra como fusión_ |
| **elasticsearch.primaries.merges.total.docs** <br>(gauge) | Número total de documentos de todos los segmentos fusionados en los fragmentos primarios.<br>_Se muestra como documento_ |
| **elasticsearch.primaries.merges.total.size** <br>(gauge) | Tamaño total de todos los segmentos fusionados en los fragmentos primarios.<br>_Se muestra en bytes_ |
| **elasticsearch.primaries.merges.total.time** <br>(gauge) | Tiempo total empleado en fusionar segmentos en los fragmentos primarios.<br>_Se muestra en segundos_ |
| **elasticsearch.primaries.refresh.external.total** <br>(gauge) | Número total de actualizaciones de índices externos en los fragmentos primarios.<br>_Se muestra como actualización_ |
| **elasticsearch.primaries.refresh.external.total.time** <br>(gauge) | Tiempo total empleado en las actualizaciones de índices externos en los fragmentos primarios.<br>_Se muestra en segundos_ |
| **elasticsearch.primaries.refresh.total** <br>(gauge) | Número total de actualizaciones de índices en los fragmentos primarios.<br>_Se muestra como actualización_ |
| **elasticsearch.primaries.refresh.total.time** <br>(gauge) | Tiempo total empleado en las actualizaciones de índices en los fragmentos primarios.<br>_Se muestra en segundos_ |
| **elasticsearch.primaries.search.fetch.current** <br>(gauge) | Número de recuperaciones de consultas que se están ejecutando actualmente en los fragmentos primarios.<br>_Se muestra como recuperación_ |
| **elasticsearch.primaries.search.fetch.time** <br>(gauge) | Tiempo total empleado en recuperaciones de consultas en los fragmentos primarios.<br>_Se muestra en segundos_ |
| **elasticsearch.primaries.search.fetch.total** <br>(gauge) | Número total de recuperaciones de consultas en los fragmentos primarios.<br>_Se muestra como recuperación_ |
| **elasticsearch.primaries.search.query.current** <br>(gauge) | Número de consultas activas actualmente en los fragmentos primarios.<br>_Se muestra como consulta_ |
| **elasticsearch.primaries.search.query.time** <br>(gauge) | Tiempo total empleado en consultar los fragmentos primarios.<br>_Se muestra en segundos_ |
| **elasticsearch.primaries.search.query.total** <br>(gauge) | Número total de consultas a los shards primarios.<br>_Se muestra como consulta_ |
| **elasticsearch.primaries.store.size** <br>(gauge) | Tamaño total de todos los fragmentos primarios.<br>_Se muestra en bytes_ |
| **elasticsearch.process.cpu.percent** <br>(gauge) | Uso de la CPU en porcentaje o -1 si no se conoce en el momento de calcular las estadísticas \[v5 o posterior\]<br>_Se muestra como porcentaje_ |
| **elasticsearch.process.open_fd** <br>(gauge) | Número de descriptores de archivo abiertos asociados con el proceso actual, o -1 si no es compatible.<br>_Se muestra como archivo_ |
| **elasticsearch.refresh.external.total** <br>(gauge) | Número total de actualizaciones de índices externos \[v7.2 o posterior\].<br>_Se muestra como actualización_ |
| **elasticsearch.refresh.external.total.time** <br>(gauge) | Tiempo total empleado en las actualizaciones del índice externo \[v7.2 o posterior\].<br>_Se muestra en segundos_ |
| **elasticsearch.refresh.total** <br>(gauge) | Número total de actualizaciones del índice.<br>_Se muestra como actualización_ |
| **elasticsearch.refresh.total.count** <br>(count) | Número total de actualizaciones del índice presentadas en forma de recuento.<br>_Se muestra como actualización_ |
| **elasticsearch.refresh.total.time** <br>(gauge) | Tiempo total empleado en las actualizaciones del índice.<br>_Se muestra en segundos_ |
| **elasticsearch.refresh.total.time.count** <br>(count) | Tiempo total empleado en las actualizaciones del índice presentado en forma de recuento.<br>_Se muestra en segundos_ |
| **elasticsearch.relocating_shards** <br>(gauge) | Número de fragmentos que se están reubicando de un nodo a otro.<br>_Se muestra como fragmento_ |
| **elasticsearch.search.fetch.current** <br>(gauge) | Número de recuperaciones de búsquedas en ejecución.<br>_Se muestra como recuperación_ |
| **elasticsearch.search.fetch.open_contexts** <br>(gauge) | Número de búsquedas activas \[v0.90.5 o posterior\].<br>_Se muestra como consulta_ |
| **elasticsearch.search.fetch.time** <br>(gauge) | Tiempo total empleado en recuperaciones de búsquedas.<br>_Se muestra en segundos_ |
| **elasticsearch.search.fetch.time.count** <br>(count) | Tiempo total empleado en la recuperación de búsquedas presentada en forma de recuento.<br>_Se muestra en segundos_ |
| **elasticsearch.search.fetch.total** <br>(gauge) | Número total de recuperaciones de búsquedas.<br>_Se muestra como recuperación_ |
| **elasticsearch.search.fetch.total.count** <br>(count) | Número total de recuperaciones de búsquedas enviadas en forma de recuento.<br>_Se muestra como recuperación_ |
| **elasticsearch.search.query.current** <br>(gauge) | Número de consultas activas actualmente.<br>_Se muestra como consulta_ |
| **elasticsearch.search.query.time** <br>(gauge) | Tiempo total dedicado a las consultas.<br>_Se muestra en segundos_ |
| **elasticsearch.search.query.time.count** <br>(count) | Tiempo total dedicado a las consultas enviadas en forma de recuento.<br>_Se muestra en segundos_ |
| **elasticsearch.search.query.total** <br>(gauge) | Número total de consultas.<br>_Se muestra como consulta_ |
| **elasticsearch.search.query.total.count** <br>(count) | Número total de consultas enviadas en forma de recuento.<br>_Se muestra como consulta_ |
| **elasticsearch.search.scroll.current** <br>(gauge) | Número de consultas de desplazamiento actualmente activas \[v5 o posterior\].<br>_Se muestra como consulta_ |
| **elasticsearch.search.scroll.time** <br>(gauge) | Tiempo total dedicado a las consultas de desplazamiento \[v5 o posterior\].<br>_Se muestra en segundos_ |
| **elasticsearch.search.scroll.time.count** <br>(count) | Tiempo total dedicado a las consultas de desplazamiento presentadas en forma de recuento \[v5 o posterior\].<br>_Se muestra en segundos_ |
| **elasticsearch.search.scroll.total** <br>(gauge) | Número total de consultas de desplazamiento \[v5 o posterior\].<br>_Se muestra como consulta_ |
| **elasticsearch.search.scroll.total.count** <br>(count) | Número total de consultas de desplazamiento presentadas en forma de recuento \[v5 o posterior\].<br>_Se muestra como consulta_ |
| **elasticsearch.shards** <br>(gauge) | Número de fragmentos primarios y de réplica asignados al nodo.<br>_Se muestra como fragmento_ |
| **elasticsearch.slm.snapshot_deletion_failures** <br>(gauge) | Número total de fallos en la eliminación de snapshots.<br>_Se muestra como error_ |
| **elasticsearch.slm.snapshots_deleted** <br>(gauge) | Número total de snapshots eliminados.|
| **elasticsearch.slm.snapshots_failed** <br>(gauge) | Número total de snapshots fallidos.<br>_Se muestra como error_ |
| **elasticsearch.slm.snapshots_taken** <br>(gauge) | Número total de snapshots.|
| **elasticsearch.store.size** <br>(gauge) | Tamaño total en bytes del almacén.<br>_Se muestra en bytes_ |
| **elasticsearch.templates.count** <br>(gauge) | Número total de plantillas en el clúster.<br>_Se muestra como documento_ |
| **elasticsearch.thread_pool.bulk.active** <br>(gauge) | Número de subprocesos activos en el grupo de subprocesos a granel \[v\<6.3\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.bulk.completed** <br>(gauge) | Número de subprocesos completados en el grupo de subprocesos a granel \[v\<6.3\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.bulk.completed.count** <br>(count) | Número de subprocesos completados en el grupo de subprocesos a granel presentados en forma de recuento \[v\<6.3\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.bulk.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de subprocesos a granel [v\<6.3\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.bulk.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de subprocesos a granel \[v\<6.3\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.bulk.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo de subprocesos a granel presentados en forma de recuento \[v\<6.3\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.bulk.threads** <br>(gauge) | Número total de subprocesos en el grupo de subprocesos a granel \[v\<6.3\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.bulk.threads.count** <br>(count) | Número total de subprocesos en el grupo de subprocesos a granel presentados en forma de recuento \[v\<6.3\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.fetch_shard_started.active** <br>(gauge) | Número de subprocesos activos en el grupo de fragmentos de recuperación iniciado \[v1.6.0 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.fetch_shard_started.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de fragmentos de recuperación iniciado \[v1.6.0 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.fetch_shard_started.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de fragmentos de recuperación iniciado \[v1.6.0 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.fetch_shard_started.threads** <br>(gauge) | Número total de subprocesos en el grupo de fragmentos de recuperación iniciado \[v1.6.0 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.fetch_shard_store.active** <br>(gauge) | Número de subprocesos activos en el grupo de fragmentos de recuperación almacenado.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.fetch_shard_store.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de fragmentos de recuperación almacenado \[v1.6.0 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.fetch_shard_store.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de fragmentos de recuperación almacenado \[v1.6.0 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.fetch_shard_store.threads** <br>(gauge) | Número total de subprocesos en el grupo de fragmentos de recuperación almacenado \[v1.6.0 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.flush.active** <br>(gauge) | Número de subprocesos activos en la cola de descarga.<br>__Se muestra como subproceso_ |
| **elasticsearch.thread_pool.flush.completed** <br>(gauge) | Número de subprocesos completados en el grupo de descarga.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.flush.completed.count** <br>(count) | Número de subprocesos completados en el grupo de descarga presentado en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.flush.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de descarga.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.flush.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de descarga.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.flush.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo de descarga presentado en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.flush.threads** <br>(gauge) | Número total de subprocesos en la cola de descarga.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.flush.threads.count** <br>(count) | Número total de subprocesos en el grupo de descarga presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.force_merge.active** <br>(gauge) | Número de subprocesos activos para las operaciones de fusión forzada \[v2.1 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.force_merge.queue** <br>(gauge) | Número de subprocesos en cola para las operaciones de fusión forzada \[v2.1 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.force_merge.rejected** <br>(gauge) | Número de subprocesos rechazados para las operaciones de fusión forzada \[v2.1 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.force_merge.rejected.count** <br>(count) | Número de subprocesos rechazados para las operaciones de fusión forzada enviados en forma de recuento \[v2.1 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.force_merge.threads** <br>(gauge) | Número total de subprocesos para las operaciones de fusión forzada \[v2.1 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.generic.active** <br>(gauge) | Número de subprocesos activos en el grupo genérico.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.generic.completed** <br>(gauge) | Número de subprocesos completados en el grupo genérico.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.generic.completed.count** <br>(count) | Número de subprocesos completados en el grupo genérico presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.generic.queue** <br>(gauge) | Número de subprocesos en cola en el grupo genérico.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.generic.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo genérico.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.generic.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo genérico presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.generic.threads** <br>(gauge) | Número total de subprocesos en el grupo genérico.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.generic.threads.count** <br>(count) | Número total de subprocesos en el grupo genérico presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.get.active** <br>(gauge) | Número de subprocesos activos en el grupo GET.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.get.completed** <br>(gauge) | Número de subprocesos completados en el grupo GET.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.get.completed.count** <br>(count) | Número de subprocesos completados en el grupo GET presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.get.queue** <br>(gauge) | Número de subprocesos en cola en el grupo GET.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.get.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo GET.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.get.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo GET presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.get.threads** <br>(gauge) | Número total de subprocesos en el grupo GET.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.get.threads.count** <br>(count) | Número total de subprocesos en el grupo GET presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.index.active** <br>(gauge) | Número de subprocesos activos en el grupo de índices \[v\<7.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.index.completed** <br>(gauge) | Número de subprocesos completados en el grupo de índices \[v\<7.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.index.completed.count** <br>(count) | Número de subprocesos completados en el grupo de índices presentados en forma de recuento \[v\<6.3\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.index.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de índices \[v\<7.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.index.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de índices \[v\<7.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.index.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo de índices presentados en forma de recuento \[v\<7.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.index.threads** <br>(gauge) | Número total de subprocesos en el grupo de índices \[v\<7.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.index.threads.count** <br>(count) | Número total de subprocesos en el grupo de índices presentados en forma de recuento \[v\<7.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.listener.active** <br>(gauge) | Número de subprocesos activos en el grupo de escuchas.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.listener.completed** <br>(gauge) | Número de subprocesos completados en el grupo de escuchas.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.listener.completed.count** <br>(count) | Número de subprocesos completados en el grupo de escuchas presentado en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.listener.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de escuchas \[v1.4.0 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.listener.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de escuchas \[v1.4.0 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.listener.rejected.count** <br>(count) | El número de hilos rechazados en el grupo de oyentes presentado como un recuento \[v1.4.0+\].<br>_Mostrado como hilo_ |
| **elasticsearch.thread_pool.listener.threads** <br>(gauge) | Número total de subprocesos en el grupo de escuchas \[v1.4.0+\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.listener.threads.count** <br>(count) | Número total de subprocesos en el grupo de escuchas presentados en forma de recuento \[v1.4.0+\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.management.active** <br>(gauge) | Número de subprocesos activos en el grupo de gestión.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.management.completed** <br>(gauge) | Número de subprocesos completados en el grupo de gestión.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.management.completed.count** <br>(count) | Número de subprocesos completados en el grupo de gestión presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.management.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de gestión.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.management.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de gestión.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.management.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo de gestión presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.management.threads** <br>(gauge) | Número total de subprocesos en el grupo de gestión.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.management.threads.count** <br>(count) | Número total de subprocesos en el grupo de gestión presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.merge.active** <br>(gauge) | Número de subprocesos activos en el grupo de fusión \[v\<2.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.merge.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de fusión \[v\<2.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.merge.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de fusión \[v\<2.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.merge.threads** <br>(gauge) | Número total de subprocesos en el grupo de fusión \[v\<2.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.percolate.active** <br>(gauge) | Número de subprocesos activos en el grupo de percolación \[v\<5.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.percolate.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de percolación \[v\<5.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.percolate.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de percolación \[v\<5.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.percolate.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo de percolación presentados en forma de recuento \[v\<5.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.percolate.threads** <br>(gauge) | Número total de subprocesos en el grupo de percolación \[v\<5.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.refresh.active** <br>(gauge) | Número de subprocesos activos en el grupo de actualización.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.refresh.completed** <br>(gauge) | Número de subprocesos completados en el grupo de actualización.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.refresh.completed.count** <br>(count) | Número de subprocesos completados en el grupo de actualización presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.refresh.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de actualización.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.refresh.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de actualización.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.refresh.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo de actualización presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.refresh.threads** <br>(gauge) | Número total de subprocesos en el grupo de actualización.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.refresh.threads.count** <br>(count) | Número total de subprocesos en el grupo de actualización presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.search.active** <br>(gauge) | Número de subprocesos activos en el grupo de búsqueda.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.search.completed** <br>(gauge) | Número de subprocesos completados en el grupo de búsqueda.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.search.completed.count** <br>(count) | Número de subprocesos completados en el grupo de búsqueda presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.search.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de búsqueda.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.search.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de búsqueda.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.search.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo de búsqueda presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.search.threads** <br>(gauge) | Número total de subprocesos en el grupo de búsqueda.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.search.threads.count** <br>(count) | Número total de subprocesos en el grupo de búsqueda presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.snapshot.active** <br>(gauge) | Número de subprocesos activos en el grupo de snapshots.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.snapshot.completed** <br>(gauge) | Número de subprocesos completados en el grupo de snapshots.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.snapshot.completed.count** <br>(count) | Número de subprocesos completados en el grupo de snapshots presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.snapshot.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de snapshots.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.snapshot.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de snapshots.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.snapshot.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo de snapshots presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.snapshot.threads** <br>(gauge) | Número total de subprocesos en el grupo de snapshots.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.snapshot.threads.count** <br>(count) | Número total de subprocesos en el grupo de snapshots presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.suggest.active** <br>(gauge) | Número de subprocesos activos en el grupo de sugerencias \[v\<5.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.suggest.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de sugerencias \[v\<5.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.suggest.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de sugerencias \[v\<5.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.suggest.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo de sugerencias presentados en forma de recuento \[v\<5.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.suggest.threads** <br>(gauge) | Número de subprocesos en el grupo de sugerencias \[v\<5.0\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.warmer.active** <br>(gauge) | Número de subprocesos activos en el grupo más activo.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.warmer.completed** <br>(gauge) | Número de subprocesos completados en el grupo más activo.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.warmer.queue** <br>(gauge) | Número de subprocesos en cola en el grupo más activo.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.warmer.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo más activo.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.warmer.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo más activo presentados en forma de recuento.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.warmer.threads** <br>(gauge) | Número total de subprocesos en el grupo más activo.<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.write.active** <br>(gauge) | Número de subprocesos activos en el grupo de escritura \[v6.3 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.write.completed** <br>(gauge) | Número de subprocesos completados en el grupo de escritura \[v6.3 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.write.completed.count** <br>(count) | Número de subprocesos completados en el grupo de escritura presentados en forma de recuento \[v6.3 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.write.queue** <br>(gauge) | Número de subprocesos en cola en el grupo de escritura \[v6.3 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.write.rejected** <br>(gauge) | Número de subprocesos rechazados en el grupo de escritura \[v6.3 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.write.rejected.count** <br>(count) | Número de subprocesos rechazados en el grupo de escritura presentados en forma de recuento \[v6.3 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.write.threads** <br>(gauge) | Número total de subprocesos en el grupo de escritura \[v6.3 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.thread_pool.write.threads.count** <br>(count) | Número total de subprocesos en el grupo de escritura presentados en forma de recuento \[v6.3 o posterior\].<br>_Se muestra como subproceso_ |
| **elasticsearch.transport.rx_count** <br>(gauge) | Número total de paquetes recibidos en la comunicación del clúster.<br>_Se muestra como paquete_ |
| **elasticsearch.transport.rx_count.count** <br>(count) | Número total de paquetes recibidos en la comunicación del clúster presentado en forma de recuento.<br>_Se muestra como paquete_ |
| **elasticsearch.transport.rx_size** <br>(gauge) | Tamaño total de los datos recibidos en la comunicación del clúster.<br>_Se muestra en bytes_ |
| **elasticsearch.transport.rx_size.count** <br>(count) | Tamaño total de los datos recibidos en la comunicación del clúster presentados en forma de recuento.<br>_Se muestra en bytes_ |
| **elasticsearch.transport.server_open** <br>(gauge) | Número de conexiones abiertas para la comunicación del clúster.<br>_Se muestra como conexión_ |
| **elasticsearch.transport.tx_count** <br>(gauge) | Número total de paquetes enviados en la comunicación del clúster.<br>_Se muestra como paquete_ |
| **elasticsearch.transport.tx_count.count** <br>(count) | Número total de paquetes enviados en la comunicación del clúster presentados en forma de recuento.<br>_Se muestra como paquete_ |
| **elasticsearch.transport.tx_size** <br>(gauge) | Tamaño total de los datos enviados en la comunicación del clúster.<br>_Se muestra en bytes_ |
| **elasticsearch.transport.tx_size.count** <br>(count) | Tamaño total de los datos enviados en la comunicación del clúster presentados en forma de recuento.<br>_Se muestra en bytes_ |
| **elasticsearch.unassigned_shards** <br>(gauge) | Número de fragmentos no asignados a un nodo.<br>_Se muestra como fragmento_ |
| **jvm.gc.collection_count** <br>(gauge) | Número total de recolecciones de basura ejecutadas por la máquina virtual Java \[v\<0.9.10\].<br>_Se muestra como recolección de basura_ |
| **jvm.gc.collection_time** <br>(gauge) | Tiempo total dedicado a la recolección de basura en la máquina virtual Java \[v\<0.9.10\].<br>_Se muestra en segundos_ |
| **jvm.gc.collectors.old.collection_time** <br>(gauge) | Tiempo total empleado en recolecciones de basura mayores en la máquina virtual Java que recopila objetos de generación antigua.<br>_Se muestra en segundos_ |
| **jvm.gc.collectors.old.collection_time.rate** <br>(gauge) | Tiempo total (en segundos) empleado en recolecciones de basura mayores en la máquina virtual Java que recopila objetos de generación antigua.<br>_Se muestra en segundos_ |
| **jvm.gc.collectors.old.count** <br>(gauge) | Recuento total de recolecciones de basura mayores en la máquina virtual Java que recopila objetos de generación antigua.<br>_Se muestra como recolección de basura_ |
| **jvm.gc.collectors.old.rate** <br>(gauge) | Recuento total (por segundo) de recolecciones de basura mayores en la máquina virtual Java que recopila objetos de generación antigua.<br>_Se muestra como recolección de basura_ |
| **jvm.gc.collectors.young.collection_time** <br>(gauge) | Tiempo total empleado en recolecciones de basura menores en la máquina virtual Java que recopila objetos de generación antigua.<br>_Se muestra en segundos_ |
| **jvm.gc.collectors.young.collection_time.rate** <br>(gauge) | Tiempo total (por segundo) empleado en recolecciones de basura menores en la máquina virtual Java que recopila objetos de generación antigua \[v0.9.10 o posterior\].<br>_Se muestra en segundos_ |
| **jvm.gc.collectors.young.count** <br>(gauge) | Recuento total de recolecciones de basura menores en la máquina virtual Java que recopila objetos de generación más reciente.<br>_Se muestra como recolección de basura_ |
| **jvm.gc.collectors.young.rate** <br>(gauge) | Recuento total (por segundo) de recolecciones de basura menores en la máquina virtual Java que recopila objetos de generación más reciente \[v0.9.10 o posterior\].<br>_Se muestra como recolección de basura_ |
| **jvm.gc.concurrent_mark_sweep.collection_time** <br>(gauge) | Tiempo total empleado en recolecciones de basura "concurrent mark & sweep" en la máquina virtual Java \[v\<0.9.10\].<br>_Se muestra en segundos_ |
| **jvm.gc.concurrent_mark_sweep.count** <br>(gauge) | Recuento total de recolecciones de basura "concurrent mark & sweep" en la máquina virtual Java \[v\<0.9.10\].<br>_Se muestra como recolección de basura_ |
| **jvm.gc.par_new.collection_time** <br>(gauge) | Tiempo total empleado en recolecciones de basura "parallel new" en la máquina virtual Java \[v\<0.9.10\].<br>_Se muestra en segundos_ |
| **jvm.gc.par_new.count** <br>(gauge) | Recuento total de recolecciones de basura "parallel new" en la máquina virtual Java \[v\<0.9.10\].<br>_Se muestra como recolección de basura_ |
| **jvm.mem.heap_committed** <br>(gauge) | Cantidad de memoria que se garantiza que estará disponible para la memoria heap de la máquina virtual Java.<br>_Se muestra en bytes_ |
| **jvm.mem.heap_in_use** <br>(gauge) | Porcentaje de memoria utilizado actualmente por la memoria heap de la máquina virtual Java como un valor entre 0 y 100.<br>_Se muestra como porcentaje_ |
| **jvm.mem.heap_max** <br>(gauge) | Cantidad máxima de memoria que puede utilizar la memoria heap de la máquina virtual Java.<br>_Se muestra en bytes_ |
| **jvm.mem.heap_used** <br>(gauge) | Cantidad de memoria en bytes utilizada actualmente por la memoria heap de la máquina virtual Java.<br>_Se muestra en bytes_ |
| **jvm.mem.non_heap_committed** <br>(gauge) | Cantidad de memoria que se garantiza que estará disponible para la memoria no heap de la máquina virtual Java.<br>_Se muestra en bytes_ |
| **jvm.mem.non_heap_used** <br>(gauge) | Cantidad de memoria en bytes utilizada actualmente por la memoria no heap de la máquina virtual Java.<br>_Se muestra en bytes_ |
| **jvm.mem.pools.old.max** <br>(gauge) | Cantidad máxima de memoria que puede utilizar la región de la memoria heap de generación antigua.<br>_Se muestra en bytes_ |
| **jvm.mem.pools.old.used** <br>(gauge) | Cantidad de memoria en bytes utilizada actualmente por la la región de la memoria heap de generación antigua.<br>_Se muestra en bytes_ |
| **jvm.mem.pools.survivor.max** <br>(gauge) | Cantidad máxima de memoria que puede ser utilizada por el espacio de supervencia.<br>_Se muestra en bytes_ |
| **jvm.mem.pools.survivor.used** <br>(gauge) | Cantidad de memoria en bytes utilizada actualmente por el espacio de supervivencia.<br>_Se muestra en bytes_ |
| **jvm.mem.pools.young.max** <br>(gauge) | Cantidad máxima de memoria que puede utilizar la región de la memoria heap de generación reciente.<br>_Se muestra en bytes_ |
| **jvm.mem.pools.young.used** <br>(gauge) | Cantidad de memoria en bytes utilizada actualmente por la la región de la memoria heap de generación reciente.<br>_Se muestra en bytes_ |
| **jvm.threads.count** <br>(gauge) | Número de subprocesos activos en la máquina virtual Java.<br>_Se muestra como subproceso_ |
| **jvm.threads.peak_count** <br>(gauge) | Número máximo de subprocesos utilizados por la máquina virtual Java.<br>_Se muestra como subproceso_ |

### Eventos

El check de Elasticsearch emite un evento a Datadog cada vez que cambia el estado general de tu clúster de Elasticsearch: rojo, amarillo o verde.

### Checks de servicio

**elasticsearch.cluster_health**

Devuelve el `status` de la [API de salud de clústeres] de Elasticsearch (https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html). En el mensaje de comprobación se incluye información adicional sobre el estado del fragmento en el momento de la recopilación.

_Estados: ok, warning, critical_

**elasticsearch.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la instancia monitorizada Elasticsearch. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

- El [Agent no puede conectarse](https://docs.datadoghq.com/integrations/faq/elastic-agent-can-t-connect/)
- [¿Por qué Elasticsearch no envía todas mis métricas?](https://docs.datadoghq.com/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/)

## Referencias adicionales

- [Monitorización del rendimiento de Elasticsearch](https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics)