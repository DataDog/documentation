---
"app_id": "mongodb"
"app_uuid": "54cca53a-3c87-4b53-beb4-fce95d1fcfb5"
"assets":
  "dashboards":
    "mongodb": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "mongodb.connections.available"
      "metadata_path": "metadata.csv"
      "prefix": "mongodb"
    "process_signatures":
    - "mongod"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "19"
    "source_type_name": "MongoDB"
  "monitors":
    "Connection pool is reaching saturation": "assets/monitors/high_connections.json"
    "High query targeting": "assets/monitors/high_query_targeting.json"
    "High queued readers": "assets/monitors/high_queued_readers.json"
    "High queued writers": "assets/monitors/high_queued_writers.json"
    "High replication lag": "assets/monitors/high_replication_lag.json"
    "Low oplog window": "assets/monitors/low_oplog_window.json"
    "Unhealthy replica set member": "assets/monitors/unhealthy_repliset_member.json"
    "Used file system storage is reaching capacity": "assets/monitors/high_fsstorage_usage.json"
  "saved_views":
    "mongodb_processes": "assets/saved_views/mongodb_processes.json"
    "operations_by_type_overview": "assets/saved_views/operations_by_type_overview.json"
    "queries": "assets/saved_views/queries.json"
    "queries_by_type_overview": "assets/saved_views/queries_by_type_overview.json"
    "slow_queries": "assets/saved_views/slow_queries.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "ayuda@datadoghq.com"
"categories":
- "data stores"
- "log collection"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/mongo/README.md"
"display_on_public_website": verdadero
"draft": falso
"git_integration_title": "mongo"
"integration_id": "mongodb"
"integration_title": "MongoDB"
"integration_version": "10.1.0"
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "mongo"
"public_title": "MongoDB"
"short_description": "Haz un seguimiento del rendimiento de lectura/escritura, de las réplicas más utilizadas, recopila métricas y mucho más"
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Almacenes de datos"
  - "Category::Recopilación de logs"
  - "Offering::integración"
  "configuration": "README.md#Setup"
  "description": "Haz un seguimiento del rendimiento de lectura/escritura, de las réplicas más utilizadas, recopila métricas y mucho más"
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-mmap"
  "support": "README.md#Support"
  "title": "MongoDB"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


![Dashboard de MongoDB][1]

## Información general

Conecta MongoDB a Datadog para:

- Visualizar las métricas claves de MongoDB.
- Correlacionar el rendimiento de MongoDB con el del resto de tus aplicaciones.

También puedes crear tus propias métricas utilizando consultas personalizadas `find`, `count` y `aggregate`.

Activa [Database Monitoring][2] (DBM) para obtener información mejorada sobre el rendimiento de las consultas y el estado de la base de datos. Además de la integración estándar, DBM de Datadog proporciona información en tiempo real e histórica sobre consultas instantáneas, métricas de consultas lentas, carga de la base de datos, planes de ejecución de operaciones y recopilaciones.

**Nota**: Se requiere MongoDB v3.0+ para esta integración. La integración de MongoDB Atlas con Datadog sólo está disponible en los clústeres de M10+. Esta integración también es compatible con clústeres basados en Alibaba ApsaraDB y Amazon DocumentDB Instance. Los clústeres de DocumentDB Elastic no son compatibles porque sólo exponen los endpoints de clústeres (mongos).

## Configuración

<div class="alert alert-info">Esta página describe la integración estándar de MongoDB Agent. Si buscas el producto Database Monitoring para MongoDB, consulta <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Database Monitoring de Datadog</a>.</div>

### Instalación

El check de MongoDB está incluido en el paquete del [Datadog Agent ][3]. No es necesaria ninguna instalación adicional.

### Arquitectura

**Nota**: Para instalar Database Monitoring para MongoDB, selecciona tu solución de alojamiento en la [documentación de Database Monitoring][4] para obtener instrucciones.

La mayoría de las métricas de bajo nivel (tiempo de actividad, tamaño de almacenamiento, etc.) deben recopilarse en cada nodo mongod. Otras métricas de más alto nivel (estadísticas de recopilación/índice, etc.) deberían recopilarse sólo una vez. Por estas razones, la forma en que configures los Agents depende de cómo se despliegue tu clúster mongo.

{{< tabs >}}
{{% tab "Independiente" %}}
#### Independiente

Para configurar esta integración para el despliegue de un solo nodo MongoDB:

##### Preparación de MongoDB
En un shell Mongo, crea un usuario de sólo lectura para el Datadog Agent en la base de datos `admin`:

```shell
# Autentícate como el usuario administrador.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Crea el usuario para el Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUEPASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" },
    # Concede acceso de sólo lectura adicional a la base de datos de la que quieres recopilar estadísticas de recopilación/índice.
    { role: "read", db: "mydb" },
    { role: "read", db: "myanotherdb" },
    # También puedes conceder acceso de sólo lectura a todas las bases de datos.
    { role: "readAnyDatabase", db: "admin" }
  ]
})
```

##### Configuración de los Agents
Sólo necesitas un único Agent, preferiblemente ejecutándose en el mismo nodo, para recopilar todas las métricas de mongo disponibles. Consulta las siguientes opciones de configuración.
{{% /tab %}}
{{% tab "Conjunto de réplicas" %}}
#### Conjunto de réplicas

Para configurar esta integración para un conjunto de réplicas MongoDB:

##### Preparación de MongoDB
En un shell Mongo, autentícate en el primario y crea un usuario de sólo lectura para el Datadog Agent en la base de datos `admin`:

```shell
# Autentícate como el usuario administrador.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Crea el usuario para el Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUEPASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" },
    # Concede acceso de sólo lectura adicional a la base de datos de la que quieres recopilar estadísticas de recopilación/índice.
    { role: "read", db: "mydb" },
    { role: "read", db: "myanotherdb" },
    # También puedes conceder acceso de sólo lectura a todas las bases de datos.
    { role: "readAnyDatabase", db: "admin" }
  ]
})
```

##### Configuración de los Agents

Instala el Datadog Agent en cada host en el conjunto de réplicas MongoDB y configura el Agent para conectarse a la réplica en ese host (`localhost`). Ejecutar un Agent en cada host reduce la latencia y los tiempos de ejecución y garantiza que los datos seguirán conectados si falla un host.

Por ejemplo, en el nodo primario:

```yaml
init_config:
instances:
  - hosts:
      - mongo-primary:27017
```

En el nodo secundario:

```yaml
init_config:
instances:
  - hosts:
      - mongo-secondary:27017
```

En el nodo terciario:

```yaml
init_config:
instances:
  - hosts:
      - mongo-tertiary:27017
```

{{% /tab %}}
{{% tab "Fragmentación" %}}
#### Fragmentación

Para configurar esta integración para un clúster MongoDB fragmentado:

##### Preparación de MongoDB
Para cada fragmento de tu clúster, conéctate al primario del conjunto de réplicas y crea un usuario local de sólo lectura para el Datadog Agent en la base de datos `admin`:

```shell
# Autentícate como el usuario administrador.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Crea el usuario para el Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUEPASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" }
  ]
})
```

A continuación, crea el mismo usuario desde un proxy mongos. Esta acción crea el usuario local en los servidores de configuración y permite la conexión directa.

##### Configuración de los Agents
1. Configura un Agent por cada miembro de cada fragmento.
2. Configura un Agent para cada miembro de los servidores de configuración.
3. Configura un Agent adicional para conectarse al clúster a través de un proxy mongos. Este proxy mongos puede ser uno nuevo, exclusivo para la monitorización, o un proxy mongos existente.

