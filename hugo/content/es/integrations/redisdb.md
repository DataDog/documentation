---
app_id: "redis"
app_uuid: "15f0ff37-2b36-4165-9606-758271d4a16d"
assets:
  dashboards:
    redis: "assets/dashboards/overview.json"
  integration:
    auto_install: true
    configuration:
      spec: "assets/configuration/spec.yaml"
    events:
      creates_events: false
    metrics:
      check: "redis.net.clients"
      metadata_path: "metadata.csv"
      prefix: "redis"
    process_signatures:
    - "redis-server"
    service_checks:
      metadata_path: "assets/service_checks.json"
    source_type_id: !!int "21"
    source_type_name: "Redis"
  monitors:
    "Memory consumption is high": "assets/monitors/high_mem.json"
  saved_views:
    error_warning_status: "assets/saved_views/error_warning_status.json"
    pid_overview: "assets/saved_views/pid_overview.json"
    redis_pattern: "assets/saved_views/redis_pattern.json"
    redis_processes: "assets/saved_views/redis_processes.json"
author:
  homepage: "https://www.datadoghq.com"
  name: "Datadog"
  sales_email: "info@datadoghq.com"
  support_email: "help@datadoghq.com"
categories:
- "caching"
- "data stores"
- "log collection"
- "tracing"
custom_kind: "integración"
dependencies:
- "https://github.com/DataDog/integrations-core/blob/master/redisdb/README.md"
display_on_public_website: true
draft: false
git_integration_title: "redisdb"
integration_id: "redis"
integration_title: "Redis"
integration_version: "8.0.0"
is_public: true
manifest_version: "2.0.0"
name: "redisdb"
public_title: "Redis"
short_description: "Realiza un seguimiento del rendimiento de Redis, el uso de memoria, los clientes bloqueados, las claves desalojadas y más"
supported_os:
- "linux"
- "windows"
- "macos"
tile:
  changelog: "CHANGELOG.md"
  classifier_tags:
  - "Category::Almacenamiento en caché"
  - "Category::Almacenes de datos"
  - "Category::Recopilación de logs"
  - "Category::Rastreo"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integración"
  configuration: "README.md#Configuración"
  description: "Realiza un seguimiento del rendimiento de Redis, el uso de memoria, los clientes bloqueados, las claves desalojadas y más"
  media: []
  overview: "README.md#Información general"
  resources:
  - resource_type: "blog"
    url: "https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics"
  support: "README.md#Soporte"
  title: "Redis"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Tanto si utilizas Redis como base de datos, caché o cola de mensajes, esta integración realiza un seguimiento de los problemas con tus servidores Redis, servicios en la nube y partes de su infraestructura a las que sirven. Utiliza el check de Redis del Datadog Agent para recopilar métricas relacionados con:

- Rendimiento
- Uso de la memoria
- Clientes bloqueados
- Conexiones secundarias
- Persistencia en disco
- Claves caducadas y desalojadas
- y mucho más

## Configuración

### Instalación

El check de Redis está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus servidores Redis.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `redisdb.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la [raíz del directorio de configuración del Agent][1]. Puede que sea necesario actualizar los siguientes parámetros. Para conocer todas las opciones de configuración disponibles, consulta el [redisdb.d/conf.yaml de ejemplo][2].

   ```yaml
   init_config:
   instances:
     ## @param host - string - required
     ## Enter the host to connect to.
     - host: localhost
       ## @param port - integer - required
       ## Enter the port of the host to connect to.
       port: 6379

       ## @param username - string - optional
       ## The username to use for the connection. Redis 6+ only.
       #
       # username: <USERNAME>

       ## @param password - string - optional
       ## The password to use for the connection.
       #
       # password: <PASSWORD>
   ```

2. Si utilizas Redis v6 o posterior y listas de control del acceso (ACL), asegúrate de que el usuario tiene al menos permisos `DB  Viewer` a nivel de base de datos, permisos `Cluster Viewer`, si operas en un entorno de clúster, y reglas de ACL`+config|get +info +slowlog|get`. Para ver más detalles, consulta [Control del acceso a bases de datos][3].

3. [Reinicia el Agent][4].

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Deselecciona y edita este bloque de configuración en la parte inferior de tu `redisdb.d/conf.yaml`:

   ```yaml
   logs:
     - type: file
       path: /var/log/redis_6379.log
       source: redis
       service: myapplication
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [redisdb.yaml de ejemplo][2] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][4].

##### Recopilación de trazas (trazas)

Datadog APM se integra con Redis para ver trazas en tu sistema distribuido. La recopilación de trazas está activada por defecto en el Datadog Agent v6 o posteriores. Para empezar a recopilar trazas:

1. [Habilita la recopilación de trazas en Datadog][5].
2. [Instrumenta la aplicación que realiza solicitudes a Redis][6].


