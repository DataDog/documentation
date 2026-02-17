---
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopilar tus trazas de aplicaciones
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopila tus métricas de Prometheus
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asignar etiquetas (tags) a todos los datos emitidos por un contenedor
title: 'Autodiscovery: escenarios y ejemplos'
---

Esta página contiene plantillas de ejemplo detalladas para configurar integraciones en entornos en contenedores en los siguientes escenarios:

- [La integración de Redis para todos los contenedores de Redis](#redis-integration-for-all-redis-containers)
- [La integración de Apache con el check HTTP para todos los contenedores de Apache](#apache-integration-and-http-check-on-apache-containers)

Para más información sobre contenedores e integraciones, consulta [Docker e integraciones][2] y [Kubernetes e integraciones][3].

Todos los ejemplos utilizan la función de Autodiscovery de Datadog, que permite definir plantillas de configuración para checks del Agent en conjuntos designados de contenedores. Para más información sobre Autodiscovery, consulta [Empezando con contenedores: Autodiscovery][1].

## La integración de Redis para todos los contenedores de Redis

En este escenario de ejemplo, tienes un entorno en contenedores en el que quieres establecer y configurar la [integración de Datadog y Redis][5] para todos los contenedores que coincidan con el nombre `redis`. Tienes un contenedor llamado `redis` y otro llamado `my-custom-redis`, y quieres configurar la integración de Redis para **ambos** contenedores.

La integración de Redis viene con [la configuración automática predeterminada][4], pero debes especificar adicionalmente un parámetro `password` y configurar la recopilación de logs.

Hipotéticamente, si tuvieras que configurar esta integración **en un host**, podrías hacer referencia a [`redisdb.d/conf.yaml.example`][6] para los parámetros y crear un archivo `conf.yaml` que contenga lo siguiente:

```yaml
init_config:
instances:
  - host: localhost
    port: 6379
    password: <PASSWORD>
logs:
  - type: file
    path: /var/log/redis_6379.log
    source: redis
    service: redis_service
```

Aquí, `<PASSWORD>` corresponde a la contraseña a utilizar para la conexión.

Para aplicar este configuración a tus contenedores de Redis: primero, almacena tu contraseña como una variable de entorno llamada `REDIS_PASSWORD`; luego: 

{{< tabs >}}
{{% tab "Anotaciones de Kubernetes" %}}

En el manifiesto de tu pod:

**Anotaciones de Autodiscovery v2** (para el Datadog Agent v7.36 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.checks: |
      {
        "redisdb": {
          "instances": [
            {
              "host": "%%host%%",
              "port":"6379",
              "password":"%%env_REDIS_PASSWORD%%"
            }
          ]
        }
      }
    ad.datadoghq.com/redis.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/redis_6379.log",
          "source": "redis",
          "service": "redis_service"
        }
      ]
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**Anotaciones de Autodiscovery v1** 

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
    ad.datadoghq.com/redis.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/redis_6379.log",
          "source": "redis",
          "service": "redis_service"
        }
      ]
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

{{% /tab %}}
{{% tab "Etiquetas de Docker" %}}

**docker-compose.yaml**

Para Datadog Agent v7.36+:

```yaml
labels:
  com.datadoghq.ad.checks: '{"redisdb": {"instances": [{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}], "logs": [{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]}}'
```

Para versiones anteriores del Agent:

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]'
```

{{% /tab %}}
{{% tab "Local file" %}}
1. Crea un archivo `conf.d/redisdb.d/conf.yaml` en tu host:

   ```yaml
   ad_identifiers:
     - redis
   init config:
   instances:
     - host: "%%host%%"
       port: "6379"
       username: "datadog"
       password: "%%env_REDIS_PASSWORD%%"
   logs:
     - type: "file"
       path: "/var/log/redis.log"
       source: "redis"
       service: "redis_service"
   ```

2. Monta tu carpeta host `conf.d/` en la carpeta `conf.d` del Agent contenedorizado.
{{% /tab %}}
{{% tab "ConfigMap" %}}

En un ConfigMap:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: redisdb-config-map
  namespace: default
data:
  redisdb-config: |-
    ad_identifiers:
      - redis
    init_config:
    instances:
      - host: "%%host%%"
        port: "6379"
        password: "%%env_REDIS_PASSWORD%%"
    logs:
      - type: "file"
        path: "/var/log/redis_6379.log"
        source: "redis"
        service: "redis_service"
```

A continuación, define `volumeMounts` y `volumes` en tu manifiesto:

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        # [...]
      volumes:
      # [...]
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

Los siguientes comandos etcd crean una plantilla de con integración Redis con un parámetro de `password` personalizado:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

Fíjate que cada uno de los tres valores es una lista. Autodiscovery agrupa los elementos de la lista en configuraciones de integraciones basadas en índices de lista compartidos. En este caso, define la primera (y única) configuración de checks a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

En `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      env: 
        - name: DD_IGNORE_AUTOCONF
          value: redisdb
      extraConfd:
        configDataMap:
          redisdb.yaml: |-
            ad_identifiers:
              - redis
            init_config:
            instances:
              - host: "%%host%%"
                port: 6379
                password: "%%env_REDIS_PASSWORD%%"
```
Como resultado, el Agent contiene un archivo `redisdb.yaml` con la configuración anterior en el directorio `conf.d`.

**Nota**: La integración de Redis viene con [configuración automática][1] por defecto, que tiene prioridad sobre la configuración establecida en el manifiesto del Datadog Operator. Debido a esto, el manifiesto de ejemplo proporcionado utiliza la variable `DD_IGNORE_AUTOCONF` para desactivar la configuración automática.

[1]: /es/containers/guide/auto_conf
{{% /tab %}}
{{% tab "Helm" %}}

En `datadog-values.yaml`:

```yaml
datadog:
  ignoreAutoConfig:
    - redisdb
  confd:
    redisdb.yaml: |-
      ad_identifiers:
        - redis
      init_config:
      instances:
        - host: "%%host%%"
          port: 6379
          password: "%%env_REDIS_PASSWORD%%"
```
Como resultado, el Agent contiene un archivo `redisdb.yaml` con la configuración anterior en el directorio `conf.d`.

**Nota**: La integración de Redis viene con la [configuración automática predeterminada][1], que tiene precedencia sobre la configuración establecida en los valores de Helm. Debido a esto, el ejemplo proporcionado utiliza `datadog.ignoreAutoConfig` para desactivar la configuración automática.

[1]: /es/containers/guide/auto_conf
{{% /tab %}}
{{< /tabs >}}

Todos estos ejemplos utilizan [Variables de plantilla de Autodiscovery][7]:
- `%%host%%` se rellena dinámicamente con la dirección IP del contenedor.
- `%%env_REDIS_PASSWORD%%` hace referencia a una variable de entorno denominada `REDIS_PASSWORD` vista por el proceso del Agent.

## La integración de Apache integración y el check de HTTP en contenedores de Apache

En este escenario de ejemplo, tienes un entorno en contenedores en el que quieres establecer y configurar la [integración de Datadog y Apache][8] para todos los contenedores que coincidan con el nombre `apache`. También debes configurar un [check de HTTP][9] para probar dos endpoints, `/website_1` y `/website_2`.

La integración de Apache viene con la [configuración automática predeterminada][4], pero debes añadir una configuración adicional: hay que establecer el [intervalo de recopilación][11] en 30 segundos.

Hipotéticamente, si tuvieras que configurar esta integración **en un host**, podrías hacer referencia a las opciones de configuración en [`apache.d/conf.yaml.example`][10] y [`http_check.d/conf.yaml.example`][12]. Se crearían dos archivos `conf.yaml`:

{{< code-block lang="yaml" filename="apache.d/conf.yaml" >}}
init_config:
instances:
  - apache_status_url: http://%%host%%/server-status?auto
    min_collection_interval: 30
{{< /code-block >}}