**Nota**: La monitorización de nodos de tipo árbitro no es compatible (para ver más detalles, consulta el [árbitro del conjunto de réplicas MongoDB][1]). Sin embargo, cualquier cambio de estado de un nodo de tipo árbitro es informado por el Agent conectado al primario.

[1]: https://docs.mongodb.com/manual/core/replica-set-arbiter/#authentication
{{% /tab %}}
{{< /tabs >}}


### Configuración

Sigue las instrucciones a continuación para configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las secciones [Docker](?tab=docker#docker), [Kubernetes](?tab=kubernetes#kubernetes) o [ECS](?tab=ecs#ecs).

{{< tabs >}}
{{% tab "Host" %}}

#### Host

A fin de configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `mongo.d/conf.yaml` en la carpeta `conf.d` en la raíz del [directorio de configuración de tu Agent][1]. Para conocer todas las opciones de configuración disponibles, consulta el [mongo.d/conf.yaml de ejemplo][2].

   ```yaml
   init_config:

   instances:
       ## @param hosts - list of strings - required
       ## Hosts to collect metrics from, as is appropriate for your deployment topology.
       ## E.g. for a standalone deployment, specify the hostname and port of the mongod instance.
       ## For replica sets or sharded clusters, see instructions in the sample conf.yaml.
       ## Only specify multiple hosts when connecting through mongos
       #
     - hosts:
         - <HOST>:<PORT>

       ## @param username - string - optional
       ## The username to use for authentication.
       #
       username: datadog

       ## @param password - string - optional
       ## The password to use for authentication.
       #
       password: <UNIQUEPASSWORD>

       ## @param database - string - optional
       ## The database to collect metrics from.
       #
       database: <DATABASE>

       ## @param options - mapping - optional
       ## Connection options. For a complete list, see:
       ## https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
       #
       options:
         authSource: admin
   ```

2. [Reinicia el Agent][3].

##### Detección automática de bases de datos

A partir del Datadog Agent v7.56, puedes habilitar la detección automática de bases de datos para recopilar automáticamente métricas de todas tus bases de datos en la instancia MongoDB. 
Ten en cuenta que la detección automática de bases de datos está deshabilitada por defecto. Se requiere acceso de lectura a las bases de datos detectadas automáticamente para recopilar métricas de ellas.
Para habilitarlo, añade la siguiente configuración a tu archivo `mongo.d/conf.yaml`:

```yaml
   init_config:

   instances:
       ## @param hosts - lista de cadenas - necesario
       ## Hosts de los que recopilar métricas, según la conveniencia de la topología de tu despliegue.
       ## Por ejemplo, para un despliegue independiente, especifica el nombre de host y el puerto de la instancia mongod.
       ## Para conjuntos de réplicas o clústeres fragmentados, consulta las instrucciones en el conf.yaml de ejemplo.
       ## Sólo especifica varios hosts cuando la conexión se realice a través de mongos.
       #
     - hosts:
         - <HOST>:<PORT>

       ## @param nombre de usuario - cadena - opcional
       ## Nombre de usuario para la autenticación.
       #
       nombre de usuario: datadog

       ## @param contraseña - cadena - opcional
       ## Contraseña para la autenticación.
       #
       contraseña: <UNIQUE_PASSWORD>

       ## @param opciones - asignación - opcional
       ## Opciones de conexión. Para ver una lista completa, consulta:
       ## https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
       #
       opciones:
         authSource: administrador

       ## @param detección automática de bases de datos - asignación - opcional
       ## Habilita la detección automática de bases de datos para recopilar métricas automáticamente de todas tus bases de datos MongoDB.
       #
       detección automática de bases de datos:
         ## @param habilitado - booleano - necesario
         ## Habilita la detección automática de bases de datos.
         #
         habilitado: true

         ## @param incluir - lista de cadenas - opcional
         ## Lista de bases de datos para incluir en la detección automática. Utiliza expresiones regulares para emparejar varias bases de datos.
         ## Por ejemplo, para incluir todas las bases de datos que comienzan con "mydb", utiliza "^mydb.*".
         ## Por defecto, la inclusión está configurada en ".*" y todas las bases de datos están incluidas.
         #
         incluir:
            - "^mydb.*"

         ## @param excluir - lista de cadenas - opcional
         ## Lista de bases de datos para excluir de la detección automática. Utiliza expresiones regulares para emparejar varias bases de datos.
         ## Por ejemplo, para excluir todas las bases de datos que comienzan con "mydb", utiliza "^mydb.*"
         ## En caso de conflicto entre la lista de inclusión y la lista de exclusión, esta última tiene prioridad.
         #
         excluir:
            - "^mydb2.*"
            - "admin$"

         ## @param máximo de bases de datos - entero - opcional
         ## Número máximo de bases de datos de las que recopilar métricas. El valor por defecto es 100.
         #
         máximo de bases de datos: 100

         ## @param intervalo de actualización - entero - opcional
         ## Intervalo de actualización de la lista de bases de datos en segundos. El valor por defecto es 600 segundos.
         #
         intervalo de actualización: 600
   ```

2. [Reinicia el Agent][3].

##### Recopilación de trazas

Datadog APM se integra con Mongo para ver las trazas en todo el sistema distribuido. La recopilación de trazas se encuentra habilitada de manera predeterminada en el Datadog Agent versión 6 o posterior. Para empezar a recopilar trazas:

1. [Habilita la recopilación de trazas en Datadog][4].
2. [Instrumenta la aplicación que realiza solicitudes a Mongo][5].

##### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `mongo.d/conf.yaml` para empezar a recopilar logs de MongoDB:

   ```yaml
   logs:
     - type: file
       path: /var/log/mongodb/mongodb.log
       service: mongo
       source: mongodb
   ```

   Cambia los valores de los parámetros `service` y `path` y configúralos para tu entorno. Para ver todas las opciones de configuración disponibles, consulta el [mongo.yaml de ejemplo][2].

3. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/tracing/send_traces/
[5]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como etiquetas (labels) Docker en el contenedor de tu aplicación:

```yaml
LABEL "com.datadoghq.ad.check_names"='["mongo"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"hosts": ["%%host%%:%%port%%"], "username": "datadog", "password" : "<UNIQUEPASSWORD>", "database": "<DATABASE>"}]'
```

##### Recopilación de logs

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Docker][2].

Luego, configura [integraciones de logs][3] como etiquetas Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"mongodb","service":"<SERVICE_NAME>"}]'
```

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con el Agent v6 o posterior, pero requiere configuración adicional para empezar a recopilar trazas.

Variables de entorno requeridas en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | verdadero                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | verdadero |

Para ver una lista completa de las variables de entorno y la configuración disponibles, consulta [Rastreo de aplicaciones Docker][4].

A continuación, [instrumenta tu contenedor de aplicación][5] y define `DD_AGENT_HOST` en el nombre de tu contenedor del Agent.


[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/agent/docker/apm/?tab=linux
[5]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Para Configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [plantillas de integraciones Autodiscovery][1] como anotaciones de pod en tu contenedor de aplicación. Las plantillas también se pueden configurar con [un archivo, un configmap o un almacén de clave-valor][2].

**Anotaciones v1** (para el Datadog Agent v7.36 o anterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongo
  annotations:
    ad.datadoghq.com/mongo.check_names: '["mongo"]'
    ad.datadoghq.com/mongo.init_configs: '[{}]'
    ad.datadoghq.com/mongo.instances: |
      [
        {
          "hosts": ["%%host%%:%%port%%"],
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "database": "<DATABASE>"
        }
      ]
spec:
  containers:
    - name: mongo
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongo
  annotations:
    ad.datadoghq.com/mongo.checks: |
      {
        "mongo": {
          "init_config": {},
          "instances": [
            {
              "hosts": ["%%host%%:%%port%%"],
              "username": "datadog",
              "password": "<UNIQUEPASSWORD>",
              "database": "<DATABASE>"
            }
          ]
        }
      }
spec:
  containers:
    - name: mongo
```

