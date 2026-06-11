---
aliases:
- /es/agent/docker/integrations
description: Configure integraciones de seguimiento para aplicaciones que se ejecutan
  en contenedores Docker utilizando Autodiscovery
further_reading:
- link: /agent/docker/log/
  tag: Documentación
  text: Recopile sus registros
- link: /agent/docker/apm/
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /agent/docker/prometheus/
  tag: Documentación
  text: Recopile sus métricas de Prometheus
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limite la recopilación de datos a un subconjunto de contenedores solamente
- link: /agent/docker/tag/
  tag: Documentación
  text: Asigne etiquetas a todos los datos emitidos por un contenedor
title: Docker e Integraciones
---
Esta página cubre cómo instalar y configurar integraciones para su infraestructura Docker utilizando la función de Datadog conocida como _Autodiscovery_. Autodiscovery le permite usar [variables][1] como `%%host%%` para poblar dinámicamente la configuración de sus ajustes. 

Para una explicación detallada de cómo funciona Autodiscovery, consulte [Getting Started with Containers: Autodiscovery][2]. Para opciones avanzadas de Autodiscovery, como excluir ciertos contenedores de Autodiscovery o tolerar pods no listos, consulte [Container Discovery Management][3].

Si utiliza Kubernetes, consulte [Kubernetes and Integrations][4].

<div class="alert alert-info">
Las siguientes integraciones de Datadog no funcionan con Autodiscovery porque requieren datos del árbol de procesos o acceso al sistema de archivos: <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>, y <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Para monitorear integraciones que no son compatibles con Autodiscovery, puede utilizar un exportador de Prometheus en el pod para exponer un punto de conexión HTTP, y luego utilizar la <a href="/integrations/openmetrics/">integración OpenMetrics</a> (que soporta Autodiscovery) para localizar el pod y consultar el punto de conexión. 
</div>

## Configure su integración {#set-up-your-integration}

Algunas integraciones requieren pasos de configuración, como crear un token de acceso o otorgar permiso de lectura al Datadog Agent. Siga las instrucciones en la sección **Configuración** de la documentación de su integración.

### Integraciones comunitarias {#community-integrations}
Para utilizar una integración que no está empaquetada con el Datadog Agent, construya una imagen personalizada que contenga la integración deseada. Consulte [Use Community Integrations][5] para obtener instrucciones.

## Configuración {#configuration}

Algunas integraciones de uso común vienen con una configuración predeterminada para Autodiscovery. Consulte [Autodiscovery auto-configuration][6] para obtener detalles, incluyendo una lista de integraciones autoconfiguradas y sus correspondientes archivos de configuración predeterminados. Si su integración está en esta lista y la configuración predeterminada es suficiente para su caso de uso, no se requiere ninguna acción adicional.

De lo contrario:

