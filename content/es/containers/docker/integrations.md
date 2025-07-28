---
aliases:
- /es/agent/docker/integrations
further_reading:
- link: /agent/docker/log/
  tag: Documentación
  text: Recopilación de logs
- link: /agent/docker/apm/
  tag: Documentación
  text: Recopila tus trazas de aplicaciones
- link: /agent/docker/prometheus/
  tag: Documentación
  text: Recopilación de tus métricas de Prometheus
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/docker/tag/
  tag: Documentación
  text: Asignar etiquetas (tags) a todos los datos emitidos por un contenedor
title: Docker y integraciones
---

Esta página explica cómo instalar y configurar integraciones para tu infraestructura de Docker utilizando una función de Datadog conocida como _Autodiscovery_. Autodiscovery te permite utilizar [variables][1] como `%%host%%` para rellenar dinámicamente tu configuración.

Para una explicación detallada de cómo funciona Autodiscovery, consulta [Empezando con contenedores: Autodiscovery][2]. Para opciones avanzadas de Autodiscovery, como excluir ciertos contenedores de Autodiscovery o tolerar pods no preparados, consulta [Gestión de detección de contenedores][3].

Si utilizas Kubernetes, consulta [Kubernetes e integraciones][4].

<div class="alert alert-info">
Las siguientes integraciones de Datadog no funcionan con Autodiscovery porque requieren datos del árbol de proceso o acceso al sistema de archivos: <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a> y <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Para monitorizar las integraciones que no son compatibles con Autodiscovery, puedes utilizar un exportador de Prometheus en el pod para exponer un endpoint HTTP y, luego, utilizar la <a href="/integrations/openmetrics/">integración de OpenMetrics</a> (que admite Autodiscovery) para encontrar el pod y consultar el endpoint. 
</div>

## Configurar tu integración

Algunas integraciones requieren pasos de configuración, como la creación de un token de acceso o la concesión de permisos de lectura al Datadog Agent. Sigue las instrucciones de la sección **Configuración** de la documentación de integraciones.

### Integraciones de la comunidad
Para utilizar una integración que no esté empaquetada con el Datadog Agent, debes crear una imagen personalizada que contenga la integración deseada. Consulta [Uso de integraciones de la comunidad][5] para obtener instrucciones.

## Configuración

Algunas integraciones de uso común vienen con la configuración por defecto para Autodiscovery. Ve [configuración automática de Autodiscovery][6] para obtener más detalles, incluyendo una lista de integraciones configuradas automáticamente y sus correspondientes archivos de configuración por defecto. Si tu integración está en esta lista y la configuración por defecto es suficiente para tu caso de uso, no se requiere ninguna acción adicional.

O:

1. Elige un método de configuración (etiquetas de Docker, un archivo local o un almacén de clave-valor) que se adapte a tu caso de uso.
2. Consulta el formato de plantilla para el método elegido. Cada formato contiene parámetros, como `<CONTAINER_IMAGE>`.
3. [Proporciona valores](#placeholder-values) para estos parámetros.

{{< tabs >}}
{{% tab "Labels" %}}

#### Archivo Docker

Para el Datadog Agent v7.36+:

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

Para versiones anteriores del Agent:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<INTEGRATION_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

#### docker-compose.yaml

Para el Datadog Agent v7.36+:

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

Para versiones anteriores del Agent:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

#### Con Docker run, nerdctl run, o podman run

Para el Datadog Agent v7.36+:

```shell
docker run -l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>], \"logs\": [<LOGS_CONFIG>]}}"
```

Para versiones anteriores del Agent:

```shell
docker run -l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**Nota**: Puedes establecer una secuencia de escape para JSON mientras configuras estas etiquetas. Por ejemplo:
```shell
docker run -l "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

#### Docker Swarm
Cuando se utiliza el modo Swarm para Docker Cloud, deben aplicarse etiquetas (labels) a la imagen.

Para el Datadog Agent v7.36+:

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'

```

Para versiones anteriores del Agent:

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
      com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
      com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
      com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'

```

{{% /tab %}}
{{% tab "Local file" %}}

Puedes almacenar plantillas de Autodiscovery como archivos locales en el directorio montado `/conf.d`. Debes reiniciar tus contenedores del Agent cada vez que cambias, añades o eliminas plantillas.

1. Crea un archivo `conf.d/<INTEGRATION_NAME>.d/conf.yaml` en tu host:
   ```yaml
   ad_identifiers:
     - <CONTAINER_IMAGE>

   init_config:
     <INIT_CONFIG>

   instances:
     <INSTANCES_CONFIG>

   logs:
     <LOGS_CONFIG>
   ```

2. Monta tu carpeta host `conf.d/` en la carpeta `conf.d` del Agent contenedorizado.

{{% /tab %}}
{{% tab "Key-value store" %}}
Puedes obtener plantillas Autodiscovery de [Consul][1], [etcd][2], o [ZooKeeper][3]. Puedes Configurar tu almacén clave-valor en el archivo `datadog.yaml` Configuración (y posteriormente montar este archivo dentro del Agent Contenedor ), o como entorno variables en el Agent Contenedor .

**Configurar en datadog.yaml**:

En `datadog.yaml`, configura la dirección `<KEY_VALUE_STORE_IP>` y el`<KEY_VALUE_STORE_PORT>` de tu base de datos clave-valor:

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      ca_file:
      ca_path:
      cert_file:
      key_file:
      username:
      password:
      token:

    - name: zookeeper
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:
  ```

[Reinicia el Datadog Agent][4] para aplicar tus cambios.

**Configurar en variables de entorno**:

Si la base de datos clave-valor se ha activado como fuente de plantillas, el Agent busca plantillas con la clave `/datadog/check_configs`. Autodiscovery espera una jerarquía clave-valor como la siguiente:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCES_CONFIG>"]
      - logs: ["<LOGS_CONFIG>"]
    ...
```

[1]: /es/integrations/consul/
[2]: /es/integrations/etcd/
[3]: /es/integrations/zk/
[4]: /es/agent/configuration/agent-commands/

{{% /tab %}}
{{< /tabs >}}

### Valores de parámetros

Proporciona los siguientes valores de parámetros:

`<INTEGRATION_NAME>`
: nombre de tu integración de Datadog, como `etcd` o `redisdb`.

`<CONTAINER_IMAGE>`
: un identificador para comparar con la imagen del contenedor. <br/><br/>
Por ejemplo: si proporcionas `redis` como identificador del contenedor, tu plantilla de Autodiscovery se aplicará a todos los contenedores cuyos nombres de imagen coincidan con `redis`. Si tienes un contenedor ejecutando `foo/redis:latest` y `bar/redis:v2`, tu plantilla de Autodiscovery se aplica a ambos contenedores.<br/><br/>
El parámetro `ad_identifiers` toma una lista, por lo que puedes suministrar varios identificadores de contenedor. También puedes utilizar identificadores personalizados. Consulta [Identificadores personalizados de Autodiscovery][7].

`<INIT_CONFIG>`
: parámetros de configuración que figuran en `init_config`, en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de tu integración. La sección `init_config` suele estar vacía.

`<INSTANCES_CONFIG>`
: parámetros de configuración que figuran en `instances`, en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de tu integración.

`<LOGS_CONFIG>`
: parámetros de configuración que figuran en `logs`, en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de tu integración.

## Ejemplos

### Integración de Redis

Redis es una de las tecnologías para las que está disponible [la configuración automática de Autodiscovery][6]. Los siguientes ejemplos demuestran la sustitución de esta configuración básica con una configuración personalizada que proporciona un parámetro `password`.

Guarda tu contraseña como una variable de entorno llamada `REDIS_PASSWORD`; entonces:

{{< tabs >}}
{{% tab "Docker" %}}

Para el Datadog Agent v7.36+:

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
{{% tab "File" %}}
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
{{% tab "Key-value store" %}}

Los siguientes comandos etcd crean una plantilla de con integración Redis con un parámetro de `password` personalizado:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

Observa que cada uno de los tres valores es una lista. Autodiscovery ensambla los elementos de la lista en las configuraciones de la integración basándose en los índices compartidos de la lista. En este caso, compone la primera (y única) configuración del check a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.
{{% /tab %}}
{{< /tabs >}}

Todos estos ejemplos utilizan [Variables de plantilla de Autodiscovery][1]:
- `%%host%%` se rellena dinámicamente con la dirección IP del contenedor.
- `%%env_REDIS_PASSWORD%%` hace referencia a una variable de entorno denominada `REDIS_PASSWORD` vista por el proceso del Agent.

Para más ejemplos, incluyendo cómo configurar multiple checks para múltiples conjuntos de contenedores, ve [Autodiscovery: escenarios y ejemplos][8].

[1]: /es/containers/guide/template_variables/
[2]: /es/getting_started/containers/autodiscovery
[3]: /es/containers/guide/autodiscovery-management
[4]: /es/containers/kubernetes/integrations/
[5]: /es/agent/guide/use-community-integrations/
[6]: /es/containers/guide/auto_conf
[7]: /es/containers/guide/ad_identifiers
[8]: /es/containers/guide/autodiscovery-examples