{{< code-block lang="yaml" filename="http_check.d/conf.yaml" >}}
init_config:
instances:
  - name: my_website_1
    url: http://%%host%%/website_1
    timeout: 1
  - name: my_website_2
    url: http://%%host%%/website_2
    timeout: 1
{{< /code-block >}}

{{< tabs >}}
{{% tab "Anotaciones de Kubernetes" %}}

**Anotaciones de Autodiscovery v2** (para Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.checks: |
      {
        "apache": {
          "instances": [
            {
              "apache_status_url": "http://%%host%%/server-status?auto",
              "min_collection_interval": 30
            }
          ]
        },
        "http_check": {
          "instances": [
            {
              "name": "my_website_1",
              "url": "http://%%host%%/website_1",
              "timeout": 1
            },
            {
              "name": "my_website_2",
              "url": "http://%%host%%/website_2",
              "timeout": 1
            }
          ]
        }
      }
  labels:
    name: apache
spec:
  containers:
    - name: apache
  # (...)
```

**Anotaciones de Autodiscovery v1** 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache","http_check"]'
    ad.datadoghq.com/apache.init_configs: '[{},{}]'
    ad.datadoghq.com/apache.instances: |
      [
        [
          {
            "apache_status_url": "http://%%host%%/server-status?auto",
            "min_collection_interval": 30
          }
        ],
        [
          {
            "name": "my_website_1",
            "url": "http://%%host%%/website_1",
            "timeout": 1
          },
          {
            "name": "my_website_2",
            "url": "http://%%host%%/website_2",
            "timeout": 1
          }
        ]
      ]
  labels:
    name: apache
spec:
  containers:
    - name: apache
  # (...)
```

{{% /tab %}}
{{% tab "Etiquetas de Docker" %}}

**Archivo de Docker**

Para Datadog Agent v7.36+:

```yaml
LABEL "com.datadoghq.ad.checks"='{"apache": {"instances": [{"apache_status_url": "http://%%host%%/server-status?auto", "min_collection_interval": 30}]}, "http_check":{"instances": [{"name":"my_website_1","url":"http://%%host%%/website_1","timeout":1},{"name":"my_website_2","url":"http://%%host%%/website_2","timeout":1}]}}'
```

Para versiones anteriores del Agent:
```dockerfile
LABEL "com.datadoghq.ad.check_names"='["apache", "http_check"]'
LABEL "com.datadoghq.ad.init_configs"='[{},{}]'
LABEL "com.datadoghq.ad.instances"='[[{"apache_status_url": "http://%%host%%/server-status?auto", "min_collection_interval": 30}],[{"name":"my_website_1","url":"http://%%host%%/website_1","timeout":1},{"name":"my_website_2","url":"http://%%host%%/website_2","timeout":1}]]'
```

{{% /tab %}}
{{% tab "Local file" %}}

* Crea las carpetas `conf.d/` y `conf.d/apache.d` en tu host.
* Añade la siguiente auto-configuración personalizada a `conf.d/apache.d/conf.yaml` en tu host.

```yaml
ad_identifiers:
  - apache

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
    min_collection_interval: 30
```

* Luego, crea la carpeta `conf.d/http_check.d` en tu host.
* Añade la siguiente auto-configuración personalizada a `conf.d/http_check.d/conf.yaml` en tu host.

```yaml
ad_identifiers:
  - apache

init_config:

instances:
  - name: "<WEBSITE_1>"
    url: "http://%%host%%/website_1"
    timeout: 1

  - name: "<WEBSITE_2>"
    url: "http://%%host%%/website_2"
    timeout: 1
```

* Finalmente, monta la carpeta `conf.d/` host en la carpeta `conf.d/` del Agente contenedorizado.

{{% /tab %}}
{{% tab "ConfigMap" %}}

El siguiente ConfigMap define la plantilla de integración para los contenedores `apache` y `http_check`:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: apache-config-map
  namespace: default
data:
  apache-config: |-
    ad_identifiers:
      - apache
    init_config:
    instances:
      - apache_status_url: http://%%host%%/server-status?auto
        min_collection_interval: 30
  http-check-config: |-
    ad_identifiers:
      - apache
    init_config:
    instances:
      - name: "<WEBSITE_1>"
        url: "http://%%host%%/website_1"
        timeout: 1
      - name: "<WEBSITE_2>"
        url: "http://%%host%%/website_2"
        timeout: 1
```

En el manifiesto, define `volumeMounts` y `volumes`:

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: apache-auto-config
            mountPath: /conf.d/apache.d/
          - name: http-auto-config
            mountPath: /conf.d/http_check.d/
        # [...]
      volumes:
      # [...]
        - name: apache-auto-config
          configMap:
            name: apache-config-map
            items:
              - key: apache-config
                path: auto_conf.yaml
        - name: http-auto-config
          configMap:
            name: apache-config-map
            items:
              - key: http-check-config
                path: auto_conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

```conf
etcdctl set /datadog/check_configs/apache/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/apache/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/apache/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto", "min_collection_interval": 30}],[{"name": "<WEBSITE_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<WEBSITE_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
```

**Nota**: El orden de cada lista es importante. El Agent sólo puede generar la configuración del check de HTTP correctamente si todas las partes de su configuración tienen el mismo índice en las tres listas.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      env:
        - name: DD_IGNORE_AUTOCONF
          value: apache
      extraConfd:
        configDataMap:
          apache.yaml: |-
            ad_identifiers:
              - apache
            init_config:
            instances:
              - apache_status_url: "http://%%host%%/server-status?auto"
                min_collection_interval: 30
          http_check.yaml: |-
            ad_identifiers:
              - apache
            init_config:
            instances:
              - name: "my_website_1"
                url: "http://%%host%%/website_1"
                timeout: 1
              - name: "my_website_2"
                url: "http://%%host%%/website_2"
                timeout: 1
```

**Nota**: La integración de Apache viene con [configuración automática][1] por defecto, que tiene prioridad sobre la configuración establecida en el manifiesto del Datadog Operator. Debido a esto, el manifiesto de ejemplo proporcionado utiliza la variable `DD_IGNORE_AUTOCONF` para desactivar la configuración automática.

[1]: /es/containers/guide/auto_conf

{{% /tab %}}
{{% tab "Helm" %}}
En `datadog-values.yaml`:

```yaml
datadog:
  ignoreAutoConfig:
    - apache
  confd:
    apache.yaml: |-
      ad_identifiers:
        - apache
      init_config:
      instances:
        - apache_status_url: "http://%%host%%/server-status?auto"
          min_collection_interval: 30
    http_check.yaml: |-
      ad_identifiers:
        - apache
      init_config:
      instances:
        - name: "my_website_1"
          url: "http://%%host%%/website_1"
          timeout: 1
        - name: "my_website_2"
          url: "http://%%host%%/website_2"
          timeout: 1
```

**Nota**: La integración de Apache viene con la [configuración automática predeterminada][1], que tiene precedencia sobre la configuración establecida en los valores de Helm. Debido a esto, el ejemplo proporcionado utiliza `datadog.ignoreAutoConfig` para desactivar la configuración automática.

[1]: /es/containers/guide/auto_conf

{{% /tab %}}
{{< /tabs >}}

Todos estos ejemplos utilizan [Variables de plantilla de Autodiscovery][7]:
- `%%host%%` se rellena dinámicamente con la dirección IP del contenedor.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/containers/autodiscovery
[2]: /es/containers/docker/integrations
[3]: /es/containers/kubernetes/integrations
[4]: /es/containers/guide/auto_conf
[5]: /es/integrations/redisdb
[6]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[7]: /es/containers/guide/template_variables/
[8]: /es/integrations/apache
[9]: /es/integrations/http_check/
[10]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[11]: /es/developers/write_agent_check/#updating-the-collection-interval
[12]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example