1. Elija un método de configuración (etiquetas de Docker, un archivo local o un almacén de clave-valor) que se adapte a su caso de uso.
2. Consulte el formato de plantilla para el método que eligió. Cada formato contiene marcadores de posición, como `<CONTAINER_IMAGE>`.
3. [Proporcione valores](#placeholder-values) para estos marcadores de posición.

{{< tabs >}}
{{% tab "Etiquetas" %}}

#### Dockerfile {#dockerfile}

Para Datadog Agent v7.36+:

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

Para versiones anteriores del Datadog Agent:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<INTEGRATION_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

#### docker-compose.yaml {#docker-composeyaml}

Para Datadog Agent v7.36+:

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

Para versiones anteriores del Datadog Agent:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

#### Usando docker run, nerdctl run o podman run {#using-docker-run-nerdctl-run-or-podman-run}

Para Datadog Agent v7.36+:

```shell
docker run -l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>], \"logs\": [<LOGS_CONFIG>]}}"
```

Para versiones anteriores del Datadog Agent:

```shell
docker run -l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**Nota**: Puede escapar JSON mientras configura estas etiquetas. Por ejemplo:

```shell
docker run -l "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

#### Docker Swarm {#docker-swarm}
Al usar el modo Swarm para Docker Cloud, se deben aplicar etiquetas a la imagen.

Para la versión v7.36+ del Agente de Datadog:

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'

```

Para versiones anteriores del Agente:

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
{{% tab "Archivo local" %}}

Puede almacenar plantillas de Autodiscovery como archivos locales dentro del directorio montado `/conf.d`. Reinicie sus contenedores del Datadog Agent cada vez que cambie, agregue o elimine plantillas.

1. Cree un archivo `conf.d/<INTEGRATION_NAME>.d/conf.yaml` en su host:
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

2. Monte la carpeta `conf.d/` de su host en la carpeta `conf.d` del contenedor del Datadog Agent.

   **docker-compose.yaml**
   ```yaml
   volumes:
     [...]
     - <PATH_TO_LOCAL_FOLDER>/conf.d:/conf.d
   ```

   **docker run**
   ```shell
   docker run -d --name datadog-agent \
     [...]
     -v <PATH_TO_LOCAL_FOLDER>/conf.d:/conf.d \
   ```

{{% /tab %}}
{{% tab "Almacén de clave-valor" %}}
Puede obtener plantillas de Autodiscovery de [Consul][1], [etcd][2] o [ZooKeeper][3]. Puede configurar su almacén de clave-valor en el archivo de configuración `datadog.yaml` (y posteriormente montar este archivo dentro del contenedor del Datadog Agent), o como variables de entorno en el contenedor del Datadog Agent.

**Configure en datadog.yaml**:

En `datadog.yaml`, establezca la dirección `<KEY_VALUE_STORE_IP>` y `<KEY_VALUE_STORE_PORT>` de su almacén de clave-valor:

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

[Reinicie el Datadog Agent][4] para aplicar sus cambios.

**Configure en variables de entorno**:

Con el almacén de clave-valor habilitado como fuente de plantillas, el Datadog Agent busca plantillas bajo la clave `/datadog/check_configs`. Autodiscovery espera una jerarquía de clave-valor como esta:

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

### Valores de marcador de posición {#placeholder-values}

Proporcione valores de marcador de posición de la siguiente manera:

`<INTEGRATION_NAME>`
: El nombre de su integración de Datadog, como `etcd` o `redisdb`.

`<CONTAINER_IMAGE>`
: Un identificador para hacer coincidir con la imagen del contenedor. <br/><br/>
Por ejemplo: si proporciona `redis` como un identificador de contenedor, su plantilla de Autodiscovery se aplica a todos los contenedores con nombres de imagen que coincidan con `redis`. Si tiene un contenedor ejecutándose `foo/redis:latest` y `bar/redis:v2`, su plantilla de Autodiscovery se aplica a ambos contenedores.<br/><br/>
El parámetro `ad_identifiers` toma una lista, por lo que puede proporcionar múltiples identificadores de contenedor. También puede usar identificadores personalizados. Consulte [Custom Autodiscovery Identifiers][7].

`<INIT_CONFIG>`
: Los parámetros de configuración enumerados bajo `init_config` en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de su integración. La sección `init_config` suele estar vacía.

`<INSTANCES_CONFIG>`
: Los parámetros de configuración enumerados bajo `instances` en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de su integración.

`<LOGS_CONFIG>`
: Los parámetros de configuración enumerados bajo `logs` en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de su integración.

## Ejemplos {#examples}

### Integración de Redis {#redis-integration}

Redis es una de las tecnologías para las cuales está disponible [Autodiscovery auto-configuration][6]. Los siguientes ejemplos demuestran cómo anular esta configuración básica con una configuración personalizada que proporciona un parámetro `password`.

Almacene su contraseña como una variable de entorno llamada `REDIS_PASSWORD`; luego:

{{< tabs >}}
{{% tab "Docker" %}}

Para Datadog Agent v7.36+:

```yaml
labels:
  com.datadoghq.ad.checks: '{"redisdb": {"instances": [{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}], "logs": [{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]}}'
```

Para versiones anteriores del Datadog Agent:

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]'
```

{{% /tab %}}
{{% tab "Archivo" %}}
1. Cree un archivo `conf.d/redisdb.d/conf.yaml` en su host:

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

2. Monte la carpeta `conf.d/` de su host en la carpeta `conf.d` del Datadog Agent.

{{% /tab %}}
{{% tab "Almacenamiento clave-valor" %}}

Los siguientes comandos de etcd crean una plantilla de integración de Redis con un parámetro `password` personalizado:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

Observe que cada uno de los tres valores es una lista. Autodiscovery ensambla los elementos de la lista en las configuraciones de integración basándose en índices de lista compartidos. En este caso, compone la primera (y única) configuración de verificación a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.
{{% /tab %}}
{{< /tabs >}}

Todos estos ejemplos utilizan [Autodiscovery template variables][1]:
- `%%host%%` se completa dinámicamente con la IP del contenedor.
- `%%env_REDIS_PASSWORD%%` Hace referencia a una variable de entorno llamada `REDIS_PASSWORD` tal como la ve el proceso del Datadog Agent.

Consulte [Autodiscovery: Scenarios & Examples][8] para más ejemplos, incluyendo cómo configurar múltiples verificaciones para múltiples conjuntos de contenedores.

[1]: /es/containers/guide/template_variables/
[2]: /es/getting_started/containers/autodiscovery
[3]: /es/containers/guide/autodiscovery-management
[4]: /es/containers/kubernetes/integrations/
[5]: /es/agent/guide/use-community-integrations/
[6]: /es/containers/guide/auto_conf
[7]: /es/containers/guide/ad_identifiers
[8]: /es/containers/guide/autodiscovery-examples