[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[3]: https://docs.redis.com/latest/rs/security/passwords-users-roles/
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/tracing/send_traces/
[6]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como etiquetas (labels) Docker en el contenedor de tu aplicación:

```yaml
LABEL "com.datadoghq.ad.check_names"='["redisdb"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"host":"%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

**Nota**: La lógica de variable de plantilla `"%%env_<ENV_VAR>%%"` se utiliza para evitar almacenar la contraseña en texto simple, por lo que la variable de entorno`REDIS_PASSWORD` se debe definir en el contenedor del Agent. Para ver más detalles, consulta la documentación de la [variable de plantilla Autodiscovery][2]. Alternativamente, el Agent puede aprovechar el paquete `secrets` para trabajar con cualquier backend de [gestión de secretos][3] (como HashiCorp Vault o AWS Secrets Manager).

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Docker][4].

Luego, configura [integraciones de logs][5] como etiquetas Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"redis","service":"<YOUR_APP_NAME>"}]'
```

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con el Agent v6 o posteriores, pero requiere configuración adicional para empezar a recopilar trazas.

Variables de entorno requeridas en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Para ver una lista completa de las variables de entorno disponibles y la configuración, consulta [Rastreo de aplicaciones Docker][6].

Luego, [instrumenta el contenedor de tu aplicación que realiza solicitudes a Redis][7] y configura `DD_AGENT_HOST` con el nombre del contenedor de tu Agent.


[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/agent/guide/secrets-management/?tab=linux
[4]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation
[5]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/agent/docker/apm/?tab=linux
[7]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Para configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Para recopilar métricas, define los siguientes parámetros y valores en una [plantilla de Autodiscovery][1]. Puedes hacerlo con Kubernetes Annotations (que se muestra a continuación) en tu(s) pod(s) de Redis o con un [archivo local, ConfigMap, almacén de clave-valor, manifiesto de Datadog Operator, o Helm chart][2].

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `["redisdb"]`                                                              |
| `<INIT_CONFIG>`      | `[{}]`                                                                     |
| `<INSTANCE_CONFIG>`  | `[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]` |

**Anotaciones v1** (para el Datadog Agent v7.36 o anterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.checks: |
      {
        "redisdb": {
          "init_config": {},
          "instances": [
            {
              "host": "%%host%%",
              "port":"6379",
              "password":"%%env_REDIS_PASSWORD%%"
            }
          ]
        }
      }
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**Nota**: La lógica de variable de plantilla `"%%env_<ENV_VAR>%%"` se utiliza para evitar almacenar la contraseña en texto simple, por lo que la variable de entorno`REDIS_PASSWORD` se debe definir en el contenedor del Agent. Para ver más detalles, consulta la documentación de la [variable de plantilla Autodiscovery][3]. Alternativamente, el Agent puede aprovechar el paquete `secrets` para trabajar con cualquier backend de [gestión de secretos][4] (como HashiCorp Vault o AWS Secrets Manager).

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][5].

A continuación, configura el siguiente parámetro en una [plantilla de Autodiscovery][1]. Puedes hacerlo con Kubernetes Annotations (que se muestra a continuación) en tu(s) pod(s) de Redis, o con un [archivo local, ConfigMap, almacén de clave-valor, manifiesto de Datadog Operator, o Helm chart][2].

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<LOG_CONFIG>`       | `[{"source":"redis","service":"<YOUR_APP_NAME>"}]`                         |

**Anotaciones v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"<YOUR_APP_NAME>"}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con hosts que se ejecutan en la versión 6 o posteriores del Agent, pero requiere configuración adicional para empezar a recopilar trazas.

Variables de entorno requeridas en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Para ver una lista completa de las variables de entorno y la configuración disponibles, consulta [Rastreo de aplicaciones Kubernetes][6] y la [configuración del DaemonSet de Kubernetes][7].

A continuación, [instrumenta el contenedor de tu aplicación que realiza solicitudes a Redis][8].

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/agent/faq/template_variables/
[4]: https://docs.datadoghq.com/agent/guide/secrets-management/?tab=linux
[5]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
[6]: https://docs.datadoghq.com/agent/kubernetes/apm/?tab=java
[7]: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[8]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como etiquetas Docker en el contenedor de tu aplicación:

```json
{
  "containerDefinitions": [{
    "name": "redis",
    "image": "redis:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"redisdb\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"host\":\"%%host%%\",\"port\":\"6379\",\"password\":\"%%env_REDIS_PASSWORD%%\"}]"
    }
  }]
}
```

**Nota**: La lógica de variable de plantilla `"%%env_<ENV_VAR>%%"` se utiliza para evitar almacenar la contraseña en texto simple, por lo que la variable de entorno`REDIS_PASSWORD` se debe definir en el contenedor del Agent. Para ver más detalles, consulta la documentación de la [variable de plantilla Autodiscovery][2]. Alternativamente, el Agent puede aprovechar el paquete `secrets` para trabajar con cualquier backend de [gestión de secretos][3] (como HashiCorp Vault o AWS Secrets Manager).

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de ECS][4].

Luego, configura [integraciones de logs][5] como etiquetas Docker:

```yaml
{
  "containerDefinitions": [{
    "name": "redis",
    "image": "redis:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"redis\",\"service\":\"<YOUR_APP_NAME>\"}]"
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
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Para ver una lista completa de las variables de entorno disponibles y la configuración, consulta [Rastreo de aplicaciones Docker][6].

Luego, [instrumenta el contenedor de tu aplicación que realiza solicitudes a Redis][7] y configura `DD_AGENT_HOST` en la [dirección IP privada de EC2][8].

[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/agent/guide/secrets-management/?tab=linux
[4]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux
[5]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/agent/docker/apm/?tab=linux
[7]: https://docs.datadoghq.com/tracing/setup/
[8]: https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][2] y busca `redisdb` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "redisdb" >}}


### Eventos

El check de Redis no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "redisdb" >}}


## Solucionar problemas

### El Agent no se puede conectar

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'Error 111 connecting to localhost:6379. Connection refused.'
      - Collected 0 metrics, 0 events & 1 service check
```

Verifica que la información de conexión en `redisdb.yaml` es la correcta.

### El Agent no se puede autenticar

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'NOAUTH Authentication required.'
      - Collected 0 metrics, 0 events & 1 service check
```

Configura un `password` en `redisdb.yaml`.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de métricas de rendimiento de Redis][3]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics
