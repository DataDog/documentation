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
  text: Recopila tus métricas de Prometheus
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/docker/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
title: Integraciones de Autodiscovery para Docker
---

<div class="alert alert-info">
Consulta la documentación <a href="/getting_started/agent/autodiscovery">Empezando con Autodiscovery</a> para descubrir los conceptos en los que se basa esta función.
</div>

Esta página explica cómo configurar Autodiscovery para integraciones Docker. Si estás usando Kubernetes, consulta la [documentación de Autodiscovery para integraciones Kubernetes][1].

El objetivo de Autodiscovery es aplicar una configuración de integración Datadog cuando se está ejecutando un check del Agent contra un contenedor determinado. Consulta cómo [configurar integraciones del Agent][2] cuando se está ejecutando el Agent en un host para tener más contexto sobre esta lógica.

Usa los siguientes parámetros para configurar una integración con Autodiscovery:

| Parámetro            | Obligatorio | Descripción                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | Sí      | Nombre de la integración Datadog                                                                   |
| `<INIT_CONFIG>`      | Sí      | Configuración de la sección `init_config:` del `<INTEGRATION_NAME>` de Datadog dado           |
| `<INSTANCE_CONFIG>`  | Sí      | Configuración de la sección `instances:` del `<INTEGRATION_NAME>` de Datadog dado             |

**Nota**: `<INIT_CONFIG>` no es un requisito para Autodiscovery v2, ya que fue introducido en la versión 7.36 del Datadog Agent.

Cada pestaña en las secciones a continuación demuestra una forma diferente de aplicar plantillas de integración a un contenedor determinado. Los métodos disponibles son:

* [Etiquetas (labels) Docker](?tab=docker#configuration)
* [Un archivo de configuración montado dentro del Agent](?tab=file#configuration)
* [Almacenes de valores clave](?tab=keyvaluestore#configuration)

**Nota**: Algunas integraciones soportadas no funcionan con Autodiscovery estándar porque requieren datos del árbol proceso o acceso al sistema de ficheros: [Ceph][4], [Varnish][5], [Postfix][6], [Cassandra Nodetools][7] y [Gunicorn][8]. Para habilitar Autodiscovery para estas integraciones, utiliza el exportador Prometheus oficial en el contenedor y luego usa Autodiscovery en el Agent para encontrar el contenedor y consultar el endpoint.

## Configuración

{{< tabs >}}
{{% tab "Docker (AD v2)" %}}

**Nota**: AD Annotations v2 fue introducido en el Datadog Agent v7.36 para simplificar la configuración de integraciones. Para versiones anteriores del Datadog Agent, usa AD Annotations v1.

Para activar Autodiscovery automáticamente en contenedores Docker, monta `/var/run/docker.sock` en el Agent contenedorizado. En Windows, monta `\\.\pipe\docker_engine`.

Las plantillas de integraciones se pueden almacenar como etiquetas Docker. Con Autodiscovery, el Agent detecta si se está ejecutando en Docker y busca plantillas de integraciones automáticamente en todas las etiquetas. Autodiscovery espera que las etiquetas se parezcan a los ejemplos a continuación:

**Archivo de Docker**:

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>]}}'
```

**docker-compose.yaml**:

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>]}}'
```

**Uso de los comandos `docker run`, `nerdctl run` o `podman run`**:

```shell
-l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>]}}"
```

**Nota**: Puedes establecer una secuencia de escape para JSON mientras configuras estas etiquetas. Por ejemplo:
```shell
docker run --label "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

**Docker Swarm**:

Cuando se usa el modo Swarm para Docker Cloud, las etiquetas deberán aplicarse a la imagen:

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>]}}'

```

**Nota**: Cuando se configura Autodiscovery, Datadog recomienda usar etiquetas Docker para unificar la telemetría en todo el entorno contenedorizado. Lee la documentación de [etiquetado de servicios unificado][1] para ver más información.


[1]: /es/getting_started/tagging/unified_service_tagging/?tab=docker
{{% /tab %}}
{{% tab "Docker (AD v1)" %}}

Para activar Autodiscovery automáticamente en contenedores Docker, monta `/var/run/docker.sock` dentro del Agent contenedorizado. En Windows, monta `\\.\pipe\docker_engine`.

Las plantillas de integraciones se pueden almacenar como etiquetas Docker. Con Autodiscovery, el Agent detecta si se está ejecutando en Docker y busca plantillas de integraciones automáticamente en todas las etiquetas. Autodiscovery espera que las etiquetas se parezcan a los ejemplos a continuación:

**Archivo de Docker**:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<INTEGRATION_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
```

**docker-compose.yaml**:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
```

**Uso de los comandos `docker run`, `nerdctl run` o `podman run`**:

```shell
-l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]'
```

**Nota**: Puedes establecer una secuencia de escape para JSON mientras configuras estas etiquetas. Por ejemplo:
```shell
docker run --label "com.datadoghq.ad.check_names=[\"redisdb\"]" --label "com.datadoghq.ad.init_configs=[{}]" --label "com.datadoghq.ad.instances=[{\"host\":\"%%host%%\",\"port\":6379}]" --label "com.datadoghq.ad.logs=[{\"source\":\"redis\"}]" --name redis redis
```

**Docker Swarm**:

Cuando se usa el modo Swarm para Docker Cloud, las etiquetas deberán aplicarse a la imagen:

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

```

**Nota**: Cuando se configura Autodiscovery, Datadog recomienda usar etiquetas Docker para unificar la telemetría en todo el entorno contenedorizado. Lee la documentación de [etiquetado de servicios unificado][1] para ver más información


[1]: /es/getting_started/tagging/unified_service_tagging/?tab=docker
{{% /tab %}}
{{% tab "File" (Archivo) %}}

Para almacenar plantillas como archivos locales y montarlos dentro del Agent contenedorizado no hace falta un servicio externo ni una plataforma específica de orquestación. La desventaja es que tienes que reiniciar tu Agent cada vez que cambias, añades o eliminas plantillas. El Agent busca plantillas Autodiscovery en el directorio `/conf.d`montado.

A partir del Agent v6.2.0 (y v5.24.0), las plantillas por defecto usan el puerto por defecto para el software monitorizado, en lugar de detectarlo automáticamente. Si tienes que usar un puerto diferente, proporciona una plantilla Autodiscovery personalizada en las [etiquetas de contenedor Docker](?tab=docker-labels)

Estas plantillas de integración son para casos básicos. Si necesitas una configuración de integración personalizada de Datadog para activar otras opciones, usa identificadores diferentes de contenedores o usa el indexado de variables de plantilla y escribe tu propio archivo de autoconfiguración:

1. Crea un archivo `conf.d/<INTEGRATION_NAME>.d/conf.yaml` en tu host y añade tu autoconfiguración personalizada.
2. Monta tu carpeta host `conf.d/` en la carpeta contenedorizada `conf.d` del Agent.

**Ejemplo de archivo de autoconfiguración**:

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

Consulta la documentación [Identificadores de contenedores Autodiscovery][1] para ver más información sobre el `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`.

**Nota**: No es necesario configurar el `<INTEGRATIONS_NAME>`, ya que el Agent lo infiere directamente del nombre de archivo.

[1]: /es/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Key-value store" (Base de datos clave-valor) %}}

Autodiscovery puede usar [Consul][1], Etcd, y Zookeeper como fuentes de plantillas de integración. Para usar una base de datos clave-valor, configúrala en el archivo de configuración `datadog.yaml` del Agent y monta el archivo dentro del Agent contenedorizado. Opcionalmente, pasa tu base de datos clave-valor como variable de entorno al Agent contenedorizado.

**Configurar en datadog.yaml**:

En el archivo `datadog.yaml`, configura la dirección `<KEY_VALUE_STORE_IP>` y `<KEY_VALUE_STORE_PORT>` de tu base de datos clave-valor:

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

Luego, [reinicia el Agent][2] para aplicar el cambio de configuración.

**Configurar en variables de entorno**:

Si la base de datos clave-valor se ha activado como fuente de plantillas, el Agent busca plantillas con la clave `/datadog/check_configs`. Autodiscovery espera una jerarquía clave-valor como la siguiente:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IDENTIFIER>/
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCE_CONFIG>"]
    ...
```

**Nota**: Para aplicar una configuración específica a un contenedor determinado, Autodiscovery identifica los contenedores por **imagen** cuando usa las bases de dato clave-valor, intentando que `<CONTAINER_IDENTIFIER>` coincida con `.spec.containers[0].image`.

[1]: /es/integrations/consul/
[2]: /es/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## Ejemplos

### Integración Redis de Datadog

{{< tabs >}}
{{% tab "Docker" %}}

El archivo `docker-compose.yml` a continuación aplica la plantilla de integración correcta de Redis con un parámetro `password` personalizado:

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

{{% /tab %}}
{{% tab "File" (Archivo) %}}

Redis es una de las plantillas por defecto de Autodiscovery empaquetada con el Agent, así que no es necesario que montes este archivo. La plantilla de Redis a continuación se empaqueta con el Agent:

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
```

Esto parece una [configuración de integración de Redis][1] mínima, pero fíjate en la opción `ad_identifiers`. Esta opción obligatoria te permite proporcionar identificadores de contenedores. Autodiscovery aplica esta plantilla a cualquier contenedor en el mismo host que ejecuta una imagen `redis`. Para obtener más información, consulta la documentación específica del [Identificador de Autodiscovery][2].

Si tu Redis requiere una `password` adicional para acceder a su endpoint de estadísticas:

1. Crea las carpetas `conf.d/` y `conf.d/redisdb.d` en tu host.
2. Añade la configuración personalizada a continuación a `conf.d/redisdb.d/conf.yaml` en tu host.
3. Monta la carpeta `conf.d/` host en la carpeta `conf.d/` del Agent contenedorizado.

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
    password: "%%env_REDIS_PASSWORD%%"
```

**Nota**: La lógica de la variable de plantilla `"%%env_<ENV_VAR>%%"` se usa para evitar almacenar la contraseña en texto puro; por lo tanto, la variable de entorno `REDIS_PASSWORD` tiene que ser transferida al Agent. Consulta la [documentación de la variable de plantilla de Autodiscovery][3].

[1]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[2]: /es/agent/guide/ad_identifiers/
[3]: /es/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Key-value store" (Base de datos clave-valor) %}}

Los comandos etcd a continuación crean una plantilla de integración Redis con un parámetro de `password` personalizado:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

Fíjate que cada uno de los tres valores es una lista. Autodiscovery agrupa los elementos de la lista en configuraciones de integraciones basadas en índices de lista compartidos. En este caso, conforma la primera (y única) configuración de checks a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.

**Nota**: La lógica de la variable de plantilla `"%%env_<ENV_VAR>%%"` se usa para evitar almacenar la contraseña en texto turo; por lo tanto, la variable de entorno `REDIS_PASSWORD` tiene que ser transferida al Agent. Consulta la [documentación de la variable de plantilla de Autodiscovery][1].

A diferencia de los archivos auto-conf, las **bases de datos clave-valor pueden usar el nombre de imagen corto O largo como identificadores de contenedores**, por ejemplo: `redis` O `redis:latest`.

[1]: /es/agent/faq/template_variables/
{{% /tab %}}
{{< /tabs >}}

### Datadog Apache e integraciones check de HTTP

Las configuraciones a continuación son aplicables a una imagen de contenedor Apache con el `<CONTAINER_IDENTIFIER>`: `httpd`. Las plantillas de Autodiscovery se configuran para recopilar métricas del contenedor Apache y configurar un check de Datadog-HTTP con instancias para probar dos endpoints.

Los nombres de los checks son `apache`, `http_check` y su `<INIT_CONFIG>`, y `<INSTANCE_CONFIG>`. Las configuraciones completas se pueden encontrar en su correspondiente página de documentación: [Integración Datadog-Apache][9], [Integración del check de Datadog-HTTP][10].

{{< tabs >}}
{{% tab "Docker" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["apache", "http_check"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name":"<WEBSITE_1>","url":"http://%%host%%/website_1","timeout":1},{"name":"<WEBSITE_2>","url":"http://%%host%%/website_2","timeout":1}]]'
```

{{% /tab %}}
{{% tab "File" (Archivo) %}}

* Crea las carpetas `conf.d/` y `conf.d/apache.d` en tu host.
* Añade la autoconfiguración personalizada a continuación a `conf.d/apache.d/conf.yaml` en tu host.

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

**Nota**: Parece una [configuración de check Apache][1] mínima, pero fíjate en la opción `ad_identifiers`. Esta opción obligatoria te deja proporcionar identificadores de contenedores. Autodiscovery aplica esta plantilla a cualquier contenedor en el mismo host que ejecuta una imagen `httpd`. Para obtener más información, consulta la documentación específica del [identificador de Autodiscovery][2].

* Luego, crea la carpeta `conf.d/http_check.d` en tu host.
* Añade la configuración personalizada a continuación a `conf.d/http_check.d/conf.yaml` en tu host.

```yaml
ad_identifiers:
  - httpd

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

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[2]: /es/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Key-value store" (Base de datos clave-valor) %}}

```conf
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name": "<WEBSITE_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<WEBSITE_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
```

**Nota**: El orden de cada lista es importante. El Agent solo puede generar la configuración del check HTTP correctamente si todas las partes de su configuración tienen el mismo índice en las tres listas.

{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/kubernetes/integrations/
[2]: /es/getting_started/integrations/#configuring-agent-integrations
[3]: /es/integrations/#cat-autodiscovery
[4]: /es/integrations/ceph/
[5]: /es/integrations/varnish/#autodiscovery
[6]: /es/integrations/postfix/
[7]: /es/integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /es/integrations/gunicorn/
[9]: /es/integrations/apache/#setup
[10]: /es/integrations/http_check/#setup