##### Recopilación de logs

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Kubernetes][3].

Luego, configura las [integraciones de logs][4] como anotaciones de pod. Esto también se puede configurar con [un archivo, un mapa de configuración o un almacén de clave-valor][5].

**Anotaciones v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongo
  annotations:
    ad.datadoghq.com/mongo.logs: '[{"source":"mongodb","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: mongo
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

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration
[6]: https://docs.datadoghq.com/agent/kubernetes/apm/?tab=java
[7]: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[8]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como etiquetas (labels) Docker en el contenedor de tu aplicación:

```json
{
  "containerDefinitions": [{
    "name": "mongo",
    "image": "mongo:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"mongo\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"hosts\": [\"%%host%%:%%port%%\"], \"username\": \"datadog\", \"password\": \"<UNIQUEPASSWORD>\", \"database\": \"<DATABASE>\"}]"
    }
  }]
}
```

##### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de ECS][2].

Luego, configura [integraciones de logs][3] como etiquetas Docker:

```json
{
  "containerDefinitions": [{
    "name": "mongo",
    "image": "mongo:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"mongodb\",\"service\":\"<SERVICE_NAME>\"}]"
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

Para ver una lista completa de las variables de entorno y la configuración disponibles, consulta [Rastreo de aplicaciones Docker][4].

Luego, [instrumenta tu contenedor de aplicaciones][5] y configura `DD_AGENT_HOST` en la [dirección IP privada de EC2][6].


[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/agent/docker/apm/?tab=linux
[5]: https://docs.datadoghq.com/tracing/setup/
[6]: https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `mongo` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "mongo" >}}


Consulta el [Manual de MongoDB 3.0][6] para obtener descripciones más detalladas de algunas de estas métricas.

#### Métricas adicionales

Las siguientes métricas **no** se recopilan de forma predeterminada. Para recopilarlas, utiliza el parámetro `additional_metrics` en tu archivo `mongo.d/conf.yaml`:

| prefijo de métrica                     | qué añadir a `additional_metrics` para recopilarla |
| --------------------------------- | ------------------------------------------------- |
| mongodb.collection                | recopilación                                        |
| mongodb.usage.commands            | top                                               |
| mongodb.usage.getmore             | top                                               |
| mongodb.usage.insert              | top                                               |
| mongodb.usage.queries             | top                                               |
| mongodb.usage.readLock            | top                                               |
| mongodb.usage.writeLock           | top                                               |
| mongodb.usage.remove              | top                                               |
| mongodb.uso.total               | top                                               |
| mongodb.usage.update              | top                                               |
| mongodb.usage.writeLock           | top                                               |
| mongodb.tcmalloc                  | tcmalloc                                          |
| mongodb.métricas.comandos          | metrics.commands                                  |
| mongodb.chunks.jumbo              | jumbo_chunks                                      |
| mongodb.chunks.total              | jumbo_chunks                                      |
| mongodb.sharded_data_distribution | sharded_data_distribution                         |

### Eventos

**Cambios en el estado de replicación**:<br>
Este check emite un evento cada vez que hay un cambio en el estado de replicación de un nodo Mongo.

### Checks de servicio
{{< get-service-checks-from-git "mongo" >}}


## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de métricas de rendimiento de MongoDB (WiredTiger)][8]
- [Monitorización de métricas de rendimiento de MongoDB (MMAP)][9]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mongo/images/mongo_dashboard.png
[2]: https://docs.datadoghq.com/database_monitoring/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/database_monitoring/#mongodb
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.mongodb.org/manual/reference/command/dbStats
[7]: https://docs.datadoghq.com/help/
[8]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger
[9]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-mmap
